'use strict'

const MessageApp = require('../models/MessageApp')
const BaseController = require('./BaseController')
const Response = require('../utilities/Response')
const Log = require('../components/Log')
const Sha = require('../utilities/Sha')
const randomstring = require('randomstring')
const moment = require('moment')

class AppController extends BaseController {
  async list (ctx) {
    try {
      ctx.verifyParams({
        page: { type: 'number', required: true },
        limit: { type: 'number', required: true }
      })
    } catch (exception) {
      return Response.error(exception.errors)
    }
    let params = ctx.request.query
    let page = params.page
    let limit = params.limit
    let offset = (page - 1) * limit

    let userId = 11

    let appList = await MessageApp.getList(offset, limit, userId)
    let totalNums = await MessageApp.getTotalNums(userId)
    return Response.success({
      list: appList,
      total_nums: totalNums

    })
  }

  async edit (ctx) {
    try {
      ctx.verifyParams({
        app_id: { type: 'number', required: true },
        status: { type: 'number', required: true },
        app_name: { type: 'string', required: true }
      })
    } catch (exception) {
      return Response.error(exception.errors)
    }

    let params = ctx.request.body
    let { app_name: appName, status, app_id: appId } = params
    let time = moment().unix()
    let data = {
      name: appName,
      status: status,
      updated_at: time
      // key: Sha.sha1('key' + appName + time + randomstring.generate(16)),
      // secret: Sha.sha1('secret' + appName + time + randomstring.generate(16))
    }
    this.logger.debug(data)
    let rs = await MessageApp.editInfo(appId, data)
    if (rs !== 0) {
      return Response.success()
    } else {
      return Response.error()
    }
  }
  async add (ctx) {
    try {
      ctx.verifyParams({
        status: { type: 'number', required: true },
        app_name: { type: 'string', required: true }
      })
    } catch (exception) {
      return Response.error(exception.errors)
    }

    let params = ctx.request.body
    let { app_name: appName, status } = params
    let time = moment().unix()
    let data = {
      name: appName,
      status: status,
      updated_at: time,
      key: Sha.sha1('key' + appName + time + randomstring.generate(16)),
      secret: Sha.sha1('secret' + appName + time + randomstring.generate(16))
    }
    this.logger.debug(data)
    let rs = await MessageApp.add(data)
    if (rs !== 0) {
      return Response.success()
    } else {
      return Response.error()
    }
  }
}

module.exports = AppController
