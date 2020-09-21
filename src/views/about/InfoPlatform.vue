<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content">
                <section class="pdabout bginfo">
                    <div class="atitle atitle2">平台信息</div>
                    <div class="infodiv">	
                        <table class="table infotable mt-20">
                                <tbody><tr>
                                    <td width="240">全称及简称</td>
                                    <td>深圳市亿钱贷电子商务有限公司（简称“亿钱贷”）</td>
                                </tr>
                                <tr>
                                    <td>统一社会信用代码</td>
                                    <td>914403003059821133</td>
                                </tr>
                                <tr>
                                    <td>注册资本</td>
                                    <td>2000万</td>
                                </tr>
                                <tr>
                                    <td>实缴资本</td>
                                    <td>2000万</td>
                                </tr>
                                <tr>
                                    <td>注册地址</td>
                                    <td>深圳市福田区福田街道福华三路与金田路交汇处卓越世纪中心4号楼21层02</td>
                                </tr>
                                <tr>
                                    <td>实际经营地址</td>
                                    <td>
                                        <p>深圳市福田区福保街道菩提路228号 益田花园 D区28栋二楼</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>成立时间</td>
                                    <td>2014年4月29日</td>
                                </tr>
                                <tr>
                                    <td>公司经营期限</td>
                                    <td>永续经营</td>
                                </tr>
                                <tr>
                                    <td>公司经营状态</td>
                                    <td>开业（存续）</td>
                                </tr>
                                <tr>
                                    <td>法定代表人</td>
                                    <td>周世平</td>
                                </tr>
                                <tr>
                                    <td>实际控制人</td>
                                    <td>周世平</td>
                                </tr>
                                <tr>
                                    <td>经营范围</td>
                                    <td>经营电子商务；数据库服务；数据库管理；计算机系统分析；提供计算机技术服务；出借兴办实业；出借管理；出借咨询；出借顾问；国内贸易；经营进出口业务；贸易经济代理；理财咨询；对未上市企业进行股权出借；开展股权出借和企业上市咨询业务；互联网信息服务。</td>
                                </tr>
                                <tr>
                                    <td>资金存管情况</td>
                                    <td>银行名称：四川新网银行股份有限公司<br>
                                        签约时间：2018年10月<br>
                                        全量业务上线时间：2018年12月</td>
                                </tr>
                                <tr>
                                    <td>公司官方网址</td>
                                    <td>www.yiqiandai.com（ip地址：121.29.18.119、116.211.172.173、120.78.33.86）</td>
                                </tr>
                                <tr>
                                    <td>ICP备案号</td>
                                    <td>粤ICP备14041671号-1</td>
                                </tr>
                                <tr>
                                    <td>分支机构</td>
                                    <td>无</td>
                                </tr>
                                <tr>
                                    <td>电信业务经营许可信息</td>
                                    <td>经营许可证申请中</td>
                                </tr>
                                <tr>
                                    <td>信息系统安全等级保护备案证明</td>
                                    <td>信息安全等级保护测评，已通过第三级测评</td>
                                </tr>
                                <tr>
                                    <td>公安备案号</td>
                                    <td>备案号申请中</td>
                                </tr>
                                <tr>
                                    <td>备案登记地方金融监管部门</td>
                                    <td>福田区地方金融风险防控工作领导小组办公室</td>
                                </tr>
                                <tr>
                                    <td>备案登记编号</td>
                                    <td>准备备案中</td>
                                </tr>
                                <tr>
                                <td>法人签名</td>
                                    <td><img alt="" src="/public/images/about/info/bossname.png?v=fa2ba90"></td>
                                </tr>
                            </tbody></table>
                        </div>
                </section>
                <section class="pdabout wp" id="gdxx">
                    <div class="atitle">股东信息
                        <h6>行业经验丰富，资源深厚的股东背景</h6>
                    </div>
                    <div class="gdlogo"><img src="@/assets/images/about/info/logo.png?v=ef02b50" alt=""></div>
                    <div class="text-c mt-30"><img src="@/assets/images/about/info/gdxx.png?v=e5a7b0b" alt=""></div>
                    <ul class="gdinfos">
                        <li>
                            <div class="logo"><img src="@/assets/images/about/info/logo_sn.png?v=78cb445"></div>
                            <p class="textIndent2">深南金科股份有限公司成立于2004年，于2010年在深交所中小板上市（股票简称：深南股份），股票代码002417。公司2015年以前主营业务为研发、生产、销售移动通信设备，2015年以后以产业+金融为战略布局，下设“产业金融”、“资产管理”、“互联网金融”三大板块金融业务，主要产业有汽车金融、供应链金融、网络借贷、股权及债权出借等；目前公司已在深圳、南通、北京、上海、杭州、平潭等多个核心城市组建团队并设立了子公司，形成了转型升级的初步格局。</p>
                        </li>
                        <li>
                            <div class="logo"><img src="@/assets/images/about/info/logo_hl.png?v=5822af1"></div>
                            <p class="textIndent2">红岭创投为红岭创投电子商务股份有限公司旗下的互联网金融服务平台，于2009年3月正式上线运营。作为国内成立较早的互联网金融服务平台，红岭创投致力建立具有特色的互联网金融交易场所，为客户带来全新的投融资服务体验。时至今日，红岭创投四十余家省级分公司布局全国，以其诚信、透明、自律、创新的特征赢得了良好的用户口碑，是国内行业规模较大、较具影响力的品牌之一。</p>
                        </li>
                    </ul>
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
        Signname,
    },
    data() {
        return {
            sideMenus:[
                {name:'公司简介',link:'/spa/about/info/intro'},
                {name:'平台信息',link:'/spa/about/info/platform',onClass:true},
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
    mounted(){
        if(this.$route.hash) this.goAnchor(this.$route.hash)
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {
        goAnchor(selector) {
            let anchor = this.$el.querySelector(selector)
            document.documentElement.scrollTop = anchor.offsetTop
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-info .bginfo{background:url(./../../assets/images/about/info/infobg.jpg) no-repeat top center;}
.ma-info .infodiv{background:#fff;padding:20px;width:1160px;margin:0 auto;border-radius:10px;}
.ma-info .infotable{width:1120px;margin-left:auto;margin-right:auto;}
.ma-info .infotable td{padding:8px 25px;line-height:26px;border:1px solid #efefef;font-size:16px;}
.ma-info .infotable tr td:nth-child(1){color:#888;}
.ma-info .infotable tr:nth-child(2n){background:#f7fbff;}

.ma-info .gdlogo{text-align:center;line-height:300px;border-radius:10px;background:linear-gradient(#f5f5f5,#fefefe);}
.ma-info .gdinfos{padding:80px 130px 0;}
.ma-info .gdinfos li{position:relative;background:#fff;margin-bottom:30px;height:185px;padding:30px 45px 30px 280px;border:1px solid #eee;box-shadow:0 0 5px #eee;}
.ma-info .gdinfos li .logo{position:absolute;left:0;top:0;line-height:180px;width:240px;text-align:center;}
.ma-info .gdinfos li p{line-height:25px;color:#666;text-indent:2em;} 
</style>
