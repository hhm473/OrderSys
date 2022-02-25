<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div class="catalog">
				服务员首页 -> 点菜
				<a-botton type="danger" class="btn-back">返回</a-botton>
			</div>
		</div>
		<div style="width: 100%;height: 200px;"></div>
		<Dish></Dish>
	</div>
</template>

<script>
	import Dish from './Dish.vue'
	import PageHeader from './PageHeader.vue'
	export default {
		components: {
			Dish,
			PageHeader
		},
	}
</script>

<style scoped>
	.body {
		margin-top: 100px;
		width: 100%;
		background-color: white;
	}

	.catalog {
		height: 50px;
		font-size: 20px;
		line-height: 30px;
		padding: 10px 20px 10px 20px;
		display: flex;
	}

	.btn-back {
		float: right;
	}
</style>
