const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('@koa/cors')
const createPreview = require('../createPreview')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')
const http = require('http')
const WebSocket = require('ws')
const WebSocketAPI = require('./WebSocketAPI')
const config = require('../config')

const app = new Koa()
const router = new Router()
app.use(bodyParser())

const wsMap = {}

router.prefix(config.prefix)

router
  .get('/server', (ctx) => {
    ctx.body = "服务已开启"
  })
  .post('/server/preview', async (ctx) => {

    const body = ctx.request.body

    const startTime = Date.now()

    const folderId = await createPreview(body.pageList)

    ctx.body = {
      text: '预览包生成完毕',
      folderId,
      time: `${Date.now() - startTime}毫秒`
    }
  })

app.use(cors())

app.use(mount('/page-builder-server/preview', serve(path.resolve(__dirname, '../preview-page'))))
app.use(mount('/page-builder-server/build-page', serve(path.resolve(__dirname, '../build-page'))))

app.use(router.routes()).use(router.allowedMethods())

// app.listen(9090)

const server = http.createServer(app.callback())

const wss = new WebSocket.Server({
  server,
  path: '/page-builder-server/ws'
})

WebSocketAPI(wss, wsMap)

server.listen(9090)