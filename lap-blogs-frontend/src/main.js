import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './http.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Vue.prototype.$fileAxios = fileAxios;
// let fileAxios = axios.create({
//   headers:{
//     "Content-Type":"multipart/form-data"
//   }
// });




