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

//获取cookie
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

function getCookie(name) {
    var cookies = document.cookie;
    var list = cookies.split("; ");// 解析出名/值对列表

    for (var i = 0; i < list.length; i++) {
        var arr = list[i].split("=");// 解析出名和值
        if (arr[0] == name)
            return decodeURIComponent(arr[1]);// 对cookie值解码
    }
    return "";
}

//判断是否有token
function hasToken() {
    if (store.getters.token) {
        return true;
    }
    else if (sessionStorage.getItem('token') !== null) {
        store.commit('setToken', sessionStorage['token']);
        // store.commit('setRole', sessionStorage['role']);
        // store.commit('setRoleList', JSON.parse(sessionStorage['roleList']));
        // store.commit('setUser', JSON.parse(sessionStorage['user']));
        return true
    }
    else return false
}

// no redirect whitelist
// const whiteList = ['/login','/']
// router.beforeEach((to, from, next) => {
// /*    if (hasToken()) {
//         //已绑定身份时，跳转到/bind
//         console.log('hasToken')
//         console.log(from)
//         console.log(to)
//         console.log(next)
//         next()
//     } else {*/
//         if (whiteList.indexOf(to.path) !== -1) {//在白名单
//             next()
//         } /*else {
//             console.log('dont has token!')
//             console.log(getCookie('WX_OPEN_ID'))
//             let openId = getCookie('WX_OPEN_ID');
//             // openId = "1111"
//             //1、从cookie获取openid，2、调接口判断是否已绑定，如已绑定，则拿后台返回的token，如未绑定则跳转到绑定界面
//             axios.post('/target/checkBind', {openId: openId})
//                 .then(res => {
//                     console.log(res.data)
//                     console.log(from)
//                     //存token，提示已绑定，跳转内容页
//                     if (res.data.errcode == '0') {
//                         store.commit('setToken', res.data.data);
//                         console.log('to desk')
//                         next({path: '/desk'})
//                     } else {//提示错误信息，跳转到绑定界面
//                         console.log('to login')
//                         next({path: '/login'})
//                     }
//                 })
//         }*/
// });


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')