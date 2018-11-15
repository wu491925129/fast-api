/**
 * 路由统一控制
 */

export default [
    {
      path: '/',
      redirect: '/index', // 重定向至首页
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
        },
        {
          path: '/file/read',
          name: 'readFile',
          meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
           // 懒加载
          component:resolve=>require(['@/components/file/readFile.vue'],resolve)
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
    },
    {
      path: '/login',
      name: 'login',
      // 权限控制
      meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      // 懒加载
      component:resolve=>require(['@/components/login.vue'],resolve)
    }
  ]