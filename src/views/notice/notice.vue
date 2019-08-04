<template>
    <div class="blue-top-bg" style="margin-top: -45px;">
        <div class="bg-blue-band" style="min-height: 300px">
            <!--            style="background-color: white;margin: 0 20px;"-->
            <div class="info-band">
                <div class="name-band">
                    <div class="name">{{xm}}</div>
                    <div class="notice">欢迎你，请完成填写！</div>
                </div>
                <img class="potrait" src="@/assets/img/Photo.png" alt="">
            </div>
            <div class="notice">
                <p><span style="color: red;">*</span>注意事项</p>
                <p v-html="text"></p>
            </div>

        </div>
        <div class="fixed-bottom">
            <div class="pad20 read">
                <van-checkbox v-model="radio" checked-color="#06BEBD">我已认真阅读上述信息</van-checkbox>
            </div>
            <div class="btn-contain">
                <van-button plain type="danger" size="large" hairline @click="logout">
                    上面不是我的信息
                </van-button>
                <van-button type="info" :disabled="!radio" size="large" class="button-bg" @click="updateRead()">
                    开始报道
                </van-button>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 首页
     */
    /*
    1、从cookie中读取用户信息
    2、点击开始报道，请求接口，标识已读，跳转到desk
     */
    import goBack from '@/components/goBack'

    export default {
        name: "desk",
        data() {
            return {
                xm:"",
                title: '自助迎新',
                radio: false,
                name: '',
                photo: '',
                text: ''
            }
        },
        components: {goBack},
        methods: {
            init_name(){
                this.xm = this.$store.state.stdInfo.xm
            },
            getText() {
                this.$ajax.post('/notice').then(res => {
                    this.text = res.data.data.configvalue
                })
            },
            updateRead() {
                this.$ajax.post('/update_read_status').then(res => {
                    if (res.data.errcode == 0) {
                        this.$toast(res.data.errmsg)
                        this.$router.push('/desk')
                    } else {
                        this.$toast(res.data.errmsg)
                    }
                })
            },
            logout(){
                this.$toast("请联系管理员！")
                setTimeout(()=>{
                    this.$router.push('/')
                },3000)
            }
        },
        mounted() {
            this.getText()
            this.init_name()
        }
    }
</script>

<style scoped type="text/css">
    .read {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(168, 182, 200, 1);
        background-color: white;
    }

    body {
        background: url("../../assets/img/Topbar.png") no-repeat scroll;
        background-size: 100% auto;
    }
</style>