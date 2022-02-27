<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div class="catalog">
				<span class="cata-info">
					<router-link to="/waiterindex" style="color: white;">服务员首页</router-link>
				</span>
				>
				<span class="cata-info">
					<router-link to="/order" style="color: white;">点菜</router-link>
				</span>
				>
				<span class="cata-info">
					<router-link to="/xiadan" style="color: white;">下单</router-link>
				</span>
				<a-button class="btn-back" @click="back">返回</a-button>
			</div>
			<div class="secondary-head">
				<div class="time">
					时间：{{timeNow}}
				</div>
				<div class="table-number">
					桌号： {{ tableNum }}
				</div>
				<div class="total-price">
					总金额：{{totalPrice}}
				</div>
			</div>
			<div style="padding: 20px;">
				<div>
					<a-table :columns="columns" :data-source="dishOrder" bordered :scroll="{y: 500 }">

					</a-table>
				</div>
				<div style="text-align: center; padding-bottom: 20px;">
					<a-button type="primary" size="large" @click="ConfirmOrder">确认下单</a-button>
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
				timeNow: "2021-02-26",
				totalPrice: 35,
				tableNum: '12'
			}
		},
		mounted() {
			let that = this;
			that.getTime();
			that.dishOrder = this.$route.query.dishOrder;
			that.tableNum = this.$route.query.tableNum;
			that.totalPrice = this.$route.query.totalPrice;
			let newarr = [];
			that.dishOrder.map((item, index) => {
				newarr.push(Object.assign(item, {
					dishPrice: item.dishNum * item.price
					// dishPrice: 8
				}))
			})
			that.dishOrder = newarr;
			console.log('that.datathat.datathat.datathat.datathat.datathat.data', that.dishOrder)
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
				that.$set(newOrder, "waiter", that.tableNum);
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
				that.axios.post("http://47.98.238.175:8080/newOrder", {
					"newOrder": newOrder,
					"dishOrders": newarr
				}).then(function(response) {
					alert('下单成功！');
					// that.$router.go(-1);
					that.$router.push({
						path: "/WaiterIndex"
					});
				}).catch(function(error) {
					alert(error);
				});




			},
			back() {
				this.$router.go(-1);
			}

		},
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
