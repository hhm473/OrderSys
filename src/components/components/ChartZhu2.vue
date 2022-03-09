<template>
	<div id="zhuChart2" :style="{width: '400px', height: '300px'}"></div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				xAxis:[],
				seriesData:[]
			}
		},
		mounted() {
			this.get7DaysData();
		},
		methods: {
			get7DaysData() {
				let that = this;
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				this.axios.get("http://47.98.238.175:8080/order/get6MonthsData", {
						headers: {
							'Token': token
						},
					}).then(res => {
					console.log("get6MonthsData",res)
					let data6Month = res.data
					data6Month.map((item, index) => {
						console.log(item.click_date)
						that.xAxis.push(item.click_date)
						console.log(item.totalprice)
						that.seriesData.push(item.totalprice)
					})
					that.xAxis = JSON.parse(JSON.stringify(that.xAxis));
					that.seriesData = JSON.parse(JSON.stringify(that.seriesData));
					that.xAxis = that.xAxis.reverse();
					that.seriesData = that.seriesData.reverse();
					that.drawLine();
					console.log("xAxisxAxisxAxisxAxisxAxis",that.xAxis);
					console.log("seriesDataseriesDataseriesDataseriesData",that.seriesData)
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			drawLine() {
				let that = this
				// 基于准备好的dom，初始化echarts实例
				let zhuChart = this.$echarts.init(document.getElementById('zhuChart2'))
				// 绘制图表
				zhuChart.setOption({
					title: {
						text: '销售额（元）'
					},
					tooltip: {},
					xAxis: {
						data: that.$data.xAxis
					},
					yAxis: {},
					series: [{
						name: '销售额',
						type: 'bar',
						data: that.$data.seriesData
					}]
				});
			}
		}
	}
</script>

<style scoped>

</style>
