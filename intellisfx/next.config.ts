import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // bodySizeLimit: '1gb', // Removed as uploads now use signed URLs
    },
  },
  api: {
    // Extend default timeout for long-running API routes (in seconds)
    // Matches Supabase Edge Function timeouts for music and SFX generation
    timeout: {
      'generate-music': 300,
      'generate-sfx-batch': 300,
    },
  },
};

export default nextConfig;