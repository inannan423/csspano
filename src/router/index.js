
import Vue from 'vue'

import engine from '../view/engine'
import jiguang from '../view/jiguang'
import haitan from '../view/haitan'
import lasa from '../view/lasa'
import riluo from '../view/riluo'
import upload from '../view/upload'
import about from '../view/about'
import Main from '../view/Main'
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
    },
    {
      path: '/jiguang',
      name: 'jiguang',
      component: jiguang
    },
    {
      path: '/lasa',
      name: 'lasa',
      component: lasa
    },
    {
      path: '/haitan',
      name: 'haitan',
      component: haitan
    },
    {
      path: '/riluo',
      name: 'riluo',
      component: riluo
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
