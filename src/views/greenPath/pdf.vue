<template>
    <div>
        <go-back :title="title" :bg="bg"></go-back>
        <div style="padding: 40px 10px 0;">
            <div class="pdf-header1">
                吉林大学新生绿色通道申请审批办法
            </div>
            <div class="pdf-header2">
                （校发[2018] 625号）
            </div>
            <div class="paragraph">
                <div>第一条 为保证家庭经济困难新生顺利入学，根据上级有关
                    文件精神和要求，结合学校实际，制定本办法。
                </div>
                <div>第二条 绿色通道适用于被我校正式录取的全日制新生，帮
                    助家庭经济特别困难新生在缓交全部或部分学费、住宿费的情况
                    下先办理报到手续。
                </div>
                <div>第三条 申请条件
                </div>
                <div>（一）建档立卡贫困家庭学生、最低生活保障家庭学生、特
                    困供养学生、孤残学生、烈士子女、家庭经济困难残疾学生及残
                    疾人子女等，且本人及其家庭经济能力不能满足在校期间学习、
                    生活基本支出；
                </div>
                <div>（二）上款所列人员及其它城乡低收入家庭学生，本人及其
                    家庭经济能力难以满足在校期间学习、生活基本支出；
                </div>
                <div>（三）因本人或家庭成员遇有重大疾病、重大自然灾害或意
                    外事故等突发事件，学生本人及其家庭短时间内所能筹集到的资
                    金，难以满足当前的学习、生活基本支出；
                </div>
                <div>（四）因其他特殊原因，导致家庭经济特别困难，报到期间
                    不能支付全部学费、住宿费等费用的新生。
                </div>
                <div> 第四条 申请及审批程序</div>
                <div>（一）经济困难学生凭本人身份证、吉林大学新生录取通知
                    书，加盖乡(镇、街道)级或以上政府、民政部门公章的《高等学
                    校学生及家庭情况调查表》（或“贫困证明”），向报到学院提出
                    书面申请；
                </div>
                <div>（二）学院初审同意后，新生本人填写“吉林大学新生绿色
                    通道”申请表，由学院主管学生工作党委副书记签字并加盖学院
                    公章；
                </div>
                <div>（三）学生将《吉林大学新生入学绿色通道审批表》交至学
                    校在新生报到场地设立的绿色通道服务站进行审批；
                </div>
                <div>（四）经学校审批同意后，学生本人将《吉林大学新生入学
                    绿色通道审批表》交回学院新生报到处，继续办理其他入学手续。
                </div>
                <div>第五条 新生入学后，经进一步核实困难情况，根据困难程
                    度给予国家助学贷款、学费减免、困难补助及勤工助学岗位等帮 扶。经核实不符合资助条件的，应交齐入学所需各项费用。
                </div>
                <div>第六条 学校和学院为申请绿色通道学生提供主动热情的服
                    务，除同意其缓交相关费用先行办理入学手续外，应主动帮助其
                    解决学习、生活中存在的其他困难。
                </div>
                <div>第七条 本办法由学生工作部（处）负责解释。</div>
                <div>第八条 本办法自公布之日起施行，原《吉林大学新生绿色
                    通道实施办法》（校发[2014]174 号）同时废止。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import goBack from '@/components/goBack'

    export default {
        name: "pdf",
        components: {goBack},
        data() {
            return {
                bg: 'blue',
                title: '吉林大学新生绿色通道申请审批办法'
            }
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

    .pdf-header2 {
        font-size: 20px;
        color: #000;
        text-align: center;
    }

    .paragraph {
        margin-top: 20px;
        margin-bottom: 50px;
        padding: 10px;
        background-color: rgba(238,238,238,0.5);
        border: 1px solid #bfbfbf;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }

    .paragraph > div {
        text-indent: 18px;
        line-height: 1.8;
    }
</style>