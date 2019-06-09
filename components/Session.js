const session = require('koa-session')

const CONFIG = {
  key: 'msg:sess',
  maxAge: 604800000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true
}

class Session {
  constructor (app) {
    this.app = app
  }

  start () {
    return session(CONFIG, this.app)
  }
}

module.exports = Session
