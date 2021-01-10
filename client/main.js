import App from './App.vue';
import Axios from 'axios';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
