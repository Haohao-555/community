import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import store from './store/index'
import { Toast, 
         Notify, 
         PullRefresh, 
         Search, 
         Sticky, 
         Tabbar, 
         TabbarItem, 
         Icon, 
         Cell, 
         CellGroup,
         Grid,
         GridItem,
         NavBar,
         Field, 
         Uploader,
         Area,
         Dialog,
         ShareSheet, 
         NoticeBar 
} from 'vant';
import { Image as VanImage } from 'vant';
import 'vant/lib/index.css'
// 导入animate动画
import 'animate.css'

Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(Notify)
Vue.use(PullRefresh)
Vue.use(Search)
Vue.use(Sticky)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(Area)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(ShareSheet)
Vue.use(NoticeBar)
// mock开关
const mock = true;
if (mock) {
  require('./mock/mockApi');
}

//注册 cookie
Vue.use(VueCookie);


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
  store,
  render: h => h(App),
}).$mount('#app')
