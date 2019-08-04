<template>
    <div class="login-contain">
        <div>
            <div class="logo">
                <img src="@/assets/img/Logo2.png" style="width: 130px;height: 130px;" alt="">
                <p>自助迎新系统</p>
            </div>
            <div class="info">
                <div>温馨提示:</div>
                <div class="textIndent">2019年新生自助迎新时间为8月15日至9月1日，目前系统在维护期，请同学们8月15日以后登录使用！</div>
            </div>
            <div class="pad20">
                <van-field
                        v-model="username"
                        clearable
                        label="学号"
                        placeholder="请输入用户名">
                    <img src="@/assets/img/user.png" slot="button"/>
                </van-field>
                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码">
                    <img src="@/assets/img/lock.png" slot="button"/>
                </van-field>
            </div>
        </div>
        <div class="">
            <div class="info">
                <div>温馨提示</div>
                <div>1.初始密码为身份证号后6位。</div>
            </div>
            <div class="btn-contain">
                <van-button type="info" size="large" class="button-bg" @click="login">
                    登录
                </van-button>
            </div>
            <div class="bottom-link">
                <router-link to="/search">个人住宿查询</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 登录页
     */
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
                this.$ajax.post('/login', {username: this.username, password: this.password}).then(res => {
                    console.log(res.data)
                    if (res.data.errcode == '0') {//继续执行登录流程
                        this.$toast(res.data.errmsg)
                        this.$store.commit('setToken', res.data.token)
                        this.$ajax.get('/student_api/student').then(res => {
                            console.log(res)
                            if (res.data.errcode == '0') {//学生身份
                                // let info = JSON.stringify(res.data.data)
                                let info = res.data.data
                                this.$store.commit('setStdInfo', info)
                                if (res.data.data.readflag === '0') {//未读
                                    this.$router.push('/notice')
                                } else {//已读
                                    this.$router.push('/desk')
                                }
                            } else {//返回信息异常
                                this.$toast(res.data.errmsg)
                            }
                        })
                        // this.$toast(res.data.errmsg);
                        // res.data.role.roleid=self就是学生，其他的为老师
                        // 根据角色决定路由跳转，目前暂时不用
                        // if (res.data.role.roleid) {
                        //     this.$ajax.post('/set_role', {roleId: res.data.role.roleid}).then(res => {
                        //         this.$toast(res.data.errmsg)
                        //     }).catch(err => {
                        //         this.$toast(err)
                        //     })
                        // }
                        // if (res.data.role.roleid == 'self') {//学生
                        //     this.$router.push({path: '/basicInfo'})
                        // } else {//老师
                        //     this.$router.push({path: "/glstep"})
                        // }
                        /*
                        是否已读迎新须知，来决定页面跳转
                         */
                        // this.$router.push('/desk')
                    } else {//登录失败，提示错误信息
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