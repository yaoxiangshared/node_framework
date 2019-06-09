'use strict'

// message type
let MESSAGE_EMAIL = 'email'
let MESSAGE_USER = 'user'
let MESSAGE_MSM = 'msm'
let MESSAGE_DINGTALK = 'dingtalk'

// message type number
let MESSAGE_USER_INT = 1
let MESSAGE_EMAIL_INT = 2
let MESSAGE_MSM_INT = 3
let MESSAGE_DINGTALK_INT = 4

let SEND_STATUS_SUCCESS = 1
let SEND_STATUS_FAIL = 2

// name to id
let MESSAGE_TSIM = {
  'email': MESSAGE_EMAIL_INT,
  'user': MESSAGE_USER_INT,
  'msm': MESSAGE_MSM_INT,
  'dingtalk': MESSAGE_DINGTALK_INT
}

let MESSAGE_TISM = {
  2: 'email',
  1: 'user',
  3: 'msm',
  4: 'dingtalk'
}

let MESSAGE_TISM_FORMAT = {
  2: 'Email',
  1: 'Message',
  3: 'Msm',
  4: 'Dingtalk'
}

module.exports = {
  SEND_STATUS_SUCCESS: SEND_STATUS_SUCCESS,
  SEND_STATUS_FAIL: SEND_STATUS_FAIL,
  MESSAGE_EMAIL: MESSAGE_EMAIL,
  MESSAGE_USER: MESSAGE_USER,
  MESSAGE_MSM: MESSAGE_MSM,
  MESSAGE_DINGTALK: MESSAGE_DINGTALK,
  MESSAGE_EMAIL_INT: MESSAGE_EMAIL_INT,
  MESSAGE_USER_INT: MESSAGE_USER_INT,
  MESSAGE_MSM_INT: MESSAGE_MSM_INT,
  MESSAGE_DINGTALK_INT: MESSAGE_DINGTALK_INT,
  MESSAGE_TSIM: MESSAGE_TSIM,
  MESSAGE_TISM: MESSAGE_TISM,
  MESSAGE_TISM_FORMAT: MESSAGE_TISM_FORMAT
}
