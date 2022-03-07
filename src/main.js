import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;


import Antd from 'ant-design-vue';
Vue.use(Antd);

//引入图表库
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import qs from 'qs'
// 设置浏览器标题
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title
	}
})


//Vue全局对象可用
Vue.prototype.$qs = qs

Vue.use(VueRouter)
new Vue({
	render: h => h(App),
	router,
}).$mount('#app')

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
		console.log('需要登录');
		if (localStorage.role) { // 判断当前的token是否存在 ； 登录存入的token
			next();
		} else {
			next({
				path: '/',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
});


