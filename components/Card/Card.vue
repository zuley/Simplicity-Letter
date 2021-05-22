<template>
	<view class="m-card">
		<image class="pic" :src="pic" mode="aspectFill"></image>
		<view class="box">
			<rich-text class="format" :nodes="htmlNode"></rich-text>
		</view>
		<view class="zanlist">
			<view class="box">
				<image class="avatar" v-for="item in zanList" :src="item.avatarUrl"></image>
			</view>
			<view class="nums" v-if="zanTatal > 0">{{ zanTatal }}人觉得很赞</view>
		</view>
		<view class="date">{{ date }}</view>
		<view class="tools">
			<!-- 点赞 -->
			<view v-if="!zanStatus" class="iconfont" @tap="handleZan">&#xe872;</view>
			<view v-else class="iconfont" @tap="handleCancelZan">&#xe871;</view>
			<!-- 喜欢 -->
			<view v-if="!starStatus" class="iconfont" @tap="handleStar">&#xe870;</view>
			<view v-else class="iconfont" @tap="handleCancelStar">&#xe86f;</view>
			<!-- 分享 -->
			<!-- <view class="iconfont" @tap="handleShare">&#xe6eb;</view> -->
			<!-- 用户中心 -->
			<navigator class="icon" url="../../pages/user/user">
				<view class="iconfont">&#xe916;</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import htmlParser from "../../common/html-parser.js"
	import { setZan, getZanList, getZanStatus, cancelZan, setStar, getStarStatus, cancelStar } from "../../api/SimplicityLetter.js"
	import { getOpenId, getUserInfo } from "../../api/wx.js"
	export default {
		name:"Card",
		props: {
			pic: String,
			content: String,
			date: String,
			letter: String
		},
		data() {
			return {
				userInfo: null,
				openId: null,
				zanStatus: false,
				starStatus: false,
				zanList: [],
				zanTatal: 0
			};
		},
		computed: {
			htmlNode () {
				return htmlParser(this.content)
			}
		},
		async created () {
			if (!this.openId) this.openId = await getOpenId()
			this.getZanList()
			this.getZanStatus()
		},
		methods: {
			// 点赞
			async handleZan () {
				await this.initData()
				this.zanStatus = true
				setZan(this.letter, this.userInfo.avatarUrl, this.userInfo.nickName, this.openId).then(res => {
					this.getZanList()
				}).catch(err => {
					this.zanStatus = false
				})
			},
			// 取消赞
			async handleCancelZan  () {
				this.zanStatus = false
				cancelZan(this.openId, this.letter).then(res => {
					this.getZanList()
				}).catch(err => {
					this.zanStatus = true
				})
			},
			// 获取赞列表
			getZanList () {
				getZanList(this.letter).then(res => {
					this.zanList = res.list
					this.zanTatal = res.tatal
				})
			},
			// 获取赞状态
			async getZanStatus () {
				getZanStatus(this.openId, this.letter).then(res => {
					this.zanStatus = res
				})
			},
			// 点击收藏
			async handleStar () {
				await this.initData()
				this.starStatus = true
				setStar(this.letter, this.userInfo.nickName, this.openId).catch(err => {
					this.starStatus = false
				})
			},
			// 取消收藏
			async handleCancelStar () {
				this.starStatus = false
				cancelStar(this.openId, this.letter).catch(err => {
					this.starStatus = true
				})
			},
			// 获取收藏状态
			getStarStatus () {
				getStarStatus(this.openId, this.letter).then(res => {
					this.starStatus = true
				})
			},
			handleShare () {
				uni.showToast({
					title: "敬请期待",
					icon: "none"
				})
			},
			// 初始化数据
			async initData () {
				if (this.userInfo) return
				this.userInfo = await getUserInfo()
			},
		}
	}
</script>

<style lang="scss">
.m-card {
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;
	position: relative;
	.pic {
		width: 750rpx;
		height: 750rpx;
	}
	>.box {
		padding: 20rpx 40rpx;
	}
	.format {
		font-size: 40rpx;
		line-height: 1.8;
		font-family: "平方黑体,微软黑体";
		color: #666;
	}
	.zanlist {
		display: flex;
		line-height: 40rpx;
		height: 40rpx;
		position: absolute;
		bottom: 30rpx;
		left: 30rpx;
		.box {
			margin-right: 20rpx;
		}
		.avatar {
			width: 40rpx;
			height: 40rpx;
			border-radius: 100%;
			position: relative;
			z-index: 10;
			&+.avatar {
				margin-left: -20rpx;
				box-shadow: 0 0 5rpx rgba($color: #000000, $alpha: .2);
			}
			&:nth-child(2) { z-index: 9; opacity: .8; }
			&:nth-child(3) { z-index: 8; opacity: .7; }
			&:nth-child(4) { z-index: 7; opacity: .6; }
			&:nth-child(5) { z-index: 6; opacity: .5; }
			&:nth-child(6) { z-index: 5; opacity: .4; }
			&:nth-child(7) { z-index: 4; opacity: .3; }
		}
		.nums {
			font-size: 25rpx;
			color: #999;
		}
	}
	.date {
		font-size: 30rpx;
		color: #ddd;
		position: absolute;
		bottom: 30rpx;
		left: 40rpx;
		display: none;
	}
	.tools {
		position: absolute;
		right: 40rpx;
		bottom: 30rpx;
		.iconfont {
			font-family: iconfont;
			font-size: 50rpx;
			color: #999;
			float: left;
			margin-left: 10rpx;
		}
		.icon {
			float: left;
		}
	}
}
</style>
