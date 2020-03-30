
<!--基本html代码区域-->
<template>
  <div class="firstdemo">
    <el-form ref="form" :model="formFrm" label-width="100px">
      <el-tabs type="border-card" style="width:500px;margin: auto">
        <el-tab-pane label="登录">
          <el-row type="flex" justify="center">
            <el-col>
              <el-form-item label-width="70px">
                <span>
                  <font color="pink" size="3">注册登录页面</font>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col>
              <i class="el-icon-share"></i>
              <el-form-item label="用户：">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col>
              <el-form-item label="密码：">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="5">
              <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 以上登录 -->
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-row type="flex" justify="center">
            <el-col>
              <el-form-item label-width="70px">
                <span>
                  <font color="pink" size="3">注册页面</font>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form :inline="true" :model="formFrm" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formFrm.name" placeholder="审批人"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="formFrm.mobile" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="resource">
              <el-radio-group v-model="formFrm.resource" size="medium">
                <el-radio border label="男"></el-radio>
                <el-radio border label="女"></el-radio>
              </el-radio-group>
            </el-form-item>

            <br />
            <el-form-item label="生日" required>
              <el-col :span="11">
                <el-form-item prop="resource">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formFrm.birthday"
                    style="width: 160px;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="formFrm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formFrm.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onmFrm">注册</el-button>
            </el-form-item>
          </el-form>

          <!-- 注册 -->
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-form>
      <input class="file" type="file" id="excelbiao" title="请选择文件" value="请选择文件" />
    </el-form>
    <el-button type="success" @click="saveStudent" icon="el-icon-download">走你</el-button>
  </div>
</template>
 
 
<!--数据存贮交互，事件控制地区-->
<script>
import Qs from "qs";
const axios = require("axios");
// import router from "../../router";
import router from "@/router";

export default {
  name: "firstdemo",
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8099"
      },
      form: {
        name: "",
        password: ""
      },
      formFrm: {
        //   注册
        name: "",
        resource: "男",
        mobile: "",
        birthday: "",
        mobile: "8888888",
        email: "**QQ.com"
      }
    };
  },
  methods: {
    saveStudent() {
      //new一个formData对象因为图片的格式需要转换
      let formData = new FormData();

      // formData.append(
      //   "photoo",
      //   document.querySelector("input[type=file]").files[0]
      // );
      formData.append("photoo", document.querySelector("#excelbiao").files[0]);

      //通过遍历form表单的对象来把form中的每个属性放到new的对象当中
      console.log(formData + "formData");

      axios({
        url: "http://localhost:8099/upLoadExcel2/",
        data: formData,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-mixed",
          "Access-Control-Allow-Origin": "http://127.0.0.1:8099"
        }
      }).then(res => {
        console.log(res.data);
      });
      // 发送请求
    },
    // 登录
    submit() {
      axios({
        url: "/rest/user/login",
        method: "post",
        data: Qs.stringify(this.form)
      }).then(res => {
        if (!res.data.error) {
          this.$message.success("登录成功");
          this.$store.commit("setUser", res.data.data.user);
          this.$store.commit("setPermissions", res.data.data.permissions);
          router.push({ path: "/Myindex" });
        } else {
          this.$message.error(res.data.message);
        }
      });
      this.$message.success("登录成功");
      this.$store.commit("setUser", this.form);
      router.push({ path: "/Myindex" });
    },
    onmFrm() {
      // 注册
      axios({
        url: "/rest/activity/insertuser",
        method: "post",
        data: Qs.stringify(this.formFrm)
      }).then(res => {
        router.push("/index");
      });
    },
    register() {}
  }
};
</script>
<!-- 写样式的地方 -->
<style scoped>
</style>