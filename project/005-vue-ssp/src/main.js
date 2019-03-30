import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
  faEnvelope,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import {
  faWeibo,
  faWeixin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";


library.add(
  faEnvelope,
  faWeibo,
  faWeixin,
  faTwitter,
  faUser
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter);
Vue.use(ElementUI);

import "normalize.css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css';
import "./css/global.css";
import "./css/grid.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Thread from "./pages/Thread";

import My from "./pages/user/My";
import Activity from "./pages/user/Activity";
import Account from "./pages/user/Account";
import Profile from "./pages/user/Profile";
import Message from "./pages/user/Message";

import Admin from "./pages/admin/Admin";
import AdminUser from "./pages/admin/User";
import AdminThread from "./pages/admin/Thread";
import AdminCat from "./pages/admin/Cat";
import AdminTheme from "./pages/admin/Theme";

import api from "./lib/api";
import session from "./lib/session";
window.api = api;

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
    path: '/forgotpassword',
    component: ForgotPassword,
  },
  {
    path: '/thread',
    component: Thread,
  },
  {
    path: '/my',
    component: My,
    children: [{
        path: 'activity',
        component: Activity
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'account',
        component: Account
      },
      {
        path: 'message',
        component: Message
      },
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [{
        path: 'user',
        component: AdminUser,
      },
      {
        path: 'thread',
        component: AdminThread
      },
      {
        path: 'cat',
        component: AdminCat
      },
      {
        path: 'theme',
        component: AdminTheme
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let toAdmin = to.matched[0].path == '/admin';
  let isAdmin = session.isAdmin();

  if (toAdmin && !isAdmin) {
    return;
  }
  next();
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')