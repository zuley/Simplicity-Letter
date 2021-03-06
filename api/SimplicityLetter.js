import { getOpenId } from "./wx.js"

const db = wx.cloud.database()
const SimplicityLetter = db.collection("simplicity-letter")
const SimplicityLetterZan = db.collection("simplicity-letter-zan")
const SimplicityLetterStar = db.collection("simplicity-letter-star")

// 获取情书列表
export function getLetterList ({ page = 1, size = 10 } = {}) {
	return SimplicityLetter.where({
		status: "1"
	}).orderBy('date', 'desc').limit(size).skip((page - 1) * size).get()
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

/**
 * 取消赞
 * @param {Object} openId 用户标识
 * @param {Object} letter 情书ID
 */
export async function cancelZan (openId, letter) {
	return SimplicityLetterZan.where({
		_openid: openId,
		letter
	}).remove()
}

/**
 * 获取喜欢状态
 * @param {Object} openId 用户 openid
 * @param {Object} letter 情书 ID
 */
export async function getStarStatus (openId, letter) {
	return SimplicityLetterStar.where({
		_openid: openId,
		letter
	}).count().then(res => res.total > 0)
}

/**
 * 取消喜欢
 * @param {Object} openId 用户标识
 * @param {Object} letter 情书ID
 */
export async function cancelStar (openId, letter) {
	return SimplicityLetterStar.where({
		_openid: openId,
		letter
	}).remove()
}

/**
 * 设置喜欢
 * @param {String} avatarUrl 用户头像地址
 * @param {String} letter 情书ID
 * @param {String} nickName 用户昵称
 */
export async function setStar (letter, nickName, openId) {
	if (await getStarStatus(openId, letter)) return true
	return SimplicityLetterStar.add({
		data: {
			letter,
			nickName,
			_createTime: new Date().getTime()
		}
	})
}

/**
 * 获取用户点赞数
 * @param {Object} openId 用户标识
 */
export async function getUserZansCount (openId) {
	return SimplicityLetterZan.where({
		_openid: openId
	}).count()
}

/**
 * 获取用户点赞列表
 * @param {Object} openId 用户表示
 */
export async function getUserZansList ({ page = 1, size = 10 } = {}, openId) {
	return await wx.cloud.callFunction({
		name: "getUserZans",
		data: {
			openId,
			page,
			size
		}
	}).then(res => {
		return {
			data: res.result
		}
	})
}

/**
 * 获取用户收藏数
 * @param {Object} openId 用户标识
 */
export async function getUserStarsCount (openId) {
	return SimplicityLetterStar.where({
		_openid: openId
	}).count()
}

/**
 * 获取用户收藏列表
 * @param {Object} openId 用户表示
 */
export async function getUserStarsList ({ page = 1, size = 10 } = {}, openId) {
	return await wx.cloud.callFunction({
		name: "getUserStars",
		data: {
			openId,
			page,
			size
		}
	}).then(res => {
		return {
			data: res.result
		}
	})
}