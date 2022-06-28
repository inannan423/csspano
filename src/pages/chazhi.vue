<template>
  <div style="background-color:transparent" class="hello">

    <h1 style="color: #0080FF;">插值绑定</h1>
    <h2>文本插值</h2>
    <p>2022/5/14</p>
    <div class="tip">
      <p>
        文本插值的方式十分简单，只要用双大括号（Mustache语法）将要绑定的变量、值、表达式括住就可以实现，Vue将会获取计算后的值，并以文本的形式将其展示出来。 下面一段代码演示了文本插值的基本用法：
      </p>
      <pre style="overflow:hidden ;" id="code" class="code">
        <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        {{Codearea.private}}
        </pre>
      <h3>结果</h3>
      <p style="font-size:13px;background-color:white;position:relative;padding-left:10px">
        变量：15 <br>
        表达式：15 <br>
        三目运算符：15 <br>
        函数：15 <br>
        匿名函数：15 <br>
        对象：{'num':15} <br>
        函数对象： function(){[native code]} <br>
        html代码（表达式）： {{'15'}} <br>
        html代码（变量）： <span>15</span>
      </p>
    </div>

    <h2>HTML插值</h2>
    <p>2022/5/15</p>
    <div class="tip">
      <p>
        HTML插值可以动态渲染DOM节点，常用于处理开发者无可预知和难以控制的DOM结构，如渲染用户随意书写的文档结构等，这在一些论坛和博客平台上可以看到，下面来看一段相关代码
      </p>
      <pre style="overflow:hidden;" id="code" class="code">
        <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        {{Codearea.htmlchazhi}}
        </pre>
      <h3>结果</h3>
      <iframe width="1050px" height="400px" style="background-color: white;" src="../../static/02.HTML插值.html"
        frameborder="0"></iframe>
      <p>
        文本插值中的代码被解释为节点的文本内容，而HTML插值中的代码则被渲染为视图节点。实际上，HTML插值是对文本插值的补充和拓展，Vue可以解析被绑定的内容为DOM节点，从而实现动态渲染视图的效果。不过Vue本身就支持模板，开发者在使用HTML插值时应秉承以下原则：
        <br> -尽量多地使用Vue自身的模板机制，减少对HTML插值的使用；
        <br> -只对可信内容使用HTML插值；
        <br> -绝不相信用户输入的数据。
      </p>
    </div>

    <h2>属性绑定</h2>
    <p>2022/5/15</p>
    <div class="tip">
      <p>
        指令v-bind:DOM节点的属性基本都可以用指令v-bind进行绑定，代码如下：
      </p>
      <pre style="overflow:hidden;" id="code" class="code">
        <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        {{Codearea.binding}}
        </pre>
      <h3>结果</h3>
      <iframe width="1050px" height="200px" style="background-color: white;" src="../../static/源码/03.v-bind属性绑定.html"
        frameborder="0"></iframe>
    </div>

    <h2>类名和样式绑定</h2>
    <p>2022/5/15</p>
    <div class="tip">
      <p>
        由于类名class和样式style在节点属性中是两个比较奇怪的存在（虽然他们可接收的类型都是字符串，但类名实际上是由数组拼接而成，而样式则是由对象键值对拼接而成的），所以Vue在绑定类名和样式时也采用不一样的机制。 我们可以通过字符串、数组和对象三种方式为节点动态绑定类名属性，代码如下：
      </p>
      <pre style="overflow:hidden;" id="code" class="code">
        <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        {{Codearea.classes}}
        </pre>
      <h3>结果</h3>
      <iframe width="1050px" height="200px" style="background-color: white;" src="../../static/源码/04.类名绑定.html"
        frameborder="0"></iframe>
        <p>
          三种方式绑定类名的效果是一致的，但由于classObj2中的键值全部被判定为假，所以类名并未被绑定到对应节点上。
          绑定样式的方式与类名相似，不过样式是以键值对的形式，所以不能像类名一样使用数组进行绑定，示例代码如下：
        </p>
        <pre style="overflow:hidden;" id="code" class="code">
          <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
          {{Codearea.styles}}
          </pre>
        <h3>结果</h3>
        <iframe width="1050px" height="220px" style="background-color: white;" src="../../static/源码/05.样式绑定.html"
          frameborder="0"></iframe>
    </div>
    <!-- <pdf v-for="i in numPages" :src="src" :key="i" :page="i"  ref="pdf" class="pdf" ></pdf> -->
    <!-- <footer style="position:relative;display:flex;right:100px;float:right">
        <p class="p1">最近编辑：2022/5/12</p>
      </footer> -->
  </div>

</template>

<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js"></script>
<script>
  import pdf from "vue-pdf";

  export default {
    components: {
      pdf,
    },
    name: "HelloWorld",
    data() {
      return {
        Codearea: {
          private: "",
          htmlchazhi: "",
          binding:"",
          styles:"",
          classes:"",
        },
        src: "../../static/Vue-spa.pdf",
        numPages: undefined,
        item: "Welcome to Your Vue.js App",
      };
    },
    methods: {
      copy() {
        var that = this;
        console.log("clk");
        var clipboard = new this.clipboard(".copy-text");
        clipboard.on("success", function (e) {
          e.clearSelection(); //选中时不显示选中的背景色
          that.$message({
            message: "复制成功",
            type: "success",
          });
        });
        clipboard.on("error", function () {
          that.$message({
            message: "复制失败",
            type: "warn",
          });
        });
      },
      readFile(filePath) {
        // 创建一个新的xhr对象
        //这是小黄人对象也就是Ajax，ajax，异步的JavaScript
        let xhr = null,
          okStatus = document.location.protocol === "file" ? 0 : 200;
        xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("GET", filePath, false);
        xhr.overrideMimeType("text/html;charset=utf-8");
        xhr.send(null);
        return xhr.status === okStatus ? xhr.responseText : null;
      },
    },
    mounted() {
      this.Codearea.private = this.readFile("../../static/chazhi1.txt");
      this.Codearea.htmlchazhi = this.readFile("../../static/02.HTML插值.html");
      this.Codearea.binding = this.readFile("../../static/源码/03.v-bind属性.html");
      this.Codearea.classes = this.readFile("../../static/源码/04.类名绑定.html");
      this.Codearea.styles = this.readFile("../../static/源码/05.样式绑定.html");
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pdfViewer .page {
    background-color: white;
  }

  :root {
    --body-bg-color: rgb(255, 255, 255);
  }
</style>