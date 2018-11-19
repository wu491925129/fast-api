import Vue from 'vue'
import VueI18n from 'vue-i18n'
import iView from 'iview';
import enLocale from 'iview/dist/locale/en-US';
import zhLocale from 'iview/dist/locale/zh-CN';
import zhTWLocale from 'iview/dist/locale/zh-TW';
import jpLocale from 'iview/dist/locale/ja-JP'
import zh from './langs/zh'
import en from './langs/en'
import hk from './langs/hk.js'
import jp from './langs/jp.js'

Vue.use(VueI18n);
Vue.use(iView);
Vue.locale = () => {};

const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale),
  hk: Object.assign(hk, zhTWLocale),
  jp: Object.assign(jp, jpLocale),
}

const i18n = new VueI18n({
	// 缓存设置语言选择
  locale: localStorage.getItem('language') || 'zh',
  messages 
})

export default i18n