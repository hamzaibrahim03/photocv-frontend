const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: 'rytonlocal-staging.cameraclub.website',
    allowedHosts: 'all',
    port: 8080,
    hot: true,
    https: false,
  },

  publicPath: '/',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.exclude.add(/src\/assets\/icons/)

    config.module
      .rule('inline-svg')
      .test(/\.svg$/)
      .include.add(/src\/assets\/icons/)
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
});
