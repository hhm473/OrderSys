<template>
	<div class="board-wrap">
		<div class="big-title">
			已购菜品
		</div>
		<a-table id="wrap" class="table" :columns="columns" :data-source="list" bordered :scroll="{y: 700 }">

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
		height: 100%;
	}

	.big-title {
		width: 95%;
		height: 60px;
		margin: auto;
		border-radius: 25px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
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
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 85%;
		overflow: auto;
	}
	
	#wrap::-webkit-scrollbar {
	width: 5px;
	background-color: #F5F5F5;
	}
	#wrap::-webkit-scrollbar-thumb {
	    background-color: #fda03f;
	    
	}
	#wrap::-webkit-scrollbar-track {
	    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
	    background-color: #F5F5F5;
	}
</style>
