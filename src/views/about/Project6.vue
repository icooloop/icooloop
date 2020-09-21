<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>

            <section class="ma-project ma-project6">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">微企贷简介</div>
                        <div class="desc">微企贷是针对具有稳定经营记录与收入来源的中、小、微企业，在有明确生产经营的借款用途下，为其提供小额借款的信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有中、小、微企业经营贷业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer6">
                        <div class="atitle atitle2">借款客户</div>
                        <div class="title2">客户背景</div>
                        <div class="bgdesc6"><img src="@/assets/images/about/project/iconc65.png" alt="" class="mr-20">各行业有稳定经营能力与收入来源的个体工商户与私营企业主等中、小、微客群。</div>
                        <div class="title2 mt-60">准入条件</div>
                        <ul class="condlist6 clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc62.png"></div>
                                <p>身份：具有完全民事行为能力的中华<br>人民共和国公民（不包括港澳台），<br>年龄在18-65周岁。</p>
                            </li>
                            <li class="wow bounceInDown cond2" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc63.png"></div>
                                <p>工作：企业法定代表人或实际<br>控制人、个体工商户户主等；</p>
                            </li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc64.png"></div>
                                <p>企业经营稳定，财务状况良好，<br>有稳定的还款来源且已真实<br>连续经营6个月以上；</p>
                            </li>
                        </ul>
                    </div>
                    <div class="ma-project-use use6">
                        <div class="atitle">借款用途</div>
                        <div class="uselist6 mt-30">
                            <h2>中小微企业经营性借款</h2>
                            <p>包括但不限于：经营材料采买、货物周转、售货支出等</p>
                        </div>
                    </div>
                    <div class="ma-project-zhudai zhidai6">
                        <div class="atitle">助贷机构准入条件</div>
                        <ul class="condlist6 clearfix">
                            <li class="item1 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.1s"><p class="mt-15">合作机构持续运营多年<br>经营状况良好</p></li>
                            <li class="item2 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.3s"><p class="mt-15">拥有完善的风控体系和业务流程<br>具有较强的抗风险能力</p></li>
                            <li class="item3 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.5s"><p class="mt-15">合作机构整体资产状况表现良好<br>未出现重大不良风险</p></li>
                            <li class="item4 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.7s"><p class="mt-15">企业内控制度完善<br>符合我司相关准入条件</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-standard standard6">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><div class="icon"><img src="@/assets/images/about/project/icons61.png" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-24个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s"><div class="icon"><img src="@/assets/images/about/project/icons62.png" alt=""></div>
                                <h2>还款方式</h2>
                                <p>等额本息，先息后本</p></li>
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
import bannerUrl1 from '@/assets/images/about/project/logo_zaxy.png'
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
                {name:"中安信业",newsUrl:"https://www.zac.cn/",bannerUrl:bannerUrl1,abstractContent:"深圳市中安信业创业投资有限公司成立于2003年10月，是中国小额信贷技术服务行业的领军企业。十几年来，公司通过其微贷技术服务协助银行等金融机构为小微企业主、个体商户及工薪阶层提供快速简便、免抵押、免担保的小额信贷服务。"}
            ],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1'},
                {name:'企链贷',link:'/spa/about/project2'},
                {name:'微花贷',link:'/spa/about/project3'},
                {name:'乐保贷',link:'/spa/about/project4'},
                {name:'优车贷',link:'/spa/about/project5'},
                {name:'微企贷',link:'/spa/about/project6',onClass:true}
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