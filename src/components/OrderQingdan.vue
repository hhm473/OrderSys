<template>
	<div class="board-wrap">
		<div class="big-title">
			已购菜品
		</div>
		<a-table class="table" :columns="columns" :data-source="list" bordered :scroll="{y: 700 }">

		</a-table>
		<div v-show="false">
			{{totalPrice}}
		</div>
		<!-- 		<div class="item-wrap">
			<div class="item" v-for="item in list" v-bind:key="item">
				<div>{{item.title}}</div>
				<div>{{item.send_time}}</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	const columns = [{
			title: '名称',
			dataIndex: 'dishName',
			key: 'dishName',
		},
		{
			title: '数量',
			dataIndex: 'dishNum',
			key: 'dishNum',
		},
		{
			title: '金额',
			key: 'price',
			dataIndex: 'price',
		},
	];
	export default {
		name: 'OrderQingdan',
		data() {
			return {
				columns
			}
		},
		props: {
			list: {
				type: [Object],
			},
			totalPrice: String,
		}
	}
</script>

<style scoped>
	.board-wrap {
		width: 90%;
		margin: auto;
		height: 650px;
	}

	.big-title {
		width: 95%;
		height: 60px;
		margin: auto;
		border-radius: 25px;
		font-size: 23px;
		font-weight: bold;
		line-height: 60px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.table {
		width: 95%;
		margin: auto;
		border-radius: 25px;
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 500px;
		overflow: auto;
	}
</style>
