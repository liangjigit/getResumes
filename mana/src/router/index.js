import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	asyncRouter
} from './asyncRouter.js'
import {
	Message,
	MessageBox
} from 'element-ui';

Vue.use(VueRouter)

//解决 NavigationDuplicated: Avoided redundant navigation to current location: ""报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [{
		//登录页面
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "login" */ '@/views/login/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		//App.vue首页
		path: '/',
		name: 'index',
		component: () => import( /* webpackChunkName: "index" */ '@/components/layout/index.vue'),
		// redirect: to => {
		//       // 方法接收 目标路由 作为参数
		//       // return 重定向的 字符串路径/路径对象
		// 			console.log(router)
		//     },
		meta: {
			requiresAuth: true,
			title: '首页'
		},
		children: [
	{
		//简历管理
		path: '',
		name: 'resumeMana',
		component: () => import( /* webpackChunkName: "resume" */ '@/views/resumeMana/resumeMana'),
		meta: {
			requiresAuth: true,
			title: '简历管理',
			role: ['personnel']
		}
	},
	{
		//标签管理
		path: 'label',
		name: 'labelMana',
		component: () => import( /* webpackChunkName: "label" */ '@/views/labelMana/labelMana'),
		meta: {
			requiresAuth: true,
			title: '标签管理',
			role: ['personnel']
		}
	},
	{
		//我是人才
		path: '',
		name: 'talentMana',
		component: () => import( /* webpackChunkName: "talent" */ '@/views/talent/talent'),
		meta: {
			requiresAuth: true,
			title: '我是人才',
			role: ['CEO']
		}
	},
	{
		//我有需求
		path: 'demand',
		name: 'demandMana',
		component: () => import( /* webpackChunkName: "demand" */ '@/views/demand/demand'),
		meta: {
			requiresAuth: true,
			title: '我有需求',
			role: ['CEO']
		}
	},
]
	},
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	if (to.path !== from.path) {
		NProgress.start();
	}
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		let managerToken = window.localStorage.getItem('manager-token')
		let userRole = window.localStorage.getItem('user-role')
		if (managerToken && userRole) {
			// console.log(111)
			// const activeAsync = asyncRouter.filter(item => {
			// 	return item.meta.role.includes(userRole)
			// })
			// 	activeAsync.forEach(item => {
			// 		router.addRoute('index', item)
			// 	})
				// router.options.routes[1].children = [...activeAsync]
			// const nextPath = '/' + activeAsync[0].path
			// console.log(nextPath)
			next()
		} else {
			if (to.path == '/login') {
				next();
			} else {
				next({
					path: '/login'
				})
			}
		}
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})
export default router
