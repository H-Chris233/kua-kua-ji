const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/kua-kua-ji/' : '/',
  outputDir: 'docs',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '今日夸夸机-Chris233'
        return args
      })
  }
})
