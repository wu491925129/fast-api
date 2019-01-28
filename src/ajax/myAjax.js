/*
* 全局ajax处理
* @Author: wulong
* @Date:   2018-07-12 12:30:44
* @Last Modified by:   wulong
* @Last Modified time: 2018-07-31 09:57:11
*/

import mySessionStorage from '../model/mySessionStorage.js';

var myAjax = {
    get(options){
        let token = mySessionStorage.get("auth_token")?mySessionStorage.get("auth_token"):'';
        /**
         * 传入方式默认为对象
         * */
        options = options || {};
        /**
         * 返回值类型默认为json
         * */
        options.dataType = options.dataType || 'json';
        /**
         * 默认为异步请求
         * */
        options.async = options.async?options.async:true;
        
        $.ajax({
            url: options.url,   //请求url
            type: 'get',  //全部用POST
            async:options.async,
            data:options.data,
            dataType:options.dataType, // 返回值类型
            beforeSend: function(request) {
                request.setRequestHeader("auth_token", token);
            },
            success:(res)=>{  // 成功
                options.success(res);
            },
            error:(err)=>{     // 失败
                options.fail(err);
            }
        });
    },
    post(options){
        let authToken = mySessionStorage.get("auth_token")?mySessionStorage.get("auth_token"):'';
        /**
         * 传入方式默认为对象
         * */
        options = options || {};
        /**
         * 返回值类型默认为json
         * */
        options.dataType = options.dataType || 'json';
        /**
         * 默认为异步请求
         * */
        options.async = options.async?true:false;
        $.ajax({
            url: options.url,   //请求url
            type: 'POST',  //全部用POST
            async:options.async,
            data:options.data,  // 参数
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            dataType:options.dataType, // 返回值类型
            beforeSend: function(request) {
                request.setRequestHeader("auth_token", authToken);
            },
            success:(res)=>{  // 成功
                options.success(res);
            },
            fail:(err)=>{     // 失败
                options.fail(err);
            }
        });
    }
}

// 将模块暴露出去
export default myAjax;