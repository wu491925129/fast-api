<style lang="less">
    @import '../styles/unlock.less';
</style>

<template>
    <transition name="show-unlock">
        <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
            <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
                <img class="unlock-avator-img" src="../../../assets/images/user.png">
                <div  class="unlock-avator-cover">
                    <span><Icon type="unlocked" :size="30"></Icon></span>
                    <p>解锁</p>
                </div>
            </div>
            <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
            <div class="unlock-input-con">
                <div class="unlock-input-overflow-con">
                    <div class="unlock-overflow-body" :style="{right: inputLeft}">
                        <input ref="inputEle" v-model="password" class="unlock-input" type="password" placeholder="请输入登录密码" />
                        <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn">
                            <Icon color="white" type="md-unlock"></Icon>
                        </button>
                    </div>
                </div>
            </div>
            <div class="unlock-locking-tip-con text-center">用户已锁定</div>
        </div>
    </transition>
</template>

<script>
import myLocalStorage from '@/model/myLocalStorage';
import myAjax from '@/ajax/myAjax'
import {api} from '@/api/api'
import mySessionStorage from '@/model/mySessionStorage'
import md5 from 'js-md5'
export default {
    name: 'Unlock',
    data () {
        return {
            avatorLeft: '0px',
            inputLeft: '400px',
            userInfo:{},
            password: '',
            check: null,
        };
    },
    props: {
        showUnlock: {
            type: Boolean,
            default: false
        }
    },
    mounted(){
        this.userInfo = JSON.parse(myLocalStorage.get('userInfo'));
    },
    methods: {
        handleClickAvator () {
            this.avatorLeft = '-180px';
            this.inputLeft = '0px';
            this.$refs.inputEle.focus();
        },
        handleUnlock () {
            if (this.password == '') {
                this.$Message.warning('密码不能为空~');
            }else if (md5(this.password) != this.$store.state.password) {
                // 密码错误
                var loginCount = mySessionStorage.get("loginCount");
                if (!loginCount) {
                    loginCount = 1;
                }
                if (loginCount <= 5) {
                    this.$Message.error('密码错误，还有'+(6-loginCount)+'次机会！');
                    this.password = '';
                    mySessionStorage.set("loginCount",loginCount+1);
                }else{
                    this.$router.push({path:'/logout'});
                    mySessionStorage.remove("loginCount");
                    myLocalStorage.set("locking","0");
                }
            }else{
                mySessionStorage.remove("loginCount");
                myLocalStorage.set("locking","0");
                this.$router.push({name:myLocalStorage.get('last_page_name')});
            }
        },
        unlockMousedown () {
            this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
        },
        unlockMouseup () {
            this.$refs.unlockBtn.className = 'unlock-btn';
        }
    }
};
</script>
