<template>
	<div>
		<div class="body">
			<div class="title">菜品管理</div>
			<div class="secondary-head">
				<div class="time">
					<div>名称：</div>
					<a-input v-model="dishName" placeholder="请输入名称" style="width: 100px;"></a-input>
				</div>
				<div class="table-number">
					推荐：
					<a-select default-value="-1" style="width: 80px" @change="handleTuijian">
						<a-select-option value="1">
							是
						</a-select-option>
						<a-select-option value="0">
							否
						</a-select-option>
						<a-select-option value="-1">
							全部
						</a-select-option>
					</a-select>
				</div>
				<div class="table-number">
					类型：
					<a-select default-value="-1" style="width: 80px" @change="handleType">
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
						<a-select-option value="-1">
							全部
						</a-select-option>
					</a-select>
				</div>
				<div class="price">
					价格：
					<div>
						<a-input type="number" v-model="minPrice" placeholder="最小价格" style="width: 50px;"></a-input>
					</div> -
					<div>
						<a-input type="number" v-model="maxPrice" placeholder="最大价格" style="width: 50px;"></a-input>
					</div>

				</div>
				<div class="total-price">
					<a-button type="primary" @click="dishSelect">查询</a-button>
				</div>
				<div class="total-price">
					<a-button type="primary" @click="toAddDish">新增菜品</a-button>
				</div>
			</div>
			<div style="padding: 20px;">
				<div>
					<!-- <a-table :columns="columns" :data-source="data1" bordered :scroll="{y: 450 }"> -->
					<a-table :columns="columns" :data-source="data1" bordered :scroll="{y: 350 }">
						<template slot="isrec" slot-scope="text, record">
							{{record.isrec == 1?'推荐':'' }}
						</template>
						<a-button slot="edit" slot-scope="text, record" @click="() => toEditDish(record)">
							修改
						</a-button>
						<template slot="dishPic" slot-scope="text, record">
							<img :src="record.dishPic" style="height: 70px" />
						</template>
						<template slot="delete" slot-scope="text, record">
							<!-- <a-popconfirm v-if="data1.length" title="确定删除 ?" @confirm="() => onDelete(record)"> -->
							<a-popconfirm v-if="data1.length" title="确定删除 ?" @confirm="() => onDelete(record)">
								<a-button>删除</a-button>
							</a-popconfirm>
						</template>
					</a-table>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Dish from '../components/Dish.vue'
	import OrderQingdan from '../components/OrderQingdan.vue'
	import axios from 'axios'
	const columns = [{
			title: '编号',
			dataIndex: 'dishId',
			key: 'dishId',
			width: 65
		},
		{
			title: '名称',
			dataIndex: 'dishName',
			key: 'dishName',
			width: 100
		},
		{
			title: '简介',
			key: 'intro',
			dataIndex: 'intro',
		},
		{
			title: '详情',
			key: 'detail',
			dataIndex: 'detail',
		},
		{
			title: '类型',
			key: 'type',
			dataIndex: 'type',
			width: 80
		},
		{
			title: '是否推荐',
			key: 'isrec',
			dataIndex: 'isrec',
			scopedSlots: {
				customRender: 'isrec'
			},
			width: 90
		},
		{
			title: '图片',
			key: 'dishPic',
			dataIndex: 'dishPic',
			scopedSlots: {
				customRender: 'dishPic'
			},
		},
		{
			title: '价格',
			key: 'price',
			dataIndex: 'price',
			width: 75
		},
		{
			title: '修改',
			key: 'edit',
			dataIndex: 'edit',
			scopedSlots: {
				customRender: 'edit'
			},
			width: 90
		},
		{
			title: '删除',
			key: 'delete',
			dataIndex: 'delete',
			scopedSlots: {
				customRender: 'delete'
			},
			width: 90
		}
	];

	export default {
		data() {
			return {
				kind: [],
				data1: [],
				Bdata: [],
				dishName: '',
				tuijian: '-1',
				type: '-1',
				minPrice: '',
				maxPrice: '',
				columns,
				timeNow: "2021-02-26",
				tableNum: 2
			}
		},
		mounted() {
			this.getData();
			// this.RequestKind();
		},
		methods: {
			back() {
				this.$router.push({
					path: "/administratorindex"
				});
			},
			toAddDish() {
				this.$router.push({
					path: "/AddDish"
				})
			},

			getData: function() {
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/dishes/querySome',
					headers: {
						'token': token
					},
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.data1 = res.data.map((item, i) => {
						item.key = i
						return item
					})
					// console.log(data);
				}).catch(res => {
					console.log(res)
					console.log('请求失败：' + res.status + ',' + res.statusText);
				});
			},

			toEditDish(record) {
				this.$router.push({
					name: "editdish",
					params: record
				})
			},
			onDelete(record) {
				let that = this;
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				console.log("0record",record);
				console.log(record.key);
				this.data1.splice(this.data1.findIndex(item => item.key == record.key), 1)
				axios.get("http://47.98.238.175:8080/dishes/remove", {
					params: {
						'dishid': record.dishId
					},
					headers: {
						'token': token
					},
				}).then(function(response) {
					// console.log(response)
					that.$message.success('删除成功！');
				}).catch(function(error) {
					that.$message.error(error);
				});
			},

			handleKind(value) {
				this.dishName = value
			},
			handleTuijian(value) {
				this.tuijian = value
			},
			handleType(value) {
				this.type = value
			},
			handlePrice(value) {
				this.price = value
			},
			dishSelect() {
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let that = this;
				this.axios.get("http://47.98.238.175:8080/dishes/querySome", {
					params: {
						"dishName": that.dishName,
						"minPrice": that.minPrice,
						"maxPrice": that.maxPrice,
					},
					headers: {
						'token': token
					},
				}).then(function(res) {
					that.data1 = res.data;
					if (that.tuijian != '-1') {
						that.Bdata = that.data1;
						that.data1 = that.Bdata.filter((item, index) => {
							if (that.tuijian == "0") {
								return item.isrec == 0
							} else {
								return item.isrec == 1
							}
						})
						console.log(that.data1)
					}
					if (that.type != '-1') {
						that.Bdata = that.data1;
						that.data1 = that.Bdata.filter((item, index) => {
							return item.type == that.type
						})
						console.log(that.data1)
					}
				}).catch(function(error) {
					alert(error);
				});

			},
		},
	}
</script>

<style scoped>
	.body {
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		width: 100%;
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
		background-color: rgba(255, 255, 255, 0.7);
	}

	.secondary-head {
		display: flex;
		padding: 20px;
		height: 60px;
		font-size: 20px;
		font-weight: bold;
	}

	.time {
		margin-right: 20px;
		width: 180px;
		display: flex;
		justify-content: center;
	}

	.table-number {
		margin-right: 20px;
		width: 160px;
		display: flex;
		justify-content: space-around;
	}

	.price {
		margin-right: 50px;
		width: 190px;
		display: flex;
		justify-content: space-around;
	}
	
	.table-number div {
		width: 80px;
	}

	.total-price {
		margin-right: 50px;
	}
</style>
