<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <section class="ma-project ma-project4">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">乐保贷简介</div>
                        <div class="desc">该项目主要针对群体为具有良好信用记录的个人与企业。在该群体向第三方机构提供不动产作为抵押且获机构对应的增信（包括但不限于担保函、保函或借款保证保险）支持的基础上所提供的信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有不动产抵押业务的第三方金融机构（类金融机构）合作，由其推荐借款客户到亿钱贷平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-assets assets4">
                        <div class="atitle">资产描述</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/assets41.png" alt=""></div>
                                <h2>资产来源丰富</h2>
                                <p>甄选北京等10座中心级城市进行不动产展业</p></li>
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <div class="icon"><img src="@/assets/images/about/project/assets42.png" alt=""></div>
                                <h2>资产产权明晰</h2>
                                <p>严筛司法、被执行等负面瑕疵记录</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <div class="icon"><img src="@/assets/images/about/project/assets43.png" alt=""></div>
                                <h2>评估价值客观</h2>
                                <p>线上线下多维度综合评估资产域值</p></li>
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.8s">
                                <div class="icon"><img src="@/assets/images/about/project/assets44.png" alt=""></div>
                                <h2>抵押流程完备</h2>
                                <p>区域团队协同机构实地办理产权登记</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer4">
                        <div class="atitle atitle2">借款客户</div>
                        <div class="title2 mt-60">准入条件</div>
                        <ul class="condlist4 clearfix">
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <p>个人：具有持续稳定的收入来源，具备按期偿还贷款的能力；借款人具有良好的信用记录，未命中第三方征信查询黑名单。</p></li>
                            <li class="wow rollIn" data-wow-duration="1.5s" data-wow-delay="0.5s">
                                <p>企业：企业、实际控制人及其法定代表人信用良好，未命中第三方数据黑名单。企业经营状态为正常。</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-standard standard4">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/icons41.png?v=dc8ef3d" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-12个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <div class="icon"><img src="@/assets/images/about/project/icons42.png?v=243f70a" alt=""></div>
                                <h2>还款方式</h2>
                                <p>先息后本，等额本息</p></li>
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
import bannerUrl1 from '@/assets/images/about/project/logo_fdcx.png'
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
              {name:"富德产险",newsUrl:"http://www.fundins.com/",bannerUrl:bannerUrl1,abstractContent:"富德产险是一家全国性财产保险公司，控股股东富德生命人寿保险股份有限公司（简称“富德生命人寿”）是一家全国性专业寿险公司，拥有35家分公司、1000多个分支机构和服务网点，超过17万管理和销售人员，注册资本金117.52亿元，总资产近4500亿元，是国内资本实力较强的寿险公司之一。"}
            ],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1'},
                {name:'企链贷',link:'/spa/about/project2'},
                {name:'微花贷',link:'/spa/about/project3'},
                {name:'乐保贷',link:'/spa/about/project4',onClass:true},
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