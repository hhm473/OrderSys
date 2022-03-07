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
							<a-textarea maxlength="300" v-decorator="['detail']" placeholder="最多输入300个字" :rows="4" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="[0,0]">
					<a-col :span="4">
						<div class="input-item">
							菜品图片：
						</div>
					</a-col>
					<a-col :span="4">
						<Uploud v-on:profilePic="profilePic"></Uploud>
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
						<a-form-item>
							<a-select default-value="0" style="width: 120px" @change="handleChangeRec">
								<a-select-option value="0">
									否
								</a-select-option>
								<a-select-option value="1">
									是
								</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item>
							<a-select default-value="荤菜" style="width: 120px" @change="handleChangeType">
								<a-select-option value="荤菜">
									荤菜
								</a-select-option>
								<a-select-option value="蔬菜">
									蔬菜
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
						</a-form-item>
					</a-col>
				</a-row>
				<a-form-item>
					<div class="button-wrap">
						<a-button type="primary" html-type="submit" size="large">提交</a-button>
						<a-button type="primary" size="large" @click="comeBack">返回</a-button>
					</div>
				</a-form-item>
			</a-form>
		</div>

	</div>

</template>

<script>
	import axios from 'axios'
	import Uploud from '../Uploud.vue'
	export default {
		name: 'AddDish',
		components: {
			Uploud
		},
		data() {
			return {
				isres: 0,
				type: "",
				dishPic: ""
			}
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

			back() {
				this.$router.push({
					path: "/dishmanage"
				});
			},
			handleAddDish() {
				let that = this;
				this.form.validateFields((err, values) => {
					if (!err) {
						values.price = Number(values.price)
						values.dishPic = this.dishPic
						values.isrec = Number(this.isres)
						values.type = this.type
						// values.type = "荤菜"
						console.log(values)
						axios.get("http://47.98.238.175:8080/dishes/add", {
							params: values
						}).then(function(response) {
							that.$message.success('添加成功！');
							that.$router.go(-1);
						}).catch(function(error) {
							that.$message.error(error);
						});
					}
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

		},
	}
</script>

<style scoped>
	.body {
		padding-top: 10px;
		width: 100%;
		border-radius: 25px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.5);
		padding: 10px;
	}

	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin: 20px auto;
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

	.button-wrap {
		margin: auto;
		width: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
