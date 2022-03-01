<template>
	<div>
		<div class="body">
			<div class="title">菜品管理</div>
			<div class="secondary-head">
				<div class="time">
					<div>名称：</div><a-input v-model="dishName" placeholder="请输入名称" maxLength=3 style="width: 150px;"></a-input>
				</div>
				<div class="table-number">
					是否推荐：
					<a-select default-value="全部" style="width: 120px" @change="handleTuijian">
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
					<div><a-input type="number" v-model="minPrice" maxLength=3 placeholder="最小价格"></a-input></div> -
					<div><a-input type="number" v-model="maxPrice" maxLength=3 placeholder="最大价格"></a-input></div>
					
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
					<a-table :columns="columns" :data-source="data1" bordered :scroll="{y: 450 }">
						<a-button slot="edit" slot-scope="text, record" @click="() => toEditDish(record)">
							修改
						</a-button>
						<template slot="pic" slot-scope="text, record">
							<img src="../../assets/logo.png" style="height: 20px" />
							{{record.ipc}}
						</template>
						<template slot="delete" slot-scope="text, record">
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
			key: 'reco',
			dataIndex: 'reco',
		},
		{
			title: '图片',
			key: 'pic',
			dataIndex: 'pic',
			scopedSlots: {
				customRender: 'pic'
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
	const data1 = [];

	export default {
		data() {
			return {
				kind: [],
				data1,
				Bdata: [],
				dishName: '',
				tuijian: '',
				minPrice: '',
				maxPrice: '',
				columns,
				timeNow: "2021-02-26",
				tableNum: 2
			}
		},
		mounted() {
			this.getData();
			this.RequestKind();
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
					that.data1 = res.data;
					that.Bdata = that.data1;
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
				console.log(record);
				axios.get("http://47.98.238.175:8080/dishes/remove", {
					params: {
						'dishid': record.dishId
					}
				}).then(function(response) {
					alert('删除成功');
				}).catch(function(error) {
					alert(error);
				});
				location.reload();

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
					// alert('修改成功！');

					that.data1 = res.data;
					// that.$router.go(-1);
				}).catch(function(error) {
					alert(error);
				});
			},
			
			handlecook(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.cook === "等待烹饪") {
						target.cook = "正在烹饪";
					} else {
						target.cook = "已烹饪"
					}
				}
			},

		},
	}
</script>

<style scoped>
	.body {
		padding-top: 10px;
		background-color: rgba(255,255,255,0.5);
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
		margin:20px auto;
		background-color: rgba(255,255,255,0.7);
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
	.table-number div{
		width: 80px;
	}

	.total-price {
		margin-right: 50px;
	}
</style>
