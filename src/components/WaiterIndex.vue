<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>
		<div class="cata">
			<div class="cata-item">
				首页
			</div>
		</div>
		<div class="content">

			<div class="left-select">

				<CallBoard></CallBoard>
			</div>
			<div class="right">
				<div class="tm-table">
					<div class="table-title">
						传菜推送信息
					</div>
					<a-table class="table" :columns="columnsDish" :data-source="dataDish" bordered :scroll="{y: 400 }">
						<a-tag slot="dish_state" slot-scope="text, record"
							:color="record.dish_state === '已传菜' ? 'geekblue': 'green'"
							@click="() => handledeliver(record.key)">
							{{ record.dish_state}}
						</a-tag>
					</a-table>
				</div>

				<div style="text-align: center; margin: 20px;">
					<a-button size="large" shape="round" type="danger" @click="toOrder"
						style="height:60px; font-size: 23px; width: 250px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-right: 100px;">
						查看订单 / 结账</a-button>
					<a-button size="large" shape="round" type="danger" @click="toOrder"
						style="height:60px; font-size: 23px; width: 250px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF;">
						前往点菜</a-button>
				</div>
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

	const dataDish = [];
	const dataOrder = [];
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


			this.getDishInfo()
			this.getOrder()
		},
		data() {
			return {
				dataDish,
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
			toOrder() {
				this.$router.push({
					path: "/order"
				})
			},

			getDishInfo() {
				this.axios.get("http://47.98.238.175:8080/dishOrder/sendDishInfo").then(res => {
						let dataDish = res.data
						console.log(dataDish)
						this.dataDish = dataDish.map((item, i) => {
							item.key = i
							item.dish_state = "等待传菜"
							return item
						})
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

			getOrder() {
				this.axios.get("http://47.98.238.175:8080/queryOrder", {
						params: {
							orderState: 0
						}
					}).then(res => {
						this.dataOrder = res.data.map((item, i) => {
							item.newOrder.key = i
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
				this.axios.get("http://47.98.238.175:8080/checkout", {
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
		margin-top: 80px;
		height: 40px;
		/* background-color: white; */
		font-size: 20px;
		padding: 0 0 10px 20px;
	}

	.cata-item {
		width: 100px;
		background-color: #FBECDE;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 15px 15px 0 0;
	}

	.content {
		display: flex;
		justify-content: space-around;
	}

	.tm-table {
		width: 90%;
		height: 550px;
		margin: auto;
		border-radius: 20px;
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.left-select {
		width: 30%;
		height: 600px;
		/* background-color: white; */
	}

	.right {
		width: 60%;
		margin-right: 10px;
		height: 650px;
		/* background-color: white; */
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

	.table {

		width: 97%;
		margin: auto;
		border-radius: 25px;
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 430px;
		overflow: auto;
	}
</style>
