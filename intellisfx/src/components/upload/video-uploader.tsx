"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, AlertCircle, FileVideo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProcessingStore } from '@/stores/processing'
import { cn, formatFileSize, formatDuration } from '@/lib/utils'

interface VideoUploaderProps {
  projectId?: string
  onUploadComplete?: (videoUrl: string, projectId: string) => void
  onCancel?: () => void
  onProceed?: (videoUrl: string, projectId: string) => void
  className?: string
}

export function VideoUploader({
  projectId: initialProjectId,
  onUploadComplete,
  onCancel,
  onProceed,
  className
}: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(initialProjectId);

  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    return () => {
      if (videoUrl && videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);
  

  const { subscribeToProject, unsubscribeFromProject } = useProcessingStore();

  useEffect(() => {
    if (currentProjectId) {
      subscribeToProject(currentProjectId);
    }
    return () => {
      if (currentProjectId) {
        unsubscribeFromProject();
      }
    }
  }, [currentProjectId, subscribeToProject, unsubscribeFromProject]);

  const handleCancel = () => {
    setIsUploading(false);
    setError(null);
    setProgress(0);
    setVideoUrl(null);
    setVideoFile(null);
    setVideoDuration(null);
    if (onCancel) {
      onCancel();
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setProgress(0);
    setVideoFile(file);

    try {
      const duration = await getVideoDuration(file);
      setVideoDuration(duration);

      // Step 1: Get the signed URL from our server
      const urlResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fileName: file.name, 
          fileType: file.type, 
          fileSize: file.size, 
          duration, 
          projectId: currentProjectId 
        }),
      });

      if (!urlResponse.ok) {
        const errorData = await urlResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { signedUrl, path, projectId } = await urlResponse.json();
      setCurrentProjectId(projectId);

      // Proactively subscribe to real-time updates for this project
      subscribeToProject(projectId);

      // Step 2: Upload the file directly to Supabase Storage
      await uploadFile(file, signedUrl);

      // Step 3: Notify our server that the upload is complete
      const completeResponse = await fetch('/api/on-video-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          videoUrl: path,
          fileName: file.name,
          fileSize: file.size,
          duration,
        }),
      });

      if (!completeResponse.ok) {
        const errorData = await completeResponse.json();
        throw new Error(errorData.error || 'Failed to finalize upload');
      }

      // All successful, update local state and notify parent
      const tempVideoUrl = URL.createObjectURL(file);
      setVideoUrl(tempVideoUrl);
      onUploadComplete?.(tempVideoUrl, projectId);


    } catch (err) {
      console.error("Upload process failed:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  }, [currentProjectId, onUploadComplete]);

  const uploadFile = async (file: File, signedUrl: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error('Upload failed with status: ' + xhr.status));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(file);
    });
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = reject;
      video.src = window.URL.createObjectURL(file);
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'video/*': []} });

  return (
    <div className={cn("w-full", className)}>
      {!videoUrl ? (
        <div {...getRootProps()} className={cn(
          "relative w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out",
          isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/70",
          (isUploading || error) && "pointer-events-none",
          className
        )}>
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", isDragActive ? "bg-primary/20" : "bg-muted")}>
              <Upload className={cn("w-8 h-8", isDragActive ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="font-semibold text-lg">Drag & drop your video here</p>
              <p className="text-muted-foreground text-sm">or click to browse files</p>
            </div>
          </div>

          {videoFile && !isUploading && !error && (
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <FileVideo className="w-4 h-4"/>
                <span>{videoFile.name} ({formatFileSize(videoFile.size)})</span>
                {videoDuration && <span> - {formatDuration(videoDuration)}</span>}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <p className="text-lg font-semibold mb-2">Uploading...</p>
              <Progress value={progress} className="w-3/4" />
              <p className="text-sm text-muted-foreground mt-1">{Math.round(progress)}%</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <AlertCircle className="w-12 h-12 text-destructive mb-2"/>
              <p className="text-lg font-semibold text-destructive">Upload Failed</p>
              <p className="text-sm text-destructive/80 max-w-xs text-center">{error}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={(e) => { e.stopPropagation(); handleCancel(); }}>Try Again</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
           <video
             ref={videoRef}
             src={videoUrl || ''}
             controls
             className="w-full h-full object-contain bg-black"
           />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {videoFile && <p>{videoFile.name} ({formatFileSize(videoFile.size)})</p>}
              {videoDuration && <p>Duration: {formatDuration(videoDuration)}</p>}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={() => videoUrl && currentProjectId && onProceed?.(videoUrl, currentProjectId)}
                disabled={!videoUrl || !currentProjectId}
              >
                Proceed to Analysis
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
