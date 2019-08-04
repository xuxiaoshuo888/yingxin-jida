<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="pad20">
            <div class="title1">
                军训服装信息
            </div>
            <div class="fee-content">
                <div class="title2">
                    服装尺码
                </div>
                <div class="fee-contain border-top">
                    <van-radio-group v-model="radio">
                        <div class="fee-item" v-for="i in 7">
                            <div class="fee-title">
                                <van-radio :name="i"  checked-color="#06BEBD">单选框 {{i}}</van-radio>
                            </div>
                            <div class="fee-body">￥10086.00</div>
                        </div>
                    </van-radio-group>
                </div>
            </div>
            <div class="fee-content">
                <div class="title2">
                    收费信息
                </div>
                <div class="fee-contain border-top">
                    <div style="padding: 30px 0;">
                        <van-slider
                                v-model="value"
                                active-color="#06BEBD"
                                bar-height="4px"
                                :max="max"
                                :min='min'
                                inactive-color="#A8B6C8">
                            <div slot="button" class="slider-button">{{ value }}</div>
                        </van-slider>
                    </div>
                    <div>{{value}} 码</div>
                </div>
            </div>
            <div class="fee-content">
                <div class="title2">
                    收费信息
                </div>
                <div class="fee-contain border-top">
                    <div class="fee-item" v-for="i in 2">
                        <div class="fee-title">学杂费</div>
                        <div class="fee-body">￥10086.00</div>
                    </div>
                    <div class="fee-item fee-total">
                        <div class="fee-title" style="font-size: 16px">学杂费</div>
                        <div class="fee-body color-theme" style="font-size: 24px">￥10086.00</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <div>温馨提示</div>
            <div>1.缴纳学杂费前先开通建设银行网银。</div>
            <div>2.请按照页面显示的步骤先后完成报到。</div>
            <div>3.缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。</div>
            <div>4.请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。</div>
        </div>
        <div class="btn-contain">
            <van-button type="info" size="large" class="button-bg">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "clothes",
        data() {
            return {
                title: '选择军训服装',
                radio: 1,
                value: 33,
                max: 100,
                min: 0,
            }
        },
        components: {goBack},
    }
</script>

<style scoped>
    .title2 {
        padding: 10px;
    }
</style>