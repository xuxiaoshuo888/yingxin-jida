import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'bind',
            component: () => import('./views/bind/bind.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/login.vue')
        },
        {
            path: '/ybpt',
            name: 'ybpt',
            component: () => import('./views/login/ybpt.vue')
        },
        {
            path: '/notice',
            name: 'notice',
            component: () => import('./views/notice/notice.vue')
        },
        {
            path: '/desk',
            name: 'desk',
            component: () => import('./views/desk/desk.vue')
        },
        {
            path: '/desk/qrcode',
            name: 'qrcode',
            component: () => import('./views/desk/qrcode.vue')
        },
        {
            path: '/hcyhk',
            name: 'hcyhk',
            component: () => import('./views/hcyhk/hcyhk.vue')
        },
        {
            path: '/fees',
            name: 'fees',
            component: () => import('./views/fees/fees.vue')
        },
        {
            path: '/greenPath',
            name: 'greenPath',
            component: () => import('./views/greenPath/greenPath.vue')
        },
        {
            path: '/greenPath/pdf',
            name: 'pdf',
            component: () => import('./views/greenPath/pdf.vue')
        },
        {
            path: '/room',
            name: 'room',
            component: () => import('./views/room/room.vue')
        },
        {
            path: '/roomList',
            name: 'roomList',
            component: () => import('./views/room/roomList.vue')
        },
        {
            path: '/card',
            name: 'card',
            component: () => import('./views/card/card.vue')
        },
        {
            path: '/regist',
            name: 'regist',
            component: () => import('./views/regist/regist.vue')
        },
        {
            path: '/clothes',
            name: 'clothes',
            component: () => import('./views/clothes/clothes.vue')
        },
        {
            path: '/person',
            name: 'person',
            component: () => import('./views/person/person.vue')
        },
        {
            path: '/safe',
            name: 'safe',
            component: () => import('./views/safe/safe.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('./views/search/search.vue')
        },
        {
            path: '/buy',
            name: 'buy',
            component: () => import('./views/buy/buy.vue')
        },
        {
            path: '/hkqy',
            name: 'hkqy',
            component: () => import('./views/hkqy/hkqy.vue')
        }
    ]
})
