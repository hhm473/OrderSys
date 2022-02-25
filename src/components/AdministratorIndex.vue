<template>
	<div>
		<page-header is-login="true" :user-name="userId" :user-type="role"></page-header>
		<div class="header">
			<div class="left-text">
				<span>管理员首页</span>
			</div>
		</div>
		<div class="content">
			<div class="left-select">
				<div>
					<router-link to="/dishmanage">菜品管理</router-link>
				</div>
				<div>
					<router-link to="/usermanage">用户管理</router-link>
				</div>
				<div>
					<router-link to="/ordermanage">订单管理</router-link>
				</div>
				<div>
					<router-link to="/announce">实时公告发布</router-link>
				</div>
			</div>
			<div class="left-table">
				<div>
					<div class="title">
						注册申请
					</div>
					<a-table :columns="columns" :data-source="data" bordered :scroll="{y: 350 }">
						<template slot="select" slot-scope="text, record">
							<a-select   @change="handleChange(record.key, $event)" style="width: 100%;">
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
						</template>

						<a-button slot="check1" slot-scope="text, record" @click="() => confirm(record.key)">
							确定
							<!-- {{record}} -->
						</a-button>
						<a-button slot="check2" slot-scope="text, record" @click="() => cancel(record.key)">
							删除
							<!-- {{record}} -->
						</a-button>
					</a-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PageHeader from './PageHeader.vue'
	const columns = [{
			title: '用户名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '头像',
			dataIndex: 'pic',
			key: 'pic',
		},
		{
			title: '密码',
			key: 'password',
			dataIndex: 'password',
		},
		{
			title: '身份选择',
			key: 'select',
			dataIndex: 'select',
			scopedSlots: {
				customRender: 'select'
			},
		},
		{
			title: '确定',
			key: 'check1',
			dataIndex: 'check',
			scopedSlots: {
				customRender: 'check1'
			},
		},
		{
			title: '删除',
			key: 'check2',
			dataIndex: 'check',
			scopedSlots: {
				customRender: 'check2'
			},
		},
	];
	
	const data = [{
			key: '0',
			name: 'John Brown',
			pic: "2",
			password: '1',
		}, {
			key: '1',
			name: 'John Brown',
			pic: "2",
			password: '1',
		},{
			key: '2',
			name: 'John Brown',
			pic: "2",
			password: '1',
		},{
			key: '3',
			name: 'John Brown',
			pic: "2",
			password: '1',
		},{
			key: '4',
			name: 'John Brown',
			pic: "2",
			password: '1',
		},{
			key: '5',
			name: 'John Brown',
			pic: "2",
			password: '1',
		},
	];
	
	export default {
		name: 'AdministratorIndex',
		components: {
			PageHeader,
		},
		
		mounted: function() {
			let peaple = JSON.parse(localStorage.getItem('role'))
			if (peaple.roleId == 3) {
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
				data,
				columns,
				role: "",
				userId: "",
			}
		},
		methods:{
			confirm(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.cook === "等待烹饪") {
						target.cook = "正在烹饪";
					} else {
						target.cook = "已烹饪"
					}
				}
			},
			cancel(key) {
				console.log("进入handlebook")
				const newData = [...this.data];
				const target = newData.filter(item => key === item.key)[0];
				if (target) {
					if (target.cook === "等待烹饪") {
						target.cook = "正在烹饪";
					} else {
						target.cook = "已烹饪"
					}
				}
			},
			handleChange(key,value){
				console.log(key)
				console.log(value);
			}
		}
	}
	
</script>


<style>
	.header{
		margin-top: 100px;
	}
	.header span{
		margin-left: 20px;
		font-size: 20px;
		background-color: #a4adb3;
		color: white;
	}
	
	.content{
		display: flex;
		margin-top: 20px;
		justify-content: space-around;
		
	}
	
	.left-select{
		width: 30%;
		height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: white;
	}
	.left-select div{
		height: 50px;
		border-radius: 10px;
		background-color: #CFD8DC;
		width: 200px;
		line-height: 50px;
		text-align: center;
	}
	
	.left-table{
		padding: 20px;
		width: 60%;
		margin-right: 10px;
		height: 600px;
		background-color: white;
	}
	.title {
		font-size: 30px;
		font-weight: bold;
		padding-left: 60px;
	}
</style>
