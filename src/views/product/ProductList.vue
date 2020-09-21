<template>
    <div>
        <Header :pageInfo="pageInfo"/>
        <div class="g-mainer pb-40 bgproduct" v-if="!investResult.success">
            <div :style="'background:#000045 url('+bannerUrl+') no-repeat top center;height:260px;'"></div>
            <ListTab tabOn="product"/>
            <section class="screen-list">
                <div class="bd wp">
                    <ul>
                        <li>
                            <span class="title">借款期限</span>
                            <Condition val='' :active="condition.period" name="period" text='全部' @click="changeCondition"/>
                            <Condition val='1' :active="condition.period" name="period" text='3个月以内' @click="changeCondition"/>
                            <Condition val='2' :active="condition.period" name="period" text='3~6个月' @click="changeCondition"/>
                            <Condition val='3' :active="condition.period" name="period" text='7~12个月' @click="changeCondition"/>
                            <Condition val='4' :active="condition.period" name="period" text='12个月以上' @click="changeCondition"/>
                        </li>
                        <li data-type="period">
                            <span class="title">排序方式</span>
                            <URank name="" :active="condition.orderColumn" :orderSc="condition.orderSc" text="默认" class="mr-10" @click="changeRank"/>
                            <URank name="2" :active="condition.orderColumn" :orderSc="condition.orderSc" text="协议约定年化利率" class="mr-25" @click="changeRank"/>
                            <URank name="3" :active="condition.orderColumn" :orderSc="condition.orderSc" text="借款期限" class="mr-25" @click="changeRank"/>
                            <URank name="4" :active="condition.orderColumn" :orderSc="condition.orderSc" text="剩余可投" class="mr-25" @click="changeRank"/>
                        </li>
                        <li class="opt" data-type="prdType" v-show="moretypes">
                            <span class="title">标的类型</span>
                            <Condition val='' :active="condition.prdType" name="prdType" text='全部' @click="changeCondition"/>
                            <ULabel type="sn" size="small"/>
                            <Condition val='1' :active="condition.prdType" name="prdType" text='微农贷' @click="changeCondition"/>
                            <ULabel type="qn" size="small"/>
                            <Condition val='0' :active="condition.prdType" name="prdType" text='企链贷' @click="changeCondition"/>
                            <ULabel type="cb" size="small"/>
                            <Condition val='4' :active="condition.prdType" name="prdType" text='优车贷' @click="changeCondition"/>
                            <ULabel type="lb" size="small"/>
                            <Condition val='3' :active="condition.prdType" name="prdType" text='乐保贷' @click="changeCondition"/>
                            <ULabel type="wh" size="small"/>
                            <Condition val='2' :active="condition.prdType" name="prdType" text='微花贷' @click="changeCondition"/>
                            <ULabel type="wq" size="small"/>
                            <Condition val='5' :active="condition.prdType" name="prdType" text='微企贷' @click="changeCondition"/>
                        </li>
                        <li class="opt" data-type="status" v-show="moretypes">
                            <span class="title">标的状态</span>
                            <Condition val='' :active="condition.status" name="status" text='全部' @click="changeCondition"/>
                            <Condition val='1' :active="condition.status" name="status" text='投标中' @click="changeCondition"/>
                            <Condition val='2' :active="condition.status" name="status" text='放款中' @click="changeCondition"/>
                            <Condition val='3' :active="condition.status" name="status" text='还款中' @click="changeCondition"/>
                        </li>
                        <li class="opt" data-type="repayMode" v-show="moretypes">
                            <span class="title">还款方式</span>
                            <Condition val='' :active="condition.repayMode" name="repayMode" text='全部' @click="changeCondition"/>
                            <Condition val='2' :active="condition.repayMode" name="repayMode" text='一次还本付息' @click="changeCondition"/>
                            <Condition val='3' :active="condition.repayMode" name="repayMode" text='按月付息,到期还本' @click="changeCondition"/>
                            <Condition val='0' :active="condition.repayMode" name="repayMode" text='等额本息' @click="changeCondition"/>
                            <Condition val='1' :active="condition.repayMode" name="repayMode" text='等额本金' @click="changeCondition"/>
                        </li>
                    </ul>
                    <div class="moretype" @click="moretypes=!moretypes;" v-if="moretypes">收起<i class="icon-font icon-doubleup ml-5"></i></div>
                    <div class="moretype" @click="moretypes=!moretypes;" v-else>更多筛选条件(标的类型、还款方式)<i class="icon-font icon-doubledown ml-5"></i></div>
                </div>
            </section>
            <section class="m-bid wp mt-40">
                <div @click="toNewUrl('/spa/product/detail/'+loan.loanId)" class="item" v-for="(loan,index) in dataList" :key="'loan'+index">
                    <div class="hd"><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.loanTitle}}</div>
                    <table class="datatable">
                        <tr>
                            <td width="230">
                                <div class="rate text-warning">{{loan.platRate}}<em>%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em><ULabel class="ml-5" type="red" size="small" content="奖励" :movegap="3"  v-if="loan.awardRate&&(loan.awardRate>0)&&[2,5].includes(loan.loanStatus)"/></div>
                                <p>协议约定年化利率<Whattip :notes="whatnotes"/></p></td>
                            <td width="180">
                                <div class="limit">{{loan.loanPeriod}}<em> {{loan.periodStr}}</em></div>
                                <p>{{loan.repayModeStr}}</p>
                            </td>
                            <td width="280">
                                <div class="esidue">剩余可投(元)：<em>{{loan.remainAmount|formatCurrency}}</em></div>
                                <a-progress :percent="loan.percent" size="small" :strokeWidth="5" :status="'normal'" :strokeColor="'#3961cd'"/>
                            </td>
                            <td width="230" @click.stop style="position:relative;">
                                <InputNumber ref="inputnumber" :ifFocusEvent="true" :loanId="loan.loanId" :inputkey="'key'+index" :step="100" :min="(loan.remainAmount<loan.minAmt?loan.remainAmount:loan.minAmt)" :disabled="loan.loanStatus!=2" :max="loan.remainAmount" 
                                :type="'currency'" @focus="focusInputNumber" @change="changeInputNumber" :maxlength="8" placeholder="100" :defaultValue="0"/>
                                <Errortip :msg="loan.inputTip" v-if="loan.inputTip" size="small" class="inputtip"></Errortip>
                                <div class="availableAmt" v-if="pageInfo.loginInfo.isLogin && loan.ifShowAvailableAmt">可用余额：{{pageInfo.loginInfo.availableAmt|formatCurrency}}元</div>
                            </td>
                            <td class="text-c" v-if="loan.loanStatus == 13">
                                <div class="btn btn-disabled">{{loan.releaseTime|dateformat('HH:mm')}}开启</div>
                            </td>
                            <td class="text-c" v-else-if="loan.loanStatus == 5">
                                <div class="btn btn-disabled">放款中</div>
                            </td>
                            <td class="text-c" v-else-if="loan.loanStatus == 6">
                                <div class="btn btn-disabled">还款中</div>
                            </td>
                            <td class="text-c" v-else-if="(loan.loanStatus == 7) || (loan.loanStatus ==8) || (loan.loanStatus == 9)">
                                <div class="btn btn-disabled">已还清</div>
                            </td>
                            <td class="text-c" v-else-if="loan.loanStatus == 2 &&!pageInfo.loginInfo.isLogin" @click.stop>
                                <a class="btn btn-warning mr-10" href="javascript:;"  @click="ifShowLogin=true">立即出借</a>
                                <a class="btn btn-primary" href="javascript:;" @click="ifShowLogin=true">加入购物车</a>
                            </td>
                            <td class="text-c" v-else-if="loan.loanStatus == 2" @click.stop>
                                <a class="btn btn-warning mr-10" href="javascript:;" @click="confirmInvest(loan,index)">立即出借</a>
                                <a class="btn btn-primary" href="javascript:;" @click="addShopcart(loan,index)">加入购物车</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="page mt-40" v-if="bidData.hasPage">
                    <a-pagination :pageNo="condition.pageNo" :pageSize="condition.pageSize" :total="bidData.total" @change="initData"/>
                </div>
            </section>
        </div>
        <div class="g-mainer pt-50 pb-50 bgproduct" v-else>
            <InvestSuccess :investResult="investResult"></InvestSuccess>
        </div>
        <Footer :pageInfo="pageInfo"/>
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="ifShowLogin=false" :centered="true" width="490" :closable="false">
            <Login @loginSuccess="loginSuccess"></Login>
            <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
        </a-modal>
        <a-modal title="出借确认" :visible="ifConfirmInvest" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" @cancel="ifConfirmInvest=!ifConfirmInvest" :centered="true" width="560" :closable="false">
            <button type="button" class="closemodal" @click="ifConfirmInvest=!ifConfirmInvest"><i class="icon-font icon-close"></i></button>
            <InvestConfirm :loan="loan" :disabledSubmit="disabledSubmit" @closemodal="ifConfirmInvest=false" 
                @submitInvest="submitInvest" @changeAgreement="changeAgreement" @changeVoucher="changeVoucher"></InvestConfirm>
        </a-modal>
        <a-modal :title="false" :visible="ifShowRisk" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" :centered="true" width="560" :closable="false">
            <button type="button" class="closemodal" @click="ifShowRisk=false"><i class="icon-font icon-close"></i></button>
            <RiskTip :user="user" :loan="loan" :pageInfo="pageInfo" :isAssetstRisk="isAssetstRisk" @closemodal="ifShowRisk=false"></RiskTip>
        </a-modal>
        <a-modal :title="false" :visible="ifShowDeposit" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" :centered="true" width="610" :closable="false">
            <button type="button" class="closemodal" @click="ifShowDeposit=false"><i class="icon-font icon-close"></i></button>
            <Deposit></Deposit>
        </a-modal>
        <div class="ani-shopplus" v-if="ifShopAnimate"><i class="icon-font icon-shopcart"></i>+1</div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import ListTab from '@/components/product/ListTab'
