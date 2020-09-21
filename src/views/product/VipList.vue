<template>
    <div class="">
        <Header :pageInfo="pageInfo"/>
        <div class="g-mainer mp-vip pb-50 bgproduct">
            <div :style="'background:url('+bannerUrl+') no-repeat top center;height:260px;'"></div>
            <ListTab tabOn="vip"></ListTab>
            <div class="wp">
                <div class="mp-autobid mt-20">
                    <ul class="bd clearfix">
                        <li v-for="(loan,index) in planList" :key="'plan'+index">
                            <a v-if="loan" style="display:block;" :href="'/plan/detail/'+loan.prdId" target="_blank">
                                <div class="title"> {{loan.prdName}}{{loan.prdPeriod}}{{loan.periodUnitStr}}期 <br>持有{{loan.prdPeriod}}{{loan.periodUnitStr=='月'?'个月':loan.periodUnitStr}}可转让</div>
                                <div class="rate text-warning"><em>{{loan.prdRate}}</em>%<span v-if="loan.awardRate &&loan.awardRate>0">+{{loan.awardRate}}%</span></div> 
                                <div class="desc">协议约定年化利率<Whattip arrow="bottom" :notes="whatnotes"/></div> 
                                <div class="btndiv">
                                    <a href="javascript:;" class="btn btn-invest" v-if="loan.prdStatus && loan.prdStatus=='3'">委托出借</a>
                                    <a href="javascript:;" class="btn btn-invest btn-disabled" v-else-if="loan.prdStatus && loan.prdStatus=='2'">{{loan.publishTime|dateformat('HH:mm')}}开启</a>
                                    <a href="javascript:;" class="btn btn-invest btn-disabled" v-else>已满额</a>
                                </div>
                            </a>
                            <div class="jqqd" v-else>敬请期待</div>     
                        </li>
                    </ul>
                </div>

                <div class="mp-tablelist mt-30">
                    <div class="maintitle">散标出借</div>
                    <table class="table text-c">
                        <thead>
                            <tr>
                                <th width="270" class="text-l">项目名称</th>
                                <th width="180">协议约定年化利率<Whattip arrow="bottom" :notes="whatnotes"/></th>
                                <th width="100">借款期限</th>
                                <th width="190">还款方式</th>
                                <th width="185">进度</th>
                                <th width="150">剩余可投（元）</th>
                                <th width="125">状态</th>
                            </tr>
                        </thead>
                        <tbody v-if="bidData.dataList && bidData.dataList.length>0">
                            <router-link :to="'/spa/product/detail/'+loan.loanId" v-for="(loan,index) in bidData.dataList" :key="'bid'+index" tag="tr" class="hand">
                                <td class="text-l"><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.loanTitle}}</td>
                                <td>
                                    <span class="text-info rate">{{loan.platRate}}</span><span class="text-info decimal">%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></span>
                                    <ULabel class="ml-5" type="red" size="small" content="奖励" :movegap="3"  v-if="loan.awardRate&&(loan.awardRate>0)&&[2,5].includes(loan.loanStatus)"/>
                                </td>
                                <td>{{loan.loanPeriod}}{{loan.periodStr}}</td>
                                <td>{{loan.repayModeStr}}</td>
                                <td><a-progress :percent="loan.percent" size="small" :strokeWidth="5" :status="'normal'" :strokeColor="'#d5ad5c'"/></td>
                                <td v-if="loan.loanStatus == 2">{{loan.remainAmount|formatCurrency}}</td>
                                <td v-else-if="loan.loanStatus == 5">已满标</td>
                                <td v-else-if="loan.loanStatus == 6">还款中</td>
                                <td v-else-if="loan.loanStatus == (loan.loanStatus == 7) || (loan.loanStatus ==8) || (loan.loanStatus == 9)">已还清</td>
                                <td>
                                    <a href="javascript:;;" class="btn btn-invest" v-if="loan.loanStatus == 2">立即出借</a>
                                    <a href="javascript:;;" class="repay" v-else-if="loan.loanStatus == 13">{{loan.releaseTime|dateformat('HH:mm')}}开启</a>
                                    <a href="javascript:;;" class="repay" v-else-if="loan.loanStatus == 5">放款中</a>
                                    <a href="javascript:;;" class="repay" v-else-if="loan.loanStatus == 6">还款中</a>
                                    <a href="javascript:;;" class="repay" v-else-if="loan.loanStatus == (loan.loanStatus == 7) || (loan.loanStatus ==8) || (loan.loanStatus == 9)">已还清</a>
                                </td>
                            </router-link>
                        </tbody>
                        <tbody v-else>
                            <tr><td colspan="7"><div class="pd-40"><img class="record" src="@/assets/images/user/record.png"></div></td></tr>
                        </tbody>
                    </table>
                    <div class="page mt-40" v-if="bidData.hasPage">
                        <a-pagination :pageNo="bidData.pageNo" :pageSize="bidData.pageSize" :total="bidData.total" @change="initBidData"/>
                    </div>
                </div>
                <div class="mp-tablelist mt-20">
                    <div class="maintitle">债权转让</div>
                    <table class="table text-c">
                        <thead>
                            <tr>
                                <th width="280" class="text-l">项目名称</th>
                                <th width="130">项目类型</th>
                                <th width="190">原协议约定年化利率<Whattip arrow="bottom" :notes="whatnotes"/></th>
                                <th width="120">剩余期限</th>
                                <th width="170">还款方式</th>
                                <th width="160">转让金额（元）</th>
                                <th width="150">状态</th>
                            </tr>
                        </thead>
                        <tbody v-if="transferData.dataList && transferData.dataList.length>0">
                            <router-link :to="'/transfer/detail/'+loan.transferApplyId" v-for="(loan,index) in transferData.dataList" :key="'transfer'+index" tag="tr" class="hand">
                                <td class="text-l"><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.loanTitle}}</td>
                                <td>{{loan.prdTypeName}}</td>
                                <td><span class="text-info"><span class="rate">{{loan.loanRate}}</span>%</span></td>
                                <td>{{loan.remainDaysStr}}天</td>
                                <td>{{loan.repayMode}}</td>
                                <td>{{loan.transferPrice|formatCurrency}}</td>
                                <td v-if="loan.loanStatus == 2"><a href="javascript:;;" class="btn btn-invest">我要出借</a></td>
                                <td v-else>已转让</td>
                            </router-link>
                        </tbody>
                        <tbody v-else>
                            <tr><td colspan="7"><div class="pd-40"><img class="record" src="@/assets/images/user/record.png"></div></td></tr>
                        </tbody>
                    </table>
                    <div class="page mt-40" v-if="transferData.hasPage">
                        <a-pagination :pageNo="transferData.pageNo" :pageSize="transferData.pageSize" :total="transferData.total" @change="initTransferData"/>
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
import ListTab from '@/components/product/ListTab'
import bannerUrl from '@/assets/images/product/vipbanner.jpg'
import Whattip from '@/components/common/Whattip'
import ULabel from '@/components/common/ULabel'
import Vue from 'vue'
import {Progress,Pagination} from 'ant-design-vue'
Vue.use(Progress)
Vue.use(Pagination)
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
export default {
    components:{
        Header,
        Footer,
        ListTab,
        Whattip,
        ULabel,
        ULabel,
    },
    data() { 
        return {
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            bannerUrl:bannerUrl,
            planList:[],
            bidData:{
                dataList:[],
                pageSize:5,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            transferData:{
                dataList:[],
                pageSize:5,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            rateName:'协议约定年化利率',
            whatnotes:'此利率不构成亿钱贷对出借人的<br>任何承诺，最终收益以实际为准',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                naverOn:'nav_bid',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    filters:{
        formatCurrency,dateformat
    },
    mounted(){
        this.initPlanData();
        this.initBidData(1)
        this.initTransferData(1)
    },
    methods:{
        initPlanData(){
            this.$post('/product/vip/plan').then(res => {
                let result=toJson(res)
                this.planList=result.data.planList;
            })
        },
        initBidData(pageNo){
            this.$post('/product/vip/product',{pageNo:pageNo,pageSize:this.bidData.pageSize}).then(res => {
                let result=toJson(res)
                this.bidData.dataList=result.data;
                this.bidData.total=result.count;
                this.bidData.hasPage=this.bidData.total>this.bidData.pageSize
            })
        },
        initTransferData(pageNo){
            this.$post('/product/vip/debt',{pageNo:pageNo,pageSize:this.transferData.pageSize}).then(res => {
                let result=toJson(res)
                this.transferData.dataList=result.data;
                this.transferData.total=result.count;
                this.transferData.hasPage=this.transferData.total>this.transferData.pageSize
            })
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/product.less";
.mp-vip{position:relative;}
.mp-vip .maintitle{font-size:24px;line-height:50px;padding-bottom:5px;position:relative;}
.mp-vip .maintitle .more{position:absolute;right:5px;top:0;font-size:14px;}
.mp-vip .btn-invest,.mp-vip a.btn-invest{background:#9f845e;line-height:40px;height:40px;color:#fff;width:170px;border-radius:5px;font-size:14px;}
.mp-vip .btn-invest:hover,.mp-vip a.btn-invest:hover{background:#d5ad5c;}
.btn-disabled,.btn-disabled:hover,.btn-disabled:focus,.btn-disabled:visited{color:#999!important;background:none!important;border:none!important;}

.mp-autobid .bd{position:relative;background:#fff;display:flex;}
.mp-autobid li{flex:1;text-align:center;padding-top:30px;position:relative;height:266px;cursor:pointer;}
.mp-autobid li:hover{box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);}
.mp-autobid li+li{background:url(../../assets/images/home/bg3.png) no-repeat left top;}
.mp-autobid li .icon-actbonus{display:block;background:url(../../assets/images/home/actbonus.png) no-repeat;width:73px;height:72px;position:absolute;right:0;top:0;}
.mp-autobid li .icon-iphone{display:block;background:url(../../assets/images/home/iphone.png) no-repeat;width:113px;height:132px;position:absolute;right:0;top:-6px;}
.mp-autobid li .jqqd{background:url(../../assets/images/product/jqqd.png) no-repeat center 20px;color:#999;padding-top:170px;font-size:16px;padding-bottom:30px;}
.mp-autobid .title{font-size:16px;line-height:25px;}
.mp-autobid .rate{padding-top:15px;line-height:1;font-size:24px;}
.mp-autobid .rate em{font-size:48px;}
.mp-autobid .desc{font-size:12px;line-height:20px;padding-top:15px;color:#999;}
.mp-autobid .btndiv{padding-top:20px;}
.mp-autobid .btn-invest{line-height:30px;height:30px;width:120px;font-size:14px;}
.mp-autobid .text-warning{color:#9f845e;}

.mp-tablelist{
    thead th{background-color:#dcdcdc;height:48px;padding:0 5px;}
    tbody{
        td{background-color:#fff;height:84px;position: relative;padding:0 5px;}
        td+td{border-bottom: 1px solid #f6f6f6;}
        .rate{font-size:36px;}
        .text-info{color:#d5ad5c;}
        .btn-invest{width:80px;line-height:34px;height:34px;}
        .repay{color: #7c674f;}
        .jiaxi-icon{position: absolute; width:28px; height: 18px; line-height: 18px; top: 24px; right: 8px; font-style: normal; font-size:10px; color:#fff; text-align: center; background: #cca74f; background: linear-gradient(left, #8b6815 30%, #cca74f); border-radius: 4px; transform: scale(.8);}
    } 
    tr th:first-child,tr td:first-child{padding:0 20px;}
} 
</style>