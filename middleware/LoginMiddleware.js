'use strict'

const _ = require('lodash')
const Response = require('../utilities/Response')
const User = require('../models/User')
const logger = require('log4js').getLogger('LoginCheck')

const UN_CHECK_URI = ['/ding-auto-login']

let fail = (ctx) => {
  ctx.response.status = 401
  ctx.body = Response.error('Unauthorized')
}

exports.Login = async (ctx, next) => {
  if (!UN_CHECK_URI.includes(ctx.request.path)) {
    if (!_.has(ctx.session, 'login.userId')) {
      logger.info('userid not in session.')
      return fail(ctx)
    }
    let userId = ctx.session.login.userId
    let user = await User.getUserById(userId)
    if (!user) {
      logger.info('user not found')
      return fail(ctx)
    }
    ctx.state.user = user
  }
  await next()
}
