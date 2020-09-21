<template>
    <div>
        <Header :pageInfo="pageInfo"/>
        <div class="g-mainer pt-30 pb-30 bgproduct" v-if="!investResult.success">
            <div class="wp">    
                <div class="mp-detail-total">
                    <div class="bd">
                        <div class="title"><ULabel :type="prdTypes[loan.prdType]" size="small" class="ulabel" style="transform:translateY(-2px);"/> {{loan.loanTitle}}</div>
                        <ul class="details">
                            <li>
                                <h2 class="text-warning">{{loan.platRate}}<em>%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em></h2>
                                <p>协议约定年化利率<Whattip :notes="whatnotes"/></p></li>
                            <li>
                                <h2><span class="text-warning">{{loan.loanPeriod}}</span><em> {{loan.periodStr}}</em></h2>
                                <p>借款期限</p>
                            </li>
                        </ul>
                        <div class="total mt-40">项目总额（元）：<em>{{loan.loanAmt |formatCurrency}}</em></div>
                        <div class="progress"><a-progress :percent="loan.percent" :strokeWidth="5" :status="'normal'" :strokeColor="'#3961cd'"/></div>
                        <div class="desc">
                            <div>起投金额：{{loan.minAmt}}元&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{loan.repayModeStr}}</div>
                            <div>募集截止至 {{loan.assetsDeadline |dateformat('YYYY-MM-DD HH:mm')}}</div>
                        </div>
                    </div>
                    <div class="sd" v-if="loan.loanStatus=='2' ||loan.loanStatus=='13'">
                        <div class="item">剩余可投（元）
                            <a href="javascript:;" class="text-primary r" @click="allInvest" v-if="pageInfo.loginInfo.isLogin">全投</a>
                        </div>
                        <div class="amt mb-30">{{loan.remainInestAmt |formatCurrency}}</div>
                        <div class="item" v-if="pageInfo.loginInfo.isLogin">可用余额 {{user.availableAmt |formatCurrency}} 元<router-link to="/spa/member/account/recharge" class="text-primary r" v-if="pageInfo.loginInfo.isLogin">充值</router-link></div>
                        <div class="item" v-else>可用余额 <a class="text-primary" href="javascript:;" @click="ifShowLogin=true">登录</a> 可见</div>
                        <div class="mt-5">
                            <InputNumber ref="inputnumber" class="l" :loanId="loan.loanId" :step="100" :height="50" :width="305" :hasunit="true" :iconSize="24" :fontSize="18"
                            :max="loan.remainInestAmt" :type="'currency'" @change="changeInputNumber" :maxlength="8"></InputNumber>
                        </div>
                        <div class="btndiv" v-if="loan.loanStatus=='13'">
                            <a class="btn btn-block disabled" href="javascript:;">{{loan.releaseTime|dateformat('YYYY-MM-DD HH:mm')}}开启</a>
                        </div>
                        <div class="btndiv" v-else-if="!pageInfo.loginInfo.isLogin">
                            <a class="btn btn-warning mr-15" href="javascript:;" @click="ifShowLogin=true">出借请登录</a>
                            <a class="btn btn-primary" href="javascript:;" @click="ifShowLogin=true">加入购物车</a>
                        </div>
                        <div class="btndiv" v-else>
                            <a class="btn btn-warning mr-15" href="javascript:;" @click="confirmInvest">立即出借</a>
                            <a class="btn btn-primary" href="javascript:;" @click="addShopcart()">加入购物车</a>
                        </div>
                    </div>
                    <div class="sd success" v-else>
                        <i class="icon-font icon-right1"></i>
                        <h2 class="subscription-title" v-if="loan.loanStatus=='5'">已满标</h2>	    				    				  
                        <h2 class="subscription-title" v-if="loan.loanStatus=='6'">还款中</h2>	    				    				  
                        <h2 class="subscription-title" v-if="['7','8','9'].includes(loan.loanStatus)">已还清</h2>	    				    				  
                        <p class="text-muted subscription-time" v-if="loan.loanStatus=='2'">募集截止时间 {{loan.assetsDeadline|dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                        <p class="text-muted subscription-time" v-else>募集完成时间 {{loan.fullTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                    </div>
                </div>
                <div class="mp-detail-details">
                    <a-tabs defaultActiveKey="1" size="large" class="ant-tabs-yqd">
                        <a-tab-pane tab="项目详情" key="1">
                            <div class="maincontent nologin" v-if="!pageInfo.loginInfo.isLogin">
                                <img src="@/assets/images/product/login_before.png">
                                <p>详细信息请<a href="javascript:;" @click="ifShowLogin=true" class="text-primary">登录</a>后查看</p>
                            </div>
                            <section class="maincontent" v-else>
                                <div v-if="loan.prdType=='3'">
                                    <div class="page-title">
                                        <i class="icon-font icon-flag text-primary"></i>项目介绍
                                    </div>
                                    <div class="item-content">
                                        <p class="textIndent2">该项目主要针对群体为具有良好信用记录的个人与企业。在该群体向第三方机构提供不动产作为抵押且获机构对应的增信（包括但不限于担保函、保函或借款保证保险）支持的基础上所提供的信息撮合服务。</p>
                                        <div><a target="_blank" href="/public/pdf/BZDBH.pdf">《保证担保函模板》</a></div>
                                    </div>
                                    <hr/>
                                </div>
                                <div class="page-title">
                                    <i class="icon-font icon-flag text-primary"></i>借款人信息
                                </div>
                                <div class="item-content">
                                    <table class="table detailtable mt-30">
                                        <tr>
                                            <td>借款人</td>
                                            <td>
                                                <span v-if="user.personFarm">{{user.personFarm.userNameStr}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.companyNameStr}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.companyNameStr}}</span>
                                            </td>
                                            <td>{{user.personFarm?'学历':'行业'}}</td>
                                            <td>
                                                <span v-if="user.personFarm && user.personFarm.degree">{{educations[user.personFarm.degree]}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.industry}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.industry}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{{user.personFarm?'上年度经营收入':'上年度主营业务收入'}}</td>
                                            <td>
                                                <span v-if="user.personFarm">{{user.personFarm.cashIn}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.cashIn}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.cashIn}}</span>
                                            </td>
                                            <td>对外债务</td>
                                            <td>
                                                <span v-if="user.personFarm">{{user.personFarm.liabilities}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.liabilities}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.liabilities}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>借款前6个月内借款人征信报告中的逾期情况</td>
                                            <td>
                                                <span v-if="user.personFarm">{{user.personFarm.creditOverdue}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.creditOverdue}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.creditOverdue}}</span>
                                            </td>
                                            <td>其他网络借贷平台借款情况</td>
                                            <td><span v-if="user.personFarm">{{user.personFarm.other}}</span>
                                                <span v-if="user.companyScm">{{user.companyScm.other}}</span>
                                                <span v-if="user.companyFarm">{{user.companyFarm.other}}</span>

                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <hr>
                                <div class="page-title">
                                    <i class="icon-font icon-flag text-primary"></i>项目信息
                                </div>
                                <div class="item-content">
                                    <table class="table detailtable mt-30">
                                        <tr>
                                            <td>项目分类</td>
                                            <td>{{user.productName}}</td>
                                            <td>借款金额</td>
                                            <td>{{loan.loanAmt|formatCurrency}}元</td>
                                        </tr>
                                        <tr>
                                            <td>借款用途</td>
                                            <td>{{loan.loanPurpose}}</td>
                                            <td>借款期限</td>
                                            <td>{{loan.loanPeriod}} {{loan.periodStr}}</td>
                                        </tr>
                                        <tr>
                                            <td>标的年利率</td>
                                            <td>{{loan.platRate}}%</td>
                                            <td>还款方式</td>
                                            <td>{{loan.repayModeDesc}}</td>
                                        </tr>
                                        <tr>
                                            <td>还款来源</td>
                                            <td>{{loan.repaySource}}</td>
                                            <td>募集开始日期</td>
                                            <td>{{loan.releaseTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                                        </tr>
                                        <tr>
                                            <td>募集期</td>
                                            <td>{{loan.raisePeriod}}天</td>
                                            <td>起息日</td>
                                            <td>
                                                <span v-if="['6','7','8','9'].includes(loan.loanStatus)">{{loan.interestDate|dateformat}}</span>
                                                <span v-else>满标放款后起息</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>项目介绍</td>
                                            <td>{{loan.loanRemark}}</td>
                                            <td>担保措施</td>
                                            <td>{{loan.assurePlan}}</td>
                                        </tr>
                                        <tr>
                                            <td>合同模板</td>
                                            <td><a target="_blank" class="text-primary" :href="'/contract/exchange?assetsId='+loan.loanId">《借款协议》</a></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                                <hr>
                                <div v-if="user.ext">
                                    <div class="page-title">
                                        <i class="icon-font icon-flag text-primary"></i>附加信息
                                    </div>
                                    <div class="item-content">
                                        <table class="table detailtable mt-30">
                                            <tr>
                                                <td>车牌号</td>
                                                <td>{{user.ext.plateNumberFuzzy}}</td>
                                                <td>厂牌型号</td>
                                                <td>{{user.ext.brandModelFuzzy}}
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <td>车架号</td>
                                                <td>{{user.ext.frameNumberFuzzy}}</td>
                                                <td>初登日期</td>
                                                <td>{{user.ext.registrationTime|dateformat}}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td>车辆评估价值</td>
                                                <td>{{user.ext.evaluationValue}}</td>
                                                <td>车身颜色</td>
                                                <td>{{user.ext.carColor}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <hr/>
                                </div>
                                <div v-if="user.picMap &&user.picMap.length>0">
                                    <div class="page-title">
                                        <i class="icon-font icon-flag text-primary"></i>附件材料
                                    </div>
                                    <div class="enclosure-list">
                                        <img :src="plist.fileLink" class="img-fluid" v-for="(plist,index) in user.picMap" :key="'picMap'+index">
                                    </div>
                                </div>
                            </section>
                        </a-tab-pane>
                        <a-tab-pane tab="风险评估" key="2">
                            <div class="maincontent nologin" v-if="!pageInfo.loginInfo.isLogin">
                                <img src="@/assets/images/product/login_before.png">
                                <p>详细信息请<a href="javascript:;" @click="ifShowLogin=true" class="text-primary">登录</a>后查看</p>
                            </div>
                            <div class="maincontent" v-else>
                                <table class="table detailtable" >
									<tr v-if="user.guarantorStr">
										<td>担保/回购方</td>
										<td>{{user.guarantorStr}}</td>
									</tr>
									<tr>
										<td>担保/回购方简介</td>
										<td>{{loan.guarantorIntroduction}}</td>
									</tr>
                                    <tr>
                                        <td>风险控制措施</td>
                                        <td><div class="defaultfont" v-if="user.riskControl && user.riskControl.riskMeasure" v-html="user.riskControl.riskMeasure"></div></td>
                                    </tr>
                                    <tr>
                                        <td>风险提示</td>
                                        <td><div class="defaultfont" v-if="user.riskControl && user.riskControl.reminder" v-html="user.riskControl.reminder"></div></td>
                                    </tr>
                                    <tr>
                                        <td>风险等级</td>
                                        <td><div class="defaultfont" v-if="user.riskGradeStr" v-html="user.riskGradeStr"></div></td>
                                    </tr>
                                </table>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="出借记录" key="3">
                            <div class="maincontent trustrecord">
                                <table class="table recordtable text-c">
                                    <thead>
                                    <tr>
                                        <th>出借人</th>
                                        <th>出借金额（元）</th>
                                        <th>出借时间</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="invetsRecord.dataList && invetsRecord.dataList.length>0">
                                        <tr v-for="(o,index) in invetsRecord.dataList" :key="'invetsRecord'+index">
                                            <td>{{o.starUserName}}</td>
                                            <td>{{o.investAmt|formatCurrency(0)}}</td>
                                            <td>{{o.investTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr><td colspan="3"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                    </tbody>
                                </table>
                                <div class="page mt-40" v-if="invetsRecord.hasPage">
                                    <a-pagination :pageNo="invetsRecord.pageNo" :pageSize="invetsRecord.pageSize" :total="invetsRecord.total" @change="initInvetsRecord"/>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="还款计划" key="4" v-if="['6','7','8','9'].includes(loan.loanStatus)">
                            <div class="maincontent trustrecord">
                                <table class="table recordtable" v-if="user.loanRepaymentPlans&&user.loanRepaymentPlans.length>0">
                                    <thead>
                                    <tr>
                                        <th>合约还款日期</th>
                                        <th>还款金额（元）</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lrps,index) in user.loanRepaymentPlans" :key="'loanRepaymentPlans'+index">
                                            <td>{{lrps.periodEndTime|dateformat}}</td>
                                            <td>{{lrps.planPayPrincipalInterest|formatCurrency}}</td>
                                            <td>{{lrps.repaymentStatusStr}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="贷后管理" key="5" v-if="user.loanLatter && loan.latterShow && loan.latterShow =='1'">
                            <div class="maincontent nologin" v-if="!pageInfo.loginInfo.isLogin">
                                <img src="@/assets/images/product/login_before.png">
                                <p>详细信息请<a href="javascript:;" @click="ifShowLogin=true" class="text-primary">登录</a>后查看</p>
                            </div>
                            <div class="maincontent" v-else>
                                <table class="table detailtable" v-if="user.loanRepaymentPlans&&user.loanRepaymentPlans.length>0">
                                    <tr>
                                        <td>借款资金运用情况</td>
                                        <td> {{user.loanLatter.amtPurpose?user.loanLatter.amtPurpose:'--'}}</td>
                                        <td>借款人经营状况及财务状况</td>
                                        <td>{{user.loanLatter.manageInfo?user.loanLatter.manageInfo:'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>借款人还款能力变化情况</td>
                                        <td>{{user.loanLatter.repayInfo?user.loanLatter.repayInfo:'--'}}</td>
                                        <td>借款人逾期情况</td>
                                        <td>{{user.loanLatter.overdueSituation?user.loanLatter.overdueSituation:'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>借款人涉诉情况</td>
                                        <td>{{user.loanLatter.lawsuits?user.loanLatter.lawsuits:'--'}}</td>
                                        <td>借款人受行政处罚情况</td>
                                        <td>{{user.loanLatter.penalize?user.loanLatter.penalize:'--'}}</td>
                                    </tr>
                                    <tr>
                                        <td>其他可能影响借款人还款的重大信息</td>
                                        <td>{{user.loanLatter.other?user.loanLatter.other:'--'}}</td>
                                    </tr>
                                </table>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
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
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import ListTab from '@/components/product/ListTab'
import bannerUrl from '@/assets/images/product/banner_product.jpg'
import Whattip from '@/components/common/Whattip'
import ULabel from '@/components/common/ULabel'
import URank from '@/components/common/URank'
import InputNumber from '@/components/form/InputNumber'
import VoucherSelect from '@/components/form/VoucherSelect'
import Login from '@/components/layer/Login'
import Deposit from '@/components/layer/Deposit'
import RiskTip from '@/components/product/RiskTip'
import InvestConfirm from '@/components/product/InvestConfirm'
import InvestSuccess from '@/components/product/InvestSuccess'
import Vue from 'vue'
import {Progress,Pagination,Tabs,Table} from 'ant-design-vue'
Vue.use(Progress)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Table)
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
        Login,
        Deposit,
        RiskTip,
        InvestConfirm,
        InvestSuccess,
    },
    data() {
        return {
            educations:['小学','初中','高中','中专','大专','本科','硕士','博士','博士后','其它'],
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            user:{},
            loan:{},
            loanId:'',
            ifShopAnimate:false,
            agreement:false,
            disabledSubmit:false,
            investResult:{
                success:false
            },
            redList:[],
            ticketList:[],
            invetsRecord:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            selectedRedTotal:[],
            selectedTicketTotal:[],
            isAssetstRisk:true,
            riskStr:'',
            currentTime:new Date(),
            loginStyle:{padding:'20px 0 10px'},
            layerStyle:{width:'560px',padding:0},
            ifShowLogin:false,
            ifShowRisk:false,
            ifShowDeposit:false,
            ifConfirmInvest:false,
            whatnotes:'此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准',
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
        this.loanId=this.$route.params.uuid
        this.initData();
        this.initInvetsRecord(1);
    },
    filters:{
        formatCurrency,dateformat
    },
    methods:{
        initData(){
            this.$post('/product/detail?loanId='+this.loanId).then(res => {
                if(res.success){
                    this.currentTime = toJson(res).currentTime
                    let result = toJson(res).data
                    this.loan =result.assetsDetail;
                    this.user=result;
                    this.redList=result.voucherList
                    this.ticketList=result.ticketList
                    if(this.loan.loanStatus==2){
                        let loanMatch=loanMatchVoucher(this.loan,this.redList,this.ticketList)
                        this.loan={...loanMatch.loan};
                    }
                    let riskInfo=initRisk(this.pageInfo.loginInfo, this.user.riskGrade)
                    this.isAssetstRisk=riskInfo.isAssetstRisk
                    this.riskStr=riskInfo.riskStr
                }else{
                    alert("加载失败")
                }
            })
        },
        initInvetsRecord(pageNo){
            this.$post('/product/invest/record/'+this.loanId,{pageNo:pageNo,pageSize:this.invetsRecord.pageSize}).then(res => {
                let result=toJson(res)
                this.invetsRecord.dataList=result.data;
                this.invetsRecord.total=result.count;
                this.invetsRecord.hasPage=this.invetsRecord.total>this.invetsRecord.pageSize
            })
        },
        changeInputNumber(result){
            this.loan.investAmt=result.value
            let loanMatch=loanMatchVoucher(this.loan,this.redList,this.ticketList)
            this.loan={...loanMatch.loan};
        },
        allInvest(){ //全投
            let amt=parseInt(this.user.availableAmt>this.loan.remainInestAmt?this.loan.remainInestAmt:this.user.availableAmt)
            this.$refs.inputnumber.changeVal(amt)
            this.loan.investAmt=amt
            let loanMatch=loanMatchVoucher(this.loan,this.redList,this.ticketList)
            this.loan={...loanMatch.loan};
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
        loginSuccess(){//登录成功
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                if(!this.user.availableAmt) this.user.availableAmt = result.availableAmt
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.ifShowLogin=false
                this.initData()
            })
        },
        changeVoucher(loan){ //选择优惠券
            this.loan={...this.loan,...loan}
        },
        checkInvestAmt(){
            if(!this.loan.investAmt){
                this.$layer.msg('请输入出借金额');
                return false;
            }else if(this.loan.remainInestAmt<(this.loan.minAmt?this.loan.minAmt:0)&&this.loan.investAmt==this.loan.remainInestAmt){
                return true;
            }else if(this.loan.investAmt<(this.loan.minAmt?this.loan.minAmt:0)){
                this.$layer.msg('最小出借金额为'+(this.loan.remainInestAmt<this.loan.minAmt?this.loan.remainInestAmt:this.loan.minAmt)+'元');
                return false;
            }
            return true;
        },
        confirmInvest(){
            if(this.pageInfo.loginInfo.isDepositary==0){ //未开通存管
                this.ifShowDeposit=true
            }else if(!this.user.assessStatus||this.isAssetstRisk||(this.user.totalDue+this.loan.investAmt)>(this.user.userAssessLimit)*10000){ //风险评估检测
                this.ifShowRisk=true;
            }else if(this.checkInvestAmt()){ //出借金额检测
                this.ifConfirmInvest=true;
            }
        },
        addShopcart(){
            if(this.pageInfo.loginInfo.isDepositary==0){ //未开通存管
                this.ifShowDeposit=true
            }else if(!this.user.assessStatus||this.isAssetstRisk||(this.user.totalDue+this.loan.investAmt)>(this.user.userAssessLimit)*10000){ //风险评估检测
                this.ifShowRisk=true;
            }else if(this.checkInvestAmt()){
                this.$post('/product/buyCart/add',{loanId:this.loan.loanId,amt:this.loan.investAmt}).then(res => {
                    if(res.success){
                        this.ifShopAnimate=true;
                        setTimeout(() => {
                            this.ifShopAnimate=false;
                        }, 1200);
                        this.pageInfo.loginInfo.itemCount=res.jsonData.itemCount
                        this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                        this.$layer.msg('已成功加入购物车，请尽快确认支付~')
                    }else{
                        this.$layer.msg(res.msg)
                    }
                })
            }
        },
        toNewUrl(url){
            window.open(this.$router.resolve(url).href, '_blank')
        },
        handlecartAdd (target) { // 点击加号按钮触发事件
            this.$nextTick(() => { // 使用$nextTick优化体验
                this.$refs.shopCart.drop(target) // 父组件goods通过.$refs属性访问shopCart子组件的drop方法
            })
        },
        needRisk(){
            window.location.href="/product/needrisk?loanId="+this.loan.loanId+"&amt="+this.loan.investAmt;
        }
    }
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/product.less";
</style>