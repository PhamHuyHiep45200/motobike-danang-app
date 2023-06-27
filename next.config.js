/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require("http-proxy-middleware");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_URR_BASE}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
      },
      {
        source: "/socket.io",
        destination: "http://13.211.94.23:5000/socket.io/", // Thay thế bằng địa chỉ IP hoặc tên miền của Nest.js server trên EC2
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/socket.io/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept' },
        ],
      },
    ];
  },
  async serverMiddleware() {
    const socketProxy = createProxyMiddleware('/socket.io', {
      target: 'http://13.211.94.23:5000/', // Địa chỉ của Socket.IO server
      ws: true,
      logLevel: 'silent',
      changeOrigin: true,
      pathRewrite: {
        '^/socket.io': '',
      },
    });

    return {
      '/socket.io': socketProxy,
    };
  },
};

module.exports = nextConfig;
