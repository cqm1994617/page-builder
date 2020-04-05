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
  .post('/server/publish', (ctx) => {
    const body = ctx.request.body

    createFile(body.componentList)
    ctx.body = {
      a: 1
    }
  })


app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(9090)