class PackageWebpackPlugin {
  constructor(option) {
    this.option = option
    this.time = Date.now()
    this.packageId = option.packageId
    this.wsMap = option.wsMap
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap('entryOption', () => {
      this.wsMap[this.packageId].send(JSON.stringify({
        status: 'entryOption',
        text: '成功接收配置'
      }))
    })
    compiler.hooks.afterPlugins.tap('afterPlugins', () => {
      this.wsMap[this.packageId].send(JSON.stringify({
        status: 'afterPlugins',
        text: '插件加载完成'
      }))
    })
    compiler.hooks.emit.tap('emit', () => {
      this.wsMap[this.packageId].send(JSON.stringify({
        status: 'emit',
        text: '已成功生成资源'
      }))
    })
    compiler.hooks.emit.tap('afterEmit', () => {
      this.wsMap[this.packageId].send(JSON.stringify({
        status: 'emit',
        text: '资源生成完成'
      }))
    })
    compiler.hooks.emit.tap('done', () => {
      this.wsMap[this.packageId].send(JSON.stringify({
        status: 'done',
        text: `打包成功！用时${((Date.now() - this.time) / 1000).toFixed(1)}`
      }))
    })
  }
}

module.exports = PackageWebpackPlugin