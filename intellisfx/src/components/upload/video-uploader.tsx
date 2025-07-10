"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactPlayer from 'react-player'
import { Upload, X, Check, AlertCircle, Video, FileVideo } from 'lucide-react'
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
  
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(initialProjectId);

  const playerRef = useRef<ReactPlayer>(null)
  

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

      const response = await fetch('/api/upload-url', {
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

      const { signedUrl, projectId } = await response.json();
      setCurrentProjectId(projectId);

      await uploadFile(file, signedUrl);

      setVideoUrl(URL.createObjectURL(file));
      onUploadComplete?.(URL.createObjectURL(file), projectId);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
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
        <div {...getRootProps()} className={cn("p-8 border-2 border-dashed rounded-lg text-center cursor-pointer", isDragActive && "border-primary")}>
          <input {...getInputProps()} />
          {isUploading ? (
            <>
              <p>Uploading...</p>
              <Progress value={progress} className="w-full" />
            </>
          ) : (
            <p>Drag and drop a video here, or click to select a video</p>
          )}
        </div>
      ) : (
        <div>
          <ReactPlayer ref={playerRef} url={videoUrl} controls width="100%" height="100%" />
          <Button onClick={() => onProceed?.(videoUrl, currentProjectId!)}>Proceed</Button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
