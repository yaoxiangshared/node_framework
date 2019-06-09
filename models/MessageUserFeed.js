'use strict'

const Db = require('../components/Db')
const MessageCommon = require('../models/MessageCommon')
const MessageConst = require('../models/MessageConst')
const MessageApp = require('../models/MessageApp')
const _ = require('lodash')
const moment = require('moment')

class MessageUserFeed {
  constructor () {
    this.tableName = 'msg_users_feeds'
  }

  async getList (appId, userId, offset) {
    let query = Db.db('msg_users_feeds')
      .select('msg_users_feeds.id', 'msg_users_feeds.is_read', 'msg_users_feeds.source_type', 'msg_users_feeds.created_at', 'msg_message_common.title', 'msg_apps.name as source')
      .leftJoin('msg_message_common', 'msg_users_feeds.msg_id', 'msg_message_common.id')
      .leftJoin('msg_apps', 'msg_message_common.app_id', 'msg_apps.id')
      .where('msg_users_feeds.user_id', '=', userId)
      .andWhere('msg_message_common.app_id', '=', appId)
      .andWhere('msg_message_common.target_type', '=', MessageConst.MESSAGE_USER_INT)
      .andWhere('msg_message_common.status', '=', MessageConst.SEND_STATUS_SUCCESS)
      .orderBy('msg_users_feeds.id', 'desc')
      .limit(20)
    if (offset) {
      query.andWhere('msg_users_feeds.id', '<', offset)
    }
    let rs = await query
    let result = rs.map(o => {
      o.category = MessageConst.MESSAGE_TISM_FORMAT[o.source_type]
      o.created_at = moment.unix(o.created_at).format('YYYY-MM-DD HH:mm')
      return o
    })
    return result
  }

  async getUserApps (userId) {
    let messageIds = await Db.db(this.tableName).where({ user_id: userId }).select('msg_id').distinct().pluck('msg_id')
    let appIds = await MessageCommon.getAppIdsByMsgIds(messageIds)
    let apps = await MessageApp.getListByIds(appIds)
    return _.map(apps, o => _.pick(o, ['id', 'name']))
  }

  async getDetail (userId, id) {
    let rs = await Db.db('msg_users_feeds')
      .select('msg_users_feeds.id', 'msg_users_feeds.source_type', 'msg_users_feeds.created_at', 'msg_message_common.title', 'msg_apps.name as source', 'msg_message_content.content')
      .leftJoin('msg_message_common', 'msg_users_feeds.msg_id', 'msg_message_common.id')
      .leftJoin('msg_message_content', 'msg_message_common.content_id', 'msg_message_content.id')
      .leftJoin('msg_apps', 'msg_message_common.app_id', 'msg_apps.id')
      .where('msg_users_feeds.user_id', '=', userId)
      .andWhere('msg_users_feeds.id', '=', id)
      .andWhere('msg_message_common.target_type', '=', MessageConst.MESSAGE_USER_INT)
      .andWhere('msg_message_common.status', '=', MessageConst.SEND_STATUS_SUCCESS)
      .first()
    if (!rs) return undefined
    rs.category = MessageConst.MESSAGE_TISM_FORMAT[rs.source_type]
    rs.created_at = moment.unix(rs.created_at).format('YYYY-MM-DD HH:mm')
    return rs
  }

  async read (userId, id) {
    await Db.db('msg_users_feeds').where({ id: id, user_id: userId }).update({ is_read: 1 })
  }

  async unread (userId) {
    let rs = await Db.db('msg_users_feeds').where({ user_id: userId, is_read: 0 }).count('id as cnt').first()
    return rs
  }
}

module.exports = new MessageUserFeed()
