import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui 和注册
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//
import './assets/css/reset.css'
import './assets/css/index.less'
import './assets/fonts/iconfont.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
