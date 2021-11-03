import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// mock开关
const mock = true;
if(mock){
  require('./mock/mockApi');
}

//注册 cookie
Vue.use(VueCookie);

Vue.prototype.$message = Message;

Vue.prototype.axios = axios
Vue.prototype.$cookie = VueCookie;

// 设置允许携带 cookie
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';
// 响应拦截器
axios.interceptors.response.use(function (response) {
  let status = response.status;
  if (status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.status);
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
