<template>
	<div v-title data-title="登录">
		<page-header></page-header>
		<div class="touming">
			<div class="login-wrap">
				<div class="header-title">
					用户名登录
				</div>
				<a-form :form="form" @submit.prevent="handleSubmit">
					<a-row style="height: 90px;">
						<a-col :span="6">
							<div class="username">用户名：</div>
						</a-col>

						<a-col :span="16">
							<a-form-item has-feedback>
								<a-input v-decorator="[
								'userId',
								{
								rules: [
									{
									required: true,
									message: '用户名不能为空',
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

						<a-col :span="16" style="position: relative;">
							<a-form-item has-feedback>
								<a-input v-decorator="[
								'password',
								{
								rules: [
									{
									required: true,
									message: '用户密码不能为空',
									},
								],
								},
							]" placeholder="请输入密码" :type="pwdType" style="height: 50px; border-radius: 50px; padding-left: 15px;" />
								<img :src="openeye" class="eye" @click="changeType()"
									style="width: 20px;height: 20px;position: absolute; left: 300px; top:2px; z-index: 10;">
							</a-form-item>
						</a-col>
					</a-row>

					<a-row style="height: 90px;">
						<a-col :span="6">
							<div class="username">验证码：</div>
						</a-col>

						<a-col :span="8">
							<a-form-item has-feedback>
								<a-input v-model="writeCode"
									style="height: 50px; border-radius: 50px; padding-left: 15px;" />
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<div class="codeimg" @click="makeCode(identifyCodes, 4)">
								<s-identify :identifyCode="identifyCode"></s-identify>
							</div>
						</a-col>

					</a-row>

					<a-button html-type="submit" @
						style="color: white; background-color: #ff9963; border-color: #ff9963; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2); width: 93%;"
						size="large" type="danger" shape="round">
						登录
					</a-button>

					<a-row style="font-size: 16px; font-weight: bold; margin-top: 20px;">
						<a-col :span="15"> 没有账号？<router-link to="/signup">注册</router-link>
						</a-col>
					</a-row>
				</a-form>
			</div>

		</div>
	</div>
</template>

<script>
	import PageHeader from './components/PageHeader.vue'
	import SIdentify from './components/Identify'
	export default {
		name: 'Login',
		components: {
			PageHeader,
			SIdentify
		},

		data() {
			return {
				confirmDirty: false,
				autoCompleteResult: [],

				identifyCodes: "1234567890",
				identifyCode: "",
				writeCode: "",
				pwdType: 'password', // 密码类型
				openeye: require('@/assets/img/beye.png'), //图片地址
			};
		},

		mounted() {
			localStorage.setItem('Aindex', 1);
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},

		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'register'
			});
		},
		methods: {

			changeType() {
				this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
				this.openeye = this.openeye == require("@/assets/img/beye.png") ? require("@/assets/img/eye.png") :
					require(
						"@/assets/img/beye.png");
			},
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				this.identifyCode = "";
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
				console.log(this.identifyCode);
			},

			handleSubmit(e) {
				// console.log(this.form);
				let that = this;
				if (this.writeCode == this.identifyCode) {
					this.form.validateFields((err, values) => {
						if (!err) {
							this.axios({
									method: 'post',
									url: 'http://47.98.238.175:8080/user/login',
									data: this.$qs.stringify(values)
								}).then(res => {
									console.log(res)
									console.log(res)
									let values;
									console.log(values)
									console.log(res.data)
									console.log(res.data.roleId)
									switch (res.data.roleId) {
										// switch(values.roleId){
										case 0:
											console.log("进入case0")
											this.$message.warning('您申请的账号还未通过审核，请耐心等待');
											break
										case 1:
											values = res.data.user
											values.token = res.data.message
											localStorage.setItem('role', JSON.stringify(values));
											console.log("进入case1")
											this.$router.push({
												path: "/AdministratorIndex"
											})
											break
										case 2:
											values = res.data.user
											values.token = res.data.message
											localStorage.setItem('role', JSON.stringify(values));
											console.log("进入case2")
											this.$router.push({
												path: "/ChefIndex"
											})
											break
										case 3:
											values = res.data.user
											values.token = res.data.message
											localStorage.setItem('role', JSON.stringify(values));
											console.log("进入case3")
											this.$router.push({
												path: "/waiterindex"
											})
											break
										case 4:
											console.log("进入case4")
											this.form.setFields({
												userId: {
													// value: values.userId,
													errors: [new Error('您的账号不存在，请申请')],
												},
											});
											break
										case 5:
											console.log("进入case5")
											this.form.setFields({
												userId: {
													// value: values.userId,
													errors: [new Error('用户已被锁定！请找管理员解锁')],
												},
											});
											break
										case 6:
											console.log("进入case6")
											that.form.setFields({
												password: {
													// value: values.password,
													errors: [new Error('密码错误！请重新输入！')],
												},
											});
											break
									}

								})
								.catch(function(error) {
									console.log(error);
								});
						}
					});

				} else {
					console.log("this.$message", this.$message);
					this.$message.error('验证码错误!');
					this.makeCode(this.identifyCodes, 4);
				}
			},
		},
	};
</script>

<style scoped>
	.touming {
		height: 520px;
		width: 600px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		margin: auto;
		margin-top: 120px;
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.login-wrap {
		background-color: white;
		height: 500px;
		width: 96%;
		padding: 30px 80px;
		margin: auto;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		border-radius: 25px;
	}

	.header-title {
		font-size: 36px;
		font-weight: bold;
		color: #ff9963;
		margin-bottom: 20px;
	}

	.username {
		margin-top: 10px;
		font-size: 20px;
		font-weight: bold;
	}

	.ant-select-selection {
		height: 50px !important;
		border-radius: 10px !important;
	}

	.ant-select-selection-selected-value {
		line-height: 42px;
	}

	.ant-btn {
		width: 400px;
		margin: auto !important;
	}

	.codeimg {
		margin: 5px;
		height: 40px;
		width: 80px;
	}

	img {
		height: 100%;
		width: 100%;
	}
</style>
