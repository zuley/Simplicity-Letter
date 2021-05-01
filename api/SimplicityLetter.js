const db = wx.cloud.database()
const SimplicityLetter = db.collection("simplicity-letter")

export function getList () {
	console.log('进入了查询列表')
	return SimplicityLetter.where({
		status: "1"
	}).get()
}