'use strick'

const Router = require('koa-router')
const AppController = require('../controller/AppController')

const router = new Router({ prefix: '/manager/app' })
const appController = new AppController()

router.get('/list', async (ctx, next) => {
  ctx.body = await appController.list(ctx)
  await next
})

router.post('/edit', async (ctx, next) => {
  ctx.body = await appController.edit(ctx)
  await next
})

router.post('/add', async (ctx, next) => {
  ctx.body = await appController.add(ctx)
  await next
})

module.exports = router
