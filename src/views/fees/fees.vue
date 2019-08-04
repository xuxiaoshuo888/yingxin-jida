<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="pad20">
            <div class="title1">
                学杂费条目
            </div>
            <div class="fee-content">
                <div class="fee-contain border-bottom" v-for="item in payList">
                    <div>{{item.xmmc}}</div>
                    <div class="fee-item">
                        <div class="fee-title">应收金额</div>
                        <div class="fee-body">{{item.ysje}}元</div>
                    </div>
                    <div class="fee-item">
                        <div class="fee-title">欠费金额</div>
                        <div class="fee-body">{{item.qfje}}元</div>
                    </div>
                </div>
                <div class="fee-contain border-bottom">
                    <div class="fee-item fee-total">
                        <div class="fee-title" style="font-size: 16px">总计</div>
                        <div class="fee-body color-theme" style="font-size: 24px">￥{{total}}元</div>
                    </div>
                </div>
                <!--                <div class="fee-contain">-->
                <!--                    <div>贷款信息</div>-->
                <!--                    <div class="fee-item" v-for="item in loan">-->
                <!--                        <div class="fee-title">{{item.loanyh}}</div>-->
                <!--                        <div class="fee-body">{{item.sqje}}</div>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div class="fee-contain border-top">-->
                <!--                    <div>缓交信息</div>-->
                <!--                    <div class="fee-item" v-for="(item,index) in postpone">-->
                <!--                        <div class="fee-title">{{index}}</div>-->
                <!--                        <div class="fee-body">{{item.hjje}}</div>-->
                <!--                    </div>-->
                <!--                    <div class="fee-item fee-total">-->
                <!--                        <div>总计</div>-->
                <!--                        <div class="fee-title" style="font-size: 16px">学杂费</div>-->
                <!--                        <div class="fee-body color-theme" style="font-size: 24px">￥10086.00</div>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>
        </div>
        <!--<div class="pad20">-->
            <!--<div class="title2">请选择支付方式</div>-->
            <!--<van-radio-group v-model="payWay">-->
                <!--<van-radio name="CCB" checked-color="#06BEBD" class="radio-item">中国建设银行</van-radio>-->
                <!--<van-radio name="BOC" checked-color="#06BEBD" class="radio-item">中国银行</van-radio>-->
                <!--<van-radio name="ALIPAY" checked-color="#06BEBD" class="radio-item">支付宝</van-radio>-->
                <!--<van-radio name="WEPAY" checked-color="#06BEBD" class="radio-item">微信支付</van-radio>-->
            <!--</van-radio-group>-->
        <!--</div>-->
        <div class="info">
            <div>温馨提示</div>
            <div>由于考虑都手机端支付安全问题，学杂费缴纳请统一到PC（电脑）端进行缴费。</div>
        </div>
        <!--<div class="btn-contain">-->
            <!--<van-button type="info" size="large" class="button-bg">-->
                <!--确认-->
            <!--</van-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 缴纳学杂费
     */
    import goBack from '@/components/goBack'

    export default {
        name: "fees",
        data() {
            return {
                title: '缴纳学杂费',
                payWay: 'ALIPAY',
                loan: [],//贷款信息
                payList: [],//学杂费条目
                postpone: [],//缓交信息
                //总计= 学杂费-贷款-缓交
                total: 0
            }
        },
        components: {goBack},
        methods: {
            getInfo() {//获取缴费信息
                this.$ajax.get('/school_fees_api/fees').then(res => {
                    this.payList = res.data.data.payList
                    this.loan = res.data.data.loan
                    this.postpone = res.data.data.postpone
                    this.$toast.clear()
                    let total = 0
                    for (let i = 0; i < this.payList.length; i++) {
                        total += this.payList[i].qfje
                    }
                    this.total = total
                })
            },
        },
        mounted() {
            this.getInfo()
        }
    }
</script>

<style scoped>
    .fee-content {
        background: url("../../assets/img/wave.png") no-repeat scroll bottom;
        background-size: 100% auto;

    }
</style>