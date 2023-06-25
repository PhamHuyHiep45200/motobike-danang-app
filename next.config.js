/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.211.94.23:5000/:path*', // Thay đổi địa chỉ IP và cổng tại đây
      },
      {
        source: '/socket/:path*',
        destination: 'http://13.211.94.23:5000/socket/:path*',
      },
    ];
  },
}

module.exports = nextConfig
