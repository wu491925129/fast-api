<template>
    <div id="jhsy" style="background:#fff">
        <!-- <h2><span class="title">交换汇总&nbsp;&nbsp;</span></h2> -->
        <Row :gutter="5" class="p-b-20">
            <Col span="24">
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('personAdd')">
                    <infoCard
                        id-name="person-add"
                        :end-val="count.personAdd"
                        iconType="md-person-add"
                        color="#2d8cf0"
                        :textSize="itemInfo.textSize"
                        :intro-text="$t('indexPage').personAdd"
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('clickRate')">
                    <infoCard
                        id-name="click-rate"
                        :end-val="count.clickRate"
                        iconType="md-locate"
                        color="#64d572"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").clickRate'
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" >
                    <infoCard
                        id-name="file-add"
                        :end-val="count.fileAdd"
                        iconType="md-attach"
                        color="#fd7e14"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").fileAdd'
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('err')">
                    <infoCard
                        id-name="share-count"
                        :end-val="count.shareCount"
                        iconType="md-share"
                        color="rgb(237, 63, 20)"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").shareCount'
                    ></infoCard>
                </Col>
            </Col>
        </Row>
        <Modal
            title="任务交换失败列表"
            v-model="errModal"
            width="1000px"
            :styles="{top: '20px'}">
            <Table stripe :columns="errColumns" :data="errData" :loading="errLoading" class="m-b-10"></Table>
            <Page :total="errTotal" :page-size="5" current.sync="current" align="right" @on-change="pageChange('aaa')"></Page>
        </Modal>
        <Modal
            title="任务交换预警汇总"
            v-model="warningModal"
            width="1000px"
            :styles="{top: '20px'}">
            <Table stripe :columns="warningColumns" :data="warningData" :loading="warningLoading" class="m-b-10"></Table>
            <Page :total="warningTotal" :page-size="5" align="right" ></Page>
        </Modal>
    </div>
</template>
<script>
    import infoCard from './infoCard.vue'
    import myAjax from '@/ajax/myAjax.js'
    import {api} from '@/api/api.js'
    export default {
        data () {
            return {
                actItem:0,
                scroll:true,
                itemInfo:{
                    textSize:'20px'
                },
                count: {
                    personAdd:2536,
                    clickRate:23461,
                    fileAdd:352,
                    shareCount:215
                },
                errModal:false,
                warningModal:false,
                errLoading:true,
                warningLoading:true,
                errTotal:0,
                warningTotal:0,
                errColumns: [
                    {
                        title: '交换时间',
                        key: 'currentSwapTime'
                    },
                    {
                        title: '任务编号',
                        key: 'taskNumber'
                    },
                    {
                        title: '任务名称',
                        key: 'taskName'
                    },
                    {
                        title: '委办局',
                        key: 'unit'
                    }
                ],
                warningColumns: [
                    {
                        title: '交换时间',
                        key: 'currentSwapTime'
                    },
                    {
                        title: '任务编号',
                        key: 'taskNumber'
                    },
                    {
                        title: '任务名称',
                        key: 'taskName'
                    },
                    {
                        title: '委办局',
                        key: 'unit'
                    }
                ],
                errDataList:[],
                errData:[],
                warningDataList:[],
                warningData:[]
            }
        },
        components: {
            infoCard
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
                /* loading */
               
            },
            change (status) {
                this.scroll = !this.scroll
            },
            model(el){
                if (el == 'err') {
                    this.errModal = true;
                    myAjax.get({
                        url: api.swapResultApi,   //请求url
                        success:(res)=>{  // 成功
                            setTimeout(() => {
                                this.errLoading = false;
                            }, 500);
                            this.errTotal = res.resultList.length;
                            this.dataProcess(el,res.resultList,5);
                        },
                        fail:()=>{     // 失败
                            console.log("error");
                        }
                    })
                }else if(el == 'warning'){
                    this.warningModal = true;
                    myAjax.get({
                        url: api.swapResultApi,   //请求url
                        success:(res)=>{  // 成功
                            setTimeout(() => {
                                this.warningLoading = false;
                            }, 500);
                            this.warningTotal = res.resultList.length;
                            this.dataProcess(el,res.resultList,5);
                        },
                        fail:()=>{     // 失败
                            console.log("error");
                        }
                    })
                }
            },
            dataProcess(el,array,size){
                /* 大数组按照4个步长拆分成多个小数组 */
                if (el == 'err') {
                    const length = array.length
                    if (!length || !size || size < 1) {
                        this.errDataList = [];
                    }
                    let index = 0 //用来表示切割元素的范围start
                    let resIndex = 0 //用来递增表示输出数组的下标
                    let result = new Array(Math.ceil(length / size))
                    while (index < length) {
                      result[resIndex++] = array.slice(index, (index += size))
                    }
                    this.errDataList = result;
                    // 给表格初始化第一页
                    this.errData = this.errDataList[0];
                }else if(el == "warning"){
                    const length = array.length
                    if (!length || !size || size < 1) {
                        this.warningDataList = [];
                    }
                    let index = 0 //用来表示切割元素的范围start
                    let resIndex = 0 //用来递增表示输出数组的下标
                    let result = new Array(Math.ceil(length / size))
                    while (index < length) {
                      result[resIndex++] = array.slice(index, (index += size))
                    }
                    this.warningDataList = result;
                    // 给表格初始化第一页
                    this.warningData = this.warningDataList[0];
                }else if(el == "carousel"){
                    /* 大数组按照4个步长拆分成多个小数组 */
                    const length = array.length
                    if (!length || !size || size < 1) {
                      this.swapInfoList = [];
                    }
                    let index = 0 //用来表示切割元素的范围start
                    let resIndex = 0 //用来递增表示输出数组的下标
                    let result = new Array(Math.ceil(length / size))
                    while (index < length) {
                      result[resIndex++] = array.slice(index, (index += size))
                    }
                    this.swapInfoList = result;
                }
            },
            pageChange(pageNum,el){
                console.log(current)
                this.warningData = this.warningDataList[pageNum-1]
            }
        }
    }
</script>
<style scoped>
    @import '../../assets/css/style.css';
    hr{
        position: absolute;
        width:100%;
        border: 1.5px dashed #7E899D;
        top:48%;
    }
    .card-bottom{
        margin-top: 200px;
    }
    .top{
        height:355px;
    }
    .bottom{
        height:355px;
    }
    .top .line-point-empty{
        position:absolute;
        top:46.5%;
        left:45%;
        width:20px;
        height: 20px;
        border-style:solid;
        border-radius:15px;
        border-color: #19be6b;
    }
    .line-point-solid{
        margin-top:3px;
        margin-left: 3px;
        width:8px;
        height: 8px;
        border-radius:8px;
        background-color: #19be6b;
    }
    .bottom .line-point-empty{
        position:absolute;
        top:46.5%;
        left:45%;
        width:20px;
        height: 20px;
        border-style:solid;
        border-radius:15px;
        border-color: #19be6b;
    }
</style>