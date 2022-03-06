<template>
  <div style="height: 100%;" v-title data-title="管理员">
    <page-header></page-header>
    <div class="content">
      <div class="rleft-select">
            <a-menu :default-open-keys="[Subindex]" :default-selected-keys="[Aindex]" style="width: 100% ; background-color: rgba(246, 255, 255, 0.3);" mode="inline" @click="handleClick" >
                <a-sub-menu key="sub1">
					<span slot="title"><a-icon type="setting" /><span>用户管理</span></span>
					<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="1">
						注册申请
					</a-menu-item>
					<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="3">
						用户管理
					</a-menu-item>
                </a-sub-menu>
				<a-sub-menu key="sub2">
					<span slot="title"><a-icon type="setting" /><span>菜品管理</span></span>
					<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="2">
					  菜品管理
					</a-menu-item>
				</a-sub-menu>
                <a-sub-menu key="sub3">
                	<span slot="title"><a-icon type="setting" /><span>订单数据</span></span>
                	<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="4">
                		订单管理
                	</a-menu-item>
                	<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="6">
                		历史数据查询
                	</a-menu-item>
                </a-sub-menu>
				<a-sub-menu key="sub4">
					<span slot="title"><a-icon type="setting" /><span>公告管理</span></span>
					<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="5">
					  实时公告发布
					</a-menu-item>
					<a-menu-item style= "background-color: rgba(246, 239, 225, 0.5);" key="7">
					  历史公告查询
					</a-menu-item>
				</a-sub-menu>
				
            </a-menu>
      </div>
      <div class="right-table">
		  <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../PageHeader.vue";

export default {
  name: "AdministratorIndex",
  components: {
    PageHeader,
  },

  created: function () {
	this.Aindex = localStorage.getItem('Aindex').toString()
	this.Subindex = localStorage.getItem('Subindex').toString()
	// let e = {
	// 	key:this.Aindex
	// }
	// this.handleClick(e)
  },
  data() {
    return {
      role: "",
      userId: "",
	  Aindex:'3',
	  Subindex:'sub1'
    };
  },

  methods: {
	  
	handleClick(e) {
		console.log(e);
	      switch(e.key){
	      	case "1":
				localStorage.setItem('Subindex', "sub1");
				localStorage.setItem('Aindex', "1");
	      		this.$router.push({
	      			path: "/registeration"
	      		})
	      		break
	      	case "2":
				localStorage.setItem('Subindex', "sub2");
				localStorage.setItem('Aindex', "2");
	      		this.$router.push({
	      			path: "/dishmanage"
	      		})
	      		break
			case "3":
				localStorage.setItem('Subindex', "sub1");
				localStorage.setItem('Aindex', "3");
				this.$router.push({
					path: "/usermanage"
				})
				break
			case "4":
				localStorage.setItem('Subindex', "sub3");
				localStorage.setItem('Aindex', "4");
				this.$router.push({
					path: "/ordermanage"
				})
			break
			case "5":
				localStorage.setItem('Subindex', "sub4");
				localStorage.setItem('Aindex', "5");
				this.$router.push({
					path: "/announce"
				})
			break
			case "6":
				localStorage.setItem('Subindex', "sub3");
				localStorage.setItem('Aindex', "6");
				this.$router.push({
					path: "/historicaldata"
				})
			break
			case "7":
				localStorage.setItem('Subindex', "sub4");
				localStorage.setItem('Aindex', "7");
				this.$router.push({
					path: "/noticemanage"
				})
			break
	      	default:
	      		//这里是没有找到对应的值处理
	      	break
	      }
	},
	
  },
};
</script>


<style scoped>

.content {
	padding-top: 70px;
	display: flex;
	/* height: calc( 100% - 70px ) ; */
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.rleft-select {
	background-color: rgba(255,255,255,0.5);
	flex: 2;
	height: 100%;
	box-shadow: 2px 2px 5px #e6e6e6;
	z-index: 9;
}

.content .right-table {
	padding: 20px;
  	flex: 10;
	height: 100%;
	padding-bottom: 0;
	overflow: auto;
}
</style>
