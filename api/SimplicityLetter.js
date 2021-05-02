const db = wx.cloud.database()
const SimplicityLetter = db.collection("simplicity-letter")
const SimplicityLetterZan = db.collection("simplicity-letter-zan")

// 获取情书列表
export function getLetterList () {
	return SimplicityLetter.where({
		status: "1"
	}).get()
}

/**
 * 设置赞
 * @param {String} avatarUrl 用户头像地址
 * @param {String} letter 情书ID
 * @param {String} nickName 用户昵称
 */
export async function setZan (letter, avatarUrl, nickName, openId) {
	if (await getZanStatus(openId, letter)) return true
	return SimplicityLetterZan.add({
		data: {
			avatarUrl,
			letter,
			nickName,
			_createTime: new Date().getTime()
		}
	})
}

/**
 * 根据情书ID获取赞列表
 * @param {String} letter 情书ID
 */
export async function getZanList (letter) {
	// 取得查询
	const query = SimplicityLetterZan.where({
		letter
	})
	// 获取总数
	const tatal = await query.count().then(res => res.total)
	// 获取列表
	const list = await query.get().then(res => res.data)
	return {
		tatal,
		list
	}
}

/**
 * 获取点赞状态
 * @param {Object} openId 用户 openid
 * @param {Object} letter 情书 ID
 */
export async function getZanStatus (openId, letter) {
	return SimplicityLetterZan.where({
		_openid: openId,
		letter
	}).count().then(res => res.total > 0)
}

export async function cancelZan (openId, letter) {
	return SimplicityLetterZan.where({
		_openid: openId,
		letter
	}).remove()
}