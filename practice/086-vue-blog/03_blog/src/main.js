import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import Home from './page/Home'
import Admin from './page/Admin'
import AdminPost from './page/AdminPost'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'post',
        component: AdminPost
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


Vue.config.productionTip = true

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
