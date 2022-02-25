<template>
	<div class="all-wrap">
		<div class="img-wrap"><img src="" />
		</div>
		<div>
			<div style="display: flex;">
				
			<div class="name">{{name}}</div>
			<div v-if="tuijian" class="tuijian">推荐</div>
			</div>
			<div class="jianjie">{{jianjie}}</div>
			<div style="display: flex;">
			<div class="price">{{price}}元</div>
			<div style="padding-top: 10px; display: flex;">
				
			<a-button size="small" icon="minus" />
			<div class="number">{{number}}</div>
			<a-button size="small" icon="plus" /></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: {
			'name': {
				type: String,
				default: "鱼香肉丝"
			},
			'tuijian': {
				type: Boolean,
				default: true
			},
			'jianjie': {
				type: String,
				default: "肉丝+胡罗卜+笋丝"
			},
			'price': {
				type: Number,
				default: 15
			},
			'number': {
				type: Number,
				default: 0
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

	.all-wrap {
		height: 150px;
		width: 350px;
		display: flex;
		align-items: center;
		border: #BBBBBB;
		background-color: white;
	}

	.all-wrap .img-wrap {
		height: 110px;
		width: 110px;
		margin: 0 20px 0 10px;
	}

	.name{
		font-size: 1.5em;
	}
	.tuijian{
		font-size: 0.75em;
		color: red;
		padding-left: 8px;
	}
	.jianjie{
		font-size: 0.75em;
		padding: 8px 0 8px 0;
	}
	.price{
		font-size: 1.5em;
		padding-right: 50px;
	}
	.number{
		padding: 0 15px 0 15px;
	}
</style>
