const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/post',
        createProxyMiddleware({
            target: 'http://localhost:8082',
            changeOrigin: true,
        })
    );
    /*app.use(
        '/follow',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );*/
};