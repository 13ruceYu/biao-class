import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './page/Home'
import Admin from './page/Admin'
import AdminPost from './page/AdminPost'
import Post from './page/Post'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/post/:id',
    component: Post,
  },
  {
    path: '/admin',
    component: Admin,
    children: [{
      path: 'adminPost',
      component: AdminPost
    }]
  }
]

const router = new VueRouter({
  routes,
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')