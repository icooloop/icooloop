<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <section class="ma-project ma-project5">
                <div class="wp container">
                    <div class="ma-project-intro">
                        <div class="atitle">优车贷简介</div>
                        <div class="desc">优车贷主要针对企业或个人名下拥有合法车辆的车主。提供名下车辆作为抵押物，依据车辆资产价值，为其快速取得资金的信息撮合服务。</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <i class="icon icon1"></i><p>选择与有车贷业务的助贷机构合作，由助贷机构推荐借款客户到亿钱贷平台；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                <i class="icon icon2"></i><p>由平台进行甄别、筛选，然后选择资质优秀的客户在平台发布信息；</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                <i class="icon icon3"></i><p>平台对出借人、借款人提供信息撮合服务；</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-customer customer5">
                        <div class="atitle">借款客户</div>
                        <ul class="bglist5 clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc51.png?v=cfd0003" alt=""></div>
                                <p>车辆在个人或公司名下<br>且经过第三方合理评估、报价</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.5s">
                                <div class="icon"><img src="@/assets/images/about/project/iconc52.png?v=2af27cf" alt=""></div>
                                <p>有稳定收入来源的工薪、<br>自雇人士和企业</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-zhudai zhidai5">
                        <div class="atitle">助贷机构准入条件</div>
                        <ul class="condlist5 clearfix">
                            <li class="item1 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.1s"><p class="mt-25">合作机构持续运营多年，<br>经营状况良好；</p></li>
                            <li class="item2 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.3s"><p class="mt-25">有建立完善的风控体系<br>和贷后管理工作流程；</p></li>
                            <li class="item3 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.5s"><p class="mt-25">市场开拓能力强，<br>资产质量较为优秀</p></li>
                            <li class="item4 wow bounceIn" data-wow-duration="1.5s" data-wow-delay="0.7s"><p class="mt-25">车辆相关业务发展良好，<br>未出现重大不良情况</p></li>
                        </ul>
                    </div>
                    <div class="ma-project-standard standard5">
                        <div class="atitle atitle2">项目标准</div>
                        <ul class="list clearfix">
                            <li class="wow bounceInLeft" data-wow-duration="1.5s" data-wow-delay="0.2s"><div class="icon"><img src="@/assets/images/about/project/icons51.png?v=068cf7d" alt=""></div>
                                <h2>借款期限</h2>
                                <p>1个月-24个月</p></li>
                            <li class="wow bounceInRight" data-wow-duration="1.5s" data-wow-delay="0.4s"><div class="icon"><img src="@/assets/images/about/project/icons52.png?v=6a3a63c" alt=""></div>
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
import bannerUrl1 from '@/assets/images/about/project/logo_ryzp.png'
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
              {name:"誉耀租赁",newsUrl:"http://51shyuyao.com/",bannerUrl:bannerUrl1,abstractContent:"公司以汽车金融为主入口，致力于打造汽车全产业链的综合性服务平台。实际控制人系知名P2P车贷平台“钱吧”创始人，平台是目前山东地区业绩和风控最好的车贷平台之一，在全国车贷行业排名前四，集团综合实力与盈利能力较强。截至2018年10月，平台累计成交额超过38亿。"}
            ],
            sideMenus:[
                {name:'微农贷',link:'/spa/about/project1'},
                {name:'企链贷',link:'/spa/about/project2'},
                {name:'微花贷',link:'/spa/about/project3'},
                {name:'乐保贷',link:'/spa/about/project4'},
                {name:'优车贷',link:'/spa/about/project5',onClass:true},
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