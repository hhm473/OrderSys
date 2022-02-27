<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>

		<div class="body">
			<a-row>
				<a-col :span="7">
					<CallBoard></CallBoard>
				</a-col>
				<a-col :span="2" style="background-color: #E8E8E8; height: 580px;"></a-col>
				<a-col :span="15" style="padding: 10px; height: 500px;">
					<div class="title">
						订单信息
					</div>
					<div class="selector">
						<a-select default-value="全部菜品" @change="handleKind" style="width: 120px; margin-right:20px;" size="small">
							<a-select-option v-for="(item, i) in kind" v-bind:key="i" :value="item.dishName">
								{{item.dishName}}
							</a-select-option>
							<a-select-option  :value="-1">
								全部菜品
							</a-select-option>
						</a-select>
						<a-select default-value="全部桌号" @change="handleScount" style="width: 120px; margin-right:20px;" size="small">
							<a-select-option value="1">
								1
							</a-select-option>
							<a-select-option value="2">
								2
							</a-select-option>
							<a-select-option value="3">
								3
							</a-select-option>
							<a-select-option value="4">
								4
							</a-select-option>
							<a-select-option value="5">
								5
							</a-select-option>
							<a-select-option value="-1">
								全部桌号
							</a-select-option>
						</a-select>
						<a-select default-value="全部烹制状态" @change="handleState" style="width: 120px; margin-right:60px;" size="small">
							<a-select-option value="0">
								未烹饪
							</a-select-option>
							<a-select-option value="1">
								正在烹饪
							</a-select-option>
							<a-select-option value="2">
								已烹饪
							</a-select-option>
							<a-select-option value="-1">
								全部烹制状态
							</a-select-option>
						</a-select>
						<a-button @click="postSelect">确定</a-button>
					</div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 300 }">
						<a-tag slot="dish_state" slot-scope="text, record"
							:color="record.dish_state === '已烹饪' ? 'geekblue' : record.dish_state==='正在烹饪' ? 'volcano' : 'green'"
							@click="() => handlecook(record.key)">

							{{ record.dish_state}}
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
			dataIndex: 'dish_name',
			key: 'dish_name',
		},
		{
			title: '菜品桌号',
			dataIndex: 'table_id',
			key: 'table_id',
		},
		{
			title: '菜品数量',
			key: 'count',
			dataIndex: 'count',
		},
		{
			title: '烹制状态',
			key: 'dish_state',
			dataIndex: 'dish_state',
			scopedSlots: {
				customRender: 'dish_state'
			},
		},
	];

	const data = [{
			key: '1',
			dish_name: 'John Brown',
			table_id: "2",
			count: '1',
			dish_state: "等待烹饪"
		},{
			key: '6',
			name: 'John Brown',
			table_id: "3",
			count: '1',
			dish_state: "等待烹饪"
		}
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
			}
			else if(peaple.roleId == 2) {
				this.$data.role = "后厨人员"
			}
			else{
				this.$data.role = "管理人员"
			}
			this.$data.userId = peaple.userId
			
			this.RequestData(this.dishName,this.tableId,this.dishState)
			this.RequestKind()
		},
		data() {
			return {
				data,
				columns,
				dishName:"",
				tableId:"",
				dishState:"",
				kind:[],
				
				role: "",
				userId: "",
				anunlist: [{
						title: "打扫卫生",
						notice_id: "1",
						user_id: "",
						contents: "去前台做卫生做卫生",
						send_time: "2022-02-24 09:58:55"
				
					},
					{
						title: "开会通知",
						notice_id: "2",
						user_id: "",
						contents: "今天晚上8点半在办公室开会",
						send_time: "2022-02-24 09:58:55"
				
					}
				],
			}
		},
		methods: {
			handlecook(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.dish_state === "未烹饪") {
						target.dish_state = "正在烹饪";
						this.RequestChangeState(target.order_id,target.dish_id)
					}
					else{
						target.dish_state = "已烹饪"
						this.RequestChangeState(target.order_id,target.dish_id)
					}
				}
			},
			
			RequestData(dishName,tableId,dishState){
				let selet = {
					dishName,
					tableId,
					dishState
				}
				console.log(selet);
				this.axios.get("http://47.98.238.175:8080/dishOrder/querySome",
				{
					params:selet
				}).then(res => {
					let data = res.data
					console.log(data)
					this.data = data.map((item,i) => {
						item.key = i
						if (item.dish_state == 0) {
							item.dish_state = "未烹饪";
						}
						else if(item.dish_state == 1){
							item.dish_state = "正在烹饪"
						}else{
							item.dish_state = "已烹饪"
						}
						return item
					})
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			
			RequestKind(){
				this.axios.get("http://47.98.238.175:8080/dishes/all").then(res => {
					this.kind = res.data
					console.log(this.kind);
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
				
			RequestChangeState(orderId,dishId){
				
				console.log(orderId,dishId);
				this.axios.get("http://47.98.238.175:8080/dishOrder/update",
				{
					params: {
						orderId,
						dishId
						}
				}).then(res => {
					console.log(res);
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			
			handleKind(value){
				this.dishName = value
			},
			handleScount(value){
				this.tableId = value
			},
			handleState(value){
				this.dishState = value
			},
			
			postSelect(){
				
				if(this.dishName == "-1"){
					this.dishName =""
				}
				if(this.tableId == "-1"){
					this.tableId =""
				}
				if(this.dishState == "-1"){
					this.dishState =""
				}
				this.RequestData(this.dishName,this.tableId,this.dishState)
			}
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
