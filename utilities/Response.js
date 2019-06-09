'use strict'

const _ = require('lodash')

exports.error = (msg, expand) => {
  let _default = {
    'status': false,
    'message': msg
  }
  if (_.isObject(expand)) {
    _.assign(_default, expand)
  }
  return _default
}

exports.success = (data) => {
  let _default = {
    'status': true
  }
  if (_.isObject(data)) {
    _.assign(_default, data)
  }
  return _default
}
