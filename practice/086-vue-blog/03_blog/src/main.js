import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import Home from './page/Home'
import Post from './page/Post'
import Admin from './page/Admin'
import AdminPost from './page/AdminPost'
import AdminCat from './page/AdminCat'
import AdminComment from './page/AdminComment'

const routes = [
  {
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
    children: [
      {
        path: 'post',
        component: AdminPost
      },
      {
        path: 'cat',
        component: AdminCat
      },
      {
        path: 'comment',
        component: AdminComment
      },
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
