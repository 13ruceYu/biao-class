import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './page/Home'
import About from './page/About'
import Signup from './page/Signup'
import Login from './page/Login'
import Setting from './page/Setting'

import './css/global.css'

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/setting',
    component: Setting,
  }
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
