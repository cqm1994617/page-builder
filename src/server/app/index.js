const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('@koa/cors')
const createFile = require('../createFile')

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


app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(9090)