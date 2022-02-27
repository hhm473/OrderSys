<template>
  <div>
    <page-header
      is-login="true"
      :user-name="userId"
      :user-type="role"
    ></page-header>
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
                <a-input
                  v-decorator="[
                    'old_password',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入旧密码！',
                        },
                      ],
                    },
                  ]"
                  placeholder="请输入旧密码"
                />
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
                <a-input
                  v-decorator="[
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
                  ]"
                  type="password"
                  placeholder="请输入密码"
                />
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
                <a-input
                  v-decorator="[
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
                  ]"
                  type="password"
                  @blur="handleConfirmBlur"
                  placeholder="请再次输入密码"
                />
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
            <a-col :span="5">
              <div>
                <img style="" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
            </a-col>
            <a-col :span="9">
              <a-button>上传</a-button>
            </a-col>
          </a-row>

          <a-row :gutter="8">
            <a-col :span="4">
              <div class="input-item">验证码：</div>
            </a-col>
            <a-col :span="10">
              <a-form-item v-bind="formItemLayout" has-feedback>
                <a-input
                  v-decorator="[
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
                  ]"
                  type="password"
                  @blur="handleConfirmBlur"
                  placeholder="请再次输入密码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <div style="padding-top: 4px">
                <a-button>获取验证码</a-button>
              </div>
            </a-col>
          </a-row>

          <a-button
            html-type="submit"
            style="color: white; background-color: #fe742b"
            type="danger"
            shape="round"
            size="large"
            >确认修改</a-button
          >

          <a-button
            style="color: #fe742b; background-color: white"
            type="danger"
            @click="goBack"
            size="large"
            >返回</a-button
          >

          <!-- <a-form-item v-bind="tailFormItemLayout"> -->
          <!-- <a-row :gutter="20">
							<a-col :span="9">
								<a-button html-type="submit" style="color: white; background-color: #FE742B;" type="danger" shape="round"
									 size="large">确认修改</a-button>
							</a-col>
							<a-col>
								<a-button style="color: #FE742B; background-color: white;" type="danger"
									@click="showModal" size="large">返回</a-button>
							</a-col>
						</a-row> -->
          <!-- </a-form-item> -->

          <div style="height: 20px"></div>
        </a-form>
      </div>
    </div>

    <a-modal
      title="提示"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确定"
      cancelText="取消"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";

export default {
  name: "SignUp",
  components: {
    PageHeader,
  },
  data() {
    return {
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
    };
  },

  mounted() {
    let peaple = JSON.parse(localStorage.getItem("role"));
    if (peaple.roleId == 3) {
      this.$data.role = "服务员";
    } else if (peaple.roleId == 2) {
      this.$data.role = "后厨人员";
    } else {
      this.$data.role = "管理人员";
    }
    this.$data.userId = peaple.userId;
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
      let user = JSON.parse(localStorage.getItem("role"));
      this.form.validateFields((err, values) => {
        if (!err) {
          if (user.password != values.old_password) {
            alert("旧密码输入错误！");
          } else {
            user.password = values.password;
            this.axios({
              method: "post",
              url: "http://47.98.238.175:8080/user/modify",
              data: this.$qs.stringify(user),
            })
              .then((res) => {
                console.log(res);
                alert("修改成功！");
                localStorage.setItem("role", JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
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
  margin-top: 100px;
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  background-color: white;
}

.highlight {
  color: #fe742b;
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
  background-color: #f9f8f2;
}

.ant-col-sm-16 {
  width: 100% !important;
}
</style>
