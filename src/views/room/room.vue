<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div class="blue-top-bg">
            <div class="band roomdiv">
                <div class="title2">
                    <img src="@/assets/img/2.png" alt="">&nbsp;
                    &nbsp;<span class="mid-span">考生号：</span>
                    <div>{{room.ksh || '暂无数据'}}</div>
                </div>
                <div class="title2">
                    <img src="@/assets/img/2.png" alt="">&nbsp;
                    &nbsp;<span class="mid-span">学号：</span>
                    <div>{{room.xh || '暂无数据'}}</div>
                </div>
                <div class="title2">
                    <img src="@/assets/img/2.png" alt="">&nbsp;
                    &nbsp;<span class="mid-span">姓名：</span>
                    <div>{{room.xm || '暂无数据'}}</div>
                </div>
                <div class="title2">
                    <img src="@/assets/img/2.png" alt="">&nbsp;
                    &nbsp;<span class="mid-span">住宿信息：</span>
                    <div>{{room.zsxx || '暂无数据'}}</div>
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
                room: {},//当前宿舍信息
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
                    if (res.data.data && res.data.data.zsxx) {
                        this.saveRecord()
                    }
                })
            },
            saveRecord() {
                this.$ajax.post('/dorm_api/save_record')
            }
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

    .mid-span {
        /*display: inline-block;*/
        /*width: 100px;*/
        /*text-align-last:justify;*/
    }

    .roomdiv > div {
        margin-bottom: 10px;
    }

    .roomdiv > div > div {
        padding-top: 5px;
        padding-bottom: 0px;
        text-indent: 28px;
    }
</style>