const queryString = require('query-string')

const WebSocketAPI = (wss, wsMap) => {
  wss.on('connection', function connection(ws, req) {
    const packageId = queryString.parseUrl(req.url).query.packageId
    console.log(req.url)
    console.log(queryString.parseUrl(req.url).query)
    wsMap[packageId] = ws
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    })
    ws.send('INIT')
  })
}

module.exports = WebSocketAPI