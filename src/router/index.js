import Vue from 'vue'
import VueRouter from 'vue-router'

import myhome from '../view/myhome'

import showinfo from '../view/pages/F1/showinfo'
import infoeditor from '../view/pages/F1/infoeditor'
import imageup from '../view/pages/F1/imageup'
import myshopping from '../view/pages/F2/myshopping'
//import health from '../view/health'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/showinfo',
      name: 'showinfo',
      component: showinfo
    },
    {
      path: '/infoeditor',
      name: 'infoeditor',
      component: infoeditor
    },
    {
      path: '/imageup',
      name: 'imageup',
      component: imageup
    },
    {
      path: '/myshopping',
      name: 'myshopping',
      component: myshopping
    }
  ]
  
})
