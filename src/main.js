import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// test++++++++++++++++++
// 为啥不是我的账号推送的呢
// 测试1
// 测试2
