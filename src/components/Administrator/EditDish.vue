<template>
	<div>
		<div class="body">
			<!-- this is the news page.the transform param is {{this.$route.params}} -->
			<div class="title">
				修改菜品
			</div>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品编号： {{dishId}}
					</div>
				</a-col>
				<a-col :span="2">
					<div class="input-item" style="margin-left: 0;">
						菜品名称：
					</div>
				</a-col>
				<a-col :span="6">
					<a-input placeholder='请输入菜品名称' v-model="dishName" />
				</a-col>
				<a-col :span="3">
					<div class="input-item">
						菜品价格：
					</div>
				</a-col>
				<a-col :span="2">
					<a-input-number min="0" placeholder='请输入菜品价格' v-model="price" />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品简介：
					</div>
				</a-col>
				<a-col :span="14">
					<a-input placeholder='请输入菜品简介' v-model="intro" />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品详情：
					</div>
				</a-col>
				<a-col :span="14">
					<a-textarea maxlength="300" placeholder="最多输入300个字" :rows="4" v-model="detail" />
				</a-col>
			</a-row>
			<a-row :gutter="[0,50]">
				<a-col :span="4">
					<div class="input-item">
						菜品图片：
					</div>
				</a-col>
				<a-col :span="4">
					<Uploud v-on:profilePic="profilePic" :dishPic="dishPic"></Uploud>
				</a-col>
				<a-col :span="4">
					<div class="input-item">
						是否推荐：
					</div>
					<div style="font-size: 18px; font-weight: bold; margin: 35px 0 0 60px;">
						菜品类型：
					</div>
				</a-col>
				<a-col :span="4">
					<!-- <a-select :default-value="String(isrec)" style="width: 120px" @change="handleChange"> -->
					<a-select :default-value=isrec style="width: 120px" @change="handleChangeRec">
						<a-select-option value="0">
							否
						</a-select-option>
						<a-select-option value="1">
							是
						</a-select-option>
					</a-select>

					<a-select :default-value="type" style="width: 120px; margin-top: 25px;" @change="handleChangeType">
						<a-select-option value="荤菜">
							荤菜
						</a-select-option>
						<a-select-option value="素菜">
							素菜
						</a-select-option>
						<a-select-option value="主食">
							主食
						</a-select-option>
						<a-select-option value="小吃">
							小吃
						</a-select-option>
						<a-select-option value="饮料">
							饮料
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-form-item>
				<div class="button-wrap">
					<a-button type="primary" @click="dishEdit" size="large">提交</a-button>
					<a-button size="large" @click="comeBack">返回</a-button>
				</div>
			</a-form-item>
			<div style="text-align: center;">
			</div>
		</div>

	</div>

</template>

<script>
	import Uploud from '../components/Uploud.vue'
	export default {
		name: 'EditDish',
		components: {
			Uploud
		},

		data() {
			return {
				dishId: 0,
				dishName: "",
				price: 0,
				type: "",
				detail: "",
				intro: "",
				isrec: "",
				dishPic: "",
			}
		},
		created() {
			this.getDataFromRoute();
		},
		methods: {
			getDataFromRoute() {
				let that = this;
				let initData = this.$route.params;
				console.log(initData)
				that.isrec = String(initData.isrec);
				that.dishId = initData.dishId;
				that.dishName = initData.dishName;
				that.price = initData.price;
				that.detail = initData.detail;
				that.intro = initData.intro;
				that.type = initData.type;
				that.dishPic = initData.dishPic;
				console.log(typeof(that.isrec));
			},
			profilePic(value) {
				this.dishPic = value
			},
			back() {
				this.$router.push({
					path: "/dishmanage"
				});
			},
			dishEdit() {
				let that = this;	
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				let values = {
					dishId: that.dishId,
					dishName: that.dishName,
					price: that.price,
					detail: that.detail,
					intro: that.intro,
					type: that.type,
					dishPic: this.dishPic,
					isrec: Number(this.isrec)
				}
				this.axios({
					method: 'post',
					url: "http://47.98.238.175:8080/dishes/edit",
					data: this.$qs.stringify(values),
					headers: {
						'Token': token
					},
				}).then(function(response) {
					that.$message.success('修改成功！');
					that.$router.go(-1);
				}).catch(function(error) {
					that.$message.error(error);
				});
			},

			comeBack() {
				this.$router.go(-1)
			},

			handleChangeRec(value) {
				this.isres = value
			},

			handleChangeType(value) {
				this.type = value
			}

		}
	}
</script>

<style scoped>
	.body {
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 10px;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.7);
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
		margin: 0 0 0 60px;
	}

	.input-hint {
		margin: 10px 0 0 5px;
		margin-left: 5px;
		background-color: #F9F8F2;
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
