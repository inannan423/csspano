<style>
  @font-face {
    font-family: codesans;
    src: url(./assets/misans.ttf);
  }

  @font-face {
    font-family: code;
    src: url(./assets/codes.ttf);
  }

  body {
    font-family: codesans;
    background-color: #ffffff;
    overflow-x: hidden;
    border-bottom: #FFC300 solid 7px;
    margin-bottom: -20px;
    margin-right: -10px;
  }

  .dsr {
    position: fixed;
    margin-bottom: 40px;
    z-index: 100;
    top: -1px;
    left: 0;
    padding-left: 10px;
    height: 110px;
    display: flex;
    align-items: center;
    border-bottom: 0.1px solid #FFC300;
    /* border-top: 7px solid #FFC300;*/
    background-color: rgba(255, 255, 255, 0.77);
    backdrop-filter: blur(10px);
  }

  .mylogo {
    height: 60px;
    margin-top: 27px;
    margin-left: 30px;
  }

  .mylogo {
    animation-name: breath;
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes breath {
    from {
      opacity: 0.2;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0.2;
    }
  }

  .pdf {
    width: 1000px;
  }

  .el-menu {
    background-color: #ffffff;
  }

  .el-menu {
    border-right: 0.1px solid #fcd44f5d;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    background-color: #fbecba4f;
  }

  .el-menu-item {
    color: rgb(0, 0, 0);
    font-size: 14px;
  }

  #toolbarViewer {
    opacity: 0;
  }

  .el-menu-item.is-active {
    background-color: #fff3cd68;
  }

  .el-submenu__title {
    color: rgb(0, 0, 0);
    font-size: 14px;
  }

  .el-submenu__title:hover {
    background-color: #fcd44f4f;
  }

  .git {
    height: 28px;
    position: absolute;
    right: 200px;
    top: 53px;
  }

  .git1 {
    height: 31px;
    position: absolute;
    right: 340px;
    top: 25px;
  }

  .myicon {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  .p1 {
    transition: color 1s;
    color: #7a7a7c;
  }

  .p1:hover {
    color: #000000;
  }

  .p2 {
    transition: color 1s;
    color: #7a7a7c;
  }

  .p2:hover {
    color: #000000;
  }
</style>
<style>
  .lopic {
    height: 235px;
    transition: height 1s;
    cursor: pointer;
  }

  .lopic:hover {
    height: 240px;
  }

  .el-divider {
    background-color: #9b9b6a22;
  }

  .tip {
    padding: 8px 16px;
    background-color: #17171879;
    border-radius: 0px;
    border-left: 5px solid #FFC300;
    margin: 20px 0;
    width: 1070px;
    color: rgb(100, 99, 99);
    font-size: 18px;
    transition: color 1s;
  }

  .tip:hover {
    color: rgb(193, 189, 189);
    border-left: 5px solid #ffc800;
  }

  .a {
    text-decoration: none;
  }

  .container {
    height: 70px;
    width: 800px;
    margin: 100px auto 0 auto;
    position: absolute;
    float: right;
    right: -210px;
    top: -50px;
  }

  .parent {
    position: relative;
  }

  .search {
    width: 300px;
    height: 40px;
    border-radius: 18px;
    outline: none;
    border: 2px solid #0080ff;
    padding-left: 20px;
    position: absolute;
  }

  .btn {
    height: 35px;
    width: 45px;
    position: absolute;
    top: 4px;
    left: 272px;
    background-color: #0080ff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    color: white;
    transition: background-color 1s;
    text-align: center;
  }

  .btn:hover {
    background-color: #217dd8;
  }

  .el-menu-item.is-active {
    color: #ffd000;
  }

  .toptip {
    height: 26px;
    width: 100%;
    background-color: #ffd000;
    position: fixed;
    left: -20px;
    top: 0px;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding-top: 6px;
    color: #ffffff;
    cursor: pointer;
    font-family: codesans;
  }

  .jets {
    position: fixed;
    height: 20px;
    bottom: 10px;
    left: 50px;
  }
</style>
<template>
  <div class="main" id="app" oncontextmenu="return false" style="background-color: #ffffff8a; min-height: 800px">
    <template>
      <el-backtop></el-backtop>
    </template>

    <div class="dsr" style="width: 110%; overflow: hidden">
      <a href="https://github.com/inannan423/csspano" target="_blank">
        <div class="toptip">
          ❤ 如果你喜欢这个项目，请在Github上给我们一个STAR吧 ★
        </div>
      </a>

      <img src="../src/assets/mylogo.png" class="mylogo" alt="" />
      <!-- <a href="https://inannan423.github.io"><img src="../src/assets/jet.png" class="git1" target="_blank"
          alt="Jetzihan" /></a> -->
      <a href="https://github.com/inannan423/csspano" target="_blank"><img src="../src/assets/github.png" class="git"
          alt="github" /></a>

    </div>

    <div style="margin-top: 107px; background-color: #ffffff; padding: 0">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" style="width: 210px; border-right: 0">
          <el-scrollbar style="position:fixed;left: -10px; height:100%;width:230px">
            <el-menu default-active="1" unique-opened="true" class="el-menu-vertical-demo" style=" min-height: 700px;">
              <!-- <el-menu  unique-opened="true"  class="el-menu-vertical-demo" style="min-height: 1000px;"> -->
              <router-link class="a" to="/">
                <el-menu-item index="1"><img class="myicon" src="../src/assets/home.png" alt="" />Home
                </el-menu-item>
              </router-link>
              <el-submenu index="2" style="color: black;">
                <template slot="title">
                  <img class="myicon" src="../src/assets/logo.png" alt="" />
                  <span>场景</span>
                </template>
                <router-link class="a" to="/Daily">
                  <el-menu-item index="2-1"> 极光星空 </el-menu-item>
                </router-link>
                <router-link class="a" to="/HelloWorld">
                  <el-menu-item index="2-2"> 拉萨 </el-menu-item>
                </router-link>
                <router-link class="a" to="/chazhi">
                  <el-menu-item index="2-3"> 海滩 </el-menu-item>
                </router-link>
              </el-submenu>
              <router-link class="a" to="/">
                <el-menu-item index="3"><img class="myicon" src="../src/assets/media.png" alt="" />上传图片
                </el-menu-item>
              </router-link>
            </el-menu>
            <a href="https://inannan423.github.io" target="_blank">
              <img src="./assets/jet.png" class="jets" alt="jet"></a>
          </el-scrollbar>
        </el-col>
        <el-col class="elcol" :xs="20" :sm="20" :md="20" :lg="20" style="margin-top: 50px; margin-left: 320px">
          <!-- 组件化显示内容 -->

          <router-view></router-view>
          <!-- <a
            href="https://console.cloud.tencent.com/tcb/hosting/index?envId=nannan-8gceb5nt124c014d&rid=4&moduleName=&tabId=file"><img
              src="./assets/rt.png" class="rt" alt="Power."></a> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<!-- <link rel="stylesheet" href="./assets/layui/css/layui.css"> -->
<!-- <script src="https://www.layuicdn.com/layui-v2.6.8/layui.js"></script> -->

<!-- <link href="https://cdn.bootcdn.net/ajax/libs/codemirror/5.65.3/codemirror.min.css" rel="stylesheet"> -->
<!-- <script src="https://cdn.bootcdn.net/ajax/libs/codemirror/5.65.3/codemirror.js"></script> -->

<script type="text/ecmascript-6">
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      welcome: "",
      aboutlion:
        '',
      searchCriteria: "",
      breadcrumbItems: ["首页"],
    };
  },

  methods: {
    to() {
      var searchValue = document.getElementById("searchInput").value;
      window.location.href = "https://cn.bing.com/search?q=" + searchValue;
    },
  },
  watch: {
    //实现切换路由回到顶部
    $route: function (to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style>
  .rt {
    position: relative;
    height: 25px;
    top: 20px;
    bottom: 1px;
  }

  .txy {
    height: 40px;
    position: relative;
    left: 300px;
  }

  .mue {
    overflow-y: auto;

  }

  .mue::-webkit-scrollbar {
    display: none;
  }

  .laycode {
    position: relative;
    margin: 10px 0;
    padding: 15px;
    line-height: 20px;
    border: 1px solid #eee;
    border-left-width: 6px;
    background-color: #fafafa;
    color: #333;
    font-family: Courier New;
    font-size: 12px;
  }

  .copy-text {
    height: 30px;
    width: 60px;
    background-color: #eddf73aa;
    border: 0px;
    border-radius: 9px;
    color: rgb(255, 255, 255);
    position: relative;
    float: right;
    right: 10px;
    cursor: pointer;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 1s;
  }

  .copy-text:hover {
    background-color: #f7f57c;
  }

  .tip {
    padding: 8px 16px;
    background-color: #edf2ae79;
    border-radius: 0px;

    margin: 20px 0;
    width: 1070px;
    color: rgb(130, 127, 127);
    font-size: 18px;
    transition: color 1s, border-left 1s;
    /*用逗号让多个过渡属性分隔*/
  }

  .tip {
    border-left: 5px solid #FFC300;
    /*transition: border-left 3s;*/
  }

  .tip:hover {
    color: rgb(0, 0, 0);
    border-left: 5px solid #ffd000;
  }

  .code {
    letter-spacing: 3px;
    padding-top: 17px;
    background-color: black;
    font-size: 14px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: rgb(144, 140, 136);
    transition: color 2s;
  }

  .code:hover {
    color: rgb(234, 197, 152);
  }

  .inlinepic {
    width: 600px;
    height: 300px;
  }

  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
    background-color: #fcffe4;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(7, 68, 71, 0.1);
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(159, 241, 245, 0.1);
  }
</style>