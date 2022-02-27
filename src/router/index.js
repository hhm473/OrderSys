import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import EditUserInfo from '../components/EditUserInfo.vue'
import ChefIndex from '../components/ChefIndex.vue'
import WaiterIndex from '../components/WaiterIndex.vue'
import Order from '../components/Order.vue'
import XiaDan from '../components/XiaDan.vue'
import OrderManage from '../components/OrderManage.vue'
import DishManage from '../components/DishManage.vue'
import UserManage from '../components/UserManage.vue'
import EditDish from '../components/EditDish.vue'
import AddDish from '../components/AddDish.vue'
import Announce from '../components/Announce.vue'
import AEditUserInfo from '../components/AEditUserInfo.vue'
import AdministratorIndex from '../components/AdministratorIndex.vue'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/ordermanage'
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
		path: '/editdish',
		name: 'editdish',
		component: EditDish,
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
		path: '/administratorindex',
		component: AdministratorIndex,
	},

]

const router = new VueRouter({
	routes: routes
})

export default router
