<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <div class="content ma-hegui">
                <section class="itemarea heguis">
                    <div class="mn wp">
                        <swiper class="bd" :options="swiperOption" ref="mySwiper">
                            <swiper-slide class="item item1">
                                <h2>合规争当排头兵：积极提交自查报告</h2>
                                <p>2018年9月30日，亿钱贷完成合规自查工作，正式向深圳市福田区金融工作部门提交《自查报告》，成为较早完成并提交自查报告的平台之一</p>
                            </swiper-slide>
                            <swiper-slide class="item item2">
                                <h4>资金存管银行</h4>
                                <h4 class="wxlogo">首批通过测评的存管银行</h4>
                                <p>实现平台和用户资金进行隔离，确保用户债权债务关系清晰明确，充分保障资金安全。</p>
                            </swiper-slide>
                            <swiper-slide class="item item3">
                                <h4>国内知名律所、会计所权威出具合规审查报告</h4>
                                <p>2018年4月、10月亿钱贷邀请广东华商律师事务所、中兴华会计师事务所、中兴财光华会计师事务所进行尽调，分别出具了《网络借贷信息中介机构验收备案申请之法律意见书》《合规情况审查报告》《截至2018年3月31日网络借贷信息中介机构重点环节业务经营情况专项检查报告》《国家互金协会十大问题专项审计报告》</p>
                            </swiper-slide>
                            <swiper-slide class="item item4">
                                <h4>接入深圳市金融风险监测预警平台与<br>中互金协会全国互联网金融登记披露服务平台</h4>
                                <p>与相关监管部门、协会系统进行对接，如实报送相关数据，坚持平台合规运营。</p>
                            </swiper-slide>
                            <swiper-slide class="item item5">
                                <h4>设立自查备案小组，引领公司合规发展</h4>
                                <p>以周世平董事长为组长的亿钱贷“自查备案小组”引领公司全部门积极落实合规要求，有序开展自查、自审、自改工作。</p>
                            </swiper-slide>
                            <swiper-slide class="item item6">
                                <h2>通过三级等保测评</h2>
                                <p>采用国家信息安全等级三级认证标准及各种合适的物理、电子和管理方面的措施来保护数据，以实现对数据安全的严密保护。</p>
                            </swiper-slide>
                        </swiper>
                        <ul class="hd">
                            <li v-for="(item,index) in titles" :key="'title'+index" @click="toTab(index)" :class="activeTab==index?'on':''">{{item}}</li>
                        </ul>
                    </div>
                </section>
                <section class="itemarea promise mt-50">
                    <div class="atitle" style="margin-bottom:0;">信批承诺函</div>
                    <div class="bd"></div>
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

import Vue from 'vue'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        Signname
    },
    data() {
        return {
            activeTab:1,
            swiperOption:{
                init:false,
                loop:true,
                autoplay:true,
                direction : 'vertical',
                on: {
                    slideChangeTransitionStart:()=>{
                        if(this.swiper.activeIndex==7){
                            this.activeTab=0
                        }else if(this.swiper.activeIndex==0){
                            this.activeTab=5
                        }else{
                             this.activeTab=this.swiper.activeIndex-1
                        }
                    },
                },
            },
            titles:['合规争当排头兵','资金存管银行','合规审查报告','登记披露服务平台','引领公司合规发展','通过三级等保测评'],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/hegui',
                naverOn:'nav_about',
            }
        }
    },
    mounted(){
        this.swiper.init()
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        ...mapState(['loginInfo'])
    },
    methods: {
        getTitle(i){
            return this.titles[i]
        },
        toTab(index){
            this.activeTab=index
            this.swiper.slideToLoop(index)
        },
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-hegui .heguis{padding-top:260px;background:url(./../../assets/images/about/hegui/mainbg.jpg) no-repeat top center;}
.ma-hegui .heguis .mn{position:relative;padding-left:244px;width:1200px;}
.ma-hegui .heguis .hd{position:absolute;left:0;top:0;height:501px;padding-top:20px;width:244px;background:#183798;color:#fff;z-index:1;}
.ma-hegui .heguis .hd li{line-height:60px;padding-left:75px;margin-top:15px;position:relative;font-size:16px;cursor:pointer;color:#fff;}
.ma-hegui .heguis .hd li.on,.ma-hegui .heguis .hd li:hover{background:#39c6fe;background: -webkit-linear-gradient(left,#741cfa, #39c6fe);background: linear-gradient(to right,#741cfa, #39c6fe); /* 标准的语法 */}
.ma-hegui .heguis .hd li.on:before,.ma-hegui .heguis .hd li:hover:before{display:block;content:'';width:0;height:0;border:10px solid transparent;border-left-color:#39c6fe;position:absolute;right:-20px;top:20px;}
.ma-hegui .heguis .hd li em{font-size:20px;padding-right:15px;display:block;position:absolute;left:40px;top:20px;line-height:1;
    background:url(./../../assets/images/about/hegui/shape.png) no-repeat right center;}
.ma-hegui .heguis .bd{height:501px;overflow: hidden;}
.ma-hegui .heguis .bd .item{height:501px;width:1030px;color:#fff;padding:110px 85px 0;}
.ma-hegui .heguis .bd .item.item1{background:url(./../../assets/images/about/hegui/step1.jpg) no-repeat;}
.ma-hegui .heguis .bd .item.item2{background:url(./../../assets/images/about/hegui/step2.png) no-repeat;}
.ma-hegui .heguis .bd .item.item3{background:url(./../../assets/images/about/hegui/step3.png) no-repeat;}
.ma-hegui .heguis .bd .item.item4{background:url(./../../assets/images/about/hegui/step4.png) no-repeat;}
.ma-hegui .heguis .bd .item.item5{background:url(./../../assets/images/about/hegui/step5.png) no-repeat;}
.ma-hegui .heguis .bd .item.item6{background:url(./../../assets/images/about/hegui/step6.png) no-repeat;}
.ma-hegui .heguis .bd h2{font-size:28px;line-height:40px;}
.ma-hegui .heguis .bd h4{font-size:24px;line-height:40px;}
.ma-hegui .heguis .bd h4.wxlogo{padding-left:185px;background:url(./../../assets/images/about/hegui/xwbank.png) no-repeat left center;font-size:26px;}
.ma-hegui .heguis .bd p{line-height:30px;font-size:16px;width:480px;margin-top:20px;}
.ma-hegui .promise{padding-top:100px;}
.ma-hegui .promise .bd{height:1040px;background:url(./../../assets/images/about/hegui/promise.png) no-repeat center;}
</style>