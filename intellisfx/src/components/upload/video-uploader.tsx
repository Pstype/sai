"use client"

import React, { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactPlayer from 'react-player'
import { Upload, X, Check, AlertCircle, Video, FileVideo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProcessingStore } from '@/stores/processing'
import { cn, formatFileSize, formatDuration } from '@/lib/utils'

interface VideoUploaderProps {
  projectId: string
  onUploadComplete?: (videoUrl: string) => void
  onCancel?: () => void
  onProceed?: (videoUrl: string) => void
  className?: string
}

interface UploadState {
  isUploading: boolean
  progress: number
  error: string | null
  videoUrl: string | null
  videoFile: File | null
  videoDuration: number | null
}

const MAX_FILE_SIZE = 1024 * 1024 * 1024 // 1GB
const MAX_DURATION = 10 * 60 // 10 minutes in seconds
const ACCEPTED_VIDEO_TYPES = {
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/ogg': ['.ogg'],
  'video/avi': ['.avi'],
  'video/mov': ['.mov'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi']
}

export function VideoUploader({
  projectId,
  onUploadComplete,
  onCancel,
  onProceed,
  className
}: VideoUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    videoUrl: null,
    videoFile: null,
    videoDuration: null
  })

  const playerRef = useRef<ReactPlayer>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const { addJob, updateJobProgress, updateJobStatus, startProcessingPipeline } = useProcessingStore()

  // Validate video file
  const validateVideoFile = useCallback((file: File): string | null => {
    // Check file type
    if (!Object.keys(ACCEPTED_VIDEO_TYPES).includes(file.type)) {
      return `Invalid file type. Please upload a video file (${Object.values(ACCEPTED_VIDEO_TYPES).flat().join(', ')})`
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}`
    }

    return null
  }, [])

  // Validate video duration
  const validateVideoDuration = useCallback((duration: number): string | null => {
    if (duration > MAX_DURATION) {
      return `Video too long. Maximum duration is ${formatDuration(MAX_DURATION)}`
    }
    return null
  }, [])

  // Handle file drop/selection
  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]?.message || 'Invalid file'
      setUploadState(prev => ({ ...prev, error }))
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    // Validate file
    const validationError = validateVideoFile(file)
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }))
      return
    }

    // Reset state and start upload
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      videoUrl: null,
      videoFile: file,
      videoDuration: null
    })

    try {
      await uploadVideo(file)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }))
    }
  }, [validateVideoFile])

  // Upload video to server
  const uploadVideo = async (file: File) => {
    try {
      abortControllerRef.current = new AbortController()

      // Get signed upload URL
      const response = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          projectId
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error('Failed to get upload URL')
      }

      const { signedUrl, publicUrl } = await response.json()

      // Create processing job
      const jobId = addJob({
        type: 'upload',
        status: 'processing',
        progress: 0,
        projectId,
        stage: 'uploading',
        metadata: {
          fileName: file.name,
          fileSize: file.size
        }
      })

      // Upload file with progress tracking
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
        signal: abortControllerRef.current.signal
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      // Simulate progress updates (since direct upload doesn't provide progress)
      const progressInterval = setInterval(() => {
        setUploadState(prev => {
          const newProgress = Math.min(prev.progress + 10, 90)
          updateJobProgress(jobId, newProgress)
          return { ...prev, progress: newProgress }
        })
      }, 200)

      // Wait for upload completion
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearInterval(progressInterval)

      // Complete upload
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100,
        videoUrl: publicUrl
      }))

      updateJobStatus(jobId, 'completed', 100)
      onUploadComplete?.(publicUrl)

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: 'Upload cancelled'
        }))
      } else {
        throw error
      }
    }
  }

  // Handle video ready (to check duration)
  const handleVideoReady = useCallback((player: ReactPlayer) => {
    const duration = player.getDuration()
    
    if (duration) {
      const durationError = validateVideoDuration(duration)
      if (durationError) {
        setUploadState(prev => ({
          ...prev,
          error: durationError,
          videoUrl: null
        }))
        return
      }

      setUploadState(prev => ({
        ...prev,
        videoDuration: duration,
        error: null
      }))
    }
  }, [validateVideoDuration])

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (uploadState.isUploading && abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      videoUrl: null,
      videoFile: null,
      videoDuration: null
    })

    onCancel?.()
  }, [uploadState.isUploading, onCancel])

  // Handle proceed
  const handleProceed = useCallback(async () => {
    if (!uploadState.videoUrl || !uploadState.videoFile) return

    try {
      // Start the processing pipeline
      await startProcessingPipeline(projectId, uploadState.videoFile)
      onProceed?.(uploadState.videoUrl)
    } catch (error) {
      console.error('Failed to start processing:', error)
      setUploadState(prev => ({
        ...prev,
        error: 'Failed to start processing'
      }))
    }
  }, [uploadState.videoUrl, uploadState.videoFile, projectId, startProcessingPipeline, onProceed])

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_VIDEO_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled: uploadState.isUploading || !!uploadState.videoUrl
  })

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-lg">
        {/* Upload Area */}
        {!uploadState.videoUrl && (
          <div
            {...getRootProps()}
            className={cn(
              "relative p-8 border-2 border-dashed transition-colors cursor-pointer",
              "hover:border-primary-light hover:bg-surface-light",
              isDragActive && !isDragReject && "border-primary bg-primary/5",
              isDragReject && "border-error bg-error/5",
              uploadState.isUploading && "pointer-events-none opacity-50",
              "border-border"
            )}
          >
            <input {...getInputProps()} />
            
            <div className="text-center space-y-4">
              {uploadState.isUploading ? (
                <>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      Uploading Video...
                    </h3>
                    <p className="text-text-secondary">
                      {uploadState.videoFile?.name}
                    </p>
                    <div className="max-w-xs mx-auto">
                      <Progress
                        value={uploadState.progress}
                        variant="default"
                        showPercentage
                        className="w-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {isDragActive ? (
                      <FileVideo className="w-6 h-6 text-primary" />
                    ) : (
                      <Video className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {isDragActive ? 'Drop your video here' : 'Upload Video'}
                    </h3>
                    <p className="text-text-secondary">
                      Drag and drop or click to browse
                    </p>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p>Supported formats: MP4, WebM, MOV, AVI</p>
                      <p>Maximum size: {formatFileSize(MAX_FILE_SIZE)}</p>
                      <p>Maximum duration: {formatDuration(MAX_DURATION)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Video Preview */}
        {uploadState.videoUrl && (
          <div className="p-6 space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                ref={playerRef}
                url={uploadState.videoUrl}
                width="100%"
                height="100%"
                controls
                onReady={handleVideoReady}
                onError={(error) => {
                  console.error('Video player error:', error)
                  setUploadState(prev => ({
                    ...prev,
                    error: 'Failed to load video preview'
                  }))
                }}
              />
            </div>
            
            {/* Video Info */}
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>{uploadState.videoFile?.name}</span>
              <div className="flex items-center space-x-4">
                <span>{formatFileSize(uploadState.videoFile?.size || 0)}</span>
                {uploadState.videoDuration && (
                  <span>{formatDuration(uploadState.videoDuration)}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {uploadState.error && (
          <div className="p-4 bg-error/10 border-t border-error/20">
            <div className="flex items-center space-x-2 text-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">{uploadState.error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {uploadState.videoUrl && !uploadState.error && (
          <div className="p-4 bg-surface-light border-t border-border">
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                icon={<X className="w-4 h-4" />}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleProceed}
                icon={<Check className="w-4 h-4" />}
              >
                Proceed
              </Button>
            </div>
          </div>
        )}

        {/* Cancel Button During Upload */}
        {uploadState.isUploading && (
          <div className="p-4 bg-surface-light border-t border-border">
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                icon={<X className="w-4 h-4" />}
              >
                Cancel Upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}