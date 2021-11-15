// module.exports = {
//   publicPath: './',
//   devServer: {
//       host: 'localhost',
//       port: 8080,
//       proxy: {
//           '/api': {
//               target: 'http://39.104.61.32:8000',
//               changeOrigin: true,
//               pathRewrite: {
//                   '/api': '/api'
//               }
//           }
//       }
//   },
// }

const BASE_URL = process.env.NODE_ENV === 'production' ? '/mobile-community/' : './'
module.exports = {
    productionSourceMap:false,
    publicPath: BASE_URL,
    chainWebpack:(config)=>{
      config.plugins.delete('prefetch');
    }
  }