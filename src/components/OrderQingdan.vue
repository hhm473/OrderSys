<template>
	<div class="board-wrap">
		<div class="big-title">
			已购菜品
		</div>
		<a-table :columns="columns" :data-source="list" bordered :scroll="{y: 700 }">

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

<style>
	.board-wrap {
		width: 90%;
		margin: auto;
	}

	.big-title {
		width: 100%;
		height: 70px;
		font-size: 30px;
		font-weight: bold;
		line-height: 70px;
		text-align: center;
	}

	.item {
		width: 100%;
		height: 50px;
		border-radius: 3px;
		background-color: #CFD8DC;
		overflow: hidden;
		padding: 3px 5px;
		font-size: 20px;
		font-weight: bold;
		margin-top: 10px;
		line-height: 50px;
		cursor: pointer;
	}

	.item div:first-child {
		float: left;
	}

	.item div:last-child {
		float: right;
		font-weight: 500;
		color: #707070;
	}

	.item-wrap {
		border-top: 2px solid #616161;
	}
</style>
