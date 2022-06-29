<template>
  <div class="main">
    <div class="panobox">

    </div>
    <!-- <div class="bx2"> -->
    <el-row style="width: 1100px;">
      <el-col :span="12"><a href="https://threejs.org/" target="_blank"><img src="../assets/rt.png" class="rt"
            alt="Power."></a>
      </el-col>
      <el-col :span="12">
        <el-switch active-text="自动滚动开启" inactive-text="自动滚动关闭" class="switch" v-model="value" active-color="#ffd000"
          inactive-color="black">
        </el-switch>
      </el-col>

    </el-row>
    <!-- </div> -->

  </div>

</template>
<script>


</script>
<script>
  export default {
    name: 'Home',

    data() {
      return {
        day: 100,
        msg: 'Welcome to Your Vue.js App',
        welcome: '👋你好！欢迎来到 OrangeUniverse 。来自热爱前端设计和开发的数媒程序猿一只(</>)。本网站使用Vue.js脚手架和及其官方UI框架（饿了么团队开发的element UI）进行开发，虽然本站貌似实现了数据与页面的分离，但是并没有实际作用，这还是一个静态网站（后端知识为0！！）。本网站中的部分文档采用嵌入pdf实现，既减少开发维护成本，也更加灵活。不过我很嫌弃那个iframe嵌入框样式，目前不开放修改其样式！但没办法，Mozilla的pdf.js框架只能弹窗使用，vue-pdf不能复制。未来本站将陆续实现文档上传、富文本编写等功能，但那不知道是猴年马月了。',
        aboutlinon: '这是一只来自codepen的狮子，使用Three.js编程实现。按住鼠标左键即可打开电风扇，让狮子凉爽一下！其采用iframe插入到了html网页中。作者： <el-link type="primary">https://codepen.io/Yakudoo/pen/YXxmYR</el-link>',
        searchCriteria: '',
        breadcrumbItems: ['首页'],
        value: true
      }
    },
    methods: {


    },
    mouted() {

    }
  }
  //让class为tip的元素背景颜色随时间变化
</script>
<style>
  .el-switch__label.is-active {
    color: #ffd000;
  }

  .rt {
    display: flex;
    float: left;
  }

  .switch {
    position: relative;
    float: right;
  }

  .bx2 {
    width: 1100px;
    height: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    float: 1;
  }

  .switch {
    position: relative;
    right: 10px;
    top: 20px;
  }

  .panobox {
    background-color: rgb(45, 45, 45);
    height: 600px;
    width: 1100px;
    border-radius: 20px;
    box-shadow: 10px 10px #ecd98476;
    margin-top: -20px;
    cursor: pointer;
  }

  .el-timeline-item__tail {
    border-left: 2px solid #eceaffb3;
  }
</style>
<style scoped>
  .el-menu-item.is-active {
    background-color: #ffffff58;
  }

  .git {
    height: 25px;
    position: absolute;
    right: 200px;
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
    color: #0080FF;
  }

  .p2 {

    transition: color 1s;
    color: #7a7a7c;
  }

  .p2:hover {
    /*color: #5ddfff; */
    color: #0080FF;
  }

  .lopic {
    height: 235px;
    transition: height 1s;
    cursor: pointer;
    box-shadow: 0px 0px 10px #b1dbff00;
  }

  .lopic:hover {
    height: 240px;
  }

  .el-divider {
    background-color: #4593e13f;
  }

  .dv {
    height: 400px;
    width: 1000px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
</style>