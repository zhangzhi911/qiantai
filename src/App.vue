<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import global from "./components/utils/glabal_val.js";
// 全局变量

export default {
  name: "App"
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*  margin-top: 60px;*/
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
