<template>
    <div class="read" style="background:#fff">
        <Row :gutter="5" class="p-b-20">
            <Col span="24">
                <Col :xs="24" :sm="12" :md="6" v-for="(info,index) in fileList" class="p-10" @click.native="showDrawer('word')">
                    <Card>
                        <div style="text-align:center">
                            <img v-if="info.fileSuffix === 'docx'" src="@/assets/images/word.png">
                            <img v-else-if="info.fileSuffix === 'xlsx' || info.fileSuffix === 'xls'" src="@/assets/images/excel.png">
                            <img v-else-if="info.fileSuffix === 'pptx'" src="@/assets/images/ppt.png">
                            <h3>{{info.fileName}}</h3>
                        </div>
                    </Card>
                </Col>
            </Col>
        </Row>
        <Drawer title="Basic Drawer" 
                placement="right" 
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
            showDrawer(el){
                this.$Spin.show();
                switch(el){
                    case 'word':
                        this.fileUrl = 'http://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx';
                        break;
                    case 'excel':
                        this.fileUrl = 'http://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Flearn.bankofamerica.com%2Fcontent%2Fexcel%2FWedding_Budget_Planner_Spreadsheet.xlsx'
                        break;
                    case 'ppt':
                        this.fileUrl = 'http://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fvideo.ch9.ms%2fbuild%2f2011%2fslides%2fTOOL-532T_Sutter.pptx';
                        break;
                }
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