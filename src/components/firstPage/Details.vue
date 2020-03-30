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
              <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">
                <b style="color:red">{{UserForm.user.user_name}}</b>
              </el-link>
              <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">退出</el-link>
            </span>
            <!-- 右侧 -->
            <span v-if="UserForm!=null">
              <el-link href="#/login" style="float: right; margin-top: 2mm;margin-right: 35px;">我的订单</el-link>
            </span>
            <!-- 以上是判断是否显示 -->
          </div>
        </el-col>
      </el-row>
      <!-- 下面是搜索 -->
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

      <div style="margin-bottom: 0px"></div>
      <!-- 以下是分类 -->
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
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <!-- 一下是商品 -->
      <el-row>
        <el-col :span="4">
          <!-- 品牌图 -->
          <div>
            <el-image
              style="width: 100px; height: 100px;margin-top: 30px;float: right;margin-right: 10px"
              :src="brandUrl"
            ></el-image>
          </div>
        </el-col>
        <!-- 图片 -->
        <el-col :span="7">
          <div class="demo-image__preview">
            <el-image style="width: 343px; height: 300px" :src="ImgUrl" :preview-src-list="srcList"></el-image>
            <div>
              <el-image
                v-for="img in imgUrl "
                :key="null"
                style="width: 65px; height: 55px;margin-right: 5px"
                :src="img.url"
                @click="getIndex(img.url)"
              ></el-image>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <div style="margin-top: 30px;float: left;margin-left: 10px">
            <el-tag>{{goods.t_brand}}</el-tag>
            <p style="font-weight: 700">{{goods.t_name}},{{goods.t_document}}</p>
            <font size="2" style="color:#dadada;">{{goods.t_document}}</font>
            <div style="background: #F5F7FA;height: 80px">
              <font size="2" style="color: #475669">价格:</font>&nbsp;
              <font style="color:red;font-weight: 700" size="6">￥{{goods.t_price}}</font>
              <br />
              <font size="2" style="color: #475669">使用优惠券:</font>
              <el-input
                placeholder="暂无优惠券"
                size="mini"
                style="width: 150px; margin-top: 5px"
                :disabled="true"
              ></el-input>
            </div>
            <div style="float: left;margin-top: 13px">
              <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="配送:" size="mini" :label-width="formLabelWidth" prop="value">
                  <el-cascader v-model="form.value" :options="options" @change="handleChange"></el-cascader>
                </el-form-item>
              </el-form>
              <font size="3" style="color: #475669">运费:&nbsp;&nbsp;</font>
              <el-tag type="success">卖家包邮</el-tag>
              <el-tag type="warning" style="margin-bottom: 10px">七天无理由</el-tag>
              <br />
              <font size="3" style="color: #475669">数量:&nbsp;&nbsp;</font>
              <template>
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  size="mini"
                  label="描述文字"
                ></el-input-number>
              </template>
              <br />
              <el-button
                type="danger"
                @click="addCar()"
                style="margin-top: 15px"
                class="el-icon-goods"
              >加入购物车</el-button>
            </div>
          </div>
        </el-col>
        <!-- 评论模块 -->
      </el-row>
      <Mycommont></Mycommont>

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
    </div>
  </el-main>
</template>

<script>
import Mycommont from "./Commont";
import axios from "axios";
import { getToken } from "@/permissions/auth";
import qs from "qs";
export default {
  components: {
    Mycommont
  },
  name: "Details",
  data() {
    return {
      queryForm: {}, //单选框
      //查询
      GoodsNames: {
        findName: "",
        t_name: "",
        t_type_id: ""
      },
      num: 1,
      form: {
        value: "北京"
      },
      formLabelWidth: "54px",
      options: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳区",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                }
              ]
            },
            {
              value: "daohang",
              label: "海淀区",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                }
              ]
            }
          ]
        },
        {
          value: "henan",
          label: "河南",
          children: [
            {
              value: "basic",
              label: "郑州",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                },
                {
                  value: "e",
                  label: "5"
                }
              ]
            },
            {
              value: "form",
              label: "洛阳",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                }
              ]
            },
            {
              value: "data",
              label: "3",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "黑龙江",
          children: [
            {
              value: "axure",
              label: "哈尔滨"
            },
            {
              value: "sketch",
              label: "佳木斯"
            },
            {
              value: "jiaohu",
              label: "牡丹江"
            }
          ]
        }
      ],
      rules: {
        value: [{ required: true, message: "请选择配送地址", trigger: "blur" }]
      },
      goods: {},
      //   src: require("../../assets/logo3.jpg"),
      src: require("@/assets/logo3.jpg"),
      goodList: {},
      input3: "",
      select: "",
      UserForm: { user: {} }, //用于用户存储
      user: {
        id: 1,
        name: "张三"
      },
      brandUrl: require("../../assets/brand1.png"), //品牌图
      ImgUrl: require("../../assets/goods0.png"), //大图
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
      ]
    };
  },

  methods: {
    addCar() {
      const uid = this.goods.userId;
      this.$router.push("/car/" + uid);
    },
    handleChange(value) {
      console.log(value);
    },
    //跟换图片的
    getIndex(imgUrl) {
      this.ImgUrl = imgUrl;
    },
    // 搜索下分类
    onSubmit() {
      this.$router.push("/FirstPage");
    },
    //   搜索的
    submit() {
      this.$router.push("/FirstPage");
    },
    car() {
      const uid = this.user.id;
      this.$router.push("/car/" + uid);
    },
    // 判断用户
    getUser() {
      this.UserForm = getToken();
      console.log("欢迎用户:" + this.UserForm.user.userId);
    },
    //获取商品
    getGoodBy() {
      let good = JSON.parse(localStorage.getItem("GoodBy"));
      this.goods = good;
      console.log(this.goods.t_name + " ");
    }
  },
  mounted() {
    this.getGoodBy(), this.getUser();
  },
  created() {
    //   这个created是干嘛的方法啊
    /*let  user = JSON.parse(sessionStorage.getItem("user"));
            this.user=user*/
  }
};
</script>


<style>
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
