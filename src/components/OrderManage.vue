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
					<router-link to="/ordermanage" style="color: white;">订单管理</router-link>
				</span>
				<a-button class="btn-back">返回</a-button>
			</div>
			<div class="secondary-head">
				<div class="time">
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
				<div class="table-number">
					状态：
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
			</div>
			<div style="padding: 20px;">
				<div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 350 }">
						
						
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
	
	const columns = [{
			title: '编号',
			dataIndex: 'num',
			key: 'num',
		},
		{
			title: '桌号',
			dataIndex: 'tableNum',
			key: 'table-num',
		},
		{
			title: '下单时间',
			key: 'number',
			dataIndex: 'number',
		},
		{
			title: '菜品列表',
			key: 'cook',
			dataIndex: 'cook',
		},
		{
			title: '总金额',
			key: 'cook',
			dataIndex: 'cook',
		},
		{
			title: '订单状态',
			key: 'cook',
			dataIndex: 'cook',
		},
	];
	const data = [{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '6',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '7',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '8',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},{
			key: '1',
			name: 'John Brown',
			tableNum: "2",
			number: '1',
			cook: "等待烹饪"
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			cook: "已烹饪"
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			cook: "等待烹饪"
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
		mounted(){
			
		},
		methods:{
			
			getData: function() {
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/dishes/all'
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.data1 = res.data;
					// console.log(data);
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
