<template>
	<div>
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item" @click="toWaiterIndex">
					首页
				</div>
				<div class="cata-item" @click="toOrder">
					订单
				</div>
				<div class="cata-item">
					订单详情
				</div>
			</div>
			<img src="../../assets/img/back.png" @click="back" class="img-back">
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
			</div>

			<a-table class="table" :columns="columns" :data-source="disharr" bordered :scroll="{y: 350 }">
				<a-tag slot="dish_state" slot-scope="text, record"
					:color="record.dish_state === '未烹饪' ? 'geekblue' :'red'">

					{{ record.dish_state}}
					<!-- {{record}} -->
				</a-tag>

				<template slot="cancel" slot-scope="text, record">
					<!-- <a-popconfirm v-if="dataOrder.length" title="确定结账 ?" @confirm="() => onDelete(record.key)"> -->
					<a-popconfirm title="确定撤菜 ?" @confirm="() => onDelete(record.key)"
						v-if="record.dish_state === '未烹饪'">
						<a-button type="primary">撤菜</a-button>
					</a-popconfirm>
					<a-button type="primary" disabled v-else>撤菜</a-button>
				</template>
			</a-table>
		</div>
		<div style="width: 100%;height: 200px;"></div>
	</div>
</template>

<script>
	import Dish from '../components/Dish.vue'
	import PageHeader from '../components/PageHeader.vue'
	import OrderQingdan from '../components/OrderQingdan.vue'

	const columns = [{
			title: '菜品名称',
			dataIndex: 'dish_name',
			key: 'dish_name',
		},
		{
			title: '菜品单价',
			dataIndex: 'price',
			key: 'price',
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
		{
			title: '撤菜',
			dataIndex: 'cancel',
			scopedSlots: {
				customRender: 'cancel'
			},
		},
	];

	export default {
		data() {
			return {
				columns,
				dishOrder: [],
				disharr: [],
				userId: '',
				timeNow: "2021-02-26",
				totalPrice: 35,
				tableNum: '12',
				token: ''
			}
		},
		mounted() {

			let people = JSON.parse(localStorage.getItem('role'))

			this.$data.userId = people.userId


			this.getTime();
			this.dishOrder = this.$route.query.dishOrder;

			console.log(this.dishOrder);
			this.totalPrice = this.dishOrder.newOrder.totalPrice
			this.timeNow = this.dishOrder.newOrder.orderTime
			this.tableNum = this.dishOrder.newOrder.tableId


			let dishes = this.dishOrder.dishes
			if (this.dishOrder.addOrders) {
				this.dishOrder.addOrders.map((item, index) => {

					dishes.push.apply(dishes, item.addOrderDetail)

				})
			}


			let rdishes = dishes.filter(item => item.dish_state != 4)

			this.disharr = rdishes

			this.disharr = rdishes.map((item, i) => {
				item.key = i
				if (item.dish_state == 0) {
					item.dish_state = "未烹饪";

				} else if (item.dish_state <= 3) {
					item.dish_state = "已烹饪"

				}
				return item

			})

			console.log(this.disharr);
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

			toWaiterIndex() {
				this.$router.push({
					path: "/waiterindex"
				})
			},
			toOrder() {
				this.$router.push({
					path: "/checkorder"
				});
			},
			back() {
				this.$router.push({
					path: "/checkorder"
				});
			},

			onDelete(key) {
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let that = this
				let dish = this.disharr.filter(item => item.key == key)[0]

				this.axios.get("http://47.98.238.175:8080/dishOrder/cancel", {
						params: {
							orderId: that.dishOrder.newOrder.orderId,
							dishId: dish.dish_id,
							count: dish.count,
							price: dish.price
						},
						headers: {
							'token': token
						},
					}).then(res => {

						console.log(res)
						that.disharr.splice(that.disharr.findIndex(item => item.key == key), 1)
						that.totalPrice = that.totalPrice - dish.price
					})
					.catch(function(error) {
						console.log(error);
					});






			}

		},
	}
</script>

<style scoped>
	.content {
		height: 630px;
		width: 98%;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
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

	.secondary-head {
		display: flex;
		justify-content: left;
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
		font-size: 20px;
		font-weight: bold;
		width: 98%;
		margin: auto;
		border-radius: 25px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.6);
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
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 500px;
		overflow: auto;
	}
</style>
