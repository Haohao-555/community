module.exports = {
    publicPath: './',
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://39.104.61.32:8000',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/api'
                }
            }
        }
    },
}