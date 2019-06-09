'use strict'

const BaseController = require('./BaseController')
const Sha = require('../utilities/Sha')
const randomstring = require('randomstring')
const config = require('config')
let dingtalkConf = config.get('dingtalk')
const moment = require('moment')
const DingTalk = require('../components/Dingtalk')
const ConfModel = require('../models/Config')
const Response = require('../utilities/Response')
const DingTalkAutoLogin = require('../services/DingtalkAutoLoginService')

class AuthController extends BaseController {
  async dingWjsapiSign (ctx) {
    let url = ctx.query.url
    let nonceStr = randomstring.generate(16)
    let agentId = dingtalkConf.w.AgentId
    let timeStamp = moment().unix()
    let corpId = dingtalkConf.corpId
    let jsapiTicket = await DingTalk.getJsapiTicketFromCache(ConfModel.DINGTALK_W_JSAPI_TICKET)
    let signString = 'jsapi_ticket=' + jsapiTicket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + url
    let sign = Sha.sha1(signString)
    return {
      agentId: agentId,
      corpId: corpId,
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      signature: sign
    }
  }

  async dingWAutoLogin (ctx) {
    let code = ctx.query.code
    let userDetail = await DingTalkAutoLogin.getUserDetail(code)
    if (!userDetail) {
      return Response.error('Login fail.')
    }
    let user = await DingTalkAutoLogin.syncUserInfo(userDetail)
    ctx.session.login = { userId: user.id }
    return Response.success({
      id: user.id,
      name: user.real_name,
      email: user.email,
      mobile: user.mobile,
      workPlace: user.work_place || '-',
      headPhoto: user.head_photo || undefined
    })
  }
}

module.exports = AuthController
