<template>
  <el-main>
    <div style="margin-right: 70px;margin-left: 70px;">
      <div style="background-color: cornflowerblue;height:35px;margin-bottom: 20px">
        <p style="color: white;float:left;margin-top: 1mm; margin-left: 10px">太平洋购物首页</p>
        <el-link
          href="#/login"
          style="color: white; float: right; margin-top: 2mm;margin-right: 10px;"
        >
          <el-badge :value="num" class="item">购物车</el-badge>
        </el-link>
        <p
          style="color: white; float: right; margin-top: 1mm;margin-right: 10px;"
        >{{UserForm.user.user_name}}</p>
        <el-link
          @click="login"
          style="color: white; float: right; margin-top: 2mm;margin-right: 10px;"
        >退出登录</el-link>
      </div>

      <!-- 以上是头 -->
      <el-card shadow="always">
        <p style="float:left;margin-top: 1px">订单信息</p>

        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'#F3F4F7',color:'#555'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="订单内商品信息">
            <template slot-scope="scope">
              <el-table
                border
                ref="multipleTable"
                :data="scope.row.goods"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#F3F4F7',color:'#555'}"
              >
                <el-table-column label="商品信息" width="300px">
                  <template slot-scope="scope">
                    <img
                      :src="'http://localhost:8094/showImg?pathName='+scope.row.t_image"
                      style="height: 40px;width: 45px"
                    />
                    商品名称：{{scope.row.t_name}}
                    <hr />
                    简介：{{scope.row.t_document}}
                    <br />发货地:北京市、海淀区
                  </template>
                </el-table-column>

                <el-table-column label="￥单价">
                  <template slot-scope="scope" style="color: red">￥{{scope.row.t_price}}</template>
                </el-table-column>

                <el-table-column label="#数量">
                  <template slot-scope="scope" style="color: red">￥{{scope.row.num}}</template>
                </el-table-column>
              </el-table>

              <!-- 里面的脚 -->
            </template>
          </el-table-column>

          <!-- 外面 -->

          <el-table-column label="￥付款金额" width="100">
            <template slot-scope="scope">
              <p style="color: red;font-weight: 900">￥{{scope.row.totalPrice}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="物流信息"
            :header-cell-style="{background:'#F3F4F7',color:'#555',align:'center'}"
          >
            <el-table-column label="收货人" width="100px">
              <template>赵四</template>
            </el-table-column>
            <el-table-column label="地址信息">
              <el-table-column label="联系方式" width="180">
                <template>1563355026</template>
              </el-table-column>

              <el-table-column label="收货地址" width="180">
                <template slot-scope="scope">
                  <p style="color: red;font-weight: 900">{{scope.row.t_address}}</p>
                </template>
              </el-table-column>

              <el-table-column label="物流信息" width="180">
                <template slot-scope="scope">
                  <p>
                    运输中...
                    <el-button @click="dialogVisible = true">查看</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog title="物流信息提示" :visible.sync="dialogVisible" width="40%">
        <div>
          <logistic></logistic>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

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
    </div>
  </el-main>
</template>

<script>
import logistic from "@/components/firstPage/logistics";
import axios from "axios";
import { getToken } from "@/permissions/auth";
import qs from "qs";
export default {
  name: "Car",
  components: {
    logistic
  },
  data() {
    return {
      dialogVisible: false,
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
        url: "/rest/order/getBuyOrder",
        method: "post",
        data: qs.stringify({ id: this.UserForm.user.userId })
      }).then(res => {
        console.log(res.data);
        this.tableData = res.data;
        // this.handleChange();
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
.el-table__header th {
  background-color: #dedddd;
  color: black;
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
