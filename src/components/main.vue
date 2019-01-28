<style scoped>
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-logo img{
        margin-bottom: 15px;
        width: 100px;
        height: 30px;
    }
    .layout-nav{
        float: right;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .lock-screen-btn-con {
        cursor: pointer;
    }
    .m-l-10{
        margin-left: 10px
    }
    .p-0{
        padding: 0px;
    }
    .p-10{
        padding: 0 10px;
    }
    .img-div{
        width: 18px;
        height: 15px;
        display: inline-block;
        line-height: 20px;
        margin-left: 5px;
    }
    .gold-img{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div style="height:100%">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="../assets/images/logo.png">
                    </div>
                    <div class="layout-nav">
                        <!-- 选项 -->
                        <MenuItem
                            v-for="(item,index) in navList"
                            :key="index"
                            :name="'1-'+index"
                            v-if="!item.hidden">
                            <Icon :type="item.icon"></Icon>
                            {{navlangs(index)}}
                        </MenuItem>
                        <!-- 语言选择 -->
                        <Submenu name="5">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                {{language}}
                            </template>
                            <!-- click.native 普通的click监听不生效，
                                故使用click.native监听原生点击事件 -->
                            <MenuItem
                                v-for="(item,index) in langs"
                                :key="index"
                                :name="'5-'+index"
                                @click.native="changeLanguage(item.code)">
                                {{item.name}}
                            </MenuItem>
                        </Submenu>
                        <MenuItem name="6" class="p-0">
                            <lockScreen></lockScreen>
                        </MenuItem>
                        <MenuItem name="7" class="p-0">
                            <fileUpload @uploadStatus="upload"></fileUpload>
                        </MenuItem>
                        <Submenu name="8">
                            <template slot="title">
                                <Avatar :src="storeUserInfo.avatarUrl+'/thumb'" />
                            </template>
                            <!-- click.native 普通的click监听不生效，
                                故使用click.native监听原生点击事件 -->
                            <MenuItem
                                v-for="(item,index) in userInfo"
                                :key="index"
                                :name="'5-'+index"
                                @click.native="getUser(item.url)">
                                {{item.name}}
                            </MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
        </Layout>

        <Layout style="height:100%">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem
                        v-for="(item,index) in sliderList"
                        :key="index"
                        :name="index"
                        v-if="!item.hidden">
                        <Icon :type="item.icon"></Icon>
                        <span>{{sliderLangs(index)}}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', height:'100%'}">
                    <router-view ref="fileView"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import myLocalStorage from '@/model/myLocalStorage.js'
    import lockScreen from './lock/lockscreen.vue'
    import fileUpload from './upload/fileUpload.vue'
    export default {
        components: {
            lockScreen,
            fileUpload
        },
        data () {
            return {
                isCollapsed: false,
                language:"选择语言",
                langs:[
                    {name:'简体中文',code:"zh"},
                    {name:'繁体中文',code:"hk"},
                    {name:'English',code:"en"},
                    {name:'日本語',code:"jp"}
                ],
                userInfo:[
                    {name:'个人中心',url:'user'},
                    {name:'退出',url:'/logout'}
                ],
                navList:[],
                sliderList:[],
                info:{}
            }
        },
        // 计算属性
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            navlangs(){
                // 计算属性使用闭包的方法缓解不能传参的尴尬
                return (index) => {
                    return this.$t("navList")[index];
                }
            },
            sliderLangs(){
                return (index) => {
                    return this.$t("sliderList")[index].name;
                }
            },
            // vuex 双向数据绑定
            storeUserInfo: {
               set (value) {
                  this.$store.commit('setUserInfo',value)
               },
               get(){
                   return this.$store.state.userInfo;
               }
            }
        },
        mounted(){
            // 初始化从store中拿数据
            var code = myLocalStorage.get("language");
            this.info = this.storeUserInfo;
            this.getLanguageByCode(code);
            this.$i18n.locale = code;
            this.navList = this.$store.state.navList;
            this.sliderList = this.$store.state.sliderList;
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            changeLanguage(code){
                this.$i18n.locale = code;
                this.getLanguageByCode(code);
                localStorage.setItem('language',code)
            },
            getLanguageByCode(code){
                // 根据语言代码获取语言名称
                this.langs.forEach((info,index) => {
                    if (info.code == code) {
                        this.language = info.name;
                    }
                });
            },
            getUser(url){
                this.$router.push({path:url})
            },
            /* 子组件fileUpload方法 */
            upload(status){
                // 获取到子组件文件上传成功的状态，通知子路由刷新页面
                if (status == 'success') {
                    this.$refs.fileView.getFileList();
                }
            }
        }
    }
</script>