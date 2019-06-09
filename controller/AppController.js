'use strict'

const BaseController = require('./BaseController')
const Response = require('../utilities/Response')
const UserFeed = require('../models/MessageUserFeed')

class AppController extends BaseController {
  async list (ctx) {
    let apps = await UserFeed.getUserApps(ctx.state.user.id)
    return Response.success({ 'apps': apps })
  }
}

module.exports = AppController
