'use strict'

const BaseController = require('./BaseController')
const Response = require('../utilities/Response')

class UserController extends BaseController {
  async info (ctx) {
    let params = {
      id: ctx.state.user.id,
      name: ctx.state.user.real_name,
      email: ctx.state.user.email,
      workPlace: '-'
    }
    return Response.success(params)
  }
}

module.exports = UserController
