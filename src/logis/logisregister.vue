<template>
  <div class="register-wrap" :style="divimg">
    <div>
      <p class="p-title">欢迎使用太平洋物流</p>
    </div>
    <div class="ms-register">
      <div class="ms-title">欢迎注册</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.user_name" placeholder="请输入用户名">
            <el-button slot="prepend" icon="iconfont icon-guanliyuanrenzheng"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.user_password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="iconfont icon-yuechi"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="ruleForm.checkPass"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="iconfont icon-yuechi"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="permiss">
          <el-input placeholder="请输入手机号" style="width:60%;" v-model="ruleForm.permiss"></el-input>
          <el-button type="primary" :disabled="sendShow" @click="countDown">{{content}}</el-button>
        </el-form-item>

        <el-form-item prop="address">
          <el-input placeholder="输入验证码" v-model="ruleForm.address"></el-input>
          <el-form-item></el-form-item>
        </el-form-item>

        <el-form-item prop="sex">
          <template>
            <el-radio v-model="ruleForm.sex" label="1">
              <font style="color: white">男</font>
            </el-radio>
            <el-radio v-model="ruleForm.sex" label="2">
              <font style="color: white">女</font>
            </el-radio>
          </template>
        </el-form-item>
        <!-- <el-form-item prop="upload">
          <font style="color: white">上传头像</font>
          <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.user_photo" :src="ruleForm.user_photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <div class="register-btn">
          <el-button @click="resetForm('ruleForm')" style="float: left">重置</el-button>
          <el-button type="primary" :disabled="registerShow" @click="submitForm('ruleForm')">注册</el-button>
        </div>
      </el-form>
    </div>

    <div>
      <a
        class="p-foot"
        href="https://jq.qq.com/?_wv=1027&k=5VLp93o"
        target="_blank"
      >集中点滴力量，聚成汪洋大海。版权 ©所有:太平洋项目组</a>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import router from "@/router";
import axios from "axios";
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //再次输入密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.user_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证邮箱验证码的
    var validatePermiss = (rule, value, callback) => {
      console.log(value + " " + this.retureValidate);

      if (value === "") {
        callback(new Error("请输入验证码!"));
      } else {
        this.registerShow = false;
        callback();
      }
    };
    var qqMail = (rule, value, callback) => {
      // var shortName = value.substring(value.length - 7, value.length);
      // console.log(value.length - 6 + "最后几位是" + shortName);
      if (value === "") {
        callback(new Error("请输入手机号!"));
      } else {
        this.sendShow = false;
        callback();
      }
    };
    return {
      divimg: {
        //背景图片的使用
        backgroundImage: "url(" + require("../assets/wuliubeijing.jpg") + ")",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        backgroundSize: "cover"
      },
      content: "发送验证码",
      totalTime: 60, //属于验证码的
      canClick: true, //添加canClick 属于验证码的
      retureValidate: "", //返回的验证码
      sendShow: true, //发送验证码按钮显示
      registerShow: true, //注册按钮显示
      ruleForm: {
        user_password: "",
        user_name: "",
        checkPass: "",
        sex: "",
        permiss: "18662746291",
        address: "" //验证码
      },
      rules: {
        user_name: [
          {
            validator: validatePass,
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user_password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        // 邮箱
        permiss: [{ validator: qqMail, trigger: "blur" }],
        // 邮箱验证码
        address: [{ validator: validatePermiss, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 验证码
    countDown() {
      axios({
        url: "rest/send",
        method: "post",
        data: Qs.stringify({ str: this.ruleForm.permiss })
      }).then(e => {
        if (e.data.code == "200") {
          this.retureValidate = e.data.validat;
          console.log(e.data.o);
          console.log(e.data.msg);
        } else {
          this.$message.success(e.data.msg);
        }
      });

      if (!this.canClick) return; //改动的是这两行代码
      this.retureValidate = "123";
      this.canClick = false;
      this.content = this.totalTime + "s后发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "发送验证码";
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    submitForm(ruleid) {
      if (this.ruleForm.user_name == "" || this.ruleForm.user_name == null) {
        this.$notify.info({
          title: "提示",
          message: "请填写用户名"
        });
        return;
      }
      if (
        this.ruleForm.user_password == "" ||
        this.ruleForm.user_password == null
      ) {
        this.$notify.info({
          title: "提示",
          message: "请填写密码"
        });
        return;
      }
      this.$refs[ruleid].validate(valid => {
        if (valid) {
          console.log(ruleid);
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      axios({
        url: "rest/loguser/register",
        method: "post",
        data: Qs.stringify(this.ruleForm)
      }).then(e => {
        console.log(e.data);
        if (e.data.code == "200") {
          this.$message.success("注册成功");
          router.push({ path: "/login" });
        } else {
          this.$message.success("验证码获其他信息错误");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: left;
  font-size: 20px;
  color: #fff;
  font-style: italic;
  border-bottom: 1px solid #ddd;
}
.ms-register {
  position: absolute;
  left: 70%;
  top: 35%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.form-inline-input input,
.code-box p,
.code-box span {
  display: block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding: 0;
  margin: 0;
}
.code-box span {
  width: 40px;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-right: 1px;
}
.code-box p {
  width: 0;
  background-color: #ffff99;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input {
  display: none;
}
.code-box .code-input {
  display: none;
}
.form-inline-input input,
.code-box p,
.code-box span {
  display: block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding: 0;
  margin: 0;
}
.code-box span {
  width: 70px;
  background-color: #fff;
  font-size: 12px;
  cursor: pointer;
  margin-right: 1px;
}
.code-box p {
  width: 0;
  background-color: #f5f7fa;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input {
  display: none;
}
.code-box .code-input {
  display: none;
}
.p-title {
  color: white;
  font-size: 16px;
  text-align: left;
  padding-left: 20px;
  font-style: italic;
}
.p-foot {
  color: white;
  font-size: 16px;
  bottom: 40px;
  margin-left: 500px;
  position: fixed;
  padding-left: 20px;
  font-style: italic;
}
/** 滑动验证end **/
</style>
