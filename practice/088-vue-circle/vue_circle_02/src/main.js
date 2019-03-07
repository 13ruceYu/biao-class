import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import Home from './page/Home'
import Thread from './page/Thread'
import Signup from './page/Signup'
import Login from './page/Login'
import About from './page/About'
import Setting from './page/Setting'
import SettingMe from './page/SettingMe'
import SettingSecurity from './page/SettingSecurity'

import AdminBase from './page/admin/Base'
import AdminUser from './page/admin/User'
import AdminThread from './page/admin/Thread'

import './css/global.css'
import session from './lib/session'

const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/thread/:id',
    component: Thread,
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
    children: [{
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
    path: '/admin',
    component: AdminBase,
    children: [{
        path: 'user',
        component: AdminUser,
      },
      {
        path: 'thread',
        component: AdminThread,
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

router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  if (toAdmin) {
    if (session.isAdmin())
      next();
    else {
      next(false);
      alert('滚粗，yo');
    }
  } else
    next();
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')