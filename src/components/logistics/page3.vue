<template>
  <el-main>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline"></el-form>
    <!--     
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="warehouse_id" label="仓库"></el-table-column>
      <el-table-column prop="warehouse_name" label="仓库名称"></el-table-column>
      <el-table-column prop="warehouse_type" label="仓库类型"></el-table-column>
      <el-table-column prop="warehouse_floorspace" label="占地面积"></el-table-column>
      <el-table-column prop="warehouse_address" label="仓库地址"></el-table-column>
      <el-table-column prop="order_id" label="订单id"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.order_id)" type="text" size="small">发货</el-button>
        </template>
      </el-table-column>
    </el-table>-->

    <el-table :data="tableData2" style="width: 100%">
      <el-table-column prop="order_id" label="货物类型"></el-table-column>
      <el-table-column label="出发地→目的地">
        <template slot-scope="scope">{{scope.row.order_departure}}→{{scope.row.order_destination}}</template>
      </el-table-column>
      <el-table-column prop="order_cargotype" label="货物类型"></el-table-column>
      <el-table-column prop="order_weight" label="货物重量"></el-table-column>
      <el-table-column prop="order_creationtime" label="下单时间"></el-table-column>
      <el-table-column prop="order_linkmanphone" label="联系电话"></el-table-column>
      <el-table-column prop="order_linkmanname" label="联系姓名"></el-table-column>
      <el-table-column label="下单用户" width="120">
        <template slot-scope="scope">
          <span v-for="a in scope.row.userList">{{a.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_isverify" label="审核状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_isverify===1?'success':'danger'"
          >{{scope.row.order_isverify==1?'审核通过':'审核未通过'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <br />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="gotoPage"
    ></el-pagination>

    <el-dialog title="发货" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="出发地">
          <el-input v-model="formInline.order_detail_departure" placeholder="出发地"></el-input>
        </el-form-item>
        <el-form-item label="到达地">
          <el-input v-model="formInline.order_detail_destination" placeholder="到达地"></el-input>
        </el-form-item>
        <el-form-item label="车辆安排">
          <el-select v-model="formInline.driver_id" placeholder="选择车辆">
            <el-option
              v-for="item in options"
              :key="item.driver_id"
              :label="item.driver_name"
              :value="item.driver_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运费险">
          <el-select v-model="formInline.order_detail_freightinsurance" placeholder="运费险">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>


<script>
const axios = require("axios");
export default {
  name: "page4",
  data() {
    return {
      options: [],
      formInline: {},
      tableData: [], //仓库的
      tableData2: [], //货物的
      userList: [],
      pageCount: 0,
      queryForm: {
        pageNo: 0,
        pageSize: 10,
        order_isverify: "1"
      },
      orderList: [],
      dialogVisible: false
    };
  },
  methods: {
    add() {
      this.options.forEach(e => {
        if (e.driver_id == this.formInline.driver_id) {
          console.log(e);
          this.formInline.order_detail_drivername = e.driver_name;
          this.formInline.order_detail_driverphone = e.driver_phonenumber;
          this.formInline.order_detail_driverpicture = e.carList[0].car_colour;
          this.formInline.order_detail_licenseplatenumber =
            e.carList[0].car_licenseplatenumber;
          this.formInline.order_detail_maximum = e.carList[0].car_maximum;
          this.formInline.order_detail_addressx = "121.487899486";
          this.formInline.order_detail_addressy = "31.24916171";
          this.formInline.order_detail_ifarrive = "运输中";
        }
      });
      console.log(this.formInline);

      axios({
        url: "/rest/detail/insert",
        method: "post",
        data: this.formInline
      }).then(res => {
        this.$router.push("/page4");
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },

    getList() {
      axios({
        url: "/rest/tware/list",
        method: "post",
        data: this.queryForm
      }).then(res => {
        this.tableData = res.data.list;
        this.pageCount = res.data.pages;
      });
    },
    // 货物的
    getList2() {
      axios({
        url: "/rest/torder/list",
        method: "post",
        data: this.queryForm
      }).then(res => {
        this.tableData2 = res.data.list;
        // console.log(res.data.list);
        this.pageCount = res.data.pages;

        this.tableData.forEach(a => {
          this.userList = a.userList;
          // console.log(this.carList)
          this.user_name = a.user_name;
        });
      });
    },
    getDriver() {
      axios({
        url: "/rest/tdriver/list",
        method: "post",
        data: this.queryForm
      }).then(res => {
        console.log(res.data.list);
        this.options = res.data.list;
      });
    },

    handleClick(row) {
      // this.formInline = row;
      console.log(row.order_departure);
      this.formInline.cartype_id = row.order_id;
      this.formInline.order_detail_departure = row.order_departure;
      this.formInline.order_detail_destination = row.order_destination;
      this.dialogVisible = true;
    },

    gotoPage(pageNo) {
      this.queryForm.pageNo = pageNo;
      this.getList2();
    },
    onSubmit() {
      this.getList2();
    }
  },
  created() {
    this.getList2();
    this.getDriver();
  }
};
</script>

<style scoped>
</style>
