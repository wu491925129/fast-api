<style scoped>
    @import '../../assets/css/user.css'
</style>
<template>
    <Row>
        <Breadcrumb>
            <BreadcrumbItem to="/index">{{$t('sliderList')[0].name}}</BreadcrumbItem>
            <BreadcrumbItem>{{$t('userCenter').urlName}}</BreadcrumbItem>
        </Breadcrumb>
        <Col :xs="24" :sm="12" :md="8">
            <Card class="m-20">
                <Row :gutter="16">
                    <!-- 用户头像 用户名 等级 -->
                    <Col span="12" class="img-item">
                        <Badge :count="1">
                            <img v-if="storeUserInfo.avatarUrl != ''" class="user-img" :src="storeUserInfo.avatarUrl+'/thumb'">
                            <img v-else class="user-img" src="static/user.jpg">
                            <Spin size="large" fix v-if="spinShow"></Spin>
                            <div class="demo-upload-list-cover">
                                <div class="icon-group">
                                    <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                                    <Upload
                                        ref="upload"
                                        :show-upload-list="false"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :on-format-error="handleFormatError"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        :action="uploadAction"
                                        style="display: inline-block;">
                                        <div>
                                            <Icon type="ios-camera-outline" size="25"></Icon>
                                        </div>
                                    </Upload>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </div>

                        </Badge>
                    </Col>
                    <Col span="12">
                        <div class="user-name"
                             :title="userInfo.userName"
                             v-if="userInfo.displayName == null||userInfo.displayName == ''">
                            {{userInfo.userName | ellipsis}}
                        </div>
                        <div class="user-name"
                             :title="userInfo.displayName"
                             v-else>
                            {{userInfo.displayName | ellipsis}}
                        </div>
                        {{$t("userCenter").level}}：
                        <Tag color="red">
                            <Icon type="ios-medal" size="16"/>
                            {{userInfo.myLevel | level}}
                        </Tag>
                    </Col>

                    <!-- 添加标签 -->
                    <Col span="24">
                        <div>
                            {{$t('userCenter').subLabel}}：<br>
                            <Tag v-if="userInfo.likeTag == null||userInfo.likeTag==''"></Tag>
                            <Tag v-else
                                 color="primary"
                                 closable
                                 v-for="(tag,index) in (userInfo.likeTag).split(',')"
                                 @on-close="delTag(tag,index)"
                                 :key="'tag_'+index">
                                <Icon type="ios-pricetags-outline" />
                                {{tag}}
                            </Tag>
                            <Button icon="ios-add" type="dashed" size="small" @click="tagAdd">
                                {{$t("userCenter").addLabel}}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <!-- 我的文档 我的收藏 上传文档 -->
                <div style="text-align:center">
                    <div class="user_crumb">
                        <ul>
                            <li>
                                <a class="fcb" href="#">
                                    0<br>{{$t('userCenter').myDoc}}
                                </a>
                            </li>
                            <li>
                            <a class="fcb" href="#">
                                2<br>{{$t('userCenter').myCollect}}</a>
                            </li>
                            <li class="last">
                                <a class="fco" href="#" :title="userInfo.gold+$t('userCenter').gold">
                                    <img src="@/assets/images/gold.png">
                                    {{userInfo.gold}}
                                </a>
                                <br>
                                <a href="#" :title="$t('userCenter').uploadFile">
                                {{$t('userCenter').uploadFile}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </Col>

        <!-- 侧边弹框 添加标签 -->
        <Drawer
            :title="$t('userCenter').tagDrawer"
            v-model="tagDrawer"
            width="30%"
            closable
            class="tag-drawer">
            {{tagList}}
            <Row>
                <Col v-for="(item,index) in $t('userCenter').tagList" :key="index">
                    <h2>
                        <Icon type="ios-pricetag" />
                        <span class="title">{{item.name}}&nbsp;&nbsp;</span>
                    </h2>
                    <CheckboxGroup v-model="tagList">
                        <Checkbox size="large"
                                  v-for="(tag,index1) in item.list"
                                  :label="$t('userCenter').tagList[index].list[index1]"
                                  :key="index1">
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
            <div class="tag-drawer-footer">
                <Button style="margin-right: 8px" @click="tagDrawer = false">{{$t('cancel')}}</Button>
                <Button type="primary" @click="updateTags">{{$t('submit')}}</Button>
            </div>
        </Drawer>
        <Modal title="头像详情" v-model="visible">
            <img :src="storeUserInfo.avatarUrl" v-if="visible" style="width: 100%">
        </Modal>
    </Row>
</template>
<script>
    import myLocalStorage from '@/model/myLocalStorage.js'
    import mySessionStorage from '@/model/mySessionStorage'
    import i18n from '@/language/i18n'
    import {api} from '@/api/api'
    import myAjax from '@/ajax/myAjax'
    export default {
        data () {
            return {
                userInfo:{},
                tagDrawer:false,
                tagList:[],
                uploadAction:api.uploadApi,
                spinShow:false,
                visible: false
            }
        },
        computed: {
            storeUserInfo: {
               set (value) {
                  this.$store.commit('setUserInfo',value)
               },
               get(){
                   return this.$store.state.userInfo;
               }
            }
        },
        filters:{
            ellipsis(value){
                if(value == null){
                    return "";
                }
                if (value.length > 5) {
                    return value.slice(0,8) + '...';
                }
                return value
            },
            level(value){
                if (0<=value&&value<100) {
                    return i18n.t('userCenter').level1
                }else if(100<=value&&value<1000){
                    return i18n.t('userCenter').level2
                }else if(1000<=value&&value<2000){
                    return i18n.t('userCenter').level3
                }else if(2000<=value&&value<3000){
                    return i18n.t('userCenter').level4
                }else if(3000<=value&&value<4000){
                    return i18n.t('userCenter').level5
                }else if(4000<=value&&value<5000){
                    return i18n.t('userCenter').level6
                }else if(5000<=value){
                    return i18n.t('userCenter').level7
                }
            }
        },
        mounted(){
            // 从store中拿用户信息
            this.userInfo = this.storeUserInfo;
            if(this.userInfo.likeTag != "" && this.userInfo.likeTag != null){
                this.tagList = this.userInfo.likeTag.split(',');
            }
        },
        methods: {
            delTag(tag,index){
                var tagList = this.userInfo.likeTag.split(',');
                tagList.splice(index, 1);
                this.userInfo.likeTag = tagList.join(',');
                if(this.userInfo.likeTag != "" && this.userInfo.likeTag != null){
                    this.tagList = this.userInfo.likeTag.split(',')
                }
            },
            tagAdd(){
                // 添加标签
                this.tagDrawer = true;
            },
            updateTags(){
                this.userInfo.likeTag = this.tagList.join(',');
                this.tagDrawer = false;
            },
            handleView () {
                this.visible = true;
            },
            handleSuccess(res){
                // todo 服务器端更新头像链接
                if (res.code == 200) {
                    // 当前页面更新头像
                    // 更新用户信息
                    var userInfo = mySessionStorage.get("userInfo");
                    userInfo.avatarUrl = api.downloadApi+res.data.fileId;
                    mySessionStorage.set("userInfo",userInfo);
                    this.storeUserInfo = userInfo;
                    this.spinShow = false;
                    myAjax.post({
                        url:api.changeAvatarApi,
                        type:"POST",
                        data:{userName:userInfo.userName,avatarUrl:userInfo.avatarUrl},
                        success:(res)=>{  // 成功
                            if (res.code == 200) {
                                this.$Message.success('头像更新成功！');
                            }else{
                                this.$Message.error('头像更新失败！');
                            }
                        },
                        fail:(err)=>{     // 失败
                            console.log(err);
                        }
                    })
                }else{
                    this.$Message.error('图片上传失败！');
                    this.spinShow = false;
                }
            },
            handleFormatError(file){

            },
            handleBeforeUpload(file){
                this.spinShow = true;
            }
        }
    }
</script>