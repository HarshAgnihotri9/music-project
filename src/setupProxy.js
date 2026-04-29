const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/saavn-proxy',
    createProxyMiddleware({
      target: 'https://aac.saavncdn.com',
      changeOrigin: true,
      pathRewrite: (path) => {
        // strip /saavn-proxy prefix to get the real path
        return path.replace('/saavn-proxy', '');
      },
    })
  );
};