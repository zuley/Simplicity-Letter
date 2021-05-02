<template>
	<view class="m-card">
		<image class="pic" :src="pic" mode="aspectFill"></image>
		<!-- <view class="decorate"></view> -->
		<view class="box">
			<rich-text class="format" :nodes="htmlNode"></rich-text>
		</view>
		<view class="date">{{ date }}</view>
		<view class="tools">
			<!-- 点赞 -->
			<view v-if="!zanStatus" class="iconfont" @click="handleZan">&#xe872;</view>
			<view v-else class="iconfont" @click="handleCancelZan">&#xe871;</view>
			<!-- 喜欢 -->
			<view class="iconfont" @click="handleStar">&#xe870;</view>
			<view class="iconfont" @click="handleCancelStar">&#xe86f;</view>
			<!-- 分享 -->
			<view class="iconfont" @click="handleShare">&#xe6eb;</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from "../../common/html-parser.js"
	import { setZan, getZanList, getZanStatus, cancelZan } from "../../api/SimplicityLetter.js"
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
				zanStatus: false
			};
		},
		computed: {
			htmlNode () {
				return htmlParser(this.content)
			}
		},
		created () {
			this.getZanList()
			this.getZanStatus()
		},
		methods: {
			async handleZan () {
				await this.initData()
				setZan(this.letter, this.userInfo.avatarUrl, this.userInfo.nickName, this.openId).then(res => {
					console.log('点赞成功')
				})
			},
			async handleCancelZan  () {
				await this.initData()
				cancelZan(this.openId, this.letter).then(res => {
					console.log('res', res)
				})
			},
			handleStar () {
				console.log("收藏")
			},
			handleCancelStar () {
				console.log("取消收藏")
			},
			handleShare () {
				console.log("分享")
			},
			// 初始化数据
			async initData () {
				if (this.openId && this.userInfo) return
				this.openId = await getOpenId()
				this.userInfo = await getUserInfo()
			},
			// 获取赞列表
			getZanList () {
				getZanList(this.letter).then(res => {
					console.log(res)
				})
			},
			getZanStatus () {
				getZanStatus(this.openId, this.letter).then(res => {
					console.log(res)
					this.zanStatus = res
				})
			}
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
	.box {
		padding: 20rpx 40rpx;
	}
	.format {
		font-size: 40rpx;
		line-height: 1.8;
		font-family: "平方黑体,微软黑体";
		color: #666;
	}
	.date {
		font-size: 30rpx;
		color: #ddd;
		position: absolute;
		bottom: 30rpx;
		left: 40rpx;
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
	}
}
</style>
