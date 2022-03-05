<template>
	<div>

		<div class="body">

			<div class="title">管理员修改个人信息</div>
			<div class="form">
				<a-form :form="form" @submit="handleSubmit">

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								用户密码
							</div>
						</a-col>
						<a-col :span="10">
							<a-form-item has-feedback>
								<a-input v-decorator="[
									'password',
									{
										rules: [
										{
											required: true,
											message: '请输入密码!',
										},
									],
									},
									]" placeholder='请输入密码' />

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
							<div class="input-item">身份选择：</div>
						</a-col>

						<a-col :span="10">
							<a-form-item has-feedback>
								<a-select v-decorator="['roleIdEdit']">
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

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">是否被锁定：</div>
						</a-col>

						<a-col :span="10">
							<a-form-item has-feedback>
								<a-select v-decorator="['isLock']">
									<a-select-option value="1">
										是
									</a-select-option>
									<a-select-option value="0">
										否
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								用户头像：
							</div>
						</a-col>
						<a-col :span="10">
							<Uploud v-on:profilePic="profilePicture" :dishPic="profilePic"></Uploud>
						</a-col>
					</a-row>

					<!-- <a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								验证码：
							</div>
						</a-col>
						<a-col :span="10">
							<a-form-item has-feedback>

								<a-input v-decorator="[
			          'confirms',
			          {
			            rules: [
			              {
			                required: true,
			                message: '请输入验证码!',
			              },
			            ],
			          },
						]" @blur="handleConfirmBlur" placeholder='验证码' />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div style="padding-top:4px;">
								<a-button>获取验证码</a-button>
							</div>
						</a-col>
					</a-row> -->
					<a-form-item v-bind="tailFormItemLayout">
						<a-button html-type="submit" style="color: white; background-color: #FE742B;" type="danger"
							shape="round" size="large">确认修改</a-button>
					</a-form-item>
				</a-form>
			</div>
		</div>



	</div>

</template>

<script>
	import axios from 'axios'
	import Uploud from '../Uploud.vue'
	export default {
		name: 'AEditUserInfo',
		components: {
			Uploud
		},
		created() {
			let that = this;
			let initData = that.$route.params;
			that.profilePic = initData.profilePic;
		},
		mounted: function() {

			let that = this;

			let initData = that.$route.params;
			that.dishId = initData.dishId;

			console.log(initData)
			console.log(initData.password)
			const form = this.form;

			form.setFieldsValue({
				['password']: initData.password
			});

			// let roleId = initData.roleId == 1 ? '管理员' : initData.roleId == '2' ? '后厨人员' : '服务人员';
			// let isLock = initData.isLock == 1 ? '是' : '否';
			form.setFieldsValue({
				['roleIdEdit']: String(initData.roleId)
			});

			form.setFieldsValue({
				['isLock']: String(initData.isLock)
			});
			that.userIdEdit = initData.userId;
		},
		data() {
			return {
				roleEdit: "",
				userIdEdit: "",
				profilePic: "",
				confirmDirty: false,
				autoCompleteResult: [],
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
			//接收子组件中的imgUrl
			profilePicture(value) {
				this.profilePic = value
			},
			back() {
				this.$router.go(-1);
			},
			handleSubmit() {
				let that = this;
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log(values)
						let user = {
							userId: that.userIdEdit,
							password: values.password,
							profilePic: that.profilePic,
							roleId: Number(values.roleIdEdit),
							isLock: Number(values.isLock)
						}

						this.axios({
								method: 'post',
								url: 'http://47.98.238.175:8080/user/modify',
								data: this.$qs.stringify(user)
							})

							.then(function(response) {
								that.$message.success('修改成功！');
								that.$router.go(-1);
							}).catch(function(error) {
								that.$message.error(error);
							});
					}
				});
			},
			normFile(e) {
				console.log('Upload event:', e);
				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
			handleConfirmBlur(e) {
				const value = e.target.value;
				this.confirmDirty = this.confirmDirty || !!value;
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
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.body .title {
		width: 400px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
		background-color: rgba(255, 255, 255, 0.7);
	}

	.form {
		padding: 20px;
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
