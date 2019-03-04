import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './page/Home'
import Thread from './page/Thread'
import About from './page/About'
import Signup from './page/Signup'
import Login from './page/Login'
import Setting from './page/Setting'
import SettingMe from './page/SettingMe'
import SettingSecurity from './page/SettingSecurity'

import './css/global.css'

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/thread/:id',
    component: Thread,
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
    children: [
      {
        path: 'me',
        component: SettingMe
      },
      {
        path: 'security',
        component: SettingSecurity
      },
    ]
  }
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
