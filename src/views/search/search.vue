<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <van-cell-group>
            <van-field
                    v-model="xh"
                    required
                    clearable
                    left-icon="user-o"
                    label="学号"
                    placeholder="请输入学号"
            />

            <van-field
                    v-model="mm"
                    type="password"
                    label="密码"
                    left-icon="eye-o"
                    placeholder="请输入密码"
                    required
                    error-message="提示：身份证号后6位,如有X则大写"
            />
            <van-field
                    v-model="yzm"
                    center
                    left-icon="eye-o"
                    required
                    clearable
                    label="验证码"
                    placeholder="请输入验证码"
            >
                <!--<van-button slot="button" size="small" type="default" style="min-width: 80px;">{{yzm_origin}}-->
                <!--</van-button>-->
                <div slot="button" class="yzm" @click="refresh_yzm">{{yzm_origin}}</div>
            </van-field>
        </van-cell-group>
        <div class="btn-contain">
            <van-button type="info" size="large" class="button-bg" @click="search">
                查询
            </van-button>
        </div>
        <div v-if="show_result">
            <van-cell-group>
                <van-cell title="姓名" :value="info.xm" icon="location-o"/>
                <van-cell title="学号" :value="info.xh" icon="location-o"/>
                <van-cell title="性别" :value="info.sex" icon="location-o"/>
                <van-cell title="院系" :value="info.xy" icon="location-o"/>
                <van-cell title="专业" :value="info.zy" icon="location-o"/>
                <van-cell title="班级" :value="info.bj" icon="location-o"/>
                <van-cell title="当前寝室" :value="info.fullname" icon="location-o"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'
    // import {Field, Cell, CellGroup} from 'vant';
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    export default {
        name: "search",
        components: {goBack},
        data() {
            return {
                bg: 'blue',
                title: '宿舍查询',
                xh: '',
                mm: '',
                yzm: '',//用户输入的验证码
                yzm_origin: '',//随机生成的验证码
                info: {
                    xm: '',
                    xh: '',
                    sex: '',
                    xy: '',
                    zy: '',
                    bj: '',
                    fullname: ''
                },
                show_result:false,//是否展示查询结果
            }
        },
        methods: {
            search() {//查询宿舍
                //判空查询条件
                this.show_result = false
                if (!this.xh.trim()) {
                    this.$toast("请填写学号")
                    return
                }
                if (!this.mm.trim()) {
                    this.$toast("请填写密码")
                    return
                }
                if (!this.yzm.trim()) {
                    this.$toast("请填写验证码")
                    return
                }
                //验证码通过后再请求后台
                let yzm = this.yzm
                if (yzm.toLocaleLowerCase() !== this.yzm_origin) {
                    this.$toast("验证码错误")
                    this.refresh_yzm()
                    this.yzm = ''
                    return
                }
                this.$ajax.post('/dorm_api/room_info',
                    {
                        username: this.xh,
                        card: this.mm
                    }).then(res => {
                    console.log(res)
                    this.info = res.data.data
                    this.yzm = ''
                    this.refresh_yzm()
                    this.show_result = true
                }).catch(err => {
                    this.show_result = false
                    this.$toast(err)
                })

            },
            refresh_yzm() {//刷新验证码
                this.generate_yzm()
            },
            generate_yzm() {//生成验证码
                let yzm = []
                for (let i = 0; i <= 3; i++) {
                    let randomIndex = parseInt(alphabet.length * Math.random())
                    yzm.push(alphabet[randomIndex])
                }
                this.yzm_origin = yzm.join("")
            }
        },
        mounted() {
            this.generate_yzm()
        }
    }
</script>

<style scoped lang="scss">
    .yzm {
        text-align: center;
        letter-spacing: 5px;
        color: black;
        font-size: 16px;
        font-style: italic;
        text-shadow: 3px 3px 3px black;
    }
</style>