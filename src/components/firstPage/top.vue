<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <span v-if="UserForm==''">
          <el-link
            href="#/register"
            style="float:left;margin-top: 2mm; margin-left: 10px"
          >注册 &nbsp;&nbsp;|</el-link>
          <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">登录</el-link>
        </span>
        <!-- 用户已登录 -->
        <span v-if="UserForm!=null">
          <el-link @click="form()" style="float:left; margin-left: 10px">
            <el-tooltip
              content="进入个人中心"
              placement="bottom"
              effect="light"
              style="background-color: #acd6ff;"
            >
              <el-button>
                <b style="color:red">{{UserForm.user.user_name}}</b>
              </el-button>
            </el-tooltip>
          </el-link>

          <el-link href="#/login" style="float:left;margin-top: 2mm; margin-left: 10px">退出</el-link>
        </span>
        <!-- 右侧 -->
        <span v-if="UserForm!=null">
          <el-link href="#/orlder" style="float: right; margin-top: 2mm;margin-right: 35px;">我的订单</el-link>
        </span>
        <!-- 以上是判断是否显示 -->
      </div>
    </el-col>
  </el-row>
</template>
<script>
import axios from "axios";
import { getToken } from "@/permissions/auth";

import qs from "qs";

export default {
  name: "FirstPage",
  data() {
    return {
      UserForm: { user: {} } //用于用户存储
    };
  },
  methods: {
    // 进入用户后台
    form() {
      let id = this.UserForm.user.userId;
      console.log(id);
      this.$router.push("/form" + id);
    }, // 判断用户
    getUser() {
      this.UserForm = getToken();

      console.log("欢迎用户:" + this.UserForm.user.userId);
      // this.UserForm = "";
      if (this.GoodsNames.t_name != "") {
        this.TreeSee = false;
        this.Myposition = "absolute";
      }
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>