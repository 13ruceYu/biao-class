import Vue from 'vue'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import App from './App.vue'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './css/global.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

import routerConfig from "./config/router";
const router = new VueRouter({
  routes: routerConfig
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')