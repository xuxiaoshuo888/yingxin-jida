import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import Vant from 'vant'
import ElementUI from 'element-ui'

import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vant)
Vue.use(ElementUI)

Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.prototype.$proxy = process.env.VUE_APP_PROXY;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')