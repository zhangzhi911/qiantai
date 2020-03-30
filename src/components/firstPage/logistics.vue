<template>
  <div class="div-bg bg-white">
    <div style="height: 0.5rem;width: 100%;background-color:#f7f7f7"></div>
    <!--物流跟踪-->
    <div style="padding-bottom: 0.5rem;">
      <div
        class="bg-white"
        style="width: 92%; margin-left: 4%;margin: auto;padding-left: 15px;padding-right: 15px;"
      >
        <div style="font-size: 1.2rem;color: #111111;">
          物流跟踪
          <!--物流跟踪-->
        </div>
        <div>
          <div class="track-rcol">
            <div class="track-list">
              <ul>
                <div v-for="(item,index) in logisticsList" :key="index">
                  <li class="first" v-if="index===0">
                    <div></div>
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}</span>
                  </li>
                  <li v-if="index > 0 && index !== logisticsList.length-1">
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}</span>
                  </li>
                  <li v-if="index === logisticsList.length-1" class="finall">
                    <i class="div-spilander"></i>
                    <i class="node-icon"></i>
                    <span class="txt">{{item.message}}</span>
                    <span class="time">{{item.messageDate}}ss</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logistics",
  data() {
    return {
      logisticsList: [
        {
          message:
            "1包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "2016-03-10 18:07:15"
        },
        {
          message:
            "2包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "2016-03-10 18:07:15"
        },
        {
          message:
            "3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "2016-03-10 18:07:15"
        },
        {
          message:
            "4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "2016-03-10 18:07:15"
        }
      ]
    };
  },
  methods: {},
  /**
   * 加载时执行
   */
  mounted: function() {}
};
</script>