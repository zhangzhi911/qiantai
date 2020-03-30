<template>
  <el-main>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline"></el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="order_id" label="订单"></el-table-column>
      <el-table-column prop="order_cargotype" label="货物类型"></el-table-column>
      <el-table-column prop="order_departure" label="出发地"></el-table-column>
      <el-table-column prop="order_destination" label="到达地"></el-table-column>
      <el-table-column prop="order_linkmanphone" label="联系电话"></el-table-column>
      <el-table-column prop="order_linkmanname" label="联系姓名"></el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="scope">
          <span v-for="a in scope.row.carList">{{a.cartype_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.order_id)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :v-model="look"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      是否到达:{{look.order_detail_ifarrive}}
      <br />
      <br />
      司机:{{look.order_detail_drivername}}
      <br />
      <br />
      司机电话:{{look.order_detail_driverphone}}
      <br />
      <br />
      车牌号:{{look.order_detail_licenseplatenumber}}
      <br />
      <br />
      运费险:{{look.order_detail_freightinsurance}}
      <br />
      <br />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <br />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="gotoPage"
    ></el-pagination>
  </el-main>
</template>

<script>
const axios = require("axios");
export default {
  name: "page4",
  data() {
    return {
      tableData: [],
      pageCount: 0,
      queryForm: {
        pageNo: 0,
        pageSize: 5
      },
      carList: [],
      detailList: [],
      dialogVisible: false,
      look: {}
    };
  },
  methods: {
    handleClick(order_id) {
      this.dialogVisible = true;
      axios({
        url: "/rest/detail/byid",
        method: "get",
        params: { order_detail_id: order_id }
      }).then(res => {
        this.look = res.data;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    getList() {
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
          this.cartype_name = a.cartype_name;

          this.detailList = a.detailList;
          this.order_detail_ifarrive = a.order_detail_ifarrive;
        });
      });
    },

    gotoPage(pageNo) {
      this.queryForm.pageNo = pageNo;
      this.getList();
    },
    onSubmit() {
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
</style>
