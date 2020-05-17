const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('@koa/cors')
const createFile = require('../createFile')
const createPreview = require('../createPreview')

const app = new Koa()
const router = new Router()
app.use(bodyParser())

router
  .get('/server', (ctx) => {
    ctx.body = "服务已开启"
  })
  .post('/server/publish', async (ctx) => {
    const body = ctx.request.body

    await createFile(body.pageList)

    ctx.body = "打包完成"
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

app.use(router.routes()).use(router.allowedMethods())

app.listen(9090)