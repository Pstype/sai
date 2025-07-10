"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Video, FileVideo, Sparkles, Clock, HardDrive } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { VideoUploader } from '@/components/upload/video-uploader'
import { cn } from '@/lib/utils'

interface QuickUploadProps {
  onProjectCreated?: (projectId: string) => void
  className?: string
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

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function QuickUpload({ onProjectCreated, className }: QuickUploadProps) {
  const [showUploader, setShowUploader] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  // Handle file drop/selection for quick upload
  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      console.error('File rejected:', rejectedFiles[0].errors)
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    try {
      // Create a new project for the upload
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Project - ${file.name}`,
          description: `Auto-created project for ${file.name}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const project = await response.json()
      setCurrentProjectId(project.id)
      setShowUploader(true)
      
      // Trigger the file upload in the VideoUploader
      // This will be handled by the VideoUploader component
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }, [])

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_VIDEO_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled: showUploader
  })

  // Handle upload completion
  

  // Handle cancel
  const handleCancel = useCallback(() => {
    setShowUploader(false)
    setCurrentProjectId(null)
  }, [])

  // Handle proceed
  

  // If uploader is shown, render the VideoUploader component
  if (showUploader && currentProjectId) {
    return (
      <div className={className}>
        <VideoUploader
          projectId={currentProjectId}
          onUploadComplete={handleUploadComplete}
          onCancel={handleCancel}
          onProceed={handleProceed}
        />
      </div>
    )
  }

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30",
        "group cursor-pointer",
        className
      )}
      variant="elevated"
      hover="glow"
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative transition-all duration-200",
          isDragActive && !isDragReject && "bg-primary/5",
          isDragReject && "bg-error/5"
        )}
      >
        <input {...getInputProps()} />
        
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 relative">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-gradient-to-br from-primary/20 to-primary/10",
              "group-hover:from-primary/30 group-hover:to-primary/20",
              "group-hover:scale-110",
              isDragActive && "scale-110 from-primary/40 to-primary/30"
            )}>
              {isDragActive ? (
                <FileVideo className="w-8 h-8 text-primary" />
              ) : (
                <Upload className="w-8 h-8 text-primary group-hover:animate-pulse" />
              )}
            </div>
            
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>
          
          <CardTitle level={2} className="text-xl mb-2">
            {isDragActive ? 'Drop your video here' : 'Quick Upload'}
          </CardTitle>
          
          <CardDescription className="text-base">
            {isDragActive 
              ? 'Release to start creating your project'
              : 'Drag and drop a video or click to browse'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* File type indicators */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Video className="w-4 h-4 text-primary" />
              <span>Supported Formats</span>
            </div>
            <div className="text-sm text-text-secondary">
              MP4, WebM, MOV, AVI
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <HardDrive className="w-4 h-4 text-primary" />
              <span>Maximum Size</span>
            </div>
            <div className="text-sm text-text-secondary">
              {formatFileSize(MAX_FILE_SIZE)}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4 text-primary" />
              <span>Maximum Duration</span>
            </div>
            <div className="text-sm text-text-secondary">
              {formatDuration(MAX_DURATION)}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <div className={cn(
              "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "bg-primary/10 text-primary border border-primary/20",
              "group-hover:bg-primary/20 group-hover:border-primary/40",
              isDragActive && "bg-primary/30 border-primary/60"
            )}>
              <Upload className="w-4 h-4 mr-2" />
              {isDragActive ? 'Drop to Upload' : 'Click to Browse'}
            </div>
          </div>

          {/* Processing preview */}
          <div className="mt-6 p-4 bg-surface-light rounded-lg border border-border/50">
            <div className="text-xs text-text-secondary text-center space-y-1">
              <p className="font-medium text-text-primary">What happens next?</p>
              <p>🎬 Video Analysis • 🎵 Music Generation • 🔊 Sound Effects • ✨ Perfect Sync</p>
            </div>
          </div>
        </CardContent>

        {/* Drag overlay */}
        {isDragActive && (
          <div className="absolute inset-0 bg-primary/5 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <FileVideo className="w-12 h-12 text-primary mx-auto animate-bounce" />
              <p className="text-lg font-semibold text-primary">
                Drop your video to get started
              </p>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {isDragReject && (
          <div className="absolute inset-0 bg-error/5 border-2 border-dashed border-error rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <Video className="w-12 h-12 text-error mx-auto" />
              <p className="text-lg font-semibold text-error">
                Invalid file type or size
              </p>
              <p className="text-sm text-error/80">
                Please upload a video file under {formatFileSize(MAX_FILE_SIZE)}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}