<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-deal" v-show="ifInitDatas">
                        <a-tabs class="ant-tabs-yqd" defaultActiveKey="1" size="large">
                            <a-tab-pane :tab="'待回款'" key="1">
                                <div class="pt-40 pb-40 mu-model">
                                    <ul class="mu-autobid-data clearfix">
                                        <li>
                                            <span>总待收本金(元)</span>
                                            <em class="txtInvestAmt">{{user.planAmt|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>总待收收益(元)</span>
                                            <em class="txtIncomeAmt">{{user.planIncome|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                </div>
                                <a-tabs defaultActiveKey="2" size="large" class="ant-tabs-yqd2 mt-20">
                                    <a-tab-pane tab="易智投" key="1">
                                        <section class="mu-model pd-10 pb-30">
                                            <div class="pd-20 clearfix">
                                                <div class="l l30 c-666" v-show="investData1.ifShowQueryTotal">查询结果统计：待收本金<span>{{investData1.principal|formatCurrency}}</span>元；待收收益<span>{{investData1.income|formatCurrency}}</span>元</div>
                                                <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData1(1)">查询</button></div>
                                                <div class="r pl-10">
                                                    <select v-model="investData1.queryTime" class="select">
                                                        <option value='all' selected="selected">全部</option>
                                                        <option value='30'>未来一个月</option>
                                                        <option value='90'>未来三个月</option>
                                                        <option value='180'>未来半年</option>
                                                        <option value='0'>自定义</option>
                                                    </select>
                                                </div>
                                                <div class="r pl-10" v-show="investData1.queryTime=='0'">
                                                    <a-range-picker @change="onChangeDate1"/>
                                                </div>
                                            </div>
                                            <table class="mu-table text-c" >
                                                <thead>
                                                    <tr>
                                                        <th>回款日期<Whattip width="312px" notes="易智投服务到期日并不代表实际回款时间，<br>实际回款时间以全部债权退出完成时间为准。"/></th>
                                                        <th>易智投服务编号</th>
                                                        <th>待收本金(元)</th>
                                                        <th>待收收益(元)</th>
                                                    </tr>
                                                </thead>
                                                <tbody  v-if="investData1.dataList && investData1.dataList.length>0">
                                                    <tr v-for="(o,index) in investData1.dataList" :key="'invest1'+index">
                                                        <td>{{o.settleDate|dateformat}}</td>
                                                        <td>{{o.prdName}}</td>
                                                        <td v-if="investData1.investType==1">{{o.period}}</td>
                                                        <td>{{o.principal|formatCurrency}}</td>
                                                        <td>{{o.allIncome|formatCurrency}}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                                </tbody>
                                            </table>
                                            <div class="page mt-40 mb-20" v-if="investData1.hasPage">
                                                <a-pagination :pageNo="investData1.pageNo" :pageSize="investData1.pageSize" :total="investData1.total" @change="initInvestData1"/>
                                            </div>
                                        </section>
                                    </a-tab-pane>
                                    <a-tab-pane tab="散标资产" key="2">
                                        <section class="mu-model pd-10 pb-30">
                                            <div class="pd-20 clearfix">
                                                <div class="l l30 c-666" v-show="investData2.ifShowQueryTotal">查询结果统计：待收本金<span>{{investData2.principal|formatCurrency}}</span>元；待收收益<span>{{investData2.income|formatCurrency}}</span>元</div>
                                                <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData2(1)">查询</button></div>
                                                <div class="r pl-10">
                                                    <select v-model="investData2.queryTime" class="select">
                                                        <option value='all' selected="selected">全部</option>
                                                        <option value='30'>未来一个月</option>
                                                        <option value='90'>未来三个月</option>
                                                        <option value='180'>未来半年</option>
                                                        <option value='0'>自定义</option>
                                                    </select>
                                                </div>
                                                <div class="r pl-10" v-show="investData2.queryTime=='0'">
                                                    <a-range-picker @change="onChangeDate2"/>
                                                </div>
                                            </div>
                                            <table class="mu-table text-c" >
                                                <thead>
                                                    <tr>
                                                        <th>回款日期</th>
                                                        <th>项目名称</th>
                                                        <th>期数</th>
                                                        <th>待收本金(元)</th>
                                                        <th>待收收益(元)</th>
                                                    </tr>
                                                </thead>
                                                <tbody  v-if="investData2.dataList && investData2.dataList.length>0">
                                                    <tr v-for="(o,index) in investData2.dataList" :key="'invest2'+index">
                                                        <td>{{o.settleDate|dateformat}}</td>
                                                        <td>{{o.prdName}}</td>
                                                        <td v-if="investData2.investType==1">{{o.period}}</td>
                                                        <td>{{o.principal|formatCurrency}}</td>
                                                        <td>{{o.allIncome|formatCurrency}}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                                </tbody>
                                            </table>
                                            <div class="page mt-40 mb-20" v-if="investData2.hasPage">
                                                <a-pagination :pageNo="investData2.pageNo" :pageSize="investData2.pageSize" :total="investData2.total" @change="initInvestData2"/>
                                            </div>
                                        </section>
                                    </a-tab-pane>
                                </a-tabs>
                            </a-tab-pane>
                            <a-tab-pane :tab="'已回款'" key="2">
                                <div class="pt-40 pb-40 mu-model">
                                    <ul class="mu-autobid-data clearfix">
                                        <li>
                                            <span>已回本金总额(元)</span>
                                            <em class="txtInvestAmt">{{user.receiveAmt|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>已收收益总额(元)</span>
                                            <em class="txtIncomeAmt">{{user.receiveIncome|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                </div>
                                <a-tabs defaultActiveKey="1" size="large" class="ant-tabs-yqd2 mt-20">
                                    <a-tab-pane tab="易智投" key="1">
                                        <section class="mu-model pd-10 pb-30">
                                            <div class="pd-20 clearfix">
                                                <div class="l l30 c-666" v-show="investData3.ifShowQueryTotal">查询结果统计：已收本金<span>{{investData3.principal|formatCurrency}}</span>元；已收收益<span>{{investData3.income|formatCurrency}}</span>元</div>
                                                <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData3(1)">查询</button></div>
                                                <div class="r pl-10">
                                                    <select v-model="investData3.queryTime" class="select">
                                                        <option value='all' selected="selected">全部</option>
                                                        <option value='30'>过去一个月</option>
                                                        <option value='90'>过去三个月</option>
                                                        <option value='180'>过去半年</option>
                                                        <option value='0'>自定义</option>
                                                    </select>
                                                </div>
                                                <div class="r pl-10" v-show="investData3.queryTime=='0'">
                                                    <a-range-picker @change="onChangeDate3" :disabledDate="disabledDate"/>
                                                </div>
                                            </div>
                                            <table class="mu-table text-c" >
                                                <thead>
                                                    <tr>
                                                        <th>回款日期</th>
                                                        <th>易智投服务编号</th>
                                                        <th>已收本金(元)</th>
                                                        <th>已收收益(元)</th>
                                                    </tr>
                                                </thead>
                                                <tbody  v-if="investData3.dataList && investData3.dataList.length>0">
                                                    <tr v-for="(o,index) in investData3.dataList" :key="'invest1'+index">
                                                        <td>{{o.settleDate|dateformat}}</td>
                                                        <td>{{o.prdName}}</td>
                                                        <td v-if="investData3.investType==1">{{o.period}}</td>
                                                        <td>{{o.principal|formatCurrency}}</td>
                                                        <td>{{o.allIncome|formatCurrency}}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                                </tbody>
                                            </table>
                                            <div class="page mt-40 mb-20" v-if="investData3.hasPage">
                                                <a-pagination :pageNo="investData3.pageNo" :pageSize="investData3.pageSize" :total="investData3.total" @change="initInvestData3"/>
                                            </div>
                                        </section>
                                    </a-tab-pane>
                                    <a-tab-pane tab="散标资产" key="2">
                                        <section class="mu-model pd-10 pb-30">
                                            <div class="pd-20 clearfix">
                                                <div class="l l30 c-666" v-show="investData4.ifShowQueryTotal">查询结果统计：已收本金<span>{{investData4.principal|formatCurrency}}</span>元；已收收益<span>{{investData4.income|formatCurrency}}</span>元</div>
                                                <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData4(1)">查询</button></div>
                                                <div class="r pl-10">
                                                    <select v-model="investData4.queryTime" class="select">
                                                        <option value='all' selected="selected">全部</option>
                                                        <option value='30'>过去一个月</option>
                                                        <option value='90'>过去三个月</option>
                                                        <option value='180'>过去半年</option>
                                                        <option value='0'>自定义</option>
                                                    </select>
                                                </div>
                                                <div class="r pl-10" v-show="investData4.queryTime=='0'">
                                                    <a-range-picker @change="onChangeDate4" :disabledDate="disabledDate"/>
                                                </div>
                                            </div>
                                            <table class="mu-table text-c" >
                                                <thead>
                                                    <tr>
                                                        <th>回款日期</th>
                                                        <th>项目名称</th>
                                                        <th>期数</th>
                                                        <th>已回本金(元)</th>
                                                        <th>已收收益(元)</th>
                                                    </tr>
                                                </thead>
                                                <tbody  v-if="investData4.dataList && investData4.dataList.length>0">
                                                    <tr v-for="(o,index) in investData4.dataList" :key="'invest2'+index">
                                                        <td>{{o.settleDate|dateformat}}</td>
                                                        <td>{{o.prdName}}</td>
                                                        <td v-if="investData4.investType==1">{{o.period}}</td>
                                                        <td>{{o.principal|formatCurrency}}</td>
                                                        <td>{{o.allIncome|formatCurrency}}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                                </tbody>
                                            </table>
                                            <div class="page mt-40 mb-20" v-if="investData4.hasPage">
                                                <a-pagination :pageNo="investData4.pageNo" :pageSize="investData4.pageSize" :total="investData4.total" @change="initInvestData4"/>
                                            </div>
                                        </section>
                                    </a-tab-pane>
                                </a-tabs>
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
            ifInitDatas:false,
            user:{
                planAmt:0,
                planIncome:0,
                receiveAmt:0,
                receiveIncome:0,
            },
            ifAutobid1:true,
            ifAutobid2:true,
            investData1:{
                ifShowQueryTotal:false,
                principal:0,
                income:0,
                investType:3,
                status:1,
                startDate:'',
                endDate:'',
                queryTime:'all',
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData2:{
                ifShowQueryTotal:false,
                principal:0,
                income:0,
                investType:1,
                status:1,
                startDate:'',
                endDate:'',
                queryTime:'all',
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData3:{
                ifShowQueryTotal:false,
                principal:0,
                income:0,
                investType:3,
                status:2,
                startDate:'',
                endDate:'',
                queryTime:'all',
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            investData4:{
                ifShowQueryTotal:false,
                principal:0,
                income:0,
                investType:1,
                status:2,
                startDate:'',
                endDate:'',
                queryTime:'all',
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_plan'
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
    },
    methods:{
        initData(){
            this.$post('/member/invest/backplan').then(res => {
                this.user=toJson(res).data;
                this.ifInitDatas=true;
            })
        },
        initInvestData1(pageNo){
            this.$post('/member/invest/plan-record',{   
                pageNo:pageNo,
                pageSize:this.investData1.pageSize,
                investType:this.investData1.investType,
                status:this.investData1.status,
                startDate:this.investData1.startDate,
                endDate:this.investData1.endDate,
                queryTime:this.investData1.queryTime,
            }).then(res => {
                let result=toJson(res).data;
                this.investData1.ifShowQueryTotal=(this.investData1.queryTime!='all');
                this.investData1.principal=result.principal;
                this.investData1.income=result.income;
                this.investData1.dataList=result.record;
                this.investData1.total=result.page.totalCount;
                this.investData1.hasPage=this.investData1.total>this.investData1.pageSize
            })
        },
        initInvestData2(pageNo){
            this.$post('/member/invest/plan-record',{   
                pageNo:pageNo,
                pageSize:this.investData2.pageSize,
                investType:this.investData2.investType,
                status:this.investData2.status,
                startDate:this.investData2.startDate,
                endDate:this.investData2.endDate,
                queryTime:this.investData2.queryTime,
            }).then(res => {
                let result=toJson(res).data
                this.investData2.ifShowQueryTotal=(this.investData2.queryTime!='all');
                this.investData2.principal=result.principal;
                this.investData2.income=result.income;
                this.investData2.dataList=result.record;
                this.investData2.total=result.page.totalCount;
                this.investData2.hasPage=this.investData2.total>this.investData2.pageSize
            })
        },
        initInvestData3(pageNo){
            this.$post('/member/invest/plan-record',{   
                pageNo:pageNo,
                pageSize:this.investData3.pageSize,
                investType:this.investData3.investType,
                status:this.investData3.status,
                startDate:this.investData3.startDate,
                endDate:this.investData3.endDate,
                queryTime:this.investData3.queryTime,
            }).then(res => {
                let result=toJson(res).data
                this.investData3.ifShowQueryTotal=(this.investData3.queryTime!='all');
                this.investData3.principal=result.principal;
                this.investData3.income=result.income;
                this.investData3.dataList=result.record;
                this.investData3.total=result.page.totalCount;
                this.investData3.hasPage=this.investData3.total>this.investData3.pageSize
            })
        },
        initInvestData4(pageNo){
            this.$post('/member/invest/plan-record',{   
                pageNo:pageNo,
                pageSize:this.investData4.pageSize,
                investType:this.investData4.investType,
                status:this.investData4.status,
                startDate:this.investData4.startDate,
                endDate:this.investData4.endDate,
                queryTime:this.investData4.queryTime,
            }).then(res => {
                let result=toJson(res).data
                this.investData4.ifShowQueryTotal=(this.investData4.queryTime!='all');
                this.investData4.principal=result.principal;
                this.investData4.income=result.income;
                this.investData4.dataList=result.record;
                this.investData4.total=result.page.totalCount;
                this.investData4.hasPage=this.investData4.total>this.investData4.pageSize
            })
        },
        onChangeDate1(date, dateString) {
            this.investData1.startDate=dateString[0];
            this.investData1.endDate=dateString[1];
        },
        onChangeDate2(date, dateString) {
            this.investData2.startDate=dateString[0];
            this.investData2.endDate=dateString[1];
        },
        onChangeDate3(date, dateString) {
            this.investData3.startDate=dateString[0];
            this.investData3.endDate=dateString[1];
        },
        onChangeDate4(date, dateString) {
            this.investData4.startDate=dateString[0];
            this.investData4.endDate=dateString[1];
        },
        disabledDate(current) {
            return current && current > this.moment().endOf('day');
        },
    },
 }
</script>
<style scoped>
</style>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
</style>
