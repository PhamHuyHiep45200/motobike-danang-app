const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.211.94.23:5000/', // Đổi thành URL của NestJS
      changeOrigin: true,
    })
  );
};