const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.schoolinfo.go.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};