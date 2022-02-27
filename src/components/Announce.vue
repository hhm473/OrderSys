<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>

		<div class="catalog">
			<span class="cata-info">
				<router-link to="/administratorindex" style="color: white;">管理员首页</router-link>
			</span>
			>
			<span class="cata-info">
				<router-link to="/announce" style="color: white;">实时公告发布</router-link>
			</span>
			<a-button class="btn-back">返回</a-button>
		</div>
		<div class="content-wrap">
			<div class="con-title">
				<div class="title-text">标题:</div>
				<div class="title-input">
					<input v-model="title" />
				</div>
			</div>
			<div class="con-content">
				<div class="content-text">正文:</div>
				<div class="content-input">
					<textarea v-model="content"></textarea>
				</div>
			</div>
			<a-button type="primary" @click="Submit">提交</a-button>
		</div>
	</div>
</template>

<script>
	import PageHeader from './PageHeader.vue'
	export default {
		name: 'AdministratorIndex',
		components: {
			PageHeader,
		},

		mounted: function() {

			let peaple = JSON.parse(localStorage.getItem('role'))

			if (peaple.roleId == 1) {
				this.$data.role = "服务员"
			} else if (peaple.roleId == 2) {
				this.$data.role = "后厨人员"
			} else {
				this.$data.role = "管理人员"
			}
			// this.$data.userId = peaple.userId
			//userId需要在用户表中存在
		},
		data() {
			return {
				role: "",
				userId: "user1",
				title: "",
				content: ""
			}
		},
		methods: {
			Submit() {
				let that = this;
				console.log(
						"title"+ that.title+
						"contents"+ that.content+
						"userId"+that.userId)
				this.axios.get("http://47.98.238.175:8080/notice/add", {
					params: {
						"userId": that.userId,
						"title": that.title,
						"contents": that.content,
					}
				}).then(function(response) {
					alert('发布成功！');
					that.$router.go(-1);
				}).catch(function(error) {
					alert(error);
				});
			}
		}
	}
</script>

<style>
	.catalog {
		margin-top: 100px;
		height: 50px;
		font-size: 20px;
		line-height: 30px;
		padding: 10px 20px 10px 20px;
	}

	.cata-info {
		background-color: #A4ADB3;
		color: white;
	}

	.btn-back {
		float: right;
	}

	.content {
		display: flex;
		margin-top: 20px;
		justify-content: space-around;

	}

	.left-select {
		width: 30%;
		height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: white;
	}

	.left-select div {
		height: 50px;
		border-radius: 10px;
		background-color: #CFD8DC;
		width: 200px;
		line-height: 50px;
		text-align: center;
	}

	.content-wrap {
		margin: auto;
		margin-top: 20px;
		width: 800px;
		background-color: white;
		padding: 20px;
	}

	.con-title {
		height: 100px;
		margin: 20px 0;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.con-title .title-text {
		flex: 1;
		font-size: 20px;
	}

	.con-title .title-input {
		flex: 8;
	}

	.con-title .title-input input {
		height: 50px;
		width: 550px;
		font-size: 20px;
	}

	.con-content {
		height: 400px;
		margin: 20px 0;
		width: 90%;
		display: flex;
		justify-content: center;
	}

	.con-content .content-text {
		flex: 1;
		font-size: 18px;
	}

	.con-content .content-input {
		flex: 8;
	}

	.con-content .content-input textarea {
		width: 550px;
		height: 350px;
		font-size: 20px;
	}
</style>
