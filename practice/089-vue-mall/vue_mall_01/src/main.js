import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import ElementUI from 'element-ui';

import "normalize.css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css';
import "./css/global.css";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Search from "./pages/Search";

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [
  {
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
]

const router = new VueRouter({
  routes
})

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')