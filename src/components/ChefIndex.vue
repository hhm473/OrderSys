<template>
	<div v-title data-title="厨师">
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item">
					首页
				</div>
			</div>
		</div>
		<div class="content">
			<div class="left-select">
				<CallBoard v-on:CIsRefresh="CIsRefresh"></CallBoard>
			</div>
			<div class="right">
				<div class="tm-table">
					<div class="table-title">
						订单信息
					</div>
					<div class="selector">
						名称：
						<a-select default-value="全部菜品" @change="handleKind" style="width: 120px; margin-right:20px;"
							size="small">
							<a-select-option v-for="(item, i) in kind" v-bind:key="i" :value="item.dishName">
								{{item.dishName}}
							</a-select-option>
							<a-select-option :value="-1">
								全部菜品
							</a-select-option>
						</a-select>
						桌号：
						<a-select default-value="全部桌号" @change="handleScount" style="width: 120px; margin-right:20px;"
							size="small">
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
						烹制状态：
						<a-select default-value="全部烹制状态" @change="handleState" style="width: 120px; margin-right:60px;"
							size="small">
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
						<a-button @click="postSelect" 
						style="height:30px; font-size: 15px; width: 100px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-left: 70px;">查询菜品</a-button>
					</div>
					<a-table class="table" :columns="columns" :data-source="data" bordered :scroll="{y: 340 }">
						<a-tag slot="dish_state" slot-scope="text, record"
							:color="record.dish_state === '已烹饪' ? 'geekblue' : record.dish_state==='正在烹饪' ? 'volcano' : 'green'"
							@click="() => handlecook(record.key)">

							{{ record.dish_state}}
							<!-- {{record}} -->
						</a-tag>
					</a-table>
				</div>
			</div>
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

	const data = [];
	import PageHeader from './PageHeader.vue'
	import CallBoard from './CallBoard.vue'
	export default {
		name: 'SignUp',
		components: {
			PageHeader,
			CallBoard
		},


		mounted: function() {
			this.RequestData(this.dishName, this.tableId, this.dishState)
			this.RequestKind()
		},
		data() {
			return {
				data,
				columns,
				dishName: "",
				tableId: "",
				dishState: "",
				kind: [],

				role: "",
				userId: "",
			}
		},
		methods: {
			CIsRefresh(e){
				let that = this
				console.log("hhh");
				
					setTimeout(function()  {
					 
					    that.RequestData(this.dishName, this.tableId, this.dishState)
					 
					   }, 2000);
					
			},
			handlecook(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.dish_state === "未烹饪") {
						target.dish_state = "正在烹饪";
						this.RequestChangeState(target.order_id, target.dish_id)
					} else {
						target.dish_state = "已烹饪"
						this.RequestChangeState(target.order_id, target.dish_id)
					}
				}
			},

			RequestData(dishName, tableId, dishState) {
				let selet = {
					dishName,
					tableId,
					dishState
				}
				console.log(selet);
				this.axios.get("http://47.98.238.175:8080/dishOrder/querySome", {
						params: selet
					}).then(res => {
						let data = res.data
						console.log(res)
						this.data = data.map((item, i) => {
							item.key = i
							if (item.dish_state == 0) {
								item.dish_state = "未烹饪";
							} else if (item.dish_state == 1) {
								item.dish_state = "正在烹饪"
							} else {
								item.dish_state = "已烹饪"
							}
							return item
						})
						
						
						console.log(this.data)
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			RequestKind() {
				this.axios.get("http://47.98.238.175:8080/dishes/all").then(res => {
						this.kind = res.data
						console.log(this.kind);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			RequestChangeState(orderId, dishId) {

				console.log(orderId, dishId);
				this.axios.get("http://47.98.238.175:8080/dishOrder/update", {
						params: {
							orderId,
							dishId
						}
					}).then(res => {
						console.log(res);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			handleKind(value) {
				this.dishName = value
			},
			handleScount(value) {
				this.tableId = value
			},
			handleState(value) {
				this.dishState = value
			},

			postSelect() {

				if (this.dishName == "-1") {
					this.dishName = ""
				}
				if (this.tableId == "-1") {
					this.tableId = ""
				}
				if (this.dishState == "-1") {
					this.dishState = ""
				}
				this.RequestData(this.dishName, this.tableId, this.dishState)
			}
		}
	}
</script>

<style scoped>
	.selector {
		padding: 10px 0 10px 20px;
		font-weight: bold;
		font-size: 1.2em;
	}

	.cata {
		margin-left: auto;
		margin-right: auto;
		margin-top: 80px;
		height: 40px;
		width: 98%;
		/* background-color: white; */
		font-size: 20px;
		padding: 0 0 10px 0px;
	}

	.cata-item {
		width: 100px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		background-color: #FBECDE;
		height: 40px;
		line-height: 40px;
		margin-right: 20px;
		text-align: center;
		border-radius: 15px 15px 0 0;
	}

	.cata-item:hover {
		cursor: pointer
	}

	.content {
		display: flex;
		/* justify-content: space-around; */

		/* height: 630px; */
		width: 98%;
		border-radius: 20px;
		margin: auto;
		/* margin-top: 100px; */
		padding-top: 10px;
		/* background-color: rgba(255, 255, 255, 0.6); */
	}

	.right {
		width: 70%;
		margin-right: 10px;
		height: 650px;
		/* background-color: white; */

	}

	.tm-table {
		width: 90%;
		height: 650px;
		margin: auto;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.table-title {
		font-size: 30px;
		font-weight: bold;
		width: 97%;
		height: 70px;
		margin: auto;
		border-radius: 25px;
		line-height: 70px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.left-select {
		width: 30%;
		height: 600px;
		/* background-color: white; */
	}

	.left-table {
		padding: 20px;
		width: 60%;
		margin-right: 10px;
		height: 600px;
		/* background-color: white; */
	}

	.title {
		font-size: 30px;
		font-weight: bold;
		padding-left: 60px;
	}
	.table {
		width: 97%;
		margin: auto;
		border-radius: 25px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 480px;
		overflow: auto;
	}
</style>
