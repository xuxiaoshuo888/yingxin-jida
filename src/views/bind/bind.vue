<template>
    <div style="margin-top: 100px;text-align: center;">首页</div>
</template>

<script>
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
        name: "bind",
        methods: {
            check() {
                let openId = getCookie('WX_OPEN_ID');
                // openId = "1111"
                //1、从cookie获取openid，2、调接口判断是否已绑定，如已绑定，则拿后台返回的token，如未绑定则跳转到绑定界面
                this.$ajax.post('/target/checkBind', {openId: openId})
                    .then(res => {
                        console.log(res.data)
                        //存token，提示已绑定，跳转内容页
                        if (res.data.errcode == '0') {
                            this.$store.commit('setToken', res.data.data);
                            console.log('to desk')
                            this.$router.push({path: '/desk'})
                        } else {//提示错误信息，跳转到绑定界面
                            console.log('to login')
                            this.$router.push({path: '/login'})
                        }
                    })
            }

        },
        mounted() {
            this.check()
        }
    }
</script>

<style scoped>

</style>