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
				this.axios.get("http://47.98.238.175:8080/notice/all")
					.then(res => {
						that.noticeList = res.data.map((item, i) => {
							item.key = i
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
	},
	};
</script>

<style scoped>
	.body {
		padding: 10px 10px;
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
</style>
