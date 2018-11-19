/*
* 封装localStaorage
* @Author: wulong
* @Date:   2018-06-12 14:56:56
* @Last Modified by:   wulong
* @Last Modified time: 2018-06-26 12:10:20
*/

var myLocalStorage = {
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        try{
            return JSON.parse(localStorage.getItem(key));
        }catch(err){
            return localStorage.getItem(key);
        }
    },
    remove(key){
        localStorage.removeItem(key);
    },
}

// 将模块暴露出去
export default myLocalStorage;