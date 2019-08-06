// const target='http://localhost:9090/yx';
// const target='http://192.168.0.179:8090';
const target='http://192.168.0.179:8090';
// const target2='http://202.114.207.128';

// const target='http://localhost:9090';
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'docs',
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/index.scss";`
      }
    }
  },
  devServer:{
    port:8889,
    disableHostCheck: true,
    proxy: {
      '/proxy': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '/wx'
        }
      }
    },
  }
};