<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div class="catalog">
				<span class="cata-info">
					<router-link to="/administratorindex" style="color: white;">管理员首页</router-link>
				</span>
				>
				<span class="cata-info">
					<router-link to="/ordermanage" style="color: white;">订单管理</router-link>
				</span>
				<a-button class="btn-back" @click="back">返回</a-button>
			</div>
			<div class="secondary-head">
				<div class="time">
					桌号：
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
				</div>
				<div class="table-number">
					状态：
					<a-select default-value="全部订单" @change="handleState" style="width: 120px; margin-right:60px;" size="small">
						<a-select-option value="未完成">
							未完成
						</a-select-option>
						<a-select-option value="已完成">
							已完成
						</a-select-option>
						<a-select-option value="-1">
							全部订单
						</a-select-option>
					</a-select>
				</div>
				<div class="total-price">
					<a-button type="primary" @click="FindOrder">查询</a-button>
				</div>
			</div>
			<div style="padding: 20px;">
				<div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 350 }">


					</a-table>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 200px;"></div>、
	</div>
</template>

<script>
	import Dish from './Dish.vue'
	import PageHeader from './PageHeader.vue'
	import OrderQingdan from './OrderQingdan.vue'

	const columns = [{
			title: '编号',
			dataIndex: 'orderId',
			key: 'orderId',
		},
		{
			title: '菜品桌号',
			dataIndex: 'tableId',
			key: 'tableId',
		},
		{
			title: '下单时间',
			dataIndex: 'orderTime',
			key: 'orderTime',
		},
		{
			title: '菜品列表',
			key: 'cook',
			dataIndex: 'cook',
		},
		{
			title: '总金额',
			key: 'totalPrice',
			dataIndex: 'totalPrice',
		},
		{
			title: '订单状态',
			key: 'orderState',
			dataIndex: 'orderState',
		},
	];
	const data = [];


	export default {
		data() {
			return {
				data,
				columns,
				tableId:"-1",
				orderState:"-1",
				Bdata:""
			}
		},
		components: {
			PageHeader,
		},
		mounted: function() {
			
			this.getOrder()
		},
		methods: {
			back() {
				this.$router.push({path:"/administratorindex"});
			},
			getOrder(){
				this.axios.get("http://47.98.238.175:8080/queryOrder").then(res => {				
					this.data = res.data.map((item,i) => {
						item.newOrder.key = i
						let cook=""
						 if(item.dishOrders.length > 0){
							item.dishOrders.forEach((ritem,ri) => {
								cook +=  item.dishes[ri].dishName+"*"+ritem.count +"  "
							})
						 }
						item.newOrder.cook = cook
						
						if (item.newOrder.dishState == 0) {
							item.newOrder.orderState = "未完成";
						}
						else{
							item.newOrder.orderState = "已完成"
						}

						delete	item.newOrder.waiter,
						delete	item.newOrder.remarks
						return item.newOrder
					}) 
					
					this.Bdata = this.data
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			
			handleScount(value){
				console.log(value);
				this.tableId = value
			},
			handleState(value){
				console.log(value);
				this.orderState = value
			},
			
			FindOrder(){
				if(this._data.tableId != "-1" || this._data.orderState != "-1"){

					this.data = this.Bdata.filter((item, index) => {
						console.log(this.tableId,this.orderState);
						if(this.$data.tableId == "-1" && this.$data.orderState != "-1"){
							return item.orderState === this.orderState
						} else if(this.tableId != "-1" && this.orderState == "-1"){
							return item.tableId == this.tableId
						}
						return item.tableId == this.tableId && item.orderState === this.orderState;
					})
				} else{
					this.$data.data = this.$data.Bdata
				}
				
			}
		}
	}
</script>

<style scoped>
	.body {
		margin-top: 100px;
		width: 100%;
		background-color: white;
	}

	.catalog {
		height: 50px;
		font-size: 20px;
		line-height: 30px;
		padding: 10px 20px 10px 20px;
	}

	.cata-info {
		background-color: #A4ADB3;
		color: white;
	}

	.btn-back {
		float: right;
	}

	.secondary-head {
		display: flex;
		padding: 20px;
		height: 60px;
		font-size: 20px;
		font-weight: bold;
	}

	.time {
		margin-right: 50px;
	}

	.table-number {
		margin-right: 50px;
	}

	.total-price {
		margin-right: 50px;
	}
</style>
