'use strict'

const DingTalk = require('../components/Dingtalk')
const User = require('../models/User')
const _ = require('lodash')

class DingtalkAutoLoginService {
  async getUserDetail (code) {
    let user = await DingTalk.getWUserInfo(code)
    if (!user) return undefined
    let userDetail = await DingTalk.getWUserDetail(user.userid)
    if (!userDetail) return undefined
    return userDetail
  }

  async syncUserInfo (userDetail) {
    let userId
    let existUser = await User.getUserExists({
      email: userDetail.email,
      mobile: userDetail.mobile,
      dingtalk_userid: userDetail.userid
    })
    if (!existUser) {
      userId = await User.save({
        email: userDetail.email,
        name: userDetail.name,
        mobile: userDetail.mobile,
        dingtalk_userid: userDetail.userid,
        work_place: userDetail.workPlace,
        head_photo: userDetail.avatar,
        state_code: userDetail.stateCode
      })
    } else {
      userId = existUser.id
      let params = {}
      if (!existUser.dingtalk_userid) params.dingtalk_userid = userDetail.userid
      if (!existUser.mobile) params.mobile = userDetail.mobile
      if (!existUser.user_name) params.user_name = userDetail.name
      if (!existUser.email) params.email = userDetail.email
      if (!existUser.head_photo) params.head_photo = userDetail.avatar
      params.work_place = userDetail.workPlace
      params.state_code = userDetail.stateCode
      if (!_.isEmpty(params)) {
        await User.update(userId, params)
      }
    }
    let newUserDetail = await User.getUserById(userId)
    return newUserDetail
  }
}

module.exports = new DingtalkAutoLoginService()
