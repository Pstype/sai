/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // bodySizeLimit: '1gb', // Removed as uploads now use signed URLs
    },
  },
};

export default nextConfig;