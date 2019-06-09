'use strict'

const crypto = require('crypto')

exports.sha1 = (str) => {
  return crypto.createHash('sha1').update(str).digest('hex')
}
