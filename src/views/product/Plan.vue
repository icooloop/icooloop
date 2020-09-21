<template>
    <div>
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer pb-40 bgproduct" v-if="!investResult.success">
            <div :style="'background:#201679 url('+bannerUrl+') no-repeat top center;height:260px;'"></div>
            <ListTab tabOn="plan"></ListTab>
            <div class="wp">
                <div class="mp-plan-bid mt-30">
                    <div class="title">{{loan.title}} {{loan.prdNo}}
                        <ULabel class="ml-10" type="red" size="small" content="新手专享" v-if="loan.isNewserBid"></ULabel>
                        <ULabel class="ml-10" type="orange" size="small" content="限额3万" v-if="loan.isNewserBid"></ULabel>
                    </div>
                    <div class="bd">
                        <a-row class="rates">
                            <a-col :span="7">
                                <h2 class="text-warning">{{loan.defaultRate}}<em>%<span v-if="loan.awardRate && loan.awardRate>0">+{{loan.awardRate}}%</span></em></h2>
                                <p class="mt-5">协议约定年化利率<Whattip width="200px" notes="此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准"></Whattip></p>
                            </a-col>
                            <a-col :span="7" class="text-c border1">
                                <h2><span class="text-warning">{{loan.period}}</span><em>{{loan.periodUnit==0?'天':'个月'}}</em></h2>
                                <p class="mt-5">委托期限<Whattip width="200px" notes="委托期限指亿钱贷为出借人提供“易智投”出借服务的期限，委托出借的实际标的期限可能会超过委托期限，委托期满，未到期的可发起债权转让，平台不承诺债权转让成功。"></Whattip></p>
                            </a-col>
                            <a-col :span="10" class="text-c border1">
                                <h2>{{loan.remainAmount|formatCurrency}}</h2>
                                <p class="mt-5">剩余可委托金额（元）</p>
                            </a-col>
                        </a-row>
                        <div class="surplus">回款方式：<em>一次还本付息</em></div>
                        <div class="term">
                            <em>委托期限：</em>
                            <button type="button" :class="['btn','btn-term',loan.prdId==plan.prdId?'on':'',plan.canInvest?'':'disabled']" :disabled="!plan.canInvest" @click="changeLoan(plan)" v-for="(plan,index) in plans" :key="'plan'+index">{{plan.prdPeriodStr}}</button>
                        </div>
                    </div>    
                    <div class="sd">
                        <div class="item">可用余额(元)：
                            <span v-if="!pageInfo.loginInfo.isLogin"><a class="text-primary" href="javascript:;" @click="ifShowLogin=true">登录</a>可见</span>
                            <span v-else>{{user.availableAmt|formatCurrency}}<router-link to="/spa/member/account/recharge" class="text-primary r">充值</router-link></span>
                        </div>
                        <div class="item clearfix">
                            <div class="l">委托金额(元)：</div>
                            <InputNumber :disabled="!loan.canInvest||loan.remainAmount==0" :placeholder="'最低委托金额'+(loan.minAmount<loan.remainAmount?loan.minAmount:loan.remainAmount)+'元'" ref="inputnumber" class="l" :loanId="loan.prdId" :step="100" :height="50" :width="290" :hasunit="false" :iconSize="24" :fontSize="18"
                            :max="loan.maxAmount>loan.remainAmount?loan.remainAmount:loan.maxAmount" :type="'currency'" @change="changeInputNumber" :maxlength="8"></InputNumber>
                            <a href="javascript:;" class="text-primary r" v-if="pageInfo.loginInfo.isLogin" @click="investAll">全投</a>
                        </div>
                        <div class="item">预期收益(元)：&nbsp;{{(loan.baseInterest + loan.awardInterest)|formatCurrency}}</div>
                        <div class="text-c mt-20">
                            <button class="btn btn-warning btn-invest disabled" :disabled="true" v-if="loan.remainAmount==0">{{loan.prdStatusCn}}</button>
                            <button class="btn btn-warning btn-invest" @click="ifShowLogin=true" v-else-if="!pageInfo.loginInfo.isLogin">委托请登录</button>
                            <button class="btn btn-warning btn-invest" @click="confirmInvest" v-else>委托出借</button>                        
                        </div>
                    </div>
                </div>
                <div class="mp-plan-detail mt-30">
                    <div class="flow">
                        <img class="banner" src="@/assets/images/product/transfer_detail_info.png">
                        <div class="info1">一般1天</div>
                        <div class="prdPeriod"><span class="target-month">{{loan.period}}{{loan.periodUnit==0?'天':'个月'}}</span>后</div>
                    </div>
                    <a-tabs defaultActiveKey="1" size="large">
                        <a-tab-pane tab="服务详情" key="1">
                            <div class="maincontent">
                                <table class="table1">
                                    <tbody><tr>
                                        <td>服务编号</td>
                                        <td class="target-prdno">{{loan.prdNo}}</td>
                                    </tr>
                                    <tr>
                                        <td>简介</td>
                                        <td>易智投是亿钱贷推出的委托出借工具，在基于出借人的自主选择前提下，通过系统自动匹配，协助出借人分散出借。当您使用易智投服务进行出借时，将授权亿钱贷为您选择符合以下条件的项目并为您进行循环出借：经平台严谨风控审核的、信息详细披露的借款项目或被转让债权。</td>
                                    </tr>
                                    <tr>
                                        <td>协议约定年化利率</td>
                                        <td>
                                            {{loan.defaultRate}}%<span v-if="loan.awardRate && loan.awardRate>0">+{{loan.awardRate}}%</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>委托期限</td>
                                        <td>{{loan.period}}{{loan.periodUnit==0?'天':'个月'}}，指亿钱贷为出借人提供“易智投”出借服务的期限，委托期内，
                                        出借人委托出借金额无法取出，易智投的债权也无法转让；委托出借的实际标的期限可能会超过委托期限，委托期满，根据出借人的选择，
                                        授权平台将全部未到期债权进行债权转让或者继续持有未到期债权直至到期。平台不承诺债权转让成功，未能成功转让的债权，出借人需持相应借款项目直至到期。</td>
                                    </tr>
                                    <tr>
                                        <td>出借范围</td>
                                        <td>见“出借资产明细”下的具体借款标的，平台将依据出借人的风险能力评估结果匹配相应风险等级的标的。</td>
                                    </tr>
                                    <tr>
                                        <td>授权出借规则</td>
                                        <td>最低委托金额{{loan.minAmount|formatCurrency}}元，最高委托金额{{loan.maxAmount|formatCurrency}}元（将依据出借人的风险能力评估结果进行调整）。</td>
                                    </tr>
                                    <tr>
                                        <td>回款方式</td>
                                        <td>委托期满，已到期的债权和转让成功的债权的本息等金额，在扣除平台服务费用后，返回至账户可用余额。未到期债权会持续进行转让，直至转让成功或债权到期还款后，资金返回至账户可用余额。</td>
                                    </tr>
                                    <tr>
                                        <td>起息日</td>
                                        <td>17：00前委托出借成功，预计当天起息；17：00后委托成功，预计次日起息。以实际起息日为准。</td>
                                    </tr>
                                    <tr>
                                        <td>费用说明</td>
                                        <td>平台服务费用详见<a class="text-primary encontract" target="_blank" :href="'/contract/entrust?assetsId='+loan.prdId">《委托出借协议》</a>。</td>
                                    </tr>
                                    <tr>
                                        <td>常见问题</td>
                                        <td>参见帮助中心<router-link class="text-primary" to="/spa/help/question?faqType=8f3020812c54497b94718882fd127485">易智投相关说明</router-link></td>
                                    </tr>
                                </tbody></table>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="出借资产明细" key="2">
                            <div class="maincontent nologin" v-if="!pageInfo.loginInfo.isLogin">
                                <img src="@/assets/images/product/login_before.png">
                                <p>详细信息请<a href="javascript:;" @click="ifShowLogin=true" class="text-primary">登录</a>后查看</p>
                            </div>
                            <div class="maincontent assetsdetail" v-else>
                                <p>说明：</p>
                                <p>1. 易智投服务匹配出借的项目包括平台已发布或待发布的所有直接借款项目和债权转让项目；</p>
                                <p>2. 以下列表中的项目可能因应实际情况发生增减，可在我的账户-我的易智投详情页面查询实际匹配出借情况。</p>
                                <table class="table recordtable text-c mt-20">
                                    <thead>
                                        <tr>
                                            <th>项目名称</th>
                                            <th>借款总额/待投金额(元)</th>
                                            <th>借款期限/剩余期限</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="assetsRecord.dataList && assetsRecord.dataList.length>0">
                                        <tr v-for="(assets,index) in assetsRecord.dataList" :key="'assetsRecord'+index">
                                            <td>{{assets.loanTitle}}</td>
                                            <td>{{assets.loanAmt|formatCurrency}}</td>
                                            <td>{{assets.loanPeriodStr}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                    </tbody>
                                </table>
                                <div class="page mt-40" v-if="assetsRecord.hasPage">
                                    <a-pagination :pageNo="assetsRecord.pageNo" :pageSize="assetsRecord.pageSize" :total="assetsRecord.total" @change="initAssetsRecord"/>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="委托记录" key="3">
                            <div class="maincontent trustrecord">
                                <table class="table table-bordered recordtable text-c">
                                    <thead>
                                        <tr>
                                            <th>出借人</th>
                                            <th>委托金额(元)</th>
                                            <th>委托时间</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="investRecord.dataList && investRecord.dataList.length>0">
                                        <tr v-for="(invest,index) in investRecord.dataList" :key="'investRecord'+index">
                                            <td>{{invest.userLoginNameStr}}</td>
                                            <td>{{invest.investAmount|formatCurrency}}</td>
                                            <td>{{invest.investTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr><td colspan="3"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                    </tbody>
                                </table>
                                <div class="page mt-40" v-if="investRecord.hasPage">
                                    <a-pagination :pageNo="investRecord.pageNo" :pageSize="investRecord.pageSize" :total="investRecord.total" @change="initInvestRecord"/>
                                </div>
                                
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>
        <div class="g-mainer pt-50 pb-50 bgproduct" v-else>
            <div class="subscription-success">
                <div class="hd clearfix">
                    <i class="icon-font icon-cat-success text-success"></i>
                    <h2>委托出借成功</h2>
                    <p>{{loan.title}}</p>
                </div>
                <div class="bd">
                    <ul class="process">
                        <li>
                            <h4>成功出借{{loan.investAmt|formatCurrency}}元
                            <span v-if="loan.totalRedAmt && loan.totalRedAmt>0">，使用红包{{loan.totalRedAmt}}元</span>
                            <span v-if="loan.maxRate && loan.maxRate>0">，使用奖励券{{loan.maxRate}}%</span>
                            </h4>
                            <span>{{investResult.investTime}}</span>
                        </li>
                        <li>
                            <h4>开始计息</h4>
                            <span>一般1-2个工作日，以实际为准</span>
                        </li>
                        <li>
                            <h4>委托期满</h4>
                            <span>{{investResult.prdPeriodStr}}， 预期收益{{investResult.expectIncome|formatCurrency}}元</span>
                        </li>
                    </ul>
                    <div class="text-c mt-50">
                        <router-link class="btn btn-default size-X radius mr-20" to="/spa/member/invest/autobid">查看资产</router-link>
                        <a class="btn btn-warning size-X radius" href="/spa/product/index">继续出借</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
        <!-- 登录modal -->
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="ifShowLogin=false" :centered="true" width="490" :closable="false">
            <Login @loginSuccess="loginSuccess"></Login>
            <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
        </a-modal>
        <a-modal title="委托出借确认" :visible="ifConfirmInvest" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" @cancel="ifConfirmInvest=!ifConfirmInvest" :centered="true" width="560" :closable="false">
            <button type="button" class="closemodal" @click="ifConfirmInvest=!ifConfirmInvest"><i class="icon-font icon-close"></i></button>
            <div class="m-layer-subscription layui-layer-wrap">
                <div class="warntip">
                    <h4>流动性风险提示</h4>
                    <p>委托期满，未到期的债权授权平台发起债权转让，平台不承诺债权转让成功，未能成功转让的债权，出借人需持有相应借款项目直至到期。</p>
                </div>
                <div class="bd">
                    <table class="table datatable">
                        <tbody>
                        <tr>
                            <td class="text-muted" width="120">服务名称：</td>
                            <td class="target-prdname">委托出借服务</td>
                        </tr>
                        <tr>
                            <td class="text-muted">服务编号：</td>
                            <td class="target-prdno">{{loan.prdNo}}</td>
                        </tr>
                        <tr>
                            <td class="text-muted">委托出借金额：</td>
                            <td><b>{{loan.investAmt}}</b>元</td>
                        </tr>
                        <tr>
                            <td class="text-muted">选择优惠券<Whattip width="275px" notes="平台自动匹配的红包/奖励券不保证符合您的最优选择，以您实际确认使用为准"></Whattip>：</td>
                            <td>
                                <VoucherSelect ref="voucherselect" :loan="loan" width="100%" 
                                @change="changeVoucher" :selectedRedTotal="[]" :selectedTicketTotal="[]" v-if="ifConfirmInvest"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted">预期收益：</td>
                            <td><span class="amount"><b>{{loan.totalInterest|formatCurrency}}</b>元</span><Whattip width="auto" :nowrap="true" arrow="right" :notes="loan.totalInterestText" v-if="loan.totalInterest"/></td>
                        </tr>
                        <tr>
                            <td class="text-muted">出借标的范围：</td>
                            <td class="product">
                                <label> 企链贷/三农贷/优车贷/微花贷/微企贷</label>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted">委托债转：</td>
                            <td class="transfer"><a-checkbox  @change="changeCheck1" :checked="check1">委托期满，授权平台将未到期债权自动发起债权转让</a-checkbox></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="agreementdiv mt-10">
                        <label class="">
                            <a-checkbox @change="changeAgreement">我已阅读并同意</a-checkbox>
                            <a target="_blank" class="text-primary" href="/contract/entrust?assetsId=${loan.prdId!''}">《委托出借协议》</a>
                            <a target="_blank" class="text-primary" href="/contract/entrust-risk">《风险及禁止性行为提示书》</a>
                        </label>
                    </div>
                    <div class="text-center mt-20">
                         <button :class="['btn','btn-warning','btn-subscription',disabledSubmit?'disabled':'']" @click="submitInvest" :disabled="disabledSubmit"><a-spin size="small" class="mr-5" v-if="disabledSubmit"/>确认出借</button>
                    </div>
                    <p class="text-c text-muted mt-15">市场有风险，出借需谨慎</p>
                </div>
            </div>
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
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import ListTab from '@/components/product/ListTab'
import ULabel from '@/components/common/ULabel'
import bannerUrl from '@/assets/images/product/banner_plan.jpg'
import InputNumber from '@/components/form/InputNumber'
import VoucherSelect from '@/components/form/VoucherSelect'
import Whattip from '@/components/common/Whattip'
import Login from '@/components/layer/Login'
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
import {loanMatchVoucher,initRisk} from '@/utils/product'
import Deposit from '@/components/layer/Deposit'
import RiskTip from '@/components/product/RiskTip'
import Vue from 'vue'
import {Pagination,Tabs,Table} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Table)


export default {
    components:{
        Header,
        Footer,
        ListTab,
        Login,
        ULabel,
        Whattip,
        Deposit,
        RiskTip,
        InputNumber,
        VoucherSelect,
    },
    data() {
        return {
            investResult:{
                success:false
            },
            redList:[],
            ticketList:[],
            user:{},
            loan:{},
            plans:[],
            loginStyle:{padding:'20px 0 10px'},
            layerStyle:{width:'560px',padding:0},
            ifShowLogin:false,
            ifShowRisk:false,
            ifShowDeposit:false,
            bannerUrl:bannerUrl,
            ifConfirmInvest:false,
            assetsRecord:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            isAssetstRisk:true,
            investRecord:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            check1:true,
            agreement:false,
            disabledSubmit:false,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                naverOn:'nav_bid',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initData();
        this.initAssetsRecord(1);
    },
    filters:{
        formatCurrency,dateformat
    },
    methods:{
        initVoucherData(){
            this.$post('/plan/hplan-check',{prdId:this.loan.prdId,amount:this.loan.investAmt}).then(res => {
                let result=toJson(res.errorCode)
                this.redList=result.vouchers
                this.ticketList=result.ticket            
                let loanMatch=loanMatchVoucher(this.loan,this.redList,this.ticketList)
                this.loan={...loanMatch.loan};
            })
        },
        initData(){
            this.$post('/plan/index',{defineId:this.$route.query.defineId}).then(res => {
                let result=toJson(res)
                this.user=result.data;
                this.plans=result.data.plans;
                this.loan=result.data.defaultPrd;
                this.initInvestRecord(1);
                this.resetLoan()
            })
        },
        initAssetsRecord(pageNo){
            this.$post('/product/list',{pageNo:pageNo,pageSize:this.assetsRecord.pageSize,autobidQuery:'1'}).then(res => {
                let result=toJson(res)
                this.assetsRecord.dataList=result.data;
                this.assetsRecord.total=result.count;
                this.assetsRecord.hasPage=this.assetsRecord.total>this.assetsRecord.pageSize
            })
        },
        initInvestRecord(pageNo){
            this.$post('/plan/plan-record?prdId='+this.loan.prdId,{pageNo:pageNo,pageSize:this.investRecord.pageSize}).then(res => {
                let result=toJson(res)
                this.investRecord.dataList=result.data;
                this.investRecord.total=result.count;
                this.investRecord.hasPage=this.investRecord.total>this.investRecord.pageSize
            })
        },
        loginSuccess(){
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                if(!this.user.availableAmt) this.user.availableAmt = result.availableAmt
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.ifShowLogin=false
                this.initData()
            })
        },
        investAll(){
            let amt=this.user.availableAmt>this.loan.remainAmount?this.loan.remainAmount:this.user.availableAmt
            amt=parseInt(this.loan.maxAmount>amt?amt:this.loan.maxAmount)
            this.$refs.inputnumber.changeVal(amt)
            this.loan.investAmt=amt
            this.initVoucherData();
        },
        checkInvestAmt(){
            console.log('[this.loan.investAmt]'+this.loan.investAmt)
            if(!this.loan.investAmt){
                this.$layer.msg('请输入出借金额');
                return false;
            }else if(this.loan.remainAmount<(this.loan.minAmount?this.loan.minAmount:0)&&this.loan.investAmt==this.loan.remainAmount){
                return true;
            }else if(this.loan.investAmt<(this.loan.minAmount?this.loan.minAmount:0)){
                this.$layer.msg('最小出借金额为'+(this.loan.remainAmount<this.loan.minAmount?this.loan.remainAmount:this.loan.minAmount)+'元');
                return false;
            }
            return true;
        },
        confirmInvest(){
            if(this.pageInfo.loginInfo.isDepositary==0){ //未开通存管
                this.ifShowDeposit=true
            }else if(!this.user.assessStatus||(this.user.totalDue+this.loan.investAmt)>(this.user.userAssessLimit)*10000){ //风险评估检测
                this.ifShowRisk=true;
            }else if(this.checkInvestAmt()){ //出借金额检测
                this.ifConfirmInvest=true;
            }
        },
        changeInputNumber(result){
            this.loan.investAmt=result.value
            this.initVoucherData();
        },
        changeVoucher(loan){ //选择优惠券
            this.loan={...this.loan,...loan}
        },
        changeLoan(item){
            this.loan={...item}
            this.resetLoan()
            this.initInvestRecord(1)
            this.initVoucherData();
        },
        resetLoan(){
            this.loan.repayMode=2
            this.loan.platRate=this.loan.defaultRate
            this.loan.loanPeriodUnit=this.loan.periodUnit
            this.loan.loanPeriod=this.loan.period
            this.$refs.inputnumber.changeVal(0)
            this.loan.investAmt=0
        },
        changeCheck1(e){
            this.check1=e.target.checked
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
        submitInvest(){//出借确认
            if(!this.check1){
                this.$layer.msg('未勾选授权债权，你将持有相应债权到期，请确认勾选') 
            }else if(!this.agreement){
               this.$layer.msg('请先阅读并同意 《委托出借协议》 《风险及禁止性行为提示书》') 
            }else{
                let params={};
                params.amount=this.loan.investAmt;
                params.prdId=this.loan.prdId;
                params.quitType=1;
                params.couponIdStr='';
                if(this.loan.selectedTicket) params.couponIdStr=this.loan.selectedTicket
                if(this.loan.selectedRedList && this.loan.selectedRedList.length>0) params.couponIdStr=this.loan.selectedRedList.join(',');
                this.disabledSubmit=true
                this.$post('/plan/hplan-join',params).then(res=>{
                    let result=toJson(res)
                    this.ifConfirmInvest=false;
                    this.disabledSubmit=false
                    if(result.success){
                        this.investResult.success=true
                        this.investResult={...this.investResult,...result.data};
                    }else{
                        this.$layer.msg(result.msg)
                    }
                })
                
            }
        },
    }
 }
</script>

<style scoped>
.mp-plan-detail >>> .ant-tabs-nav{padding-left:40px;}
.mp-plan-detail >>> .ant-tabs-tab{margin-right:30px;}
.mp-plan-detail >>> .ant-tabs-bar{margin:0;}
</style>
<style lang="less" scoped>
@import "~@/assets/style/product.less";
@import "~@/assets/style/config.less";
.mp-plan-bid{
    position: relative;
    padding-right:570px;
    background:#fbfbfb;
    .title{
        font-size:16px;
        border-bottom:1px dashed #ebebeb;
        padding-left:40px;
        line-height:70px;
        background:#fff;
    }
    .bd{
        padding:35px 40px;
        background:#fff;
        color:@text-color-secondary;
        .rates{
            h2{
                font-size:36px;line-height:1;white-space: nowrap;
                em{font-size:24px;}
            }
            h4{font-size:16px;line-height:26px;padding-top:10px;}
            p{font-size: 12px;color:#999;line-height:20px;}
            .border1{border-left:1px solid #ddd;}
        }
        .surplus{line-height:20px;margin-top:30px;
            em{font-size:16px;}
        }
        .term{margin-top:30px;line-height:30px;position: relative;padding-left:75px;
            em{position: absolute;left:0;top:0;}
            .btn-term{
                min-width:60px;
                padding:0 10px;
                border:1px solid @warning-color;
                color:@warning-color;
                line-height:30px;
                height:30px;
                font-size:12px;
                margin-right:10px;
                margin-bottom:10px;
                background:none;
                border-radius:@border-radius-base;
            }
            .btn-term.on,.btn-term.active{background:@warning-color;color:#fff;}
        }
    }
    .sd{
        position: absolute;right:0;top:0;
        width:570px;padding:50px 55px 20px;
        .item{line-height:50px;color:#666;font-size:16px;}
        .input-wrap{display: inline-block;position: relative;width:260px;}
        .btn-invest{width:190px;line-height:48px;height:48px;font-size:16px;border-radius:@border-radius-base;}
    }
}
.mp-plan-detail{
    background:#fff;
    .flow{
        position: relative;
        text-align: center;
        padding:40px 0;
        border-bottom: 1px solid #efefef;
        .info1 {
            position: absolute;
            left: 155px;
            top: 30px;
            width: 110px;
            line-height: 30px;
            background: #f8f8f8;
            text-align: center;
            border-radius: 30px;
        }
        .prdPeriod{
            position: absolute;
            left: 430px;
            top: 30px;
            width: 100px;
            line-height: 30px;
            background: #f8f8f8;
            text-align: center;
            border-radius: 30px;
        }
    }
    .maincontent{padding:30px 40px;
        .table1{width:100%; color:#666;
            tr td{line-height:25px;padding:10px;}
            tr:nth-child(2n+1) td{background-color: #f7f7f7;}
            tr td:first-child{width:200px; color:#999; padding-left:30px;}
        }
        .table th{background-color:#edf2f9;}
        .table td,.table th{height:40px;padding:5px 10px;width: 240px;}
        .table-bordered td,.table-bordered th{border:1px solid #d2d2d2;}
        .table.text-c td,
        .table.text-c th{text-align: center;}
        .btn-sel{padding:0 20px;line-height:30px;border-radius:5px;}
    }
    .nologin{text-align:center;font-size:18px;}
    .assetsdetail p{color:@text-color-secondary;line-height:20px;}
    .assetsdetail .table td{height:50px;padding:10px;}
}
</style>