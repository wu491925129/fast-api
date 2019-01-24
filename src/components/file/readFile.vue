<template>
    <div class="read" style="background:#fff">
        <Row :gutter="5" class="p-b-20">
            <Col span="24">
                <Col :xs="24" :sm="12" :md="6" 
                     v-for="(info,index) in fileList" 
                     :key="index"
                     class="p-10" 
                     @click.native="showDrawer(info.fileId)">
                    <Card>
                        <div style="text-align:center">
                            <img v-if="info.fileSuffix === 'docx'" src="@/assets/images/word.png">
                            <img v-else-if="info.fileSuffix === 'xlsx' || info.fileSuffix === 'xls'" src="@/assets/images/excel.png">
                            <img v-else-if="info.fileSuffix === 'pptx'" src="@/assets/images/ppt.png">
                            <img v-else src="@/assets/images/default.png">
                            <Row>
                                <Tooltip max-width="200" :content="info.fileName" placement="top">
                                    <h3>{{formatFileName(info.fileName)}}</h3>
                                </Tooltip>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Col>
        </Row>
        <Drawer placement="right" 
                :closable="true" 
                v-model="drawer"
                width="90"
                @on-visible-change="changeDrawer">
            <iframe class="fileFrame" frameborder="no" border="0" :src="fileUrl" @load="removeEl">
            </iframe>
        </Drawer>
    </div>
</template>
<script>
    import myAjax from '@/ajax/myAjax.js'
    import {api} from '@/api/api.js'
    import mySessionStorage from '@/model/mySessionStorage'
    export default {
        data () {
            return {
                drawer:false,
                fileUrl:'',
                timer: null,
                fileList:[],
            }
        },
        // 计算属性
        computed: {
            formatFileName(){
                return (fileName) => {
                    if (fileName.length > 14) {
                        return fileName.substr(0,13)+'...';
                    }else{
                        return fileName;
                    }
                }
            }
        },
        mounted(){
            this.getFileList();
            $("#WACRibbonPanel").remove();
        },
        methods:{
            getFileList(){
                var userId = mySessionStorage.get("userInfo").userId;
                myAjax.get({
                    url:api.getFileList,
                    data:{userId:userId,page:1,size:10},
                    success:(res)=>{  // 成功
                        if (res.code == 200) {
                            this.fileList = res.data.list
                        }else{
                        }
                    },
                    fail:(err)=>{     // 失败
                        console.log(err);
                    }
                })
            },
            showDrawer(fileId){
                this.$Spin.show();
                this.fileUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+api.downloadApi+fileId;
                this.drawer = true;
            },
            removeEl(){
                this.$Spin.hide();
            },
            changeDrawer(el){
                if (!el) {
                    this.fileUrl = "";
                }
                //this.setTimer();
            },
            setTimer(){
        　　　　this.timer = setInterval(() => {
                    var a = $('.fileFrame').contents();
                    console.log($(a.prevObject).children("#WACRibbonPanel").remove())
        　　　　}, 1000)
        　　}
        }
    }
</script>
<style scoped>
    @import '../../assets/css/style.css';
    .read{
        width: 100%;
        height: 100%
    }
    .fileFrame{
        width: 100%;
        height: 100%
    }
    img{
        width: 80px;
        height: 80px;
    }
</style>