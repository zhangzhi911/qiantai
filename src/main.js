// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import vueAxios from 'vue-axios'


import 'es6-promise/auto'
import Vuex from 'vuex'
import store from './store'
import permission from "./permissions"
// import 'lib-flexible'
// 颜色插件
// Vue.use(vueAxios, axios)
Vue.use(Element, Vuex)
Vue.config.productionTip = false

import { BmlMarkerClusterer } from 'vue-baidu-map'

Vue.component('bml-marker-cluster', BmlMarkerClusterer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
