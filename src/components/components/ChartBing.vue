<template>
	<div id="bingChart" :style="{width: '300px', height: '400px'}"></div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				dataBing: []
			}
		},
		// props: {
		// 	data: {
		// 		type: [],
		// 		default: [{
		// 				value: 148,
		// 				name: 'Search Enginefffffffff'
		// 			},
		// 			{
		// 				value: 735,
		// 				name: 'Direct'
		// 			},
		// 			{
		// 				value: 580,
		// 				name: 'Email'
		// 			},
		// 			{
		// 				value: 484,
		// 				name: 'Union Ads'
		// 			},
		// 			{
		// 				value: 300,
		// 				name: 'Video Ads'
		// 			}
		// 		]
		// 	}
		// },
		mounted() {
			this.get6MonthsData();
		},
		methods: {
			get6MonthsData() {
				let that = this;
				this.axios.get("http://47.98.238.175:8080/order/get6MonthsData").then(res => {
						console.log(res)
						let data = res.data
						for (let i = 0; i < data.length; i++) {
							let item = {
								"value": data[i].totalprice,
								"name": data[i].click_date
							}
							that.dataBing.push(item)
						}
						that.dataBing = JSON.parse(JSON.stringify(that.dataBing));
						that.drawLine()
						console.log("that.xZhu2that.xZhu2", that.xZhu2);
						console.log("that.xZhu2that.xZhu2", that.dataZhu2)
					})
					.catch(function(error) {
						console.log(error);
					});
				console.log("that.xZhu2", that.xZhu2)
				console.log("that.dataZhu2", that.dataZhu2)
				console.log("that.dataBing", that.dataBing)
			},
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
						name: '销售量',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 0,
							borderColor: '#fff',
							borderWidth: 5
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
						data: this.dataBing
					}]
				});
			}
		}
	}
</script>

<style scoped>

</style>
