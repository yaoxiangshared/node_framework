'use strict'

const Db = require('../components/Db')

class MessageCommon {
  constructor () {
    this.tableName = 'msg_message_common'
  }

  async getAppIdsByMsgIds (msgIds) {
    let appIds = await Db.db(this.tableName).whereIn('id', msgIds).select('app_id').distinct().pluck('app_id')
    return appIds
  }
}

module.exports = new MessageCommon()
