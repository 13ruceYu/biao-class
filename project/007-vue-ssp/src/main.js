import Vue from 'vue'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import App from './App.vue'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './css/global.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

import api from "./lib/api";
window.api = api;

import routerConfig from "./config/router";
const router = new VueRouter({
  routes: routerConfig
})

Vue.config.productionTip = false

import session from "./lib/session";
router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  let isAdmin = session.isAdmin();

  if (toAdmin && !isAdmin) {
    return;
  }

  next();
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')