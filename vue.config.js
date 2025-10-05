const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '今日夸夸机-Chris233'
        return args
      })
  }
})
