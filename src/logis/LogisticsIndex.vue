<template>
  <!-- <div style="margin-left:200px;margin-right:200px;margin-top:10px;"> -->
  <div style="margin-top:10px;">
    <div>
      <el-col :span="4">
        <div class="grid-content">
          <div class="block">
            <el-image style="width: 100px; height: 100px;margin-left:100px;" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#ffffff"
            text-color="#303133"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">关于我们</el-menu-item>
            <el-menu-item index="3">新闻中心</el-menu-item>
            <el-menu-item index="4">车辆信息</el-menu-item>
            <el-menu-item index="5">荣誉展示</el-menu-item>
            <el-menu-item index="6">服务项目</el-menu-item>
            <el-menu-item index="7">货运路线</el-menu-item>
            <el-menu-item index="8">在线留言</el-menu-item>
            <el-menu-item index="9">联系我们</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-row>
        <el-col :span="24" style="background-color: #FF9640">
          <div style="background-color: #FF9640">
            <el-form>
              <el-form-item style="margin-bottom: 0px;">
                <el-radio-group fill="#acd6ff" text-color="#fffff" style="margin-left: 270px">
                  <el-radio-button label="0">首页</el-radio-button>
                  <el-radio-button label="1">物流园区</el-radio-button>
                  <el-radio-button label="14">货源信息</el-radio-button>
                  <el-radio-button label="29">车源信息</el-radio-button>
                  <el-radio-button label="42">物流专线</el-radio-button>
                  <el-radio-button label="55">整车货运</el-radio-button>
                  <el-radio-button label="69">国际物流</el-radio-button>
                  <el-radio-button label="82">快递公司</el-radio-button>
                  <el-radio-button label="92">物流加盟</el-radio-button>
                  <el-radio-button label="94">物流设备</el-radio-button>
                  <el-radio-button label="95">其他咨询</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24" class="background1">
          <Tpyhead></Tpyhead>
        </el-col>
      </el-row>
      <br />

      <el-row>
        <el-col :span="4">
          <div style="min-height:200;">&nbsp;</div>
        </el-col>
        <el-col :span="16">
          <div class="lunbo-box" style="min-height:200;">
            <el-carousel indicator-position="none">
              <el-carousel-item class="lunbo-box-item" v-for="(item,index) in abc_img" :key="index">
                <img :src="item.src" class="lunbotu" alt="轮播图" style="width:100%;display: block;" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>

        <el-col :span="4">
          <div style="min-height:200;"></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="background1">
          <div style="height:200px;">
            <el-button style="float:left;margin-left:355px;margin-top:15px;">最新消息</el-button>
            <el-link style="float:right;margin-top:30px;margin-right:600px;">热烈庆祝太平洋物流正式上线啦~</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="2">
          <div style="min-height:350px;;"></div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-card class="box-card">
              <div>
                <i class="el-icon-truck" style="float:left;margin-left:95px;"></i>
                <br />
                <span style="float:left;margin-left:69px;margin-top:20px;">车辆展示</span>
                <br />
                <br />
                <span style="float:left;margin-top:20px;font-size:14px;margin-left:20px;">
                  车辆包括：箱货，半挂，皮卡
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高栏车
                </span>
                <br />
                <el-link style="float:left;margin-top:30px;margin-left:69px;">查看更多</el-link>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-card class="box-card">
              <div>
                <i class="el-icon-truck" style="float:left;margin-left:95px;"></i>
                <br />
                <span style="float:left;margin-left:69px;margin-top:20px;">货运路线</span>
                <br />
                <br />
                <span style="float:left;margin-top:20px;font-size:14px;margin-left:20px;">
                  &nbsp;&nbsp;&nbsp;主线：全国。货运专线：
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京，上海，天津
                </span>
                <br />
                <el-link style="float:left;margin-top:30px;margin-left:69px;">查看更多</el-link>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5" style="float:left;">
          <div>
            <el-card class="box-card">
              <div>
                <i class="el-icon-truck" style="float:left;margin-left:95px;"></i>
                <br />
                <span style="float:left;margin-left:69px;margin-top:20px;">荣誉展示</span>
                <br />
                <br />
                <span style="float:left;margin-top:20px;font-size:14px;margin-left:20px;">
                  让客户安心，放心，省心的
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;物流企业
                </span>
                <br />
                <el-link style="float:left;margin-top:30px;margin-left:69px;">查看更多</el-link>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5" style="float:left">
          <div>
            <el-card class="box-card">
              <div>
                <i class="el-icon-truck" style="float:left;margin-left:95px;"></i>
                <br />
                <span style="float:left;margin-left:69px;margin-top:20px;">服务项目</span>
                <br />
                <br />
                <span style="float:left;margin-top:20px;font-size:14px;margin-left:20px;">
                  大件运输，普通货运，货运
                  <br />&nbsp;&nbsp;代理，货运中介，零担拖
                </span>
                <br />
                <el-link style="float:left;margin-top:30px;margin-left:69px;">查看更多</el-link>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <hr style="margin-top:30px;" />
      <el-row style="margin-top:30px;">
        <el-col :span="24">
          <span style="text-align:center">
            <h1>车辆展示</h1>
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px;">
        <el-col :span="8">
          <div class="block">
            <el-image style :src="car001" :fit="fit"></el-image>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="block">
            <el-image style :src="car002" :fit="fit"></el-image>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="block">
            <el-image style :src="car003" :fit="fit"></el-image>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px;" class="footer">
        <el-col :span="24">
          <span style="text-align:center;">
            <h1 style="margin-top:30px;">合作伙伴</h1>
          </span>
          <br />
          <el-image style="margin-left:550px;" :src="friend" :fit="fit"></el-image>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px;">
        <el-col :span="24">
          <div
            class="aa"
            style="
                                     height: 100px;
                                     margin-top: 35px;"
          >
            <hr />
            <a
              class="p-foot"
              href="https://jq.qq.com/?_wv=1027&k=5VLp93o"
              target="_blank"
            >集中点滴力量，聚成汪洋大海。版权 ©所有:太平洋项目组</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Tpyhead from "@/components/firstPage/Tpyhead";
export default {
  components: {
    Tpyhead
  },
  data() {
    return {
      fit: "fill",
      activeIndex: "1",
      activeIndex2: "1",
      url: require("../assets/logo3.jpg"),
      car001: require("../assets/car01.jpg"),
      car002: require("../assets/car02.jpg"),
      car003: require("../assets/car03.jpg"),
      abc_img: [
        { src: require("../assets/carMy/lun1.png") },
        { src: require("../assets/carMy/lun2.png") },
        { src: require("../assets/carMy/lun3.png") }
      ],
      foot: require("../assets/页脚.gif"),
      friend: require("../assets/banner6.png")
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 250px;
  /* background-color: aqua; */
  height: 200px;
}

.background1 {
  height: 100px;
}
.footer {
  background-color: rgb(240, 231, 231);
}
.aa {
  background: url("../assets/页脚.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.p-foot {
  color: white;
  font-size: 16px;
  margin-left: 400px;
  margin-top: 35px;
  padding-left: 20px;
  font-style: italic;
}
</style>