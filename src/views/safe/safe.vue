<template>
    <div class="contain">
        <go-back :title="title"></go-back>
        <video controls="" autoplay width="100%" height="auto" name="media">
            <source src="http://202.114.207.128/wx/img/aqjy.mp4" type="video/mp4">
            你的浏览器不支持H5播放器
        </video>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "safe",
        components: {goBack},
        data() {
            return {
                title: "安全教育"
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .contain {
        padding: 20px;
        margin: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>