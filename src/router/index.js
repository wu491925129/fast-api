import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      // 权限控制
      meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      // 懒加载
      component:resolve=>require(['@/components/main.vue'],resolve),
      children:[
        {
          path: '/index',
          name: 'index',
          meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
           // 懒加载
          component:resolve=>require(['@/components/index/index.vue'],resolve)
        }
      ]
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
