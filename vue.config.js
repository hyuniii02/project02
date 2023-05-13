module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
      disableHostCheck: true,
      open: true,
      port: 8080,
      proxy: {
        '/': {
          // 连接到后端的路径
          target: 'http://localhost:8081/myhome',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/': '/'
          }
        }
      }
    }
  }