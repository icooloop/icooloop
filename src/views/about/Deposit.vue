<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="md-deposit">
                <div class="wp">
                    <div class="md-good">
                        <div class="hd">存管的好处</div>
                        <ul class="list clearfix">
                            <li>
                                <div class="pic"><img src="@/assets/images/static/deposit/icon1.png" alt=""></div>
                                <h4>账户独立</h4>
                                <p>为用户开设专门的独立子账户，<br>账户信息由银行保管</p>
                            </li>
                            <li>
                                <div class="pic"><img src="@/assets/images/static/deposit/icon2.png" alt=""></div>
                                <h4>资金隔离</h4>
                                <p>用户资金和平台资金完全隔离，<br>由存管银行进行分账管理与监督</p>
                            </li>
                            <li>
                                <div class="pic"><img src="@/assets/images/static/deposit/icon3.png" alt=""></div>
                                <h4>交易安全</h4>
                                <p>资金交易环节均在存管银行系统<br>进行，每笔交易均经用户授权</p>
                            </li>
                        </ul>
                    </div>
                    <div class="md-flow"><img src="@/assets/images/static/deposit/flow.png" alt=""></div>
                </div>
                <div class="md-guide">
                    <div class="mn">
                        <div class="title">银行存管操作引导</div>
                        <ul class="hd">
                           <li v-for="(item,index) in titles" :key="'title'+index" @click="toTab(index)" :class="activeTab==index?'on':''">{{item}}</li>
                        </ul>
                        <swiper class="bd" :options="swiperOption" ref="mySwiper">
                            <swiper-slide class="text-c"><img src="@/assets/images/static/deposit/guide1.jpg" alt=""></swiper-slide>
                            <swiper-slide class="text-c"><img src="@/assets/images/static/deposit/guide2.jpg" alt=""></swiper-slide>
                            <swiper-slide class="text-c"><img src="@/assets/images/static/deposit/guide3.jpg" alt=""></swiper-slide>
                            <swiper-slide class="text-c"><img src="@/assets/images/static/deposit/guide4.jpg" alt=""></swiper-slide>
                            <swiper-slide class="text-c"><img src="@/assets/images/static/deposit/guide5.jpg" alt=""></swiper-slide>
                            <div class="button-prev slick-arrow" slot="button-prev"></div>
                            <div class="button-next slick-arrow" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
                <div class="md-question wp">
                    <div class="hd">银行存管常见问题</div>
                    <div class="bd">
                        <h2>1.为什么要接入银行存管？</h2>
                        <p class="textIndent2">1）在P2P所有的用户保护措施中，存管是安全级别最高、技术含量最高、也是最难实现的一项。存管的核心原理是将平台和用户资金进行隔离，您出借的资金不再进入平台控制的账户，借款人和出借人之间的交易发生在双方的银行账户之间，平台无法触碰用户资金。</p>
                        <p class="textIndent2">2）2016年8月14日，银监会下发《网络借贷资金存管业务指引(征求意见稿)》，明确提出：“存管银行应对客户资金履行监督责任，不应外包或由合作机构承担，不得委托网贷机构和第三方机构代开出借人和借款人交易结算资金账户。”</p>
                        
                        <h2>2.银行存管有什么好处？</h2>
                        <p>1）系统分账监管</p>
                        <p class="textIndent2">亿钱贷接入新网银行存管系统后，将由新网银行对您的交易资金及平台自有运营资金进行分账监管，二者完全独立且相互隔离，平台无法触碰您的资金。</p>
                        <p>2）用户资金存管</p>
                        <p class="textIndent2">您进行的充值、绑卡、提现等每一笔与资金有关的操作，均需通过新网银行资金存管账户，由新网银行对您的资金信息进行管理，避免您的资金出现被挪用风险。</p>
                        <p>3）用户授权操作</p>
                        <p class="textIndent2">您需要开通新网银行存管账户，并在新网银行存管页面单独设立交易密码。在进行任何与资金相关操作时，系统会验证密码，在得到您的授权后，由银行根据交易指令进行资金划转。</p>
                        <p>4）交易真实有效</p>
                        <p class="textIndent2">新网银行根据合同约定及您发出的交易指令，对交易流程进行管理并对所有资金流水进行存档记录，确保借贷双方的资金流转和债权关系清晰明确。</p>
                        
                        <h2>3.为什么选择新网银行？</h2>
                        <p class="textIndent2">新网银行于2016年6月份获得中国银监会筹建批复，注册资本为30亿元。于2016年12月27日由新希望集团、小米等股东发起设立，其中新希望集团出资9亿元，占股30%；小米出资8.85亿元，占股29.5%。新网银行定位为新一代互联网银行，致力于通过互联网技术为消费者和小微企业提供定制化的金融服务，也是继腾讯旗下微众银行、阿里旗下网商银行的全国第三家互联网银行。并于2018年9月20日通过中国互联网金融协会存管测评，成为P2P行业首批银行存管白名单银行之一。
                        </p>
                        <h2>4.新网银行如何保障亿钱贷出借人的资金与交易安全？</h2>
                        <p class="textIndent2">您的信息和资金由新网银行存管，平台不直接经手您的资金，也无权动用您在银行存管系统的资金。你通过银行存管账户出借成功后，资金将直接进入借款人账户。新网银行会对全交易流程进行核查，使借贷双方的债权关系清晰明确，保障您的资金安全。
                        </p>
                        <h2>5.如何开通新网银行存管账户？</h2>
                        <p class="textIndent2">1）新注册用户：注册成功后根据提示提供真实姓名、身份证号、银行卡号、银行卡预留手机号码，并设置新网银行存管账户交易密码；存管开户时，会同时完成实名、绑卡、设置交易密码环节；开通银行存管后方可支持充值、出借、提现等操作。</p>
                        <p class="textIndent2">2）老用户：未激活新网银行存管账户的老用户在登录亿钱贷网站或APP用户端后，首次进入我的账户时，会提示去激活新网银行资金存管账户，按照流程操作依次进行银行预留手机号填写、交易密码设置，即可成功激活存管账户。</p>
                        </p>
                        <h2>6.开户/激活时默认开通授权业务自动投标是什么？</h2>
                        <p class="textIndent2">授权业务”是指用户授权互联网金融平台代为进行相关业务操作，平台指令将视为用户的真实意思表示， 用户对此予以接受和认可。授权后，用户可在授权期限及授权金额范围内进行授权投标/授权还款/授权缴费等业务。当授权期限过期，或出借/还款/缴费等金额超过授权金额范围时，用户需重新授权。</p>
                        <p class="textIndent2">开户/激活后可手动取消授权业务，如果账户有未到期易智投项目则不可取消，取消授权业务将无法进行出借。</p>
                        
                        <div class="text-c mt-60">
                            <a class="btn btn-deposit" href="javascript:;" @click="ifShowLogin=true" v-if="!pageInfo.loginInfo.isLogin">立即开通存管</a>
                            <router-link class="btn btn-deposit" to="/spa/member/secure/security" v-else-if="pageInfo.loginInfo.isDepositary">立即开通存管</router-link>
                            <router-link class="btn btn-deposit" to="/member/depository/form" v-else>立即开通存管</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>     
    <Signname></Signname>
    <Footer :pageInfo="pageInfo"></Footer> 
    <!-- 登录modal -->
    <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
        :footer="null" @cancel="ifShowLogin=false" :centered="true" width="490" :closable="false">
        <Login @loginSuccess="loginSuccess"></Login>
        <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
    </a-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import AboutMenu from '@/components/about/AboutMenu'