import bannerUrl from '@/assets/images/product/banner_product.jpg'
import Whattip from '@/components/common/Whattip'
import ULabel from '@/components/common/ULabel'
import URank from '@/components/common/URank'
import Errortip from '@/components/common/Errortip'
import Condition from '@/components/product/Condition'
import ShopCart from '@/components/product/ShopCart'
import RiskTip from '@/components/product/RiskTip'
import InvestConfirm from '@/components/product/InvestConfirm'
import InvestSuccess from '@/components/product/InvestSuccess'
import InputNumber from '@/components/form/InputNumber'
import VoucherSelect from '@/components/form/VoucherSelect'
import Login from '@/components/layer/Login'
import Deposit from '@/components/layer/Deposit'
import {Progress,Pagination} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Progress)
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
import {loanMatchVoucher,initRisk} from '@/utils/product'

export default {
    components:{
        Header,
        Footer,
        ListTab,
        Whattip,
        ULabel,
        InputNumber,
        VoucherSelect,
        URank,
        Condition,
        Login,
        Deposit,
        Errortip,
        ShopCart,
        RiskTip,
        InvestConfirm,
        InvestSuccess,
    },
    data() {
        return {
            disabledSubmit:false,
            investResult:{
                success:false
            },
            ifShopAnimate:false,
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            loginStyle:{padding:'20px 0 10px'},
            layerStyle:{width:'560px',padding:0},
            ifShowLogin:false,
            ifConfirmInvest:false,
            ifShowRisk:false,
            ifShowDeposit:false,
            agreement:false,
            rateName:'协议约定年化利率',
            whatnotes:'此利率不构成亿钱贷对出借人的<br>任何承诺，最终收益以实际为准',
            moretypes:false,
            bannerUrl:bannerUrl,
            dataList:[],
            bidData:{
                total:0,
                hasPage:false,
            },
            loan:{},
            user:{},
            selectedRedTotal:[],
            selectedTicketTotal:[],
            isAssetstRisk:true,
            riskStr:'',
            currentTime:new Date(),
            condition:{
                pageNo:1,
                pageSize:10,
                period:'',
                prdType:'',
                status:'',
                repayMode:'',
                orderColumn:'',
                orderSc:'',
            },
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
        this.initData(1);
    },
    methods:{
        initData(pageNo){
            let params={}
            this.condition.pageNo=pageNo
            for (let [key, value] of Object.entries(this.condition)) {
                if(value) params[key]=value
            }
            this.$post('/product/list',params).then(res => {
                let result = toJson(res);
                this.bidData.total= result.count>300?300:result.count
                this.bidData.hasPage=this.bidData.total>this.condition.pageSize
                this.dataList=result.data;
                this.dataList.map((loan,index)=>{
                    loan.investAmt=0;
                    loan.ifShowAvailableAmt=false;
                    if(loan.loanStatus==2) loan.investAmt=loan.remainAmount
                    return loan
                })
            })
        },
        changeCondition(obj){
            this.condition[obj.name]=obj.val;
            this.initData(1);
        },
        changeRank(name){
            if(name==''){
                this.condition.orderSc=''
            }else{
                this.condition.orderSc=(name==this.condition.orderColumn && this.condition.orderSc=='DESC')?'ASC':'DESC'
            }
            this.condition.orderColumn=name
            this.initData(1);
        },
        focusInputNumber(result){
            this.dataList.forEach((loan,index)=>{
                if(loan.loanId==result.loanId){
                    loan.ifShowAvailableAmt=result.ifFocus;
                    Vue.set(this.dataList,index,loan)
                }
            })
        },
        changeInputNumber(result){
            this.dataList.forEach((loan,index)=>{
                if(loan.loanId==result.loanId){
                    loan.inputTip=''
                    if( result.value<(loan.minAmt?loan.minAmt:0) && loan.remainAmount>(loan.minAmt?loan.minAmt:0)){
                        loan.inputTip='最小出借金额为'+loan.minAmt+'元'
                    }
                    loan.investAmt=result.value;
                    Vue.set(this.dataList,index,loan)
                }
            })
        },
        changeVoucher(loan){ //选择优惠券
            this.loan={...this.loan,...loan}
        },
        checkInvestAmt(loan,index){
            if(!loan.investAmt){
                loan.inputTip='请输入出借金额';
                Vue.set(this.dataList,index,loan)
                return false;
            }else if(loan.remainAmount<(loan.minAmt?loan.minAmt:0)&&loan.investAmt==loan.remainAmount){
                return true;
            }else if(loan.investAmt<(loan.minAmt?loan.minAmt:0)){
                loan.inputTip='最小出借金额为'+(loan.remainAmount<loan.minAmt?loan.remainAmount:loan.minAmt)+'元';
                Vue.set(this.dataList,index,loan)
                return false;
            }
            return true;
        },
        confirmInvest(loan,index){
            this.loan={};
            this.$post('/product/detail?loanId='+loan.loanId).then(res => {
                if(res.success){
                    this.currentTime = toJson(res).currentTime
                    let result = toJson(res).data
                    //this.loan={...loan,...(result.assetsDetail)}
                    this.user={...result};
                    this.redList=result.voucherList
                    this.ticketList=result.ticketList

                    if(loan.loanStatus==2){
                        let loanMatch=loanMatchVoucher(loan,this.redList,this.ticketList)
                        this.loan={...loanMatch.loan};
                    }
                    let riskInfo=initRisk(this.pageInfo.loginInfo, this.user.riskGrade)
                    this.isAssetstRisk=riskInfo.isAssetstRisk
                    this.riskStr=riskInfo.riskStr
                    if(this.pageInfo.loginInfo.isDepositary==0){ //未开通存管
                        this.ifShowDeposit=true
                    }else if(!this.user.assessStatus||this.isAssetstRisk||(this.user.totalDue+this.loan.investAmt)>(this.user.userAssessLimit)*10000){ //风险评估检测
                        this.ifShowRisk=true;
                    }else if(this.checkInvestAmt(loan,index)){
                        this.ifConfirmInvest=true;
                    }
                }else{
                    alert("加载失败")
                }
            })
        },
        addShopcart(loan,index){
            this.$post('/product/detail?loanId='+loan.loanId).then(res0 => {
                if(res0.success){
                    let result = toJson(res0).data
                    this.user={...result};
                    let riskInfo=initRisk(this.pageInfo.loginInfo, this.user.riskGrade)
                    this.isAssetstRisk=riskInfo.isAssetstRisk
                    this.riskStr=riskInfo.riskStr
                    if(this.pageInfo.loginInfo.isDepositary==0){ //未开通存管
                        this.ifShowDeposit=true
                    }else if(!this.user.assessStatus||this.isAssetstRisk||(this.user.totalDue+this.loan.investAmt)>(this.user.userAssessLimit)*10000){ //风险评估检测
                        this.ifShowRisk=true;
                    }else if(this.checkInvestAmt(loan,index)){
                        this.$post('/product/buyCart/add',{loanId:loan.loanId,amt:loan.investAmt}).then(res => {
                            if(res.success){
                                this.ifShopAnimate=true;
                                setTimeout(() => {
                                    this.ifShopAnimate=false;
                                }, 1300);
                                this.pageInfo.loginInfo.itemCount=res.jsonData.itemCount
                                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                                this.$layer.msg('已成功加入购物车，请尽快确认支付~')
                            }else{
                                this.$layer.msg(res.msg)
                            }
                        })
                    }
                }else{
                    alert("加载失败")
                }
                
            })
        },
        toNewUrl(url){
            window.open(this.$router.resolve(url).href, '_blank')
        },
        loginSuccess(){//登录成功
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.ifShowLogin=false
                this.initData(1)
            })
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
        submitInvest(){//出借确认
            if(this.agreement){
                let params={};
                params.investAmount=this.loan.investAmt;
                params.loanId=this.loan.loanId;
                params.couponIdsStr=this.loan.selectedRedList.join(',');
                params.ticket=this.loan.selectedTicket
                this.disabledSubmit=true
                this.$post('/product/invest/confirm',params).then(res=>{
                    let result=toJson(res)
                    this.ifConfirmInvest=false;
                    this.disabledSubmit=false
                    if(result.success){
                        this.investResult.success=true
                        this.investResult={...this.investResult,...result.data[0]};
                    }else{
                        this.$layer.msg(result.msg)
                    }
                })
            }else{
                this.$layer.msg('请勾选项目借款协议')
            }
        },
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/product.less";
.m-bid .inputtip{position: absolute;left:10px;bottom:5px;line-height:20px;}
.m-bid .availableAmt{position: absolute;left:10px;bottom:80px;line-height:20px;}
</style>