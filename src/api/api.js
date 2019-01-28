/*
* @Author: wulong
* @Date:   2018-07-10 15:16:59
* @Last Modified by:   wulong
* @Last Modified time: 2018-08-28 14:15:51
*/

/* 从配置url中获取相应的数据 */
let baseUrl = myConf.baseUrl;
let fileServer = myConf.fileServer;
export const api = {
    /* 登陆验证Api */
    loginApi:baseUrl+'/login',

    /* 注册 */
    registApi:baseUrl+'/user/info/regist',

    /* 单点登录Api */
    ssoLoginApi:baseUrl+'/ssoLogin',

    /****************************************************/
    /************************ 首页 **********************/

    /* 首页 */
    indexPageApi:'static/indexPage.json',

    /* 首页 - 获取新增用户列表 */
    personAddApi:'static/personAdd.json',

    /* 首页 - 获取点击量列表 */
    clickRateApi:'static/clickRate.json',

    /* 首页 - 获取新增文件列表 */
    fileAddApi:'static/fileAdd.json',

    /* 首页 - 获取分享列表 */
    shareCountApi:'static/shareCount.json',


    /****************************************************/
    /***************** file 文件显示页面******************/
    /* 文件上传 */
    uploadApi:fileServer+"upload",

    downloadApi:fileServer+"download/",

    getFileList:baseUrl+'/upload/info/list',

    uploadStatusApi:baseUrl+'/upload/info/add',

    changeAvatarApi:baseUrl+'/user/info/changeAvatar'


}