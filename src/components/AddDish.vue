<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div class="catalog">
				<span class="cata-info">
					<router-link to="/administratorindex" style="color: white;">管理员首页</router-link>
				</span>
				>
				<span class="cata-info">
					<router-link to="/dishmanage" style="color: white;">菜品管理</router-link>
				</span>
				>
				<span class="cata-info">新增菜品</span>
				<a-button class="btn-back">返回</a-button>
			</div>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品名称：
					</div>
				</a-col>
				<a-col :span="6">
					<a-input placeholder='请输入用户名' />
				</a-col>
				<a-col :span="4">
					<div class="input-item">
						菜品价格：
					</div>
				</a-col>
				<a-col :span="2">
					<a-input placeholder='请输入用户名' />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品简介：
					</div>
				</a-col>
				<a-col :span="14">
					<a-input placeholder='请输入用户名' />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品详情：
					</div>
				</a-col>
				<a-col :span="14">
					<a-textarea placeholder="Basic usage" :rows="4" />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品图片：
					</div>
				</a-col>
				<a-col :span="4">
					<a-button> <a-icon type="upload" /> 上传头像 </a-button>
				</a-col>
				<a-col :span="4">
					<div class="input-item">
						是否推荐：
					</div>
				</a-col>
				<a-col :span="4">
					
					<a-select default-value="lucy" style="width: 120px" @change="handleChange">
						<a-select-option value="jack">
							Jack
						</a-select-option>
						<a-select-option value="lucy">
							Lucy
						</a-select-option>
						<a-select-option value="Yiminghe">
							yiminghe
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>
			
			<div style="text-align: center;">
				<a-button type="primary" size="large">确认</a-button>
			</div>
		</div>

	</div>

</template>

<script>
	import PageHeader from './PageHeader.vue'

	export default {
		name: 'SignUp',
		components: {
			PageHeader
		},
	}
</script>

<style scoped>
	.body {
		margin-top: 100px;
		width: 100%;
	}

	.catalog {
		height: 50px;
		font-size: 20px;
		line-height: 30px;
		padding: 10px 20px 10px 20px;
	}

	.cata-info {
		background-color: #A4ADB3;
		color: white;
	}

	.btn-back {
		float: right;
	}

	.highlight {
		color: #FE742B;
	}

	.form {
		padding-top: 20px;
	}

	.body .title {
		font-size: 30px;
		font-weight: bold;
		padding-left: 60px;
		padding-top: 20px;
	}

	.body .hint {
		font-size: 10px;
		padding-left: 20px;
		padding-top: 40px;
	}

	.input-item {
		font-size: 15px;
		margin: 10px 0 0 100px;
	}

	.input-hint {
		margin: 10px 0 0 5px;
		margin-left: 5px;
		background-color: #F9F8F2;
	}

	.ant-col-sm-16 {
		width: 100% !important;
	}
</style>
