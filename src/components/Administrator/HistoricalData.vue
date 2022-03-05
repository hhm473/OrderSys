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
				<a-table class="table" :columns="columnsRank" :data-source="dataDish" bordered :scroll="{y: 130 }"
					size=middle>

				</a-table>
			</div>
		</div>
		<div class="chart">
			<div>
				<chart-zhu></chart-zhu>
				hhhhhh
			</div>
			<div>
				<chart-bing></chart-bing>
			</div>
		</div>
	</div>
</template>

<script>
	import ChartZhu from '../ChartZhu.vue'
	import ChartBing from '../ChartBing.vue'
	const columnsRank = [{
			title: '排名',
			dataIndex: 'dish_name',
			key: 'dish_name',
		},
		{
			title: '菜品名称',
			dataIndex: 'table_name',
			key: 'table_name',
		},
		{
			title: '月销售量',
			key: 'month_sale',
			dataIndex: 'month_sale',
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
				columnsRank,
				todaySales: 32,
				yedaySales: 22,
				weekSales: 540,
				monthSales: 4200,
			}
		},
		components: {
			ChartZhu,
			ChartBing
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
</style>
