export default async function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_URR_BASE; // URL của API trên EC2

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const api = createProxyMiddleware({
//   target: 'http://13.211.94.23:5000/', // Thay đổi URL của API mà bạn muốn chuyển tiếp
//   changeOrigin: true, // Thay đổi nguồn gốc của yêu cầu
//   pathRewrite: {
//     '^/api': '/', // Thay đổi đường dẫn của yêu cầu
//   },
// });

// module.exports = api;
