import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import Home from './page/Home'
import Signup from './page/Signup'
import Login from './page/Login'
import About from './page/About'
import Setting from './page/Setting'
import SettingMe from './page/SettingMe'
import SettingSecurity from './page/SettingSecurity'

import './css/global.css'

const routes = [{
    path: '/',
    component: Home,
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
        component: SettingMe,
      },
      {
        path: 'security',
        component: SettingSecurity,
      },
    ]
  },
  {
    path: '/about',
    component: About,
  },
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')