import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for GitHub Pages static export
  },
  basePath: '', // Leave empty for awnonbhowmik.github.io
};

export default nextConfig;
