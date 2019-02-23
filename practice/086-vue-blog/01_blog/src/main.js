import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './page/Home';
import Admin from './page/Admin';
import Post from './page/Post';
import AdminPost from './page/AdminPost';
import AdminCat from './page/AdminCat';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routeConfig = [{
    path: '/',
    component: Home,
  },
  {
    path: '/post/:id',
    component: Post
  },
  {
    path: '/Admin',
    component: Admin,
    children: [{
      path: 'post/',
      component: AdminPost,
    },
    {
      path: 'cat/',
      component: AdminCat,
    }
  ]
  },
]

new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routeConfig,
  })
}).$mount('#app')