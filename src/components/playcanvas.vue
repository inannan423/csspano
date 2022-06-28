<template>

    <div style="background-color:transparent" class="hello">
        <h2 style="color: #0080FF;">Little Bear's Garden</h2>
        <div class="tip">
            <p>使用Playcanvas制作的网页动画实验，按住ASDW按键可以控制小熊左上右下运动。加载可能较慢，请稍等。</p>
            <el-link type="primary">https://playcanvas.com/</el-link>
        </div>
    <iframe src="https://playcanv.as/b/BAl2CAUb" allowTransparency="true" scrolling="no"  marginwidth="0" frameBorder="0" allowtransparency="true" bordercolor="none" style="width:1107px;height:700px;overflow:hidden;  " frameborder="0"></iframe>
      <!-- <pdf v-for="i in numPages" :src="src" :key="i" :page="i"  ref="pdf" class="pdf" ></pdf> -->
    <footer style="display:flex;right:100px;float:right;position:absolute">
      <p class="p1">最近编辑：2022/5/13</p>
    </footer>
  </div>
    
  </template>
  
  <script>
    import pdf from 'vue-pdf'
    
    export default {
      components: {
        pdf
      },
      name: 'HelloWorld',
      data() {
        
        return {
          src:'../../static/Vue-spa.pdf',
          numPages: undefined,
          item: 'Welcome to Your Vue.js App'
        }
      },
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .pdfViewer .page{
      background-color: white;
    }
    :root {
        --body-bg-color: rgb(255, 255, 255);
      }
  </style>