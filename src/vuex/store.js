/*
* @Author: wulong
* @Date:   2018-06-20 15:00:41
* @Last Modified by:   wulong
* @Last Modified time: 2018-07-17 11:01:26
*/
import Vue from 'vue'
import Vuex from 'vuex'
import myLocalStorage from '../model/myLocalStorage.js'
import i18n from '../language/i18n.js'

Vue.use(Vuex);

const state = {
    // 从浏览器缓存中获取token
    token:myLocalStorage.get("token")?myLocalStorage.get("token"):'',
    isLogin:true,
    logMsg:'',
    password:'',
    userInfo:{},
    navList:[
        {
            'text':'',
            'url':'/home',
            'isAct':false,
            'icon':'ios-navigate',
            'hidden':false,
            'meta':{
                // 权限控制
                'role':['1','2']
            }
        },
        {
            'text':'',
            'url':'/home',
            'isAct':false,
            'icon':'ios-keypad',
            'hidden':false,
            'meta':{
                // 权限控制
                'role':['1','2']
            }
        },
        {
            'text':'',
            'url':'/home',
            'isAct':false,
            'icon':'ios-analytics',
            'hidden':false,
            'meta':{
                // 权限控制
                'role':['1','2']
            }
        },
        {
            'text':'',
            'url':'/home',
            'isAct':false,
            'icon':'ios-paper',
            'hidden':false,
            'meta':{
                // 权限控制
                'role':['1','2']
            }
        }
    ],
    sliderList:[
        {
            'text':'',
            'url':'/home',
            'isAct':false,
            'icon':'ios-navigate',
            'hidden':false,
            'meta':{
                // 权限控制
                'role':['1','2']
            }
        },
        {
            'text':'',
            'url':'/charts',
            'isAct':false,
            'icon':'ios-keypad',
            'hidden':false,
            'meta':{
                'role':['1','2']
            }
        },
        {
            'text':'',
            'url':'/visitHouse',
            'isAct':false,
            'icon':'ios-analytics',
            'hidden':false,
            'meta':{
                'role':['1','2','3','4']
            }
        },
        {
            'text':'',
            'url':'/user',
            'isAct':false,
            'icon':'ios-paper',
            'hidden':false,
            'meta':{
                'role':['1','2','3','4']
            }
        }
    ]
}

const mutations = {
    setUserInfo(state,userInfo){
        state.userInfo = userInfo;
    },
    setToken(state,token){
        state.token = token;
    },
    setLogMsg(state,msg){
        state.logMsg = msg;
    },
    setPassword(state,password){
        state.password = password;
    },
    // 全局改变用户登录状态
    logout(state){
        state.isLogin = false;
    },
    // 全局改变bar(点击选中状态，改变图表颜色)
    changeBarList(state,index){
        state.barList.forEach(info=>{
            info.isAct = false;
        })
        state.barList[index].isAct = true;
    },
    // 全局删除bar(根据用户的级别动态改变显示的bar)
    delectBar(state,index){
        // 从localStorage中获取用户的position 根据position设置bar隐藏还是显示
        var position = myLocalStorage.get("userInfo").position;
        if (state.barList[index].meta.role.indexOf(position) < 0) {
            state.barList[index].hidden = true;
        }else{
            state.barList[index].hidden = false;
        }
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;