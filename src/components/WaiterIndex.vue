<template>
	<div>
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item" @click="toWaiterIndex">
					首页
				</div>
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
					<a-table class="table" :columns="columnsDish" :data-source="dataDish" bordered :scroll="{y: 280 }">
						<a-tag slot="dish_state" slot-scope="text, record"
							:color="record.dish_state === '已传菜' ? 'geekblue': 'green'"
							@click="() => handledeliver(record.key)">
							{{ record.dish_state}}
						</a-tag>
					</a-table>
				</div>

				<div style="text-align: center; margin: 20px;">
					<a-button size="large" shape="round" type="danger" @click="toCheckOrder"
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
	import PageHeader from './PageHeader.vue'
	import CallBoard from './CallBoard.vue'
	export default {
		name: 'SignUp',
		components: {
			PageHeader,
			CallBoard
		},

		mounted: function() {
			this.getDishInfo()
		},
		data() {
			return {
				dataDish,
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

			toCheckOrder() {
				this.$router.push({
					path: "/checkorder"
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

			toWaiterIndex() {
				this.$router.push({
					path: "/waiterindex"
				})
			},
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
		width: 70%;
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
