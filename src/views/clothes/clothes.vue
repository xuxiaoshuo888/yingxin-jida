<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="pad20">
            <div class="title1">
                军训服装信息
            </div>
            <div class="fee-content" v-for="(item,index) in list" :key="index">
                <div class="title2">
                    {{item.kindname}}
                </div>
                <div class="fee-contain border-top">
                    <!--<van-radio-group v-if="item.kindtype == '1'" v-model="item.answer">-->
                        <!--<div class="fee-item" v-for="(i,index) in itemList" :key="index">-->
                            <!--<div class="fee-title">-->
                                <!--<van-radio :name="i" checked-color="#06BEBD">单选框 {{i}}</van-radio>-->
                            <!--</div>-->
                            <!--<div class="fee-body">￥10086.00</div>-->
                        <!--</div>-->
                    <!--</van-radio-group>-->
                    <!--单选-->
                    <div v-if="item.kindtype == '1'">
                        <el-radio-group v-model="item.answer">
                            <el-radio class="fee-item" v-for="(ans,index) in item.itemList" :key="index" :label="ans.itemid">
                                {{ans.itemname}}
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <!--多选-->
                    <el-checkbox-group v-else-if="item.kindtype == '2'" v-model="item.answerList">
                        <el-checkbox class="fee-item" v-for="(ans,index) in item.itemList" :key="index" :label="ans.itemid">
                            {{ans.itemname}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!--填空-->
                    <div v-else>
                        <el-input v-model="item.answer"></el-input>
                    </div>

                </div>
            </div>
            <!--<div class="fee-content">-->
                <!--<div class="title2">-->
                    <!--收费信息-->
                <!--</div>-->
                <!--<div class="fee-contain border-top">-->
                    <!--<div style="padding: 30px 0;">-->
                        <!--<van-slider-->
                                <!--v-model="value"-->
                                <!--active-color="#06BEBD"-->
                                <!--bar-height="4px"-->
                                <!--:max="max"-->
                                <!--:min='min'-->
                                <!--inactive-color="#A8B6C8">-->
                            <!--<div slot="button" class="slider-button">{{ value }}</div>-->
                        <!--</van-slider>-->
                    <!--</div>-->
                    <!--<div>{{value}} 码</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="fee-content">-->
                <!--<div class="title2">-->
                    <!--收费信息-->
                <!--</div>-->
                <!--<div class="fee-contain border-top">-->
                    <!--<div class="fee-item" v-for="i in 2">-->
                        <!--<div class="fee-title">学杂费</div>-->
                        <!--<div class="fee-body">￥10086.00</div>-->
                    <!--</div>-->
                    <!--<div class="fee-item fee-total">-->
                        <!--<div class="fee-title" style="font-size: 16px">学杂费</div>-->
                        <!--<div class="fee-body color-theme" style="font-size: 24px">￥10086.00</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <!--<div class="info">-->
            <!--<div>温馨提示</div>-->
            <!--<div>1.缴纳学杂费前先开通建设银行网银。</div>-->
            <!--<div>2.请按照页面显示的步骤先后完成报到。</div>-->
            <!--<div>3.缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。缴纳学杂费前先开通建设银行网银。</div>-->
            <!--<div>4.请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。请按照页面显示的步骤先后完成报到。</div>-->
        <!--</div>-->
        <div class="btn-contain">
            <van-button type="info" size="large" class="button-bg" @click="submit">
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
                list:[]
            }
        },
        components: {goBack},
        methods: {
            getData() {
                this.$ajax
                    .get("/clothes_api/kinds", {params: {}})
                    .then(res => {
                        this.list = res.data.data
                    });
            },
            submit() {
                let m = []
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].kindtype !== '2') {//非多选
                        m.push(`${this.list[i].kindid}:${this.list[i].answer}`)
                    } else {//多选
                        let str = ''
                        if (this.list.answerList.length===0) {
                            continue;
                        }
                        str += this.list.answerList[0].itemid;
                        for (let j = 1; j < this.list.answerList.length; j++) {
                            console.log(str)
                            str += ","+this.list.answerList[i].itemid
                        }
                        m.push(`${this.list[i].kindid}: ${str}`)
                    }
                }
                this.$ajax.post('/clothes_api/save', {jsonArray:(JSON.stringify(m)).trim()})
                    .then(res => {
                        console.log(res.data)
                        if(res.data.errcode == '0'){
                            this.$toast({
                                type:'success',
                                message:res.data.errmsg
                            })
                        }
                    })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .title2 {
        padding: 10px;
    }
</style>