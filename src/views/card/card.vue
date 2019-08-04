<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="pad20">
            <div class="fee-content">
                <div class="title1">
                    收费信息
                </div>
                <div class="fee-contain border-top">
                    <div class="fee-item" v-for="i in 4">
                        <div class="fee-title">学杂费</div>
                        <div class="fee-body">￥10086.00</div>
                    </div>
                </div>
            </div>
            <div class="fee-content">
                <div class="title1">
                    收费信息
                </div>
                <div class="fee-contain border-top">
                    <div class="fee-item" v-for="i in 3">
                        <div class="fee-title">学杂费</div>
                        <div class="fee-body">￥10086.00</div>
                    </div>
                </div>
            </div>
            <div class="fee-content">
                <div class="title1">
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
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "card",
        data() {
            return {
                title:'一卡通充值'
            }
        },
        components: {goBack},
    }
</script>

<style scoped>

</style>