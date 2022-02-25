<template>
	<div>
		<page-header is-login="true" user-name="哈哈哈" user-type="点餐服务人员"></page-header>

		<div class="body">
			<a-row>
				<a-col :span="7">
					<CallBoard :list="anunlist"></CallBoard>
				</a-col>
				<a-col :span="2" style="background-color: #E8E8E8; height: 750px;"></a-col>
				<a-col :span="15" style="padding: 10px;">
					<div>
						<div class="title">
							传菜推送信息
						</div>
						<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 150 }">
							<a-tag slot="cook" slot-scope="text, record"
								:color="record.cook === '已烹饪' ? 'geekblue' : record.cook==='正在烹饪' ? 'volcano' : 'green'"
								@click="() => handlecook(record.key)">
								{{ record.cook}}
							</a-tag>
						</a-table>
					</div>
					<div>
						<div class="title">
							正在进行中的订单
						</div>
						<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 150 }">
							<a-button slot="check" slot-scope="text, record" @click="() => checkcook(record.key)">
								查看
								<!-- {{record}} -->
							</a-button>
							<a-tag slot="cook" slot-scope="text, record"
								:color="record.cook === '已烹饪' ? 'geekblue' : record.cook==='正在烹饪' ? 'volcano' : 'green'"
								@click="() => handlecook(record.key)">

								{{ record.cook}}
								<!-- {{record}} -->
							</a-tag>
						</a-table>
					</div>
					<div style="text-align: center; padding-bottom: 20px;">
						<a-button type="primary" size="large">前往点菜</a-button>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script scoped>
	const columns = [{
			title: '菜品名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '菜品桌号',
			dataIndex: 'tableNum',
			key: 'table-num',
		},
		{
			title: '菜品数量',
			key: 'number',
			dataIndex: 'number',
		},
		{
			title: '烹制状态',
			key: 'cook',
			dataIndex: 'cook',
			scopedSlots: {
				customRender: 'cook'
			},
		},
		{
			title: '订单详情',
			key: 'check',
			dataIndex: 'check',
			scopedSlots: {
				customRender: 'check'
			},
		},
	];

	const data = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		}, {
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		}, {
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		}, {
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		}, {
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			cook: "已烹饪"
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			cook: "等待烹饪"
		},
	];
	import PageHeader from './PageHeader.vue'
	import CallBoard from './CallBoard.vue'
	export default {
		name: 'SignUp',
		components: {
			PageHeader,
			CallBoard
		},

		mounted: function() {
			let peaple = this.$route.query
			if (peaple.roleId == 3) {
				this.$data.role = "服务员"
			}
			else if(peaple.roleId == 2) {
				this.$data.role = "后厨人员"
			}
			else{
				this.$data.role = "管理人员"
			}
			this.$data.userId = peaple.userId
		},
		data() {
			return {
				data,
				columns,
				role: "",
				userId: "",
				anunlist: [{
						title: "打扫卫生",
						notice_id: "1",
						user_id: "",
						contents: "做卫生",
						send_time: "2022-02-24 09:58:55"

					},
					{
						title: "开会通知",
						notice_id: "2",
						user_id: "",
						contents: "今天晚上8点半在办公室开会",
						send_time: "2022-02-24 09:58:55"

					}
				]
			}
		},
		methods: {
			handlecook(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.cook === "等待烹饪") {
						target.cook = "正在烹饪";
					} else {
						target.cook = "已烹饪"
					}
				}
			},
		}
	}
</script>

<style scoped>
	.body {
		height: 750px;
		width: 96%;
		margin: 100px 2% 0 2%;
		/* margin-top: 100px;/ */
		background-color: white;
	}

	.selector {
		padding: 10px 0 10px 0;
	}
	.title {
		font-size: 30px;
		font-weight: bold;
		padding-left: 60px;
	}
</style>
