import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import EditUserInfo from '../components/EditUserInfo.vue'
import ChefIndex from '../components/ChefIndex.vue'
import WaiterIndex from '../components/WaiterIndex.vue'
import Order from '../components/Order.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/order'
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/order',
		component: Order,
	},
	{
		path: '/signup',
		component: SignUp,
	},
	{
		path: '/waiterindex',
		component: WaiterIndex,
	},
	{
		path: '/chefindex',
		component: ChefIndex,
	},
	{
		path: '/edituserinfo',
		component: EditUserInfo,
	},
]

const router = new VueRouter({
	routes: routes
})

export default router
