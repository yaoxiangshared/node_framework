'use strick'
const Router = require('koa-router')
const appRouter = require('./app')
const userRouter = require('./user')

const router = new Router()

router.use(appRouter.routes())
router.use(userRouter.routes())
module.exports = router
