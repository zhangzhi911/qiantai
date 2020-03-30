<template>
  <el-main>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">

    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="warehouse_id"
        label="仓库">
      </el-table-column>
      <el-table-column
        prop="warehouse_name"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="warehouse_type"
        label="仓库类型">
      </el-table-column>
      <el-table-column
        prop="warehouse_floorspace"
        label="占地面积">
      </el-table-column>
      <el-table-column
        prop="warehouse_address"
        label="仓库地址">
      </el-table-column>
      <el-table-column
      prop="order_id"
      label="订单id">
    </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.order_id)" type="text" size="small">发货</el-button>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">




      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="货物类型">
          <el-input v-model="formInline.order_cargotype" placeholder="货物类型"></el-input>
        </el-form-item>
        <el-form-item label="出发地">
          <el-input v-model="formInline.order_departure" placeholder="出发地"></el-input>
        </el-form-item>
        <el-form-item label="到达地">
          <el-input v-model="formInline.order_destination" placeholder="到达地"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formInline.order_linkmanphone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="formInline.order_linkmanname" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="formInline.user_id" placeholder="用户"></el-input>
        </el-form-item>
        <el-form-item label="车辆">
          <el-input v-model="formInline.cartype_id" placeholder="车辆"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formInline.order_reason" placeholder="备注"></el-input>
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
    const axios = require("axios")
    export default {
        name: "page4",
        data(){
            return{
                formInline:{},
                tableData:[],
                pageCount:0,
                queryForm:{
                    pageNo:0,
                    pageSize:5
                },
                orderList:[],
                dialogVisible:false,
            }
        },
        methods:{

            add(){
                console.log(this.formInline)
                axios({
                    url:"/rest/torder/add",
                    method:"post",
                    data:this.formInline
                }).then(res=>{
                    this.$router.push("/page4")
                })
            },
            handleClose(){
                this.dialogVisible=false
            },

            getList(){
                axios({
                    url:"/rest/tware/list",
                    method:"post",
                    data:this.queryForm
                }).then(res=>{
                    this.tableData=res.data.list
                    this.pageCount=res.data.pages
                })

            },

            handleClick(){
                this.dialogVisible=true
            },

            gotoPage(pageNo){
                this.queryForm.pageNo=pageNo;
                this.getList()
            },
            onSubmit(){
                this.getList();
            },

        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
