<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>
		
		<div class="catalog">
			<span class="cata-info">
				<router-link to="/administratorindex" style="color: white;">管理员首页</router-link>
			</span>
			>
			<span class="cata-info">
				<router-link to="/usermanage" style="color: white;">用户管理</router-link>
			</span>
			>
			<span class="cata-info">
				<router-link to="/aedituserinfo" style="color: white;">编辑用户信息</router-link>
			</span>
			<a-button class="btn-back">返回</a-button>
		</div>
		
		<div class="body">
			<div style="display: flex;">
				<div class="title highlight">管理员修改个人信息</div>
			</div>
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
							<div class="input-item">身份选择：</div>
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
					
					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">是否被锁定：</div>
						</a-col>
						
						<a-col :span="10">
							<a-form-item  has-feedback>
							<a-select  v-decorator="['islock']">
								<a-select-option value="1">
									是
								</a-select-option>
								<a-select-option value="2">
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
							<a-form-item >
							      <a-upload
							        v-decorator="[
							          'upload',
							          {
							            valuePropName: 'fileList',
							            getValueFromEvent: normFile,
							          },
							        ]"
							        name="logo"
							        action="/upload.do"
							        list-type="picture"
							      >
							        <a-button> <a-icon type="upload" /> 上传头像 </a-button>
							      </a-upload>
							    </a-form-item>


						</a-col>
					</a-row>

					<a-row :gutter="8">
						<a-col :span="4">
							<div class="input-item">
								验证码：
							</div>
						</a-col>
						<a-col :span="10">
							<a-form-item  has-feedback>

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
						]" type="password" @blur="handleConfirmBlur" placeholder='验证码' />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<div style="padding-top:4px;">
								<a-button>获取验证码</a-button>
							</div>
						</a-col>
					</a-row>
					<a-form-item v-bind="tailFormItemLayout">
						<a-button html-type="submit" style="color: white; background-color: #FE742B;" type="danger" shape="round"
							@click="showModal" size="large">确认修改</a-button>
					
					</a-form-item>
				</a-form>
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
		mounted: function() {
			let peaple = JSON.parse(localStorage.getItem('role'))
			if (peaple.roleId == 1) {
				this.$data.role = "服务员"
			}
			else if(peaple.roleId == 2) {
				this.$data.role = "后厨人员"
			}
			else{
				this.$data.role = "管理人员"
			}
			this.$data.userId = peaple.userId
		},
		data() {
			return {
				role: "",
				userId: "",
				// 以下代码为点击注册按钮后弹出框相关数据
				ModalText: '已成功提交注册申请，等待管理员指定身份…………',
				visible: false,

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
	
	.catalog {
		margin-top: 100px;
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
		padding: 20px;
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
