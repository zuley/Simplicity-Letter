<template>
	<view class="p-home">
		<swiper class="part" previous-margin="0" next-margin="0" vertical>
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
	import { getLetterList, getUserZansList } from "../../api/SimplicityLetter.js"
	const loadFun = {
		'home': getLetterList,
		'zan': getUserZansList
	}
	export default {
		components: {
			wybLoading
		},
		data() {
			return {
				list: [],
			}
		},
		onLoad(params) {
			this.loadLists(params.type)
		},
		methods: {
			loadLists (type = "home") {
				this.$refs.loading.showLoading()
				loadFun[type]().then(res => {
					this.list.push(...res.data)
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
