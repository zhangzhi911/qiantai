<template>
  <el-main>


    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="driver_id"
        label="ID">
      </el-table-column>

      <el-table-column
        label="车辆名称"
        width="120">
        <template slot-scope="scope">
      <span v-for="a in scope.row.carList">
        {{a.car_name}}
      </span>
        </template>
      </el-table-column>
      <el-table-column
        label="车辆颜色"
        width="120">
        <template slot-scope="scope">
      <span v-for="a in scope.row.carList">
        {{a.car_colour}}
      </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="driver_name"
        label="司机名字">
      </el-table-column>
      <el-table-column
        prop="driver_age"
        label="司机年龄">
      </el-table-column>
      <el-table-column
        prop="driver_gender"
        label="性别">
        <template slot-scope="scope">
          {{scope.row.driver_gender==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="driver_phonenumber"
        label="司机手机号">
      </el-table-column>
      <el-table-column label="是否禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.driver_ifforbidden"
            @change="flag(scope.$index, scope.row)"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_isverify"
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.driver_ifforbidden===1?'success':'danger'">
            {{scope.row.driver_ifforbidden==1?'正常':'禁用'}}</el-tag>
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
    import { on } from "../../api/index";
    import { down } from "../../api/index";
    export default {
        name: "page6",
        data(){
            return{
                tableData:[],
                pageCount:0,
                queryForm:{
                    pageNo:0,
                    pageSize:5
                },
                carList:[]

            }
        },
        methods:{
            getList(){
                axios({
                    url:"/rest/tdriver/list",
                    method:"post",
                    data:this.queryForm
                }).then(res=>{
                    this.tableData=res.data.list
                    this.pageCount=res.data.pages
                    console.log(res.data.list)
                    this.tableData.forEach(a=>{
                        this.carList=a.carList
                        // console.log(this.carList)

                    })
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
                var driver_id = $index.driver_id;

                if ($index.driver_ifforbidden == 2) {
                    /* axios({
                         url:"/rest/order/success",
                         method:"get",
                         params:{user_id:user_id}
                     }).then(res=>{
                         this.getList();
                     })*/
                    on(driver_id).then(res => {
                        this.getList();
                    });
                } else {
                    down(driver_id).then(res => {
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
