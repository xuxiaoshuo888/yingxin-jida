<template>
    <div class="blue-top-bg">
        <go-back :title="title" :bg="bg"></go-back>
        <div class="bg-blue-band">
            <div class="info-band">
                <div class="name-band">
                    <div class="name">{{xm}}</div>
                    <div class="notice">欢迎你，请完成填写！</div>
                </div>
                <img class="potrait" src="@/assets/img/Photo.png" alt="">
            </div>
            <div class="index-list-div" @click="toDetail(item.stepid)" v-for="(item,index) in planList" :key="index">
                <div>{{item.stepname}}
                    <!--<van-icon class="state-icon" :name="item.flag ? 'checked' : 'info'"></van-icon>-->
                    <img class="state-icon" v-if="item.status === '1'" src="@/assets/img/right.png" alt="">
                    <img class="state-icon" v-else src="@/assets/img/warn.png" alt="">
                </div>
                <img v-if="index == 0" src="../../assets/img/1.png">
                <img v-else-if="index == 1" src="../../assets/img/8.png">
                <img v-else-if="index == 2" src="../../assets/img/3.png">
                <img v-else-if="index == 3" src="../../assets/img/4.png">
                <img v-else-if="index == 4" src="../../assets/img/5.png">
                <img v-else-if="index == 5" src="../../assets/img/6.png">
                <img v-else-if="index == 6" src="../../assets/img/7.png">
                <img v-else-if="index == 7" src="../../assets/img/8.png">
                <img v-else-if="index == 8" src="../../assets/img/9.png">
                <img v-else src="../../assets/img/1.png">
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
    import goBack from '@/components/goBack'

    export default {
        name: "desk",
        data() {
            return {
                xm:"",
                bg: 'blue',
                title: '自助迎新',
                list: [
                    // {name: '缴纳学杂费', icon: '@/assets/img/1.png', flag: true, path: '/fees'},
                    // {name: '选宿舍', icon: '@/assets/img/2.png', flag: false, path: '/room'},
                    // {name: '绿色通道', icon: '@/assets/img/3.png', flag: false, path: '/greenPath'},
                    // {name: '一卡通充值', icon: '@/assets/img/4.png', flag: true, path: '/card'},
                    // {name: '购买生活用品', icon: '@/assets/img/5.png', flag: true},
                    // {name: '军训服装', icon: '@/assets/img/6.png', flag: true, path: '/clothes'},
                    // {name: '个人信息', icon: '@/assets/img/7.png', flag: true},
                    // {name: '户口迁移', icon: '@/assets/img/8.png', flag: true},
                    // {name: '抵校登记', icon: '@/assets/img/9.png', flag: true, path: '/regist'}
                ],
                planList: []
            }
        },
        components: {goBack},
        methods: {
            getStdInfo() {//获取学生信息
                this.$ajax.post('/student/find').then(res => {
                    console.log(res.data)
                })
            },
            toDetail(stepid) {//通过stepid进行跳转
                switch (stepid) {
                    case 'base'://基本信息
                        this.$router.push('/person');
                        break;
                    case 'hcyhk'://火车优惠卡
                        this.$router.push('/hcyhk');
                        break;
                    case 'bdxx'://抵校登记
                        this.$router.push('/regist');
                        break;
                    case 'room'://选宿舍
                        this.$router.push({path: '/room', query: {}});
                        break;
                    case 'pay'://费用信息
                        this.$router.push('/fees');
                        break;
                    case 'green'://绿色通道
                        this.$router.push('/greenPath');
                        break;
                    case 'jxfff'://军训服选择
                        this.$router.push('/clothes');
                        break;
                    case 'dept'://院系报道
                        this.$router.push('/');
                        break;
                    case 'jffs'://缴费方式
                        this.$router.push('/');
                        break;
                    case 'aqjy'://安全教育
                        this.$router.push('/safe');
                        break;
                }
            },
            getHj() {//获取环节信息
                // console.log(this.$store.state.stdInfo)
                this.xm = this.$store.state.stdInfo.xm
                let planId = this.$store.state.stdInfo.planid
                let studentId = this.$store.state.stdInfo.studentid
                this.$ajax.get('/plan_step_api/steps', {
                    params: {
                        planId: planId,
                        studentId: studentId
                    }
                }).then(res => {
                    this.$toast.clear()
                    this.planList = res.data.data
                })
            },
            getConfig() {//测试
                let id = 'SCHOOL_NAME'
                this.$ajax.get('/help_api/configs/' + id).then(res => {
                    console.log(res.data)
                    this.$toast.clear()
                })
            }
        },
        mounted() {
            // this.getStdInfo()
            this.getHj()
            this.getConfig()
        }
    }
</script>

<style scoped lang="scss">
    /*.blue-top-bg {*/
    /*    background: url("../../assets/img/Topbar.png") no-repeat fixed;*/
    /*    background-size: 100% auto;*/
    /*}*/

</style>