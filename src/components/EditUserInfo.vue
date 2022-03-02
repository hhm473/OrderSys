<template>
	<div>
		<page-header></page-header>
		<div class="body">
			<div style="display: flex">
				<div class="title highlight">修改个人信息</div>
			</div>
			<div class="form">
				<a-form :form="form" @submit="handleSubmit">
					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">旧密码：</div>
						</a-col>
						<a-col :span="10">
							<a-form-item v-bind="formItemLayout">
								<a-input v-decorator="[
                    'old_password',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入旧密码！',
                        },
                      ],
                    },
                  ]" placeholder="请输入旧密码" style="height: 40px; border-radius: 5px;" />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div class="input-hint">
								<!-- 支持字母、数字、“-” “_”的组合，0-30个字符，支持中文 -->
							</div>
						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">新密码：</div>
						</a-col>
						<a-col :span="10">
							<a-form-item v-bind="formItemLayout" has-feedback>
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
                  ]" type="password" placeholder="请输入密码" style="height: 40px; border-radius: 5px;" />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div class="input-hint">
								建议使用字母、数字和符号两种及以上的组合，0-18个字符
							</div>
						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">确认密码：</div>
						</a-col>
						<a-col :span="10">
							<a-form-item v-bind="formItemLayout" has-feedback>
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
                  ]" type="password" @blur="handleConfirmBlur" placeholder="请再次输入密码"
									style="height: 40px; border-radius: 5px;" />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div class="input-hint">
								建议使用字母、数字和符号两种及以上的组合，0-18个字符
							</div>
						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">用户头像：</div>
						</a-col>
						<a-col :span="10">

							<a-upload name="avatar" list-type="picture-card" class="avatar-uploader"
								:show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								:before-upload="beforeUpload" @change="handleChange">
								<img style="height: 85px; width: 85px;" v-if="imageUrl" :src="imageUrl" alt="avatar" />
								<div v-else>
									<a-icon :type="loading ? 'loading' : 'plus'" />
									<div class="ant-upload-text">
										上传图片
									</div>
								</div>
							</a-upload>

						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">验证码：</div>
						</a-col>
						<a-col :span="4">
							<a-form-item has-feedback>
								<a-input v-model="writeCode"
									style="height: 40px; border-radius: 5px; padding-left: 15px;" />
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<div class="codeimg" @click="refreshCode">
								<s-identify :identifyCode="identifyCode"></s-identify>
							</div>
						</a-col>
					</a-row>

					<a-form-item>
						<div class="button-wrap">
							<a-button html-type="submit" style="color: white; background-color: #fe742b" type="danger"
								shape="round" size="large">确认修改</a-button>
							<a-button style="color: #fe742b; background-color: white" type="danger" @click="goBack"
								size="large">返回</a-button>
						</div>
					</a-form-item>
				</a-form>
			</div>
		</div>
		
	</div>
</template>

