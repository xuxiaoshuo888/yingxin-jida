<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div style="text-align: center;padding-top: 30px;">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'
    import QRcode from 'qrcode'

    export default {
        name: "qrcode",
        components: {goBack},
        data() {
            return {
                code: "",
                bg: 'blue',
                title: '我的二维码'
            }
        },
        mounted() {
            this.code = this.$route.query.qrcode
            console.log(this.code)
            let _this = this
            var canvas = document.getElementById('canvas')
            let options = {
                width: '300'
            }
            QRcode.toCanvas(canvas, _this.code, options, function (error) {
                if (error) console.error(error)
                console.log('success!');
            })
        }
    }
</script>

<style scoped>

</style>