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
			<img v-if="tableDisable" src="../../assets/img/back.png" @click="back" class="img-back">
			<img v-else src="../../assets/img/back.png" @click="toWaiterIndex" class="img-back">
		</div>
		<div class="content">

			<div class="left-select">
				<OrderQingdan :list="dishOrder"></OrderQingdan>
			</div>
			<div class="right">
				<div style="display: flex; justify-content: space-around;">
					<div class="secondary-head">
						<div class="time">
							类型：
							<a-select default-value="全部" style="width: 100px" @change="ChangeType">
								<a-select-option value="荤菜">
									荤菜
								</a-select-option>
								<a-select-option value="素菜">
									素菜
								</a-select-option>
								<a-select-option value="主食">
									主食
								</a-select-option>
								<a-select-option value="小吃">
									小吃
								</a-select-option>
								<a-select-option value="饮料">
									饮料
								</a-select-option>
								<a-select-option value="全部">
									全部
								</a-select-option>
							</a-select>
						</div>
						<div class="table-number">
							桌号：
							<div v-if="tableDisable" class="font-size:5px;width: 50px">{{tableNum}}</div>
							<a-select v-else :default-value="tableNum" style="width: 50px; margin: auto;"
								@change="ChangeTableNum">
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
							</a-select>
						</div>
						<div class="total-price">
							总金额：{{totalPrice}} 元
						</div>
					</div>
					<a-button class="btn-back" type="primary" @click="toXiadan"
						style="height:60px; font-size: 23px; width: 200px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-left: 70px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);">
						下单</a-button>
				</div>

				<div id="wrap"
					style="height: 85%;overflow: auto;display:flex; justify-content: space-around; flex-wrap:wrap; margin-top: 20px;">

					<div v-for="(item, index) in dishData" :key="index"
						style="margin-bottom: 20px; width: 350px; margin-left: 10px;">
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
	import Dish from '../components/Dish.vue'
	import PageHeader from '../components/PageHeader.vue'
	import OrderQingdan from '../components/OrderQingdan.vue'

	export default {
		data() {
			return {
				data: [],
				dishData: [],
				BdishData: [],
				tableNum: '',
				tableDisable: false,
				dishOrder: [],
				totalPrice: 0,
				type: ""
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
			let extradishOrder = JSON.parse(localStorage.getItem('extraDishOrder'))
			if (extradishOrder) {
				that.tableNum = extradishOrder.newOrder.tableId
				that.tableDisable = true
			}

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
				} else if (that.tableNum == '') {
					that.$message.warning('您还未选择桌号！');
				} else {
					localStorage.setItem('dishOrder', JSON.stringify(that.dishOrder));
					localStorage.setItem('dishTableId', JSON.stringify(that.tableNum));
					localStorage.setItem('totalPrice', JSON.stringify(that.totalPrice));
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
			},
			minusDish(index) {
				// console.log("item.dishNum++;之前的item.dishNum++;", this.dishData)
				// let oindex= this.dishOrder.findIndex(item => item.dishId == this.dishData[index].dishId)
				// this.dishOrder[oindex].dishNum--
				// this.dishData[index] = this.dishOrder[oindex]
				// if (this.dishData[index].dishNum == 0) {
				// 	this.dishOrder.splice(oindex,1)
				// }
				// console.log(this.dishData)
				this.dishData[index].dishNum--;
				let oindex = this.dishOrder.findIndex(item => item.dishId == this.dishData[index].dishId)
				if (this.dishData[index].dishNum == 0) {
					this.dishOrder.splice(oindex, 1)
				} else {
					this.$set(this.dishOrder, oindex, this.dishData[index])
				}
				this.ComputetotalPrice();
			},
			plusDish(index) {
				console.log("item.dishNum++;之前的item.dishNum++;", this.dishData)
				if (this.dishData[index].dishNum == 0) {
					this.dishData[index].dishNum++
					this.dishOrder.push(this.dishData[index])
				} else {
					this.dishData[index].dishNum++
					let oindex = this.dishOrder.findIndex(item => item.dishId == this.dishData[index].dishId)
					this.$set(this.dishOrder, oindex, this.dishData[index])
				}
				// let oindex= this.dishOrder.findIndex(item => item.dishId == this.dishData[index].dishId)
				// let linshi = this.dishOrder[oindex];
				// linshi.dishNum++


				// this.$set(this.dishOrder, oindex, linshi)

				// this.dishData[index] = this.dishOrder[oindex]
				this.ComputetotalPrice();
				// this.dishData[0].dishNum++;
				console.log(this.dishData)
			},
			getData: function() {
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/dishes/all',
					headers: {
						'token': token
					},
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.dishData = res.data;
					that.BdishData = res.data;
					let newarr = [];
					that.dishData.map((item, index) => {
						newarr.push(Object.assign(item, {
							dishNum: 0
						}))
					})
					that.dishData = newarr;

					console.log(that.dishData);
					let dishOrder = JSON.parse(localStorage.getItem('dishOrder'))
					let dishTableId = JSON.parse(localStorage.getItem('dishTableId'))
					let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
					if (dishOrder) {
						that.dishOrder = dishOrder
						that.tableDisable = true
						that.tableNum = dishTableId
						that.totalPrice = totalPrice
						for (let i = 0; i < that.dishData.length; i++) {
							for (let j = 0; j < that.dishOrder.length; j++) {
								if (that.dishData[i].dishName == that.dishOrder[j].dishName) {
									that.dishData[i].dishNum = that.dishOrder[j].dishNum
								}
							}
						}
					}
					console.log("dishDatadishDatadishDatadishDatadishData", that.dishData);

					// that.dishData = res.data;
				}).catch(res => {
					console.log(res)
					console.log('请求失败：' + res.status + ',' + res.statusText);
				});
			},
			toWaiterIndex() {
				localStorage.removeItem("extraDishOrder");
				localStorage.removeItem("dishOrder");
				localStorage.removeItem("dishTableId");
				localStorage.removeItem("totalPrice");
				this.$router.push({
					path: "/waiterindex"
				})
			},
			back() {
				localStorage.removeItem("extraDishOrder");
				localStorage.removeItem("dishOrder");
				localStorage.removeItem("dishTableId");
				localStorage.removeItem("totalPrice");
				this.$router.go(-1)
			},
			ChangeType(value) {
				if (value == "全部") {
					this.dishData = this.BdishData
				} else {
					this.dishData = this.BdishData.filter((item, index) => {
						return item.type == value
					});
				}

			}
		}
	}
</script>

<style scoped>
	.content {
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
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
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
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
		border-radius: 25px;

		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.6);
	}

	.time {
		/* margin-right: 50px; */
		margin: auto;
	}

	.table-number {
		/* margin-right: 50px; */
		margin: auto;
		display: flex;
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
