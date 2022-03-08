<template>
	<div class="xq-wrap">
		<div style="display: flex;">
			<div class="img-wrap">
				<img :src="dishPic" />
			</div>
			<div>
				<div style="display: flex;">

					<div class="name">{{dishName}}</div>
					<div v-if="tuijian" class="tuijian">推荐</div>
				</div>
				<div class="price">{{price}}元</div>
			</div>
		</div>
		<div>
			<div class="jianjie">{{detail}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DishXiangqing',
		props: {
			'dishPic': {
				type: String,
				default: ""
			},
			'dishName': {
				type: String,
				// default: "鱼香肉丝"
			},
			'price': {
				type: Number,
			},
			'tuijian': {
				type: Boolean,
				default: true
			},
			'detail': {
				type: String,
				// default: "川菜是中国汉族传统的四大菜系之一、中国八大菜系之一、中华料理集大成者。川菜有着本土川菜与海派川菜之分，本土川菜中，四川菜系又包括川味菜肴、面点小吃、火锅等。 [11] 	川菜分为三派： 蓉派（ 上河帮）、 渝派（ 下河帮）、 盐帮派（ 小河帮）。“ 三派 “已有定论的基础上，规范化表述为：上河帮川菜即以川西成都、 乐山为中心地区的川菜； "
			},
		},

		methods: {
			ShowButton() {
				this.$data.isShowButton = true
				let that = this

				let timer = setTimeout(
					function() {
						that.$data.isShowButton = false
					}, 3000)
			},
			EditUserInfo() {
				this.$router.push({
					path: "/edituserinfo"
				})
			},
			Quit() {
				this.$router.push({
					path: "/login"
				})
			}
		}

	}
</script>

<style scoped>
	img {
		height: 100%;
		width: 100%;
	}

	.xq-wrap {
		/* border: 1px solid #A4ADB3; */
		height: 300px;
		width: 450px;
		align-items: center;
		background-color: white;
	}

	.xq-wrap .img-wrap {
		height: 150px;
		width: 150px;
		margin: 0 70px 0 10px;
	}

	.name {
		font-size: 2em;
	}

	.tuijian {
		font-size: 1em;
		color: red;
		padding-left: 8px;
	}

	.jianjie {
		font-size: 1.3em;
		padding: 20px 0 0px 0;
		text-indent: 2em;
		line-height: 35px;
	}

	.price {
		font-size: 1.8em;
		padding: 60px 0 0 40px;
	}

	.number {
		padding: 0 15px 0 15px;
	}
</style>
