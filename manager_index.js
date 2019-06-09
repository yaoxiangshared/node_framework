'use strict'

const Koa = require('koa')
const koaBody = require('koa-body')
const Session = require('./components/Session')
const cors = require('@koa/cors')
const app = new Koa()
const router = require('./routers/manager')
const parameter = require('./middleware/ParameterMiddleware')

// for session secret
app.keys = ['xJwekshlHsoiwenL18901BVFjskadfh12)12$#ssdfo']

// app.use(cors({
//   credentials: true,
//   maxAge: 86400
// }))
// app.use(sess.start())
app.use(parameter(app))
app.use(koaBody())
// app.use(Login)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
