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
			<a-form :form="form" @submit="handleAddDish">
				<a-row :gutter="[0,50]">
					<a-col :span="4">
						<div class="input-item">
							菜品名称：
						</div>
					</a-col>
					<a-col :span="6">
						<a-form-item>
							<a-input v-decorator="['dishName']" placeholder='请输入菜品名称' />
						</a-form-item>
					</a-col>
					<a-col :span="4">
						<div class="input-item">
							菜品价格：
						</div>
					</a-col>
					<a-col :span="2">
						<a-form-item>
							<!-- 							{
							            rules: [
							              {
							                type: 'number',
							                message: '请输入数字!',
							              },
							              {
							                required: true,
							                message: '请输入菜品价格!',
							              },
							            ],
							          }, -->
							<a-input-number v-decorator="[
							          'price',
									  
							        ]" placeholder='请输入菜品价格' />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="[0,50]">
					<a-col :span="4">
						<div class="input-item">
							菜品简介：
						</div>
					</a-col>
					<a-col :span="14">
						<a-form-item>
							<a-input v-decorator="['intro']" placeholder='请输入菜品简介' />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="[0,50]">
					<a-col :span="4">
						<div class="input-item">
							菜品详情：
						</div>
					</a-col>
					<a-col :span="14">
						<a-form-item>
							<a-textarea v-decorator="['detail']" placeholder="请输入菜品详情" :rows="4" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="[0,50]">
					<a-col :span="4">
						<div class="input-item">
							菜品图片：
						</div>
					</a-col>
					<a-col :span="4">
						<a-button>
							<a-icon type="upload" /> 上传头像
						</a-button>
					</a-col>
					<a-col :span="4">
						<div class="input-item">
							是否推荐：
						</div>
					</a-col>
					<a-col :span="4">
						<a-form-item>
							<a-select v-decorator="['type']" default-value="lucy" style="width: 120px">
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
						</a-form-item>
					</a-col>
				</a-row>
				<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
					<div style="text-align: center;">
						<a-button type="primary" html-type="submit" size="large">确认</a-button>
					</div>

				</a-form-item>
			</a-form>
		</div>

	</div>

</template>

<script>
	import PageHeader from './PageHeader.vue'
	import axios from 'axios'
	export default {
		name: 'SignUp',
		components: {
			PageHeader
		},

		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'register'
			});
		},
		methods: {
			handleAddDish() {
				let that = this;
				this.form.validateFields((err, values) => {
					if (!err) {
						values.price = Number(values.price)
						console.log(values)
						axios.get("http://47.98.238.175:8080/dishes/add", {
							params: values
						}).then(function(response) {
							alert('添加成功！');
							that.$router.go(-1);
						}).catch(function(error) {
							alert(error);
						});
					}
				});
			},
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
