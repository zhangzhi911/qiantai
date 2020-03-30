<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>推荐商品</h3>
    </div>

    <div class="grid-content" style="min-height:500px;">
      <el-row>
        <el-col
          :span="5"
          v-for="(good,index) in goodLists"
          :key="good.t_gid"
          :offset="0"
          style="margin-left: 20px;"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              style="cursor:pointer;wide:200px;height:300px;"
              src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3469175326,4086840029&fm=26&gp=0.jpg"
            />
            <div style="margin-left: 0px;">
              <span @click="toDetails(good,index)">
                <b style="color:red;font-size:40px;cursor:pointer">{{good.t_name}}</b>
              </span>
              <br />
              <span>
                <b style="color:red;font-size:30px">价格:${{good.t_price}}</b>
              </span>
              <br />
              <span>销量:{{good.t_sales}}</span>
              <br />
              <span>简介:{{good.t_document}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      goodLists: [
        {
          t_gid: "1",
          t_name: "男外套",
          t_brand: "1",
          t_price: "1",
          t_document: "1",
          t_image: "1",
          t_delete: "1",
          t_number: "1",
          t_std: "1",
          t_color: "1",
          t_sales: "1",
          t_type_id: "1"
        },
        {
          t_gid: "2",
          t_name: "男外套",
          t_brand: "1",
          t_price: "1",
          t_document: "1",
          t_image: "1",
          t_delete: "1",
          t_number: "1",
          t_std: "1",
          t_color: "1",
          t_sales: "1",
          t_type_id: "1"
        },
        {
          t_gid: "3",
          t_name: "男外套",
          t_brand: "1",
          t_price: "1",
          t_document: "1",
          t_image: "1",
          t_delete: "1",
          t_number: "1",
          t_std: "1",
          t_color: "1",
          t_sales: "1",
          t_type_id: "1"
        },
        {
          t_gid: "4",
          t_name: "男外套",
          t_brand: "1",
          t_price: "1",
          t_document: "1",
          t_image: "1",
          t_delete: "1",
          t_number: "1",
          t_std: "1",
          t_color: "1",
          t_sales: "1",
          t_type_id: "1"
        }
      ] //存储商品
    };
  },
  methods: {
    toDetails(good, index) {
      localStorage.setItem("GoodBy", JSON.stringify(good));
      this.$router.push("/Details");
    }
  }
};
</script>