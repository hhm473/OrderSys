<template>
	<div id="zhuChart" :style="{width: '400px', height: '300px'}"></div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		},
		props: {
			xAxis: {
				type: [],
				default: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			seriesData: {
				type: [],
				default: [5, 20, 36, 10, 10, 20]
			}
		},
		mounted() {
			console.log("zhuChartxAxis",this.xAxis)
			console.log("zhuChartseriesData",this.seriesData)
			this.drawLine();
		},
		methods: {
			drawLine() {
				let that = this
				// 基于准备好的dom，初始化echarts实例
				let zhuChart = this.$echarts.init(document.getElementById('zhuChart'))
				// 绘制图表
				zhuChart.setOption({
					title: {
						text: '销售额（元）'
					},
					tooltip: {},
					xAxis: {
						data: that.xAxis
					},
					yAxis: {
					},
					series: [{
						name: '销售额',
						type: 'bar',
						data: that.seriesData
					}]
				});
			}
		}
	}
</script>

<style>

</style>
