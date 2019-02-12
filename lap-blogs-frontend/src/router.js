import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'index',
		component: Index,
		children: [{
				path: '/',
				name: 'quote',
				component: () => import('./views/Quote.vue')
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('./views/Login.vue')
			},
			{
				path: '/registe',
				name: 'registe',
				component: () => import('./views/Registe.vue')
			},
			{
				path: '/write',
				name: 'write',
				component: () => import('./views/Write.vue')
			},
			{
				path: '/technology/:languageId',
				name: 'technology',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import( /* webpackChunkName: "about" */ './views/Technology.vue')
			},
			{
				path: '/detail',
				name: 'detail',
				component: () => import('./views/Detail.vue')
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('./views/About.vue')
			},
			{
				path: '/experience',
				name: 'experience',
				component: () => import('./views/Experience.vue')
			},
			{
				path: '/myblogs',
				name: 'myblogs',
				component: () => import('./views/Myblogs.vue')
			},
			{
				path: '/myblog',
				name: 'myblog',
				component: () => import('./views/Myblog.vue')
			},
			{
				path: '/schema',
				name: 'schema',
				component: () => import('./components/Schema.vue')
			},
			{
				path: '/vue',
				name: 'vue',
				component: () => import('./components/Vue.vue')
			},
		]
	}, ]
});
router.beforeEach((to, from, next) => {
	if (to.path == "/write") {
		const isLogin = localStorage.eleToken ? true : false;
		if(isLogin){
			next();
		}else {
			alert("请先登录!");
			next("/login");
		}
	}else{
		next();
	}
})


export default router