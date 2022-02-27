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
				<a-button class="btn-back">返回</a-button>
			</div>
			<div class="secondary-head">
				<div class="time">
					时间：{{timeNow}}
				</div>
				<div class="table-number">
					桌号：
					<a-select default-value="1" style="width: 120px" @change="ChangeTableNum">
						<a-select-option value="1">
							1
						</a-select-option>
						<a-select-option value="2">
							2
						</a-select-option>
						<a-select-option value="3">
							3
						</a-select-option>
					</a-select>
				</div>
				<div class="total-price">
					总金额：{{totalPrice}}
				</div>
				<a-button class="btn-back" type="primary" @click="toXiadan">下单</a-button>
			</div>
			<div>
				<a-row>
					<a-col :span="8" style="height: 500px;">
						<OrderQingdan :list="dishOrder" :totalPrice="dishData1"></OrderQingdan>
					</a-col>
					<a-col :span="15" style="height: 500px;overflow: scroll;display:flex; flex-wrap:wrap;">
						<div v-for="(item, index) in dishData" :key="index"
							style="margin-right: 100px;margin-bottom: 20px;">
							<Dish :dishName="item.dishName" :intro="item.intro" :price="item.price"
								:detail="item.detail" :dishNum="item.dishNum" @minusDish="minusDish(index)"
								@plusDish="plusDish(index)">
							</Dish>
						</div>
					</a-col>
				</a-row>
			</div>
		</div>
		<div style="width: 100%;height: 200px;"></div>、
	</div>
</template>

<script>
	import Dish from './Dish.vue'
	import PageHeader from './PageHeader.vue'
	import OrderQingdan from './OrderQingdan.vue'
	
	export default {
		data() {
			return {
				dishData:[],
				tableNum:'1',
				dishOrder: [],
				dishData1: 1,
				timeNow: "2021-02-26",
				totalPrice: 0
			}
		},
		components: {
			Dish,
			PageHeader,
			OrderQingdan,
		},
		mounted() {
			let that = this;
			this.getData();
			this.getTime();

			console.log(
				'console.log(that.dishData);t.dishData);.log(that.dishData); console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);'
			);
			console.log(that.dishData);

		},
		computed: {

		},
		methods: {
			ChangeTableNum(value){
				console.log(value)
				this.tableNum = value;
			},
			ComputetotalPrice() {
				let that = this;
				let total = 0
				for (let i = 0; i < that.dishOrder.length; i++) {
					let item = that.dishOrder[i];
					total = total + item.price * item.dishNum;
				}
				console.log(total);
				that.totalPrice = total;
			},
			toXiadan() {
				let that = this;
				console.log(that.dishOrder);
				this.$router.push({
					// path: "/Xiadan",
					name: 'xiadan',
					query: {
						dishOrder:that.dishOrder,
						tableNum:that.tableNum,
						totalPrice:that.totalPrice
					}
				})
			},
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
			minusDish(index) {
				console.log("item.dishNum++;之前的item.dishNum++;", this.dishData)
				this.dishData[index].dishNum--;
				if (this.dishData[index].dishNum == 0) {
					this.dishOrder.pop(this.dishData[index])
				}
				this.dishData1--;
				this.ComputetotalPrice();
				console.log(this.dishData)
			},
			plusDish(index) {
				console.log("item.dishNum++;之前的item.dishNum++;", this.dishData)
				if (this.dishData[index].dishNum == 0) {
					this.dishOrder.push(this.dishData[index])
				}
				this.dishData[index].dishNum++;

				this.ComputetotalPrice();
				this.dishData1++;
				// this.dishData[0].dishNum++;
				console.log(this.dishData)
			},
			getData: function() {
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/dishes/all'
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.dishData = res.data;

					let newarr = [];
					that.dishData.map((item, index) => {
						newarr.push(Object.assign(item, {
							dishNum: 0
						}))
					})
					that.dishData = newarr;
					console.log(
						'console.log(that.dishData);t.dishData);.log(that.dishData); console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);console.log(that.dishData);'
					);
					console.log(that.dishData);
					// that.dishData = res.data;
				}).catch(res => {
					console.log(res)
					console.log('请求失败：' + res.status + ',' + res.statusText);
				});
			},
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
