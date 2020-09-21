<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content">
                <section class="ma-info-intro">
                    <div class="text-c"><img src="@/assets/images/about/info/intro-logos.png" alt=""></div>
                    <p class="textIndent2">深圳市亿钱贷电子商务有限公司系深南金科股份有限公司旗下互联网金融平台，成立于2014年4月29日，实缴资本2000万元人民币。平台秉承合规运营，稳健发展的原则，致力于为供应链上下游企业、 新型农村经营主体、个人消费者、保险需求方等资金需求方和线上出借人之间构筑金融服务的桥梁，主打企链贷、微农贷、乐保贷、微花贷等产品，提升金融服务效率，配置优质金融资产。</p>
                    <p class="textIndent2">亿钱贷管理团队核心成员来自国内知名的传统金融机构和一线互金企业----工商银行、招商银行、交通银行、红岭创投、宜信等，既有传统金融的规范运营理念，又有金融科技的先进经验，在小微资产的获取和风控上，有着独到的理解和实践。技术团队自行开发的“神匣计划”项目深入农村普惠金融，对接农业大数据，为机构和个人出借者提供农村信贷资产。同时，该团队在区块链技术上也做了诸多尝试，并应用于供应链金融， 从技术手段上解决了供应链金融服务中心确权的效率问题，为供应链上下游提供更加高效的金融服务。</p>
                </section>
                <section class="ma-info-steps bgabout2 pdabout">
                    <div class="atitle">业务流程</div>
                    <div class="text-c"><img src="@/assets/images/about/info/intro-steps.png" alt=""></div>
                    <ul class="list clearfix mt-30">
                        <li><h2>获取资产</h2>
                            <p>合作机构推荐或合格<br>借款人直接申请；</p></li>
                        <li><h2>风险评估</h2>
                            <p>基于金融科技系统，<br>审核合作机构/借款人信用； </p></li>
                        <li><h2>信息撮合</h2>
                            <p>平台按照合规要求披<br>露相关借款信息； </p></li>
                        <li><h2>资金出借</h2>
                            <p>线上出借人自主判断风<br>险收益，选择相应标的</p></li>
                        <li><h2>还本付息</h2>
                            <p>平台监控借款人资金使用<br>运营情况及还款变化； </p></li>
                    </ul>
                    <div class="text-c"><img src="@/assets/images/about/info/intro-flow.png" alt=""></div>
                </section>
                <section class="pdabout">
                    <div class="atitle">发展历程</div>
                    <div class="text-c"><img src="@/assets/images/about/info/history.png" alt=""></div>
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
                {name:'公司简介',link:'/spa/about/info/intro',onClass:true},
                {name:'平台信息',link:'/spa/about/info/platform'},
                {name:'组织架构',link:'/spa/about/info/org'},
                {name:'管理团队',link:'/spa/about/info/team'},
                {name:'合作机构',link:'/spa/about/info/partner'},
                {name:'联系我们',link:'/spa/about/info/contact'},
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/info',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {

    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-info-intro{padding:80px 0;width:1000px;margin-left:auto;margin-right:auto;}
.ma-info-intro p{line-height:30px;color:#666;padding-top:30px;font-size: 16px;}
.ma-info-steps .list{width:988px;margin-left:auto;margin-right:auto;padding-bottom:100px;}
.ma-info-steps .list li{float:left;text-align:center;line-height:22px;width:20%;color:#666;}
.ma-info-steps .list h2{font-weight:700;line-height:22px;}   
</style>