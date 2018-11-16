<style scoped>
    @import '../../assets/css/user.css'
</style>
<template>
    <Row>
        <Breadcrumb>
            <BreadcrumbItem to="/index">{{$t('sliderList')[0].name}}</BreadcrumbItem>
            <BreadcrumbItem>{{$t('userCenter').urlName}}</BreadcrumbItem>
        </Breadcrumb>
        <Col :xs="24" :sm="12" :md="10">
            <Card class="m-20">
                <Row :gutter="16">
                    <Col span="12">
                        <Badge :count="1">
                            <img class="user-img" src="static/user.jpg">
                        </Badge>
                    </Col>
                    <Col span="12">
                        <div class="user-name" :title="userInfo.displayName">
                            {{userInfo.displayName | ellipsis}}
                        </div>
                        等级：
                        <Tag color="red">
                            <Icon type="ios-medal" size="16"/>
                            {{userInfo.myLevel | level}}
                        </Tag>
                        <div>
                            兴趣标签：<br>
                            <Tag v-if="userInfo.likeTag != ''" 
                                 color="primary" 
                                 closable 
                                 v-for="(tag,index) in (userInfo.likeTag).split(',')"
                                 @on-close="delTag(tag,index)"
                                 :key="'tag_'+index">
                                <Icon type="ios-pricetags-outline" /> 
                                {{tag}}
                            </Tag>
                            <Button icon="ios-add" type="dashed" size="small" @click="tagAdd">添加标签</Button>
                        </div>
                    </Col>
                </Row>
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
        
    </Row>
</template>
<script>
    import myLocalStorage from '@/model/myLocalStorage.js'
    import i18n from '@/language/i18n'
    export default {
        data () {
            return {
                userInfo:{
                    "userId":"1",
                    "userName":"admin",
                    "displayName":"贝瑟克啊啊啊啊啊啊啊啊",
                    "gold":2000,
                    "myLevel":6600,
                    "online":1,
                    "disabled":0,
                    "email":"491925129@qq.com",
                    "mobile":"18086526257",
                    "likeTag":"漫画,杂志,摄影,星座运势,军事",
                    "loginAt":"2018-11-16 12:00:00",
                    "loginIp":"127.0.0.1",
                    "loginCount":123,
                    "loginTheme":"theme2.css",
                    "avatarUrl":"static/user.jpg",
                    "opBy":"admin",
                    "opAt":"2018-11-15 09:00:00",
                    "delFlag":0
                }
            }
        },
        filters:{
            ellipsis(value){
                if (value.length > 5) {
                    return value.slice(0,8) + '...';
                }
                return value
            },
            level(value){
                if (0<value&&value<100) {
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
        },
        methods: {
            delTag(tag,index){
                var tagList = this.userInfo.likeTag.split(',');
                tagList.splice(index, 1);
                this.userInfo.likeTag = tagList.join(',');
                console.log(this.userInfo.likeTag)
            },
            tagAdd(){
                // 添加标签
            }
        }
    }
</script>