const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: 'johnphotocv.staging.cameraclub.website',
    allowedHosts: 'all',
    port: 8080,
    hot: true,
    https: false,
  },

  publicPath: '/',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // Exclude SVGs in `src/assets/icons` from default svg loader
    svgRule.exclude.add(/src\/assets\/icons/)

    // Add new rule for inline SVGs using vue-svg-loader
    config.module
      .rule('inline-svg')
      .test(/\.svg$/)
      .include.add(/src\/assets\/icons/)
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
});
