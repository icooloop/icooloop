<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right" v-show="ifInitDatas">
                        <div class="mu-account-total clearfix total4 ">
                            <div class="item br1">
                                <h4>可用余额(元)</h4>
                                <h1>{{accountVo.availableAmtUnitStr?accountVo.availableAmtStr:accountVo.availableAmt|formatCurrency}}{{accountVo.availableAmtUnitStr?'万':''}} 
                                    <Whattip width="auto" :nowrap="true" :notes="formatCurrency(accountVo.availableAmt)+'元'" v-if="accountVo.availableAmtUnitStr"/>
                                </h1>
                            </div> 
                            <div class="item br1">
                                <h4>冻结金额(元)</h4>
                                <h1>{{accountVo.frozeAmtUnitStr?accountVo.frozeAmtStr:accountVo.frozeAmt|formatCurrency}}{{accountVo.frozeAmtUnitStr?'万':''}}
                                    <Whattip width="auto" :nowrap="true" :notes="formatCurrency(accountVo.frozeAmt)+'元'" v-if="accountVo.frozeAmtUnitStr"/>
                                </h1>
                            </div>
                            <div class="item br1">
                                <h4>累计充值金额(元)</h4>
                                <h1>{{user.recharge|formatCurrency}}</h1>
                            </div>
                            <div class="item">
                                <h4>累计提现金额(元)</h4>
                                <h1>{{user.cash|formatCurrency}}</h1>
                            </div> 
                        </div>
                        <div class="mu-model mu-deal mt-20">
                            <div class="hd clearfix">
                                <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData(1)">查询</button></div>
                                <div class="r pl-10">
                                    <select v-model="subjectType" class="select">
                                        <option value="">全部</option>
                                        <option value="RECHARGE">充值</option>
                                        <option value="WITHDRAW_CASH">提现</option>
                                        <option value="BID">出借</option>
                                        <option value="CAPITAL">本金</option>
                                        <option value="INTEREST">收益</option>
                                        <option value="DEBT_TRANSFER_FEE">手续费</option>
                                        <option value="COMPENSATION">补偿金</option>
                                        <option value="ACT">活动奖励</option>
                                    </select>
                                </div>
                                <div class="r pl-10">
                                    <select @change="changeQueryTime" v-model="queryTime" class="select">
                                        <option value='7'>一周内</option>
                                        <option value='30' selected="selected">一个月内</option>
                                        <option value='90'>三个月内</option>
                                        <option value='180'>半年内</option>
                                        <option value='auto'>自定义</option>
                                    </select>
                                </div>
                                <div class="r pl-10" v-show="queryTime=='auto'"> 
                                    <a-range-picker @change="onChangeDate" v-model="queryDate" 
                                    :disabledDate="disabledDate"/>
                                </div>
                            </div>
                            <div class="bd pd-20">
                                <table class="mu-table text-c">
                                    <thead>
                                        <tr><th>时间</th><th>类型</th><th>收支（元）</th><th>账户余额（元）</th><th>备注</th></tr>
                                    </thead>
                                    <tbody  v-if="investData.dataList && investData.dataList.length>0">
                                        <tr v-for="(o,index) in investData.dataList" :key="'invest2'+index">
                                            <td>{{o.createTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                                            <td>{{o.subjectName}}</td>
                                            <td>{{o.occurAmt|formatCurrency}}</td>
                                            <td>{{o.afterAmt|formatCurrency}}</td>
                                            <td>{{o.remark}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr><td colspan="5"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                    </tbody>
                                </table>
                                <div class="page mt-40 mb-20" v-if="investData.hasPage">
                                    <a-pagination :pageNo="investData.pageNo" :pageSize="investData.pageSize" :total="investData.total" @change="initInvestData"/>
                                </div>
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
import Whattip from '@/components/common/Whattip'
import {toJson,dateformat,formatCurrency} from '@/utils/utils'
import Vue from 'vue'
import {Pagination,Tabs,DatePicker} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(DatePicker)

export default {
    components:{
        Header,
        Footer,
        UserMenu,
        Whattip,
    },
    data() { 
        return {
            placeholder:['开始日期','结束日期'],
            ifInitDatas:false,
            user:{},
            accountVo:{},
            queryTime:'30',
            subjectType:'',
            queryDate:[],
            investData:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_deal'
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
        this.changeQueryTime();
        this.initInvestData(1);
    },
    methods:{
        formatCurrency,
        initData(){
            this.$post('/member/deal/index').then(res => {
                let result=toJson(res)
                this.currentTime=result.currentTime;
                this.user=result.data;
                this.accountVo=this.user.accountVo;
                this.ifInitDatas=true;
            })
        },
        initInvestData(pageNo){
            this.$post('/member/deal/tradeList',{   
                pageNo:pageNo,
                pageSize:this.investData.pageSize,
                startDate:this.queryDate[0].format('YYYY-MM-DD'),
                endDate:this.queryDate[1].format('YYYY-MM-DD'),
                subjectType:this.subjectType,
            }).then(res => {
                let result=toJson(res);
                this.investData.dataList=result.data;
                this.investData.total=result.count;
                this.investData.hasPage=this.investData.total>this.investData.pageSize
            })
        },
        onChangeDate(date, dateString) {
            this.investData.startDate=dateString[0];
            this.investData.endDate=dateString[1];
        },
        range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        },
        disabledDate(current) {
            return current && current > this.moment().endOf('day');
        },
        changeQueryTime(){
            if(this.queryTime!='auto'){
                this.queryDate[0]=this.moment().subtract(this.queryTime,'days');
                this.queryDate[1]=this.moment();
            }
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-deal .hd{padding:20px 30px;border-bottom:1px solid #e2e2e2;line-height:36px;font-size:16px;}
.mu-deal.rechargedeal .hd{border:0;padding:20px 30px 0;}
</style>