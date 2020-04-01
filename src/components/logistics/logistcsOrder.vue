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
                    <el-menu
                      :default-active="activeIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                    >
                      <el-menu-item index="1" @click="screen('')">所有订单</el-menu-item>
                      <el-menu-item index="2" @click="screen('3')">运送中</el-menu-item>
                      <el-menu-item index="3" @click="screen('4')">已收货</el-menu-item>
                      <el-menu-item index="4" @click="screen('1')">未发货</el-menu-item>
                      <el-menu-item index="5" @click="screen('2')">驳回</el-menu-item>
                    </el-menu>
                    <el-table border :data="tableData" stripe>
                      <el-table-column label="出发地→目的地">
                        <template
                          slot-scope="scope"
                        >{{scope.row.order_departure}}→{{scope.row.order_destination}}</template>
                      </el-table-column>
                      <el-table-column prop="order_cargotype" label="货物类型"></el-table-column>
                      <el-table-column prop="order_latest" label="最迟到达时间"></el-table-column>
                      <el-table-column prop="order_weight" label="货物重量"></el-table-column>
                      <el-table-column prop="order_creationtime" label="创建订单时间"></el-table-column>
                      <el-table-column prop="order_linkmanphone" label="联系电话"></el-table-column>
                      <el-table-column prop="order_linkmanname" label="联系姓名"></el-table-column>
                      <el-table-column prop="order_reason" label="状态"></el-table-column>

                      <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                          <span v-if="scope.row.order_isverify!==2">
                            <el-button
                              @click="handleClick(scope.row.order_id)"
                              type="text"
                              size="small"
                            >查看详情</el-button>
                          </span>
                          <span v-if="scope.row.order_isverify==2">
                            <el-button type="danger" size="small" :disabled="true">禁止操作</el-button>
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <div style="width:100%"></div>
                      <img src="../../assets/pc1.jpg" style="width: 100%;margin-top: 20px;" />
                    </el-col>
                  </el-row>
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
      tableData: [],
      activeIndex: "1", //table表格用的
      carList: [],
      detailList: [],
      look: [],
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
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        order_isverify: "1",
        user_id: 1
      }, //单选框

      src: require("../../assets/logo3.jpg"), //太平洋logo
      GoodsNames: {
        findName: "",
        t_name: "",
        t_type_id: ""
      }, //查询
      curnum: 1, //当前页
      pageCount: 10 //最大页数
    };
  },
  methods: {
    //   订单明细
    handleClick(order_id) {
      this.$router.push("/logistcsOrderDetail");
    },
    //获取所有订单
    getList() {
      console.log(5);
      axios({
        url: "/rest/torder/list",
        method: "post",
        data: this.queryForm
      }).then(res => {
        this.tableData = res.data.list;
        console.log(res.data.list);
        this.pageCount = res.data.pages;

        this.tableData.forEach(a => {
          this.carList = a.carList;
          // console.log(this.carList)
          this.cartype_name = a.cartype_name;

          this.detailList = a.detailList;
          this.order_detail_ifarrive = a.order_detail_ifarrive;
        });
      });
    },
    screen(id) {
      this.queryForm.order_isverify = id;
      this.getList();
    },
    handleSelect(key, keyPath) {
      //导航菜单点击事件
      console.log(key, keyPath);
    },
    // 进入用户后台
    form() {
      let id = this.UserForm.user.userId;
      console.log(id);
      this.$router.push("/form" + id);
    },

    // 搜索框的方法
    submit() {
      if (this.GoodsNames.findName != "") {
        this.TreeSee = false; //干掉萝卜兔
        this.TreeTable = true; //放开表格树
        // this.Myposition = "absolute"; //暂时下先不用
      }
      // console.log(this.GoodsNames.findName);
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
    this.getUser(),
      this.getList(),
      (this.action = "http://localhost:8100/upLoadExcel/");
  },
  created() {
    this.getList();
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
