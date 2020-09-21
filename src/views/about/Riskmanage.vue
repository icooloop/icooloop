<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="ma-riskmanage">
                <section class="pdabout" >
                    <div class="wp">
                        <div class="atitle">风险管理架构</div>
                        <div class="text-c wow jackInTheBox" data-wow-duration="1s" data-wow-delay="0.3s"><img src="@/assets/images/about/riskmanage/org.png?v=f43ba1c" alt=""></div>
                    </div>
                </section>
                <section class="bgabout3 pdabout" >
                    <div class="wp">
                        <div class="atitle">风控策略</div>
                        <div class="text-c wow zoomIn" data-wow-duration="1s" data-wow-delay="0.3s"><img src="@/assets/images/about/riskmanage/strategy.png?v=d36e3bb" alt=""></div>
                        <ul class="strategylist clearfix mt-50">
                            <li class="wow bounceInLeft" data-wow-duration="1s" data-wow-delay="0.6s">
                                <i class="icon-font icon-s6"></i>
                                <h3>专业团队</h3>
                                <p>公司组建了涵盖传统金融与互金大数据领域的资深专业团队，建立多层次风控审核制度，严守项目风控底线。</p>
                            </li>
                            <li class="wow bounceInRight" data-wow-duration="1s" data-wow-delay="0.2s">
                                <i class="icon-font icon-s19"></i>
                                <h3>多维度评估</h3>
                                <p>从多维度对合作机构股东背景、经营财务、增信措施等方面进行多维度综合评估，采用评审专家表决制， 集体审议，独立表决。
                                </p>
                            </li>
                            <li class="wow bounceInLeft" data-wow-duration="1s" data-wow-delay="0.4s">
                                <i class="icon-font icon-s10"></i>
                                <h3>小额分散</h3>
                                <p>遵循小额分散原则，对借款人信用情况、生产情况、财务情况、资金用途、还款能力等方面进行综合评估，确保推荐资产优质合规。</p>
                            </li>
                            <li class="wow bounceInRight" data-wow-duration="1s" data-wow-delay="0.8s">
                                <i class="icon-font icon-s18"></i>
                                <h3>贷后跟踪</h3>
                                <p>贷后管理团队采用非现场检查+现场抽查形式对未到期项目持续跟踪管理，做好定期报告、及时披露、兑付提醒、突发状况预警等工作。</p>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="pdabout" >
                    <div class="wp">
                        <div class="atitle">风险分级</div>
                        <ul class="levellist clearfix">
                            <li class="wow bounceInRight" data-wow-duration="1s" data-wow-delay="0.4s">
                                <h2>资产项目风险分级</h2>
                                <p>亿钱贷平台对每一个发标资产根据其资产保障措施、合作机构资信、借款人资信及其他风险补偿指标，核定借款项目综合风险分级，风险分级结果分为WR1（保守型）、WR2（稳健型）、WR3（平衡型）、WR4（积极型）四种类型，匹配至不同风险偏好的出借人。</p>
                            </li>
                            <li class="wow bounceInLeft" data-wow-duration="1s" data-wow-delay="0.4s">
                                <h2>出借人风险分级</h2>
                                <p>亿钱贷平台根据风险评估结果对出借人实行分级管理，并设置可动态调整的出借限额和出借标的限制，合格出借人需要具备相应风险识别能力和风险承担能力。风险分级结果分为保守型、稳健型、平衡型、积极型四种类型，匹配至不同借款项目风险等级。</p>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="pdabout bgabout3" >
                    <div class="wp">
                        <div class="atitle">技术保障</div>
                        <ul class="skilllist clearfix">
                            <li class="wow zoomIn" data-wow-duration="1s" data-wow-delay="0.6s">
                                <i class="icon-font icon-s14"></i>
                                <h3>多重防火墙加固隔离</h3>
                                <p>采用DDOS、WAF、硬件三重防火墙隔离病毒，全方位抵御网络非法入侵。</p>
                            </li>
                            <li class="wow zoomIn" data-wow-duration="1s" data-wow-delay="0.2s">
                                <i class="icon-font icon-s13"></i>
                                <h3>SSL证书加密</h3>
                                <p>通过SSL证书认证加密保证用户数据的安全传输，并采用256位数据加密技术，严防窃取账户信息，确保业务数据安全性及信息敏感性。
                                </p>
                            </li>
                            <li class="wow zoomIn" data-wow-duration="1s" data-wow-delay="0.4s">
                                <i class="icon-font icon-s12"></i>
                                <h3>云端数据备份</h3>
                                <p>采用阿里云服务器分布式计算系统强大的容灾机制，24小时不间断数据备份，确保数据零丢失。
                                </p>
                            </li>
                            <li class="wow zoomIn" data-wow-duration="1s" data-wow-delay="0.8s">
                                <i class="icon-font icon-s16"></i>
                                <h3>信息系统三级保护</h3>
                                <p>采用国家信息安全等级三级认证标准及各种合适的物理、电子和管理方面的措施来保护数据，以实现对数据安全的严密保护。</p>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="pdabout" >
                    <div class="wp">
                        <div class="atitle">法律支持</div>
                        <ul class="lawlist clearfix">
                            <li class="wow rotateInDownLeft" data-wow-duration="1s" data-wow-delay="0.2s">
                                <i class="icon-font icon-s2"></i>
                                <p>与国内知名的律师事务所达成长期战略合作伙伴关系，华商律所担任平台常年法务顾问，为平台及用户提供专业规范的信息服务和权威的法律依据与保障。
                                </p>
                            </li>
                            <li class="wow rotateInDownRight" data-wow-duration="1s" data-wow-delay="0.2s">
                                <i class="icon-font icon-s5"></i>
                                <p>公司组建了法律服务部门，对行业合规要求与风险防范进行全方位梳理把关，确保平台运营合法合规。
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
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
import { WOW } from 'wowjs'
import animate from 'animate.css'

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
            sideMenus:[
                {name:'风险控制',link:'/spa/about/riskmanage',onClass:true},
				{name:'银行存管',link:'/spa/about/deposit'}
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/riskmanage',
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
.ma-riskmanage *{box-sizing:content-box}
.ma-riskmanage .strategylist{width:1150px; text-align: center;margin-bottom:70px;margin-left:auto;margin-right:auto;}
.ma-riskmanage .strategylist li{width:210px; float:left; padding:40px 30px; margin:0 20px 0 0; background: #fff;border:1px solid #c9d4e4;box-shadow:0 0 5px#c9d4e4;border-radius:10px;} 
.ma-riskmanage .strategylist li:last-child{margin:0;}
.ma-riskmanage .strategylist i{margin:0 0 30px; color:#5781c7; font-size:60px;}
.ma-riskmanage .strategylist h3{font-weight: bold; margin:0 0 20px; font-size:18px; color:#333;}
.ma-riskmanage .strategylist p{color:#666; text-align: left; line-height: 2;}
.ma-riskmanage .levellist{padding:0 20px;}
.ma-riskmanage .levellist li{float:left;width:450px;height:190px;padding:304px 50px 0;margin:0 15px;background:url(./../../assets/images/about/riskmanage/level1.png) no-repeat;}
.ma-riskmanage .levellist li+li{background:url(./../../assets/images/about/riskmanage/level2.png) no-repeat;}
.ma-riskmanage .levellist li h2{font-size:18px;line-height:20px;padding-bottom:10px;}
.ma-riskmanage .levellist li p{line-height:24px;padding-bottom:20px;}
.ma-riskmanage .skilllist{background:#fff;border-radius:10px;padding:40px 60px;}
.ma-riskmanage .skilllist li{width:220px;text-align:left;float:left;text-align:center;margin:0 25px;}
.ma-riskmanage .skilllist li .icon-font{font-size:52px;color:#1c56b4;}
.ma-riskmanage .skilllist li h3{font-size: 18px;color: #666;line-height: 30px;margin-top: 15px;margin-bottom: 15px;font-weight: bold}
.ma-riskmanage .skilllist li p{font-size: 14px;color: #666;line-height: 24px;text-align:left;}
.ma-riskmanage .lawlist li{float:left;width:420px;height:290px;padding:170px 64px 0;margin:0 25px;border:1px solid #deefff;border-radius:15px;background:url(./../../assets/images/about/riskmanage/law1.png) no-repeat top center;text-align:center;box-shadow:0 0 6px 2px #deefff;}
.ma-riskmanage .lawlist li+li{background:url(./../../assets/images/about/riskmanage/law2.png) no-repeat top center;}
.ma-riskmanage .lawlist li .icon-font{font-size:64px; color:#8f8c84;display:inline-block;background:#fff;border-radius:130px;width:130px;line-height:130px;height:130px;}
.ma-riskmanage .lawlist li p{text-align:left;font-size: 16px;line-height:30px;padding-top:15px;color:#666;}
</style>