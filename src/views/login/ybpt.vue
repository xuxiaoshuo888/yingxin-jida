<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div style="padding: 40px 10px 0;">
            <div class="pdf-header1">高校新生入驻易班</div>
            <div class="paragraph">
                <div style="text-indent: 0">各位新同学：</div>
                <div>为深入学习贯彻习近平总书记系列重要讲话精神和中央领导关于推进易班建设的批示精神，
                    进一步发挥网络育人优势，更好为新生提供服务，完成相关报到事宜后，请扫码下载“易班”。
                </div>
                <div class="img-div">
                    <img src="@/assets/img/ybpt/1.png" style="width: 40%;" alt="">
                </div>
                <div>下载后请用个人手机号注册，注册成功后登录易班，会提示去校方认证，请尽快完成认证！</div>
                <div class="img-div">
                    <img src="@/assets/img/ybpt/2.png" alt="">
                </div>
                <div class="img-div">
                    <img src="@/assets/img/ybpt/3.png" alt="">
                </div>
                <div class="img-div">
                    <img src="@/assets/img/ybpt/4.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "ybpt",
        components: {goBack},
        data() {
            return {
                bg: 'blue',
                title: '易班平台',
            }
        },
        mounted() {
            console.log(this.$route.query)
            this.fileName = this.$route.query.fileName
        }
    }
</script>

<style scoped lang="css">
    .pdf-header1 {
        font-size: 22px;
        color: #000;
        text-align: center;
        margin-bottom: 5px;
    }

    .paragraph {
        margin-top: 20px;
        margin-bottom: 50px;
        padding: 10px;

    }

    .paragraph > div {
        text-indent: 34px;
        line-height: 1.8;
    }

    .paragraph > img {
        margin: 20px auto;
        width: 55%;
    }

    .img-div {
        text-align: center;
        text-indent: 0 !important;
    }
</style>