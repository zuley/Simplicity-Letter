<template>
	<view class="m-card">
		<image class="pic" :src="pic" mode="aspectFill"></image>
		<!-- <view class="decorate"></view> -->
		<view class="box">
			<rich-text class="format" :nodes="htmlNode"></rich-text>
		</view>
		<view class="date">{{ date }}</view>
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
}
</style>
