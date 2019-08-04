<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="block-contain">
            <span class="block block-active">1栋</span>
            <span class="block" v-for="i in 10">3栋</span>
        </div>
        <div style="padding-top: 70px;">
            <van-row gutter="20" class="floor-contain" v-for="k in 3">
                <van-col span="12" v-for="j in 7" class="room-contain">
                    <div class="room" @click="chooseBed">
                        <div class="room-name">601</div>
                        <div class="room-bed">
                            <div v-for="i in 6">
                                <img src="@/assets/img/bed-empty-small.png" alt="">
                            </div>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <!--弹出层-->
        <van-popup v-model="showPop" class="pop">
            <!--床位框-->
            <div class="room">
                <div class="room-name">601</div>
                <div class="room-bed">
                    <div v-for="i in 6">
                        <img src="@/assets/img/bed-empty-big.png" alt="">
                    </div>
                </div>
            </div>
            <div class="show-bed-name">栋-601-1号床</div>
            <div class="pop-btn-contain">
                <div class="btn-contain">
                    <van-button type="info" size="large" class="button-bg" @click="confirmBed">
                        确认
                    </van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "roomList",
        data() {
            return {
                title: '选择宿舍',
                showPop: false
            }
        },
        components: {goBack},
        methods: {
            chooseBed() {//选床位
                this.showPop = true
            },
            confirmBed() {
                this.showPop = false
            },
            getList() {
                this.$ajax.get('/dorm_api/rooms').then(res => {
                    this.room = res.data.data
                })
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped type="text/scss">

</style>