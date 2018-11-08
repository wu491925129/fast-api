/*
* @Author: wulong
* @Date:   2018-07-10 15:16:59
* @Last Modified by:   wulong
* @Last Modified time: 2018-08-28 14:15:51
*/

/* 从配置url中获取相应的数据 */
let baseUrl = "";
export const api = {
    /* 登陆验证Api */
    loginApi:baseUrl+'/login',

    /* 单点登录Api */
    ssoLoginApi:baseUrl+'/ssoLogin',

    /* 交换首页数据 */
    swapIndexApi:'static/swapIndex.json',

    /* 交换结果 - 交换信息列表 */
    swapResultApi:'static/swapResult.json',

    /* 交换结果 - 详细信息 */
    resultDetailApi:'static/resultDetail.json',

     /* 交换任务数据 */
     swapTaskApi:'static/swapTask.json',

    /* 交换任务 - 信息详细列表 */
    taskInfoApi:'static/taskInfo.json',

    uploadFileApi:baseUrl+'/uploadFile',

    /* 交换任务 - 获取所有交换任务 */
    getAllTaskApi: baseUrl+'/task/getAllTask',

    /* 交换任务 - 根据任务id获取任务 */
    getTaskInfo: baseUrl + '/task/getTask'

}