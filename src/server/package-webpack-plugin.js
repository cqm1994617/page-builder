class PackageWebpackPlugin {
  constructor(option) {
    this.option = option
    this.time = Date.now()
    this.packageId = option.packageId
    this.wsMap = option.wsMap
  }
  apply(compiler) {

    compiler.hooks.afterCompile.tap('afterCompile', (e) => {
      if (e.name) {
        this.wsMap[this.packageId] && this.wsMap[this.packageId].send(JSON.stringify({
          status: 'afterCompile',
          text: `${e.name} 文件编译完成`
        }))
      }
    })

    compiler.hooks.emit.tap('emit', () => {
      this.wsMap[this.packageId] && this.wsMap[this.packageId].send(JSON.stringify({
        status: 'emit',
        text: '已成功生成资源'
      }))
    })
    compiler.hooks.afterEmit.tap('afterEmit', () => {
      this.wsMap[this.packageId] && this.wsMap[this.packageId].send(JSON.stringify({
        status: 'afterEmit',
        text: '资源生成完成'
      }))
    })
    compiler.hooks.done.tap('done', () => {
      this.wsMap[this.packageId] && this.wsMap[this.packageId].send(JSON.stringify({
        status: 'done',
        text: `打包成功！用时${((Date.now() - this.time) / 1000).toFixed(1)}秒`
      }))
    })
  }
}

module.exports = PackageWebpackPlugin