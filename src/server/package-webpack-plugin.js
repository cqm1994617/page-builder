class PackageWebpackPlugin {
  constructor(option) {
    this.option = option
    this.time = Date.now()
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap('entryOption', () => {
      console.log('接收到了配置', Date.now())
    })
    compiler.hooks.afterPlugins.tap('afterPlugins', () => {
      console.log('plugins加载完成', Date.now())
    })
    compiler.hooks.emit.tap('emit', () => {
      console.log('编译完成，准备生成资源', Date.now())
    })
    compiler.hooks.emit.tap('afterEmit', () => {
      console.log('资源生成完成', Date.now())
    })
    compiler.hooks.emit.tap('done', () => {
      console.log('打包完成，总用时: ', ((Date.now() - this.time) / 1000).toFixed(1))
    })
  }
}

module.exports = PackageWebpackPlugin