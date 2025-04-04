// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ❌ Don't set assetPrefix
  // ❌ Don't set basePath
};

export default nextConfig;
