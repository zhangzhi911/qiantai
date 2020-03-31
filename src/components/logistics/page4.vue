<template>
  <el-main>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline"></el-form>

    <el-table :data="tableData" style="width: 100%">
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

      <el-table-column prop="order_reason" label="备注"></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.order_detail)" type="text" size="small">详情</el-button>
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
        pageSize: 5,
        order_isverify: "3"
      },
      carList: [],
      detailList: [],
      look: {}
    };
  },
  methods: {
    handleClick(order_detail) {
      localStorage.setItem("order_id", JSON.stringify(order_detail));
      this.$router.push("/logistcsOrderDetail");
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
