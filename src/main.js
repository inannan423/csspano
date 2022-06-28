// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Clipboard from 'clipboard'
import hl from 'highlight.js' // 导入代码高亮文件
import 'highlight.js/styles/a11y-dark.css' // 导入代码高亮样式
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'

// Vue.use(VueCodemirror)
Vue.prototype.clipboard = Clipboard

Vue.use(ElementUI)
Vue.config.productionTip = false
// 自定义一个代码高亮指令
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hl.highlightBlock(block)
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
