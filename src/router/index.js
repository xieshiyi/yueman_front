import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage/HomePage'
import Contents from '@/pages/Contents/Contents'
import Detail from '@/pages/Detail/Detail'
import Dreams from '@/pages/Dreams/Dreams'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/contents/:bookid',
      name: 'Contents',
      component: Contents,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/dreams',
      name: 'Dreams',
      component: Dreams,
      meta: {
        keepAlive: true
      }
    }
  ]
})
