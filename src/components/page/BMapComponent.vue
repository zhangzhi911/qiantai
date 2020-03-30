<template>
  <el-container>
    <el-aside width="200px">
      <input
        type="text"
        id="suggestId"
        name="address_detail"
        placeholder="地址"
        v-model="address_detail"
        class="input_style"
      />
      <!-- <el-button @click="getAddress">搜搜</el-button> -->
      <!-- 这个地方是用的table一列一列展示 -->
      <!-- <el-aside style="margin-top:15px">
      <el-table :data="buildinglist" @row-click="skiptomap" fit highlight-current-row stripe border>
        <el-table-column prop="name" lable="name" align="center"></el-table-column>
      </el-table>
      </el-aside>-->
      <!-- 这里使用的是树，省份信息不全 -->
      <div>
        <el-tree :data="buildinglist2" node-key="id" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-aside>
    <el-container id="newmap" style="margin-top:20px;margin-left:20px; height:600px;"></el-container>
  </el-container>
</template>
<script>
export default {
  name: "Mapbox",
  data() {
    return {
      //定义指定地点的名称和经纬度
      buildinglist: [
        { id: 1, name: "上海迪士尼", j: 121.671964, w: 31.148267 },
        { id: 2, name: "上海东方明珠", j: 121.506377, w: 31.245105 },
        { id: 3, name: "上海环球港", j: 121.419129, w: 31.239446 },
        { id: 4, name: "上海图书馆", j: 121.451117, w: 31.213841 },
        { id: 5, name: "中山公园", j: 121.425511, w: 31.227831 },
        { id: 6, name: "浦东国际机场", j: 121.81509, w: 31.157478 },
        { id: 7, name: "虹桥机场", j: 121.334574, w: 31.200171 }
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
      address_detail: null, //详细地址
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
    }
  },
  mounted: function() {
    this.loadmap("121.487899486", "31.24916171");
  }
};
</script>