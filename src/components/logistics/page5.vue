<template>
  <el-main>
  <el-form :inline="true" :model="queryForm" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="queryForm.user_name" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="user_account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="user_age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="user_gender"
        label="性别">
        <template slot-scope="scope">
          {{scope.row.user_gender==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_headportrait"
        label="头像">
      </el-table-column>
      <el-table-column
        prop="user_phonenumber"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="user_mailbox"
        label="邮箱">
      </el-table-column>
      <el-table-column label="是否禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.user_ifforbidden"
            @change="flag(scope.$index, scope.row)"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_status"
        label="身份">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.user_ifforbidden===1?'success':'danger'"
          >{{scope.row.user_status==1?'用户':scope.row.user_status==2?'司机':'管理员'}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="gotoPage">
    </el-pagination>
  </el-main>
</template>


<script>
  const axios = require("axios")
  import { inture } from "../../api/index";
  import { infalse } from "../../api/index";
    export default {
        name: "page5",
        data(){
            return{
                tableData:[],
                pageCount:0,
                queryForm:{
                    pageNo:0,
                    pageSize:5
                }
            }
        },
        methods:{
            getList(){
                axios({
                    url:"/rest/tuser/list",
                    method:"post",
                    data:this.queryForm
                }).then(res=>{
                    this.tableData=res.data.list
                    this.pageCount=res.data.pages
                })
            },
            gotoPage(pageNo){
                this.queryForm.pageNo=pageNo;
                this.getList()
            },
            onSubmit(){
                this.getList();
            },
            flag(row, $index) {
                var user_id = $index.user_id;
                if ($index.user_status == 0) {
                    this.$message("不能修改管理员");
                    return;
                }
                if ($index.user_ifforbidden == 2) {
                   /* axios({
                        url:"/rest/order/success",
                        method:"get",
                        params:{user_id:user_id}
                    }).then(res=>{
                        this.getList();
                    })*/
                    inture(user_id).then(res => {
                        this.getList();
                    });
                } else {
                    infalse(user_id).then(res => {
                        this.getList();
                        return;
                    });
                }
            },
        },
        created() {
this.getList();
        }
    }
</script>

<style scoped>

</style>
