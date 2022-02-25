<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>

		<div class="body">
			<a-row>
				<a-col :span="7">
					<CallBoard :list="anunlist"></CallBoard>
				</a-col>
				<a-col :span="2" style="background-color: #E8E8E8; height: 580px;"></a-col>
				<a-col :span="15" style="padding: 10px; height: 500px;">
					<div class="title">
						订单信息
					</div>
					<div class="selector">
						<a-select default-value="全部菜品名称" style="width: 120px; margin-right:20px;" size="small">
							<a-select-option value="火锅">
								火锅
							</a-select-option>
							<a-select-option value="米饭">
								米饭
							</a-select-option>
							<a-select-option value="全部菜品名称">
								全部菜品名称
							</a-select-option>
						</a-select>
						<a-select default-value="全部桌号" style="width: 120px; margin-right:20px;" size="small">
							<a-select-option value="火锅">
								火锅
							</a-select-option>
							<a-select-option value="米饭">
								米饭
							</a-select-option>
							<a-select-option value="全部菜品名称">
								全部菜品名称
							</a-select-option>
						</a-select>
						<a-select default-value="全部数量" style="width: 120px; margin-right:20px;" size="small">
							<a-select-option value="火锅">
								火锅
							</a-select-option>
							<a-select-option value="米饭">
								米饭
							</a-select-option>
							<a-select-option value="全部菜品名称">
								全部菜品名称
							</a-select-option>
						</a-select>
						<a-select default-value="全部烹制状态" style="width: 120px; margin-right:60px;" size="small">
							<a-select-option value="火锅">
								火锅
							</a-select-option>
							<a-select-option value="米饭">
								米饭
							</a-select-option>
							<a-select-option value="全部菜品名称">
								全部菜品名称
							</a-select-option>
						</a-select>
						<a-button>确定</a-button>
					</div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 300 }">
						<a-tag slot="cook" slot-scope="text, record"
							:color="record.cook === '已烹饪' ? 'geekblue' : record.cook==='正在烹饪' ? 'volcano' : 'green'"
							@click="() => handlecook(record.key)">

							{{ record.cook}}
							<!-- {{record}} -->
						</a-tag>
					</a-table>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
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
	];

	const data = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
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
			let peaple = JSON.parse(localStorage.getItem('role'))
			console.log(peaple)
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
					}
					else{
						target.cook = "已烹饪"
					}
				}
			},
		}
	}
</script>

<style scoped>
	.body {
		height: 580px;
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
