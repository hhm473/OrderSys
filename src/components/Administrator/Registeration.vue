<template>
	<div class="body">
		<div class="title">注册申请</div>
		<a-table :columns="columns" :data-source="data" bordered :scroll="{ y: 350 }">
			<template slot="profilePic" slot-scope="text, record">
				<img :src="record.profilePic" style="height: 70px" />
			</template>
			<template slot="select" slot-scope="text, record">
				<a-select @change="handleChange(record, $event)" style="width: 100%">
					<a-select-option value="1"> 管理员 </a-select-option>
					<a-select-option value="2"> 后厨 </a-select-option>
					<a-select-option value="3"> 服务员 </a-select-option>
				</a-select>
			</template>

			<a-button slot="check1" slot-scope="text, record" @click="() => confirm(record)">
				确定
				<!-- {{record}} -->
			</a-button>
			<a-button slot="check2" slot-scope="text, record" @click="() => cancel(record)">
				删除
				<!-- {{record}} -->
			</a-button>
		</a-table>
	</div>

</template>

<script>
	const columns = [{
			title: "用户名",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "密码",
			key: "password",
			dataIndex: "password",
		},
		{
			title: "头像",
			dataIndex: "profilePic",
			key: "profilePic",
			scopedSlots: {
				customRender: "profilePic",
			},
		},
		{
			title: "身份选择",
			key: "select",
			dataIndex: "select",
			scopedSlots: {
				customRender: "select",
			},
		},
		{
			title: "确定",
			key: "check1",
			dataIndex: "check",
			scopedSlots: {
				customRender: "check1",
			},
		},
		{
			title: "删除",
			key: "check2",
			dataIndex: "check",
			scopedSlots: {
				customRender: "check2",
			},
		},
	];

	const data = [{
			key: "0",
			name: "John Brown",
			pic: "2",
			password: "1",
		},
		{
			key: "1",
			name: "John Brown",
			pic: "2",
			password: "1",
		},
		{
			key: "2",
			name: "John Brown",
			pic: "2",
			password: "1",
		},
	];

	export default {
		name: "Registeration",
		data() {
			return {
				data,
				columns,
			};
		},
		mounted: function() {
			this.GetUser();
		},

		methods: {
			//获取所有用户信息
			GetUser() {
				this.axios.get("http://47.98.238.175:8080/user/queryAll")
					.then((res) => {
						let data = res.data;
						data = data.filter((item) => item.roleId == 0);
						this.data = data;
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			//同意申请
			confirm(key) {
				let that = this;
				if (key.roleId == 0) {
					that.$message.error('请选择用户身份');
				} else {
					this.axios({
							method: "post",
							url: "http://47.98.238.175:8080/user/modify",
							data: this.$qs.stringify(key),
						})
						.then((res) => {
							console.log(res);
							this.GetUser();
						})
						.catch((err) => {
							console.log(err);
						});
				}
			},

			//拒绝申请
			cancel(key) {
				this.axios
					.get("http://47.98.238.175:8080/user/remove", {
						params: {
							userId: key.userId,
						},
					})
					.then((res) => {
						console.log(res);
						this.GetUser();
					})
					.catch((err) => {
						console.log(err);
					});
			},

			//修改身份
			handleChange(key, value) {
				for (let i = 0; i < this.data.length; i++) {
					if (this.data[i].userId == key.userId) {
						this.data[i].roleId = value;
						break;
					}
				}
			},


		},
	};
</script>

<style scoped>
	.body {
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		border-radius: 25px;
		padding: 10px 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
		background-color: rgba(255, 255, 255, 0.7);
	}
</style>
