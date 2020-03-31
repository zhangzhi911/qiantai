<template>
  <div class="login-wrap" :style="divimg">
    <div>
      <p class="p-title">欢迎使用太平洋物流</p>

      <div class="ms-login">
        <div class="ms-title">欢迎登录</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="name">
            <el-input v-model="ruleForm.user_name" placeholder="请输入用户名">
              <el-button slot="prepend" icon="iconfont icon-guanliyuanrenzheng"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入认证密码"
              v-model="ruleForm.user_password"
              @keyup.enter.native="submitForm('ruleForm')"
            >
              <el-button slot="prepend" icon="iconfont icon-yuechi"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item prop="code">
            <div class="form-inline-input">
              <div class="code-box" id="code-box">
                <input ref="coderef" type="text" name="code" class="code-input" />
                <p></p>
                <span style="color:#909399">拖动验证</span>
              </div>
            </div>
          </el-form-item>

          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
          <div class="login-btn">
            <el-button type="primary" @click="registerbut">注册</el-button>
          </div>
          <!-- 登录进度 -->
          <el-progress
            ref="jindu"
            :style="jindustyle"
            :text-inside="true"
            :stroke-width="18"
            :percentage="percent"
            status="success"
          ></el-progress>
        </el-form>
      </div>
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
  title: "登录",
  name: "login",
  data() {
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
      percent: 0,
      jindustyle: {
        display: "none"
      },
      ruleForm: {
        user_name: "zhangsan",
        user_password: "123456"
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        user_password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    registerbut() {
      this.$message.success("去注册");
      router.push({ path: "/register" });
    },
    submitForm(ruleid) {
      var _this = this;
      var code = "";
      //这里验证码已经写死
      code = "123456";
      _this.moveCode(code, _this);
      //这里是拖动验证码
      if (code == null || code == "") {
        const h = this.$createElement;
        this.$notify({
          title: "提示信息：",
          message: h("i", { style: "font-style:normal" }, "请进行拖动校验！"),
          type: "warning",
          duration: 1500 //延时时间
        });
      } else {
        //登陆操作 par是要传的值
        let par = {};
        par.loginname = this.ruleForm.user_name;
        par.password = this.ruleForm.user_password;
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

        //打开登陆进度条
        this.$data.jindustyle.display = "block";
        //每0.1秒更新一下进度
        var timer = setInterval(() => {
          let pp = this.$data.percent + 10;
          if (pp >= 100) {
            pp = 99;
          }
          this.$data.percent = pp;
        }, 100);
        //从cookie中取出某一个名称的Cookie的值

        //      |登|
        //      |录|
        //      |的|
        //      |在|
        //      |这|
        //   ---   ---
        //   \       /
        //    \     /
        //     \   /
        //      \ /
        //       v

        this.tologin();
      }
    },
    tologin() {
      console.log(this.ruleForm);
      this.$store.commit("setUser", 4);

      axios({
        url: "/rest/user/login",
        data: Qs.stringify(this.ruleForm),
        method: "post"
      }).then(res => {
        // console.log(res.data);
        // this.$message.success("登录成功");
        // // this.$store.commit("setUser", this.ruleForm);
        // this.$store.commit("setUser", res.data);
        // router.push({ path: "/FirstPage" });

        console.log(res.data);
        if (res.data.flag) {
          // this.$store.commit("setUser", this.ruleForm);
          this.$store.commit("setUser", res.data);
          this.$router.push("/FirstPage");
          this.$message.success("登录成功");
        } else if (res.data.admin == "admin") {
          localStorage.setItem("ms_username", this.ruleForm.user_name);
          this.$router.push("/home");
        } else {
          this.$message(res.data.code3);
          return;
        }
      });
    },
    //拖动验证start
    getOffset(box, direction) {
      var setDirection = direction == "top" ? "offsetTop" : "offsetLeft";
      var offset = box[setDirection];
      var parentBox = box.offsetParent;
      while (parentBox) {
        offset += parentBox[setDirection];
        parentBox = parentBox.offsetParent;
      }
      parentBox = null;
      return parseInt(offset);
    },
    moveCode(code, _this) {
      var fn = { codeVluae: code };
      var box = document.querySelector("#code-box"),
        progress = box.querySelector("p"),
        codeInput = box.querySelector(".code-input"),
        evenBox = box.querySelector("span");
      //默认事件
      var boxEven = ["mousedown", "mousemove", "mouseup"];
      //改变手机端与pc事件类型
      if (typeof document.ontouchstart == "object") {
        boxEven = ["touchstart", "touchmove", "touchend"];
      }
      var goX, offsetLeft, deviation, evenWidth, endX;
      function moveFn(e) {
        e.preventDefault();
        e = boxEven["0"] == "touchstart" ? e.touches[0] : e || window.event;
        endX = e.clientX - goX;
        endX = endX > 0 ? (endX > evenWidth ? evenWidth : endX) : 0;
        if (endX > evenWidth * 0.7) {
          progress.innerText = "松开验证";
          progress.style.backgroundColor = "#66CC66";
        } else {
          progress.innerText = "";
          progress.style.backgroundColor = "#FFFF99";
        }
        progress.style.width = endX + deviation + "px";
        evenBox.style.left = endX + "px";
      }
      function removeFn() {
        document.removeEventListener(boxEven["2"], removeFn, false);
        document.removeEventListener(boxEven["1"], moveFn, false);
        if (endX > evenWidth * 0.7) {
          progress.innerText = "验证成功";
          progress.style.width = evenWidth + deviation + "px";
          evenBox.style.left = evenWidth + "px";
          codeInput.value = fn.codeVluae;
          evenBox.onmousedown = null;
          _this.ruleForm.verification = true;

          //alert( codeInput.value);
        } else {
          progress.style.width = "0px";
          evenBox.style.left = "0px";
        }
      }
      function getOffset(box, direction) {
        var setDirection = direction == "top" ? "offsetTop" : "offsetLeft";
        var offset = box[setDirection];
        var parentBox = box.offsetParent;
        while (parentBox) {
          offset += parentBox[setDirection];
          parentBox = parentBox.offsetParent;
        }
        parentBox = null;
        return parseInt(offset);
      }
      evenBox.addEventListener(
        boxEven["0"],
        function(e) {
          e = boxEven["0"] == "touchstart" ? e.touches[0] : e || window.event;
          (goX = e.clientX),
            (offsetLeft = getOffset(box, "left")),
            (deviation = this.clientWidth),
            (evenWidth = box.clientWidth - deviation),
            endX;
          document.addEventListener(boxEven["1"], moveFn, false);
          document.addEventListener(boxEven["2"], removeFn, false);
        },
        false
      );
      fn.setCode = function(code) {
        if (code) fn.codeVluae = code;
      };
      fn.getCode = function() {
        return fn.codeVluae;
      };
      fn.resetCode = function() {
        evenBox.removeAttribute("style");
        progress.removeAttribute("style");
        codeInput.value = "";
      };
      return fn;
    }, //拖动验证end
    clearUser() {
      this.$store.commit("setUser", null);
    }
  },
  mounted() {
    var _this = this;
    var code = "";
    _this.moveCode(code, _this);
    _this.clearUser();
    /*//从后台获取滑动验证码
      //参数 url 访问参数
      this.$axios.post(this.domain.ssopath+'/code/getCode').then((response)=>{

        code=response.data.result;
        //向浏览器写一个Cookie
        document.cookie = 'testCookies' + "=" + response.data.token + "; " + -1;
        _this.moveCode(code,_this);
      })*/
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
.ms-login {
  position: absolute;
  left: 70%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}

/** 滑动验证start **/
.form-inline-input {
  border: 1px solid #dadada;
  border-radius: 5px;
}
.form-inline-input input,
.code-box {
  padding: 0 3px;
  width: 290px;
  height: 40px;
  color: #fff;
  text-shadow: 0px 0px 0px black;
  background: #efefef;
  border: 0;
  border-radius: 5px;
  outline: none;
}
.code-box {
  position: relative;
}
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
.form-inline-input {
  border: 1px solid #dadada;
  border-radius: 5px;
}
.form-inline-input input,
.code-box {
  padding: 0 3px;
  width: 285px;
  height: 40px;
  color: #fff;
  text-shadow: 0px 0px 0px black;
  background: #efefef;
  border: 0;
  border-radius: 5px;
  outline: none;
}
.code-box {
  position: relative;
}
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
