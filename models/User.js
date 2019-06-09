'use strict'

const Db = require('../components/Db')
const moment = require('moment')

class User {
  constructor () {
    this.tableName = 'msg_users'
  }
  async save (params) {
    let time = moment().unix()
    let data = {
      user_name: params.email,
      real_name: params.name,
      email: params.email,
      mobile: params.mobile || '',
      dingtalk_userid: params.dingtalk_userid || '',
      work_place: params.work_place || '',
      head_photo: params.head_photo || '',
      state_code: params.state_code || '',
      created_at: time,
      updated_at: time
    }
    let rs = await Db.db('msg_users').insert(data)
    return rs ? rs[0] : 0
  }

  async update (id, data) {
    await Db.db('msg_users').where({ id: id }).update(data)
  }

  async getUserById (id) {
    let users = await Db.db('msg_users').where({ 'id': id }).first()
    if (!users) return undefined
    return users
  }

  async getUserByDingtalkUserId (id) {
    let users = await Db.db('msg_users').where({ 'dingtalk_userid': id }).first()
    if (!users) return undefined
    return users
  }

  async getUserIdsByEmails (emails) {
    let userIds = await Db.db('msg_users').whereIn('email', emails).select('id').pluck('id')
    return userIds
  }

  async getUserByIds (ids) {
    let users = await Db.db('msg_users').whereIn('id', ids)
    if (!users || users.length === 0) return []
    return users
  }

  async getUserExists (condition) {
    let query = Db.db('msg_users')
    if (condition.email) query.orWhere({ email: condition.email })
    if (condition.mobile) query.orWhere({ mobile: condition.mobile })
    if (condition.dingtalk_userid) query.orWhere({ dingtalk_userid: condition.dingtalk_userid })
    let rs = await query.first()
    return rs
  }

  async getList (offset, limit, condition) {
    let query = Db.db(this.tableName)
    if (condition.real_name) {
      query.orWhere({ real_name: condition.real_name })
    }
    let rs = await query.select('id', 'real_name', 'email', 'mobile', 'work_place')
      .offset(offset).limit(limit)
    return rs
  }

  async getTotalNums (condition) {
    let query = Db.db(this.tableName)
    if (condition.real_name) {
      query.orWhere({ real_name: condition.real_name })
    }
    let rs = await query
      .count('* as total_nums')
    return rs[0]['total_nums']
  }
  async editInfo (id, data) {
    let rs = await Db.db(this.tableName)
      .where('id', id)
      .update(data)
    return rs
  }
}

module.exports = new User()
