import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 登录
import login from '@/components/Login/login'
import login2 from '@/components/Login/login2'
// 首页
import index from '@/components/index/myindex/'
// 注册
import register from '@/components/register/register/'
// // 首页
import FirstPage from '@/components/firstPage/FirstPage/'
// // 购物车
import goodscar from '@/components/firstPage/Car/'
// // 购物车
import Details from '@/components/firstPage/Details'
//订单
import orlder from '@/components/firstPage/orlder'
//下单
import Place from '@/components/firstPage/Place'

// =========================================================
// 以下是物流
import logisticsPage from '@/logis/logisticsPage'
//物流首页
import LogisticsIndex from '@/logis/LogisticsIndex'
//物流登录页面
import logislogin from '@/logis/logislogin'
//注册页面
import logisregister from '@/logis/logisregister'

//订单
import logistcsOrderDetail from '@/components/logistics/logistcsOrderDetail'
import logistcsOrder from '@/components/logistics/logistcsOrder'
import logistcsAddOrder from '@/components/logistics/logistcsAddOrder'
import logistcsAddDriver from '@/components/logistics/logistcsAddDriver'
import logistcsAddCar from '@/components/logistics/logistcsAddCar'

// 物流后台
import logisticsPageback from '@/components/logistics/logisticsPage/'
import Page1 from '@/components/logistics/page1'
import Page2 from '@/components/logistics/page2'
import Page3 from '@/components/logistics/page3'
import Page4 from '@/components/logistics/page4'
import Page5 from '@/components/logistics/page5'
import Page6 from '@/components/logistics/page6'

Vue.use(Router)


// 定义一个动态路径
const page = name => ({
  path: '/' + name,
  name: name,
  component: () => import('@/components/pages/' + name)
});
export default new Router({
  routes: [
    {
      path: '/logisticsPage',
      name: 'logisticsPage',
      component: logisticsPage
    },

    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // index
    {
      path: '/Myindex',
      name: 'Myindex',
      component: index
    },

    // login
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage
    },
    // FirstPage
    {
      path: '/FirstPage',
      name: 'FirstPage',
      component: FirstPage
    },
    // register
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login2',
      name: 'login2',
      component: login2
    },
    {
      path: '/goodscar',
      name: 'goodscar',
      component: goodscar
    },
    // Details
    {
      path: '/Details',
      name: 'Details',
      component: Details
    },
    {
      path: '/orlder',
      name: 'orlder',
      component: orlder
    }, {
      path: '/Place',
      name: 'Place',
      component: Place
    },
    // 下面是管理页面
    {
      path: '/home',
      component: () => import('@/components/common/Homo.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import('@/components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/goods',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/Goods.vue'),
          meta: { title: '商品管理' }
        },
        {
          path: '/Basetable',
          component: () => import('@/components/page/BaseTable.vue'),
          meta: { title: '管理员页面' }
        }, {
          path: '/form:id',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
          meta: { title: '用户中心' }

        }, {
          path: '/OrderMap',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/OrderMap.vue'),
          meta: { title: '订单地图' }


        }, {
          path: '/BMapComponent',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/BMapComponent.vue'),
          meta: { title: '订单地图2' }
        }
      ]
    },
    page("404"),
    page("403"),
    page("500"),
    // 首页
    {
      path: '/LogisticsIndex',
      name: 'LogisticsIndex',
      component: LogisticsIndex
    },
    // 物流注册
    {
      path: '/lore',
      name: 'logisregister',
      component: logisregister
    },
    // 物流登录
    {
      path: '/loglogin',
      name: 'logislogin',
      component: logislogin
    },
    // 订单表
    {
      path: '/logistcsOrder',
      name: 'logistcsOrder',
      component: logistcsOrder
    },
    // 订单明细
    {
      path: '/logistcsOrderDetail',
      name: 'logistcsOrderDetail',
      component: logistcsOrderDetail
    },
    {
      path: '/logistcsAddDriver',
      name: 'logistcsAddDriver',
      component: logistcsAddDriver
    },
    {
      path: '/logistcsAddCar',
      name: 'logistcsAddCar',
      component: logistcsAddCar
    },
    {
      path: '/logistcsAddOrder',
      name: 'logistcsAddOrder',
      component: logistcsAddOrder
    },
    {
      path: '/logisticsPageback',
      name: 'logisticsPageback',
      component: logisticsPageback,
      children: [
        {
          path: '/Page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/Page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/Page3',
          name: 'Page3',
          component: Page3
        },
        {
          path: '/Page4',
          name: 'Page4',
          component: Page4
        },
        {
          path: '/Page5',
          name: 'Page5',
          component: Page5
        },
        {
          path: '/Page6',
          name: 'Page6',
          component: Page6
        }
      ]
    },
  ]
})


