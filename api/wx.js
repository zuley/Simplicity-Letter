export async function getUserInfo () {
	if (!uni.getStorageSync('userInfo')) {
		await wx.getUserProfile({
			desc: "用于完善会员资料",
			success (res) {
				uni.setStorageSync('userInfo', JSON.stringify(res.userInfo))
			}
		})
	}
	return JSON.parse(uni.getStorageSync('userInfo'))
}

export async function getOpenId () {
	if (!uni.getStorageSync('openId')) {
		await wx.cloud.callFunction({
			name: "getOpenid"
		}).then(res => {
			uni.setStorageSync('openId', res.result.openId)
		})
	}
	return uni.getStorageSync('openId')
}