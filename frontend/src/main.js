import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.use(axios)
Vue.prototype.$axios = axios

import axios from 'axios'
/* eslint-disable */ 
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$axios = axios;
/*다른 컴포넌트에서는 this.$axios로 사용 가능*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
