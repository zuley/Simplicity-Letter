<template>
	<view class="p-home">
		<swiper class="part" previous-margin="0" next-margin="0" vertical
			@change="handleChange"
		>
			<swiper-item
				v-for="item in list"
			>
				<Card
					:pic="item.cover"
					:content="item.content"
					:date="item.date"
					:letter="item._id"
				/>
			</swiper-item>
		</swiper>
		<wyb-loading ref="loading"/>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import { getLetterList, getUserZansList, getUserStarsList } from "../../api/SimplicityLetter.js"
	const loadFun = {
		'home': getLetterList,
		'zan': getUserZansList,
		'star': getUserStarsList
	}
	export default {
		components: {
			wybLoading
		},
		data() {
			return {
				type: 'home',
				list: [],
				page: 1,
				size: 2
			}
		},
		onLoad(params) {
			this.type = params.type || 'home'
			this.initEnv()
			this.loadNext()
		},
		methods: {
			initEnv () {
				const Dict = {
					'home': '三行情书',
					'zan': '我的点赞',
					'star': '我的收藏'
				}
				uni.setNavigationBarTitle({
					title: Dict[this.type]
				})
			},
			handleChange (current, source) {
				if (current.detail.current === this.list.length - 1) {
					this.loadNext()
				}
			},
			loadNext () {
				this.$refs.loading.showLoading()
				loadFun[this.type]({
					page: this.page,
					size: this.size
				}).then(res => {
					if (res.data.length === 0) {
						uni.showToast({
							title: "没有更多了"
						})
						return
					}
					this.list.push(...res.data)
					this.page += 1
				}).finally(() => {
					this.$refs.loading.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
.p-home {
	width: 100vw;
	height: 100vh;
	.part {
		height: 100%;
	}
}
</style>
