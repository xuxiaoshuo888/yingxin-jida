<template>
  <div>
    <go-back :title="title"></go-back>
    <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
      <el-tab-pane label="基本信息" name="1">
        <span slot="label">
          基本信息
          <i class="el-icon-warning" style="color:#F56C6C;"></i>
        </span>
        <!-- <div class="person-div">
          <img src="@/assets/img/person.png" alt>
          <img :src="`/proxy${Info.photo}` || '@/assets/img/person.png'" alt="">
        </div> -->
        <el-form ref="form" :model="Info" label-width="100px" size="small">
          <el-form-item label="姓名:">
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
        <el-form ref="form" :model="Info" label-width="80px" size="mini">
          <el-form-item label="辅导员:" v-for="(item,index) in Info.headmaster" v-if="Info.headmaster.length > 0" :key="index">
            <div class="item-content" v-if="item.lx == 'bzr'">{{item.xm}},tel：{{item.tel}}</div>
          </el-form-item>
          <el-form-item label="辅导员:" v-for="(item,index) in Info.headmaster" v-else :key="index">
            <div class="item-content" v-if="item.lx == 'bzr'">暂无数据</div>
          </el-form-item>
          <el-form-item label="志愿者:" v-for="(item,index) in Info.volunteer" v-if="Info.volunteer.length > 0" :key="index">
            <div class="item-content">{{item.xm}},tel：{{item.lxdh}}</div>
          </el-form-item>
          <el-form-item label="志愿者:" v-for="(item,index) in Info.volunteer" v-else :key="index">
            <div class="item-content">暂无数据</div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="学生信息" name="3">
        <el-form ref="form" :model="Info" :rules="rules" label-width="120px" size="mini">
          <el-form-item label="曾用名">
            <el-input v-model="Info.cym"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input type="number" v-model="Info.lxdh"></el-input>
          </el-form-item>
          <el-form-item label="生源地" required>
            <el-select v-model="Info.syd" placeholder>
              <el-option
                v-for="item in province"
                :label="item.codeitemname"
                :key="item.codeitemid"
                :value="item.codeitemname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户口性质" required>
            <el-select v-model="Info.hkxz" placeholder>
              <el-option
                v-for="item in household"
                :label="item.codeitemname"
                :key="item.codeitemid"
                :value="item.codeitemid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻情况" required>
            <el-select v-model="Info.hjqk" placeholder>
              <el-option
                v-for="item in marriages"
                :label="item.codeitemname"
                :key="item.codeitemid"
                :value="item.codeitemname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在校区" required>
            <el-select v-model="Info.xq" placeholder>
              <el-option
                v-for="item in campus"
                :label="item.codeitemname"
                :key="item.codeitemid"
                :value="item.codeitemname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户口所在地" required>
            <el-input v-model="Info.hkszd"></el-input>
          </el-form-item>
          <el-form-item label="户口详细地址" required>
            <el-input v-model="Info.hkszdz"></el-input>
          </el-form-item>
          <el-form-item label="家庭人口数" required>
            <el-input type="number" v-model="Info.jtrks"></el-input>
          </el-form-item>
          <el-form-item label="全年总收入" required>
            <el-input type="number" v-model="Info.nsr"></el-input>
          </el-form-item>
          <el-form-item label="家庭经济情况" required>
            <el-input v-model="Info.jjqk"></el-input>
          </el-form-item>
          <el-form-item label="家庭电话" required>
            <el-input type="number" v-model="Info.jtdh"></el-input>
          </el-form-item>
          <el-form-item label="家庭现住址" required>
            <el-input v-model="Info.jtzz"></el-input>
          </el-form-item>
          <el-form-item label="QQ号" required>
            <el-input type="number" v-model="Info.qqh"></el-input>
          </el-form-item>
          <el-form-item label="毕业中学" required>
            <el-input v-model="Info.byxx"></el-input>
          </el-form-item>
          <el-form-item label="毕业学校邮编" required>
            <el-input type="number" v-model="Info.byxxyb"></el-input>
          </el-form-item>
          <el-form-item label="是否独生子女" required>
            <el-radio-group v-model="Info.sfds">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否烈士子女" required>
            <el-radio-group v-model="Info.sfls">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="家庭详细信息" name="4">
        <el-form ref="form" :model="Info" label-width="190px" size="mini">
          <el-form-item label="是否贫困家庭" required>
            <el-radio-group v-model="Info.sfpkjt">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="Info.sfpkjt == '是'">
            <el-form-item label="是否建档立卡平困户" required>
              <el-radio-group v-model="Info.sfjdlkpkh">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否城镇低保" required>
              <el-radio-group v-model="Info.sfczdb">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否农村低保" required>
              <el-radio-group v-model="Info.sfncdb">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否农村特困供养" required>
              <el-radio-group v-model="Info.sfnctkgy">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否残疾人子女" required>
              <el-radio-group v-model="Info.sfcjrzn">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否单亲家庭" required>
              <el-radio-group v-model="Info.sfdq">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否家中有大病患者" required>
              <el-radio-group v-model="Info.sfjzydbhz">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否孤儿" required>
              <el-radio-group v-model="Info.sfge">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否军烈属或优抚子女" required>
              <el-radio-group v-model="Info.sfjlshyfzn">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否父母丧失劳动能力" required>
              <el-radio-group v-model="Info.sffmssldnl">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否家庭遭受自然灾害" required>
              <el-radio-group v-model="Info.sfjtzfzrzh">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自然灾害情况描述" required>
              <el-input v-model="Info.jtzrzhms"></el-input>
            </el-form-item>
            <el-form-item label="是否家庭遭受突发意外事件" required>
              <el-radio-group v-model="Info.sfjtzctfywsj">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="突发意外事件具体描述" required>
              <el-input v-model="Info.tfywsjms"></el-input>
            </el-form-item>
            <el-form-item label="是否残疾" required>
              <el-radio-group v-model="Info.sfcj">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="残疾类型" required>
              <el-select v-model="Info.hkxz" placeholder>
                <el-option
                  v-for="item in disabilities"
                  :label="item.codeitemname"
                  :key="item.codeitemid"
                  :value="item.codeitemname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否低收入家庭" required>
              <el-radio-group v-model="Info.sfdfrjt">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="家庭主要收入来源" required>
              <el-select v-model="Info.jtzysrly" placeholder>
                <el-option
                  v-for="item in incomeSources"
                  :label="item.codeitemname"
                  :key="item.codeitemid"
                  :value="item.codeitemname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家庭劳动人口总数" required>
              <el-input type="number" v-model="Info.jtldlrks"></el-input>
            </el-form-item>
            <el-form-item label="家庭人均年收入" required>
              <el-input type="number" v-model="Info.jtrjnsr"></el-input>
            </el-form-item>
            <el-form-item label="家庭成员失业数" required>
              <el-input type="number" v-model="Info.jtcyssrs"></el-input>
            </el-form-item>
            <el-form-item label="家庭适龄就学子女数" required>
              <el-input type="number" v-model="Info.jtsljxzns"></el-input>
            </el-form-item>
            <el-form-item label="赡养人口数" required>
              <el-input type="number" v-model="Info.syrks"></el-input>
            </el-form-item>
            <el-form-item label="本人月均消费数" required>
              <el-input type="number" v-model="Info.bryjshf"></el-input>
            </el-form-item>
            <el-form-item label="本人月均食堂消费金额" required>
              <el-input type="number" v-model="Info.brstyxfje"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="直系家庭成员" name="5">
        <div>
          父母和未结婚的兄弟姐妹
          <i class="el-icon-circle-plus" type="primary" @click="addFamily"></i>
        </div>
        <el-carousel
          :interval="5000"
          arrow="always"
          :loop="loop"
          indicator-position="outside"
          height="550px"
        >
          <el-carousel-item v-for="(item,index) in Info.family" :key="index">
            <div class="chengyuan">
              <span></span>
              成员{{index + 1}}
              <i class="el-icon-delete" @click="deleteFamily(index)"></i>
            </div>
            <el-form label-width="80px" size="mini">
              <el-form-item label="姓名">
                <el-input v-model="item.xm"></el-input>
              </el-form-item>
              <el-form-item label="关系">
                <el-input v-model="item.gx"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input type="number" v-model="item.nl"></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-input v-model="item.xl"></el-input>
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
              <el-form-item label="月收入">
                <el-input v-model="item.ysr" type="number"></el-input>
              </el-form-item>
              <el-form-item label="健康状况">
                <el-input v-model="item.jkzk"></el-input>
              </el-form-item>
            </el-form>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="主要社会关系" name="6">
        <div>
          其他
          <i class="el-icon-circle-plus" type="primary" @click="addRelatives"></i>
        </div>
        <el-carousel :interval="5000" arrow="always" :loop="loop" height="400px">
          <el-carousel-item v-for="(item,index) in Info.relatives" :key="index">
            <div class="chengyuan">
              <span></span>
              成员{{index + 1}}
              <i class="el-icon-delete" @click="deleteRelatives(index)"></i>
            </div>
            <el-form label-width="80px" size="mini">
              <el-form-item label="姓名">
                <el-input v-model="item.xm"></el-input>
              </el-form-item>
              <el-form-item label="关系">
                <el-input v-model="item.gx"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="item.nl"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-input v-model="item.zzmm"></el-input>
              </el-form-item>
              <el-form-item label="工作单位">
                <el-input v-model="item.gzdw"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="item.lxdh"></el-input>
              </el-form-item>
              <el-form-item label="职业">
                <el-input v-model="item.zy"></el-input>
              </el-form-item>
              <el-form-item label="民族">
                <el-input v-model="item.mz"></el-input>
              </el-form-item>
            </el-form>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="团员信息" name="7">
        <el-form label-width="170px" size="mini">
          <el-form-item label="是否入团" required>
            <el-radio-group v-model="Info.tyxxsfrt">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="Info.tyxxsfrt == '是'">
            <el-form-item label="入团时间" required>
              <el-date-picker type="date" v-model="Info.tyxxrtsj"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否开具团组织介绍信" required>
              <el-radio-group v-model="Info.tyxxsfkjjsx">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入团介绍人" required>
              <el-input v-model="Info.tyxxrtjsr"></el-input>
            </el-form-item>
            <el-form-item label="入团联系人电话" required>
              <el-input type="number" v-model="Info.tyxxrtlxrdh"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="党员信息" name="8">
        <el-form label-width="140px" size="mini">
          <el-form-item label="是否入党" required>
            <el-radio-group v-model="Info.dyxxsfrd">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="Info.dyxxsfrd == '是'">
            <el-form-item label="入党时间" required>
              <el-date-picker type="date" v-model="Info.dyxxrdsj"></el-date-picker>
            </el-form-item>
            <el-form-item label="发展时间" required>
              <el-date-picker type="date" v-model="Info.dyxxfzsj"></el-date-picker>
            </el-form-item>
            <el-form-item label="入党积极分子时间" required>
              <el-date-picker type="date" v-model="Info.dyxxrdjjfzsj"></el-date-picker>
            </el-form-item>
            <el-form-item label="转正时间" required>
              <el-date-picker type="date" v-model="Info.dyxxzjsj"></el-date-picker>
            </el-form-item>
            <el-form-item label="党校结业时间" required>
              <el-date-picker type="date" v-model="Info.dyxxdxjysj"></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="Info.mz == '汉族'" label="民族生信息" name="9">
        <el-form label-width="140px" size="mini">
          <el-form-item label="是否有办出入证件" required>
            <el-radio-group v-model="Info.mzxxsfybcrzj">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="Info.mzxxsfybcrzj == '是'">
            <el-form-item label="出入境证件类型" required>
              <el-input v-model="Info.mzxxcrjzjlx"></el-input>
            </el-form-item>
            <el-form-item label="出入境证件号" required>
              <el-input v-model="Info.mzxxcrjzjh"></el-input>
            </el-form-item>
            <el-form-item label="出入境证件有效期" required>
              <el-date-picker type="date" v-model="Info.mzxxcrjyxq"></el-date-picker>
            </el-form-item>
            <el-form-item label="宗教信仰" required>
              <el-input v-model="Info.mzxxzjxy"></el-input>
            </el-form-item>
            <el-form-item label="班长" required>
              <el-input v-model="Info.mzxxbz"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="紧急联系人" name="10">
        <el-form label-width="130px" size="mini">
          <el-form-item label="姓名" required>
            <el-input v-model="Info.jjxm"></el-input>
          </el-form-item>
          <el-form-item label="电话" required>
            <el-input v-model="Info.jjdh"></el-input>
          </el-form-item>
          <el-form-item label="单位" required>
            <el-input v-model="Info.jjdw"></el-input>
          </el-form-item>
          <el-form-item label="QQ" required>
            <el-input v-model="Info.jjqq"></el-input>
          </el-form-item>
          <el-form-item label="与联系人的关系" required>
            <el-input v-model="Info.jjgx"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-area">
      <el-button v-if="activeName != '1'" type="primary" @click="prevStep">上一步</el-button>
      <el-button v-if="activeName != '10'" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-if="activeName == '10'" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import goBack from "@/components/goBack";
