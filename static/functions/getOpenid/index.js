/*
 * @Author: zuley
 * @Date: 2021-05-02 21:24:46
 * @LastEditors: zuley
 * @LastEditTime: 2021-05-12 19:56:27
 */
const cloud = require('wx-server-sdk')

exports.main = async (event, context) => {
  let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  console.log(233)
  return {
    openId: OPENID,
    appId: APPID,
  }
}