<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-button type="success" @click="exportData" icon="el-icon-download">导出数据</el-button>
    </el-form-item>

    <el-form-item>
      <el-upload
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :disabled="importDataDisabled"
        style="display: block;margin-right: 8px"
        action="http://localhost:8100/upLoadExcel/"
      >
        <el-button
          :disabled="importDataDisabled"
          type="success"
          :icon="importDataBtnIcon"
        >{{importDataBtnText}}</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import { getToken } from "@/permissions/auth";
import top from "@/components/firstPage/top";
import qs from "qs";
export default {
  methods: {
    // 下载表格的方法
    exportData() {
      var url = "http://localhost:8100/downLoadGoodsExcel";
      // url = url.replace("{token}", localStorage.getItem("access_token"));
      console.log("url:----------------------", url);
      window.open(url, "_parent");
    }, // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    }
  }
};
</script>