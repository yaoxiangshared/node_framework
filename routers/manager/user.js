'use strick'

const Router = require('koa-router')
const UserController = require('../../controller/manager/UserController')

const router = new Router({ prefix: '/manager/user' })
const userController = new UserController()

router.get('/list', async (ctx, next) => {
  ctx.body = await userController.list(ctx)
  await next
})

router.post('/edit', async (ctx, next) => {
  ctx.body = await userController.edit(ctx)
  await next
})

router.post('/add', async (ctx, next) => {
  ctx.body = await userController.add(ctx)
  await next
})

module.exports = router
