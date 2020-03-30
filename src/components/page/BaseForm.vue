<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>个人中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:300px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <br />
              <div>
                状态：
                <el-tag>{{userFlag==1?'用户':'商家'}}</el-tag>
              </div>
              <br />
              <div>
                会员：
                <el-tag type="warning">{{permiss}}</el-tag>
              </div>
              <br />
              <div>
                账户余额
                <font style="color:red">￥{{money}}</font>
                <a href="#">&nbsp;&nbsp;&nbsp;充值</a>
              </div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2019-11-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>东莞</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" style="height:500px;">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名:" style="width: 400px">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="width: 400px">
              <el-input
                type="password"
                :disabled="true"
                placeholder="请输入密码"
                v-model="form.user_password"
              ></el-input>
              <a href="#">修改</a>
            </el-form-item>
            <el-form-item label="年龄:" style="width: 400px">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-cascader :options="options" v-model="form.adderss"></el-cascader>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                <el-radio label="保密"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="down()">退出</el-button>
            </el-form-item>
          </el-form>
          <el-button style="color: white ;float: right" type="danger" @click="addGoods()">上架商品</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/permissions/auth";
export default {
  name: "dashboard",
  data() {
    return {
      options: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳区",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                }
              ]
            },
            {
              value: "daohang",
              label: "海淀区",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                }
              ]
            }
          ]
        },
        {
          value: "henan",
          label: "河南",
          children: [
            {
              value: "basic",
              label: "郑州",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                },
                {
                  value: "e",
                  label: "5"
                }
              ]
            },
            {
              value: "form",
              label: "洛阳",
              children: [
                {
                  value: "a",
                  label: "1"
                },
                {
                  value: "b",
                  label: "2"
                },
                {
                  value: "c",
                  label: "3"
                },
                {
                  value: "d",
                  label: "4"
                }
              ]
            },
            {
              value: "data",
              label: "3",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "黑龙江",
          children: [
            {
              value: "axure",
              label: "哈尔滨"
            },
            {
              value: "sketch",
              label: "佳木斯"
            },
            {
              value: "jiaohu",
              label: "牡丹江"
            }
          ]
        }
      ],
      name: "",
      permiss: "",
      money: "",
      userFlag: "",
      form: {}
    };
  },
  methods: {
    down() {
      this.$router.push("/FirstPage");
    },
    addGoods() {
      if (this.form.userFlag == 1) {
        this.$message("用户无法上架商品");
      } else {
        this.$message("欢迎");
        this.$router.push("/goods");
      }
    },
    onSubmit() {
      console.log(this.form);
      axios({
        url: "/rest/user/save",
        method: "post",
        data: this.form
      }).then(res => {
        this.$message.success("提交成功！");
        location.reload();
      });
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    }
  },
  created() {
    this.UserForm = getToken();
    let userId = this.UserForm.user.userId;
    axios({
      url: "/rest/user/show",
      method: "get",
      params: { userId: userId }
    }).then(res => {
      this.form = res.data;
      this.name = res.data.user_name;
      this.money = res.data.money;
      this.permiss = res.data.permiss;
      this.userFlag = res.data.userFlag;
    });
  }
};
</script>


<style scoped>
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}
</style>
