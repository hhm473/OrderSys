<template>
	<div>
		<page-header is-login="true" user-name="哈哈哈" user-type="餐厅管理员"></page-header>
		<div class="body">
			<div style="display: flex;">

				<div class="title highlight">修改个人信息</div>

			</div>
			<div class="form">
				<a-form :form="form" @submit="handleSubmit">
					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								旧密码：
							</div>
						</a-col>
						<a-col :span="10">
							<a-form-item v-bind="formItemLayout">
								<a-input v-decorator="[
									'username',
									{
										rules: [
											{
												required: true,
												message: '请输入旧密码！',
											},
										],
									},
								]" placeholder='请输入旧密码' />
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
							<div class="input-item">
								新密码：
							</div>
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
									]" type="password" placeholder='请输入密码' />

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
							<div class="input-item">
								确认密码：
							</div>
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
						]" type="password" @blur="handleConfirmBlur" placeholder='请再次输入密码' />
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
							<div class="input-item">
								用户头像：
							</div>
						</a-col>
						<a-col :span="5">
							<div>
								<img style="" src="https://img.yzcdn.cn/vant/cat.jpeg">
							</div>

						</a-col>
						<a-col :span="9">
							<a-button>上传</a-button>
						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								验证码：
							</div>
						</a-col>
						<a-col :span="10">
							<a-form-item v-bind="formItemLayout" has-feedback>

								<a-input v-decorator="[
			          'confirm',
			          {
			            rules: [
			              {
			                required: true,
			                message: '请输入验证码!',
			              },
			              {
			                validator: compareToFirstPassword,
			              },
			            ],
			          },
						]" type="password" @blur="handleConfirmBlur" placeholder='请再次输入密码' />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div style="padding-top:4px;">
								<a-button>获取验证码</a-button>
							</div>
						</a-col>
					</a-row>

					<a-form-item v-bind="tailFormItemLayout">
						<a-row :gutter="20">
							<a-col :span="9">
								<a-button style="color: white; background-color: #FE742B;" type="danger" shape="round"
									@click="showModal" size="large">确认修改</a-button>
							</a-col>
							<a-col>
								<a-button style="color: #FE742B; background-color: white;" type="danger"
									@click="showModal" size="large">返回</a-button>
							</a-col>
						</a-row>
					</a-form-item>

				<div style="height: 20px;">
					
				</div>
				</a-form>
			</div>
		</div>

		<a-modal title="提示" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
			okText="确定" cancelText="取消">
			<p>{{ ModalText }}</p>
		</a-modal>

	</div>

</template>

<script>
	import PageHeader from './PageHeader.vue'

	export default {
		name: 'SignUp',
		components: {
			PageHeader
		},
		data() {
			return {
				// 以下代码为点击注册按钮后弹出框相关数据
				ModalText: '已成功提交注册申请，等待管理员指定身份…………',
				visible: false,

				confirmDirty: false,
				autoCompleteResult: [],
				formItemLayout: {
					labelCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 8
						},
					},
					wrapperCol: {
						xs: {
							span: 24
						},
						sm: {
							span: 16
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
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'register'
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
				console.log('Clicked cancel button');
				this.visible = false;
			},

			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFieldsAndScroll((err, values) => {
					if (!err) {
						console.log('Received values of form: ', values);
					}
				});
			},
			handleConfirmBlur(e) {
				const value = e.target.value;
				this.confirmDirty = this.confirmDirty || !!value;
			},
			compareToFirstPassword(rule, value, callback) {
				const form = this.form;
				if (value && value !== form.getFieldValue('password')) {
					callback('Two passwords that you enter is inconsistent!');
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
		},
	};
</script>

<style scoped>
	.body {
		margin-top: 100px;
		margin-left: 15%;
		margin-right: 15%;
		width: 70%;
		background-color: white;
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
