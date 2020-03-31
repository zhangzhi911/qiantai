<template>
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
                <el-radio-button label="94">订单查看</el-radio-button>
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
            <!-- <div style="width:100%;background-color: #acd6ff; overflow: hidden;height:45px">
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
            </div>-->
            <div style="margin-top:5px">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4">
                  <div>
                    <el-menu
                      default-active="1"
                      class="el-menu-vertical-demo"
                      style="min-height:900px"
                      @select="handleSelect"
                    >
                      <el-menu-item index="1">
                        <i class="el-icon-message"></i>后台首页
                      </el-menu-item>
                      <el-menu-item index="2">
                        <i class="el-icon-menu"></i>订单申请
                      </el-menu-item>
                      <el-menu-item index="3">
                        <i class="el-icon-setting"></i>仓库管理
                      </el-menu-item>
                      <el-menu-item index="4">
                        <i class="el-icon-message"></i>发货订单
                      </el-menu-item>
                      <el-menu-item index="5">
                        <i class="el-icon-menu"></i>用户管理
                      </el-menu-item>
                      <el-menu-item index="6">
                        <i class="el-icon-setting"></i>车辆司机管理
                      </el-menu-item>
                    </el-menu>
                  </div>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20">
                  <div>
                    <div
                      style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white"
                    >
                      <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="item in breadcrumbItems" :key="null">{{item}}</el-breadcrumb-item>
                      </el-breadcrumb>
                    </div>
                  </div>
                  <div style="margin-top:10px">
                    <router-view></router-view>
                  </div>
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
export default {
  name: "logisticsPage",
  components: {
    recommend,
    Tpyhead
  },
  data() {
    return {
      searchCriteria: "",
      breadcrumbItems: ["首页"],
      count: 0,
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8100"
      },
      action: "", //路径
      importDataDisabled: false,
      importDataBtnText: "导入数据",
      importDataBtnIcon: "el-icon-upload2",
      select: "",
      TreeSee: true, //判断是否显示
      TreeTable: false, //列表的树

      Myposition: "static", //轮播图的
      UserForm: { user: {} }, //用于用户存储
      queryForm: {}, //单选框
      goodLists: [
        {
          t_gid: "1",
          t_name: "1",
          t_brand: "1",
          t_price: "1",
          t_document: "1",
          t_image: "1",
          t_delete: "1",
          t_number: "1",
          t_std: "1",
          t_color: "1",
          t_sales: "1",
          t_type_id: "1"
        }
      ], //存储商品
      src: require("../../assets/logo3.jpg"),
      GoodsNames: {
        findName: "",
        t_name: "",
        t_type_id: ""
      }, //查询
      typedata: [
        {
          parent_id: 0,
          label: "d"
        }
      ], //树
      curnum: 1, //当前页
      pageCount: 10 //最大页数
    };
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },

    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/page1");
          this.breadcrumbItems = ["后台首页"];
          break;
        case "2":
          this.$router.push("/page2");
          this.breadcrumbItems = ["订单申请"];
          break;
        case "3":
          this.$router.push("/page3");
          this.breadcrumbItems = ["仓库管理"];
          break;
        case "4":
          this.$router.push("/page4");
          this.breadcrumbItems = ["发货订单"];
          break;
        case "5":
          this.$router.push("/page5");
          this.breadcrumbItems = ["用户管理"];
          break;
        case "6":
          this.$router.push("/page6");
          this.breadcrumbItems = ["车辆司机管理"];
          break;
      }
    },
    load() {
      this.count = 2;
    },
    // 进入用户后台
    form() {
      let id = this.UserForm.user.userId;
      console.log(id);
      this.$router.push("/form" + id);
    },
    toDetails(good, index) {
      localStorage.setItem("GoodBy", JSON.stringify(good));
      this.$router.push("/Details");
    },
    addCard(id, price) {
      let userid = this.UserForm.user.userId;
      console.log(id + userid);
      axios({
        url: "/rest/car/insertCar",
        method: "post",
        data: qs.stringify({
          t_uid: userid,
          t_gid: id,
          t_count: 1,
          t_sum: price
        })
      }).then(rest => {
        this.$message.success("添加成功~!");
      });
    },
    //第二种上传表格
    saveStudent() {
      //new一个formData对象因为图片的格式需要转换
      let formData = new FormData();

      // formData.append(
      //   "photoo",
      //   document.querySelector("input[type=file]").files[0]
      // );
      formData.append("photoo", document.querySelector("#excelbiao").files[0]);

      //通过遍历form表单的对象来把form中的每个属性放到new的对象当中
      console.log(formData + "formData");

      axios({
        url: "http://localhost:8100/upLoadExcel2/",
        data: formData,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-mixed",
          "Access-Control-Allow-Origin": "http://127.0.0.1:8100"
        }
      }).then(res => {
        console.log(res.data);
      });
      // 发送请求
    },
    //状态
    beforeUpload(response, file, fileList) {
      this.importDataBtnText = "正在导入";
      this.importDataBtnIcon = "el-icon-loading";
      this.importDataDisabled = true;
    },
    //上传完成
    onSuccess(response, file, fileList) {
      console.log("导入成功:{}", response);
      this.importDataBtnText = "导入数据";
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataDisabled = false;
      // this.getRequest();
    },
    //上传出错
    onError(response, file, fileList) {
      console.log("error----------------->:{}", response);
      alert(response.message);
      this.importDataBtnText = "导入数据";
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataDisabled = false;
    },
    // 下载表格的方法
    exportData() {
      var url = "http://localhost:8100/downLoadGoodsExcel";
      // url = url.replace("{token}", localStorage.getItem("access_token"));
      console.log("url:----------------------", url);
      window.open(url, "_parent");
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
        this.goodLists = res.data.list;
        this.pageCount = res.data.pageSize;
        this.curnum = res.data.pageNum;
      });
    },
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
    }
  },
  mounted() {
    this.getUser(), this.getGoods(), this.getTypes();
    this.action = "http://localhost:8100/upLoadExcel/";
  },
  created() {
    this.$router.push("/page1");
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
