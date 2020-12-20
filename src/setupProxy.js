const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://trbil.missouri.edu:8000',
      changeOrigin: true,
    })
  );
};