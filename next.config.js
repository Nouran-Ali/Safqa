/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds:true,
    // useFileSystemPublicRoutes: true,
  },
  images: {
    domains: ['api.safqapay.com'],
  },
}

module.exports = nextConfig
