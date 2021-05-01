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
			<view class="iconfont">&#xe872;</view>
			<view class="iconfont">&#xe871;</view>
			<!-- 喜欢 -->
			<view class="iconfont">&#xe870;</view>
			<view class="iconfont">&#xe86f;</view>
			<!-- 分享 -->
			<view class="iconfont">&#xe6eb;</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from "../../common/html-parser.js"
	export default {
		name:"Card",
		props: {
			pic: String,
			content: String,
			date: String
		},
		data() {
			return {
			};
		},
		computed: {
			htmlNode () {
				return htmlParser(this.content)
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
