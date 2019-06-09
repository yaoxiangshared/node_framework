'use strict'

const Db = require('../components/Db')

class Developer {
  constructor () {
    this.tableName = 'msg_develops'
  }

  async getAppList (userId) {
    let rs = await Db.db(this.tableName).where('user_id', userId)
    return rs
  }
}

module.exports = new Developer()
