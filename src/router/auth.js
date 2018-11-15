import router from '@/router/index'

// 登陆拦截
router.beforeEach((to, from, next) => {
    if (to.query.wddc2sjjh_token) {
      // 单点登录
      $.ajax({
          url: api.ssoLoginApi, //请求url
          async:false,
          data:{"wddc2sjjh_token":to.query.wddc2sjjh_token},
          success: res => {
            if (res.status == 200) {
              // 单点登陆成功
              mySessionStorage.set("userInfo",res.data.userInfo);
              mySessionStorage.set("token",res.data.token);
              store.commit("setToken",res.data.token);
              Cookies.set('locking', '0');
              Cookies.set('userInfo', res.data.userInfo);
              next({
                  path: '/index',
              })
            }else{
              store.commit('setLogMsg',"用户认证失败,请重新登录");
              next({
                  path: '/login'
              })
            }
          },
          error: (err) => {
            // 失败
            store.commit('setLogMsg',"用户认证失败,请重新登录");
            next({
                path: '/login'
            })
          }
      });
    }
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        var sessionToken = mySessionStorage.get('token');
        var storeToken = store.state.token;
        if(to.name != "locking"&&Cookies.get('locking') == "1"){
          next({
              path: '/locking',
          })
        }else if (storeToken!=''&&sessionToken&&storeToken == sessionToken) {  // 判断store和浏览器缓存中的token都存在且想等
            next();
        }else {
          store.commit('setLogMsg',"用户认证失败,请重新登录");
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
    }
    else {
        next();
    }
})