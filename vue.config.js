const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // build: {
  //   // 通过 rollupOptions 配置来确保正确处理自定义元素
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined,
  //     },
  //   },
  // },
  outputDir: 'client',
  assetsDir: `static/client`,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all', // 拆分所有模块（同步和异步）
        minSize: 20000, // 最小拆分大小，单位为字节（20KB）
        maxSize: 500000, // 最大拆分大小，单位为字节（500KB）
        minChunks: 1, // 最少引用次数，模块被引用多少次才会被拆分
        maxAsyncRequests: 30, // 最大异步请求数
        maxInitialRequests: 30, // 入口点的最大并行请求数
        automaticNameDelimiter: '-', // 文件名分隔符
        name: undefined, // 拆分的文件名自动生成
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 匹配 `node_modules` 中的第三方库
            priority: -10, // 优先级
            name: 'chunk-vendors', // 输出文件名
          },
          common: {
            test: /[\\/]src[\\/]components[\\/]/, // 拆分 `components` 中公共代码
            minChunks: 2, // 最少被两个模块引用
            priority: -20, // 优先级
            reuseExistingChunk: true, // 复用已有的模块
          },
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/client": {
        target: `http://localhost:3000`, //修改后台接口地址
        changeOrigin: true,
      },
      "/upload": {
        target: `http://localhost:3000`, //修改后台接口地址
        changeOrigin: true,
      },
    },
  },
})
