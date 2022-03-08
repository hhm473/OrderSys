import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import EditUserInfo from '../components/EditUserInfo.vue'
import ChefIndex from '../components/Chef/ChefIndex.vue'
import WaiterIndex from '../components/Waiter/WaiterIndex.vue'
import Order from '../components/Waiter/Order.vue'
import XiaDan from '../components/Waiter/XiaDan.vue'
import OrderManage from '../components/Administrator/OrderManage.vue'
import DishManage from '../components/Administrator/DishManage.vue'
import UserManage from '../components/Administrator/UserManage.vue'
import EditDish from '../components/Administrator/EditDish.vue'
import AddDish from '../components/Administrator/AddDish.vue'
import Announce from '../components/Administrator/Announce.vue'
import AEditUserInfo from '../components/Administrator/AEditUserInfo.vue'
import AdministratorIndex from '../components/Administrator/AdministratorIndex.vue'
import Registeration from '../components/Administrator/Registeration.vue'
import CheckOrder from '../components/Waiter/CheckOrder.vue'
import HistoricalData from '../components/Administrator/HistoricalData.vue'
import NoticeManage from '../components/Administrator/NoticeManage.vue'
import EditNotice from '../components/Administrator/EditNotice.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login',
		// redirect: '/chartzhu',
		
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
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/chefindex',
		component: ChefIndex,
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/edituserinfo',
		component: EditUserInfo,
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/order',
		name: 'order',
		component: Order,
		meta: {
			// requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/xiadan',
		name: 'xiadan',
		component: XiaDan,
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/checkorder',
		name: 'checkorder',
		component: CheckOrder,
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},
	{
		path: '/orderxiangqing',
		name: 'orderxiangqing',
		component: () => import("@/components/Waiter/OrderXiangQing"),
		meta: {
			requireAuth: true, // 判断是否需要登录
		},
	},

	{
		path: '/administratorindex',
		component: AdministratorIndex,
		// meta: {
		// 	requireAuth: true, // 判断是否需要登录
		// },
		children: [{
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
			{
				path: '/historicaldata',
				name: 'HistoricalData',
				component: HistoricalData
			},
			{
				path: '/noticemanage',
				name: 'NoticeManage',
				component: NoticeManage
			},
			{
				path: '/editnotice',
				name: 'EditNotice',
				component: EditNotice
			},
		]
	},

]

const router = new VueRouter({
	routes: routes
})

export default router
