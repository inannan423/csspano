
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import Dailyvue from '@/components/Dailyvue'
import chazhi from '@/pages/chazhi'
import playcanvas from '@/components/playcanvas'
import Home from '@/components/Home'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Daily',
      name: 'Daily',
      component: Dailyvue
    },
    {
      path: '/playcanvas',
      name: 'playcanvas',
      component: playcanvas
    },
    {
      path: '/chazhi',
      name: 'chazhi',
      component: chazhi
    }
  ]
})
