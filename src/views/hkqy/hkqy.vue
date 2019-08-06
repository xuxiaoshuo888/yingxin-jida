<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div style="padding: 50px 10px 0;">
            <el-card v-for="(question,index) in list" :key="index">
                <div slot="header">{{index + 1}}、{{question.kindname}}</div>
                <!--单选-->
                <div v-if="question.kindtype == '1'">
                    <el-radio-group v-model="question.answer">
                        <el-radio v-for="(ans,index) in question.itemList" :key="index" :label="ans.itemid">
                            {{ans.itemname}}
                        </el-radio>
                    </el-radio-group>
                </div>
                <!--多选-->
                <el-checkbox-group v-else-if="question.kindtype == '2'" v-model="question.answerList">
                    <el-checkbox v-for="(ans,index) in question.itemList" :key="index" :label="ans.itemid">
                        {{ans.itemname}}
                    </el-checkbox>
                </el-checkbox-group>
                <!--填空-->
                <div v-else>
                    <el-input v-model="question.answer"></el-input>
                </div>
            </el-card>
            <!--<div class="info">-->
            <!--<div>温馨提示：</div>-->
            <!--<div>由于考虑都手机端支付安全问题，学杂费缴纳请统一到PC（电脑）端进行缴费。</div>-->
            <!--</div>-->
            <div class="btn-contain">
                <van-button type="info" size="large" class="button-bg" @click="submit">
                    提交
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    //户口迁移
    import goBack from '@/components/goBack'

    export default {
        name: "hkqy",
        components: {goBack},
        data() {
            return {
                title: "户口迁移",
                bg: "bg-blue",
                list: [],
                stepId: this.$route.query.stepId,
                planId: this.$route.query.planId,
                ans1: ''
            }
        },
        methods: {
            getList() {//获取list
                this.$ajax.get('/select_kind_api/step_kind', {
                    params: {
                        stepId: this.$route.query.stepId, planId: this.$route.query.planId
                    }
                }).then(res => {
                    console.log(res.data.data)
                    this.list = res.data.data
                    //list-item   kindtype  1-单选   2-多选  -12展示选项  3填空  4 数字  34 不展示
                })
            },
            submit() {
                let m = []
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].kindtype !== '2') {//非多选
                        m.push(`${this.list[i].kindid}:${this.list[i].answer}`)
                    } else {//多选
                        let str = ''
                        if (this.list.answerList.length === 0) {
                            continue;
                        }
                        str += this.list.answerList[0].itemid;
                        for (let j = 1; j < this.list.answerList.length; j++) {
                            str += "," + this.list.answerList[i].itemid
                        }
                        m.push(`${this.list[i].kindid}: ${str}`)
                    }
                }
                this.$ajax.post('/select_kind_api/save',
                    {
                        jsonArray: JSON.stringify(m),
                        stepId: this.stepId,
                        planId: this.planId
                    })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.errcode == '0') {
                            this.$toast({
                                type: 'success',
                                message: res.data.errmsg
                            })
                        }
                    })
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>