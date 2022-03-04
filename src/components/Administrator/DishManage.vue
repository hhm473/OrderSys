<template>
	<div>
		<div class="body">
			<div class="title">菜品管理</div>
			<div class="secondary-head">
				<div class="time">
					<div>名称：</div>
					<a-input v-model="dishName" placeholder="请输入名称" style="width: 150px;"></a-input>
				</div>
				<div class="table-number">
					是否推荐：
					<a-select default-value="-1" style="width: 120px" @change="handleTuijian">
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
					价格：
					<div>
						<a-input type="number" v-model="minPrice" placeholder="最小价格"></a-input>
					</div> -
					<div>
						<a-input type="number" v-model="maxPrice" placeholder="最大价格"></a-input>
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
	import Dish from '../Dish.vue'
	import OrderQingdan from '../OrderQingdan.vue'
	import axios from 'axios'
	const columns = [{
			title: '编号',
			dataIndex: 'dishId',
			key: 'dishId',
		},
		{
			title: '名称',
			dataIndex: 'dishName',
			key: 'dishName',
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
			title: '是否推荐',
			key: 'isrec',
			dataIndex: 'isrec',
			scopedSlots: {
				customRender: 'isrec'
			},
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
		},
		{
			title: '修改',
			key: 'edit',
			dataIndex: 'edit',
			scopedSlots: {
				customRender: 'edit'
			},
		},
		{
			title: '删除',
			key: 'delete',
			dataIndex: 'delete',
			scopedSlots: {
				customRender: 'delete'
			},
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
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/dishes/querySome'
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.data1 = res.data.map((item,i) => {
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
				console.log(record.key);
				this.data1.splice(this.data1.findIndex(item => item.key == record.key), 1)
				axios.get("http://47.98.238.175:8080/dishes/remove", {
					params: {
						'dishid': record.dishId
					}
				}).then(function(response) {
					// alert('删除成功');
					that.$message.success('删除成功！');
				}).catch(function(error) {
					// alert(error);
					that.$message.error(error);
				});
				// location.reload();

			},

			handleKind(value) {
				this.dishName = value
			},
			handleTuijian(value) {
				this.tuijian = value
			},
			handlePrice(value) {
				this.price = value
			},
			dishSelect() {
				let that = this;
				this.axios.get("http://47.98.238.175:8080/dishes/querySome", {
					params: {
						"dishName": that.dishName,
						"minPrice": that.minPrice,
						"maxPrice": that.maxPrice,
					}
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
				}).catch(function(error) {
					alert(error);
				});
				
			},
		},
	}
</script>

<style scoped>
	.body {
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		width: 100%;
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
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
		margin-right: 50px;
		width: 250px;
		display: flex;
		justify-content: center;
	}

	.table-number {
		margin-right: 50px;
		width: 250px;
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
