<template>
    <div class="login-contain">
        <div>
            <div class="logo">
                <img src="@/assets/img/jl.jpg" style="width: 130px;height: 130px;" alt="">
                <p>自助迎新系统</p>
            </div>

            <div class="pad20">
                <van-field
                        v-model="username"
                        clearable
                        label="用戶："
                        label-width="50px"
                        label-align="center"
                        placeholder="用户名为考生号">
                    <img src="@/assets/img/user.png" slot="button"/>
                </van-field>
                <van-field
                        v-model="password"
                        type="password"
                        label="密码："
                        label-align="center"
                        label-width="50px"
                        placeholder="身份证号后6位，若有“X”，请大写">
                    <img src="@/assets/img/lock.png" slot="button"/>
                </van-field>
            </div>
        </div>
        <div class="">
            <div class="info">
                <div>温馨提示:</div>
                <div class="textIndent">
                    1、用户名为考生号;
                </div>
                <div class="textIndent">
                    2、密码为身份证号后6位，若有"X"，请大写。
                </div>
            </div>
            <div class="btn-contain">
                <van-button type="info" size="large" class="button-bg" @click="login">
                    绑定
                </van-button>
            </div>
            <!--<div class="bottom-link">-->
            <!--<router-link to="/search">个人住宿查询</router-link>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 登录页
     */
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

    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            /*
                    登陆逻辑
                    1、输入账号密码 请求token，
                    2、携带token，请求用户数据，设置角色，
                    3、判断是否已读 迎新须知，决定页面跳转
                     */
            login() {
                if (!this.username.trim()) {
                    this.$toast("请输入用户名")
                    return
                }
                if (!this.password.trim()) {
                    this.$toast("请输入密码")
                    return
                }
                this.$ajax.post('/target/saveBind', {
                    username: this.username,
                    password: this.password,
                    openId: getCookie('WX_OPEN_ID')
                    // openId: '1111'
                }).then(res => {
                    console.log(res.data)
                    //存token，提示已绑定，跳转内容页
                    if (res.data.errcode == '0') {
                        this.$store.commit('setToken', res.data.data);
                        this.$toast(res.data.errmsg)
                        this.$router.push('/desk')
                    } else {//提示错误信息
                        this.$toast(res.data.errmsg)
                    }
                }).catch(res => {
                    console.log(res)
                    this.$toast(JSON.stringify(res.response.data));
                })
            }
        }
    }
</script>

<style scoped type="text/css">
    .login-bottom {
        margin-top: 20px;
    }

    .bottom-link {
        text-align: center;
        padding: 0 20px 20px;
        font-size: 14px;
        color: #000;
    }

    .bottom-link > a {
        text-decoration: none;
        color: #000;
    }
</style>