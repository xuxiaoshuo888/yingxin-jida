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

// //获取cookie
// function getCookie(name) {
//     let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//     if (arr = document.cookie.match(reg)) {
//         store.commit('setData', {
//             name: 'cookie',
//             data: decodeURIComponent(arr[2])
//         });
//         return decodeURIComponent(arr[2]);
//     }
//     else
//         return false;
// }
//
// //判断是否有token
// function hasToken() {
//     if (store.getters.token) {
//         return true;
//     }
//     else if (sessionStorage.getItem('token') !== null) {
//         store.commit('setToken', sessionStorage['token']);
//         // store.commit('setRole', sessionStorage['role']);
//         // store.commit('setRoleList', JSON.parse(sessionStorage['roleList']));
//         // store.commit('setUser', JSON.parse(sessionStorage['user']));
//         return true
//     }
//     else return false
// }
//
// router.beforeEach((to, from, next) => {
//     if (hasToken()) {
//         next();
//     }
//     else {
//         //模拟登陆
//         axios.post('/cas/test_login')
//             .then(res => {
//                 axios.post('/gettoken', {uuid: res.data.data.APP_UUID})
//                     .then(res => {
//                         store.commit('setToken', res.data.data.token);
//                         store.commit('setRole', res.data.data.currentRole.id);
//                         store.commit('setRoleList', res.data.data.roles);
//                         store.commit('setUser', res.data.data.user);
//                         next()
//                     })
//             })
//
//         //生产环境登陆
//         if (getCookie('APP_UUID')) {
//             axios.post('/gettoken', {uuid: getCookie('APP_UUID')})
//                 .then(res => {
//                     store.commit('setToken', res.data.data.token);
//                     store.commit('setRole', res.data.data.currentRole.id);
//                     store.commit('setRoleList', res.data.data.roles);
//                     store.commit('setUser', res.data.data.user);
//                     next()
//                 })
//         }
//         else {
//             axios.post('/getLoginUrl')
//                 .then(res => {
//                     sessionStorage.clear();
//                     window.location.href = res.data.url;
//                 })
//         }
//     }
// });


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')