<template>
	<div class="body">
		<div class="title">修改公告</div>
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
					<textarea v-model="contents"></textarea>
				</div>
			</div>
			<div style="width: 100%;">
				<a-button type="primary" @click="Submit" style="margin: auto; ">提交</a-button>
				<a-button @click="back" style="margin-left: 20px; ">返回</a-button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'AdministratorIndex',

		mounted: function() {

			this.getDataFromRoute();
			let peaple = JSON.parse(localStorage.getItem('role'))

			this.$data.userId = peaple.userId
			//userId需要在用户表中存在
		},
		data() {
			return {
				role: "",
				userId: "user3",
				title: "",
				contents: "",
				noticeId:""
			}
		},
		methods: {
			getDataFromRoute() {
				let that = this;
				let initData = this.$route.params;
				that.title = initData.title;
				that.contents = initData.contents;
				that.noticeId = initData.noticeId;
				console.log(initData);
				console.log(that.title);
				console.log(that.contents);
			},
			back() {
				this.$router.go(-1);
			},
			Submit() {
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let that = this;
				this.axios.get("http://47.98.238.175:8080/notice/edit", {
					params: {
						"userId": that.userId,
						"title": that.title,
						"contents": that.contents,
						"noticeId":that.noticeId
					},
					headers: {
						'Token': token
					},
				}).then(function(response) {
					that.$message.success('修改成功！');
					that.$router.go(-1);
				}).catch(function(error) {
					that.$message.error(error);
				});
			}
		}
	}
</script>

<style scoped>
	.body {
		margin-bottom: 20px;
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
		background-color: rgba(255, 255, 255, 0.7);
	}

	.content-wrap {
		margin: auto;
		width: 80%;
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
		width: 800px;
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
		width: 800px;
		height: 350px;
		font-size: 20px;
		resize: none;
	}

	input,
	textarea {
		border-radius: 5px;
		border-style: none;
		padding-left: 5px;
	}

	input:focus,
	textarea:focus {
		outline: none;
	}
</style>
