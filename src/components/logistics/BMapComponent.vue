<template>
  <el-container>
    <el-container id="newmap" style="margin-top:20px;margin-left:20px; height:600px;"></el-container>
    <el-aside width="120px">
      <br />
      <el-button
        type="primary"
        icon="el-icon-location"
        @click="carip('121.487899486', '31.24916171')"
      >当前位置</el-button>
      <br />
      <br />
      <el-button type="primary" icon="el-icon-map-location" @click="getAddress">收货地址</el-button>
      <!-- 
        <el-input
        type="text"
        id="suggestId"
        name="address_detail"
        placeholder="地址"
        v-model="address_detail"
        class="input_style"
      ></el-input>
      <el-button @click="getAddress">搜索</el-button>-->
      <!-- 这个地方是用的table一列一列展示 -->
      <!-- <el-aside style="margin-top:15px">
        <el-table :data="buildinglist" @row-click="skiptomap">
          <el-table-column prop="name" lable="name" align="center"></el-table-column>
        </el-table>
      </el-aside>-->
      <!-- 这里使用的是树，省份信息不全 -->
      <!-- <div>
        <el-tree :data="buildinglist2" node-key="id" @node-click="handleNodeClick"></el-tree>
      </div>-->
    </el-aside>
  </el-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Mapbox",
  data() {
    return {
      //定义指定地点的名称和经纬度
      buildinglist: [
        { id: 1, name: "出发地", j: 121.671964, w: 31.148267 },
        { id: 2, name: "目的地", j: 121.506377, w: 31.245105 }
      ],
      buildinglist2: [
        {
          id: 1,
          label: "上海迪士尼",
          j: 121.671964,
          w: 31.148267,
          children: [
            {
              id: 2,
              label: "上海东方明珠",
              j: 121.506377,
              w: 31.245105
            }
          ]
        },
        {
          id: 3,
          label: "上海环球港",
          j: 121.419129,
          w: 31.239446,
          children: [
            {
              id: 4,
              label: "中山公园",
              j: 121.425511,
              w: 31.227831
            }
          ]
        },
        {
          id: 5,
          label: "浦东国际机场",
          j: 121.81509,
          w: 31.157478,
          children: [
            {
              id: 6,
              label: "虹桥机场",
              j: 121.334574,
              w: 31.200171
            }
          ]
        }
      ],
      address_detail: "河北", //详细地址
      jd: 121.487899486, //初始地图中心点的经纬度
      wd: 31.24916171,
      map: {},
      point: {}
    };
  },
  methods: {
    // 树改变触发
    handleNodeClick(data, node, vuecomponent) {
      console.log(data);
      this.point = new BMap.Point(data.j, data.w);
      this.map.centerAndZoom(this.point, 14);
      var infoWindow = new BMap.InfoWindow(data.label); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, this.point); //开启信息窗口
    },
    skiptomap(row, event, column) {
      this.point = new BMap.Point(row.j, row.w);
      this.map.centerAndZoom(this.point, 14);
      var infoWindow = new BMap.InfoWindow(row.name); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, this.point); //开启信息窗口
    },
    loadmap(jd, wd) {
      var _this = this; //保存此时的this值！！！
      this.map = new BMap.Map("newmap"); // 创建地图实例
      this.point = new BMap.Point(jd, wd); // 创建点坐标
      this.map.centerAndZoom(this.point, 12); // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.buildinglist.forEach(function(item) {
        //创建多标注
        var point2 = new BMap.Point(item.j, item.w);
        var marker = new BMap.Marker(point2); // 创建标注
        _this.map.addOverlay(marker); // 将标注添加到地图中
      });
    },
    getAddress() {
      /* 获取位置对应的坐标 */
      this.map.centerAndZoom(this.address_detail, 14);
      var infoWindow = new BMap.InfoWindow(this.address_detail); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, this.address_detail); //开启信息窗口
    },
    // 定位车辆信息
    getOrderDetail2() {
      let order_id = localStorage.getItem("order_id");
      axios({
        url: "/rest/detail/byid?order_detail_id=" + order_id,
        method: "post"
      }).then(res => {
        let x = res.data.order_detail_addressx;
        let y = res.data.order_detail_addressy;
        this.address_detail = res.data.order_detail_destination;
        this.carip(x, y);
      });
    },
    // 车辆位置调用
    carip(x, y) {
      this.point = new BMap.Point(x, y);
      this.map.centerAndZoom(this.point, 14);
      var infoWindow = new BMap.InfoWindow("车辆当前位置"); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, this.point); //开启信息窗口
    }
  },
  mounted: function() {
    this.loadmap("121.487899486", "31.24916171");
    this.getOrderDetail2();
  }
};
</script>