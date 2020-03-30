import router from '@/router'

import NProgress from 'nprogress'
//进度条
import 'nprogress/nprogress.css'
import {
    getToken
} from './auth'

const whiteList = ['/', '/login', '/Myindex', '/HelloWorld', , '/register', , '/Details', , '/home', '/OrderMap', '/BMapComponent', '/goods', '/dashboard', '/Basetable', '/logisticsPage',
    '/403', '/404', '/500'] // 不重定向白名单

// router.beforeEach((to, from, next) => {
//     NProgress.start(); //进度条
//     if (whiteList.indexOf(to.path) != -1) {
//         // alert("来了判断to.path" + to.path);

//         next();
//         return;
//     }
//     if (getToken()) {
//         next();
//         // alert("拦截来了判断用户" + to.path);
//         // console.log("路径是  " + to.path);
//         // let permissions = getPermissions();
//         // // 有权限
//         // if (permissions.indexOf(to.path) != -1) {
//         //     next();
//         // } else {
//         //     // 无权限
//         //     // 跳转到403页面
//         //     next('/403');
//         // }
//     } else {
//         alert("前往登录");
//         next('/login');
//     }
// });

router.afterEach((to, from, next) => {
    NProgress.done()
});
