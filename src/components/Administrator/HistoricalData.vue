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
				<div>
					<span class="item">本周收入</span>￥ {{weekSales}}
				</div>
				<div>
					本月收入 ￥ {{monthSales}}
				</div>
			</div>
			<div class="rank">
				<a-table class="table" :columns="columnsRank" :data-source="dataRank" bordered :scroll="{y: 160 }"
					size=middle>
				</a-table>
			</div>
		</div>
		<div class="chart">
			<div style="margin: auto;">
				<div style="display: flex; justify-content: space-around;">
					
						<!-- :class="[isActive==1?'active':'']" -->
					<div :class="showWeek?'picked':'unpick'">周统计</div>
					<div>月统计</div>
				</div>
				<chart-zhu :xAxis="xZhu1" :seriesData="dataZhu1" v-if="showWeek"></chart-zhu>
				<chart-zhu :xAxis="xZhu2" :seriesData="dataZhu2" v-else></chart-zhu>
			</div>
			<div style="margin: auto;">
				<chart-bing :data="dataBing"></chart-bing>
			</div>
		</div>
	</div>
</template>

<script>
	import ChartZhu from '../ChartZhu.vue'
	import ChartBing from '../ChartBing.vue'
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
				xZhu1: [],
				dataZhu1: [],
				zZhu2: [],
				dataZhu2: [],
				dataBing: [],
				showWeek: true,
			}
		},
		components: {
			ChartZhu,
			ChartBing
		},
		created() {
			this.xZhu1 = ["2022-03-06", "2022-03-07"]
			this.dataZhu1 = [88, 7]

			this.getChartData()
		},
		mounted() {
			this.getSaleData()
			this.getRankData()
			// this.getChartData()
		},
		methods: {
			getSaleData() {
				this.getToday()
				this.getYesterday()
				this.getWeek()
				this.getMonth()
			},
			getToday() {
				this.axios.get("http://47.98.238.175:8080/order/getToday").then(res => {
						console.log(res)
						this.todaySales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getYesterday() {
				this.axios.get("http://47.98.238.175:8080/order/getYesterday").then(res => {
						console.log(res)
						this.yedaySales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getWeek() {
				this.axios.get("http://47.98.238.175:8080/order/getThisWeek").then(res => {
						console.log(res)
						this.weekSales = res.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getMonth() {
				this.axios.get("http://47.98.238.175:8080/order/getThisMonth").then(res => {
						console.log(res)
						this.monthSales = res.data.totalprice
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getRankData() {
				this.axios.get("http://47.98.238.175:8080/order/querySales").then(res => {
						console.log(res)
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
			getChartData() {
				this.get7DaysData();
				// this.get6MonthsData();
			},
			get7DaysData() {
				let that = this;
				this.axios.get("http://47.98.238.175:8080/order/get7DaysData").then(res => {
						console.log(res)
						let data = res.data
						for (let i = 0; i < data.length; i++) {
							that.xZhu1.push(data[i].click_date)
							that.dataZhu1.push(data[i].totalprice)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			get6MonthsData() {
				let that = this;
				this.axios.get("http://47.98.238.175:8080/order/get6MonthsData").then(res => {
						console.log(res)
						let data = res.data
						for (let i = 0; i < data.length; i++) {
							that.xZhu2.push(data[i].click_date)
							that.dataZhu2.push(data[i].totalprice)
							let item = {
								"value": data[i].totalprice,
								"name": data[i].click_date
							}
							that.dataBing.push(item)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style>
	.sales {
		width: 30%;
		height: 280px;
		border-radius: 20px;
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
		border-radius: 20px;
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
		border-radius: 20px;
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