import { Actionsheet, Slider, Picker, Popup } from "vant";

export default {
  name: "person",
  data() {
    return {
      title: "个人信息",
      activeName: "1",
      loop: false, //轮播图是否回环播放
      Info: {
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
        relatives: []
      }, //详细信息
      campus: [], //校区
      household: [], //户口
      marriages: [], //婚姻情况
      province: [], //省份
      disabilities: [], //残疾类型
      incomeSources: [], //收入来源
      rules: {
        lxdh: [{ required: true, message: "此项为必填", trigger: "blur" }],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
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
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
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
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab) {
      //切换tab,则保存一次
      this.activeName = tab.name;
      this.save();
    },
    getDetail() {
      //获取学生详情
      this.$ajax.get("/student_api/student_detail").then(res => {
        this.Info = res.data.data;
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
      if (this.Info.family.length < 4) {
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
      } else {
        this.$toast("最多填写四个成员");
      }
    },
    addRelatives() {
      if (this.Info.relatives.length < 4) {
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
    },
    nextStep() {
      let temp = Number(this.activeName);
      temp = temp + 1;
      this.activeName = String(temp);
      this.save();
    },
    save() {
      let data = JSON.stringify(this.Info);
      // console.log("格式化后的数据", data);
      this.$ajax
        .post("/student_api/save", { jsonObjectStr: data, finishTag: false })
        .then(res => {
          console.log(res);
        });
    },
    submit() {//总提交按钮
      this.save();
    },
    deleteFamily(index) {
      //删除家庭成员
      this.Info.family.splice(index, 1);
      this.$toast("删除成功！");
    },
    deleteRelatives(index) {
      //删除社会关系成员
      this.Info.relatives.splice(index, 1);
      this.$toast("删除成功！");
    }
  },
  mounted() {
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
  border: 1px solid #f0f0f0;
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
  background-color: #bfbfbf !important;
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
</style>