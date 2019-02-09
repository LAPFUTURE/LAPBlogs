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
if(process.env.NODE_ENV === 'production'){  // 生产环境,线上环境
	Vue.prototype.host = 'http://node_api.connectyoume.top';
}else if(process.env.NODE_ENV === 'test'){  //测试环境
	Vue.prototype.host = '';
}else if(process.env.NODE_ENV === 'development'){ // 开发环境
	Vue.prototype.host = 'http://localhost:8009';
}


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




