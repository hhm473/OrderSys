<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>

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
						<a-table :columns="columnsDish" :data-source="dataDish" bordered :scroll="{y: 150 }">
							<a-tag slot="deliver" slot-scope="text, record"
								:color="record.deliver === '已推送' ? 'geekblue' : record.deliver==='正在推送' ? 'volcano' : 'green'"
								@click="() => handledeliver(record.key)">
								{{ record.deliver}}
							</a-tag>
						</a-table>
					</div>
					<div>
						<div class="title">
							正在进行中的订单
						</div>
						<a-table :columns="columnsOrder" :data-source="dataOrder" bordered :scroll="{y: 150 }">
							<a-button slot="check" slot-scope="text, record" @click="() => checkdeliver(record.key)">
								查看
							</a-button>
							<template slot="pay" slot-scope="text, record">
								<a-popconfirm v-if="dataOrder.length" title="确定结账 ?"
									@confirm="() => onDelete(record.key)">
									<a-button>结账</a-button>
								</a-popconfirm>
							</template>

						</a-table>
					</div>
					<div style="text-align: center; padding-bottom: 20px;">
						<a-button type="primary" size="large" @click="toOrder">前往点菜</a-button>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script scoped>
	const columnsDish = [{
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
			title: '菜品状态',
			key: 'deliver',
			dataIndex: 'deliver',
			scopedSlots: {
				customRender: 'deliver'
			},
		},
	];
	const columnsOrder = [{
			title: '菜品桌号',
			dataIndex: 'tableNum',
			key: 'table-num',
		},
		{
			title: '下单时间',
			dataIndex: 'orderTime',
			key: 'order-time',
		},
		{
			title: '总金额',
			key: 'total-price',
			dataIndex: 'totalPrice',
		},
		{
			title: '订单详情',
			key: 'check',
			scopedSlots: {
				customRender: 'check'
			},
		},
		{
			title: '结账',
			dataIndex: 'pay',
			scopedSlots: {
				customRender: 'pay'
			},
		},
	];

	const dataDish = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			deliver: "已推送"
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			deliver: "等待推送"
		},
	];
	const dataOrder = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			deliver: "已推送"
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			deliver: "等待推送"
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
			let peaple = JSON.parse(localStorage.getItem('role'))
			if (peaple.roleId == 3) {
				this.$data.role = "服务员"
			} else if (peaple.roleId == 2) {
				this.$data.role = "后厨人员"
			} else {
				this.$data.role = "管理人员"
			}
			this.$data.userId = peaple.userId
		},
		data() {
			return {
				dataDish,
				dataOrder,
				columnsOrder,
				columnsDish,
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
			handledeliver(key) {
				console.log("进入handlebook")
				const newData = [...this.dataDish];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.deliver === "等待推送") {
						target.deliver = "正在推送";
					} else {
						target.deliver = "已推送"
					}
				}
			},
			toOrder() {
				this.$router.push({
					path: "/Order"
				})
			}
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
