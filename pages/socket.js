const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://13.211.94.23:5000',
      changeOrigin: true,
      ws: true,
    })
  );
};