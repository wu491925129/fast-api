import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './langs/zh'
import en from './langs/en'
import hk from './langs/hk.js'
import jp from './langs/jp.js'
import enLocale from 'iview/dist/locale/en-US';
import zhLocale from 'iview/dist/locale/zh-CN';

Vue.use(VueI18n)

const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale),
  hk: Object.assign(hk, null),
  jp: Object.assign(jp, null),
}

const i18n = new VueI18n({
	// 缓存设置语言选择
  locale: localStorage.getItem('language') || 'zh',
  messages 
})

export default i18n