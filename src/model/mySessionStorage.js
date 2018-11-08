/*
* @Author: wulong
* @Date:   2018-06-15 11:14:20
* @Last Modified by:   wulong
* @Last Modified time: 2018-06-26 12:08:53
*/

var mySessionStorage = {
    set(key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        try{
            return JSON.parse(sessionStorage.getItem(key));
        }catch(err){
            return sessionStorage.getItem(key);
        }
    },
    remove(key){
        sessionStorage.removeItem(key);
    }
}

// 将模块暴露出去
export default mySessionStorage;