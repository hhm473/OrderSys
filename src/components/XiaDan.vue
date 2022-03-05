<template>
	<div>
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item" @click="toWaiterIndex">
					首页
				</div>
				<div class="cata-item" @click="toOrder">
					点菜
				</div>
				<div class="cata-item">
					下单
				</div>
			</div>
			<img src="../assets/img/back.png" @click="back" class="img-back">
		</div>
		<div class="content">
			<div style="display: flex;">
				<div class="secondary-head">
					<div class="time">
						时间：{{timeNow}}
					</div>
					<div class="table-number">
						桌号： {{ tableNum }}
					</div>
					<div class="total-price">
						总金额：{{totalPrice}} 元
					</div>
				</div>
				<div>
					<a-button type="primary" size="large" @click="ConfirmOrder"
						style="height:50px; font-size: 23px; width: 200px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-left: 70px;">
						确认下单</a-button>
				</div>
			</div>

			<a-table class="table" :columns="columns" :data-source="dishOrder" bordered :scroll="{y: 350 }">

			</a-table>
		</div>
		<div style="width: 100%;height: 200px;"></div>、
	</div>
</template>

<script>
	import Dish from './Dish.vue'
	import PageHeader from './PageHeader.vue'
	import OrderQingdan from './OrderQingdan.vue'

	const columns = [{
			title: '菜品名称',
			dataIndex: 'dishName',
			key: 'dishName',
		},
		{
			title: '菜品单价',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: '菜品数量',
			key: 'dishNum',
			dataIndex: 'dishNum',
		},
		{
			title: '菜品金额',
			key: 'dishPrice',
			dataIndex: 'dishPrice',
		},
	];

	export default {
		data() {
			return {
				columns,
				dishOrder: [],
				userId: '',
				timeNow: "2021-02-26",
				totalPrice: 35,
				tableNum: '12'
			}
		},
		mounted() {

			let people = JSON.parse(localStorage.getItem('role'))

			this.$data.userId = people.userId

			let that = this;
			that.getTime();
			that.dishOrder = this.$route.query.dishOrder;
			that.tableNum = this.$route.query.tableNum;
			that.totalPrice = this.$route.query.totalPrice;
			let newarr = [];
			that.dishOrder.map((item, index) => {
				newarr.push(Object.assign(item, {
					dishPrice: item.dishNum * item.price
				}))
			})
			that.dishOrder = newarr;
		},
		components: {
			PageHeader,
		},
		methods: {
			getTime() {
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				this.timeNow = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
				// console.log(this.timeNow)
			},
			ConfirmOrder() {
				let that = this;
				let newOrder = {};
				that.$set(newOrder, "tableId", Number(that.tableNum));
				that.$set(newOrder, "waiter", that.userId);
				that.$set(newOrder, "remarks", "测试");
				let newarr = [];
				that.dishOrder.map((item, index) => {
					newarr.push(Object.assign({
						dishId: item.dishId,
						count: item.dishNum
					}))
				});
				// that.$set(newOrder, "dishes", newarr);
				console.log(newOrder)
				console.log(newarr)
				that.axios.post("http://47.98.238.175:8080/order/newOrder", {
					"newOrder": newOrder,
					"dishOrders": newarr
				}).then(function(response) {
					that.$message.success('下单成功！');
					that.$router.push({
						path: "/WaiterIndex"
					});
				}).catch(function(error) {
					that.$message.error(error);
				});




			},

			toWaiterIndex() {
				this.$router.push({
					path: "/waiterindex"
				})
			},
			toOrder() {
				this.$router.push({
					path: "/order"
				});
			},
			back() {
				this.$router.push({
					path: "/order"
				});
			}

		},
	}
</script>

<style scoped>
	.content {
		height: 630px;
		width: 98%;
		border-radius: 20px;
		margin: auto;
		margin-top: 10px;
		padding-top: 15px;
		/* display: flex; */
		background-color: rgba(255, 255, 255, 0.6);
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

	.secondary-head {
		display: flex;
		justify-content: left;
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
		font-size: 20px;
		font-weight: bold;
		width: 80%;
		margin-left: 1%; 
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.6);
	}


	.time {
	}

	.table-number {
		margin: auto;
	}

	.total-price {
		margin: auto;
	}

	.table {
		width: 98%;
		margin: auto;
		border-radius: 25px;
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 500px;
		overflow: auto;
	}
</style>
