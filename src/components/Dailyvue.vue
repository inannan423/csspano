<template>
  <div style="background-color:transparent" class="hello">
    <h2>2022/5/14</h2>
    <h3>“曲线救国”实现不转译html代码块并显示</h3>
    <div class="tip">
      <p>为了在博客展示html代码块可真费了九牛二虎之力！目前网上提供了以下几种办法：<br>
      一、code-mirror插件，通过npm安装部署在vue脚手架。但是经过尝试，多次部署并没有作用，甚至其css样式表会打乱elementui的样式。其主要作用是实现在线代码编辑器语法高亮，以后写富文本开发的时候可以试一试。<br>
      二、highlight.js。也是通过npm安装，elementui的官方文档也是使用其实现代码高亮。但是其好像不能屏蔽html代码，还需要人工转译，伤脑筋额！🐷<br>
      三、layui。这个是最快的方案，layui直接提供了代码高亮组件，在之前某个项目中我也用过。但是！它和Vue不太处得来，与elementui样式也会冲突。这个想法也破产了！<br>
      四、转义符。使用“& lt；”代替“<”,并使用“& gt；”代替“>”（去掉里面的空格），不过对于大块的html代码来说，这个似乎不太聪明。可以用js脚本批量转译，不过那也很麻烦！<br>
      五、“< xmp >”标签。这个很可惜，html5已经不再支持了。也不知道为啥... <br>
      六、就是曲线救国方案了。还是得靠咱Vue来实现。使用vue的插值法将代码插值进来就可以实现了！使用双大括号（Mustache语法）将需要的代码包裹！
      不过还有一个大问题。插值在js端封装的时候是不允许换行的，伤脑筋伤了很久，最后想到把代码放进一个txt文件中，然后通过读文件赋值给插值，用普通的css一写，大功告成！😂效果可见“插值绑定”日记。<br>
      这里就要用到Ajax了（实现js页面的局部刷新），创建小黄人对象（XmlHttpRequests）。请求和返回一个局部的文件（如xml和json）。之后再细学细讲。下面是读txt文件的Ajax代码：
    </p>
      <!-- <img class="inlinepic" mode="aspectfill" src="../../static/404.png" alt="404"> -->
      <pre id="code" class="code">
      <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
      data() {
        return {
          Codearea: {
            private: "",//存入文本
          },
        };
      },
      methods: {
        readFile(filePath) {
          // 创建一个新的xhr对象
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
      }
        
      </pre>
      <!-- nannan-8gceb5nt124c014d -->
    </div>
    <h2>2022/5/13</h2>
    <div class="tip">
      <p>大坑！打包完Vue项目后，想托管到github上，上传完成后打开github pages，内嵌资源报错404！怎么弄都不对！我觉得是Github的问题，然后使用微信云托管，成功了！那么如何将项目部署到腾讯云呢？见这篇文章：<el-link type="primary">https://developers.weixin.qq.com/community/develop/article/doc/000e66970fce1068d23a7aa1556c13</el-link></el-link></p>
      <img class="inlinepic" mode="aspectfill" src="../../static/404.png" alt="404">
      <pre id="code" class="code">
      <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        #安装云开发cli

        npm i -g @cloudbase/cli

        #执行命令登陆 Cli

        tcb login

        #上传dist文件

        cd dist

        #执行上传命令，envId要替换成自己的云环境id

        tcb hosting:deploy -e envId
        
      </pre>
      <!-- tcb hosting:deploy -e nannan-8gceb5nt124c014d -->
    </div>
    <h2>2022/5/12</h2>
    <div class="tip">
      <p>在使用npm run build打包vue项目后，发现element ui的图标包丢失了！真的很惊讶，后查阅csdn找到解决办法：找到utils.js文件，加上publicPath: '../../'</p>
      <pre id="code" class="code">
      <input class="copy-text" type="button" data-clipboard-target="#code" @click="copy();" value="Copy"></input>
        if (options.extract) { <br>
          return ExtractTextPlugin.extract({<br>
            use: loaders,<br>
            fallback: 'vue-style-loader',<br>
            publicPath: '../../'<br>
          })<br>
        }<br>
      </pre>
    </div>
    <div class="tip">
      <p>Vue实现一键复制功能：https://blog.csdn.net/womeiqianlene/article/details/104919107</p>
    </div>
  
    <!-- <pdf v-for="i in numPages" :src="src" :key="i" :page="i"  ref="pdf" class="pdf" ></pdf> -->
    <!-- <footer style="position:relative;display:flex;right:100px;float:right">
      <p class="p1">最近编辑：2022/5/12</p>
    </footer> -->
  </div>

</template>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js"></script>
<script>
  import pdf from 'vue-pdf'

  export default {
    components: {
      pdf
    },
    name: 'HelloWorld',
    data() {

      return {
        src: '../../static/Vue-spa.pdf',
        numPages: undefined,
        item: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      copy() {
        var that = this;
        console.log("clk");
        var clipboard = new this.clipboard('.copy-text');
            clipboard.on('success', function(e) {
                e.clearSelection(); //选中时不显示选中的背景色
                that.$message({
                  message: '复制成功',
                  type: 'success'
                });
            });
            clipboard.on('error', function() {
              that.$message({
                message: '复制失败',
                type: 'warn'
              });
            });
    }
    }
  }
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