const path = require('path');

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        'Vue': 'vue/dist/vue.esm.js',
        '@': path.resolve('src')
      }
    }
  }
}