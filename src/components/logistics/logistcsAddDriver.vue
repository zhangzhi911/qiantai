<template  >
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span
            style="float:left;margin-top: 2.5mm; margin-left: 10px;font-size: 3.5mm"
          >您好，欢迎来到太平洋物流</span>
          <span v-if="UserForm==''">
            <el-link
              href="#/register"
              style="float:left;margin-top: 2mm; margin-left: 10px"
            >注册 &nbsp;&nbsp;|</el-link>
            <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">登录</el-link>
          </span>
          <!-- 用户已登录 -->
          <span v-if="UserForm!=null">
            <el-link @click="form()" style="float:left;margin-top: 2mm; margin-left: 10px">
              <el-tooltip
                content="进入个人中心"
                placement="bottom"
                effect="light"
                style="background-color: #acd6ff;"
              >
                <b style="color:red">{{UserForm.user.user_name}}</b>
              </el-tooltip>
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
            <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">退出</el-link>
          </span>
          <!-- 右侧 -->
          <span v-if="UserForm!=null">
            <el-link
              href="#/orlder"
              class="el-icon-sold-out"
              style="float: right; margin-top: 2mm;margin-right: 35px;"
            >&nbsp;我的订单</el-link>
          </span>
          <!-- 以上是判断是否显示 -->
        </div>
      </el-col>
    </el-row>
    <!-- 一下是搜索 -->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-image
            :src="src"
            style="height: 120px ;width: 170px; margin-left: 25px;margin-top: 25px"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div style="margin-top: 50px; ">
            <el-input
              placeholder="请输入内容"
              style="border:1px solid #FF9640"
            >
              <el-select v-model="select" slot="prepend" placeholder="类型">
                >
                <el-option label="出发地" value="1"></el-option>
                <el-option label="到达地" value="2"></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                style="background-color: #FF9640; border:1px solid #acd6ff"
                class="el-button"
                @click="submit"
              >
                <font style="color: white">搜索</font>
              </el-button>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p
            style="float: right;width: 10px;margin-right: 50px;font-size: 3.5mm;margin-top: 20px"
          >扫码进行沟通</p>
          <div style="float: right">
            <img
              src="../../assets/erweima.png"
              style="height: 100px ;width: 100px;float: right;margin-top: 20px;margin-left: 15px"
            />
            <el-button size="mini" style="margin-top: 80px;" icon="el-icon-microphone">
              <el-link href="https://jq.qq.com/?_wv=1027&k=5EPYFco">QQ交谈</el-link>
            </el-button>
            <el-button size="mini" icon="el-icon-microphone">
              <el-link href="https://jq.qq.com/?_wv=1027&k=5EPYFco">QQ交谈</el-link>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 以上是搜索 -->
    <el-row>
      <el-col :span="24">
        <div style="background-color: #FF9640">
          <el-form>
            <el-form-item style="margin-bottom: 0px;">
              <el-radio-group
                fill="#acd6ff"
                text-color="#fffff"
                v-model="queryForm.t_type_id"
                @change="onSubmit"
                style="margin-left: 270px"
              >
                <el-radio-button label="0">首页22</el-radio-button>
                <el-radio-button label="1">物流园区</el-radio-button>
                <el-radio-button label="14">货源信息</el-radio-button>
                <el-radio-button label="29">车源信息</el-radio-button>
                <el-radio-button label="42">物流专线</el-radio-button>
                <el-radio-button label="55">整车货运</el-radio-button>
                <el-radio-button label="69">国际物流</el-radio-button>
                <el-radio-button label="82">快递公司</el-radio-button>
                <el-radio-button label="92">物流加盟</el-radio-button>
                <el-radio-button label="94">物流设备</el-radio-button>
                <el-radio-button label="95">其他咨询</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <Tpyhead></Tpyhead>
    <el-row>
      <el-col :span="24">
        <template>
          <div style="background-color: #EBEBEB;min-height:1000px;">
            <div style="width:100%;background-color: #acd6ff; overflow: hidden;height:45px">
              <span
                class="demonstration"
                style="float:left;padding-top:10px;color:white;margin-left:1%"
              >太平洋集团物流后台管理首页</span>
              <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">
                    admin
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <a href="/">
                      <el-dropdown-item>退出登录</el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
            <el-main>
              <template>
                <el-form :inline="true" :model="formInline" class="demo-form-inline"  style="margin-left: 350px">
                  <el-form-item >
                    <table cellspacing="0" border="1" style="border-collapse:collapse;">
                    <tr >
                      出发地：<td><el-input v-model="formInline.order_departure" placeholder="出发地" style="width: 310px"></el-input></td><hr>
                      到达地：<td><el-input v-model="formInline.order_destination" placeholder="到达地" style="width: 310px"></el-input></td>
                    </tr><hr>
                    <tr>
                      重量：<td><el-input v-model="formInline.order_weight" placeholder="重量" style="width: 310px"></el-input></td><hr>
                      体积：<td><el-input v-model="formInline.order_volume" placeholder="体积" style="width: 310px"></el-input></td>
                    </tr><hr>
                    <tr>
                      创建订单时间：<td><el-input v-model="formInline.order_creationtime" placeholder="创建订单时间" style="width: 310px"></el-input></td><hr>
                      修改订单时间：<td><el-input v-model="formInline.order_modifytime" placeholder="修改订单时间" style="width: 310px"></el-input></td>
                    </tr><hr>
                    <tr>
                      货物类型：<td><el-input v-model="formInline.order_cargotype" placeholder="货物类型" style="width: 310px"></el-input></td><hr>
                      车辆类型：<td><el-input v-model="formInline.cartype_id" placeholder="车辆类型" style="width: 310px"></el-input></td>
                    </tr><hr>
                    <tr>
                      联系人：<td><el-input v-model="formInline.order_linkmanname" placeholder="联系人" style="width: 310px"></el-input></td><hr>
                      电话：<td><el-input v-model="formInline.order_linkmanphone" placeholder="电话" style="width: 310px"></el-input></td>
                    </tr><hr>
                    <tr>
                      备注：
                      <td colspan="4">
                         <el-input type="textarea" v-model="formInline.order_reason" style="width: 720px;"></el-input>
                      </td>
                    </tr>
                    </table>
                  </el-form-item><br>
                  <el-form-item style="margin-left: 600px">
                    <el-button type="primary" @click="addSubmit">添加</el-button>
                    <el-button @click="resetForm()">取消</el-button>
                  </el-form-item>
                </el-form>
              </template>
            </el-main>
            <Commont></Commont>
          </div>
        </template>
      </el-col>
    </el-row>
    <!-- 脚 -->
    <el-row>
      <el-col :span="24">
        <div class="aa" style="
           height: 100px;
           margin-top: 35px;">
          <hr />
          <p class="p-foot" target="_blank">
            <a href="https://jq.qq.com/?_wv=1027&k=5VLp93o">集中点滴力量，聚成汪洋大海。版权 ©所有:太平洋项目组</a>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Commont from "@/components/firstPage/Commont";
