const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://13.211.94.23:5000', // Địa chỉ NestJS
      changeOrigin: true,
      secure: false, // Vô hiệu hóa SSL verification
    })
  );
};