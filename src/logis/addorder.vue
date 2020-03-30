<template>
  <!-- 第一种 -->
  <!-- <el-form>
    <el-form-item label="风景">
      <el-upload
        class="upload-demo"
        action="http://localhost:8075/user/uploadPhoto"
        :headers="headers"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </el-form>-->
  <!-- 第二种 -->
  <div>
    <el-form>
      <el-form-item label="字段">
        <el-input v-model="insertfrom.user_account" placeholder="字段"></el-input>
      </el-form-item>
      <el-form>
        <el-input class="file" type="file" id="insertfile" title="请选择文件" value="请选择文件" />
      </el-form>
      <el-button type="primary" @click="insertMethod()">确 定</el-button>
    </el-form>

    <!-- 图片展示 -->
    <template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="'http://localhost:8075/showImg'" />
            <img
              :src="'http://localhost:8075/showImg?pathName='+scope.row.user_account"
              width="100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:9083"
      },
      tableData: [
        {
          user_account:
            "photo\\20200328\\5b5ec931-c8b3-4f08-980f-925ab97dd4f3.jpg"
        }
      ],
      // 定义属性
      insertfrom: {
        user_account: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {},
    // 添加
    insertMethod() {
      //new一个formData对象因为图片的格式需要转换
      let formData = new FormData();
      formData.append("photoo", document.querySelector("#insertfile").files[0]);
      //后台是用photo这个属性名接的
      console.log(formData + "formData");
      for (var obj in this.insertfrom) {
        formData.append(obj, this.insertfrom[obj]);
      }
      //通过遍历form表单的对象来把form中的每个属性放到new的对象当中

      axios({
        url: "http://localhost:8075/user/update",
        data: formData,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-mixed",
          "Access-Control-Allow-Origin": "http://127.0.0.1:8075"
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>