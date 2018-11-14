<template>
    <div class="read" style="background:#fff">
        <Row :gutter="5" class="p-b-20">
            <Col span="24">
                <Col :xs="24" :sm="12" :md="6" class="p-10" @click.native="showDrawer('word')">
                    <Card>
                        <div style="text-align:center">
                            <img src="@/assets/images/word.png">
                            <h3>测试word.docx</h3>
                        </div>
                    </Card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-10" @click.native="showDrawer('excel')">
                    <Card>
                        <div style="text-align:center">
                            <img src="@/assets/images/excel.png">
                            <h3>测试excel.xlsx</h3>
                        </div>
                    </Card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-10" @click.native="showDrawer('ppt')">
                    <Card>
                        <div style="text-align:center">
                            <img src="@/assets/images/ppt.png">
                            <h3>测试ppt.pptx</h3>
                        </div>
                    </Card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-10" @click.native="showDrawer('word')">
                    <Card>
                        <div style="text-align:center">
                            <img src="@/assets/images/word.png">
                            <h3>测试word2.docx</h3>
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
                @on-visible-change="test">
            <iframe class="fileFrame" frameborder="no" border="0" :src="fileUrl" @load="removeEl">
            </iframe>
        </Drawer>
    </div>
</template>
<script>
    import myAjax from '@/ajax/myAjax.js'
    import {api} from '@/api/api.js'
    export default {
        data () {
            return {
                drawer:false,
                fileUrl:''
            }
        },
        mounted(){
            $("#WACRibbonPanel").remove();
        },
        methods:{
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
            test(el){
                if (!el) {
                    this.fileUrl = "";
                }
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