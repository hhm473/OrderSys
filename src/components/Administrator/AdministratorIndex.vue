<template>
  <div style="height: 100%;">
    <page-header></page-header>
    <div class="content">
      <div class="rleft-select">
            <a-menu :default-selected-keys="['1']" style="width: 100% background-color: rgba(255,255,255,0.5);" mode="vertical" @click="handleClick" >
                  <a-menu-item key="1">
                    <a-icon type="mail" />
                    注册申请
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="calendar" />
                    菜品管理
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="calendar" />
                    用户管理
                  </a-menu-item>
				  <a-menu-item key="4">
				    <a-icon type="calendar" />
				    订单管理
				  </a-menu-item>
				  <a-menu-item key="5">
				    <a-icon type="calendar" />
				    实时公告发布
				  </a-menu-item>
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

  mounted: function () {

    this.GetUser();
  },
  data() {
    return {
      role: "",
      userId: "",
    };
  },

  methods: {
	handleClick(e) {
	      switch(e.key){
	      	case "1":
	      		this.$router.push({
	      			path: "/registeration"
	      		})
	      		break
	      	case "2":
	      		this.$router.push({
	      			path: "/dishmanage"
	      		})
	      		break
			case "3":
				this.$router.push({
					path: "/usermanage"
				})
				break
			case "4":
				this.$router.push({
					path: "/ordermanage"
				})
			break
			case "5":
				this.$router.push({
					path: "/announce"
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
	margin-top: 70px;
	display: flex;
	height: calc( 100% - 70px ) ;
	width: 100%;
	overflow: hidden;
}

.rleft-select {
	background-color: rgba(255,255,255,0.5);
	flex: 2;
	height: 100%;
	background-color: white;
	box-shadow: 2px 2px 5px #e6e6e6;
	z-index: 9;
}

.content .right-table {
	padding: 20px;
  	flex: 10;
	height: 100%;
	padding-bottom: 0;
  overflow: scroll;
}


</style>
