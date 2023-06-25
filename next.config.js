/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: 'http://13.211.94.23:5000/', // URL của API trên EC2
      },
    ];
  },
}

module.exports = nextConfig
