<template>
    <div>
        <el-form ref="form" label-width="80px" style="padding: 10px;">
            <el-form-item label="始发站">
                <el-select
                        v-model="start_value"
                        filterable
                        clearable
                        remote
                        :loading="loading1"
                        :remote-method="getStations"
                        placeholder="请输入">
                    <el-option
                            v-for="item in start"
                            :key="item.codeitemid"
                            :label="item.codeitemname"
                            :value="item.codeitemname">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="终点站">
                <el-select
                        v-model="end_value"
                        filterable
                        clearable
                        :loading="loading2"
                        remote
                        :remote-method="getStations2"
                        placeholder="请输入">
                    <el-option
                            v-for="item in end"
                            :key="item.codeitemid"
                            :label="item.codeitemname"
                            :value="item.codeitemname">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="info">
            <div>注意事项：</div>
            <div style="text-indent: 25px;">火车票优惠卡又称火车票学生优惠卡、学生购票优惠卡，是学生购买火车票打折用的卡，贴在学生证的后面。只有买了这个卡才能享受学生优惠。当你寒暑假往返家庭住地与学校区间须乘坐火车的，也可以凭此卡享受优惠。</div>
        </div>
        <div class="btn-contain">
            <van-button type="info" size="large" class="button-bg" @click="save">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
    /*
    火车优惠卡
     */
    export default {
        name: "hcyhk",
        data() {
            return {
                start: [],//始发站
                end: [],//终点站
                start_value: "",//选定的开始站
                end_value: "",//选定的结束站
                loading1: false,
                loading2: false,
            }
        },
        methods: {
            getStations(arg) {
                if (arg.trim() != '') {
                    this.loading1 = true
                    this.$ajax.get('/train_card_api/stations', {
                        params: {name: arg}
                    }).then(res => {
                        this.loading1 = false
                        this.start = res.data.data
                    })
                }
            },
            getStations2(arg) {
                if (arg.trim() != '') {
                    this.loading2 = true
                    this.$ajax.get('/train_card_api/stations', {
                        params: {name: arg}
                    }).then(res => {
                        this.loading2 = false
                        this.end = res.data.data
                    })
                }
            },
            save() {
                if (this.start_value.trim() != '' && this.end_value.trim() != '') {
                    this.$ajax.get('/train_card_api/save', {
                        params: {start: this.start_value, end: this.end_value}
                    }).then(res => {
                        this.loading2 = false
                        this.end = res.data.data
                        this.$toast(res.data.data)
                    })
                }else{
                    this.$toast('请填写始发站和终点站!')
                }
            }
        },
        mounted() {
            // this.getStations()

        }
    }
</script>

<style scoped>

</style>