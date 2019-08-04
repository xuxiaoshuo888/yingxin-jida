<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div class="blue-top-bg">
            <div class="band">
                <div class="title1">当前选择</div>
                <div class="title2">
                    <img src="@/assets/img/2.png" alt="">&nbsp;&nbsp;&nbsp;<span>{{room.aptzone}}校区-{{room.apartment}}栋-{{room.floor}}-{{room.bedroom}}室-{{room.bedid}}床</span>
                </div>
            </div>
        </div>
        <!--<div class="fixed-bottom">-->
            <!--<div class="btn-contain">-->
                <!--<van-button type="default" plain size="large" @click="toRoomList">-->
                    <!--重新选择-->
                <!--</van-button>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 选宿舍
     */
    import goBack from '@/components/goBack'

    export default {
        name: "room",
        components: {goBack},
        data() {
            return {
                bg: 'blue',
                title: '选择宿舍',
                room:'',//当前宿舍信息
            }
        },
        methods: {
            toRoomList() {
                this.$router.push('roomList')
            },
            //获取学生的住宿信息
            getStep() {
                this.$ajax.get('/dorm_api/dorm_info').then(res => {
                    this.room = res.data.data
                })
            },
            // getGongyu() {//公寓信息
            //     this.$ajax.get('/dorm_api/apartments').then(res => {
            //         console.log(res.data)
            //     })
            // },
            // getStep() {
            //     this.$ajax.get('/dorm_api/dorm_info').then(res => {
            //         console.log(res.data)
            //     })
            // },
            // getStep() {
            //     this.$ajax.get('/dorm_api/dorm_info').then(res => {
            //         console.log(res.data)
            //     })
            // }
        },
        mounted() {
            this.getStep()
        }
    }
</script>

<style scoped type="text/css">
    .band {
        box-shadow: 0px 0px 40px 0px rgba(62, 107, 103, 0.16);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        padding: 20px;
        min-height: 300px;
        background-color: rgba(255, 255, 255, 1);
        background: url("../../assets/img/bg.png") no-repeat scroll bottom;
        background-size: 100% auto;
    }
</style>