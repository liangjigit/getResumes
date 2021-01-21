import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	Message,
	MessageBox
} from 'element-ui';

Vue.use(VueRouter)

//解决 NavigationDuplicated: Avoided redundant navigation to current location: ""报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

const routes = [{
		//登录页面
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '@/views/login/login.vue'),
		meta: {
			title: '登录页'
		}
	},
	{
		//App.vue首页
		path: '/',
		name: 'index',
		component: () => import('@/components/layout/index.vue'),
		meta: {
			requiresAuth: true,
			title: '首页'
		},
		children:[
			{
				path:'label',
				name:'labelMana',
				component:()=>import('@/views/labelMana/labelMana')
			}
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
		if (!window.localStorage.getItem('token')) {
			MessageBox.confirm('请先进行登录', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				next({
					path: '/login',
					query: {
						redirect: to.fullPath
					}
				})
			}).catch(() => {
				Message.warning({
					message: '已取消'
				})
			});
		} else {
			next()
		}
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})
export default router
