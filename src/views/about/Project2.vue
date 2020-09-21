<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <section class="ma-project ma-project2">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">企链贷简介</div>
                        <div class="desc">企链贷主要针对供应链模式中核心企业、第三方物流企业、上下游小微企业与商户，为其在生产经营过程中的产品，原材料的采购、流通、销售等环节提供资金信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有供应链贷款业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer2">
                        <div class="atitle atitle2">借款客户</div>
                        <div class="title2">客户背景</div>
                        <ul class="bglist2 clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc21.png?v=7fe4867" alt=""></div>
                                <p>核心企业<br>上下游小微企业</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.5s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc22.png?v=d62b8f4" alt=""></div>
                                <p>知名品牌下游分销商<br>或上游供应商</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.8s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc20.png?v=b3b9896" alt=""></div>
                                <p>大型物流企业与运输企业<br>优质承运商</p></li>
                        </ul>
                        <div class="title2 mt-40">准入条件</div>
                        <ul class="condlist2 clearfix">
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.1s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc23.png?v=8284646" alt=""></div>
                                <p>从事合法经营活动，符合国家产业政策和发展规划且经营实体多年，发展稳定</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc24.png?v=cf9beef" alt=""></div>
                                <p>拥有良好的信用记录，无相关重大涉诉信息和失信行为</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.7s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc25.png?v=a46fb21" alt=""></div>
                                <p>企业法定代表人或实际控制人从事相关行业工作多年，对行业有较深的认识度</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="1s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc26.png?v=61391db" alt=""></div>
                                <p>有明确的借款用途和稳定的还款来源，符合我司对增信措施的要求</p></li>
                        </ul>
                        <div class="title2 mt-40">交易场景</div>
                        <div class="scene2 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.7s">
                            <img src="@/assets/images/about/project/iconc27.png?v=b6f384f" alt="" class="mr-30">
                            企业生产经营性借款，包括生产物料采买、设备维护、加工流通等企业日常经营与商贸类场景所需。</div>
                    </div>
                    <div class="ma-project-zhudai zhidai2">
                        <div class="atitle">助贷机构准入条件</div>
                        <ul class="condlist2 clearfix">
                            <li class="item1 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.1s"><p>合作机构持续运营时间长、实缴资本和财务状况符合我司准入要求</p></li>
                            <li class="item2 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.4s"><p>具有相关细分行业（如医药、工业品、食品、快消、物流等）的市场开发能力</p></li>
                            <li class="item3 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.7s"><p>创始人团队背景深厚，从事金融相关行业多年，高管团队发展稳定、可靠</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-standard standard2">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><div class="icon"><img src="@/assets/images/about/project/icons21.png?v=de70462" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-12个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s"><div class="icon"><img src="@/assets/images/about/project/icons22.png?v=cfec679" alt=""></div>
                                <h2>还款方式</h2>
                                <p>先息后本，等额本息，等额本金</p></li>
                        </ul>
                    </div>
                </div>
            </section>
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

import { WOW } from 'wowjs'
import animate from 'animate.css'
import Vue from 'vue'
import {Pagination} from 'ant-design-vue'
Vue.use(Pagination)
import bannerUrl1 from '@/assets/images/about/project/logo_shxd.png'
import bannerUrl2 from '@/assets/images/about/project/logo_wxjt.png'
import bannerUrl3 from '@/assets/images/about/project/logo_xkbl.png'

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
             orgList:[
                {name:"深晖小贷",newsUrl:"http://www.szshrx.com/",bannerUrl:bannerUrl1,abstractContent:"深圳本地深晖集团股东背景，是最早经深圳市政府金融办批准设立的小额贷款公司之一，全国首家开创信息化供应链融资业务模式的小贷公司。公司定位于“做小微企业的最佳融资合作伙伴”，重点发展“1+N”信息化供应链融资业务，已发展小微供应链客户逾1000家。"},
				//{name:"网信集团",newsUrl:"http://www.ncfgroup.com/",bannerUrl:bannerUrl2,abstractContent:"网信集团是一家综合金融科技服务集团，总部位于北京，服务辐射全国。依托先锋集团10多年来为中小企业提供投融资服务的经验积累与客户积淀，基于持续创新与不断升级的支付引擎、数据引擎与智能引擎三大支撑体系，服务资产管理、交易平台、财富管理三大业务系统，构建全面、高效、开放、智能、共享的金融科技生态系统，为用户提供“金融+科技+生活方式”全方位综合金融服务。"},
				{name:"鑫科保理",newsUrl:"http://www.to-iif.com/",bannerUrl:bannerUrl3,abstractContent:"深圳鑫科国际商业保理有限公司是由北大光华管理学院EMBA和北大汇丰商学院校友发起设立的国内规模最大的全国性专业商业保理公司之一。鑫科国际保理立足前海，背靠珠三角、沿海和内陆发达地区，面向粤港澳、海外，以供应链节点企业和金融机构为目标客户，专注于医疗、公用市政、物流、房地产、快消、电子等行业的保理业务。"}
            ],
            pageNo:1,
            pageSize:2,
            total:0,
            haspage:false,
            pageList:[],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1'},
                {name:'企链贷',link:'/spa/about/project2',onClass:true},
                {name:'微花贷',link:'/spa/about/project3'},
                {name:'乐保贷',link:'/spa/about/project4'},
                {name:'优车贷',link:'/spa/about/project5'},
                {name:'微企贷',link:'/spa/about/project6'}
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/project',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted() {
        this.total=this.orgList.length
        this.haspage=this.orgList.length>this.pageSize
        this.initData()
        new WOW().init()
    },
    methods: {
        initData(){
            setTimeout(()=>{
                if(this.pageNo==1){
                    this.pageList=this.orgList.slice(0,2)
                }else if(this.pageNo==2){
                    this.pageList=this.orgList.slice(2)
                }
            },10)
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
@import "~@/assets/style/about2.less";
</style>