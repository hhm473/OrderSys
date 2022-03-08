<template>
	<div style="justify-content: center;">
		<div style="display: flex; justify-content: space-around;">
			<div class="sales">
				<div class="item">
					今日销售额
				</div>
				<div class="today-sale">
					￥&nbsp;{{todaySales}}
				</div>
				<div class="yesday">
					<span class="item">昨日销售额</span>
					￥ {{yedaySales}}
				</div>
				<div style="padding-top: 5%;">
					<span class="item">本周收入</span>￥ {{weekSales}}
				</div>
				<div style="padding-top: 2%;">
					<span class="item">本月收入</span> ￥ {{monthSales}}
				</div>
			</div>
			<div class="rank">
				<a-table class="table" :columns="columnsRank" :data-source="dataRank" bordered :scroll="{y: 180 }"
					size=middle>
				</a-table>
			</div>
		</div>
		<div class="chart">
			<div style="margin: auto;">
				<div style="display: flex; justify-content: space-around;">
					<div :class="showWeek?'picked':'unpicked'" @click="toWeek">周统计</div>
					<div :class="showWeek?'unpicked':'picked'" @click="toMonth">月统计</div>
				</div>
				<chart-zhu v-if="showWeek"></chart-zhu>
				<chart-zhu2 v-else></chart-zhu2>
			</div>
			<div style="margin: auto;">
				<chart-bing :data="dataBing"></chart-bing>
			</div>
		</div>
	</div>
</template>

<script>
	import ChartZhu from '../components/ChartZhu.vue'
	import ChartZhu2 from '../components/ChartZhu2.vue'
	import ChartBing from '../components/ChartBing.vue'
	const columnsRank = [{
			title: '排名',
			dataIndex: 'dish_rank',
			key: 'dish_rank',
		},
		{
			title: '菜品名称',
			dataIndex: 'dish_name',
			key: 'dish_name',
		},
		{
			title: '月销售量',
			key: 'total',
			dataIndex: 'total',
		},
		{
			title: '菜品单价',
			key: 'price',
			dataIndex: 'price',
		},
	];
	export default {
		data() {
			return {
				todaySales: 32,
				yedaySales: 22,
				weekSales: 540,
				monthSales: 4200,
				columnsRank,
				dataRank: [],
				zZhu2: [],
				dataZhu2: [],
				dataBing: [],
				showWeek: true,
			}
		},
		components: {
			ChartZhu,
			ChartZhu2,
			ChartBing
		},		
		mounted() {
			this.getSaleData()
			this.getRankData()
		},
		methods: {
			toWeek(){
				this.showWeek = true
			},
			toMonth(){
				this.showWeek = false
			},
			getSaleData() {
				this.getToday()
				this.getYesterday()
				this.getWeek()
				this.getMonth()
			},
			getToday() {
				this.axios.get("http://47.98.238.175:8080/order/getToday").then(res => {
						// console.log(res)
						this.todaySales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getYesterday() {
				this.axios.get("http://47.98.238.175:8080/order/getYesterday").then(res => {
						// console.log(res)
						this.yedaySales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getWeek() {
				this.axios.get("http://47.98.238.175:8080/order/getThisWeek").then(res => {
						// console.log(res)
						this.weekSales = res.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getMonth() {
				this.axios.get("http://47.98.238.175:8080/order/getThisMonth").then(res => {
						// console.log(res)
						this.monthSales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getRankData() {
				this.axios.get("http://47.98.238.175:8080/order/querySales").then(res => {
						// console.log(res)
						this.dataRank = res.data

						this.data = res.data.map((item, i) => {
							item.dish_rank = i + 1

							return item.dish_rank
						})
					})
					.catch(function(error) {
						console.log(error);
					});
			},
		}
	}
</script>

<style scoped>
	.sales {
		width: 30%;
		height: 280px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		justify-content: space-around;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 20px 0 0 0px;
		font-size: 18px;
	}

	.item {
		letter-spacing: 3px;
		padding-left: 20px;
		width: 200px;
	}

	.today-sale {
		margin-left: -80px;
		margin-top: 15px;
		margin-bottom: 15px;
		text-align: center;
		font-size: 40px;
	}

	.yesday {
		padding-bottom: 10px;
		border-bottom: 3px solid #FFC69A;
	}

	.rank {
		width: 65%;
		padding: 10px;
		height: 280px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.6);
	}

	.chart {
		display: flex;
		justify-content: space-around;
		height: 380px;
		margin: auto;
		margin-top: 20px;
		width: 97.5%;
		/* margin-left: 1.2%; */
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.6);
	}

	.picked {
		font-size: 25px;
		color: #FF9E53;
		border-bottom: #FF9E53 solid 2px;
	}
	.unpicked {
		font-size: 25px;
	}
</style>
