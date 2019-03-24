import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import ElementUI from 'element-ui';

import "normalize.css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css';
import "./css/global.css";

import api from "./lib/api";
import session from "./lib/session";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recover from "./pages/Recover";

import My from "./pages/My";
import Order from "./pages/Order";
import Setting from "./pages/Setting";

import Base from "./pages/admin/Base";
import AdminUser from "./pages/admin/User";
import AdminBrand from "./pages/admin/Brand";
import AdminCat from "./pages/admin/Cat";
import AdminProduct from "./pages/admin/Product";

Vue.use(VueRouter);
Vue.use(ElementUI);

window.api = api;

const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/recover',
    component: Recover,
  },
  {
    path: '/my',
    component: My,
    children: [{
      path: 'order/:id?',
      component: Order,
    }, {
      path: 'setting',
      component: Setting,
    }, ]
  },
  {
    path: '/admin',
    component: Base,
    children: [{
        path: 'user',
        component: AdminUser,
      },
      {
        path: 'brand',
        component: AdminBrand,
      },
      {
        path: 'cat',
        component: AdminCat,
      },
      {
        path: 'product',
        component: AdminProduct,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

Vue.filter('cut', function(value, max) {
  if (!value) return '';
  value = value.toString();
  return value.slice(0, max) + '...';
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

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')