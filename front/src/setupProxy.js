const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1235',
      changeOrigin: true
    })
  );

  app.use(createProxyMiddleware('/ws', { target: 'http://localhost:1235', ws: true }));
};
