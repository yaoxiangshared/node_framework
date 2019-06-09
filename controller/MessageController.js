'use strict'

const BaseController = require('./BaseController')
const Response = require('../utilities/Response')
const UserFeed = require('../models/MessageUserFeed')
const _ = require('lodash')

class MessageController extends BaseController {
  async list (ctx) {
    let queryParams = ctx.request.query
    let appId = queryParams.app_id
    let offset = queryParams.offset || undefined
    let userId = ctx.state.user.id
    let list = await UserFeed.getList(appId, userId, offset)
    let feedIds = list.map(o => { return o.id })
    return Response.success({ 'items': list, 'offset': _.min(feedIds) })
  }

  async content (ctx) {
    let queryParams = ctx.request.query
    let feedId = queryParams.id
    let userId = ctx.state.user.id
    let list = await UserFeed.getDetail(userId, feedId)
    return Response.success(list)
  }

  async read (ctx) {
    let queryParams = ctx.request.query
    let id = queryParams.id
    let userId = ctx.state.user.id
    await UserFeed.read(userId, id)
    return Response.success()
  }

  async unread (ctx) {
    let userId = ctx.state.user.id
    let rs = await UserFeed.unread(userId)
    return Response.success(rs)
  }
}

module.exports = MessageController
