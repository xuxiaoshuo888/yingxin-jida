<template>
    <div>
        <go-back :title="title"></go-back>
        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
            <el-tab-pane label="基本信息" name="1">
        <span slot="label">
          基本信息
            <!--<i class="el-icon-warning" style="color:#F56C6C;"></i>-->
        </span>
                <!-- <div class="person-div">
                  <img src="@/assets/img/person.png" alt>
                  <img :src="`/proxy${Info.photo}` || '@/assets/img/person.png'" alt="">
                </div> -->
                <el-form ref="form" :model="Info" size="small">
                    <el-form-item label="姓名:" prop="xm">
                        <div class="item-content">{{Info.xm || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <div class="item-content">{{Info.sfzh || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="考生号:">
                        <div class="item-content">{{Info.ksh || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="学号:">
                        <div class="item-content">{{Info.xh || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <div class="item-content">{{Info.xb || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="民族:">
                        <div class="item-content">{{Info.mz || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="学院:">
                        <div class="item-content">{{Info.deptname || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <div class="item-content">{{Info.majorname || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="班级:">
                        <div class="item-content">{{Info.classname || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="政治面貌:">
                        <div class="item-content">{{Info.zzmm || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="出生年月:">
                        <div class="item-content">{{Info.csrq || '暂无数据'}}</div>
                    </el-form-item>
                    <el-form-item label="入学年月:">
                        <div class="item-content">{{Info.rxny || '暂无数据'}}</div>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="辅导员信息" name="2">
                <el-form ref="form" :model="Info" size="mini">
                    <div v-if="Info.headmaster && Info.headmaster.length > 0">
                        <el-form-item label="" v-for="(item,index) in Info.headmaster" :key="index">
                            <div class="item-content" v-if="item.lx == 'bzr'">
                                <div><van-icon name="manager-o" style="vertical-align: middle;" />  辅导员：{{item.xm}}</div>
                                <div><van-icon name="phone-o" style="vertical-align: middle;" />  联系电话：{{item.tel}}</div>
                            </div>
                        </el-form-item>
                    </div>
                    <div v-else-if="(!Info.headmaster) || (Info.headmaster.length == 0)">
                        <el-form-item label="辅导员:">
                            <div class="item-content">暂无数据</div>
                        </el-form-item>
                    </div>
                    <div v-if="Info.volunteer && Info.volunteer.length > 0">
                        <el-form-item label="" v-for="(item,index) in Info.volunteer" :key="index">
                            <div class="item-content">
                                <div><van-icon name="manager-o" style="vertical-align: middle;" />  志愿者：{{item.xm}}</div>
                                <div><van-icon name="phone-o" style="vertical-align: middle;" />  志愿者：{{item.lxdh}}</div>
                            </div>
                        </el-form-item>
                    </div>
                    <div v-else-if="(!Info.volunteer) || (Info.volunteer.length == 0)">
                        <el-form-item label="志愿者:">
                            <div class="item-content">暂无数据</div>
                        </el-form-item>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="学生信息" name="3" style="height: 1400px;">
                <el-form ref="form_xsxx" :model="Info" :rules="rule_std" size="mini">
                    <el-form-item label="曾用名">
                        <el-input v-model="Info.cym"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="lxdh">
                        <el-input type="number" v-model="Info.lxdh"></el-input>
                    </el-form-item>
                    <el-form-item label="生源地" prop="syd">
                        <el-select
                                v-model="Info.syd"
                                remote
                                filterable
                                clearable
                                placeholder>
                            <el-option
                                    v-for="item in province"
                                    :label="item.codeitemname"
                                    :key="item.codeitemid"
                                    :value="item.codeitemname"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="户口性质" prop="hkxz">
                        <el-select v-model="Info.hkxz" placeholder>
                            <el-option
                                    v-for="item in household"
                                    :label="item.codeitemname"
                                    :key="item.codeitemid"
                                    :value="item.codeitemid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻情况" prop="hjqk">
                        <el-select v-model="Info.hjqk" placeholder>
                            <el-option
                                    v-for="item in marriages"
                                    :label="item.codeitemname"
                                    :key="item.codeitemid"
                                    :value="item.codeitemname"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="所在校区" prop="">-->
                        <!--<el-select v-model="Info.xq" placeholder>-->
                            <!--<el-option-->
                                    <!--v-for="item in campus"-->
                                    <!--:label="item.codeitemname"-->
                                    <!--:key="item.codeitemid"-->
                                    <!--:value="item.codeitemname"-->
                            <!--&gt;</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="户口所在地" prop="hkszd">
                        <el-input v-model="Info.hkszd" placeholder="户口簿上相关信息"></el-input>
                    </el-form-item>
                    <el-form-item label="户口详细地址" prop="hkszdz">
                        <el-input v-model="Info.hkszdz" placeholder="户口簿上相关信息"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭人口数" prop="jtrks">
                        <el-input type="number" v-model="Info.jtrks"></el-input>
                    </el-form-item>
                    <el-form-item label="全年总收入（万元）" prop="nsr">
                        <el-input type="number" v-model="Info.nsr"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="家庭经济情况" required>-->
                    <!--<el-input v-model="Info.jjqk"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="家庭电话" required>-->
                    <!--<el-input type="number" v-model="Info.jtdh"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="家庭现住址" prop="jtzz">
                        <el-input v-model="Info.jtzz"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ号" prop="qqh">
                        <el-input type="number" v-model="Info.qqh"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业中学" prop="byxx">
                        <el-input v-model="Info.byxx"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业学校邮编" prop="byxxyb">
                        <el-input type="number" v-model="Info.byxxyb"></el-input>
                    </el-form-item>
                    <el-form-item label="是否独生子女" prop="sfds">
                        <el-radio-group v-model="Info.sfds">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否烈士子女" prop="sfls">
                        <el-radio-group v-model="Info.sfls">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父母及扶养人有无重大问题:">
                        <el-input type="text" v-model="Info.fmjfyrywzdwt"></el-input>
                    </el-form-item>
                    <el-form-item label="特长:">
                        <el-input type="textarea" autosize v-model="Info.tc"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="困难认定信息" name="4" style="height: 1300px;">
                <el-form ref="form_knrd" :model="knrd" :rules="rule_knrd" size="mini">
                    <el-form-item label="是否贫困家庭" prop="sfpkjt">
                        <el-radio-group v-model="Info.sfpkjt">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="Info.sfpkjt == '是'">
                        <el-form-item label="家庭主要收入来源情况" prop="ztzysrlyqk">
                            <el-input type="textarea" autosize v-model="knrd.ztzysrlyqk"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭是否遭受自然灾害" prop="sfsz">
                            <el-radio-group v-model="knrd.sfsz">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="knrd.sfsz == '是'" label="家庭遭受自然灾害情况" prop="szqk">
                            <el-input type="textarea" autosize v-model="knrd.szqk"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭成员因残疾、年迈而劳动能力弱情况" prop="cjnmldlrqk">
                            <el-input type="textarea" autosize v-model="knrd.cjnmldlrqk"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭欠债情况" prop="qzqk">
                            <el-input type="textarea" autosize v-model="knrd.qzqk"></el-input>
                        </el-form-item>


                        <el-form-item label="学生已获社会资助情况" prop="shzzqk">
                            <el-input type="textarea" autosize v-model="knrd.shzzqk"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭遭受突发意外情况" prop="tfywqk">
                            <el-input type="textarea" autosize v-model="knrd.tfywqk"></el-input>
                        </el-form-item>
                        <el-form-item label="是否孤儿" prop="jtlxsfge">
                            <el-radio-group v-model="knrd.jtlxsfge">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否单亲" prop="jtlxsfdq">
                            <el-radio-group v-model="knrd.jtlxsfdq">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否家庭经济困难残疾学生及残疾人子女" prop="jtlxsfcjxsjcjzn">
                            <el-radio-group v-model="knrd.jtlxsfcjxsjcjzn">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否烈士或优抚对象子女" prop="jtlxsflshyfdxzn">
                            <el-radio-group v-model="knrd.jtlxsflshyfdxzn">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否低保家庭" prop="jtlxsfdbjt">
                            <el-radio-group v-model="knrd.jtlxsfdbjt">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否建档立卡贫困户" prop="jtlxsfjdlkpkh">
                            <el-radio-group v-model="knrd.jtlxsfjdlkpkh">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否特困供养学生" prop="jtlxsftkgyxs">
                            <el-radio-group v-model="knrd.jtlxsftkgyxs">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="其他家庭类型" prop="jtlxqt">
                            <el-radio-group v-model="knrd.jtlxqt">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="入学报到是否存在困难" prop="sfrxbdczkn">
                            <el-radio-group v-model="knrd.sfrxbdczkn">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="knrd.sfrxbdczkn == '是'" label="入学报到困难情况">
                            <el-input type="textarea" autosize v-model="knrd.rxbdczknqk"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="直系家庭成员" name="5">
                <div>
                    父母和未结婚的兄弟姐妹
                    <span @click="addFamily"><i class="el-icon-circle-plus" type="primary"></i>点击新增</span>
                </div>
                <el-carousel
                        :interval="5000"
                        arrow="always"
                        :loop="loop"
                        indicator-position="outside"
                        height="750px"
                        :initial-index="currentIndex_fa"
                >
                    <el-carousel-item v-for="(item,index) in Info.family" :key="index">
                        <div class="chengyuan">
                            <span></span>
                            成员{{index + 1}}
                            <i class="el-icon-delete" @click="deleteFamily(index)"></i>
                        </div>
                        <el-form size="mini">
                            <el-form-item label="姓名">
                                <el-input v-model="item.xm"></el-input>
                            </el-form-item>
                            <el-form-item label="关系">
                                <el-input v-model="item.gx"></el-input>
                            </el-form-item>
                            <el-form-item label="称呼">
                                <el-input type="text" v-model="item.bz"></el-input>
                            </el-form-item>
                            <el-form-item label="政治面貌">
                                <el-input v-model="item.zzmm"></el-input>
                            </el-form-item>
                            <el-form-item label="工作单位">
                                <el-input v-model="item.dw"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input type="number" v-model="item.lxdh"></el-input>
                            </el-form-item>
                            <el-form-item label="职业">
                                <el-input v-model="item.zy"></el-input>
                            </el-form-item>
                            <el-form-item label="月工资（元）">
                                <el-input v-model="item.ysr" type="number"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-carousel-item>
                </el-carousel>
            </el-tab-pane>
            <!--<el-tab-pane label="主要社会关系" name="6">-->
            <!--<div>-->
            <!--其他-->
            <!--<i class="el-icon-circle-plus" type="primary" @click="addRelatives"></i>-->
            <!--</div>-->
            <!--<el-carousel :interval="5000" arrow="always" :loop="loop" height="400px">-->
            <!--<el-carousel-item v-for="(item,index) in Info.relatives" :key="index">-->
            <!--<div class="chengyuan">-->
            <!--<span></span>-->
            <!--成员{{index + 1}}-->
            <!--<i class="el-icon-delete" @click="deleteRelatives(index)"></i>-->
            <!--</div>-->
            <!--<el-form size="mini">-->
            <!--<el-form-item label="姓名">-->
            <!--<el-input v-model="item.xm"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="关系">-->
            <!--<el-input v-model="item.gx"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="年龄">-->
            <!--<el-input v-model="item.nl"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="政治面貌">-->
            <!--<el-input v-model="item.zzmm"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="工作单位">-->
            <!--<el-input v-model="item.gzdw"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="联系电话">-->
            <!--<el-input v-model="item.lxdh"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="职业">-->
            <!--<el-input v-model="item.zy"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="民族">-->
            <!--<el-input v-model="item.mz"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <!--</el-carousel-item>-->
            <!--</el-carousel>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="团员信息" name="6">
                <el-form size="mini" ref="form_tyxx" :model="Info.league" :rules="rule_tyxx">
                    <el-form-item label="是否入团" prop="sfrd">
                        <el-select v-model="sfrt" @change="change_ty">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="sfrt == '是'">
                        <el-form-item label="入团时间" prop="rdsj">
                            <el-date-picker type="date"
                                            v-model="Info.league.rdsj"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="入团地点" prop="rddd">
                            <el-input v-model="Info.league.rddd"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍人姓名" prop="jsrxm">
                            <el-input v-model="Info.league.jsrxm"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍人单位" prop="jsrdw">
                            <el-input v-model="Info.league.jsrdw	"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="党员信息" name="7">
                <el-form size="mini" ref="form_dyxx" :model="Info.party" :rules="rule_dyxx">
                    <el-form-item label="是否入党" prop="sfrd">
                        <!--<el-radio-group v-model="Info.party.sfrd">-->
                        <!--<el-radio label="是"></el-radio>-->
                        <!--<el-radio label="否"></el-radio>-->
                        <!--</el-radio-group>-->
                        <el-select v-model="sfrd" @change="change_dy">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="sfrd == '是'">
                        <el-form-item label="入党时间" prop="rdsj">
                            <el-date-picker type="date" v-model="Info.party.rdsj"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="入党地点" prop="rddd">
                            <el-input v-model="Info.party.rddd"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍人姓名" prop="jsrxm">
                            <el-input v-model="Info.party.jsrxm"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍人单位" prop="jsrdw">
                            <el-input v-model="Info.party.jsrdw	"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </el-tab-pane>
            <!--<el-tab-pane v-if="Info.mz == '汉族'" label="民族生信息" name="8">-->
            <!--<el-form size="mini">-->
            <!--<el-form-item label="是否有办出入证件" required>-->
            <!--<el-radio-group v-model="Info.mzxxsfybcrzj">-->
            <!--<el-radio label="是"></el-radio>-->
            <!--<el-radio label="否"></el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--<div v-if="Info.mzxxsfybcrzj == '是'">-->
            <!--<el-form-item label="出入境证件类型" required>-->
            <!--<el-input v-model="Info.mzxxcrjzjlx"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="出入境证件号" required>-->
            <!--<el-input v-model="Info.mzxxcrjzjh"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="出入境证件有效期" required>-->
            <!--<el-date-picker type="date" v-model="Info.mzxxcrjyxq"-->
            <!--value-format="yyyy-MM-dd"></el-date-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="宗教信仰" required>-->
            <!--<el-input v-model="Info.mzxxzjxy"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="班长" required>-->
            <!--<el-input v-model="Info.mzxxbz"></el-input>-->
            <!--</el-form-item>-->
            <!--</div>-->
            <!--</el-form>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="紧急联系人" name="8">
                <el-form size="mini" ref="form_jjlxr" :model="Info" :rules="rule_jjlxr">
                    <el-form-item label="姓名" prop="jjxm">
                        <el-input type="text" v-model="Info.jjxm"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="jjdh">
                        <el-input type="number" v-model="Info.jjdh"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="jjdw">
                        <el-input type="text" v-model="Info.jjdw"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="jjqq">
                        <el-input type="number" v-model="Info.jjqq"></el-input>
                    </el-form-item>
                    <el-form-item label="与联系人的关系" prop="jjgx">
                        <el-input type="text" v-model="Info.jjgx"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="学习工作经历" name="9">
                <div>
                    学习工作经历
                    <span @click="addgzjy"><i class="el-icon-circle-plus" type="primary"></i>点击新增</span>
                </div>
                <el-carousel
                        :interval="5000"
                        arrow="always"
                        :loop="loop"
                        indicator-position="outside"
                        height="600px"
                        :initial-index="currentIndex_gzjy"
                >
                    <el-carousel-item v-for="(item,index) in Info.resume" :key="index">
                        <div class="chengyuan">
                            <span></span>
                            学习工作经历{{index + 1}}
                            <i class="el-icon-delete" @click="deletegzjy(index)"></i>
                        </div>
                        <el-form size="mini" label-position="top">
                            <el-form-item label="学习(工作)起始日期" required>
                                <el-date-picker type="date" v-model="item.qsrq"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="学习(工作)终止日期" required>
                                <el-date-picker type="date" v-model="item.zzrq"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="社会工作部门">
                                <el-input v-model="item.shgzbm"></el-input>
                            </el-form-item>
                            <el-form-item label="社会工作职务">
                                <el-input v-model="item.shgzzw"></el-input>
                            </el-form-item>
                            <el-form-item label="证明人姓名">
                                <el-input v-model="item.zmr"></el-input>
                            </el-form-item>
                            <el-form-item label="证明人职务">
                                <el-input v-model="item.zmrzw"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-carousel-item>
                </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="受奖励信息" name="10">
                <div>
                    受奖励信息
                    <span @click="addjy"><i class="el-icon-circle-plus" type="primary"></i>点击新增</span>
                </div>
                <el-carousel
                        :interval="5000"
                        arrow="always"
                        :loop="loop"
                        indicator-position="outside"
                        height="550px"
                        :initial-index="currentIndex_jy"
                >
                    <el-carousel-item v-for="(item,index) in Info.reward" :key="index">
                        <div class="chengyuan">
                            <span></span>
                            受奖励经历{{index + 1}}
                            <i class="el-icon-delete" @click="deletejy(index)"></i>
                        </div>
                        <el-form size="mini" label-position="top">
                            <el-form-item label="时间" required>
                                <el-date-picker type="date" v-model="item.when"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="名称" required>
                                <el-input v-model="item.place"></el-input>
                            </el-form-item>
                            <el-form-item label="概述">
                                <el-input type="textarea" autosize v-model="item.remarks"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-carousel-item>
                </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="受处分信息" name="11">
                <div>
                    受处分信息
                    <span @click="addcf"><i class="el-icon-circle-plus" type="primary"></i>点击新增</span>
                </div>
                <el-carousel
                        :interval="5000"
                        arrow="always"
                        :loop="loop"
                        indicator-position="outside"
                        height="550px"
                        :initial-index="currentIndex_cf"
                >
                    <el-carousel-item v-for="(item,index) in Info.punishment" :key="index" :name="index + ''">
                        <div class="chengyuan">
                            <span></span>
                            受处分经历{{index + 1}}
                            <i class="el-icon-delete" @click="deletecf(index)"></i>
                        </div>
                        <el-form size="mini" label-position="top">
                            <el-form-item label="时间" required>
                                <el-date-picker type="date" v-model="item.when"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="处分结束时间" required>
                                <el-date-picker type="date" v-model="item.endTime"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="名称" required>
                                <el-input v-model="item.place"></el-input>
                            </el-form-item>
                            <el-form-item label="概述">
                                <el-input type="textarea" autosize v-model="item.remarks"></el-input>
                            </el-form-item>
                            <el-form-item label="处分原因">
                                <el-input type="textarea" autosize v-model="item.reason"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-carousel-item>
                </el-carousel>
            </el-tab-pane>
        </el-tabs>
        <div class="btn-area loaction-bottom" v-if="status === '0'">
            <el-button v-if="activeName != '1'" type="primary" @click="prevStep">上一步</el-button>
            <el-button v-if="activeName != '11'" type="primary" @click="nextStep">下一步</el-button>
            <el-button v-if="activeName == '11'" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import goBack from "@/components/goBack";
    import {Actionsheet, Slider, Picker, Popup} from "vant";

    export default {
        name: "person",
        data() {
            return {
                status:'',//当前环节是否完成
                title: "个人信息",
                activeName: "1",
                loop: false, //轮播图是否回环播放
                sfrt: '否',//是否入团
                sfrd: '否',//是否入党
                Info: {
                    tc: "",
                    fmjfyrywzdwt: "",
                    family: [
                        {
                            xm: "",
                            gx: "",
                            nl: "",
                            xl: "",
                            dw: "",
                            lxdh: "",
                            zy: "",
                            ysr: "",
                            jkzk: "",
                            gxlx: "0"
                        }
                    ],
                    identification: {//困难认定
                    },
                    relatives: [],
                    league: {},
                    party: {},
                    resume: [
                        {
                            qsrq: "",
                            zzrq: "",
                            shgzbm: "",
                            shgzzw: "",
                            zmr: "",
                            zmrzw: ""
                        }
                    ],//工作经验
                    reward: [{
                        when: "",
                        place: "",
                        remarks: ""
                    }],
                    punishment: [{
                        when: "",
                        endTime: "",
                        place: "",
                        reason: "",
                        remarks: ""
                    }]
                }, //详细信息
                knrd: {//困难认定
                    ztzysrlyqk: '',//家庭主要收入来源情况
                    sfsz: "",//家庭是否遭受自然灾害
                    szqk: "",//家庭遭受自然灾害情况
                    cjnmldlrqk: "",//家庭成员因残疾、年迈而劳动能力弱情况
                    qzqk: "",//家庭欠债情况
                    shzzqk: "",//学生已获社会资助情况
                    tfywqk: "",//家庭遭受突发意外情况
                    jtlxsfge: "",//是否孤儿
                    jtlxsfdq: "",//是否单亲
                    jtlxsfcjxsjcjzn: "",//是否家庭经济困难残疾学生及残疾人子女
                    jtlxsflshyfdxzn: "",//是否烈士或优抚对象子女
                    jtlxsfdbjt: "",//是否低保家庭
                    jtlxsfjdlkpkh: "",//是否建档立卡贫困户
                    jtlxsftkgyxs: "",//是否特困供养学生
                    jtlxqt: "",//是否其他家庭类型
                    sfrxbdczkn: "",//入学报到是否存在困难
                    rxbdczknqk: "",//入学报到困难情况
                },
                campus: [], //校区
                household: [], //户口
                marriages: [], //婚姻情况
                province: [], //省份
                disabilities: [], //残疾类型
                incomeSources: [], //收入来源
                currentIndex_fa: 0,//家庭
                currentIndex_re: 0,//亲人
                currentIndex_cf: 0,//处分
                currentIndex_gzjy: 0,//工作经验
                currentIndex_jy: 0,//奖励
                rules: {
                    // lxdh: [{required: true, message: "此项为必填", trigger: "blur"}],
                    name: [
                        {required: true, message: "请输入活动名称", trigger: "blur"},
                        {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"}
                    ],
                    region: [
                        {required: true, message: "请选择活动区域", trigger: "change"}
                    ],
                    date1: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择日期",
                            trigger: "change"
                        }
                    ],
                    date2: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择时间",
                            trigger: "change"
                        }
                    ],
                    type: [
                        {
                            type: "array",
                            required: true,
                            message: "请至少选择一个活动性质",
                            trigger: "change"
                        }
                    ],
                    resource: [
                        {required: true, message: "请选择活动资源", trigger: "change"}
                    ],
                    desc: [{required: true, message: "请填写活动形式", trigger: "blur"}]
                },
                rule_std: {//学生信息
                    lxdh: [{required: true, message: "请正确填写联系电话", trigger: "blur"}],
                    syd: [{required: true, message: "必填", trigger: "change"}],
                    hkxz: [{required: true, message: "必填", trigger: "change"}],
                    hjqk: [{required: true, message: "必填", trigger: "change"}],
                    xq: [{required: true, message: "必填", trigger: "change"}],
                    hkszd: [{required: true, message: "必填", trigger: "change"}],
                    hkszdz: [{required: true, message: "必填", trigger: "change"}],
                    jtrks: [{required: true, message: "必填", trigger: "change"}],
                    nsr: [{required: true, message: "必填", trigger: "change"}],
                    jtzz: [{required: true, message: "必填", trigger: "change"}],
                    qqh: [{required: true, message: "必填", trigger: "change"}],
                    byxx: [{required: true, message: "必填", trigger: "change"}],
                    byxxyb: [{required: true, message: "必填", trigger: "change"}],
                    sfds: [{required: true, message: "必填", trigger: "change"}],
                    sfls: [{required: true, message: "必填", trigger: "change"}]
                },
                rule_knrd: {//困难认定
                    ztzysrlyqk: [{required: true, message: "必填", trigger: "change"}],
                    sfsz: [{required: true, message: "必填", trigger: "change"}],
                    // szqk: [{required: true, message: "必填", trigger: "change"}],
                    cjnmldlrqk: [{required: true, message: "必填", trigger: "change"}],
                    qzqk: [{required: true, message: "必填", trigger: "change"}],
                    shzzqk: [{required: true, message: "必填", trigger: "change"}],
                    tfywqk: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsfge: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsfdq: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsfcjxsjcjzn: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsflshyfdxzn: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsfdbjt: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsfjdlkpkh: [{required: true, message: "必填", trigger: "change"}],
                    jtlxsftkgyxs: [{required: true, message: "必填", trigger: "change"}],
                    jtlxqt: [{required: true, message: "必填", trigger: "change"}],
                    sfrxbdczkn: [{required: true, message: "必填", trigger: "change"}]
                },
                rule_tyxx: {//团员信息
                    rdsj: [{required: true, message: "必填", trigger: "change"}],
                    rddd: [{required: true, message: "必填", trigger: "change"}],
                    jsrxm: [{required: true, message: "必填", trigger: "change"}],
                    jsrdw: [{required: true, message: "必填", trigger: "change"}]
                },
                rule_dyxx: {//党员信息
                    rdsj: [{required: true, message: "必填", trigger: "change"}],
                    rddd: [{required: true, message: "必填", trigger: "change"}],
                    jsrxm: [{required: true, message: "必填", trigger: "change"}],
                    jsrdw: [{required: true, message: "必填", trigger: "change"}]
                },
                rule_jjlxr: {//紧急联系人
                    jjxm: [{required: true, message: "必填", trigger: "change"}],
                    jjdh: [{required: true, message: "必填", trigger: "change"}],
                    jjdw: [{required: true, message: "必填", trigger: "change"}],
                    jjqq: [{required: true, message: "必填", trigger: "change"}],
                    jjgx: [{required: true, message: "必填", trigger: "change"}]
                }
            };
        },
        components: {
            goBack,
            [Actionsheet.name]: Actionsheet,
            [Slider.name]: Slider,
            [Picker.name]: Picker,
            [Popup.name]: Popup
        },
        methods: {
            handleClick(tab) {
                //切换tab,则保存一次
                this.activeName = tab.name;
                if(this.status === '1'){//当前环节已完成，则不提交
                    return
                }
                this.save();
            },
            getDetail() {
                //获取学生详情
                this.$ajax.get("/student_api/student_detail").then(res => {
                    console.log(res.data.data.league)
                    console.log(res.data.data.league.sfrd)
                    console.log(res.data.data.party)
                    console.log(res.data.data.party.sfrd)
                    console.log(res.data.data.identification)
                    this.Info = res.data.data;
                    if (res.data.data.identification) {
                        this.knrd = res.data.data.identification;
                    } else {
                        this.Info.identification = this.knrd
                    }
                    if (res.data.data.league === "" || res.data.data.league.sfrd === '否') {//判断是否入团
                        this.Info.league = {
                            sfrd: "否",
                            rdsj: "",
                            rddd: "",
                            jsrxm: "",
                            jsrdw: ""
                        }
                        this.sfrt = '否'
                    } else {
                        this.sfrt = '是'
                    }
                    if (res.data.data.party === "" || res.data.data.party.sfrd === '否') {
                        this.Info.party = {
                            sfrd: "否",
                            rdsj: "",
                            rddd: "",
                            jsrxm: "",
                            jsrdw: ""
                        }
                        this.sfrd = '否'
                    } else {
                        this.sfrd = '是'
                    }
                    if (res.data.data.family.length == 0) {
                        this.addFamily();
                    }
                    if (res.data.data.relatives.length == 0) {
                        this.addRelatives();
                    }
                });
            },
            getOptions() {
                //获取选项
                this.$ajax.get("/student_api/options").then(res => {
                    this.campus = res.data.data.campus;
                    this.household = res.data.data.household;
                    this.marriages = res.data.data.marriages;
                    this.province = res.data.data.province;
                    this.disabilities = res.data.data.disabilities;
                    this.incomeSources = res.data.data.incomeSources;
                });
            },
            addFamily() {
                if (this.Info.family.length <= 5) {
                    let familyItem = {
                        xm: "",
                        gx: "",
                        nl: "",
                        xl: "",
                        dw: "",
                        lxdh: "",
                        zy: "",
                        ysr: "",
                        jkzk: "",
                        gxlx: "0"
                    };
                    this.Info.family.push(familyItem);
                    this.$toast("添加成功！");
                    this.currentIndex_fa = this.Info.family.length - 1
                } else {
                    this.$toast("最多填写四个成员");
                }
            },
            addRelatives() {
                if (this.Info.relatives.length <= 5) {
                    let relativesItem = {
                        xm: "",
                        gx: "",
                        nl: "",
                        zzmm: "",
                        dw: "",
                        lxdh: "",
                        zy: "",
                        mz: "",
                        gxlx: "2"
                    };
                    this.Info.relatives.push(relativesItem);
                    this.$toast("添加成功！");
                    this.currentIndex_re = this.Info.relatives.length - 1
                } else {
                    this.$toast("最多填写四个成员");
                }
            },
            addgzjy() {
                if (this.Info.resume.length <= 5) {
                    let Item = {
                        qsrq: "",
                        zzrq: "",
                        shgzbm: "",
                        shgzzw: "",
                        zmr: "",
                        zmrzw: ""
                    };
                    this.Info.resume.push(Item);
                    this.$toast("添加成功！");
                    this.currentIndex_gzjy = this.Info.resume.length - 1
                } else {
                    this.$toast("最多填写四个成员");
                }
            },
            addjy() {//奖励
                if (this.Info.reward.length <= 5) {
                    let Item = {
                        when: "",
                        place: "",
                        remarks: ""
                    };
                    this.Info.reward.push(Item);
                    this.$toast("添加成功！");
                    this.currentIndex_jy = this.Info.reward.length - 1
                } else {
                    this.$toast("最多填写四个成员");
                }
            },
            addcf() {//惩罚
                if (this.Info.punishment.length <= 5) {
                    let Item = {
                        when: "",
                        end_time: "",
                        place: "",
                        reason: "",
                        remarks: ""
                    };
                    this.Info.punishment.push(Item);
                    this.$toast("添加成功！");
                    this.currentIndex_cf = this.Info.punishment.length - 1
                } else {
                    this.$toast("最多填写四个成员");
                }
            },
            beforeLeave(e) {
                console.log(e);
            },
            prevStep() {
                let temp = Number(this.activeName);
                temp = temp - 1;
                this.activeName = String(temp);
                this.save();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            },
            nextStep() {
                let temp = Number(this.activeName);
                temp = temp + 1;
                this.activeName = String(temp);
                this.save();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            },
            save() {
                //困难认定信息
                if (this.Info.sfpkjt == '是') {
                    this.Info.identification = this.knrd
                    console.log(this.Info.identification)
                } else {
                    this.Info.identification = {}
                }
                console.log(this.Info.party)
                console.log(this.Info.league)
                this.Info.party.sfrd = this.sfrd
                this.Info.league.sfrd = this.sfrt
                console.log(this.Info)
                let data = JSON.stringify(this.Info);
                this.$ajax
                    .post("/student_api/save", {jsonObjectStr: data, finishTag: false})
                    .then(res => {
                        console.log(res);
                    });
            },
            change_dy(e) {//选否置空对象
                console.log(e)
                if (e == '否') {//
                    this.Info.party.rdsj = ""
                    this.Info.party.rddd = ""
                    this.Info.party.jsrxm = ""
                    this.Info.party.jsrdw = ""
                }
            },
            change_ty(e) {
                if (e == '否') {//
                    this.Info.league.rdsj = ""
                    this.Info.league.rddd = ""
                    this.Info.league.jsrxm = ""
                    this.Info.league.jsrdw = ""
                }
            },
            submit() {//总提交按钮
                //困难认定信息
                if (this.Info.sfpkjt == '是') {
                    this.Info.identification = this.knrd
                    console.log(this.Info.identification)
                } else {
                    this.Info.identification = {}
                }
                //逐个页面检查表单信息
                let xsxx = false;//学生信息
                let knrd = false;//困难信息
                let tyxx = false;//团员信息
                let dyxx = false;//党员信息
                let jjlxr = false;//紧急联系人
                //学生信息
                this.$refs['form_xsxx'].validate((valid) => {
                    if (valid) {//继续提交
                        xsxx = true
                    } else {//终止提交，并提示
                        return xsxx = false;
                    }
                });
                this.$refs['form_knrd'].validate((valid) => {
                    if (valid) {//继续提交
                        knrd = true
                    } else {//终止提交，并提示
                        if (this.Info.sfpkjt == '否') {
                            knrd = true
                        }
                        knrd = false;
                    }
                });
                this.$refs['form_tyxx'].validate((valid) => {//团员信息
                    if (valid) {//继续提交
                        tyxx = true
                    } else {//终止提交，并提示
                        if (this.Info.league.sfrd == '否') {
                            tyxx = true
                        } else {
                            tyxx = false;
                        }
                    }
                });
                this.$refs['form_dyxx'].validate((valid) => {//党员信息
                    if (valid) {//继续提交
                        dyxx = true
                    } else {//终止提交，并提示
                        if (this.Info.party.sfrd == '否') {
                            dyxx = true
                        } else {
                            dyxx = false;
                        }
                    }
                });
                this.$refs['form_jjlxr'].validate((valid) => {//紧急联系人
                    if (valid) {//继续提交
                        jjlxr = true
                    } else {//终止提交，并提示
                        jjlxr = false;
                    }
                });
                this.Info.identification = this.knrd
                console.log(xsxx)
                console.log(knrd)
                console.log(tyxx)
                console.log(dyxx)
                console.log(jjlxr)
                console.log(this.Info)
                if (!xsxx) {
                    this.$toast('学生信息有必填项未填写！')
                    return
                } else if (!knrd) {
                    this.$toast('困难认定有必填项未填写！')
                    return
                } else if (!tyxx) {
                    this.$toast('团员信息有必填项未填写！')
                    return
                } else if (!dyxx) {
                    this.$toast('党员信息有必填项未填写！')
                    return
                } else if (!jjlxr) {
                    this.$toast('紧急联系人有必填项未填写！')
                    return
                }
                let data = JSON.stringify(this.Info);
                this.$ajax
                    .post("/student_api/save", {jsonObjectStr: data, finishTag: true})
                    .then(res => {
                        if (res.data.errcode == '0') {
                            this.$toast({
                                type: 'success',
                                message: res.data.errmsg
                            })
                        } else {
                            this.$toast({
                                type: 'fail',
                                message: res.data.errmsg
                            })
                        }
                    });
            },
            deleteFamily(index) {
                //删除家庭成员
                this.Info.family.splice(index, 1);
                if (this.Info.family.length >= 1) {
                    this.currentIndex_fa = index - 1
                } else {
                    this.currentIndex_fa = 0
                }
                this.$toast("删除成功！");
            },
            deleteRelatives(index) {
                //删除社会关系成员
                this.Info.relatives.splice(index, 1);
                if (this.Info.relatives.length >= 1) {
                    this.currentIndex_re = index - 1
                } else {
                    this.currentIndex_re = 0
                }
                this.$toast("删除成功！");
            },
            deletegzjy(index) {//工作
                this.Info.resume.splice(index, 1);
                if (this.Info.resume.length >= 1) {
                    this.currentIndex_gzjy = index - 1
                } else {
                    this.currentIndex_gzjy = 0
                }
                this.$toast("删除成功！");
            },
            deletejy(index) {//奖励
                this.Info.reward.splice(index, 1);
                if (this.Info.reward.length >= 1) {
                    this.currentIndex_jy = index - 1
                } else {
                    this.currentIndex_jy = 0
                }
                this.$toast("删除成功！");
            },
            deletecf(index) {//处分
                this.Info.punishment.splice(index, 1);
                if (this.Info.punishment.length >= 1) {
                    this.currentIndex_cf = index - 1
                } else {
                    this.currentIndex_cf = 0
                }
                this.$toast("删除成功！");
            }
        },
        mounted() {
            this.status = this.$route.query.status;
            this.getDetail();
            this.getOptions();
            window.vue = this;
        }
    };
</script>

<style scoped lang="scss">
    .flex-contain {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        /*width: 100%;*/
        overflow-x: scroll;

        .flex-block {
            width: 400px !important;
        }
    }

    .el-form-item {
        margin-bottom: 10px;
        /*border-bottom: 1px solid #bfbfbf;*/
        clear: both !important;
        /*border: 1px solid #f0f0f0;*/
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding: 5px 10px;
    }

    .el-form-item__label {
        clear: both !important;
        float: initial !important;
    }

    .el-form-item__content {
        margin-left: 0 !important;
    }

    .el-tabs__content {
        background-color: #fafafa !important;
    }

    .chengyuan {
        text-align: center;
        padding: 15px 0;
        color: #000;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .loaction-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px 0;
        background-color: white;
        border: 1px solid #ebeef5;
        z-index: 999;
    }
</style>