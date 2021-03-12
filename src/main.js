import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import './plugins/antd.js'
import VueDND from 'awe-dnd'
Vue.use(VueDND)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
