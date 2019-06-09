'use strict'

const Db = require('../components/Db')

class MessageApp {
  constructor () {
    this.tableName = 'msg_apps'
  }

  async getListByIds (ids) {
    let rs = await Db.db(this.tableName).whereIn('id', ids)
    return rs
  }

  async getList (offset, limit, userId) {
    let rs = await Db.db(this.tableName)
      .select(this.tableName + '.id', 'name', 'status', 'key', 'secret')
      .leftJoin('msg_developer', this.tableName + '.id', 'msg_developer.app_id')
      .where('msg_developer.user_id', userId)
      .offset(offset).limit(limit)
    return rs
  }

  async getTotalNums (userId) {
    let rs = await Db.db(this.tableName)
      .leftJoin('msg_developer', this.tableName + '.id', 'msg_developer.app_id')
      .where('msg_developer.user_id', userId)
      .count('* as total_nums')
    return rs[0]['total_nums']
  }
  async editInfo (appId, data) {
    let rs = await Db.db(this.tableName)
      .where('id', appId)
      .update(data)
    return rs
  }

  async add (data) {
    let rs = await Db.db(this.tableName)
      .insert(data)
    return rs
  }
}

module.exports = new MessageApp()
