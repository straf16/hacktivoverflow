import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueQuill from 'vue-quill'

import 'buefy/dist/buefy.css'
import './assets/style.scss'

Vue.use(Buefy)
Vue.use(VueQuill)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
