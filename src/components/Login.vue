<template>
	<div>
		<page-header></page-header>
		<div class="login-wrap">
			<div class="header-title">
				用户名登录
			</div>
			<a-form :form="form" @submit="handleSubmit">
				<a-row style="height: 90px;">
					<a-col :span="6">
						<div class="username">用户名：</div>
					</a-col>

					<a-col :span="16">
						<a-form-item  has-feedback>
							<a-input v-decorator="[
								'userId',
								{
								rules: [
									{
									required: true,
									message: '用户名不能为空!',
									},
									{
									validator: validateToNextPassword,
									},
								],
								},
							]" placeholder="请输入用户名" style="height: 50px; border-radius: 50px; padding-left: 15px;" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row style="height: 90px;">
					<a-col :span="6">
						<div class="username">密码：</div>
					</a-col>

					<a-col :span="16">
						<a-form-item  has-feedback>
							<a-input v-decorator="[
								'password',
								{
								rules: [
									{
									required: true,
									message: '用户密码不能为空',
									},
									{
									validator: validateToNextPassword,
									},
								],
								},
							]" placeholder="请输入密码" type="password" style="height: 50px; border-radius: 50px; padding-left: 15px;" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row style="height: 90px;">
					<a-col :span="6">
						<div class="username">身份选择：</div>
					</a-col>
					
					<a-col :span="10">
						<a-form-item  has-feedback>
						<a-select  v-decorator="['prefix']">
							<a-select-option value="1">
								管理员
							</a-select-option>
							<a-select-option value="2">
								后厨
							</a-select-option>
							<a-select-option value="3">
								服务员
							</a-select-option>
						</a-select>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row style="height: 90px;">
					<a-col :span="6">
						<div class="username">验证码：</div>
					</a-col>
					
					<a-col :span="8">
						<a-form-item  has-feedback>
						<a-input  style="height: 50px; border-radius: 50px; padding-left: 15px;" />
					</a-form-item>
					</a-col>
					<a-col :span="5">
						<div class="codeimg">
								<img src="" />
						</div>
					</a-col>
					
				</a-row>
				


				<a-button html-type="submit" style="color: white; background-color: #FE742B;" size="large" type="danger" shape="round">
					登录
				</a-button>
				
				<a-row style="font-size: 16px; font-weight: bold; margin-top: 20px;">
					<a-col :span="15"> 没有账号？<router-link to="/signup">注册</router-link></a-col>
					<a-col :span="5"> 忘记密码</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script>
	import PageHeader from './PageHeader.vue'
	export default {
		name: 'Login',
		components: {
			PageHeader
		},

		data() {
			return {
				confirmDirty: false,
				autoCompleteResult: [],
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'register'
			});
		},
		methods: {
			
			validateToNextPassword(rule, value, callback) {
				const form = this.form;
				if (value && this.confirmDirty) {
					form.validateFields(['confirm'], {
						force: true
					});
				}
				callback();
			},
			
			handleSubmit(e) {
			      e.preventDefault();
			      this.form.validateFields((err, values) => {
			        if (!err) {
						values.prefix=Number(values.prefix)
						
						let role = {
							"userId":"hhhm",
							"password":"111",
							"roleId":3,
							profliePic:"333",
							"isLock":0
						}
						
						if(role.roleId == 3){
							this.$router.push({path:"/waiterindex", query:role})
						} if(role.roleId == 2){
							this.$router.push()
						}
						
						// this.$axios.post("http://127.0.0.1:4523/mock/661566/login", values).then(res => {
						// 	console.log(res);
						// })
						// .catch(function (error) {
						//   console.log(error);
						// });
			        }
			      });
			    },
		},
	};
</script>

<style scoped>
	.login-wrap {
		background-color: white;
		height: 600px;
		width: 600px;
		padding: 30px 80px;
		margin: auto;
		margin-top: 120px;
	}

	.header-title {
		font-size: 36px;
		font-weight: bold;
		color: #fe742b;
		margin-bottom: 20px;
	}

	.username {
		margin-top: 10px;
		font-size: 20px;
		font-weight: bold;
	}
	
	.ant-select-selection{
		height: 50px !important; 
		border-radius: 10px !important;
	}
	.ant-select-selection-selected-value{
		line-height: 42px;
	}
	.ant-btn{
		width: 400px;
		margin: auto !important;
	}

	.codeimg{
		margin: 5px;
		height: 40px;
		width: 80px;
	}
	img{
		height: 100%;
		width: 100%;
	}
	
	
</style>
