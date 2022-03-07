<template>
	<div v-title data-title="注册">
		<page-header></page-header>
		<div class="touming">
			<div class="body">
				<div class="top">
					<div class="title highlight">欢迎注册</div>
					<div class="hint">已有账号？ 马上
						<span class="highlight">
							<router-link to="/login">登录</router-link>
						</span>
					</div>
				</div>
				<div class="form">
					<a-form :form="form" @submit="handleSubmit">
						<a-row :gutter="8">
							<a-col :span="5">
								<div class="input-item">
									用户名：
								</div>
							</a-col>
							<a-col :span="9">
								<a-form-item>
									<a-input v-decorator="[
									'userId',
									{
										rules: [
											{
												required: true,
												message: '请输入用户名！',
											},
										],
									},
								]" placeholder='请输入用户名' class="input-kuang" />
								</a-form-item>
							</a-col>
							<a-col :span="9">
								<div class="input-hint">
									支持字母、数字、“-” “_”的组合，0-30个字符，支持中文
								</div>
							</a-col>
						</a-row>

						<a-row :gutter="8">
							<a-col :span="5">
								<div class="input-item">
									设置密码：
								</div>
							</a-col>
							<a-col :span="9">
								<a-form-item has-feedback>
									<a-input v-decorator="[
									'password',
									{
										rules: [
										{
											required: true,
											message: '请输入密码!',
										},
										{
											validator: validateToNextPassword,
										},
									],
									},
									]" type="password" placeholder='请输入密码' class="input-kuang" />

								</a-form-item>
							</a-col>
							<a-col :span="10">
								<div class="input-hint">
									建议使用字母、数字和符号两种及以上的组合，0-18个字符
								</div>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="5">
								<div class="input-item">
									确认密码：
								</div>
							</a-col>
							<a-col :span="9">
								<a-form-item has-feedback>

									<a-input v-decorator="[
										'confirm',
										{
											rules: [
											{
												required: true,
												message: '请再次输入密码!',
											},
											{
												validator: compareToFirstPassword,
											},
											],
										},
											]" type="password" @blur="handleConfirmBlur" placeholder='请再次输入密码' class="input-kuang" />
								</a-form-item>
							</a-col>
							<a-col :span="10">
								<div class="input-hint">
									建议使用字母、数字和符号两种及以上的组合，0-18个字符
								</div>
							</a-col>
						</a-row>

						<a-row :gutter="8">
							<a-col :span="5">
								<div class="input-item">
									用户头像：
								</div>
							</a-col>
							<a-col :span="8">

								<Uploud v-on:profilePic="profilePic"></Uploud>

							</a-col>
						</a-row>

						<a-row :gutter="8">
							<a-col :span="5">
								<div class="input-item">
									验证码：
								</div>
							</a-col>
							<a-col :span="5">
								<a-form-item v-bind="formItemLayout" has-feedback>
									<a-input v-model="writeCode"
										style="height: 50px; border-radius: 50px; padding-left: 15px; width: 200px;" />
								</a-form-item>
							</a-col>
							<a-col :span="9">
								<div class="codeimg" @click="makeCode(identifyCodes, 4)">
									<s-identify :identifyCode="identifyCode"></s-identify>
								</div>
							</a-col>
						</a-row>

						<a-form-item style="margin:10px 410px;">
							<a-button html-type="submit" style="color: white; background-color: #FE742B;" type="danger"
								shape="round" @click="showModal" size="large">创建账户</a-button>

						</a-form-item>
					</a-form>
				</div>
			</div>

		</div>

		<a-modal title="提示" :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="确定" cancelText="取消">
			<p>{{ ModalText }}</p>
		</a-modal>

	</div>

</template>

<script>
	import PageHeader from './PageHeader.vue'
	import SIdentify from './Identify'
	import Uploud from './Uploud.vue'

	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	export default {
		name: 'SignUp',
		components: {
			PageHeader,
			SIdentify,
			Uploud
		},
		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		data() {
			return {
				identifyCodes: "1234567890",
				identifyCode: "",
				writeCode: "",
				//图片
				dishPic: '',
				// 以下代码为点击注册按钮后弹出框相关数据
				ModalText: '已成功提交注册申请，等待管理员指定身份…………',
				visible: false,

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
			profilePic(value) {
				this.dishPic = value
			},
			// 以下三个方法与弹出框相关
			normFile(e) {
				console.log('Upload event:', e);
				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
			showModal() {
				this.visible = true;
			},
			handleOk(e) {
				this.visible = false;
				this.$router.push({
					path: "/login"
				})
			},
			handleCancel(e) {
				console.log('Clicked cancel button');
				this.visible = false;
			},

			handleSubmit(e) {
				if (this.writeCode == this.identifyCode) {
					this.form.validateFieldsAndScroll((err, values) => {
						if (!err) {
							console.log('Received values of form: ', values);
							let data = {
								userId: values.userId,
								password: values.password,
								roleId: "",
								profilePic: "http://diancan.drbxsj.top/" + this.dishPic,
								isLock: ""
							}
							console.log('Received values of form: ', data);
							this.axios.post("http://47.98.238.175:8080/user/add", this.$qs.stringify(data)).then(
									res => {
										console.log(res)
									})
								.catch(function(error) {
									console.log(error);
								});

						}
					});
				} else {
					this.$message.error('验证码错误!');
					this.makeCode(this.identifyCodes, 4);
				}
			},

			handleConfirmBlur(e) {
				const value = e.target.value;
				this.confirmDirty = this.confirmDirty || !!value;
			},
			compareToFirstPassword(rule, value, callback) {
				const form = this.form;
				if (value && value !== form.getFieldValue('password')) {
					callback('输入的两个密码不一致!');
				} else {
					callback();
				}
			},
			validateToNextPassword(rule, value, callback) {
				const form = this.form;
				if (value && this.confirmDirty) {
					form.validateFields(['confirm'], {
						force: true
					});
				}
				callback();
			},
			handleWebsiteChange(value) {
				let autoCompleteResult;
				if (!value) {
					autoCompleteResult = [];
				} else {
					autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
				}
				this.autoCompleteResult = autoCompleteResult;
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
		},
	};
</script>

<style scoped>
	.touming {
		height: 600px;
		width: 1000px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		border-radius: 25px;
		margin: auto;
		margin-top: 100px;
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.body {
		margin: auto;
		background-color: white;
		height: 580px;
		width: 98%;
		padding-right: 20px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		border-radius: 25px;
	}

	.highlight {
		color: #FE742B;
	}

	.input-kuang {
		height: 50px;
		border-radius: 50px;
		width: 350px;
		padding-left: 15px;
	}

	.form {
		padding-top: 20px;
	}

	.codeimg {
		margin: 5px;
		height: 40px;
		width: 80px;
	}

	.body .title {
		font-size: 36px;
		font-weight: bold;
		padding-left: 10px;
		margin: 0;
	}

	.body .hint {
		font-size: 16px;
		padding-left: 20px;
		font-weight: bold;
	}

	.input-item {
		font-size: 20px;
		font-weight: bold;
		margin: 10px 0 0 70px;
	}

	.input-hint {
		margin-left: 10px;
		line-height: 50px;
		background-color: #F9F8F2;
	}

	.ant-col-sm-16 {
		width: 100% !important;
	}

	.top {
		display: flex;
		align-items: center;
		padding: 30px 0 0 100px;
	}
</style>
