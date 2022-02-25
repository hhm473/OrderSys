<template>
	<div class="all-wrap">
		<div class="sys-wrap">
			<div class="img-wrap"><img
					src="http://s3plus.meituan.net/v1/mss_55947e464b144ac4b…8afb82d/waimai-i-production/img/logo.aa43b090.png" />
			</div>
			<div class="title">重庆中软-到店点餐系统</div>
		</div>
		
		<div v-if="isLogin" class="user-info">
			<div class="welcome">欢迎回来，{{userType}}&nbsp;&nbsp;&nbsp;&nbsp;{{userName}}</div>
			<img v-on:click="ShowButton" v-if="!isShowButton" style="width: 50px; height: 50px;" src="https://img.yzcdn.cn/vant/cat.jpeg" />
			<div class="user-buton" v-if="isShowButton">
				<a-button style="width: 70px; font-size: 10px;" @click="EditUserInfo" type="primary" size="small">修改信息</a-button>
				<a-button style="width: 70px; font-size: 10px;" @click="Quit" type="primary" size="small">退出登录</a-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		props: {
			'isLogin': {
				type: Boolean,
				default: false
			},
			'userType': String,
			'userName': String,
			'userPic': {
				type: String,
				default: "https://img.yzcdn.cn/vant/cat.jpeg"
			},
		},
		
		data() {
			return {
				isShowButton:false
			};
		},
		
		methods: {
			ShowButton(){
				this.$data.isShowButton = true
				let that = this
				
				let timer =setTimeout(
					function(){
						that.$data.isShowButton = false
					}
				,3000)
			},
			EditUserInfo(){
				this.$router.push({path:"/edituserinfo"})
			},
			Quit(){
				this.$router.push({path:"/login"})
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
		z-index: 99999;
		position: absolute;
		top: 0;
		left: 0;
		height: 90px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #BBBBBB;
		box-shadow: 2px 2px 2px #616161;
		background-color: white;
	}
	.sys-wrap{
		display: flex;
		justify-content: left;
	}

	.all-wrap .img-wrap {
		height: 60px;
		width: 60px;
		margin-left: 10px;
	}

	.all-wrap .title {
		margin-left: 10px;
		font-size: 34px;
		font-weight: bold;
	}

	.user-info {
		margin-right: 20px;
		width: 500px;
		display: flex;
		justify-content: center;
	}

	.user-info .welcome {
		text-align: center;
		font-size: 20px;
		width: 400px;
		padding-top: 10px;
	}
	.user-buton{
		width: 50px;
		height: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
</style>
