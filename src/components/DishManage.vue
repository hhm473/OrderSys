<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div class="catalog">
				<span class="cata-info">
					<router-link to="/administratorindex" style="color: white;">管理员首页</router-link>
				</span>
				>
				<span class="cata-info">
					<router-link to="/dishmanage" style="color: white;">菜品管理</router-link>
				</span>
				<a-button class="btn-back">返回</a-button>
			</div>
			<div class="secondary-head">
				<div class="time">
					名称：
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
				<div class="table-number">
					是否推荐：
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
				<div class="table-number">
					价格：
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
					<a-button type="primary">查询</a-button>
				</div>
				<div class="total-price">
					<a-button type="primary" @click="toAddDish">新增菜品</a-button>
				</div>
			</div>
			<div style="padding: 20px;">
				<div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 350 }">
						<a-button slot="edit" slot-scope="text, record" @click="() => toEditDish(record.key)">
							修改
						</a-button>
						<template slot="pic" slot-scope="text, record">
							<img src="../assets/logo.png" style="height: 20px" />
							{{record.ipc}}
							<!-- <a-button>结账</a-button> -->
						</template>
						<template slot="delete" slot-scope="text, record">
							<a-popconfirm v-if="data.length" title="确定删除 ?" @confirm="() => onDelete(record.key)">
								<a-button>删除</a-button>
							</a-popconfirm>
						</template>
					</a-table>
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
	import axios from 'axios'
	const columns = [{
			title: '编号',
			dataIndex: 'num',
			key: 'num',
		},
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
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
	const data = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		}, {
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			deliver: "等待推送"
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			deliver: "已推送"
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			deliver: "等待推送"
		},
	];

	export default {
		data() {
			return {
				data,
				columns,
				timeNow: "2021-02-26",
				totalPrice: 35,
				tableNum: 2
			}
		},
		components: {
			PageHeader,
		},
		mounted() {
			axios({ //格式a
				method: 'get',
				url: 'http://localhost:8080/OrderSys/dishes/all'
			}).then(function(resp) {
				console.log(resp)
				console.log(resp.data);
			}).catch(resp => {
				console.log(resp)
				console.log('请求失败：' + resp.status + ',' + resp.statusText);
			});
		},
		methods: {
			toAddDish() {
				this.$router.push({
					path: "/AddDish"
				})
			},

			send() {
				axios({ //格式a
					method: 'get',
					url: 'http:/localhost:8080/OrderSys/dishes/all'
				}).then(function(resp) {
					console.log(resp.data);
				}).catch(resp => {
					console.log('请求失败：' + resp.status + ',' + resp.statusText);
				});
			},

			toEditDish() {
				this.$router.push({
					path: "/EditDish"
				})
			}
			// http:/localhost:8080/OrderSys/dishes/add
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
