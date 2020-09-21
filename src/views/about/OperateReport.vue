<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="operate_report ma-operate-report">
                <div class="wp pdabout">
                    <div class="atitle">运营报告</div>
                    <ul class="yearlist clearfix mt-40">
                        <li v-for="year in yearList" :class="{on:year==currentYear}" @click="changeData(year)"><a href="javascript:;" year="year">{{year}}</a></li>
                    </ul>
                    <div class="reportlist mt-30">
                        <div class="bd cleafix">
                            <ul v-if="hasData">
                                <li v-for="item in dataList"><a target="_blank" :href="item.contentFileLink"><img :src="item.bannerUrl"></a></li>
                            </ul>
                            <div v-else><img class="record" src="@/assets/images/user/record.png"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>     
    <Signname></Signname>
    <Footer :pageInfo="pageInfo"></Footer> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import AboutMenu from '@/components/about/AboutMenu'
import Signname from '@/components/about/Signname'
import AboutSide from '@/components/about/AboutSide'
import {toJson} from  '@/utils/utils'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        AboutSide,
        Signname
    },
    data() {
        return {
            yearList:[],
            currentYear:new Date().getFullYear(),
            dataList:[],
            hasData:false,
            sideMenus:[
                {name:'平台数据',link:'/spa/about/operate/data'},
                {name:'运营报告',link:'/spa/about/operate/report',onClass:true},
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/operate',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {
        initData(){
            let _this=this;
            _this.$post('/article/report/ajList',{pageNo:1,'pageSize':100,qType:0,year:this.currentYear})
                .then(function (res) {
                    _this.dataList= toJson(res).data
                    _this.hasData= (toJson(res).count>0)
                })
        },
        changeData(year){
            this.currentYear=year
            this.initData()
        },
        initYears(){
            this.yearList=[];
            for (let i=this.currentYear;i>2014;i--){
                this.yearList.push(i);
            }
        }
    },
    mounted() {
        this.initYears()
        this.initData()
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-operate-report{padding-bottom:120px;}
.ma-operate-report .reportlist{position:relative;padding:0 50px;}
.ma-operate-report .reportlist .bd{text-align: center;display:flex;justify-content:center;}
.ma-operate-report .reportlist .bd li{display:inline-block;background:#f1f1f1;width:163px;height:206px;margin:40px 30px;box-shadow:0 0 6px rgba(0,0,0,.3);}
.ma-operate-report .reportlist .bd li img{width:100%;height:100%;}
.ma-operate-report .yearlist{text-align:center;font-size:24px;display:flex;justify-content:center;}
.ma-operate-report .yearlist li{display:inline-block;padding-bottom:22px;margin:0 5px;}
.ma-operate-report .yearlist li a{display:inline-block;width:151px;line-height:57px;height:57px;color:#8fc8ff;border-radius:57px;}
.ma-operate-report .yearlist li.on{background:url(./../../assets/images/about/operate/reporton.png) no-repeat center top;}
.ma-operate-report .yearlist li:hover a{background:#1889ff;}
.ma-operate-report .yearlist li.on a,.ma-operate-report .yearlist li:hover a{color:#fff;}
</style>