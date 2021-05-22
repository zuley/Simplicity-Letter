/*
 * @Author: zuley
 * @Date: 2021-05-02 21:24:46
 * @LastEditors: zuley
 * @LastEditTime: 2021-05-12 19:56:27
 */
const cloud = require('wx-server-sdk')
cloud.init({
  env: "love-letter-5gc2te6l55839c5b"
})

const db = cloud.database()
const SimplicityLetterZan = db.collection("simplicity-letter-zan")


exports.main = async (event, context) => {
	const res = await SimplicityLetterZan.aggregate().match({
		_openid: event.openId
	}).lookup({
		from: "simplicity-letter",
		localField: "letter",
		foreignField: "_id",
		as: "letter"
	}).end()
	res.list = res.list.map(el => {
		return el.letter[0] || null
	})
  return res.list
}

