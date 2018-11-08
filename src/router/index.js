import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/locking',
      name: 'locking',
      meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve=>require(['@/components/lock/components/locking-page.vue'],resolve),
    }
  ]
})
