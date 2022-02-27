import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import qs from 'qs'

//Vue全局对象可用
Vue.prototype.$qs = qs

Vue.use(VueRouter)
new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
