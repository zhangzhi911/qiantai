<template>
  <el-main>
    <div style="margin-right: 100px;margin-left: 100px;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
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
                <b style="color:red">{{UserForm.user.user_name}}</b>
                <i class="el-icon-view el-icon--right"></i>
              </el-link>
              <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">退出</el-link>
            </span>
            <!-- 右侧 -->
            <span v-if="UserForm!=null">
              <el-link
                href="#/orlder"
                style="float: right; margin-top: 2mm;margin-right: 35px;"
              >我的订单</el-link>
            </span>
            <!-- 以上是判断是否显示 -->
          </div>
        </el-col>
      </el-row>
      <!-- 一下是搜索 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-image :src="src" style="height: 120px ;width: 170px; margin-left: 25px;"></el-image>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <div style="margin-top: 40px; ">
              <el-input
                placeholder="请输入内容"
                v-model="GoodsNames.findName"
                style="border:1px solid #acd6ff"
              >
                <el-select v-model="select" slot="prepend" placeholder="类型">
                  >
                  <el-option label="商品" value="1"></el-option>
                  <el-option label="店铺" value="2"></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  style="background-color: #acd6ff; border:1px solid #acd6ff"
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
            <div style="margin-top: 40px; ">
              <el-badge
                :value="12"
                class="item"
                style="float: right; margin-right: 80px"
                type="warning"
              >
                <el-button
                  size="medium"
                  style="float: right;  border:1px solid white;background-color: #acd6ff;"
                >
                  <el-link
                    href="#/goodscar"
                    style="float:left;margin-top: 2mm; margin-left: 10px"
                  >购物车</el-link>
                </el-button>
              </el-badge>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 以上是搜索 -->

      <!-- 左侧的树 -->
      <div style="margin-bottom: 0px"></div>
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <p style="float:contour;margin-left: 20px" class="el-icon-s-unfold">&nbsp;&nbsp;商品分类</p>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light" style="margin-left: 40px; margin-bottom: 0">
            <el-form>
              <el-form-item style="margin-bottom: 0px">
                <el-radio-group
                  size="medium"
                  fill="red"
                  v-model="queryForm.t_type_id"
                  @change="onSubmit"
                >
                  <el-radio-button label="0">首页</el-radio-button>
                  <el-radio-button label="1">女装/男装/内衣</el-radio-button>
                  <el-radio-button label="14">鞋靴/箱包/配件</el-radio-button>
                  <el-radio-button label="29">童装玩具/孕产/用品</el-radio-button>
                  <el-radio-button label="42">家电/数码/手机</el-radio-button>
                  <el-radio-button label="55">美妆/洗护/保健品</el-radio-button>
                  <el-radio-button label="69">珠宝/眼镜/手表</el-radio-button>
                  <el-radio-button label="82">运动/户外/乐器</el-radio-button>
                  <el-radio-button label="95">游戏/动漫/影视</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <div v-bind:style="{ position: Myposition }" v-if="TreeSee">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-container style="height: 500px; border: 1px solid #eee">
                <el-col :span="3" style="background-color:white;">
                  <!-- 树 -->

                  <el-aside width="200px">
                    <div>
                      <el-tree :data="typedata" node-key="type_id" @node-click="handleNodeClick"></el-tree>
                    </div>
                  </el-aside>
                </el-col>

                <el-col :span="21">
                  <!-- 轮播图  之前是将判断在轮播图 v-if="TreeSee"-->
                  <div style="width: 100%;">
                    <template>
                      <el-carousel indicator-position="outside" height="500px">
                        <el-carousel-item v-for="item in 5" :key="item">
                          <h3>{{ item }}</h3>
                        </el-carousel-item>
                      </el-carousel>
                    </template>
                  </div>
                </el-col>
              </el-container>
            </div>
          </el-col>
        </div>
      </el-row>

      <!-- 主要数据 -->
      <el-row>
        <el-col :span="24">
          <!-- style="min-height:1355px;" 设置最大高度 bg-purple -->
          <el-aside style=" position: absolute;width:200px;">
            <div v-if="TreeTable">
              <el-tree :data="typedata" node-key="type_id" @node-click="handleNodeClick"></el-tree>
            </div>
          </el-aside>
          <div class="grid-content" style="min-height:500px;">
            <el-row style="margin-left: 200px;">
              <el-col
                :span="5"
                v-for="(good,index) in goodLists"
                :key="good.t_gid"
                :offset="0"
                style="margin-left: 20px;"
              >
                <!-- :offset="index > 0 ? 4 : 0"  设置偏移量 -->
                <el-card :body-style="{ padding: '0px' }">
                  <img
                    style="cursor:pointer"
                    @click="toDetails(good,index)"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                  <div style="margin-left: 0px;">
                    <span @click="toDetails(good,index)">
                      <b style="color:red;font-size:40px;cursor:pointer">{{good.t_name}}</b>
                    </span>
                    <br />
                    <span>
                      <b style="color:red;font-size:30px">价格:${{good.t_price}}</b>
                    </span>
                    <br />
                    <span>销量:{{good.t_sales}}</span>
                    <br />
                    <span>简介:{{good.t_document}}</span>
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                      style="float:right;font-size:20px;"
                      @click="BuyGoods(good)"
                      type="danger"
                    >购买</el-button>
                    <el-button
                      style="float:right;font-size:20px;"
                      type="primary"
                      @click="addCard(good.t_gid,good.t_price)"
                    >加入购物车</el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-pagination
            style="margin-left: 400px;margin-top: 30px"
            background
            layout="prev, pager, next"
            :page-count="pageCount"
            :current-page="curnum"
            @current-change="gotoPage"
          ></el-pagination>
        </el-col>
      </el-row>

      <!-- 脚 -->
      <el-row>
        <el-col :span="24">
          <div
            class="aa"
            style="
                                     height: 100px;
                                     margin-top: 35px;"
          >
            <hr />
            <a
              class="p-foot"
              href="https://jq.qq.com/?_wv=1027&k=5VLp93o"
              target="_blank"
            >集中点滴力量，聚成汪洋大海。版权 ©所有:太平洋项目组</a>
          </div>
        </el-col>
      </el-row>
      <!-- <el-form>
        <input class="file" type="file" id="excelbiao" title="请选择文件" value="请选择文件" />
      </el-form>
      <el-button type="success" @click="saveStudent" icon="el-icon-download">走你</el-button>-->
      <!-- 上传     :action="action" -->
      <!-- <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" @click="exportData" icon="el-icon-download">导出数据</el-button>
        </el-form-item>

        <el-form-item>
          <el-upload
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :disabled="importDataDisabled"
            style="display: block;margin-right: 8px"
            action="http://localhost:8100/upLoadExcel/"
          >
            <el-button
              :disabled="importDataDisabled"
              type="success"
              :icon="importDataBtnIcon"
            >{{importDataBtnText}}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>-->
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
import { getToken } from "@/permissions/auth";
import top from "@/components/firstPage/top";
import recommend from "@/components/firstPage/recommend";
import qs from "qs";
export default {
  name: "FirstPage",
  data() {
    return {
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
          this.goodLists = res.data.list;
          this.pageCount = res.data.pageSize;
          this.curnum = res.data.pageNum;
        });
      } else {
        this.getGoods();
      }
    },
    /* 分页   */
    gotoPage(val) {
      this.curnum = val;
      if (this.GoodsNames.findName != "") {
        this.TreeSee = false; //干掉萝卜兔
        this.TreeTable = true; //放开表格树
        // this.Myposition = "absolute"; //暂时下先不用
        this.getGoods();
      }
      if (this.queryForm.t_type_id != "0") {
        this.TreeSee = false; //干掉萝卜兔
        this.TreeTable = true; //放开表格树
      } else {
        this.getGoods();
      }
    },
    // 判断用户
    getUser() {
      this.UserForm = getToken();

      console.log("欢迎用户:" + this.UserForm.user.userId);
      // this.UserForm = "";
      if (this.GoodsNames.t_name != "") {
        this.TreeSee = false;
        this.Myposition = "absolute";
      }
    },
    // 加载商品
    getGoods() {
      console.log(this.GoodsNames);
      this.TreeSee = true; //干掉萝卜兔
      this.TreeTable = false; //放开表格树
      // this.Myposition = "absolute"; //暂时下先不用
      axios({
        url: "/rest/goods/findList?pageNum=" + this.curnum + "&pageSize=4",
        method: "post",
        data: qs.stringify(this.GoodsNames)
      }).then(res => {
        console.log(res.data.list);
        this.goodLists = res.data.list;
        this.pageCount = res.data.pageSize;
        this.curnum = res.data.pageNum;
      });
    },
    // 加载树
    getTypes() {
      axios({
        url: "/rest/type/getTypList",
        method: "post"
      }).then(res => {
        this.typedata = res.data;
      });
    },
    // 树改变触发
    handleNodeClick(data, node, vuecomponent) {
      this.TreeSee = false; //干掉萝卜兔
      this.TreeTable = true; //放开表格树
      // this.Myposition = "absolute"; //暂时下先不用
      var goodsId = node.key;
      axios({
        method: "get",
        url: "/rest/goods/findList?pageNum=" + this.curnum + "&pageSize=4",
        params: {
          t_type_id: goodsId
        }
      }).then(res => {
        this.goodLists = res.data.list;
        this.pageCount = res.data.pageSize;
        this.curnum = res.data.pageNum;
      });
    },
    // 购买商品
    BuyGoods(goods) {
      this.$message.success("准备后期扩展支付宝接口");
    }
  },
  mounted() {
    this.getUser(), this.getGoods(), this.getTypes();
    this.action = "http://localhost:8100/upLoadExcel/";
  },
  created() {}
};
</script>

<style>
/* 设置card宽度 */
.el-col-5 {
  width: 22.83333%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background: url("../../assets/lb1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.el-carousel__item:nth-child(2n + 1) {
  background: url("../../assets/lb2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item:nth-child(3) {
  background: url("../../assets/lb3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item:nth-child(4) {
  background: url("../../assets/lb4.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item:nth-child(5) {
  background: url("../../assets/lb5.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bg-purple-dark {
  background-color: #acd6ff;
}
.bg-purple {
  background: white;
  margin-top: 35px;
}
.bg-purple-light {
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
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
/* 设置logo为白色 */
.bg-purple {
  background: white;
}
</style>
