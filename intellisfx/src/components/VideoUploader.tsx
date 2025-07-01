'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://taincjgzxdarfmbnzbwk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhaW5jamd6eGRhcmZtYm56YndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTk2MjMsImV4cCI6MjA2Njc3NTYyM30.r-zJpa83Y2MH6QSBlnDsmdhhUXGbxIXp-l_QTsORnpg';
const supabase = createClient(supabaseUrl, supabaseKey);

const VideoUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setIsUploading(true);
      setUploadProgress(0);
      const filePath = `videos/${Date.now()}_${selectedFile.name}`;
      // Get upload URL from Supabase
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage.from('raw_videos').createSignedUploadUrl(filePath, { expiresIn: 60 });
      if (signedUrlError || !signedUrlData) {
        setIsUploading(false);
        return;
      }
      // Upload using XMLHttpRequest for progress
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrlData.signedUrl, true);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = async () => {
        setIsUploading(false);
        setFadeOutLoading(true);
        if (xhr.status === 200) {
          // Get public URL for preview
          const { data: urlData } = supabase.storage.from('raw_videos').getPublicUrl(filePath);
          setVideoUrl(urlData.publicUrl);
        }
        setTimeout(() => {
          setShowActions(true);
          setFadeOutLoading(false);
        }, 600);
      };
      xhr.onerror = () => {
        setIsUploading(false);
      };
      xhr.setRequestHeader('x-upsert', 'false');
      xhr.send(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    multiple: false,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1024, // 1GB
  });

  const handleRemoveFile = () => {
    setFile(null);
    setVideoUrl(null);
    setShowActions(false);
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center transition-all border-dashed border-2 ${isDragActive ? 'ring-2 ring-[var(--accent-pink)] border-[var(--accent-pink)]' : 'border-transparent'}`}
        style={{ minHeight: 340 }}
      >
        <input {...getInputProps()} />
        <p className="mb-6 text-sm text-gray-400 text-center">Upload videos up to 10 minutes (max 1GB)</p>
        {!file && !isUploading && !showActions && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <FaCloudUploadAlt size={64} color="var(--accent-pink)" />
            </div>
            <p className="text-center text-gray-700 mb-10 text-2xl font-semibold">Upload a video.</p>
            <button
              type="button"
              className="px-6 py-3 rounded-full border-2 border-[var(--accent-pink)] text-[var(--accent-pink)] font-medium cursor-pointer transition hover:bg-[var(--accent-pink)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-pink)]"
              style={{ outline: 'none' }}
            >
              Browse Files
            </button>
            <p className="mt-4 text-xs text-gray-400 text-center">or drag and drop here</p>
          </>
        )}
        {isUploading && (
          <div className={`flex flex-col items-center justify-center w-full transition-opacity duration-500 ${fadeOutLoading ? 'opacity-0' : 'opacity-100'}`} style={{ minHeight: 200 }}>
            <svg className="animate-spin h-12 w-12 mb-6 text-[var(--accent-pink)]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-lg font-medium text-gray-700 mb-2">Uploading...</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-[var(--accent-pink)] h-3 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-sm text-gray-400">{uploadProgress}%</p>
          </div>
        )}
        {showActions && videoUrl && (
          <>
            <div className="w-full rounded-2xl shadow mb-6" style={{ maxHeight: 260, background: '#f5f5fa' }}>
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="260px"
                style={{ borderRadius: '1rem', objectFit: 'cover', background: '#f5f5fa' }}
              />
            </div>
            <div className="flex justify-end w-full gap-4">
              <button
                className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 text-[var(--accent-pink)] text-2xl shadow hover:bg-[var(--accent-pink)] hover:text-white transition"
                onClick={handleRemoveFile}
              >
                ❌
              </button>
              <button
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-pink)] text-white text-2xl shadow hover:bg-pink-400 transition"
                // onClick={proceedHandler}
              >
                ✔️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
