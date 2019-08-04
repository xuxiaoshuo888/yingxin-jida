import Vue from "vue";
import axios from 'axios';
import qs from 'querystring'
import router from "./router";
import store from './store';
import {Toast} from 'vant';

//创建实例 axios.create([config])
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/wx' : '/proxy',// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    timeout: 10000,// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    headers: {// `headers` 是即将被发送的自定义请求头
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,// `withCredentials` 表示跨域请求时是否需要使用凭证
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log(config)
    // if(config.url == 'http://202.114.207.128/yx/api/getStudentRoomInfo'){
    //     config.baseURL = ''
    // }
    Toast.loading({
        duration: 1000,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中'
    });
    if (config.method === "post") {// post传参序列化
        config.data = qs.stringify(config.data);// 注：若是提交能直接接受json 格式,即可以不用 qs 序列化
    }

    // 判断是否存在token，如果存在将每个页面header都添加token
    if (store.getters.token) {
        config.headers.Authorization = "Bearer " + store.getters.token;
    }else{
        config.headers.Authorization = "Bearer " + '';
    }
    return config;
}, function (error) {
    Toast.clear()
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
    Toast.clear()
    if (res.data.errcode != '0') {//非正常
        Toast(res.data.errmsg)
        switch (res.data.errcode) {
            case '403':
                router.push('/')
                break;
        }
    }
    return res
}, function (error) {
    Toast.clear()
    return Promise.reject(error);
});
export default instance;

