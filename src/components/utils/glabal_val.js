export default {
    flag: "login",
    set_sso_lag(flag) {
        this.flag = flag;

    },
    get_sso_lag() {
        return this.flag;
    }

}
// 定义一个全局变量，所有页面都可用