'use strict'
const Log = require('../../components/Log')
class BaseController {
  constructor () {
    this.logger = Log.getLogger(this.constructor.name)
  }

  getAppPermissionList (ctx) {
    return 3
  }
}

module.exports = BaseController
