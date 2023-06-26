import httpProxy from 'http-proxy';

export default function handler(req, res) {
  const proxy = httpProxy.createProxyServer({
    target: process.env.NEXT_PUBLIC_URR_BASE, // Thay đổi địa chỉ IP và cổng tại đây
    ws: true, // Cho phép proxy WebSocket
  });

  proxy.on('error', (err) => {
    console.error('WebSocket proxy error:', err);
    res.statusCode = 500;
    res.end('WebSocket proxy error');
  });

  proxy.web(req, res, { target: req.url });
}

// const httpProxy = require('http-proxy');

// export default async function handler(req, res) {
//   console.log('sos')
//   const proxy = new httpProxy.createProxyServer({
//     target: 'http://localhost:5000', // Thay đổi URL của máy chủ NestJS của bạn
//     ws: true, // Cho phép proxy WebSocket
//   });

//   // Chuyển tiếp yêu cầu WebSocket
//   proxy.web(req, res, { target: 'ws://localhost:5000' }); // Thay đổi URL của máy chủ NestJS của bạn

//   // Đảm bảo rằng proxy đã hoàn thành yêu cầu WebSocket
//   proxy.on('error', (err, req, res) => {
//     console.error('WebSocket proxy error:', err);
//     res.writeHead(500, {
//       'Content-Type': 'text/plain',
//     });
//     res.end('WebSocket proxy error');
//   });
// }