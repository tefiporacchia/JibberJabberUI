const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/post',
        createProxyMiddleware({
            target: 'http://localhost:80',
            changeOrigin: false,
        })
    );
    app.use(
        '/follow/',
        createProxyMiddleware({
            target: 'http://localhost:80/follow/',
            changeOrigin: true,
        })
    );
};