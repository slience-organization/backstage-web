import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'
import Index from 'components/index/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ 'components/sysMgr/User.vue')
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ 'components/sysMgr/Role.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ 'components/sysMgr/Menu.vue')
      },
      {
        path: '/dict',
        name: 'Dict',
        component: () => import(/* webpackChunkName: "dict" */ 'components/sysMgr/Dict.vue')
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import(/* webpackChunkName: "userCenter" */ 'components/sysMgr/UserCenter.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ 'views/login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(function (to, from, next) {
  
// })

export default router
