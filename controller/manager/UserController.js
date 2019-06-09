'use strict'

const User = require('../../models/User')
const BaseController = require('./BaseController')
const Response = require('../../utilities/Response')
const moment = require('moment')

class UserController extends BaseController {
  async list (ctx) {
    try {
      ctx.verifyParams({
        page: { type: 'number', required: false, convertType: 'int', default: 1 },
        limit: { type: 'number', required: false, convertType: 'int', default: 20 },
        name: { type: 'string', required: false }
      })
    } catch (exception) {
      return Response.error(exception.errors)
    }
    let params = ctx.request.query
    this.logger.debug(params)
    let page = params.page
    let limit = params.limit
    let offset = (page - 1) * limit
    let condition = {
      'real_name': params.name
    }
    let appList = await User.getList(offset, limit, condition)
    let totalNums = await User.getTotalNums(condition)
    return Response.success({
      list: appList,
      total_nums: totalNums

    })
  }

  async edit (ctx) {
    try {
      ctx.verifyParams({
        id: { type: 'number', required: true },
        email: { type: 'email', required: false },
        mobile: { type: 'string', required: false }
      })
    } catch (exception) {
      return Response.error(exception.errors)
    }

    let params = ctx.request.body
    let { id, email, mobile } = params
    let time = moment().unix()
    let data = {
      email: email,
      mobile: mobile,
      updated_at: time
    }
    this.logger.debug(data)
    let rs = await User.editInfo(id, data)
    if (rs !== 0) {
      return Response.success()
    } else {
      return Response.error()
    }
  }
}

module.exports = UserController
