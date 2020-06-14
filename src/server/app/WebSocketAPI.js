const queryString = require('query-string')
const createFile = require('../createFile')
const config = require('../config')

const WebSocketAPI = (wss, wsMap) => {
  wss.on('connection', (ws, req) => {
    const packageId = queryString.parseUrl(req.url).query.packageId
    wsMap[packageId] = ws
    ws.on('message', async (message) => {
      const data = JSON.parse(message)
      if (data.type === 'PAGELIST') {
        const folderId = await createFile(data.pageList, data.packageId, wsMap)
        ws.send(
          JSON.stringify({
            status: 'finish',
            folderId,
            text: '打包成功',
            filePath: `${config.host}/build-page/${folderId}.zip`
          })
        )
        ws.close()
        delete wsMap[data.packageId]
      }
    })
    ws.on('close', () => {
      console.log(`关闭--${packageId}`)
      delete wsMap[packageId]
    })
    ws.send(JSON.stringify({
      status: 'init',
      text: '成功与服务端建立连接...'
    }))
  })
}

module.exports = WebSocketAPI