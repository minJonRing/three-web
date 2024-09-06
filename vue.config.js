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
})
