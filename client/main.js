import { ValidationObserver, ValidationProvider } from 'vee-validate';
import App from './App.vue';
import Axios from 'axios';
import { extendRules } from './utils/validation';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extendRules();

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
