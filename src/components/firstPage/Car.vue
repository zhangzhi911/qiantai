<template>
  <el-main>
    <div style="margin-right: 70px;margin-left: 70px;">
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
      <el-card shadow="always">
        <p style="float:left;margin-top: 1px">购物清单</p>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="商品信息">
            <template slot-scope="scope">
              <img
                :src="'http://localhost:8094/showImg?pathName='+scope.row.goods.t_image"
                style="height: 40px;width: 45px"
              />
              商品名称：{{scope.row.goods.t_name}}
              <br />
              <hr />
              简介：{{scope.row.goods.t_document}}
            </template>
          </el-table-column>
          <el-table-column label="￥单价" width="180">
            <template slot-scope="scope" style="color: red">￥{{scope.row.goods.t_price}}</template>
          </el-table-column>
          <el-table-column label="数量" prop="t_sum" width="180">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.t_count"
                :min="0"
                @change="handleChangeSum(scope.$index,scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="￥小计" width="180">
            <template slot-scope="scope">
              <p style="color: red;font-weight: 900">￥{{scope.row.t_sum}}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="del(scope.row.t_id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="float: left">
          使用优惠券
          <el-input placeholder="暂无优惠券" size="mini" style="width: 150px;" :disabled="true"></el-input>
          <el-button size="mini" type="primary">确定</el-button>
        </div>
        <div style="float: right">
          <template>
            <span>
              共计：
              <font style="color:red;font-weight: 900">{{num}}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应付金额：
              <font
                style="color:red;font-weight: 900"
              >{{totalPrice}}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <el-button size="mini" type="primary" @click="bill">现在结算</el-button>
          </template>
        </div>
      </el-card>
      <recommend></recommend>
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
import axios from "axios";
import { getToken } from "@/permissions/auth";
import qs from "qs";
import recommend from "@/components/firstPage/recommend";

export default {
  name: "Car",
  components: {
    recommend
  },
  data() {
    return {
      formLabelAlign: {
        name: "",
        phone: "",
        t_way: "",
        t_message: "",
        t_uid: ""
      },
      dialogVisible: false, //下单框
      currentRow: "", //实现单选
      user: "",
      UserForm: { user: {} }, //用于用户存储
      tableData: [],
      totalPrice: 0, //总价格
      num: 0, //数量
      subtotal: 0,
      productList: []
    };
  },
  methods: {
    //修改总金额的
    handleChangeSum(index, row) {
      let asum = this.tableData[index].t_sum;
      console.log("原来的" + asum);
      asum = this.totalPrice - asum;
      console.log("的totalPrice" + asum);

      row.t_sum = new Number(row.t_count * row.goods.t_price); //给定现在的值  第一种方法
      // this.tableData[index].t_sum = "0"; 第二种方法
      // this.$set(this.tableData, index, row); 直接修改的
      this.totalPrice = new Number(asum + row.t_sum);
    },
    // 显示总金额
    handleChange() {
      this.totalPrice = 0;
      this.productList = [];
      this.num = 0;
      this.tableData.forEach(entity => {
        if (entity.t_count > 0) {
          entity.t_sum = entity.t_count * entity.goods.t_price; //每条数量乘以价格
          this.totalPrice = new Number(this.totalPrice + entity.t_sum);
          this.num = new Number(this.num + entity.t_count);
          this.productList[this.productList.length] = entity;
        } else {
          entity.t_sum = 0;
        }
      });
    },
    // 下单
    bill() {
      let order = {
        total_Price: this.totalPrice,
        num: this.num
      };
      localStorage.setItem("GoodBy", JSON.stringify(this.tableData));
      localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));
      localStorage.setItem("Goodnum", JSON.stringify(this.num));
      this.$router.push("/Place");
    },
    insertOrder(row) {
      axios({
        url: "rest/order/addOrder",
        method: "post",
        data: qs.stringify(row)
      }).then(res => {
        console.log(res);
      });
    },

    login() {
      this.$router.push("/login");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getList() {
      // let user = JSON.parse(sessionStorage.getItem("user"));
      this.UserForm = getToken();

      console.log("欢迎用户:" + this.UserForm.user.userId);
      axios({
        url: "/rest/car/getCarList",
        method: "post",
        data: qs.stringify({ t_uid: this.UserForm.user.userId })
      }).then(res => {
        console.log(res.data);
        this.tableData = res.data;
        this.handleChange();
      });
      this.UserForm = getToken();
    }
  },
  mounted() {
    this.getList();
  },
  created() {}
};
</script>

<style scoped>
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
