// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
// iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// i18n多语言国际化
import i18n from './language/i18n.js'
// 主题
import './assets/my-theme/theme.less'

// 引入vuex store
import store from './vuex/store.js'


Vue.config.productionTip = false

Vue.use(iView, {
    transfer: true,
    size: 'default'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
