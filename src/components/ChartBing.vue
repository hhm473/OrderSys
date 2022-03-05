<template>
	<div id="bingChart" :style="{width: '300px', height: '400px'}"></div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let bingChart = this.$echarts.init(document.getElementById('bingChart'))
				// 绘制图表
				bingChart.setOption({
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
					 left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 20,
							borderColor: '#fff',
							borderWidth: 10
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
					  	show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
					 data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				});
			}
		}
	}
</script>

<style>

</style>
