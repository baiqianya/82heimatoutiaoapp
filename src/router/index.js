import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'
Vue.use(Router)

const router = new Router({
  // 配置路由表
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      // name: 'tabbar',   // 当子路由路径为空时 可以省略父路由的name 否则出现黄色警告
      path: '/',
      component: Tabbar,
      children: [{
        name: 'home',
        path: '', // 为空代表默认显示
        component: Home
      }]
    }
  ]
})

export default router
