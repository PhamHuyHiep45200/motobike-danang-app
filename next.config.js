/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_URR_BASE}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
      },
    ];
  },
};
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/api/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URR_BASE}:path*`, // Thay đổi địa chỉ IP và cổng tại đây
//       },
//       {
//         source: '/socket.io/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URR_BASE}/:path*`,
//       },
//       {
//         source: '/socket.io/:path*',
//         destination: 'http://localhost:5000/socket.io/:path*', // Thay đổi địa chỉ máy chủ Socket.io của bạn
//       },
//     ];
//   },
//   async serverMiddleware({ app }) {
//     // Tạo proxy cho WebSocket
//     const socketProxy = createProxyMiddleware('/socket.io', {
//       target: 'http://localhost:5000', // Thay đổi địa chỉ máy chủ Socket.io của bạn
//       ws: true, // Cho phép proxy WebSocket
//       changeOrigin: true,
//     });

//     // Tạo proxy cho API
//     const apiProxy = createProxyMiddleware('/api', {
//       target: 'http://localhost:5000', // Thay đổi địa chỉ máy chủ API của bạn
//       changeOrigin: true,
//     });

//     // Đăng ký middleware tùy chỉnh để xử lý yêu cầu WebSocket
//     app.use('/socket.io', (req, res, next) => {
//       if (req.headers.upgrade === 'websocket') {
//         socketProxy(req, res, next);
//       } else {
//         next();
//       }
//     });

//     // Kết hợp proxy cho API vào server
//     app.use('/api', apiProxy);
//   },
// }

// module.exports = nextConfig
