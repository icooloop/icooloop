<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-model" v-show="ifInitDatas">
                        <a-tabs class="ant-tabs-yqd" defaultActiveKey="2" size="large">
                            <a-tab-pane :tab="'待回款('+investData1.total+')'" key="1">
                                <div class="bd pd-20">
                                    <ul class="mu-autobid-data clearfix mt-20">
                                        <li>
                                            <span>出借本金(元)</span>
                                            <em class="txtInvestAmt">{{user.investPrincipal|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>预期收益(元)</span>
                                            <em class="txtIncomeAmt">{{user.investIncome|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40">
                                        <thead>
                                            <tr>
                                                <th>出借时间</th>
                                                <th>项目名称</th>
                                                <th>出借本金（元）</th>
                                                <th>协议约定年化利率</th>
                                                <th>借款期限</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="investData1.dataList && investData1.dataList.length>0">
                                            <tr v-for="(o,index) in investData1.dataList" :key="'invest'+index">
                                                <td>{{o.investTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                                                <td><a class="text-primary" :href="'/spa/product/detail/'+o.loanId">{{o.loanTitle}}</a></td>
                                                <td>{{o.investAmt|formatCurrency}}</td>
                                                <td>{{o.platRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td>{{o.loanPeriod}}{{o.periodtUnitStr}}</td>
                                                <td>满标中&nbsp;{{o.percent}}%</td>
                                                <td><a class="text-primary" :href="'/member/invest/investing-details/'+o.investId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="7"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="investData1.hasPage">
                                        <a-pagination :pageNo="investData1.pageNo" :pageSize="investData1.pageSize" :total="investData1.total" @change="initInvestData1"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane :tab="'持有中('+investData2.total+')'" key="2">
                                <div class="bd pd-20">
                                    <ul class="mu-autobid-data clearfix mt-20">
                                        <li>
                                            <span>待收本金(元)</span>
                                            <em class="txtInvestAmt">{{user.holdPrincipal|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>待收收益(元)</span>
                                            <em class="txtIncomeAmt">{{user.holdIncome|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40">
                                        <thead>
                                            <tr>
                                                <th>项目名称</th>
                                                <th>待收本金（元）</th>
                                                <th>协议约定年化利率</th>
                                                <th>待收收益（元）</th>
                                                <th>回款期数</th>
                                                <th>回款时间</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="investData2.dataList && investData2.dataList.length>0">
                                            <tr v-for="(o,index) in investData2.dataList" :key="'repay'+index">
                                                <td><a class="text-primary" :href="'/spa/product/detail/'+o.loanId">{{o.loanTitle}}</a><ULabel v-if="o.isPlan" class="ml-5" type="orange" size="small" content="易" notes="此资产为易智投退出后的散标资产"/></td>
                                                <td>{{o.sumPrincipal|formatCurrency}}</td>
                                                <td>{{o.platRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td>{{o.planIncome|formatCurrency}}</td>
                                                <td>{{o.repayPeriod}}/{{o.planPeriod}}</td>
                                                <td>{{o.nextRepayTime|dateformat}}</td>
                                                <td><div class="line2"><a class="text-primary" :href="'/member/invest/detail/'+o.debtId">查看详情</a>
                                                    <br v-if="o.isTransferApplyStatus"><router-link class="btn btn-primary btn-transfer" :to="'/spa/member/transfer/apply/'+o.debtId" v-if="o.isTransferApplyStatus">转让</router-link>
                                                </div></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="7"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="investData2.hasPage">
                                        <a-pagination :pageNo="investData2.pageNo" :pageSize="investData2.pageSize" :total="investData2.total" @change="initInvestData2"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane :tab="'转让中('+investData3.total+')'" key="3">
                                <div class="bd pd-20">
                                    <table class="mu-table text-c">
                                        <thead>
                                            <tr>
                                                <th>申请日期</th>
                                                <th>项目名称</th>
                                                <th>转让金额（元）</th>
                                                <th>手续费（元）</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="investData3.dataList && investData3.dataList.length>0">
                                            <tr v-for="(o,index) in investData3.dataList" :key="'repay'+index">
                                                <td>{{o.createTime|dateformat}}</td>
                                                <td><a class="text-primary" :href="'/spa/transfer/detail/'+o.transferApplyId">{{o.loanTitle}}</a><ULabel v-if="o.isPlan" class="ml-5" type="orange" size="small" content="易" notes="此资产为易智投退出后的散标资产"/></td>
                                                <td>{{o.transferPrice|formatCurrency}}</td>
                                                <td>{{o.transferFee|formatCurrency}}</td>
                                                <td v-if="o.applyStatus==1">转让审核中</td>
                                                <td v-else-if="o.applyStatus==2">转让中</td>
                                                <td v-else-if="o.applyStatus==3">已转让</td>
                                                <td v-else-if="o.applyStatus==4">已撤销</td>
                                                <td v-else-if="o.applyStatus==5">临时下架</td>
                                                <td><div class="line2"><a class="text-primary" :href="'/member/transfer/detail/'+o.debtId">查看详情</a>
                                                    <br><a class="btn btn-primary btn-cancel" href="javascript:;;" @click="cacelTransfer(o.transferApplyId)">撤销</a>
                                                </div></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="investData3.hasPage">
                                        <a-pagination :pageNo="investData3.pageNo" :pageSize="investData3.pageSize" :total="investData3.total" @change="initInvestData3"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane tab="已结清" key="4">
                                <div class="bd pd-20">
                                    <ul class="mu-autobid-data clearfix mt-20">
                                        <li>
                                            <span>已收本金(元)</span>
                                            <em class="txtInvestAmt">{{user.endPrincipal|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>已收收益(元)</span>
                                            <em class="txtIncomeAmt">{{user.endIncome|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40">
                                        <thead>
                                            <tr>
                                                <th>项目名称</th>
                                                <th>出借本金（元）</th>
                                                <th>已收收益（元）</th>
                                                <th>到期时间</th>
                                                <th>协议约定年化利率</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="investData4.dataList && investData4.dataList.length>0">
                                            <tr v-for="(o,index) in investData4.dataList" :key="'repay'+index">
                                                <td><a class="text-primary" :href="'/spa/product/detail/'+o.loanId">{{o.loanTitle}}</a><ULabel v-if="o.isPlan" class="ml-5" type="orange" size="small" content="易" notes="此资产为易智投退出后的散标资产"/></td>
                                                <td>{{o.buyPrice|formatCurrency}}</td>
                                                <td>{{o.totalIncome|formatCurrency}}</td>
                                                <td>{{o.settleDate|dateformat}}</td>
                                                <td>{{o.platRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td><a class="text-primary" :href="'/member/invest/detail/'+o.debtId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="investData4.hasPage">
                                        <a-pagination :pageNo="investData4.pageNo" :pageSize="investData4.pageSize" :total="investData4.total" @change="initInvestData4"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane tab="已转让" key="5">
                                <div class="bd pd-20">
                                    <table class="mu-table text-c">
                                        <thead>
                                            <tr>
                                                <th>转让日期</th>
                                                <th>项目名称</th>
                                                <th>转让金额（元）</th>
                                                <th>手续费（元）</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="investData5.dataList && investData5.dataList.length>0">
                                            <tr v-for="(o,index) in investData5.dataList" :key="'repay'+index">
                                                <td>{{o.dealTime|dateformat}}</td>
                                                <td><a class="text-primary" :href="'/spa/product/detail/'+o.loanId">{{o.loanTitle}}</a><ULabel v-if="o.isPlan" class="ml-5" type="orange" size="small" content="易" notes="此资产为易智投退出后的散标资产"/></td>
                                                <td>{{o.transferPrice|formatCurrency}}</td>
                                                <td>{{o.transferFee|formatCurrency}}</td>
                                                <td v-if="o.applyStatus==1">转让审核中</td>
                                                <td v-else-if="o.applyStatus==2">转让中</td>
                                                <td v-else-if="o.applyStatus==3">已转让</td>
                                                <td v-else-if="o.applyStatus==4">已撤销</td>
                                                <td v-else-if="o.applyStatus==5">临时下架</td>
                                                <td><a class="text-primary" :href="'/member/transfer/detail/'+o.debtId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="investData5.hasPage">
                                        <a-pagination :pageNo="investData5.pageNo" :pageSize="investData5.pageSize" :total="investData5.total" @change="initInvestData5"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
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
import ULabel from '@/components/common/ULabel'
import {toJson,dateformat,formatCurrency} from '@/utils/utils'
import Vue from 'vue'
import {Pagination,Tabs} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Tabs)

export default {
    components:{
        Header,
        Footer,
        UserMenu,
        ULabel
    },
    data() { 
        return {
            ifInitDatas:false,
            user:{
                investPrincipal:0,
                investIncome:0,
                holdPrincipal:0,
                holdIncome:0,
                endPrincipal:0,
                endIncome:0,
            },
            investData1:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData2:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData3:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData4:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData5:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_hold'
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
        this.initInvestData1(1);
        this.initInvestData2(1);
        this.initInvestData3(1);
        this.initInvestData4(1);
        this.initInvestData5(1);
    },
    methods:{
        initData(){
            this.$post('/member/invest/hold-list').then(res => {
                this.user=toJson(res).data;
                this.ifInitDatas=true;
            })
        },
        initInvestData1(pageNo){
            this.$post('/member/invest/invest-list',{pageNo:pageNo,pageSize:this.investData1.pageSize}).then(res => {
                let result=toJson(res)
                this.investData1.dataList=result.data;
                this.investData1.total=result.count;
                this.investData1.hasPage=this.investData1.total>this.investData1.pageSize
            })
        },
        initInvestData2(pageNo){
            this.$post('/member/invest/repay-list',{pageNo:pageNo,pageSize:this.investData2.pageSize}).then(res => {
                let result=toJson(res)
                this.investData2.dataList=result.data;
                this.investData2.total=result.count;
                this.investData2.hasPage=this.investData2.total>this.investData2.pageSize
            })
        },
        initInvestData3(pageNo){
            this.$post('/member/transfer/transfer-list',{pageNo:pageNo,pageSize:this.investData3.pageSize}).then(res => {
                let result=toJson(res)
                this.investData3.dataList=result.data;
                this.investData3.total=result.count;
                this.investData3.hasPage=this.investData3.total>this.investData3.pageSize
            })
        },
        initInvestData4(pageNo){
            this.$post('/member/invest/repayed-list',{pageNo:pageNo,pageSize:this.investData4.pageSize}).then(res => {
                let result=toJson(res)
                this.investData4.dataList=result.data;
                this.investData4.total=result.count;
                this.investData4.hasPage=this.investData4.total>this.investData4.pageSize
            })
        },
        initInvestData5(pageNo){
            this.$post('/member/transfer/transfered-list',{pageNo:pageNo,pageSize:this.investData5.pageSize}).then(res => {
                let result=toJson(res)
                this.investData5.dataList=result.data;
                this.investData5.total=result.count;
                this.investData5.hasPage=this.investData5.total>this.investData5.pageSize
            })
        },
        cacelTransfer(transferApplyId){
            let _this=this;
            this.$confirm({
                title: '您确定要撤销该笔债权转让吗？',
                content: '',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    _this.$post('/member/transfer/cancel',{transferApplyId: transferApplyId}).then(res => {
                        let result=toJson(res)
                        if (result.success) {
                            _this.$layer.msg('撤销成功');
                            setTimeout(()=>{
                                window.location.reload();
                            },1000)
                        } else {
                            _this.$layer.msg(result.msg);
                        }
                    })
                },
                onCancel() {
                
                },
            });
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.btn-disabled,.btn-disabled:hover,.btn-disabled:focus,.btn-disabled:active {color:#999!important;background:none!important;}
.btn-primary,.btn-primary:hover{min-width:45px;padding:0 5px;line-height:22px;height:22px;font-size:12px;text-decoration:none!important;border-radius:22px;}
</style>
