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
				/>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getList } from "../../api/SimplicityLetter.js"
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.loadLists()
		},
		methods: {
			loadLists () {
				getList().then(res => {
					this.list.push(...res.data)
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
