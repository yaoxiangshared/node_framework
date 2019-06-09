'use strict'

const Db = require('../components/Db')

const DINGTALK_E_ACCESS_TOKEN = 'dingtalk_e_access_token'
const DINGTALK_E_JSAPI_TICKET = 'dingtalk_e_jsapi_ticket'
const DINGTALK_W_ACCESS_TOKEN = 'dingtalk_w_access_token'
const DINGTALK_W_JSAPI_TICKET = 'dingtalk_w_jsapi_ticket'

class Config {
  async getDingtalkAccessToken (type) {
    let val = await Db.db('msg_config').where({ key: type }).first().select('value')
    if (!val) return undefined
    return val.value
  }

  async getDingtalkJsapiTicket (type) {
    let val = await Db.db('msg_config').where({ key: type }).first().select('value')
    if (!val) return undefined
    return val.value
  }
}

module.exports.h = new Config()
module.exports.DINGTALK_E_ACCESS_TOKEN = DINGTALK_E_ACCESS_TOKEN
module.exports.DINGTALK_E_JSAPI_TICKET = DINGTALK_E_JSAPI_TICKET
module.exports.DINGTALK_W_ACCESS_TOKEN = DINGTALK_W_ACCESS_TOKEN
module.exports.DINGTALK_W_JSAPI_TICKET = DINGTALK_W_JSAPI_TICKET
