'use client';

import dynamic from 'next/dynamic';

const VideoUploader = dynamic(() => import('./VideoUploader'), {
  ssr: false,
});

export default VideoUploader;
