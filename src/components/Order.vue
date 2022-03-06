<template>
	<div style="height: 90%;">
		<page-header></page-header>
		<div class="cata">
			<div style="display: flex; float: left;">
				<div class="cata-item" @click="toWaiterIndex">
					首页
				</div>
				<div class="cata-item">
					点菜
				</div>
			</div>
			<img src="../assets/img/back.png" @click="back" class="img-back">
		</div>
		<div class="content">

			<div class="left-select">
				<OrderQingdan :list="dishOrder" :totalPrice="dishData1"></OrderQingdan>
			</div>
			<div class="right">
				<div style="display: flex; justify-content: space-around;">
					<div class="secondary-head">
						<div class="time">
							时间：{{timeNow}}
						</div>
						<div class="table-number">
							桌号：
							<a-select default-value="1" style="width: 50px" @change="ChangeTableNum">
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
							总金额：{{totalPrice}} 元
						</div>
					</div>
					<a-button class="btn-back" type="primary" @click="toXiadan"
						style="height:60px; font-size: 23px; width: 200px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-left: 70px;">
						下单</a-button>
				</div>

				<div id="wrap"
					style="height: 85%;overflow: auto;display:flex; justify-content: space-around; flex-wrap:wrap; margin-top: 20px;">
					<!-- <div v-for="(item, index) in data" :key="index" -->
					<div v-for="(item, index) in dishData" :key="index" style="margin-bottom: 20px; width: 350px; margin-left: 10px;">
						<Dish :dishName="item.dishName" :intro="item.intro" :price="item.price" :dishPic="item.dishPic"
							:detail="item.detail" :tuijian="item.isrec" :dishNum="item.dishNum"
							@minusDish="minusDish(index)" @plusDish="plusDish(index)">
						</Dish>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Dish from './Dish.vue'
	import PageHeader from './PageHeader.vue'
	import OrderQingdan from './OrderQingdan.vue'

	export default {
		data() {
			return {
				data: [],
				dishData: [],
				tableNum: '1',
				dishOrder: [],
				dishData1: 1,
				timeNow: "",
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

			console.log(that.dishData);

		},
		computed: {

		},
		methods: {
			ChangeTableNum(value) {
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
				if (that.dishOrder.length == 0) {
					that.$message.warning('您还未点菜！');
				} else {
					this.$router.push({
						// path: "/Xiadan",
						name: 'xiadan',
						query: {
							dishOrder: that.dishOrder,
							tableNum: that.tableNum,
							totalPrice: that.totalPrice
						}
					})
				}
				// localStorage.setItem('dishOrder', JSON.stringify(values));
			},
			getTime() {
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				this.timeNow = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
				console.log(this.timeNow)
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
		}
	}
</script>

<style scoped>
	.content {
		height: 90%;
		width: 98%;
		border-radius: 20px;
		margin: auto;
		margin-top: 10px;
		padding-top: 10px;
		display: flex;
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

	.left-select {
		width: 30%;
		height: 100%;
		/* background-color: white; */
	}

	.right {
		width: 70%;
		margin-right: 10px;
		height: 100%;
		/* background-color: white; */
	}


	.img-back:hover {
		cursor: pointer
	}

	.secondary-head {
		display: flex;
		height: 60px;
		line-height: 60px;
		/* 		padding-left: 20px;
		margin-left: 20px; */

		width: 65%;
		font-size: 20px;
		font-weight: bold;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.time {
		/* margin-right: 50px; */
		margin: auto;
	}

	.table-number {
		/* margin-right: 50px; */
		margin: auto;
	}

	.total-price {
		/* margin-right: 50px; */
		margin: auto;
	}

	#wrap::-webkit-scrollbar {
		width: 5px;
		background-color: #F5F5F5;
	}

	#wrap::-webkit-scrollbar-thumb {
		background-color: #fda03f;

	}

	#wrap::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
		background-color: #F5F5F5;
	}
</style>
