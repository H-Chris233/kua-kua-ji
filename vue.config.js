const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.DEPLOY_PLATFORM === 'vercel' ? '/' : '/kua-kua-ji/',
  outputDir: process.env.DEPLOY_PLATFORM === 'vercel' ? 'dist' : 'docs',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '今日夸夸机-Chris233'
        return args
      })
  }
})
