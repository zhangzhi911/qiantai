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
      <el-table-column prop="order_isverify" label="审核状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_isverify===1?'success':'danger'"
          >{{scope.row.order_isverify==1?'审核通过':'审核未通过'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_reason" label="备注"></el-table-column>
      <el-table-column label="是否通过">
        <template slot-scope="scope">
          <span type="success" v-if="scope.row.order_isverify==0">
            <el-tag style="cursor:pointer;" @click="inture(scope.row.order_id)">通过</el-tag>
            <el-tag style="cursor:pointer;" @click="inflase(scope.row.order_id)" type="danger">驳回</el-tag>
          </span>
          <el-tag type="danger" v-if="scope.row.order_isverify==2">已完成驳回</el-tag>
          <el-tag v-if="scope.row.order_isverify==1">已完成审核</el-tag>
          <el-tag v-if="scope.row.order_isverify==3">发货中</el-tag>
          <el-tag v-if="scope.row.order_isverify==4">已收货</el-tag>
          <!-- <el-switch
            v-model="scope.row.order_isverify"
            @change="flag(scope.$index, scope.row)"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>-->
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
import { ordertrue } from "../../api/index";
import { orderfalse } from "../../api/index";
export default {
  name: "page4",
  data() {
    return {
      tableData: [],
      pageCount: 0,
      queryForm: {
        pageNo: 0,
        pageSize: 10
      },
      userList: []
    };
  },
  methods: {
    getList() {
      axios({
        url: "/rest/torder/list",
        method: "post",
        data: this.queryForm
      }).then(res => {
        this.tableData = res.data.list;
        // console.log(res.data.list);
        this.pageCount = res.data.pages;

        this.tableData.forEach(a => {
          this.userList = a.userList;
          // console.log(this.carList)
          this.user_name = a.user_name;
        });
      });
    },

    gotoPage(pageNo) {
      this.queryForm.pageNo = pageNo;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
    inture(id) {
      // console.log(id);
      ordertrue(id).then(res => {
        this.getList();
      });
    },
    inflase(id) {
      // console.log(id);
      orderfalse(id).then(res => {
        this.getList();
        return;
      });
    },
    flag(row, $index) {
      var order_id = $index.order_id;
      if ($index.order_isverify == 2) {
        ordertrue(order_id).then(res => {
          this.getList();
        });
      } else {
        orderfalse(order_id).then(res => {
          this.getList();
          return;
        });
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
</style>
