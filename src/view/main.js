// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import myhome from './myhome'
//import health from './health'
import router from '../router/index.js'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(myhome),
  router
})
