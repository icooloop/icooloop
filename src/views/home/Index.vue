<template>
    <div id="index">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <swiper class="mi-banner" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(banner,index) in dataInfo.banner" :key="'banner'+index"><a class="item" :style="{backgroundImage:'url(' + banner.imgUrl+ ')' }" target="_blank" :href="banner.linkUrl"></a></swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
                <div class="button-prev slick-arrow" slot="button-prev"><i class="icon-font icon-prev"></i></div>
                <div class="button-next slick-arrow" slot="button-next"><i class="icon-font icon-next"></i></div>
            </swiper>
            <div class="wp pb-40">
                <div class="mi-livedata">
                    <span class="mr-30">累计成交总额  <strong class="text-primary"><countTo :endVal='stsData.totalTransaction' :duration='3000'></countTo></strong>元</span>
                    <span class="mr-30">累计交易天数  <strong class="text-primary"><countTo :endVal='stsData.day' :duration='3000'></countTo></strong>天</span>
                    <span class="mr-30">累计注册人数  <strong class="text-primary"><countTo :endVal='stsData.numberRegist' :duration='3000'></countTo></strong>人</span>
                    <router-link to="/spa/about/operate" class="more" target="_blank">详细数据 &gt;</router-link>
                </div>
                <div class="mi-intro">
                    <ul class="clearfix">
                        <li v-for="(intro,index) in intros" :key="'intro'+index">
                            <router-link :to="intro.link" target="_blank"><i :class="['icon-font',intro.iconfont]"></i>
                                <h2>{{intro.desc1}}</h2>
                                <p>{{intro.desc2}}</p>
                            </router-link></li>
                    </ul>
                </div>
                <!--<div class="maintitle mt-20">新手专享</div>-->
                <!--<div class="mi-newer">-->
                    <!--<div class="sd"><router-link to="/spa/event/novice" target="_blank"><img src="@/assets/images/home/newer2.jpg" height="162" alt=""></router-link></div>-->
                    <!--<div class="bd">-->
                        <!--<div class="title">{{newerVo.fontStr}}&nbsp;<ULabel class="ml-5" type="red" size="small" content="新手专享"></ULabel><ULabel class="ml-5" type="orange" size="small" content="限额3万"></ULabel></div>-->
                        <!--<table class="datatable">-->
                            <!--<tbody><tr>-->
                                <!--<td width="240">-->
                                    <!--<div class="desc text-warning">-->
                                        <!--<span class="num">{{newerVo.prdRate}}</span>%-->
                                        <!--<span v-if="newerVo.awardRate&&newerVo.awardRate>0"><em>+{{newerVo.awardRate}}</em>%</span>-->
                                    <!--</div>-->
                                    <!--<p>{{rateName}}<Whattip :notes="whatnotes"></Whattip></p>-->
                                <!--</td>-->
                                <!--<td width="195"><div class="desc"><em>{{newerVo.prdPeriod}}</em>{{['天','个月','年'][newerVo.periodUnit]}}</div>-->
                                    <!--<p>委托期限</p></td>-->
                                <!--<td><div class="desc"><em>{{newerVo.minAmount+''|formatCurrency(0)}}</em>元</div>-->
                                    <!--<p>最低委托金额</p></td>-->
                                <!--<td class="text-r" width="170">  -->
                                    <!--<router-link :to="'/spa/plan/index?defineId='+newerVo.defineId" target="_blank" class="btn btn-invest btn-warning" -->
                                        <!--v-if="newerVo.prdStatus&&(newerVo.prdStatus==3)&&newerVo.isNovice">委托出借</router-link>-->
                                    <!--<a href="javascript:;" class="btn btn-warning btn-invest btn-disabled" -->
                                        <!--v-else-if="newerVo.prdStatus&&(newerVo.prdStatus==3)&&!newerVo.isNovice">仅限新手</a>-->
                                    <!--<router-link :to="'/spa/plan/index?defineId='+newerVo.defineId" target="_blank" class="btn btn-warning btn-invest btn-disabled" -->
                                        <!--v-else-if="newerVo.prdStatus&&(newerVo.prdStatus==2)">{{newerVo.publishTime|dateformat('HH:mm')}}开启</router-link>	                            -->
                                    <!--<router-link :to="'/spa/plan/index?defineId='+newerVo.defineId" target="_blank" class="btn btn-warning btn-invest btn-disabled" -->
                                        <!--v-else>暂未开放</router-link>-->
                                <!--</td>-->
                            <!--</tr>-->
                        <!--</tbody></table>-->
                    <!--</div>-->
                <!--</div>-->


                <section class="m-bid mt-20" v-if="dataInfo.loans">
                    <div class="maintitle">散标出借<router-link to="/spa/product/index" class="more" target="_blank">查看更多 &gt;</router-link></div>
                    <router-link target="_blank" :to="'/spa/product/detail/'+loan.loanId" class="item" v-for="(loan,index) in dataInfo.loans" :key="'loan'+index">
                        <div class="hd"><ULabel :type="prdTypes[loan.prdType]" size="small"></ULabel>{{loan.loanTitle}}</div>
                        <table class="datatable">
                            <tr>
                                <td width="240">
                                    <div class="rate text-warning">{{loan.platRate}}<em>%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em>
                                        <ULabel class="ml-5" type="red" size="small" content="奖励" :movegap="3" v-if="loan.awardRate&&(loan.awardRate>0)&&[2,5].includes(loan.loanStatus)"></ULabel>
                                    </div>
                                    <p>{{rateName}}<Whattip :notes="whatnotes"></Whattip></p></td>
                                <td width="180">
                                    <div class="limit">{{loan.loanPeriod}}<em> {{loan.periodStr}}</em></div>
                                    <p>借款期限</p>
                                </td>
                                <td width="220">
                                    <div class="limit"><em>{{loan.repayModeStr}}</em></div>
                                    <p>回款方式</p>
                                </td>
                                <td width="280">       
                                    <div class="esidue" v-if="loan.remainAmount==0 ||loan.percent==100">已满标</div>  
                                    <div class="esidue" v-else-if="loan.remainAmount>100000">剩余可投：<em>{{(loan.remainAmount/10000)|formatCurrency}}</em> 万元</div>  
                                    <div class="esidue" v-else>剩余可投：<em>{{loan.remainAmount|formatCurrency(0)}}</em> 元</div>  
                                    <a-progress :percent="loan.percent" size="small" :strokeWidth="5" :status="'normal'" strokeColor="#3961cd"/>
                                </td>
                                <td class="text-c">
                                    <button class="btn btn-invest btn-warning" v-if="loan.loanStatus==2">立即出借</button>
                                    <button class="btn btn-invest btn-disabled" v-else-if="loan.loanStatus==5">&nbsp;放款中&nbsp;</button>
                                    <button class="btn btn-invest btn-disabled" v-else-if="loan.loanStatus==13">&nbsp;{{loan.releaseTime|dateformat('HH:mm')}}开启&nbsp;</button>
                                    <button class="btn btn-invest btn-disabled" v-else-if="loan.loanStatus==6">&nbsp;还款中&nbsp;</button>
                                    <button class="btn btn-invest btn-disabled" v-else-if="[7,8,9].includes(loan.loanStatus)">&nbsp;已还清&nbsp;</button>
                                </td>
                            </tr>
                        </table>
                    </router-link>
                </section>

                <section class="m-bid mt-20" v-if="dataInfo.loans">
                    <div class="maintitle">债权转让<router-link to="/spa/transfer/index" class="more" target="_blank">查看更多 &gt;</router-link></div>
                    <router-link target="_blank" :to="'/spa/transfer/detail/'+loan.transferApplyId" class="item" v-for="(loan,index) in dataInfo.debts" :key="'loan'+index">
                        <div class="hd">
                          <ULabel :type="prdTypes[loan.prdType]" size="small"></ULabel>{{loan.loanTitle}}
                           <ULabel class="ml-5" type="red" size="small"
                                  :content="'折价'+parseFloat(loan.discountScale*100).toFixed(2)+'%'" v-if="loan.discountScale>0"/>
                          <ULabel class="ml-5" type="orange" size="small" content="免垫付利息" v-if="loan.isFree==1"
                                  notes="受让方无需垫付本期未结利息"/>
                          <ULabel class="ml-5" type="red" size="small" content="最后一笔" v-if="loan.isLast=='1'" notes="受让债权人最后一笔债权有返现奖励"/>
                          <span style="color:#999;margin:0 0 0 20px;font-size: 12px">债权编号:{{loan.debtCode}}</span>
                        </div>
                        <table class="datatable">
                            <tr>
                                <td width="240">
                                    <div class="rate text-warning">{{loan.loanRate}}<em>%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em>
                                        <ULabel class="ml-5" type="red" size="small" content="奖励" :movegap="3" v-if="loan.awardRate&&(loan.awardRate>0)&&[2,5].includes(loan.loanStatus)"></ULabel>
                                    </div>
                                    <p>原协议约定年化利率<Whattip :notes="whatnotes"></Whattip></p></td>
                                <td width="180">
                                    <div class="limit">{{loan.remainDays}}<em>天</em></div>
                                    <p>剩余期限</p>
                                </td>
                                <td width="220">
                                    <div class="limit"><em>{{loan.repayMode}}</em></div>
                                    <p>还款方式</p>
                                </td>
                                <td width="280">
                                   <div class="limit">
                                      <em>{{loan.transferPrice|formatCurrency}}</em>
                                       <Whattip v-if="loan.fairPrice && loan.fairPrice>loan.transferPrice" width="auto" :nowrap="true"
                           :notes="'原价'+loan.fairPrice+'元，节省'+parseFloat(loan.fairPrice-loan.transferPrice).toFixed(2)+'元'"/>
                                   </div>
                                    <p>转让金额(元)<span style="text-decoration: line-through" v-if="loan.fairPrice && loan.fairPrice>loan.transferPrice">{{loan.fairPrice|formatCurrency}}</span></p>
                                </td>
                                <td class="text-c">
                                    <button class="btn btn-invest btn-warning">立即出借</button>
                                    <p style="color:#888;">转让方:{{loan.fuzzyUserLoginName}}</p>
                                </td>
                            </tr>
                        </table>
                    </router-link>
                </section>

                <div class="mi-notice clearfix mt-20">
                    <div class="item l">
                        <div class="maintitle">官方公告<router-link to="/spa/about/notice/notice" class="more" target="_blank">查看更多 &gt;</router-link></div>
                        <div class="bd">
                            <ul class="list" v-if="dataInfo.notices && dataInfo.notices.length>0">
                                <li v-for="(notice,index) in dataInfo.notices" :key="'notice'+index">
                                    <router-link :to="'/spa/article/news/'+notice.uuid" target="_blank"><em>{{notice.createTime|dateformat}}</em>{{notice.title}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item r">
                        <div class="maintitle">行业资讯<router-link to="/spa/about/notice/news" class="more" target="_blank">查看更多 &gt;</router-link></div>
                        <div class="bd">
                            <ul class="list" v-if="dataInfo.news&&(dataInfo.news.length>0)">
                                <li v-for="(notice,index) in dataInfo.news" :key="'news'+index">
                                    <router-link :to="'/spa/article/news/'+notice.uuid" target="_blank"><em>{{notice.createTime|dateformat}}</em>{{notice.title}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="mi-coop mt-20">
                    <div class="maintitle">合作伙伴<router-link to="/spa/about/info/partner" class="more" target="_blank">查看更多 &gt;</router-link></div>
                    <div class="bd">
                        <img src="@/assets/images/home/logo.png"/>
                        <img src="@/assets/images/home/logo2.png"/>
                        <img src="@/assets/images/home/logo3.png"/>
                        <img src="@/assets/images/home/logo4.png"/>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import Vue from 'vue'
import countTo from 'vue-count-to'
import {dateformat,formatCurrency} from '@/utils/utils'
import {Progress} from 'ant-design-vue'
import Whattip from '@/components/common/Whattip'
import ULabel from '@/components/common/ULabel'
Vue.use(Progress) 

export default {
    components:{
        Header,
        Footer,
        Whattip,
        countTo,
        ULabel
    },
    data() { 
        return {
            swiperOption:{
                init:false,
                loop:true,
                autoplay:true,
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                },
            },
            dataInfo:{},
            newerVo:{},
            stsData:{},
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            rateName:'协议约定年化利率',
            whatnotes:'此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准',
            intros:[
                {link:'/spa/about/info/platform#gdxx',iconfont:'icon-company2',desc1:'上市背景',desc2:'A股上市公司控股'},
                {link:'/spa/about/deposit',iconfont:'icon-socket',desc1:'银行存管',desc2:'新网银行资金存管'},
                {link:'/spa/about/hegui',iconfont:'icon-bridge',desc1:'合规运营',desc2:'拥抱监管，合规发展'},
                {link:'/spa/about/riskmanage',iconfont:'icon-company-verify',desc1:'风险管理',desc2:'多重风控优质资产'},
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                naverOn:'nav_index'
            }
        }
    },
    methods:{
        tolink(linkurl){
            this.$router.push(linkurl);
        }
    },
    filters:{
        dateformat,
        formatCurrency,
    },
    mounted(){
        var _this=this;
        this.$post('/index').then((res)=>{
            this.dataInfo=res.data
            this.stsData=this.dataInfo.stsData
            this.newerVo=this.dataInfo.novice
        })
    },
    updated() {
        if(this.dataInfo.banner.length>0){
            this.swiper.init()  
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
@import "~@/assets/style/home/index.less";
.mi-banner >>> .swiper-pagination-bullet{width:12px;height:12px;border-radius:12px;background:none;border:1px solid #fff;opacity:1;}
.mi-banner >>> .swiper-pagination-bullet-active{background:#fff;}
.mi-banner >>> .slick-arrow {position:absolute;display:block;height:200px;line-height:200px;top:50%;margin-top:-100px;cursor:pointer;z-index:2;width:15%;text-align:center}
.mi-banner >>> .slick-arrow .icon-font{font-size:40px;color:#fff;font-weight:bold;opacity:.5;}
.mi-banner >>> .slick-arrow:hover .icon-font{opacity:.9;}
.mi-banner >>> .slick-arrow.button-prev{left:0;}
.mi-banner >>> .slick-arrow.button-next{right:0;}
</style>
