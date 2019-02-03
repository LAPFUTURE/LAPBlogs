import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
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
          component: () => import(/* webpackChunkName: "about" */ './views/Technology.vue')
        },
      ]
    },
    
  ]
})
