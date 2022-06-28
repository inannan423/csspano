<template>
  <div style="background-color:transparent" class="hello">
    <iframe src="../../static/Vue-spa.pdf" allowTransparency="true" scrolling="no"  marginwidth="0" frameBorder="0" allowtransparency="true" bordercolor="none" style="width:1100px;height:2500px;overflow:hidden;  " frameborder="0"></iframe>
    <!-- <pdf v-for="i in numPages" :src="src" :key="i" :page="i"  ref="pdf" class="pdf" ></pdf> -->
  <footer style="position:absolute;display:flex;right:100px;float:right;">
    <p class="p1">最近编辑：2022/5/12</p>
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