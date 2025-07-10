  import type { NextConfig } from 'next';

  const nextConfig: NextConfig = {
    experimental: {
      serverActions: {
        // bodySizeLimit: '1gb', // Removed as uploads now use signed URLs
      },
    },
  };

  export default nextConfig;