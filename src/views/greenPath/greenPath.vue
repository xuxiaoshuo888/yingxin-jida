<template>
    <div>
        <go-back :title="title"></go-back>
        <div class="pad20">
            <div class="index-list-div" @click="onShow">
                <div class="left-head">缓交方式</div>
                <div class="right-content">{{type || '点击选取'}} ›</div>
            </div>
            <div v-if="type == '办理生源地贷款'" class="index-list-div" @click="onShow_bank">
                <div>贷款银行</div>
                <div>{{bank || '点击选取'}} ›</div>
            </div>
            <van-cell-group>
                <van-field
                        v-if="type == '办理生源地贷款'"
                        v-model="code"
                        center
                        clearable
                        label-align="left"
                        input-align="right"
                        :label="bank == '其他银行' ? '银行名称' : '回执验证码' "
                        placeholder="请输入"
                >
                </van-field>
            </van-cell-group>
            <!--            <div class="index-list-div">-->
            <van-cell-group>
                <van-field
                        v-model="je"
                        label="金额"
                        type="number"
                        placeholder="请输入"
                        input-align="right"
                />
            </van-cell-group>
            <!--            </div>-->
            <!--缓交方式-->
            <van-actionsheet
                    v-model="show"
                    :actions="chooseList"
                    cancel-text="取消"
                    @select="onSelect"
            />
            <!--贷款银行-->
            <van-actionsheet
                    v-if="type == '办理生源地贷款'"
                    v-model="show_bank"
                    :actions="banList"
                    cancel-text="取消"
                    @select="onSelectBank"
            />
            <!---->
            <van-cell-group v-if="type == '办理生源地贷款'">
                <van-field
                        v-model="reason"
                        label="原因"
                        type="textarea"
                        placeholder="请输入原因"
                        rows="1"
                        :autosize='heightRange'
                />
            </van-cell-group>
        </div>
        <div class="info">
            <div>温馨提示</div>
            <div>（1）助学贷款分为生源地助学贷款和校园地助学贷款，详见《入学须知》。生源地助学贷款为信用贷款，不受名额限制，申请手续简便，放款快，还款方便，推荐优先办理生源地助学贷款。若错过办理生源地助学贷款，可在入学后办理校园地助学贷款（办理时间关注学工处学生资助中心通知）。</div>
            <div>（2）助学贷款待经办银行放款后，学校财务处将统一进行学费和住宿费的扣缴工作，如有余额，打入学生个人中国银行卡账户。</div>
            <div>（3）学生申请助学贷款最高金额为8000元/年，若学费和住宿费高于8000元，请学生登录校园统一支付平台（http://pay.cug.edu.cn/xysf/）自助缴纳高出部分，助学贷款仅限于缴纳学费和住宿费，新生还需缴纳代收费（一卡通生活费、体检费等），请自行登录校园统一支付平台缴纳。</div>
        </div>
        <div class="btn-contain">
            <van-button type="info" size="large" class="button-bg" @click="save">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
    /**
     * @author Xus
     * @date 2019/5/6
     * @Description: 绿色通道
     */
    import goBack from '@/components/goBack'
    import {Actionsheet, Field} from 'vant'

    export default {
        name: "greenpath",
        data() {
            return {
                title: '绿色通道',
                myInfo: {},//用户信息
                bank: '',//当前选中的银行
                type: '',//当前选中的缓交方式
                chooseList: [//缓交方式
                    {name: '国家助学贷款'},
                    {name: '生源地贷款'},
                    {name: '其他'}
                ],
                banList: [
                    {name: '招商银行', id: ''},
                    {name: '建设银行', id: ''},
                    {name: '中国银行', id: ''}
                ],
                yzm: '回执验证码',
                je:'',
                show: false,//控制缓交方式actionsheet展示与否
                show_bank: false,//控制银行列表展示与否
                code: '',//验证码
                reason: "",//原因
                heightRange: {maxHeight: 500, minHeight: 150}
            }
        },
        components: {
            goBack,
            [Actionsheet.name]: Actionsheet,
            [Field.name]: Field
        },
        methods: {
            onShow() {
                this.show = true
            },
            onShow_bank() {
                this.show_bank = true
            },
            onSelect(e) {
                this.type = e.name
                this.show = false
            },
            onSelectBank(e) {
                this.bank = e.name
                this.show_bank = false
            },
            getInfo() {//获取银行列表以及缓交方式
                this.$ajax.get('/green_channel_api/banks_and_type').then(res => {
                    this.$toast.clear()
                    let bank = res.data.data.bank
                    let type = res.data.data.type
                    for (let i = 0; i < bank.length; i++) {
                        bank[i].name = bank[i].codeitemname
                    }
                    for (let i = 0; i < type.length; i++) {
                        type[i].name = type[i].codeitemname
                    }
                    this.banList = bank
                    this.chooseList = type
                })
            },
            getInfo2() {//获取学生的贷款信息
                this.$ajax.get('/green_channel_api/lorn').then(res => {
                    this.$toast.clear()
                    this.myInfo = res.data.data[0]
                })
            },
            save() {//保存绿色通道信息信息
                this.$ajax.post('/green_channel_api/save', {
                    amount:this.je,
                    bankName:this.bank,
                    loanCode:this.code,
                    remark:this.reason
                }).then(res => {
                    this.$toast(res.data.data)
                })
            }
        },
        mounted() {
            this.getInfo()
            this.getInfo2()
        }
    }
</script>

<style scoped lang="css">
    /*
      覆盖vant原生样式
       */
    .van-cell {
        padding: 24px 16px !important;
        font-size: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    }

    input {
        text-align: right !important;
    }

    .van-field__body input{
        text-align: right !important;
    }
</style>