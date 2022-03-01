<template>
	<div class="all-wrap">
		<div class="sys-wrap">
			<div class="img-wrap"><img
					src="../assets/img/logo.png" />
			</div>
			<div class="title">重庆中软-到店点餐系统</div>
		</div>
		
		<div v-if="isLogin" class="user-info">
			<div class="welcome">欢迎回来，{{role}}&nbsp;&nbsp;&nbsp;&nbsp;{{userId}}</div>
			<img v-on:click="ShowButton" v-if="!isShowButton" src="https://img.yzcdn.cn/vant/cat.jpeg" />
			<div class="user-buton" v-if="isShowButton">
				<a-button style="width: 70px; font-size: 10px;" @click="EditUserInfo" type="primary" size="small">修改信息</a-button>
				<a-button style="width: 70px; font-size: 10px;" @click="Quit" type="primary" size="small">退出登录</a-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PageHeader',
		
		data() {
			return {
				isShowButton:false,
				isLogin:false,
				role:"",
				userId:""
			};
		},
		mounted: function() {
			
			let people = JSON.parse(localStorage.getItem('role'))
				if(people){
					this.isLogin = true
					if (people.roleId == 3) {
						this.$data.role = "服务员"
					} else if (people.roleId == 2) {
						this.$data.role = "后厨人员"
					} else {
						this.$data.role = "管理人员"
					}
					this.$data.userId = people.userId
				}else{
					this.isLogin = false
				}
			

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
		height: 70px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #BBBBBB;
		box-shadow: 3px 3px 5px #e6e6e6;
		background-color: white;
	}
	.sys-wrap{
		display: flex;
		justify-content: left;
	}

	.all-wrap .img-wrap {
		height: 50px;
		width: 70px;
		margin-left: 10px;
	}

	.all-wrap .title {
		margin-left: 10px;
		padding-left: 0;
		font-size: 30px;
		font-weight: bold;
	}

	.user-info {
		margin-right: 20px;
		width: 500px;
		display: flex;
		justify-content: center;
	}
	.user-info img{
		width: 50px; 
		height: 50px;
		border-radius: 25px;
	}

	.user-info .welcome {
		text-align: center;
		font-size: 18px;
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
