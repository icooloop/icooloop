<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>

            <section class="ma-project ma-project1">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">微农贷简介</div>
                        <div class="desc">微农贷主要服务于农业全产业链，在产、供、销环节中的各农企、农户等优质涉农新型经营主体，为缓解三农领域资金支持不足的现况而提供的资金信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有涉农业务的助贷机构进行业务合作，助贷机构为资产推荐方，将符合我司标准的客户推荐到我司平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由我司平台再次进行筛选、甄别，通过我司审查的优质资产将在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer1">
                        <div class="atitle">借款客户</div>
                        <div class="title2">客户背景</div>
                        <ul class="bglist1 clearfix">
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.1s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc12.png?v=97ff0bc" alt=""></div>
                                <p>专业种植大户、家庭承包农场</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc13.png?v=914b9b2" alt=""></div>
                                <p>农民合作社等新型<br>农业经营主体</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.7s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc11.png?v=472cf14" alt=""></div>
                                <p>各地农业加工生产型龙头企业</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="1s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc14.png?v=6d644f2" alt=""></div>
                                <p>三农贸易经营商</p></li>
                        </ul>
                        <div class="title2 mt-60">准入条件</div>
                        <ul class="condlist1 clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><p>种植、养殖类：<br>
                                    具有完全民事行为能力的中华人民共和国公民（不包括港澳台）；<br>
                                    种植、养殖达到一定规模且多年从事相关行业，对行业有一定的认知度；<br>
                                    拥有真实的贷款目的和稳定的收入来源，还款能力充足。</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s"><p>加工、贸易类：<br>
                                    企业运营时间长且稳定，整体财务状况良好；<br>
                                    企业及法人代表拥有良好的信用记录；<br>
                                    企业无相关不良诉讼或在执行案件。</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-use use1">
                        <div class="atitle">借款用途</div>
                        <div class="desc mt-20">包括但不限于</div>
                        <div class="uselist1 mt-20">
                            <img src="@/assets/images/about/project/use1.png?v=44d5ae8" alt="" class="use1 wow bounceInDown" data-wow-duration="1.5s" data-wow-delay="0s">
                            <img src="@/assets/images/about/project/use2.png?v=7ba18b8" alt="" class="use2 wow bounceInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                            <img src="@/assets/images/about/project/use3.png?v=a815a8d" alt="" class="use3 wow bounceInDown" data-wow-duration="1.5s" data-wow-delay="0.4s">
                            <img src="@/assets/images/about/project/use4.png?v=21501fd" alt="" class="use4 wow bounceInDown" data-wow-duration="1.5s" data-wow-delay="0.6s">
                            <img src="@/assets/images/about/project/use5.png?v=4862506" alt="" class="use5 wow bounceInDown" data-wow-duration="1.5s" data-wow-delay="0.8s">
                        </div>
                        <div class="desc mt-20">等农业生产经营与农产品贸易流通场景</div>
                    </div>
                    <div class="ma-project-standard standard1">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><div class="icon"><img src="@/assets/images/about/project/icons11.png?v=f3062c7" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-24个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s"><div class="icon"><img src="@/assets/images/about/project/icons12.png?v=4796596" alt=""></div>
                                <h2>还款方式</h2>
                                <p>先息后本，允许借款人提前全额还款</p></li>
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
import bannerUrl1 from '@/assets/images/about/project/logo_sjjr.png'

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
                { name:"盛进小贷",newsUrl:"http://www.sjfinance.com/",bannerUrl:bannerUrl1,
                    abstractContent:"盛进小贷加入深圳市小额贷款行业协会，且为小额贷款短期定向融资工具试点单位。企业在深圳开设多个分行，并积极拓展全国市场。公司2017年总放款金额超过54000万元，较2016年上升118%。合作方智通担保为专注于专业市场及农产品贸易方面的专业担保公司。公司专注农产品贸易融资7年，拥有丰富的农产品资产资源，资源布局多个一、二级大型农批市场。"}
			],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1',onClass:true},
                {name:'企链贷',link:'/spa/about/project2'},
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
        new WOW().init();
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
@import "~@/assets/style/about2.less";
</style>