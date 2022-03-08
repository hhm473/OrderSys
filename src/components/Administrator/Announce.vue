<template>
	<div class="body">
		<div class="title">发布实时公告</div>
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
			<div style="width: 100%;">
				<a-button type="primary" @click="Submit" style="margin: auto; ">提交</a-button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'AdministratorIndex',

		mounted: function() {

			let peaple = JSON.parse(localStorage.getItem('role'))

			this.$data.userId = peaple.userId
			//userId需要在用户表中存在
		},
		data() {
			return {
				role: "",
				userId: "user3",
				title: "",
				content: ""
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			Submit() {
				let that = this;
				this.axios.get("http://47.98.238.175:8080/notice/add", {
					params: {
						"userId": that.userId,
						"title": that.title,
						"contents": that.content,
					}
				}).then(function(response) {
					that.$message.success('发布成功！');
					that.title= "",
					that.content= ""
				}).catch(function(error) {
					that.$message.error(error);
				});
			}
		}
	}
</script>

<style>
	.body {
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
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
