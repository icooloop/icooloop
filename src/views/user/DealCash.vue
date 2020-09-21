<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right" v-show="ifInitDatas">
                        <div class="mu-title"><h4>提现记录</h4><div class="more"><router-link to="/spa/member/account/cash" class="btn btn-info">返 回</router-link></div></div>
            	        <section class="mu-model mu-deal pd-10 pb-30">
                            <div class="pd-20 clearfix">
                                <div class="l f-16"><span class="f-12 text-muted">提现总金额(元)：</span><span>{{cashAmtSum|formatCurrency}}</span></div>
                    	        <div class="r pl-10"><button class="btn btn-primary btn-search" type="button" @click="initInvestData(1)">查询</button></div>
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
                                    <a-range-picker @change="onChangeDate" v-model="queryDate" :disabledDate="disabledDate"/>
                                </div>
                            </div>
                            <table class="mu-table text-c" >
                                <thead>
                                    <tr><th>提现时间</th><th>提现金额（元）</th><th>提现方式</th><th>提现手续费（元）</th><th>实际到账金额（元）</th><th>提现状态</th></tr>
                                </thead>
                                <tbody  v-if="investData.dataList && investData.dataList.length>0">
                                    <tr v-for="(o,index) in investData.dataList" :key="'cash'+index">
                                        <td>{{o.createTime|dateformat}}</td>
                                        <td>{{o.amt|formatCurrency}}</td>
                                        <td>{{o.withdrawTypeCnCH}}</td>
                                        <td>{{o.feeAmt|formatCurrency}}</td>
                                        <td>{{formatCurrency(o.feeAmt?(o.amt-o.feeAmt):o.amt)}}</td>
                                        <td v-if="o.canCancelCash"><div class="line2">
                                            <span :class="getResultClass(o.orderStatusCn)">{{o.orderStatusCn}}</span>
                                            <br><a class="btn btn-cancel cashcancel" href="javascript:;" @click="cancelCash(o.withdrawalId)">取消提现</a></div>
                                        </td>
                                        <td v-else><span :class="getResultClass(o.orderStatusCn)">{{o.orderStatusCn}}</span></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr><td colspan="6"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                </tbody>
                            </table>
                            <div class="page mt-40 mb-20" v-if="investData.hasPage">
                                <a-pagination :pageNo="investData.pageNo" :pageSize="investData.pageSize" :total="investData.total" @change="initInvestData"/>
                            </div>
                        </section>
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
            user:{},
            cashAmtSum:0,
            queryTime:'30',
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
                userOn:'user_cash'
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
        this.changeQueryTime();
        this.initInvestData(1);
    },
    methods:{
        formatCurrency,
        initInvestData(pageNo){
            this.$post('/member/deal/cash',{   
                pageNo:pageNo,
                pageSize:this.investData.pageSize,
                startTime:this.queryDate[0]?this.queryDate[0].format('YYYY-MM-DD'):'',
                endTime:this.queryDate[1]?this.queryDate[1].format('YYYY-MM-DD'):'',
            }).then(res => {
                let result=toJson(res).data;
                this.cashAmtSum=result.cashAmtSum
                this.investData.dataList=result.record;
                this.investData.total=result.page.totalCount;
                this.investData.hasPage=this.investData.total>this.investData.pageSize
                this.ifInitDatas=true;
            })
        },
        cancelCash(cashId){
            let _this=this;
            this.$confirm({
                title: '您确定要取消这笔提现申请吗',
                content: '',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    _this.$post('/member/account/cashCancel',{"cashId":cashId}).then(res => {
                        let result=toJson(res)
                        if (result.success) {
                            _this.$layer.msg('取消成功!');
                            _this.investData.dataList.map(item=>{
                                if(item.withdrawalId==cashId){
                                    item.canCancelCash=false;
                                    item.orderStatusCn='失败'
                                }
                                return item;
                            })
                        } else {
                            _this.$layer.msg(result.msg);
                        }
                    })
                },
                onCancel() {
                
                },
            });
        },
        onChangeDate(date, dateString) {
            this.investData.startTime=dateString[0];
            this.investData.endTime=dateString[1];
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
        },
        getResultClass(result){
            if(result=='成功'){
                return 'text-warning'
            }else if(result=='失败'){
                return 'text-second'
            }else{
                return 'text-primary'
            }
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.btn-cancel,.btn-cancel:hover{color:#3961cd;border:1px solid #3961cd;background:none;min-width:40px;padding:0 10px;line-height:22px;height:22px;font-size:12px;text-decoration:none!important;border-radius:22px;}
</style>