import recommend from "@/components/firstPage/recommend";
import Tpyhead from "@/components/firstPage/Tpyhead";
import qs from "qs";
export default {
  name: "logistcsAddOrder",
  components: {
    recommend,
    Tpyhead,
      Commont
  },
  data() {
    return {
        formInline: {
            order_departure: '',
            order_destination: '',
            order_cargotype: '',
            order_weight: '',
            order_volume: '',
            order_linkmanphone: '',
            order_linkmanname: '',
            order_creationtime: '',
            order_modifytime: '',
            order_reason: '',
            cartype_id: ''
        },
        formInline:{},
        select: "",
        queryForm: {},
        GoodsNames: {
            findName: "",
            t_name: "ab",
            t_type_id: ""
        },
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8100"
      },
      UserForm: { user: {} }, //用于用户存储
      src: require("../../assets/logo3.jpg"), //太平洋logo
    };
  },
  methods: {
      addSubmit(){
          console.log(this.formInline)
          axios({
              url:"rest//torder/add",
              method:"post",
              data:this.formInline
          }).then(res=>{
              this.$message("添加成功")
          })
      },
      resetForm() {
          this.$router.go(0)
      },
      submit() {
          if (this.GoodsNames.findName != "") {
              this.TreeSee = false; //干掉萝卜兔
              this.TreeTable = true; //放开表格树
              // this.Myposition = "absolute"; //暂时下先不用
          }
          // console.log(this.GoodsNames.findName);
          axios({
              url: "/rest/goods/findList?pageNum=" + this.curnum + "&pageSize=12",
              method: "post",
              data: qs.stringify({ t_name: this.GoodsNames.findName })
          }).then(res => {
              this.pageCount = res.data.pageSize;
              this.curnum = res.data.pageNum;
          });
      },
    // 进入用户后台
    form() {
      let id = this.UserForm.user.userId;
      console.log(id);
      this.$router.push("/form" + id);
    },
    // 搜索下分类
    onSubmit() {
      if (this.queryForm.t_type_id != "0") {
        this.TreeSee = false; //干掉萝卜兔
        this.TreeTable = true; //放开表格树
        // this.Myposition = "absolute"; //暂时下先不用
        axios({
          url: "/rest/goods/findList?pageNum=" + this.curnum + "&pageSize=4",
          method: "post",
          data: qs.stringify(this.queryForm)
        }).then(res => {
          this.pageCount = res.data.pageSize;
          this.curnum = res.data.pageNum;
        });
      } else {
      }
    },

      // 判断用户
      getUser() {
          this.UserForm.user = 'a';
          console.log("欢迎用户:" + this.UserForm.user.userId);
          // this.UserForm = "";
          if (this.GoodsNames.t_name != "") {
              this.Myposition = "absolute";
          }
      }
  },
  mounted() {
    this.getUser(),
      (this.action = "http://localhost:8100/upLoadExcel/");
  },
  created() {
  }
};
</script>
<style>
/* 设置card宽度 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}
.bg-purple-dark {
  background-color: #dadada;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.p-foot {
  color: white;
  font-size: 16px;
  margin-left: 400px;
  margin-top: 35px;
  padding-left: 20px;
  font-style: italic;
}
.aa {
  background: url("../../assets/页脚.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
