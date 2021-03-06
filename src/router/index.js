import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/vuex/store'
import iView from 'iview'
import mySessionStorage from '@/model/mySessionStorage'
import myLocalStorage from '@/model/myLocalStorage'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

// 登陆拦截
router.beforeEach((to, from, next) => {
  // 将sessionStorage中的用户信息实时缓存到store中
  store.commit("setUserInfo",mySessionStorage.get("userInfo"));
  iView.LoadingBar.start();
  const token = mySessionStorage.get('auth_token');
  // 退出
  if (to.path == "/logout") {
    mySessionStorage.remove("auth_token");
    myLocalStorage.set("locking","0")
    next({
      name:LOGIN_PAGE_NAME
    })
  }else if(to.name != "locking"&&myLocalStorage.get('locking') == "1"){
    // 锁屏
    next({name:'locking'})
  }else{
    if (!token && to.name != LOGIN_PAGE_NAME) {
      // 没有token
      myLocalStorage.set("locking","0")
      next({
        name:LOGIN_PAGE_NAME
      })
    }else{
      next();
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0)
})

export default router
