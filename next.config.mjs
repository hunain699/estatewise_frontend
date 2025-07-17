/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Needed for static export, disables next/image optimization
  },
};

export default nextConfig;
  