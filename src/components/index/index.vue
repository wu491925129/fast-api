<template>
    <div id="jhsy" style="background:#fff">
        <!-- <h2><span class="title">交换汇总&nbsp;&nbsp;</span></h2> -->
        <Row :gutter="5" class="p-b-20">
            <Col span="24">
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('personAdd')">
                    <infoCard
                        id-name="person-add"
                        :end-val="countList.personAdd"
                        iconType="md-person-add"
                        color="#2d8cf0"
                        :textSize="itemInfo.textSize"
                        :intro-text="$t('indexPage').personAdd"
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('clickRate')">
                    <infoCard
                        id-name="click-rate"
                        :end-val="countList.clickRate"
                        iconType="md-locate"
                        color="#64d572"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").clickRate'
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('fileAdd')">
                    <infoCard
                        id-name="file-add"
                        :end-val="countList.fileAdd"
                        iconType="md-attach"
                        color="#fd7e14"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").fileAdd'
                    ></infoCard>
                </Col>
                <Col :xs="24" :sm="12" :md="6" class="p-r-5" @click.native="model('shareCount')">
                    <infoCard
                        id-name="share-count"
                        :end-val="countList.shareCount"
                        iconType="md-share"
                        color="rgb(237, 63, 20)"
                        :textSize="itemInfo.textSize"
                        :intro-text='$t("indexPage").shareCount'
                    ></infoCard>
                </Col>
            </Col>
        </Row>
        <Modal
            :title="tableTitle"
            v-model="dataModel"
            width="1000px"
            :styles="{top: '20px'}">
            <Table stripe :columns="dataColumns" :data="dataList" :loading="tableLoading" class="m-b-10"></Table>
            <Page :total="dataTotal" :page-size="5" current.sync="current" align="right" @on-change="pageChange"></Page>
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
                countList:{},
                indexPageData:{},
                dataModel:false,
                tableTitle:'',
                tableLoading:true,
                dataTotal:0,
                dataColumns: [],
                dataList:[],
                tempDataList:[]
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
                myAjax.get({
                    url: api.indexPageApi,   //请求url
                    async:false,
                    success:(res)=>{  // 成功
                        if (res.code == 200) {
                            this.indexPageData = res.data
                            this.countList = res.data.count;
                        }
                    },
                    fail:(err)=>{     // 失败
                        console.log(err);
                    }
                });
            },
            change (status) {
                this.scroll = !this.scroll
            },
            model(el){
                this.tableTitle = this.$t('indexPage')[el];
                this.dataColumns = this.indexPageData[el+"Colums"];
                this.dataModel = true;
                switch(el){
                    case 'personAdd':
                        this.getTableData(api.personAddApi);
                        break;
                    case 'clickRate':
                        this.getTableData(api.clickRateApi);
                        break;
                    case 'fileAdd':
                        this.getTableData(api.fileAddApi);
                        break;
                    case 'shareCount':
                        this.getTableData(api.shareCountApi);
                        break;
                }
            },
            getTableData(url){
                this.dataList = [];
                myAjax.get({
                    url: url,   //请求url
                    async:false,
                    success:(res)=>{  // 成功
                        if (res.code == 200) {
                            this.dataProcess(res.data,5);
                            this.dataTotal = res.data.length;
                        }else{

                        }  
                    },
                    fail:(err)=>{     // 失败
                        console.log(err);
                    }
                });
                this.tableLoading = false;
            },
            dataProcess(array,size){
                /* 大数组按照5个步长拆分成多个小数组 */
                const length = array.length
                if (!length || !size || size < 1) {
                    this.dataList = [];
                }
                let index = 0 //用来表示切割元素的范围start
                let resIndex = 0 //用来递增表示输出数组的下标
                let result = new Array(Math.ceil(length / size))
                while (index < length) {
                  result[resIndex++] = array.slice(index, (index += size))
                }
                this.tempDataList = result;
                // 给表格初始化第一页
                this.dataList = this.tempDataList[0];
            },
            pageChange(pageNum){
                this.dataList = this.tempDataList[pageNum-1]
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