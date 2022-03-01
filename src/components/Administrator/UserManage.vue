<template>
	<div>
		<div class="body">
			<div class="title">用户管理</div>
			<div class="secondary-head">
				<div class="time">
					身份：
					<a-select default-value="-1" style="width: 120px" @change="handleIdentity">
						<a-select-option value="1">
							管理员
						</a-select-option>
						<a-select-option value="2">
							后厨人员
						</a-select-option>
						<a-select-option value="3">
							服务人员
						</a-select-option>
						<a-select-option value="-1">
							全部
						</a-select-option>
					</a-select>
				</div>
				<div class="table-number">
					是否被锁定：
					<a-select default-value="-1" style="width: 120px" @change="handleLock">
						<a-select-option value="1">
							是
						</a-select-option>
						<a-select-option value="0">
							否
						</a-select-option>
						<a-select-option value="-1">
							全部
						</a-select-option>
					</a-select>
				</div>
				<div class="total-price">
					<a-button type="primary" @click="UserSelect">查询</a-button>
				</div>
			</div>
			<div style="padding: 20px;">
				<div>
					<a-table :columns="columns" :data-source="userData" bordered :scroll="{y: 450 }">

						<template slot="num" slot-scope="text, record,index">
							{{index+1}}
						</template>

						<template slot="isLock" slot-scope="text, record">
							{{record.isLock==1?'是':'否'}}
						</template>

						<template slot="roleId" slot-scope="text, record">
							{{record.roleId=='1'?'管理员':record.roleId=='2'?'后厨人员':'服务人员'}}
						</template>

						<template slot="profilePic" slot-scope="text, record">
							<img src="../../assets/logo.png" style="height: 20px" />
							{{record.profilePic}}
						</template>

						<a-button slot="operation" slot-scope="text, record" @click="() => toEditUser(record)">
							修改
						</a-button>

					</a-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Dish from '../Dish.vue'
	import OrderQingdan from '../OrderQingdan.vue'
	import axios from 'axios'
	const columns = [{
			title: '编号',
			dataIndex: 'num',
			key: 'num',
			scopedSlots: {
				customRender: 'num'
			},
		},
		{
			title: '用户名',
			dataIndex: 'userId',
			key: 'userId',
		},
		{
			title: '头像',
			key: 'profilePic',
			dataIndex: 'profilePic',
			scopedSlots: {
				customRender: 'profilePic'
			},
		},
		{
			title: '身份',
			key: 'roleId',
			dataIndex: 'roleId',
			scopedSlots: {
				customRender: 'roleId'
			},
		},
		{
			title: '是否被锁定',
			key: 'isLock',
			dataIndex: 'isLock',
			scopedSlots: {
				customRender: 'isLock'
			},
		},
		{
			title: '操作',
			key: 'operation',
			dataIndex: 'operation',
			scopedSlots: {
				customRender: 'operation'
			},
		},
	];

	export default {
		data() {
			return {
				userData: [],
				BuserData: [],
				columns,
				isLockSel: '-1',
				IdentitySel: '-1',
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			back() {
				this.$router.push({path:"/administratorindex"});
			},
			getData: function() {
				let that = this
				this.axios({ //格式a
					method: 'get',
					url: 'http://47.98.238.175:8080/user/query'
				}).then(function(res) {
					console.log(res)
					console.log(res.data);
					// console.log(this.data1);
					that.userData = res.data;
					that.BuserData = that.userData;
					// console.log(data);
				}).catch(res => {
					console.log(res)
					console.log('请求失败：' + res.status + ',' + res.statusText);
				});
			},
			toEditUser(record) {
				this.$router.push({
					name: "aedituserinfo",
					params: record
				})
			},
			handleLock(value) {
				this.isLockSel = value
			},
			handleIdentity(value) {
				this.IdentitySel = value
			},
			UserSelect() {
				if (this.isLockSel != "-1" || this.IdentitySel != "-1") {

					this.userData = this.BuserData.filter((item, index) => {
						console.log(this.isLockSel, this.IdentitySel);
						console.log(typeof(this.isLockSel), typeof(this.IdentitySel));
						if (this.isLockSel == "-1" && this.$data.IdentitySel != "-1") {
							return item.roleId == this.IdentitySel
						} else if (this.isLockSel != "-1" && this.IdentitySel == "-1") {
							return item.isLock == Number(this.isLockSel)
						}
						return item.isLock == Number(this.isLockSel) && item.roleId == this.IdentitySel;
					})
				} else {
					this.userData = this.BuserData
					console.log(this.userData)
				}
			},
		}
	}
</script>

<style scoped>
	.body {
		padding-top: 10px;
		width: 100%;
		background-color: rgba(255,255,255,0.5);
	}
	
	.body .title {
		width: 270px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin:20px auto;
		background-color: rgba(255,255,255,0.7);
	}

	.secondary-head {
		display: flex;
		padding: 20px;
		height: 60px;
		font-size: 20px;
		font-weight: bold;
	}

	.time {
		margin-right: 50px;
	}

	.table-number {
		margin-right: 50px;
	}

	.total-price {
		margin-right: 50px;
	}
</style>
