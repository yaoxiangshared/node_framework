'use strict'

const Conf = require('../models/Config')
// const config = require('config')
// let dingtalkConf = config.get('dingtalk')
const axios = require('axios')
const _ = require('lodash')
const util = require('util')

const HOST = 'https://oapi.dingtalk.com'
const USER_INFO_URL = '%s/user/getuserinfo?access_token=%s&code=%s'
const USER_DETAIL_URL = '%s/user/get?access_token=%s&userid=%s'

class Dingtalk {
  async getAccessTokenFromCache (type) {
    let rs = await Conf.h.getDingtalkAccessToken(type)
    return rs ? rs.access_token : undefined
  }

  async getJsapiTicketFromCache (type) {
    let rs = await Conf.h.getDingtalkJsapiTicket(type)
    return rs ? rs.access_token : undefined
  }

  async getUserInfo (type, code) {
    let accessToken = await this.getAccessTokenFromCache(type)
    let rs = await axios.get(util.format(USER_INFO_URL, HOST, accessToken, code))
    if (!_.has(rs, 'data.userid')) return undefined
    return rs.data
  }

  async getWUserInfo (code) {
    let rs = await this.getUserInfo(Conf.DINGTALK_W_ACCESS_TOKEN, code)
    return rs
  }

  async getUserDetail (type, userid) {
    let accessToken = await this.getAccessTokenFromCache(type)
    let rs = await axios.get(util.format(USER_DETAIL_URL, HOST, accessToken, userid))
    if (!_.has(rs, 'data.userid')) return undefined
    return rs.data
  }

  async getWUserDetail (userid) {
    let rs = await this.getUserDetail(Conf.DINGTALK_W_ACCESS_TOKEN, userid)
    return rs
  }
}

module.exports = new Dingtalk()