import Signname from '@/components/about/Signname'
import AboutSide from '@/components/about/AboutSide'
import Login from '@/components/layer/Login'
import {toJson} from  '@/utils/utils'

import Vue from 'vue'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        Signname,
        AboutSide,
        Login,
    },
    data() {
        return {
            activeTab:1,
            swiperOption:{
                init:false,
                loop:true,
                autoplay:true,
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                },
                on: {
                    slideChangeTransitionStart:()=>{
                        if(this.swiper.activeIndex==6){
                            this.activeTab=0
                        }else if(this.swiper.activeIndex==0){
                            this.activeTab=4
                        }else{
                             this.activeTab=this.swiper.activeIndex-1
                        }
                        console.log(this.activeTab,this.swiper.activeIndex)
                    },
                },
            },
            loginStyle:{padding:'20px 0 10px'},
            ifShowLogin:false,
            titles:['注册','开通存管账户','充值','出借','提现'],
            sideMenus:[
                {name:'风险控制',link:'/spa/about/riskmanage'},
				{name:'银行存管',link:'/spa/about/deposit',onClass:true}
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/riskmanage',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.swiper.init()
    },
    methods: {
        loginSuccess(){
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.ifShowLogin=false
            })
        },
        toTab(index){
            this.activeTab=index
            this.swiper.slideToLoop(index)
        },
    },
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/about.less";
.md-deposit{
    background:#f1efed url(./../../assets/images/static/deposit/banner.jpg?v2) no-repeat top center;
    min-height:500px;
    padding-top:345px;
    .md-good{
        background:#fff;
        border-radius:10px;
        text-align:center;
        .hd{
            font-size:24px;
            line-height:30px;
            padding:40px;
        }
        .list{
            padding:40px 40px 70px;
            li{
                float:left;
                width:33.33%;
                .pic{
                    line-height:90px;
                }
                h4{
                    font-size:16px;
                    font-weight:700;
                    padding-top:30px;
                    padding-bottom:15px;
                    line-height:20px;
                }
                p{line-height:24px;}
            }
        }
    }
    .md-flow{
        padding:80px 0 130px;
        text-align:center;
    }
    .md-guide{
        background:url(./../../assets/images/static/deposit/bg_guide.jpg) no-repeat bottom center;
        min-height:818px;
        text-align:center;
        .mn{
            position:relative;
            width:1000px;
            margin:0 auto;
            padding-bottom:130px;
        }
        .title{
            font-size:30px;
            line-height:1;
            padding-top:70px;
            padding-bottom:50px;
            color:#fff;
        }
        .bd{
            margin-top:80px;
            position:relative;
            text-align:center;
            img{
                height:426px;
                margin:0 auto;
            }
            .slick-arrow {
                position:absolute;
                display:block;
                height:55px;
                width:33px;
                top:50%;
                margin-top:-27px;
                cursor:pointer;
                z-index:2;
            }
            .slick-arrow.button-prev {
                left:0;
                background:url(./../../assets/images/static/deposit/arrow1.png) no-repeat;
            }
            .slick-arrow.button-next {
                right:0;
                background:url(./../../assets/images/static/deposit/arrow2.png) no-repeat;
            }
            .slick-slide img{display: inline-block;}
        }
        .hd{
            text-align:center;
            li{
                display:inline-block;
                margin:0 10px;
                font-size:18px;
                padding:0 15px 10px;
                line-height:20px;
                border-bottom:3px solid transparent;
                color:#aaa;cursor:pointer;
            }
            li.on{
                border-bottom:3px solid #fff;
                color:#fff;
            }
        }
    }
    .md-question{
        color:#71635b;
        padding-top:115px;
        font-size:16px;
        padding-bottom:120px;
        .hd{
            font-size:24px;
            line-height:1;
            text-align:center;
        }
        .bd{
            padding:0 50px;
            h2{
                color:#3d312a;
                padding-left:25px;
                font-weight:700;
                margin-top:40px;
                background:url(./../../assets/images/static/deposit/question.png) no-repeat left top;
                line-height:24px;
                padding-bottom:5px;
            }
            p{
                padding-left:25px;
                line-height:32px;
            }
            .btn-deposit{
                background:#5148a3;
                color:#fff;
                width:200px;
                line-height:50px;
                height:50px;
                font-size:20px;
                border-radius:5px;
            }
        }
    }
}
</style>