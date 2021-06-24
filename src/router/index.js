import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'
import Index from 'components/index/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/sys/index'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/sys/index',
        name: 'sysIndex',
        component: Index
      },
      {
        path: '/sys/user',
        name: 'sysUser',
        component: () => import(/* webpackChunkName: "user" */ 'components/sysMgr/User.vue')
      },
      {
        path: '/sys/role',
        name: 'sysRole',
        component: () => import(/* webpackChunkName: "role" */ 'components/sysMgr/Role.vue')
      },
      {
        path: '/sys/menu',
        name: 'sysMenu',
        component: () => import(/* webpackChunkName: "menu" */ 'components/sysMgr/Menu.vue')
      },
      {
        path: '/sys/dict',
        name: 'sysDict',
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

router.beforeEach(function (to, from, next) {
  let token = sessionStorage.getItem("token")
  
  if(!token){
    if(to.path !== '/login') {
      return next({path: '/login'})
    }else {
      next()
    }
  }else {
    if(to.path === '/login') {
      return next({path: '/sys/index'})
    }
    next()
  }
})

export default router
