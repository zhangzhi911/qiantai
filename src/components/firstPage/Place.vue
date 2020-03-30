<template>
  <div>
    <el-row>
      <div style="background-color: cornflowerblue;height:35px;margin-bottom: 20px">
        <el-link
          href="#/FirstPage"
          style="color: white;float:left;margin-top: 1mm; margin-left: 10px"
        >
          <el-badge class="item">太平洋购物首页</el-badge>
        </el-link>
        <el-link
          href="#/login"
          style="color: white; float: right; margin-top: 2mm;margin-right: 10px;"
        >
          <el-badge :value="num" class="item">购物车</el-badge>
        </el-link>

        <el-link
          href="#/home"
          style="color: white; float: right; margin-top: 2mm;margin-right: 10px;"
        >{{UserForm.user.user_name}}</el-link>

        <el-link
          @click="login"
          style="color: white; float: right; margin-top: 2mm;margin-right: 10px;"
        >退出登录</el-link>
      </div>
      <!-- 以上是头 -->
      <el-col :span="20" :offset="2">
        <div class="grid-content bg-purple" height="200px;">
          <el-card>
            <!-- 用户下单 -->
            <div slot="header" class="clearfix">
              <span>
                <b>用户下单</b>
              </span>

              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>

            <!-- 收货地址 -->
            <div style="display:block;height:180px;">
              <p>
                <b>收货地址</b>
              </p>
              <div v-for="ad in address" style="display:block;float:left;">
                <el-radio
                  v-model="addresRadio"
                  :label="ad.flag"
                  border
                  @change="getRadioVal(ad)"
                  style="height:120px;wide:200px;"
                >
                  {{ad.id}}
                  收货地址
                  <p>姓名:{{ad.t_name}}</p>
                  <p>手机:{{ad.t_phone}}</p>
                  <p>地址:{{ad.t_address}}</p>
                </el-radio>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div style="display:block;float:left;">
                <el-button
                  :disabled="registerShow"
                  @click="dialogVisible = true"
                  style="height:120px;wide:200px;border:5px;solid:red;"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                  <span>使用新的地址</span>
                </el-button>
              </div>
            </div>

            <!-- 新的地址弹框 -->
            <el-dialog :visible.sync="dialogVisible" title="下单" width="30%">
              <span>收货地址</span>
              <hr />
              <br />
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="收件人">
                  <el-input v-model="formLabelAlign.t_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="formLabelAlign.t_phone"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="formLabelAlign.t_address"></el-input>
                </el-form-item>
                <el-form-item label="选择物流">
                  <el-input v-model="formLabelAlign.t_message"></el-input>
                </el-form-item>
              </el-form>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAddress">确 定</el-button>
              </span>
            </el-dialog>

            <!-- 支付方式 -->
            <div style="display:block;height:100px;">
              <p>
                <b>支付方式</b>
              </p>
              <div v-for="pa in payment " style="display:block;float:left;">
                <el-radio
                  v-model="paymentRadio"
                  :label="pa.id"
                  border
                  @change="getPayment(pa)"
                >{{pa.name}}</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
            <hr />

            <!-- 颜色选择器 -->
            <div class="block">
              <el-color-picker></el-color-picker>
            </div>

            <!-- 下单商品 -->
            <div style="display:block;">
              <p>下单商品</p>
              <template>
                <el-table
                  height="500px"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%;"
                >
                  <el-table-column label="商品信息" width="150px;">
                    <template slot-scope="scope">
                      <el-image
                        :src="'http://localhost:8094/showImg?pathName='+scope.row.goods.t_image"
                        style="width: 100px; height: 100px"
                      ></el-image>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope" style="color: red">商品名称：{{scope.row.goods.t_name}}</template>
                  </el-table-column>

                  <el-table-column label="￥数量*小计" width="180">
                    <template slot-scope="scope">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <h2 style="color:red;">{{scope.row.t_count}} *{{scope.row.goods.t_price}}￥</h2>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>

            <!-- 总计 -->
            <div style="display:block">
              <h2 style="float:right;">总计:{{totalPrice}}</h2>
            </div>

            <!-- 发票信息 -->
            <div style="display:block;height:100px;">
              <p>
                <b>发票信息</b>
              </p>
              <div style="display:block;float:left;">
                <el-radio v-model="fapiao" label="1" border @change="getFapiao">是</el-radio>
                <el-radio v-model="fapiao" label="0" border @change="getFapiao">否</el-radio>
              </div>
            </div>

            <hr />
            <!-- 优惠卷 -->
            <div style="display:block;height:180px;">
              <p>
                <b>使用优惠卷</b>
              </p>
              <div style="display:block;float:left;">
                <div v-for="co in coupons" style="display:block;float:left;border-color:#AAA7A2">
                  <el-checkbox
                    v-model="youhui"
                    :label="co.price"
                    border
                    style="height:120px;wide:200px;"
                  >
                    {{co.name}}
                    <h1>￥{{co.price}}.00</h1>
                    {{co.document}}
                    <h6>{{co.timeout}}</h6>
                  </el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>
            <!-- 金额抵用 -->
            <div style="display:inline;height:180px;wide:100%;background-color:red;">
              <p style="background-color:#C6C6C6;">
                <br />
                金额抵用:￥{{youhuiPrice}}.00
                <br />&nbsp;
              </p>
            </div>
            <!-- 下单 -->
            <div style="display:block;">
              <span>
                {{num}}件商品，总金额：
                <b style="color:red;">￥{{totalPrice}}.00</b>
                <br />
                优惠：￥{{youhuiPrice}}.00
                <br />
                应该付金额：￥{{totalPrice-youhuiPrice}}.00
                <br />物流信息:
                <b>{{formLabelAlign.t_message}}</b>(太平洋自营物流)
                <br />
                收货地址：{{formLabelAlign.t_address}}
              </span>
              <el-button type="danger" style="float:right;" @click="submit">确定下单</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- 脚丫子 -->
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
</template>
<script>
import axios from "axios";
import { getToken } from "@/permissions/auth";
import qs from "qs";
import router from "@/router";
export default {
  data() {
    return {
      registerShow: false, //添加按钮显示
      labelPosition: "right", //下单表单
      UserForm: { user: {} }, //用于用户存储
      radio1: "1",
      addresRadio: 1, //收货地址
      paymentRadio: "3", //支付方式
      fapiao: "1",
      youhui: [], //优惠卷
      youhuiPrice: 0, //优惠价格
      totalPrice: 0, //总价格
      num: 0, //数量
      //添加地址弹框
      dialogVisible: false,
      //   优惠卷
      coupons: [
        {
          id: "1",
          name: "店铺优惠",
          price: 300,
          document: "满1000可用",
          timeout: "有效期至2025.01.01"
        },
        {
          id: "2",
          name: "店铺活动",
          price: 100,
          document: "满500可用",
          timeout: "有效期至2025.01.01"
        },
        {
          id: "3",
          name: "太平洋优惠",
          price: 500,
          document: "全网通用",
          timeout: "有效期至2021.01.01"
        }
      ],
      //要提交的信息
      formLabelAlign: {
        id: "1",
        t_name: "张三",
        t_phone: "1593446294",
        t_address: "北京市海淀区苏家坨镇温北路8号",
        flag: 3,
        t_message: "太平洋全球通",
        user_id: 2,
        Payment: "微信",
        fapiao: "是",
        youhuiPrice: 0, //优惠价格
        totalPrice: 0, //总价格
        num: 0 //数量
      },
      //   收货地址
      address: [
        {
          id: "1",
          t_name: "张三",
          t_phone: "1593446294",
          t_address: "北京市海淀区苏家坨镇温北路8号",
          flag: "0"
        },
        {
          id: "2",
          t_name: "张三",
          t_phone: "1593446294",
          t_address: "北京市海淀区苏家坨镇温北路8号",
          flag: "1"
        },
        {
          id: "3",
          t_name: "张三",
          t_phone: "1593446294",
          t_address: "北京市海淀区苏家坨镇温北路8号",
          flag: "1"
        }
      ],
      //付款方式
      payment: [
        {
          id: "1",
          name: "支付宝"
        },
        {
          id: "2",
          name: "微信"
        },
        {
          id: "3",
          name: "货到付款"
        }
      ],
      tableData: []
    };
  },
  methods: {
    // 确定付款
    submit() {
      this.formLabelAlign.youhuiPrice = this.youhuiPrice;
      this.formLabelAlign.totalPrice = this.totalPrice;
      this.formLabelAlign.num = this.num;
      this.addorder2();
    },
    // 真正添加的代码
    addorder2() {
      // let formData = [];
      this.tableData.forEach((e, index) => {
        this.formLabelAlign["goods[" + index + "].t_gid"] = e.goods.t_gid;
        this.formLabelAlign[
          "goods[" + index + "].num"
        ] = this.formLabelAlign.num;
        this.formLabelAlign[
          "goods[" + index + "].tName2"
        ] = this.formLabelAlign.t_name;
        this.formLabelAlign[
          "goods[" + index + "].tPhone"
        ] = this.formLabelAlign.t_phone;
        this.formLabelAlign["goods[" + index + "].BuyOrderId"] = e.goods.t_gid;
        this.formLabelAlign["goods[" + index + "].t_name"] = e.goods.t_name;
        this.formLabelAlign["goods[" + index + "].t_document"] =
          e.goods.t_document;
        this.formLabelAlign["goods[" + index + "].t_brand"] = e.goods.t_brand;
        this.formLabelAlign["goods[" + index + "].t_image"] = e.goods.t_image;
        this.formLabelAlign["goods[" + index + "].t_price"] = e.goods.t_price;
        this.formLabelAlign["goods[" + index + "].t_color"] = e.goods.t_color;
        this.formLabelAlign["goods[" + index + "].t_sales"] = e.goods.t_sales;
      });
      console.log(this.formLabelAlign);
      this.insertOrder(this.formLabelAlign);
    },
    // 添加订单
    addOrder() {
      this.tableData.forEach((e, index) => {
        this.formLabelAlign = Object.assign(
          {},
          this.formLabelAlign,
          this.tableData[index]
        );
        // 第一次遍历，将数据添加进去
        this.$delete(this.formLabelAlign, "goods"); //vue删除方式
        this.$delete(this.formLabelAlign, "user"); //vue删除方式
        this.formLabelAlign = Object.assign(
          {},
          this.formLabelAlign,
          this.tableData[index].goods
        );
        this.formLabelAlign = Object.assign(
          {},
          this.formLabelAlign,
          this.tableData[index].user
        );
        // this.insertOrder(this.formLabelAlign);
      });
      console.log(this.formLabelAlign);
    },
    // 发送到后台
    insertOrder(row) {
      axios({
        url: "rest/order/addOrder2",
        method: "post",
        data: qs.stringify(row)
      }).then(res => {
        this.$message.success("下单成功！~");
        router.push({ path: "/orlder" });
      });
    },
    // 发票
    getFapiao(val) {
      if (val == "0") {
        this.formLabelAlign.fapiao = "不要";
      } else {
        this.formLabelAlign.fapiao = "要";
      }
    },
    // 支付选择
    getPayment(val) {
      this.formLabelAlign.Payment = val.name;
      console.log(this.formLabelAlign);
    },
    // 添加新的地址
    addAddress() {
      this.registerShow = true;
      this.addresRadio = this.formLabelAlign.flag;
      this.address.push(this.formLabelAlign);
    },
    // 收货地址触发
    getRadioVal(val) {
      // this.formLabelAlign.push();
      this.formLabelAlign = val;
      console.log(this.formLabelAlign);
    },
    // 获取商品，和地址
    getGoods() {
      let good = JSON.parse(localStorage.getItem("GoodBy"));
      this.tableData = good;
      this.UserForm = getToken();
      this.formLabelAlign.user_id = this.UserForm.user.userId;
      console.log(this.formLabelAlign.user_id);
      this.num = JSON.parse(localStorage.getItem("Goodnum"));
      this.totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

      axios({
        url: "/rest/address/findlist",
        method: "post",
        data: qs.stringify({ id: this.UserForm.user.userId })
      }).then(res => {
        this.address = res.data;
      });

      // axios({
      //   url: "/rest/car/getCarList",
      //   method: "post",
      //   data: qs.stringify({ t_uid: this.UserForm.user.userId })
      // }).then(res => {
      //   this.tableData = res.data;
      // });
    },
    // 退出
    login() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getGoods();
  },
  watch: {
    youhui: function(val) {
      this.youhuiPrice = 0;
      val.forEach(e => {
        this.youhuiPrice += e;
      });
      console.log("最后" + this.youhuiPrice);
    }
  }
};
</script>
<style>
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
.el-card__header {
  background-color: #4db5f1;
}
.el-table__header th {
  /* background-color: #17b3a3; */
  background-color: #dedddd;
  color: black;
}
.el-table__body td,
.el-table__body th {
  /* background-color: #f1edc5;
  color: black; */
  padding: 1px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
