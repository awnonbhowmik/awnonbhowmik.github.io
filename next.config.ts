import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Restored static export since we're using EmailJS
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
