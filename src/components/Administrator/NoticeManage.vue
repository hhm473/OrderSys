<template>
	<div class="body">
		<div class="title">历史公告查看</div>
		<a-table :columns="columns" :data-source="noticeList" bordered :scroll="{ y: 350 }">
			<a-button slot="edit" slot-scope="text, record" @click="() => toEditNotice(record)">
				修改
			</a-button>
			<template slot="delete" slot-scope="text, record">
				<a-popconfirm v-if="noticeList.length" title="确定删除 ?" @confirm="() => onDelete(record)">
					<a-button>删除</a-button>
				</a-popconfirm>
			</template>
		</a-table>
	</div>
</template>

<script>
	const columns = [{
			title: "标题",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "发布时间",
			key: "sendTime",
			dataIndex: "sendTime",
		},
		{
			title: "修改",
			key: "edit",
			dataIndex: "edit",
			scopedSlots: {
				customRender: "edit",
			},
		},
		{
			title: "删除",
			key: "delete",
			dataIndex: "delete",
			scopedSlots: {
				customRender: "delete",
			},
		},
	];

	export default {
		name: "Registeration",
		data() {
			return {
				columns,
				noticeList: []
			};
		},
		mounted: function() {
			this.GetNotice();
		},

		methods: {
			//获取所有公告
			GetNotice() {
				let that = this
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				this.axios.get("http://47.98.238.175:8080/notice/all", {
						headers: {
							'Token': token
						},
					})
					.then(res => {
						that.noticeList = res.data.map((item, i) => {
							item.key = i
							item.sendTime = that.formatDateTime(item.sendTime)
							return item
						})
						console.log(that.noticeList)
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			//同意申请
			toEditNotice(record) {
				this.$router.push({
					name: "EditNotice",
					params: record
				})
			},

			onDelete(record) {
				let that = this;
				console.log(record.key);
				this.noticeList.splice(this.noticeList.findIndex(item => item.key == record.key), 1)
				this.axios.get("http://47.98.238.175:8080/notice/remove", {
					params: {
						'notice_id': record.noticeId
					}
				}).then(function(response) {
					that.$message.success('删除成功！');
				}).catch(function(error) {
					that.$message.error(error);
				});
			},
			formatDateTime(date) {
				let that = this;
				let time = new Date(Date.parse(date));
				time.setTime(time.setHours(time.getHours() + 8));
				let Y = time.getFullYear() + '-';
				let M = that.addZero(time.getMonth() + 1) + '-';
				let D = that.addZero(time.getDate()) + ' ';
				let h = that.addZero(time.getHours()) + ':';
				let m = that.addZero(time.getMinutes()) + ':';
				let s = that.addZero(time.getSeconds());
				return Y + M + D + h + m + s;
			},
			addZero(num) {
				return num < 10 ? '0' + num : num;
			}
		},
	};
</script>

<style scoped>
	.body {
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		padding: 10px 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
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
</style>
