<template>
	<div class="xq-wrap">
		<div style="display: flex;">
			<div class="img-wrap">
				<img :src="dishPic" />
			</div>
			<div>
				<div class="name">{{dishName}}</div>
				<div class="price">价格：&nbsp;&nbsp;&nbsp;{{price}}元</div>
			</div>
		</div>
		<div>
			<a-row>
				<a-col :span="8">
					菜品简介：
				</a-col>
				<a-col :span="16">
					<div class="jianjie">{{intro}}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">
					菜品详情：
				</a-col>
				<a-col :span="16">
					<div class="jianjie">{{detail}}</div>
				</a-col>
			</a-row>
<!-- 
			<div style="text-align: center; padding-bottom: 20px;">
				<a-button>返回</a-button>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: {
			'dishPic': {
				type: String,
				default: ""
			},
			'dishName': {
				type: String,
				default: "鱼香肉丝"
			},
			'intro': {
				type: String,
				default: "肉丝+胡罗卜+笋丝"
			},
			'detail': {
				type: String,
				default: "川菜是中国汉族传统的四大菜系之一、中国八大菜系之一、中华料理集大成者。川菜有着本土川菜与海派川菜之分，本土川菜中，四川菜系又包括川味菜肴、面点小吃、火锅等。 [11] 	川菜分为三派： 蓉派（ 上河帮）、 渝派（ 下河帮）、 盐帮派（ 小河帮）。“ 三派 “已有定论的基础上，规范化表述为：上河帮川菜即以川西成都、 乐山为中心地区的川菜； "
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
		border: 1px solid #A4ADB3;
		height: 300px;
		width: 450px;
		align-items: center;
		background-color: white;
	}

	.xq-wrap .img-wrap {
		height: 110px;
		width: 110px;
		margin: 0 20px 0 10px;
	}

	.name {
		font-size: 1.5em;
	}

	.tuijian {
		font-size: 0.75em;
		color: red;
		padding-left: 8px;
	}

	.jianjie {
		font-size: 0.75em;
		padding: 8px 0 8px 0;
	}

	.price {
		font-size: 1.5em;
		padding-right: 50px;
	}

	.number {
		padding: 0 15px 0 15px;
	}
</style>
