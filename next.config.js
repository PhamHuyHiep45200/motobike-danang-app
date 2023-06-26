/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_URR_BASE}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
      },
      // {
      //   source: '/socket.io',
      //   destination: `${process.env.NEXT_PUBLIC_URR_BASE}/socket.io/`,
      // },
    ];
  },
}

module.exports = nextConfig