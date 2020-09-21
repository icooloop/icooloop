<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content">
                <section class="ma-boss">
                    <div class="bd">
                        <h2>周世平</h2>
                        <h6>实际控制人，法定代表人，董事长</h6>
                        <p class="mt-20">20多年国内证券市场及上市公司价值研究经验，9年互联网金融领军企业管理经验，现任A股上市公司深南股份（证券代码002417）董事长、亿钱贷实际控制人，法定代表人，董事长, 兼任深圳市互联网金融协会副会长、深圳市福田区第七届人大代表等社会职务。“中国互联网金融行业领军人物”、“中国（深港）十大创新金融人物”、中国财经风云榜 “年度风云人物”等多项荣誉。</p>
                    </div>
                </section>
                <section class="ma-info-team">
                    <div class="team1 pdabout">
                        <div class="atitle">董事会成员</div>
                        <ul style="width: 790px" class="teamlist clearfix">
                            <li style="margin-right: 70px"><div class="headpic"><img src="@/assets/images/about/info/leader1.png"></div>
                                <div class="info">
                                    <h2>项旭</h2>
                                    <h4>董事</h4>
                                    <p class="textIndent2">毕业于安徽大学，专科学历，历任中国工商银行合肥市分行计划处副处长；深圳某大型上市公司财务委员会副主任、副总裁兼财务总监；深圳市新邦资产管理有限公司总经理、新邦证券（香港）中国区首席代表、红岭创投总裁等职务，超过30年银行与财务行业从业经历，长期从事金融、投资与财务工作。现任亿钱贷董事。</p>
                                </div>
                            </li>
                            <li><div class="headpic"><img src="@/assets/images/about/info/leader2.png"></div>
                                <div class="info">
                                    <h2>闫梓</h2>
                                    <h4>总经理，董事</h4>
                                    <p :class="{textIndent2:true,on:ifShow['first']}">毕业于武汉大学，本科学历，金融行业近20年从业经验，曾任职中科健（证券代码：000035）、A8音乐（证券代码：00800）、中国水饮料集团（证券代码：CWDK）等多家上市公司，历任公关部长，市场总监，董秘等职，曾参与丰原生化/金蝶集团等项目的增发工作，主导CWDK上市和HEK并购项目，具有系统的金融知识结构和较强的资本运作能力，善于将传统金融和互联网新金融嫁接融合，作为总经理主导国资系理财平台“e路同心”的发起和设立工作，经过一年的正式运营，把平台带入行业排名前20强（来自网贷之家的官方数据），荣获众多荣誉奖项，是p2p行业的标杆企业。现任亿钱贷总经理，董事，全面负责平台运营和资产开发等工作。</p>
                                    <div class="btndiv">
                                        <a href="javascript:;" class="btn-show" v-if="ifShow['first']" @click="showContent('first')">收起<i class="icon-font">&#xe67c;</i></a>
                                        <a href="javascript:;" class="btn-show" v-else @click="showContent('first')">展开<i class="icon-font">&#xe601;</i></a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="team2 bgabout2 pdabout">
                        <ul style="width: 980px" class="teamlist teamlist2 clearfix">
                            <li style="margin-right: 50px"><div class="headpic"><img src="@/assets/images/about/info/leader5.png"></div>
                                <div class="info">
                                    <h2>钟汉清</h2>
                                    <h4>风控总监</h4>
                                    <p :class="{textIndent2:true,on:ifShow['second']}">毕业于江苏理工大学“会计学”专业，本科学历，金融经济师，曾任职于中国工商银行、兴业银行、交通银行、红岭创投，历任信贷员、支行副行长、行长、分行公司业务部总经理、风险管理部总经理、信贷审批部总经理等职，33年传统银行业及互联网金融行业信贷岗位的履职，积累了丰富的信贷评审、风险管理经验，对金融市场、金融法律法规、金融风险合规管理等多方面有着深刻的研究，精于项目设计及风控体系建设，曾成功实操众多大型项目的合规风险审核工作。现任亿钱贷风控总监。</p>
                                    <div class="btndiv">
                                        <a href="javascript:;" class="btn-show" v-if="ifShow['second']" @click="showContent('second')">收起<i class="icon-font">&#xe67c;</i></a>
                                        <a href="javascript:;" class="btn-show" v-else @click="showContent('second')">展开<i class="icon-font">&#xe601;</i></a>
                                    </div>
                                </div>
                            </li>
                            <li style="margin-right: 50px"><div class="headpic"><img src="@/assets/images/about/info/leader6.png"></div>
                                <div class="info">
                                    <h2>杨金成</h2>
                                    <h4>运营总监</h4>
                                    <p :class="{textIndent2:true,on:ifShow['third']}">毕业于长沙理工大学，本科学历，12年互联网及互联网金融从业经验，先后任职IBM中国、阿里巴巴、宜信等知名企业，是互联网金融较早的一批从业者和管理者，对互联网技术及架构、新金融业务的形态、平台精细化运营、客户成长体系建设和项目的结构化设计具有较为丰富的经验，同时熟悉科技金融的风控体系建设，善于解读行业相关政策规章，能根据实际情况全方位制定平台运营管理的计划与决策，现任亿钱贷运营总监。</p>
                                    <div class="btndiv">
                                        <a href="javascript:;" class="btn-show" v-if="ifShow['third']" @click="showContent('third')">收起<i class="icon-font">&#xe67c;</i></a>
                                        <a href="javascript:;" class="btn-show" v-else @click="showContent('third')">展开<i class="icon-font">&#xe601;</i></a>
                                    </div>
                                </div>
                            </li>
                            <li><div class="headpic"><img src="@/assets/images/about/info/leader7.png"></div>
                                <div class="info">
                                    <h2>黄佳兴</h2>
                                    <h4>技术总监</h4>
                                    <p class="textIndent2">毕业于湖北大学计算机应用技术专业，7年互联网及互联网金融从业经验，曾任职多家知名互联网公司从事软件设计开发、数据管理维护及团队管理工作，并带领团队完成多个关键性系统设计开发工作，对互联网技术及架构、新金融系统建设及项目管理有着丰富的经验，现任亿钱贷技术总监。</p>
                                </div>
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
            ifShow:{first:false,second:false,third:false,fourth:false},
            sideMenus:[
                {name:'公司简介',link:'/spa/about/info/intro'},
                {name:'平台信息',link:'/spa/about/info/platform'},
                {name:'组织架构',link:'/spa/about/info/org'},
                {name:'管理团队',link:'/spa/about/info/team',onClass:true},
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
        showContent(i){
            this.ifShow[i]=!this.ifShow[i]
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-boss{background:url(./../../assets/images/about/info/boss.jpg) no-repeat top center;height:542px;position:relative;z-index:10;}
.ma-boss .bd{position:absolute;left:50%;margin-left:20px;width:530px;top:150px;color:#fff;}
.ma-boss h2{font-size:26px;line-height:30px;padding-bottom:10px;}
.ma-boss p{font-size:14px;line-height:26px;}

.ma-info-team .teamlist{margin-left:auto;margin-right:auto;width:1120px;}
.ma-info-team .teamlist li{float:left;width:320px;padding-bottom:328px;position:relative;height:225px;box-sizing:content-box}
.ma-info-team .teamlist li+li{margin-left:60px;}
.ma-info-team .teamlist li .info{position:absolute;left:0;top:225px;width:320px;background:#fff;padding:20px 25px;z-index:1;min-height:350px;}
.ma-info-team .teamlist li .headpic{text-align:center;padding-bottom:30px;transition:all 1s;}
.ma-info-team .teamlist li .headpic:hover{transform:rotate3d(0,1,0,-360deg);}
.ma-info-team .teamlist li h2{font-size:26px;line-height:30px;text-align:center;}
.ma-info-team .teamlist li h4{font-size:16px;line-height:30px;padding-bottom:15px;text-align:center;}
.ma-info-team .teamlist li p{line-height:24px;color:#666;height:192px;overflow:hidden;transition:all .5s ease-in .2s; }
.ma-info-team .teamlist li p.on{height:auto;overflow:visible;}
.ma-info-team .teamlist li .btndiv{line-height:20px;padding-top:20px;text-align:center;}
.ma-info-team .teamlist li .btn-show{display:inline-block;}
.ma-info-team .teamlist li .btn-show .icon-font{padding-left:5px;font-size:18px;}
.ma-info-team .teamlist2 li{width:261px;height:250px;}
.ma-info-team .teamlist2 li+li{margin-left:25px;}
.ma-info-team .teamlist2 li .info{width:261px;min-height:375px;}
.ma-info-team .teamlist2 li p{height:217px;}
.ma-info-team .team1 .teamlist li .info{box-shadow: 0 0 6px #dce7f2;}  
</style>
