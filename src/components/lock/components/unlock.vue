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
            myAjax.get({
                url: api.loginApi, //请求url
                async:false,
                data:{loginName:this.userInfo.logonName,password:hex_md5(this.password)},
                success: (res) => {
                  if (res.status == 200) {
                    this.avatorLeft = '0px';
                    this.inputLeft = '400px';
                    this.password = '';
                    this.$store.commit("setToken",res.data.token);
                    mySessionStorage.set("token",res.data.token);
                    myLocalStorage.set('locking', '0');
                    this.$emit('on-unlock');
                  }else{
                    this.$Message.error('密码错误,请重新输入。');
                    this.password = '';
                  }
                }
            });
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
