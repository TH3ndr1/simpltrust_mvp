/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    dirs: ['pages', 'components', 'contexts', 'hooks', 'utils'],
  },
};

module.exports = nextConfig; 