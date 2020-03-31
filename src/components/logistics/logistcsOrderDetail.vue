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
              v-model="GoodsNames.findName"
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
                <el-radio-button label="0">首页</el-radio-button>
                <el-radio-button label="1">物流园区</el-radio-button>
                <el-radio-button label="14">货源信息</el-radio-button>
                <el-radio-button label="29">车源信息</el-radio-button>
                <el-radio-button label="42">物流专线</el-radio-button>
                <el-radio-button label="55">整车货运</el-radio-button>
                <el-radio-button label="69">国际物流</el-radio-button>
                <el-radio-button label="82">快递公司</el-radio-button>
                <el-radio-button label="92">车辆展示</el-radio-button>
                <el-radio-button label="94">订单管理</el-radio-button>
                <el-radio-button label="95">后台管理</el-radio-button>
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
          <div style="background-color: #EBEBEB;min-height:900px">
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
            <!-- 主体 -->
            <div style="margin-top:5px">
              <el-row>
                <!-- 左侧的 -->
                <el-col :span="3">
                  <div style="min-height:1000px;"></div>
                </el-col>
                <!-- 物流明细 -->
                <el-col :span="16">
                  <div style="background-color:#9AB3CC;min-height:1000px;">
                    <!-- 下面是车辆-->
                    <el-row>
                      <el-col :span="4">
                        <!-- 品牌图 -->
                        <!-- <div>
                          <el-image
                            style="width: 50%; height: 100px;margin-top: 30px;float: right;margin-right: 25%"
                            :src="src"
                          ></el-image>
                          <h1>太平洋出品</h1>
                        </div>-->
                      </el-col>
                      <!-- 图片 -->
                      <el-col :span="7">
                        <div class="demo-image__preview">
                          <el-image style="width: 343px; height: 300px" :src="ImgUrl"></el-image>
                        </div>
                      </el-col>
                      <el-col :span="13">
                        <div style="margin-top: 30px;float: left;margin-left: 10px">
                          <font
                            size="8"
                            style="color: #475669"
                          >{{order_detail.order_detail_departure}}→{{order_detail.order_detail_destination}}</font>
                          <font
                            size="6"
                            style="color: #475669"
                          >、{{order_detail.order_detail_destination}}</font>
                          <br />
                          <el-tag type="success">已实名</el-tag>
                          <br />
                          <br />
                          <h4>车辆信息:</h4>
                          <font
                            size="3"
                            style="color: #475669"
                          >车辆最大载重：{{order_detail.order_detail_maximum}}</font>
                          <font size="3" style="color: #475669">重量：五吨;</font>
                          <br />
                          <font size="3" style="color: #475669">轴数：8;</font>
                          <br />
                          <font size="3" style="color: #475669">颜色:黑色;</font>
                          <br />
                          <br />

                          <font size="5">
                            <b>{{order_detail.order_detail_drivername}}</b>
                          </font>
                          &nbsp;&nbsp;
                          <el-button type="warning">联系司机:18662746299</el-button>
                          <br />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <h1></h1>
                        <font size="4" style="color: #475669">您的货物正在运送当中。。。。</font>
                        <BMapComponent></BMapComponent>
                      </el-col>
                      <el-col :span="24">
                        <div style="width:100%"></div>
                        <img src="../../assets/pc1.jpg" style="width: 100%;t;margin-top: 20px;" />
                      </el-col>
                    </el-row>
                    <!-- 评论模块 -->
                  </div>
                </el-col>
                <!-- 右侧推荐 -->
                <el-col :span="5">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <h2>地图找车</h2>
                    </div>
                    <div>
                      <img
                        src="../../assets/mapImg.jpg"
                        style="width:100%;display: block;"
                        class="image"
                      />
                    </div>
                  </el-card>
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <h2>联系我们</h2>
                    </div>
                    <div>
                      <img
                        src="../../assets/carMy/lianxi.png"
                        style="width:100%;display: block;"
                        class="image"
                      />
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
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
import { getToken } from "@/permissions/auth";
import top from "@/components/firstPage/top";
import recommend from "@/components/firstPage/recommend";
import Tpyhead from "@/components/firstPage/Tpyhead";
import qs from "qs";
import BMapComponent from "@/components/logistics/BMapComponent";
export default {
  name: "logisticsPage",
  components: {
    recommend,
    Tpyhead,
    BMapComponent
  },
  data() {
    return {
      look: [],
      brandUrl: require("../../assets/logo1.jpg"), //品牌图
      ImgUrl: require("../../assets/carMy/che1.png"), //大图
      //大图的集合
      srcList: [
        require("../../assets/goods0.png"),
        require("../../assets/goods1.png"),
        require("../../assets/goods2.png"),
        require("../../assets/goods3.png"),
        require("../../assets/goods4.png")
      ],
      //小图的集合
      imgUrl: [
        { index: 1, url: require("../../assets/goods0.png") },
        { index: 2, url: require("../../assets/goods1.png") },
        { index: 3, url: require("../../assets/goods2.png") },
        { index: 4, url: require("../../assets/goods3.png") },
        { index: 5, url: require("../../assets/goods4.png") }
      ],
      searchCriteria: "",
      breadcrumbItems: ["首页"],
      count: 0,
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8100"
      },
      action: "", //路径
      select: "",
      TreeSee: true, //判断是否显示
      TreeTable: false, //列表的树

      Myposition: "static", //轮播图的
      UserForm: { user: {} }, //用于用户存储
      queryForm: {}, //单选框

      src: require("../../assets/logo3.jpg"), //太平洋logo
      GoodsNames: {
        findName: "",
        t_name: "",
        t_type_id: ""
      }, //查询
      curnum: 1, //当前页
      pageCount: 10, //最大页数
      order_detail: {}
    };
  },
  methods: {
    // 进入用户后台
    form() {
      let id = this.UserForm.user.userId;
      console.log(id);
      this.$router.push("/form" + id);
    },
    //跟换图片的
    getIndex(imgUrl) {
      this.ImgUrl = imgUrl;
    },
    // 搜索框的方法
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
    // 搜索下分类

    onSubmit() {
      if (this.queryForm.t_type_id == "95") {
        this.$router.push("/logisticsPageback");
      } else if (this.queryForm.t_type_id == "94") {
        this.$router.push("/logistcsOrder");
      } else if (this.queryForm.t_type_id == "92") {
        this.$router.push("/logistcsOrder");
      } else if (this.queryForm.t_type_id == "0") {
        this.$router.push("/LogisticsIndex");
      }
    },
    /*修改树的样式*/
    renderContent(createElement, { node, data, store }) {
      return createElement("span", [
        createElement("span", { attrs: { class: "tree-spy" } }, node.label)
      ]);
    },
    // 判断用户
    getUser() {
      /*this.UserForm = getToken();*/
      this.UserForm = null;
      console.log("欢迎用户:" + this.UserForm.user.userId);
      // this.UserForm = "";
      if (this.GoodsNames.t_name != "") {
        this.TreeSee = false;
        this.Myposition = "absolute";
      }
    },
    getOrderDetail() {
      let order_id = localStorage.getItem("order_id");
      console.log(order_id);
      axios({
        url: "/rest/detail/byid?order_detail_id=" + order_id,
        method: "post"
      }).then(res => {
        this.order_detail = res.data;
        console.log(this.order_detail);
      });
    }
  },
  mounted() {
    this.getUser(), (this.action = "http://localhost:8100/upLoadExcel/");
  },
  created() {
    this.getOrderDetail();
  }
};
</script>
<style>
/* 设置card宽度 */
.demo-image__preview {
  margin-top: 30px;
}
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
.el-tree {
  color: black;
  height: 498px;
  overflow: auto;
  border: 1px solid #4db5f1;
}
.el-tree-node__content:hover {
  height: 60px;
  background-color: #4db5f1;
}
.el-tree-node__content {
  height: 62px;
  background-color: white;
}
.eL-tree-node:focus > .el-tree-node__content {
  background-color: #97a8be;
}
.el-tree-node.is-current {
  background-color: #ffff99;
}
.el-tree-node_expand-icon {
}
.el-tree-node_content {
  height: 60px;
  line-height: 2.5rem;
}

.aa {
  background: url("../../assets/页脚.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
