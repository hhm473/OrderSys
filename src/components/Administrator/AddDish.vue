<template>
	<div>
		<div class="body">
			<div class="title">
				添加菜品
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
							<a-select default-value="0" style="width: 120px" @change="handleChange">
								<a-select-option value="0">
									否
								</a-select-option>
								<a-select-option value="1">
									是
								</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
				<a-form-item>
					<div class="button-wrap" >
						<a-button type="primary" html-type="submit" size="large" >提交</a-button>
						<a-button type="primary" size="large" @click="comeBack">返回</a-button>
					</div>
				</a-form-item>
			</a-form>
		</div>

	</div>

</template>

<script>
	import axios from 'axios'
	export default {
		name: 'AddDish',

		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'register'
			});
		},
		methods: {
			back() {
				this.$router.push({path:"/dishmanage"});
			},
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
			
			comeBack(){
				this.$router.go(-1)
			}
			
		},
	}
</script>

<style scoped>
	.body{
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255,255,255,0.5);
	}
	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin:20px auto;
		background-color: rgba(255,255,255,0.7);
	}

	.highlight {
		color: #FE742B;
	}

	.form {
		padding-top: 20px;
	}


	.body .hint {
		font-size: 10px;
		padding-left: 20px;
		padding-top: 40px;
	}

	.input-item {
		font-size: 18px;
		font-weight: bold;
		margin: 10px 0 0 60px;
	}

	.input-hint {
		margin: 10px 0 0 5px;
		margin-left: 5px;
		background-color: #F9F8F2;
	}

	.ant-col-sm-16 {
		width: 100% !important;
	}
	
	.button-wrap{
		margin: auto;
		width: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
