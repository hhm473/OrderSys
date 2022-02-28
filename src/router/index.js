import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import EditUserInfo from '../components/EditUserInfo.vue'
import ChefIndex from '../components/ChefIndex.vue'
import WaiterIndex from '../components/WaiterIndex.vue'
import Order from '../components/Order.vue'
import XiaDan from '../components/XiaDan.vue'
import OrderManage from '../components/Administrator/OrderManage.vue'
import DishManage from '../components/Administrator/DishManage.vue'
import UserManage from '../components/Administrator/UserManage.vue'
import EditDish from '../components/Administrator/EditDish.vue'
import AddDish from '../components/Administrator/AddDish.vue'
import Announce from '../components/Administrator/Announce.vue'
import AEditUserInfo from '../components/Administrator/AEditUserInfo.vue'
import AdministratorIndex from '../components/Administrator/AdministratorIndex.vue'
import Registeration from '../components/Administrator/Registeration.vue'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login,
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
	{
		path: '/order',
		name: 'order',
		component: Order,
	},
	{
		path: '/xiadan',
		name: 'xiadan',
		component: XiaDan,
	},
	
	{
		path: '/administratorindex',
		component: AdministratorIndex,
		children: [
			{
			    path: '/',
			    redirect: '/registeration'
			},
			{
			path: '/registeration',
			name: 'registeration',
			component: Registeration
			},
			{
				path: '/ordermanage',
				component: OrderManage,
			},
			{
				path: '/dishmanage',
				component: DishManage,
			},
			{
				path: '/usermanage',
				component: UserManage,
			},
			{
				path: '/adddish',
				component: AddDish,
			},
			{
				path: '/announce',
				component: Announce,
			},
			{
				path: '/aedituserinfo',
				name: 'aedituserinfo',
				component: AEditUserInfo,
			},
			{
				path: '/editdish',
				name: 'editdish',
				component: EditDish,
			},
		]
	},

]

const router = new VueRouter({
	routes: routes
})

export default router
