
import Vue from 'vue'
import Main from '../view/Main'
import engine from '../view/engine'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/engine',
      name: 'engine',
      component: engine
    }
  ]
})
