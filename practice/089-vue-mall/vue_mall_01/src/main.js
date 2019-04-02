import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import ElementUI from 'element-ui';

import "normalize.css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css';
import "./css/global.css";

import api from "./lib/api";
import session from "./lib/session";
import routerConfig from "./config/router";


Vue.use(VueRouter);
Vue.use(ElementUI);

window.api = api;

const router = new VueRouter({
  routes: routerConfig
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