export const asyncRouter = [
	{
		//简历管理
		path: '/',
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
