import { withPayload } from '@payloadcms/next/withPayload'

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '6tmrokdrpfnpatbq.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default withPayload(nextConfig) 