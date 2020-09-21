<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-task">
                        <div class="mu-task-banner" v-if="vo">
                            <a :href="vo.linkUrl" v-if="vo.linkUrl"><img :src="vo.imgUrl" alt=""></a>
                            <img :src="vo.imgUrl" alt="" v-else>
                        </div>
                        <div class="mu-tasklist">
                            <ul>
                                <li v-if="user.actStart"><i class="icon icon1"></i>
                                    <h2>0.4%-1.0%奖励券</h2>
                                    <h6>奖励券天天领,天天加息</h6>
                                    <div class="sd hastip">
                                      <a href="javascript:;" class="btn btn-prize disabled" v-if="user.isSign==0">未开启</a>
                                      <router-link :to="toLink"  class="btn btn-prize" v-else-if="user.isSign==1">立即领奖</router-link>
                                      <router-link :to="toLink" class="btn btn-prize" v-else-if="user.isSign==2">去领取</router-link>
                                      <router-link :to="toLink" class="btn btn-prize" v-else-if="user.isSign==3">去领取</router-link>
                                      <div class="tip">&nbsp;</div>
                                    </div>
                                </li>
                                <li v-if="user.t0FreeSwitch"><i class="icon icon6"></i>
                                    <h2>免费快速提现次数</h2>
                                    <h6>本月内可抵扣1次快速提现手续费，月底自动失效</h6>
                                    <div class="sd hastip">
                                        <div v-if="user.t0ReceiveCount>0"><a href="javascript:;" class="btn btn-prize" @click="getCashCount">立即领取</a></div>
                                        <a href="javascript:;" class="btn btn-over" v-else>已领取</a>
                                        <div class="tip">每月限领1次</div>
                                    </div>
                                </li>
                                <li v-if="user.hasLastDebtAct"><i class="icon icon7"></i>
                                  <h2>清零大使奖励</h2>
                                  <h6>受让债权人最后一笔有返现奖励哦</h6>
                                  <div class="sd hastip">
                                    <a href="/spa/transfer/index" class="btn btn-prize">立即出借</a>
                                  </div>
                                </li>
                                <li><i class="icon icon3"></i>
                                    <h2>邀请有奖</h2>
                                    <h6>邀请好友，享三重好礼</h6>
                                    <div class="sd">
                                        <router-link to="/spa/event/recommend" class="btn btn-part">立即邀请</router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="mu-tip mt-20" v-if="user.actStart">
                            <div class="hd">温馨提示</div>
                            <div class="bd">
                                <p>1、活动任务时间：2019年09月01日-2019年09月30日；</p>
                                <p>2、奖励券领取后在优惠券中查看使用规则，现金红包与奖励券不能同时使用；</p>
                            </div>
                        </div>
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
import UserMenu from '@/components/user/Menu'
import {toJson,dateformat,formatCurrency} from '@/utils/utils'
import Vue from 'vue'
import {Pagination,Tabs} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Tabs)

export default {
    components:{
        Header,
        Footer,
        UserMenu
    },
    data() { 
        return {
            user:{
                isSign:2,
                t0ReceiveCount:1,
            },
            currentTime:new Date(),
            vo:{},
            toLink:'/spa/activity/sep',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_task'
            }
        }
    },
    filters:{
        dateformat,formatCurrency,
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            this.$post('/task/list').then(res => {
                this.currentTime=toJson(res).currentTime;
                this.user=toJson(res).data;
                this.vo=this.user.vo;
            })
        },
        getCashCount(){
            this.$post('/task/cashCoupon').then(res => {
                if (res.success) {
                    this.$layer.msg('领取成功');
                    this.user.t0ReceiveCount=0;
                } else {
                    this.$layer.msg(res.msg);
                }
            })
        },
        dateformat
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-task-banner img{width:100%;}
.mu-tasklist{background:#fff;padding:20px 30px 30px;
    li{position:relative;height:80px;padding-left:100px;padding-right:170px;
        .icon{background:url(./../../assets/images/user/taskicons.png) no-repeat;position:absolute;}
        .icon1{background-position:0 -66px;width:52px;height:27px;left:24px;top:26px;}
        .icon2{background-position: 0 -377px;width: 46px;height: 44px;left: 27px;top: 18px;}
        .icon3{background-position:0 -150px;width:40px;height:41px;left:30px;top:20px;}
        .icon4{background-position:0 -201px;width:40px;height:41px;left:30px;top:20px;}
        .icon5{background-position:0 -252px;width:19px;height:13px;left:180px;top:4px;}
        .icon6{background-position:0 -328px;width:42px;height:42px;left:29px;top:19px;}
        .icon7{background-position:0 -274px;width:44px;height:44px;left:28px;top:18px;}
        h2{font-size:16px;padding-top:15px;line-height:30px;}
        h6{color:#999;line-height:20px;}
        .text-import{color:#e62222;}
        .sd{position:absolute;right:50px;top:25px;}
        .sd.hastip{top:18px;}
        .sd .tip{position:absolute;left:-50px;top:30px;width:200px;line-height:30px;text-align:center;font-size:12px;color:#aa2c00;}
        .btn{display:inline-block;width:100px;height:30px;line-height:30px;color:#fff;border-radius:30px;background:url(./../../assets/images/user/taskicons.png) no-repeat;}
        .btn-prize{background-position:-80px 0;}
        .btn-part{background-position:-80px -40px;}
        .btn-over{background-position:-80px -80px;}
        .btn.disabled{background:#b7b7b7;}
        .desc1{position:absolute;left:350px;top:30px;line-height:20px;color:#999;}
        .progress{position:absolute;left:500px;top:20px;}
        .u-progress{line-height:8px;height:8px;width:170px;border:1px solid #ebebeb;background:#fff;}
        .u-progress .sr-only{line-height:8px;height:8px;background:#00a651;}
        .progress p{line-height:20px;width:170px;text-align:center;color:#999;}
    }
    li:nth-child(2n){background:#f7f7f7;}
}
</style>
