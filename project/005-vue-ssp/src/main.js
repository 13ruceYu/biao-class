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
  faEnvelope
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
  faTwitter
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
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')