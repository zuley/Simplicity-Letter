const cloud = require('wx-server-sdk')

exports.main = async (event, context) => {
  let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  return {
    openId: OPENID,
    appId: APPID,
  }
}