<script>
	import PageHeader from "./PageHeader.vue";
	import SIdentify from './Identify'

	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	export default {
		name: "SignUp",
		components: {
			PageHeader,
			SIdentify
		},
		data() {
			return {
				loading:false,
				imageUrl:"",
				role: "",
				userId: "",
				// 以下代码为点击注册按钮后弹出框相关数据
				ModalText: "已成功提交注册申请，等待管理员指定身份…………",
				visible: false,

				confirmDirty: false,
				autoCompleteResult: [],
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24,
						},
						sm: {
							span: 8,
						},
					},
					wrapperCol: {
						xs: {
							span: 24,
						},
						sm: {
							span: 16,
						},
					},
				},
				tailFormItemLayout: {
					wrapperCol: {
						xs: {
							span: 24,
							offset: 0,
						},
						sm: {
							span: 16,
							offset: 8,
						},
					},
				},

				identifyCodes: "1234567890",
				identifyCode: "",
				writeCode: "",
				
				profilePic:""
			};
		},

		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},

		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: "register",
			});
		},
		methods: {
			// 以下三个方法与弹出框相关
			showModal() {
				this.visible = true;
			},
			handleOk(e) {
				this.visible = false;
			},
			handleCancel(e) {
				console.log("Clicked cancel button");
				this.visible = false;
			},
			//验证码
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
				console.log(this.identifyCode);
			},

			//返回首页
			goBack() {
				let roleId = JSON.parse(localStorage.getItem("role")).roleId;
				if (roleId === 3) {
					this.$router.push({
						path: "/waiterindex",
					});
				} else if (roleId === 2) {
					this.$router.push({
						path: "/ChefIndex",
					});
				} else {
					this.$router.push({
						path: "/AdministratorIndex",
					});
				}
			},

			//确认修改
			handleSubmit(e) {
				// e.preventDefault();
				// this.form.validateFieldsAndScroll((err, values) => {
				// 	if (!err) {
				// 		console.log('Received values of form: ', values);
				// 	}
				// });
				if (this.writeCode == this.identifyCode) {
					let user = JSON.parse(localStorage.getItem("role"));
					this.form.validateFields((err, values) => {
						if (!err) {
							if (user.password != values.old_password) {
								this.$message.error('旧密码输入错误!');
							} else {
								user.password = values.password;
								user.profilePic = "http://diancan.drbxsj.top/"+this.profilePic
								this.axios({
										method: "post",
										url: "http://47.98.238.175:8080/user/modify",
										data: this.$qs.stringify(user),
									})
									.then((res) => {
										console.log(res);
										this.$message.success('修改成功!');
										localStorage.setItem("role", JSON.stringify(res.data));
										this.goBack()
									})
									.catch((err) => {
										console.log(err);
									});
							}
						}
					});
				} else {
					this.$message.error('验证码错误!');
					this.makeCode(this.identifyCodes, 4);
				}
			},

			handleChange(info) {
				let that = this
				if (info.file.status === 'uploading') {
					this.loading = true;
					return;
				}
				if (info.file.status === 'done') {
					// Get this url from response in real world.
					getBase64(info.file.originFileObj, imageUrl => {
						this.imageUrl = imageUrl;
						this.loading = false;
					});
					const formData = new FormData()

					formData.append('photo', info.file.originFileObj)
					this.axios.post("http://47.98.238.175:8080/user/uploadFile", formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(res => {
							console.log(res)
							that.profilePic = res.data
						}).catch(err => {
							console.log(err)
						})
				}
			},
			beforeUpload(file) {
				const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
				if (!isJpgOrPng) {
					this.$message.error('You can only upload JPG file!');
				}
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('Image must smaller than 2MB!');
				}
				return isJpgOrPng && isLt2M;
			},



			handleConfirmBlur(e) {
				const value = e.target.value;
				this.confirmDirty = this.confirmDirty || !!value;
			},
			compareToFirstPassword(rule, value, callback) {
				const form = this.form;
				if (value && value !== form.getFieldValue("password")) {
					callback("Two passwords that you enter is inconsistent!");
				} else {
					callback();
				}
			},
			validateToNextPassword(rule, value, callback) {
				const form = this.form;
				if (value && this.confirmDirty) {
					form.validateFields(["confirm"], {
						force: true,
					});
				}
				callback();
			},
			handleWebsiteChange(value) {
				let autoCompleteResult;
				if (!value) {
					autoCompleteResult = [];
				} else {
					autoCompleteResult = [".com", ".org", ".net"].map(
						(domain) => `${value}${domain}`
					);
				}
				this.autoCompleteResult = autoCompleteResult;
			},
		},
	};
</script>

<style scoped>
	.body {
		padding: 10px;
		margin-top: 100px;
		margin-left: 15%;
		margin-right: 15%;
		width: 70%;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.form {
		padding-top: 20px;
	}

	.body .title {
		font-size: 30px;
		font-weight: bold;
	}

	.input-item {
		font-size: 20px;
		font-weight: bold;
		margin: 10px 0 0 80px;
	}

	.input-hint {
		margin: 10px 0 0 5px;
		margin-left: 5px;
		background-color: #f9f8f2;
	}

	.ant-col-sm-16 {
		width: 100% !important;
	}

	.button-wrap {
		margin: auto;
		width: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
