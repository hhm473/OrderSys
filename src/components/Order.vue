<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<!-- 			<div v-if="false">				
			{{dishData1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			{{dishData[0].dishNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			{{dishData1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div> -->
<!-- 			{{dishData}}
			<button @click="add"></button>
			<button @click="edit"></button> -->
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
					<a-select default-value="lucy" style="width: 120px" @change="handleChange">
						<a-select-option value="jack">
							Jack
						</a-select-option>
						<a-select-option value="lucy">
							Lucy
						</a-select-option>
						<a-select-option value="Yiminghe">
							yiminghe
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
					<a-col :span="8" style="height: 300px;">
						<OrderQingdan :list="dishOrder" :totalPrice="dishData1"></OrderQingdan>
					</a-col>
					<div>

						<a-col :span="8" v-for="(item, index) in dishData" :key="index">
							<div>
								<Dish :dishName="item.dishName" :intro="item.intro" :price="item.price"
									:detail="item.detail" :dishNum="item.dishNum" @minusDish="minusDish(index)"
									@plusDish="plusDish(index)">
								</Dish>
							</div>
						</a-col>
					</div>

					<!-- <van-row type="flex" justify="space-around" class="info_0" v-for="(item,index) in listTemp"
						:key="index">
						<van-col span="6" class="info_4" v-for="(cell,i) in item" :key="i">
							<span v-if="cell.s_CurrencyName">待缴官费金额({{cell.s_CurrencyName}})</span>
							<p>{{cell.totalFee}}</p>
						</van-col>
					</van-row> -->

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
	const dishData = [{
		"dishId": 2,
		"dishName": "馒头",
		"price": 6.0,
		"intro": "馒头",
		"detail": "白面馒头好好吃好好吃好好吃",
		"type": "荤菜",
		"dishPic": null
	}, {
		"dishId": 3,
		"dishName": "饺子",
		"price": 10.0,
		"intro": "饺子",
		"detail": "韭菜饺子好好吃好好吃",
		"type": "素菜",
		"dishPic": null
	}, {
		"dishId": 4,
		"dishName": "烧麦",
		"price": 1.5,
		"intro": "简介",
		"detail": "详情",
		"type": "荤菜",
		"dishPic": null
	}, {
		"dishId": 5,
		"dishName": "青菜",
		"price": 1.0,
		"intro": "青菜",
		"detail": "新鲜青菜",
		"type": "素菜",
		"dishPic": null
	}, {
		"dishId": 17,
		"dishName": "肉",
		"price": 10.0,
		"intro": "猪肉",
		"detail": "新鲜猪肉",
		"type": "荤菜",
		"dishPic": null
	}, {
		"dishId": 22,
		"dishName": "肥肉",
		"price": 12.0,
		"intro": "猪肉",
		"detail": "新鲜猪肉",
		"type": "荤菜",
		"dishPic": null
	}, {
		"dishId": 24,
		"dishName": "fish",
		"price": 30.0,
		"intro": "烤鱼",
		"detail": "新鲜的鱼",
		"type": "Yiminghe",
		"dishPic": null
	}, {
		"dishId": 25,
		"dishName": "鱼",
		"price": 30.0,
		"intro": "烤鱼",
		"detail": "新鲜的鱼",
		"type": "Yiminghe",
		"dishPic": null
	}, {
		"dishId": 26,
		"dishName": "炒饭",
		"price": 12.0,
		"intro": "炒的饭",
		"detail": "会复活复活",
		"type": "jack",
		"dishPic": null
	}];

	export default {
		data() {
			return {
				dishData,
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
			// this.getData();
			this.getTime();

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

		},
		computed: {
			listTemp() {
				let index = 0;
				let count = 2; //两个一组
				let arrTemp = [];
				let dishData = this.dishData;
				for (let i = 0; i < this.dishData.length; i++) {
					index = parseInt(i / count);
					if (arrTemp.length <= index) {
						arrTemp.push([]);
					}
					arrTemp[index].push(dishData[i])
				}
				console.log('arrTemparrTemparrTemparrTemparrTemparrTemparrTemparrTemp')
				console.log(arrTemp)
				return arrTemp
			}
		},
		methods: {
			add() {
				this.dishData1++;
				this.dishData[0].dishNum++;
			},

			edit() {
				this.dishData.pop()
			},
			toXiadan() {
				let that = this;
				console.log(that.dishOrder);
				this.$router.push({
					// path: "/Xiadan",
					name:'xiadan',
					query: that.dishOrder
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
				console.log(this.dishData)
			},
			plusDish(index) {
				console.log("item.dishNum++;之前的item.dishNum++;", this.dishData)
				if (this.dishData[index].dishNum == 0) {
					this.dishOrder.push(this.dishData[index])
				}
				this.dishData[index].dishNum++;

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
							number: 0
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
