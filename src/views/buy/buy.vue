<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div style="padding-top:50px;">
            <a href="http://www.taobao.com" target="_blank">点击链接跳转购买生活用品</a>
        </div>
    </div>
</template>

<script>
    // 买生活用品
    import goBack from '@/components/goBack'

    export default {
        name: "buy",
        components: {goBack},
        data() {
            return {
                title:'购买生活用品',
                bg:'bg-blue'
            }
        }
    }
</script>

<style scoped>

</style>