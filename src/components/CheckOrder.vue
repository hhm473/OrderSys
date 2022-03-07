<template>
	<div>
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item" @click="toWaiterIndex">
					首页
				</div>
				<div class="cata-item">
					订单
				</div>
			</div>
			<img src="../assets/img/back.png" @click="back" class="img-back">
		</div>
		<div class="content">
			<div>
				<div class="table-title">
					正在进行中的订单
				</div>
				<a-table class="table" :columns="columnsOrder" :data-source="dataOrder" bordered :scroll="{y: 350 }">
					<template slot="pay" slot-scope="text, record">
						<a-popconfirm v-if="dataOrder.length" title="确定结账 ?" @confirm="() => onDelete(record.key)">
							<a-button>结账</a-button>
						</a-popconfirm>
					</template>

				</a-table>

			</div>
		</div>
	</div>
</template>

<script scoped>
	const columnsDish = [{
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
			title: '传送状态',
			key: 'dish_state',
			dataIndex: 'dish_state',
			scopedSlots: {
				customRender: 'dish_state'
			},
		},
	];
	const columnsOrder = [{
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
			title: '总金额',
			key: 'totalPrice',
			dataIndex: 'totalPrice',
		},
		{
			title: '订单详情',
			key: 'cook',
			dataIndex: 'cook',
			// width:500,
		},
		{
			title: '结账',
			dataIndex: 'pay',
			scopedSlots: {
				customRender: 'pay'
			},
		},
	];

	const dataOrder = [];
	import PageHeader from './PageHeader.vue'
	export default {
		name: 'SignUp',
		components: {
			PageHeader,
		},

		mounted: function() {
			this.getOrder()
		},
		data() {
			return {
				dataOrder,
				columnsOrder,
				columnsDish,
				role: "",
				userId: "",
			}
		},
		methods: {
			handledeliver(key) {
				const newData = [...this.dataDish];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.dish_state === "等待传菜") {
						target.dish_state = "已传菜"
						this.RequestChangeState(target.order_id, target.dish_id)
					}
				}
			},
			toWaiterIndex() {
				this.$router.push({
					path: "/waiterindex"
				})
			},
			back() {
				this.$router.push({
					path: "/waiterindex"
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

			getOrder() {
				this.axios.get("http://47.98.238.175:8080/order/queryOrder", {
						params: {
							orderState: 0
						}
					}).then(res => {
						this.dataOrder = res.data.map((item, i) => {
							item.newOrder.key = i
							let cook = ""
							if (item.dishOrders.length > 0) {
								item.dishOrders.forEach((ritem, ri) => {
									cook += item.dishes[ri].dishName + "*" + ritem.count + "  "
								})
							}
							item.newOrder.cook = cook

							delete item.newOrder.waiter,
								delete item.newOrder.remarks
							return item.newOrder
						})

						console.log(this.dataOrder);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			onDelete(key) {
				const newData = [...this.dataOrder];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					this.CheckOut(target.orderId)
					this.dataOrder.splice(this.dataOrder.findIndex(item => item.key == key), 1)
				}
			},

			CheckOut(orderid) {
				this.axios.get("http://47.98.238.175:8080/order/checkout", {
						params: {
							orderid
						}
					}).then(res => {

						console.log(res);
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.selector {
		padding: 10px 0 10px 0;
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
		background-color: #FBECDE;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin-right: 20px;
		border-radius: 15px 15px 0 0;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
	}

	.cata-item:hover {
		cursor: pointer
	}

	.img-back {
		float: right;
		height: 40px;
	}

	.img-back:hover {
		cursor: pointer
	}

	.content {
		height: 620px;
		width: 98%;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		margin: auto;
		margin-top: 10px;
		padding-top: 15px;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.left-select {
		width: 30%;
		height: 650px;
		/* background-color: white; */
	}

	.btn-order {
		width: 300px;
		background-color: #FDA03F;
		border: #FDA03F 1px solid;
		color: #FFFFFF;
	}

	.table-title {
		font-size: 30px;
		font-weight: bold;
		width: 98%;
		height: 70px;
		margin: auto;
		border-radius: 25px;
		line-height: 70px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.table {
		width: 98%;
		margin: auto;
		border-radius: 25px;
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 490px;
		overflow: auto;
	}
</style>
