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
                            <a-tab-pane :tab="'申请中('+autobidData1.total+')'" key="1">
                                <div class="bd pd-20">
                                    <div class="u-wxtip">当天17点前发布的易智投，将会在当天17点结束募集；当天17点后发布的易智投，将在次日17点结束募集。</div>
                                    <ul class="mu-autobid-data clearfix mt-40">
                                        <li>
                                            <span>委托出借本金(元)</span>
                                            <em class="txtInvestAmt">{{autobidData1.invest|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>预期收益(元)</span>
                                            <em class="txtIncomeAmt">{{autobidData1.income|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40" >
                                        <thead>
                                            <tr>
                                                <th>委托时间</th>
                                                <th>易智投服务编号</th>
                                                <th>委托出借本金（元）</th>
                                                <th>协议约定年化利率</th>
                                                <th>委托期限</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="autobidData1.dataList && autobidData1.dataList.length>0">
                                            <tr v-for="(o,index) in autobidData1.dataList" :key="'investing'+index">
                                                <td>{{o.investTime|dateformat}}</td>
                                                <td>{{o.prdNo}}</td>
                                                <td>{{o.investAmount|formatCurrency}}</td>
                                                <td>{{o.prdRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td>{{o.prdPeriodStr}}</td>
                                                <td><a class="text-primary" :href="'/member/plan/autobidDetail/'+o.investId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="autobidData1.hasPage">
                                        <a-pagination :pageNo="autobidData1.pageNo" :pageSize="autobidData1.pageSize" :total="autobidData1.total" @change="initAutobidData1"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane :tab="'持有中('+autobidData2.total+')'" key="2">
                                <div class="bd pd-20">
                                    <ul class="mu-autobid-data clearfix mt-20">
                                        <li>
                                            <span>待收本金(元)</span>
                                            <em class="txtInvestAmt">{{autobidData2.invest|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>待收收益(元)</span>
                                            <em class="txtIncomeAmt">{{autobidData2.income|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40">
                                        <thead>
                                            <tr>
                                                <th>易智投服务编号</th>
                                                <th>待收本金（元）</th>
                                                <th>协议约定年化利率</th>
                                                <th>待收收益（元）</th>
                                                <th>到期时间</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="autobidData2.dataList && autobidData2.dataList.length>0">
                                            <tr v-for="(o,index) in autobidData2.dataList" :key="'repaying'+index">
                                                <td>{{o.prdNo}}<span class="label-exit ml-5" v-if="o.investStatus==6">退出中</span></td>
                                                <td>{{o.investAmount|formatCurrency}}</td>
                                                <td>{{o.prdRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td>{{o.expectIncome|formatCurrency}}</td>
                                                <td>{{o.settleDate|dateformat}}</td>
                                                <td><a class="text-primary" :href="'/member/plan/autobidDetail/'+o.investId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="autobidData2.hasPage">
                                        <a-pagination :pageNo="autobidData2.pageNo" :pageSize="autobidData2.pageSize" :total="autobidData2.total" @change="initAutobidData2"/>
                                    </div>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane tab="已到期" key="3">
                                <div class="bd pd-20">
                                    <ul class="mu-autobid-data clearfix mt-20">
                                        <li>
                                            <span>已收本金(元)</span>
                                            <em class="txtInvestAmt">{{autobidData3.invest|formatCurrency}}</em>
                                        </li>
                                        <li>
                                            <span>已收收益(元)</span>
                                            <em class="txtIncomeAmt">{{autobidData3.income|formatCurrency}}</em>
                                        </li>
                                    </ul>
                                    <table class="mu-table text-c mt-40">
                                        <thead>
                                            <tr>
                                                <th>易智投服务编号</th>
                                                <th>已收本金（元）</th>
                                                <th>协议约定年化利率</th>
                                                <th>已收收益（元）</th>
                                                <th>到期时间</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="autobidData3.dataList && autobidData3.dataList.length>0">
                                            <tr v-for="(o,index) in autobidData3.dataList" :key="'repaying'+index">
                                                <td>{{o.prdNo}}<span class="label-exit ml-5" v-if="o.quitStatus==2">提前终止</span></td>
                                                <td>{{o.investAmount|formatCurrency}}</td>
                                                <td>{{o.prdRate|formatCurrency}}%<span v-if="o.awardRate && o.awardRate>0">+{{o.awardRate}}%</span></td>
                                                <td>{{o.expectIncome|formatCurrency}}</td>
                                                <td>{{o.settleDate|dateformat}}</td>
                                                <td><a class="text-primary" :href="'/member/plan/autobidDetail/'+o.investId">查看详情</a></td>
                                            </tr> 
                                        </tbody>
                                        <tbody v-else>
                                            <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                        </tbody>
                                    </table>
                                    <div class="page mt-40 mb-20" v-if="autobidData3.hasPage">
                                        <a-pagination :pageNo="autobidData3.pageNo" :pageSize="autobidData3.pageSize" :total="autobidData3.total" @change="initAutobidData3"/>
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
            ifInitDatas:false,
            autobidData1:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            autobidData2:{
                income:0,
                invest:0,
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            autobidData3:{
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
                userOn:'user_autobid'
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
        this.initAutobidData1(1);
        this.initAutobidData2(1);
        this.initAutobidData3(1);
    },
    methods:{
        initAutobidData1(pageNo){
            this.$post('/member/plan/investing',{pageNo:pageNo,pageSize:this.autobidData1.pageSize,type:1}).then(res => {
                let result=toJson(res)
                this.autobidData1.dataList=result.pageList.result;
                this.autobidData1.total=result.pageList.totalCount;
                this.autobidData1.hasPage=this.autobidData1.total>this.autobidData1.pageSize
                this.autobidData1.income=result.income
                this.autobidData1.invest=result.invest
                this.ifInitDatas=true;
            })
        },
        initAutobidData2(pageNo){
            this.$post('/member/plan/repaying',{pageNo:pageNo,pageSize:this.autobidData2.pageSize,type:2}).then(res => {
                let result=toJson(res)
                this.autobidData2.dataList=result.pageList.result;
                this.autobidData2.total=result.pageList.totalCount;
                this.autobidData2.hasPage=this.autobidData2.total>this.autobidData2.pageSize
                this.autobidData2.income=result.income
                this.autobidData2.invest=result.invest
                this.ifInitDatas=true;
            })
        },
        initAutobidData3(pageNo){
            this.$post('/member/plan/repayed',{pageNo:pageNo,pageSize:this.autobidData3.pageSize,type:3}).then(res => {
                let result=toJson(res)
                this.autobidData3.dataList=result.pageList.result;
                this.autobidData3.total=result.pageList.totalCount;
                this.autobidData3.hasPage=this.autobidData3.total>this.autobidData3.pageSize
                this.autobidData3.income=result.income
                this.autobidData3.invest=result.invest
                this.ifInitDatas=true;
            })
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.label-exit{color:#993333;border:1px solid #b56c6c;border-radius:3px;font-size:12px;padding:3px 5px;}
</style>