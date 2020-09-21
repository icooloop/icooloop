<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-voucher">
                        <a-tabs class="ant-tabs-yqd" defaultActiveKey="2" size="large" @change="tabChange">
                            <a-tab-pane tab="红包" key="1">
                                <div class="mu-bonus">
                                    <div class="remarks">您共使用 <span class="text-danger">{{useCount}}</span> 个优惠券，已为您多赚取 <span class="text-danger">{{coupon|formatCurrency}}</span> 元收益
                                        <a-radio-group v-model="redStatus" class="r mr-10">
                                            <a-radio-button :value="1">可用红包</a-radio-button>
                                            <a-radio-button :value="2">已失效红包</a-radio-button>
                                        </a-radio-group>
                                    </div>
                                    <div v-show="redStatus==1">
                                        <ul class="couponlist clearfix">
                                            <li class="red" v-for="(item,index) in voucherRecord1.dataList" :key="'noUsedRedTable'+index">
                                                <div class="hd"><em>{{item.awardAmount}}</em>元
                                                    <div class="title">{{item.actName}}</div>
                                                </div>
                                                <div class="bd">
                                                    <p>{{item.limitRemark}}</p>
                                                    <p>{{item.limitPeriodRemarkStr}}</p>
                                                    <p>有效期：{{item.awardTimeYMDStr}}至{{item.deadTimeYMDStr}}</p>
                                                </div>
                                            </li>
                                            <li class="newer">
                                                <div class="hd"><em>10</em>元
                                                    <div class="title2">邀请好友注册<br>立享红包</div>
                                                </div>
                                                <div class="bd" v-if="activity">
                                                    <p>单笔出借满{{activity.limitAmount}}返{{activity.awardAmount}}</p>
                                                    <p>{{activity.limitPeriodsStr}}</p>
                                                    <p>**********</p>
                                                    <router-link to="/spa/event/recommend" class="btn btn-invest2">立即邀请</router-link>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="page mt-40" v-if="voucherRecord1.hasPage">
                                            <a-pagination :pageNo="voucherRecord1.pageNo" :pageSize="voucherRecord1.pageSize" :total="voucherRecord1.total" @change="initVoucherRecord1"/>
                                        </div>
                                    </div>
                                    <div v-show="redStatus==2">
                                        <ul class="couponlist clearfix" v-if="voucherRecord2.dataList && voucherRecord2.dataList.length>0">
                                            <li class="used" v-for="(item,index) in voucherRecord2.dataList" :key="'noUsedRedTable'+index">
                                                <div class="hd"><em>{{item.awardAmount}}</em>元
                                                    <div class="title">{{item.actName}}</div>
                                                </div>
                                                <div class="bd">
                                                    <p>{{item.limitRemark}}</p>
                                                    <p>{{item.limitPeriodRemarkStr}}</p>
                                                    <p>有效期：{{item.awardTimeYMDStr}}至{{item.deadTimeYMDStr}}</p>
                                                    <div class="label">{{item.statusStr}}</div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="nodata mt-20" v-else>
                                            <p>暂无已失效红包</p>
                                        </div>
                                        <div class="page mt-40" v-if="voucherRecord2.hasPage">
                                            <a-pagination :pageNo="voucherRecord2.pageNo" :pageSize="voucherRecord2.pageSize" :total="voucherRecord2.total" @change="initVoucherRecord2"/>
                                        </div>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane tab="奖励券" key="2">
                                <div class="mu-bonus">
                                    <div class="remarks">您共使用 <span class="text-danger">{{useCount}}</span> 个优惠券，已为您多赚取 <span class="text-danger">{{coupon|formatCurrency}}</span> 元收益
                                        <a-radio-group v-model="ticketStatus" class="r mr-10">
                                            <a-radio-button :value="1">可用奖励券</a-radio-button>
                                            <a-radio-button :value="2">已失效奖励券</a-radio-button>
                                        </a-radio-group>
                                    </div>
                                    <div v-show="ticketStatus==1">
                                        <ul class="couponlist clearfix" v-if="voucherRecord3.dataList && voucherRecord3.dataList.length>0">
                                            <li class="ticket" v-for="(item,index) in voucherRecord3.dataList" :key="'noUsedRedTable'+index">
                                                <div class="hd"><em>{{item.awardAmount}}</em>%
                                                    <div class="title">{{item.actName}}</div>
                                                </div>
                                                <div class="bd">
                                                    <p>{{item.limitRemark}}</p>
                                                    <p>{{item.limitPeriodRemarkStr}}</p>
                                                    <p>有效期：{{item.awardTimeYMDStr}}至{{item.deadTimeYMDStr}}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="nodata mt-20" v-else>
                                            <p>暂无可用奖励券</p>
                                            <router-link to="/spa/member/task" class="btn btn-sel">去领取</router-link>
                                        </div>
                                        <div class="page mt-40" v-if="voucherRecord3.hasPage">
                                            <a-pagination :pageNo="voucherRecord3.pageNo" :pageSize="voucherRecord3.pageSize" :total="voucherRecord3.total" @change="initVoucherRecord3"/>
                                        </div>
                                    </div>
                                    <div v-show="ticketStatus==2">
                                        <ul class="couponlist clearfix" v-if="voucherRecord4.dataList && voucherRecord4.dataList.length>0">
                                            <li class="used" v-for="(item,index) in voucherRecord4.dataList" :key="'noUsedRedTable'+index">
                                                <div class="hd"><em>{{item.awardAmount}}</em>%
                                                    <div class="title">{{item.actName}}</div>
                                                </div>
                                                <div class="bd">
                                                    <p>{{item.limitRemark}}</p>
                                                    <p>{{item.limitPeriodRemarkStr}}</p>
                                                    <p>有效期：{{item.awardTimeYMDStr}}至{{item.deadTimeYMDStr}}</p>
                                                    <div class="label">{{item.statusStr}}</div>
                                                </div>
                                            </li>
                                        </ul>
                                         <div class="nodata mt-20" v-else>
                                            <p>暂无已失效奖励券</p>
                                        </div>
                                        <div class="page mt-40" v-if="voucherRecord4.hasPage">
                                            <a-pagination :pageNo="voucherRecord4.pageNo" :pageSize="voucherRecord4.pageSize" :total="voucherRecord4.total" @change="initVoucherRecord4"/>
                                        </div>
                                    </div>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                        <div class="tabs-more"><a href="javascript:;" class="text-primary" @click="ifShowModal=true">使用规则</a></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
        <a-modal title="优惠券使用规则" :visible="ifShowModal" :maskClosable="false" 
            :footer="null" :centered="true" :width="500" :closable="false">
            <button type="button" class="closemodal" @click="ifShowModal=false"><i class="icon-font icon-close"></i></button>
            <div class="mu-rule">
                <p>1、出借时可自行选择符合使用条件的优惠券，满标放款后红包金额以现金形式发放至账户余额。</p>
                <p class="pt-10">2、单笔出借金额达到多个红包合计的使用条件时，红包可叠加使用。</p>
                <p class="pt-10">3、奖励券的收益将随借款标每期回款一起发放。</p>
                <p class="pt-10">3、红包和奖励券不可叠加使用。</p>
            </div>
        </a-modal>
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
            ifShowModal:false,
            redStatus:1,
            ticketStatus:1,
            useCount:0,
            activity:{},
            coupon:0,
            voucherRecord1:{
                dataList:[],
                pageSize:8,
                pageNo:1,
                total:0,
                hasPage:false,
                awardType:2,
                status:1,
            },
            voucherRecord2:{
                dataList:[],
                pageSize:9,
                pageNo:1,
                total:0,
                hasPage:false,
                awardType:2,
                status:2,
            },
            voucherRecord3:{
                dataList:[],
                pageSize:9,
                pageNo:1,
                total:0,
                hasPage:false,
                awardType:3,
                status:1,
            },
            voucherRecord4:{
                dataList:[],
                pageSize:9,
                pageNo:1,
                total:0,
                hasPage:false,
                awardType:3,
                status:2,
            },
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_voucher'
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
        this.initVoucherRecord1(1);
        this.initVoucherRecord2(1);
        this.initVoucherRecord3(1);
        this.initVoucherRecord4(1);
    },
    methods:{
        initVoucherRecord1(pageNo){
            this.$post('/member/invest/getCouponTicketList',{pageNo:pageNo,pageSize:this.voucherRecord1.pageSize,status:this.voucherRecord1.status,awardType:this.voucherRecord1.awardType}).then(res => {
                let result=toJson(res).data
                this.useCount=result.useCount;
                this.coupon=result.coupon;
                this.activity=result.activity;
                this.voucherRecord1.dataList=result.record;
                this.voucherRecord1.total=result.page.totalCount;
                this.voucherRecord1.hasPage=this.voucherRecord1.total>this.voucherRecord1.pageSize
            })
        },
        initVoucherRecord2(pageNo){
            this.$post('/member/invest/getCouponTicketList',{pageNo:pageNo,pageSize:this.voucherRecord2.pageSize,status:this.voucherRecord2.status,awardType:this.voucherRecord2.awardType}).then(res => {
                let result=toJson(res).data
                this.voucherRecord2.dataList=result.record;
                this.voucherRecord2.total=result.page.totalCount;
                this.voucherRecord2.hasPage=this.voucherRecord2.total>this.voucherRecord2.pageSize
            })
        },
        initVoucherRecord3(pageNo){
            this.$post('/member/invest/getCouponTicketList',{pageNo:pageNo,pageSize:this.voucherRecord3.pageSize,status:this.voucherRecord3.status,awardType:this.voucherRecord3.awardType}).then(res => {
                let result=toJson(res).data
                this.voucherRecord3.dataList=result.record;
                this.voucherRecord3.total=result.page.totalCount;
                this.voucherRecord3.hasPage=this.voucherRecord3.total>this.voucherRecord3.pageSize
            })
        },
        initVoucherRecord4(pageNo){
            this.$post('/member/invest/getCouponTicketList',{pageNo:pageNo,pageSize:this.voucherRecord4.pageSize,status:this.voucherRecord4.status,awardType:this.voucherRecord4.awardType}).then(res => {
                let result=toJson(res).data
                this.voucherRecord4.dataList=result.record;
                this.voucherRecord4.total=result.page.totalCount;
                this.voucherRecord4.hasPage=this.voucherRecord4.total>this.voucherRecord4.pageSize
            })
        },
        tabChange(){
            this.redStatus=1
            this.ticketStatus=1
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
@import "~@/assets/style/config.less";
.mu-bonus{background:#fff;padding:20px 20px 30px;position:relative;
    .remarks{font-size:16px;color:#666;line-height:34px;margin-left:20px;margin-bottom:20px;} 
    .mu-table tbody tr{border-bottom:1px dashed #ccc;}
    .mu-table td{line-height:60px;padding:10px 5px;}
    .icon-red,.invest-icon{display: inline-block;width:47px;height:42px;line-height:42px;padding-top:4px;text-align: center;margin-right:10px;color: #ffee78;font-style: normal;font-weight: bold;vertical-align: middle;background: url(./../../assets/images/user/investment_bg2.png) no-repeat;}
    .icon-red.used{background-position: -58px 0;color: #fff;}
    .invest-icon{width:50px;height:36px;line-height:28px;padding-top:0;padding-bottom:8px;background-position: 0 -54px;}
    .invest-icon.used{color: #fff;background-position: -58px -54px;}
    .investmenttip{line-height:20px;color:#666;margin-top:5px;}
}
.couponlist{
    li{width:291px;height:159px;position: relative;float: left;margin:0 12px 15px;
        .hd{position: relative;height:69px;padding:10px 30px;line-height:1;font-size:20px;
            em{font-size:50px;padding-right:3px;color:#cc6666;}
            .title{position: absolute;right:15px;top:23px;line-height:23px;border-radius:4px;padding:0 8px;color:#fff;font-size:14px;background:#b7b7b7;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width:130px;}
            .title2{position: absolute;right:65px;bottom:12px;line-height:18px;font-size:14px;}
        }
        .bd{padding:10px 30px;position: relative;
            p{line-height:21px;font-size:12px;}
            .label{position: absolute;right:-2px;bottom:4px;transform:rotate(-45deg);color:#fff;width:50px;text-align:center;}
        }
    }
    li.used{background:url(./../../assets/images/user/coupon0.png);
        em{color:#999;}
    }
    li.red{background:url(./../../assets/images/user/coupon1.png);
        .title{background: repeating-linear-gradient(-60deg,#c6008a, #c6008a 33%,#f31858 0, #f31858 66%, #f16a76 0, #f16a76 100%);}
    }
    li.ticket{background:url(./../../assets/images/user/coupon2.png);
        em{color:#f5623b;}
        .title{background: linear-gradient(-60deg, #ff8534,#fd7d36, #f5653f);}
    }
    li.newer{width:289px;background:url(./../../assets/images/user/coupon3.png);
        .btn-invest2{position: absolute;right:20px;top:20px;color:#3e0f66;line-height:30px;padding:0 10px;border-radius:12px;background: linear-gradient(-60deg, #ffe87f,#fdc700);}
    }
}
.nodata{text-align:center;padding:40px;
    p{font-size:18px;color:#999;}
    .btn-sel{width:160px;line-height:38px;border-radius:38px;color:@primary-color;border:1px solid @primary-color;margin-top:20px;font-size:16px;}
    .btn-sel:hover{color:#fff;background: @primary-color;}
}
</style>
