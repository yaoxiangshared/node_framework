'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const Session = require('./components/Session')
const { Login } = require('./middleware/LoginMiddleware')
const cors = require('@koa/cors')
const app = new Koa()
const router = new Router()

const log = require('log4js')
log.getLogger().level = process.env.LOG4J_LEVEL || 'debug'

// for session secret
app.keys = ['xJwekshlHsoiwenL18901BVFjskadfh12)12$#ssdfo']

const sess = new Session(app)

// dingtalk jsapi sign
router.get('/ding-wjsapi-sign', async (ctx, next) => {
  let AuthController = require('./controller/AuthController')
  let auth = new AuthController()
  ctx.body = await auth.dingWjsapiSign(ctx)
  await next()
})

// dingtalk auto login
router.get('/ding-auto-login', async (ctx, next) => {
  let AuthController = require('./controller/AuthController')
  let auth = new AuthController()
  ctx.body = await auth.dingWAutoLogin(ctx)
})

router.get('/user-info', async (ctx, next) => {
  // logger.info(ctx)
  let UserController = require('./controller/UserController')
  let user = new UserController()
  ctx.body = await user.info(ctx)
  await next()
})

router.get('/app/list', async (ctx, next) => {
  let AppController = require('./controller/AppController')
  let app = new AppController()
  ctx.body = await app.list(ctx)
  await next()
})

router.get('/message/list', async (ctx, next) => {
  let MessageController = require('./controller/MessageController')
  let message = new MessageController()
  ctx.body = await message.list(ctx)
  await next()
})

router.get('/message/content', async (ctx, next) => {
  let MessageController = require('./controller/MessageController')
  let message = new MessageController()
  ctx.body = await message.content(ctx)
  await next()
})

router.get('/message/read', async (ctx, next) => {
  let MessageController = require('./controller/MessageController')
  let message = new MessageController()
  ctx.body = await message.read(ctx)
  await next()
})

router.get('/message/unreads', async (ctx, next) => {
  let MessageController = require('./controller/MessageController')
  let message = new MessageController()
  ctx.body = await message.unread(ctx)
  await next()
})

app.use(cors({
  credentials: true,
  maxAge: 86400
}))
app.use(sess.start())
app.use(koaBody())
app.use(Login)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
