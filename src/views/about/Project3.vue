<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <section class="ma-project ma-project3">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">微花贷简介</div>
                        <div class="desc">微花贷主要针对具有良好信用记录和稳定收入来源的客户群体，在有特定的消费场景和明确借款用途下，为其提供小额资金分期的信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有分期业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer3">
                        <div class="atitle">借款客户</div>
                        <ul class="bglist3 clearfix">
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc31.png?v=1184ab9" alt=""></div>
                                <p>本人主动申请且具有良好的信用记录和还款能力</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.5s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc32.png?v=9674d03" alt=""></div>
                                <p>借款用途合规、明确，借款人年龄符合我司要求</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.8s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc33.png?v=de0e591" alt=""></div>
                                <p>限制高风险行业和高风险地区，优化客户群体</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-zhudai zhidai3">
                        <div class="atitle">助贷机构准入条件</div>
                        <ul class="condlist3 clearfix">
                            <li class="item1 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.1s"><p class="mt-10">合作机构持续运营时间长，实缴资本和财务状况符合我司准入要求</p></li>
                            <li class="item2 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.3s"><p class="mt-10">拥有独立的风控体系，具有大数据风控审查能力并拥有完整的各项业务流程</p></li>
                            <li class="item3 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.5s"><p class="mt-10">助贷机构或助贷机构的产品在第三方评级优良</p></li>
                            <li class="item4 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.7s"><p class="mt-10">企业经营状况良好，底层资产优质、可靠</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-standard standard3">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><div class="icon"><img src="@/assets/images/about/project/icons31.png?v=d92f236" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-24个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s"><div class="icon"><img src="@/assets/images/about/project/icons32.png?v=db6450c" alt=""></div>
                                <h2>还款方式</h2>
                                <p>等额本息</p></li>
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
import bannerUrl1 from '@/assets/images/about/project/logo_qlkj.png'

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
              {name:"前隆科技",newsUrl:"http://www.mobanker.com/",bannerUrl:bannerUrl1,abstractContent:"2012年起源于国际金融中心上海的北外滩，是一家致力于推动消费和金融行业进入移动化、智能化的科技公司。华兴资本、唯品会、红杉资本、蓝湖资本等风投背景，累计注册用户数超过3000万，多场景线上获客，通过大数据风控系统为金融机构提供助贷支持。"}
            ],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1'},
                {name:'企链贷',link:'/spa/about/project2'},
                {name:'微花贷',link:'/spa/about/project3',onClass:true},
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
        new WOW().init();
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
@import "~@/assets/style/about2.less";
</style>