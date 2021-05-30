const cloud = require('wx-server-sdk')
cloud.init({
  env: "love-letter-5gc2te6l55839c5b"
})

const db = cloud.database()
const SimplicityLetterStar = db.collection("simplicity-letter-star")


exports.main = async (event, context) => {
	const res = await SimplicityLetterStar.aggregate().match({
		_openid: event.openId
	}).sort({
		_createTime: -1
	}).skip((event.page - 1) * event.size).limit(event.size).lookup({
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

