/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    dirs: ['pages', 'components', 'contexts', 'hooks', 'utils'],
  },
  // Enable experimental features that might be needed for path aliases
  experimental: {
    // Enable if needed for more advanced path resolution
    // esmExternals: true,
  },
};

module.exports = nextConfig; 