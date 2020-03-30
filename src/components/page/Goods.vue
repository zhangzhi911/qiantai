<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 商品管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="addGoods"
        >添加商品</el-button>
        <el-input v-model="query.t_name" placeholder="商品" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="t_gid" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="t_name" label="商品名"></el-table-column>
        <el-table-column prop="t_brand" label="品牌"></el-table-column>
        <el-table-column prop="t_document" label="描述"></el-table-column>
        <el-table-column prop="t_price" label="价格"></el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <!--<el-image
                            class="table-td-thumb"
                            :src="scope.row.photo"
                            :preview-src-list="[scope.row.photo]"
            ></el-image>-->
            <img src="../../assets/img/img.jpg" class="table-td-thumb" />
          </template>
        </el-table-column>
        <el-table-column prop="t_number" label="数量"></el-table-column>
        <el-table-column prop="t_color" label="颜色"></el-table-column>
        <el-table-column prop="t_sales" label="销量"></el-table-column>
        <el-table-column prop="t_std" label="规格"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑/添加" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="商品">
          <el-input v-model="form.t_name"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="form.t_brand"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.t_document"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.t_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.t_image" :src="form.t_image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.t_number"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.t_color"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.t_std"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsData } from "../../api/index";
export default {
  name: "goods",
  data() {
    return {
      query: {
        t_name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    addGoods() {
      this.editVisible = true;
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      goodsData(this.query).then(res => {
        this.tableData = res.list;
        this.pageTotal = res.total || 50;
      });
    },
    // 触发搜索按钮
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
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
