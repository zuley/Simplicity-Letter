<template>
	<view class="p-user">
		<view class="m-header">
			<open-data class="avatar" type="userAvatarUrl"></open-data>
			<open-data class="name" type="userNickName"></open-data>
			<!-- <view class="num">{{ msgNum }}次</view> -->
			<view class="msg" @tap="handleSubscription">订阅+1</view>
		</view>
		<view class="list">
			<view class="item" @tap="toUserZan">
				<view class="title">我的点赞</view>
				<view class="nums">{{ zans }}</view>
				<view class="iconfont">&#xe63c;</view>
			</view>
			<view class="item" @tap="toUserStar">
				<view class="title">我的收藏</view>
				<view class="nums">{{ stars }}</view>
				<view class="iconfont">&#xe63c;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getUserZansCount, getUserStarsCount } from "../../api/SimplicityLetter.js"
	import { getOpenId } from "../../api/wx.js"
	export default {
		data() {
			return {
				openId: null,
				msgNum: 0,
				zans: 0,
				stars: 0
			};
		},
		async created () {
			if (!this.openId) this.openId = await getOpenId()
			this.zans = await getUserZansCount(this.openId).then(res => res.total)
			this.stars = await getUserStarsCount(this.openId).then(res => res.total)
		},
		methods: {
			handleSubscription () {
				wx.requestSubscribeMessage({
				  tmplIds: ['tQ1G1K-ur5lCeVZaOkXx-xVW83hJhAC3f6MngUCoiVg'],
				  success (res) {
						console.log(res)
					}
				})
			},
			toUserZan () {
				uni.navigateTo({
					url: "../index/index?type=zan",
				})
			},
			toUserStar () {
				uni.navigateTo({
					url: "../index/index?type=star",
				})
			}
		}
	}
</script>

<style lang="scss">
.p-user {
	.m-header {
		padding: 80rpx 40rpx;
		background-color: #f8f8f8;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 100%;
			margin-right: 40rpx;
			overflow: hidden;
		}
		.name {
			color: #333;
			font-size: 40rpx;
		}
		.msg {
			padding: 0 10rpx;
			border-radius: 5rpx;
			background-color: #4CD964;
			color: #fff;
			margin-left: 10rpx;
		}
		.num {
			color: #999;
			margin-left: 10rpx;
		}
	}
	>.list {
		>.item {
			padding: 0 40rpx;
			border-bottom: 1px solid #f8f8f8;
			line-height: 120rpx;
			display: flex;
			.title {
				color: #666;
				font-size: 36rpx;
			}
			.nums {
				color: #999;
				margin-left: 30rpx;
				font-size: 30rpx;
				position: relative;
				top: 2rpx;
				flex: 1;
			}
			.iconfont {
				font-family: iconfont;
				font-size: 30rpx;
				color: #999;
			}
		}
	}
}
</style>
