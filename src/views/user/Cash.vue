<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-model mu-cash" v-show="ifInitDatas">
                        <div class="mu-title"><h4>账户提现</h4><div class="more xinwangtip"><div class="tip">资金已由新网银行存管</div><router-link to="/spa/member/deal/cash" class="btn btn-info ml-40">提现记录</router-link></div></div>
                        <form action="" class="m-form mu-cash-form">
                            <div class="pd1">
                                <div class="formline mt-20">
                                    <div class="formlabel">提现账户</div>
                                    <div class="forminput">
                                        <div class="bankinfo">
                                            <span class="pic"><img :src="getBankUrl(userBank.bankCode)"></span>
                                            <em>尾号 {{userBank.accountStar.slice(14)}}</em>
                                        </div>
                                    </div>
                                </div>
                                <div class="formline mt-20">
                                    <div class="formlabel">提现金额</div>
                                    <div class="forminput">
                                        <input type="text" :class="['input-text',errorInput?'Validform_error':'']" placeholder="请输入提现金额" v-model="amount" @keyup="keyupAmount" @blur="checkAmount" maxlength="9">
                                        <span class="unit">元</span>
                                    </div>
                                    <div class="formafter">
                                        <div class="cztip1">账户余额： <em>{{user.availableAmt|formatCurrency}}</em>元</div>
                                        <div class="cztip1"><a class="text-primary" href="javascript:;" @click="cashAll">全部提现</a></div>
                                    </div>
                                </div>
                                <div class="formline mt-20">
                                    <div class="formlabel">提现方式</div>
                                    <ul class="cashtype">
                                        <li :class="[cashtype=='base'?'on':'']" @click="changeCashType('base')">
                                            <h6>普通提现（下一工作日到账，节假日顺延 T+1）</h6>
                                        </li>
                                        <li :class="[user.t0Switch?'':'disabled',cashtype=='quik'?'on':'']"  @click="changeCashType('quik')">
                                            <h6>快速提现（当天到账 T+0）
                                                <em class="text-danger" v-if="cashtype=='quik' && dateformat(currentTime,'HH')>=minQuikHour && amount>user.t0LimitAmount">22:00~24:00申请{{user.t0LimitAmount|formatCurrency}}以上的提现，将无法在当日到账</em>
                                                <em class="text-danger" v-if="user.rechargeClose">新注册用户当日充值的金额，在当日仅支持普通提现</em>
                                            </h6>
                                            <i class="icon-font icon-wenhao quicktip" v-if="user.rechargeClose"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div class="formline mt-15">
                                    <div class="formlabel">手续费</div>
                                    <div class="forminput">
                                        <span>{{fee|formatCurrency}}</span> 元 <Whattip width="auto" :nowrap="true" icon="wenhao" :notes="notes"/>
                                        <div class="quikfeedesc text-muted" v-show="cashtype=='quik' && user.t0FreeSwitch" v-if="user.t0ReceiveCount>0">
                                            <a-checkbox disabled class="mr-10">抵扣手续费</a-checkbox>
                                            <span>本月免费快速提现次数尚未领取，<router-link to="/spa/member/task" class="text-primary underline">立即领取</router-link></span>
                                        </div>
                                        <div class="quikfeedesc text-muted" v-show="cashtype=='quik' && user.t0FreeSwitch" v-else-if="user.t0Count>0">
                                            <a-checkbox @change="changeDeductFee" :checked="deductFee">抵扣手续费</a-checkbox>
                                            <span>本月剩余 {{user.t0Count}} 次免费快速提现次数</span>
                                        </div>
                                        <div class="quikfeedesc text-muted" v-show="cashtype=='quik' && user.t0FreeSwitch" v-else>
                                            <a-checkbox disabled class="mr-10">抵扣手续费</a-checkbox>
                                            <span>本月剩余 0 次免费快速提现次数</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="formline">
                                    <div class="formlabel">实际到账</div>
                                    <div class="forminput">{{relAccount}} 元</div>
                                </div>
                                <div class="pdleft tipdiv" v-html="errortip"></div>
                                <div class="formline mt-15 pdleft">
                                    <a class="btn btn-submit" :href="toUrl" @click="cashSubmit">立即提现</a>
                                </div>
                                <div class="formline mt-15 pdleft text-c" style="width:375px;">
                                    <a href="javascript:;" @click="layerFrozenTip=true" class="text-primary">提现冻结资金说明</a>
                                </div>
                            </div>
                        </form>
                        <div class="wxtip">
                            <h2>提现手续费说明</h2>
                            <table class="remarktable mt-10">
                                <tr><th>提现方式</th><th>手续费</th><th>预计到账时间</th></tr>
                                <tr><td>普通提现</td><td>免费</td><td>下一工作日到账，节假日顺延 T+1</td></tr>
                                <tr><td>快速提现</td><td>提现金额 × {{user.feeRate*100}}%</td><td>当天到账 T+0</td></tr>
                            </table>
                            <p class="mt-10">
                            注：在提现额度之内，出借人如果选择普通提现，有{{user.withdrawlCount}}次/日免费提现次数，超过免费次数后收取{{user.singleCashFee|formatCurrency}}元/笔手续费；出借人如果选择快速提现，超过{{user.withdrawlCount}}次/日提现次数后加收{{user.singleCashFee}}元/笔手续费。超出提现额度，出借人的提现手续费按照{{user.withdrawlCount}}次/日后手续费标准收费。</p>
                            <h2 class="mt-20">提现须知</h2>
                            <p class="mt-10">
                            1. 提现限额：单笔提现金额限额为{{user.minCashAmt}}~{{user.maxCashAmt}}元；提现手续费减免额度 = 账户当前出借已收本息 + 平台奖励 - 已成功提现金额<br>
                            2. 提现审核：提现金额大于5万时，需经人工审核，审核时间工作日为9:00~17:00，周六为9:00~15:00，周日提现业务统一顺延至下周一处理，法定节假日提现受理时间以平台公告为准；<br>
                            3. 到账时间：上述到账时间仅供参考，实际到账时间会因收款账户开户行不同而有所差异。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
        <a-modal :title="false" :visible="ifShowDeposit" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" :centered="true" width="610" :closable="false">
            <router-link class="closemodal" to="/spa/member/account/index"><i class="icon-font icon-close"></i></router-link>
            <Deposit></Deposit>
        </a-modal>
        <a-modal title="提现冻结资金说明" :visible="layerFrozenTip" :maskClosable="false"
         :centered="true" :width="360" :closable="false" :footer="null">
            <button type="button" class="closemodal" @click="layerFrozenTip=false"><i class="icon-font icon-close"></i></button>
            <div class="textIndent2">确认提现后您将进入银行存管页面进行操作，资金会进入冻结状态。</div>
            <div class="textIndent2">若未能成功提交提现申请（无论是否输入过交易密码），则资金会在30分钟内解冻并退回至账户余额，请您放心~</div>
            <div class="text-r mt-10"><a href="javascript:;" class="btn btn-primary size-M" @click="layerFrozenTip=false">我知道了</a></div>
        </a-modal>
        <a-modal :title="false" :visible="ifShowFullQuataTip" :maskClosable="false"
         :centered="true" :width="360" :closable="false" :footer="null">
            <div class="textIndent2">当日剩余快速提现额度：{{FullQuataAmt}}元</div>
            <div class="textIndent2">您当前输入的提现金额已超出当日的快速提现额度，请修改提现金额或更改为普通提现。快速提现额度将在次日0点自动恢复。给您带来的不便敬请谅解。</div>
            <div class="text-r mt-10"><a href="javascript:;" class="btn btn-primary size-M" @click="ifShowFullQuataTip=false">我知道了</a></div>
        </a-modal>
        <a-modal :title="false" :visible="ifShowQuickTip" :maskClosable="false"
         :centered="true" :width="360" :closable="false" :footer="null">
            <div class="textIndent2">受新网银行业务调整影响，快速提现功能已经暂停使用。请使用普通提现功能提现！</div>
            <div class="text-r mt-10"><a href="javascript:;" class="btn btn-primary size-M" @click="ifShowQuickTip=false">我知道了</a></div>
        </a-modal>
        <a-modal :title="false" :visible="ifShowResultTip" :maskClosable="false" :bodyStyle="bodyStyle"
         :centered="true" :width="530" :closable="false" :footer="null">
            <button type="button" class="closemodal" @click="ifShowResultTip=false"><i class="icon-font icon-close"></i></button>
            <div class="mu-layer-netpay">
                <div class="hd">
                    <div>请在新打开的页面完成提现</div>
                </div>
                <div class="bd">
                    <div class="item">
                        <i class="icon-font icon-right mr-20"></i><span class="result mr-20">提现成功</span><span>您可以：</span><router-link to="/spa/member/account/index" class="text-primary mr-20 ml-20">查看我的账户</router-link>
                    </div>
                    <div class="item mt-20">
                        <i class="icon-font icon-gth mr-20"></i><span class="result mr-20">提现失败</span><span>建议您：</span><router-link to="/spa/help/question?faqType=70d88c7b639346feac0aebe5c081c45f" class="text-primary mr-20 ml-20">查看帮助中心</router-link>
                    </div>
                </div>
                <div class="ft">
                    <p>如仍有疑问，请致电：<span class="text-primary">400-090-9968</span></p>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import UserMenu from '@/components/user/Menu'
import Whattip from '@/components/common/Whattip'
import Deposit from '@/components/layer/Deposit'
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
        Whattip,
        Deposit
    },
    data() { 
        return {
            userBank:{accountStar:'',bankCode:'CMB'},
            layerStyle:{width:'560px',padding:0},
            bodyStyle:{padding:0,background:'none'},
            accountVo:{},
            user:{t0Count:0},
            amount:'',
            minQuikHour:22,
            fee:0,
            currentTime:new Date(),
            ifInitDatas:false,
            remainT1Count:0,
            remainT0Count:0,
            cashtype:'base',
            notes:'',
            errortip:'',
            errorInput:false,
            relAccount:0,
            deductFee:true,
            layerFrozenTip:false,
            ifShowFullQuataTip:false,
            ifShowResultTip:false,
            ifShowQuickTip:false,
            ifShowDeposit:false,
            FullQuataAmt:0,
            toUrl:'javascript:;',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_cash'
            }
        }
    },
    filters:{
        dateformat,formatCurrency
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initData();
    },
    methods:{
        dateformat,formatCurrency,
        initData(){
            this.$post('/member/account/cash').then(res => {
                let result=toJson(res)
                this.ifInitDatas=true
                if(result.success){
                    this.user=result.data
                    this.userBank=result.data.userBank
                    this.currentTime=result.currentTime
                    this.remainT1Count = this.user.withdrawlCount<this.user.hasT1Count?0:(this.user.withdrawlCount-this.user.hasT1Count)
                    this.remainT0Count =this.user.withdrawlCount<this.user.hasT0Count?0:(this.user.withdrawlCount-this.user.hasT0Count)
                    this.notes='今天剩余'+this.remainT1Count+'次免费提现次数，超过次数将收取'+this.user.singleCashFee+'元/笔费用'
                    this.deductFee= this.user.t0ReceiveCount<=0 && (this.user.t0Count>0) &&(this.user.hasT0Count<3) && this.user.t0FreeSwitch
                    this.errortip=this.user.redirectMessage?this.user.redirectMessage:''
                    if(this.user.redirectCode=='1'){
                        this.user.redirectCode=0;
                        this.layerFullQuataTip(this.user.t0Quota);
                        return;
                    }
                }else if(!this.pageInfo.loginInfo.isDepositary){
                    this.ifShowDeposit=true;
                }
            })
        },
        getBankUrl(bankCode){
            return require("@/assets/images/bank/"+bankCode+".png");
        },
        cashAll(){
            if(this.user.availableAmt<this.user.minCashAmt){
                this.$layer.msg("单笔提现金额最低"+this.user.minCashAmt+"元，当前账户余额不足"+this.user.minCashAmt+"元");
            }else{
                this.amount=this.user.availableAmt
                this.checkAmount()
            }
        },
        keyupAmount(){
            let amount=this.amount+'';
            amount= amount.replace(/[^\d.]/g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
            if(amount.indexOf(".")< 0 && amount !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                amount= parseFloat(amount); 
            }
            if(amount>this.user.availableAmt){
                amount= this.user.availableAmt;
            }
            this.amount=amount

            if (Number(amount) > Number(this.user.t0Quota)) {
                this.user.t0Switch=false
                this.cashtype='base'
            }else if(!this.user.rechargeClose) {
                this.user.t0Switch=true
            }
            if(this.cashtype=="quik" && Number(dateformat(this.currentTime,'HH'))>=this.minQuikHour && amount>this.user.t0LimitAmount){
                this.cashtype='base'
            }
            this.calateAmt();
        },
        calateAmt(){
            let amount=this.amount;
            if(this.amount=='' || this.amount < Number(this.user.minCashAmt)){
                amount=0;
            }
            this.fee=0;
            if(this.cashtype=="quik" ){//t0提现
                if(this.remainT0Count<=0){//是否前三次
                    this.notes = this.user.singleCashFee+"元/笔+提现金额×"+this.user.feeRate*100+"%";
                    this.fee = Number((amount*this.user.feeRate).toFixed(2)) + this.user.singleCashFee;
                }else if (this.user.freeAmt <amount){//免费额度不足
                    this.notes = this.user.singleCashFee+"元/笔+提现金额×"+this.user.feeRate*100+"%,已超过免费额度";
                    this.fee = Number((amount*this.user.feeRate).toFixed(2)) + this.user.singleCashFee;
                }else{
                    this.notes = "提现金额×"+this.user.feeRate*100+"%,今天剩余"+this.remainT0Count+"次手续费优惠次数, 超过次数将收取"+this.user.singleCashFee+"元/笔+提现金额×"+this.user.feeRate*100+"%的手续费";
                    this.fee = Number((amount*this.user.feeRate).toFixed(2));
                }
            }else{
                if(this.remainT1Count<=0){
                    this.notes = this.user.singleCashFee+"元/笔";
                    this.fee = this.user.singleCashFee;
                }else if (this.user.freeAmt <amount){
                    this.notes = this.user.singleCashFee+"元/笔,已超过免费额度";
                    this.fee = this.user.singleCashFee;
                }else{
                    this.notes = "今天剩余"+this.remainT1Count+"次手续费优惠次数, 超过次数将收取"+this.user.singleCashFee+"元/笔手续费";
                }
            }
            if(this.cashtype=="quik" && this.deductFee){//勾选免费提现
                this.fee=0;
            }
            if(this.pageInfo.loginInfo.userType !='1'){
                this.fee=0;
            }
            if(amount==0 || amount<this.fee){
                this.fee=0;
            }
            this.relAccount= amount-this.fee    
        },
        checkAmount() {
            let amount=this.amount;
            this.errortip='';
            this.errorInput=false
            if (this.amount == "" || isNaN(this.amount) || Number(this.amount) <= 0) {
                this.errortip=('<span class="errortip"><i class="icon-font icon-error"></i>请输入正确的提现金额</span>');
                this.errorInput=true
                return false;
            } else if (Number(this.amount) > Number(this.user.maxCashAmt)) {
                this.errortip=('<span class="errortip"><i class="icon-font icon-error"></i>单笔提现金额最高为' + this.user.maxCashAmt + '元</span>');
                this.errorInput=true
                return false;
            } else if (Number(this.amount) < Number(this.user.minCashAmt)) {
                this.errortip=('<span class="errortip"><i class="icon-font icon-error"></i>单笔提现金额最低为' + this.user.minCashAmt + '元</span>');
                this.errorInput=true
                return false;
            }
            if (Number(this.amount) > Number(this.user.availableAmt)) {
                this.errortip=('<span class="errortip"><i class="icon-font icon-error"></i>提现金额不能大于账户余额</span>');
                this.errorInput=true
                return false;
            }
            //计算提现手续费
            this.calateAmt();
            return true;
        },
        changeCashType(type){
            if(this.user.t0Switch){
                this.cashtype=type;
            }else{
                this.layerQuickTip();
            }
            this.calateAmt();
        },
        changeDeductFee(e){
            this.deductFee=e.target.checked
            this.calateAmt()
        },
        cashSubmit(){
            if (!this.checkAmount()) {
                return false;
            }
            if(this.cashtype=='quik'){
                this.$post('/member/account/cash_quota',{amt:this.amount}).then(res => {
                    if (res.success) {
                        (this.user.couponCount&&this.user.couponCount>0)?this.conformCash():this.gotoUrl();
                    } else {
                        this.layerFullQuataTip(data.msg)
                    }
                })
            }else{
                (this.user.couponCount&&this.user.couponCount>0)?this.conformCash():this.gotoUrl();
            }
        },
        conformCash(){
            let _this=this;
            _this.$confirm({
                title: '您还有'+this.user.couponCount+'张优惠券未使用，使用即可获得收益，您确定要提现吗？',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    _this.gotoUrl()
                },
                onCancel() {
                
                },
            });
        },
        gotoUrl(){
            this.ifShowResultTip=true;
            let url="/member/account/cashConfirm";
            let type2 = this.cashtype == 'base' ? "NORMAL":"URGENT" ;
            url = url + "?amount=" + this.amount +"&withdrawType="+type2;
            if(this.deductFee){
                url=url+"&cashCoupon=1";
            }
            window.open(url);   
        },
        layerFullQuataTip(amt){
            this.ifShowFullQuataTip=true
            this.FullQuataAmt=amt
        },
        layerQuickTip(){
            if(this.user.t0Quota>0){
                this.layerFullQuataTip(this.user.t0Quota);
                return;
            }
            this.ifShowQuickTip=true;
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-cash-form{position:relative;padding:30px 0 40px;
    .pd1{padding-left:70px;padding-right:70px;}
    .tips-up,.icon-gth{color:#960;vertical-align: middle;}
    .icon-font{margin:0 3px 0 0;}
    .formlabel{float:left;width:90px;line-height:50px;font-size:15px;}
    .forminput{float:left;width:285px;line-height:50px;position:relative;}
    .forminput .input-text{line-height:48px;height:48px;padding:0 20px;width:100%;border-radius:5px;}
    .forminput .unit{position:absolute;right:15px;top:0;line-height:50px;text-align:center;color:#999;}
    .bankinfo{border:1px solid #d2d2d2;border-radius:5px;}
    .bankinfo .pic{display:inline-block;width:180px;text-align:center;}
    .bankinfo .pic img{max-width:180px;max-height:52px;}
    .bankinfo em{border-left:1px solid #d2d2d2;display:inline-block;padding:5px 10px;line-height:20px;}
    .formafter{float:left;line-height:50px;}
    .formdesc{color:#999;}
    .btn-submit{width:285px;font-size:16px;line-height:50px;height:50px;padding:0;border-radius:5px;}
    .btn-submit.btn-cancel{background:#e5e5e5;color:#333;}
    .btn-submit .righticon{color:#9f6;padding-right:15px;font-size:18px;font-weight:700;}
    .btn-submit .erroricon{color:#c00;padding-right:15px;font-size:18px;font-weight:700;}
    .pdleft{padding-left:90px;}
    .cztip1{line-height:25px;color:#999;font-size:14px;padding:0 20px;}
    .cashtype{float:left;width:590px;position:relative;}
    .cashtype li{border:1px solid #ccc;padding-left:52px;line-height:70px;position:relative;border-radius:5px;cursor:pointer;background:url(./../../assets/images/user/typeitem.png) no-repeat 20px 25px;zoom:1}
    .cashtype li .quicktip{display:none;position:absolute;right:20px;top:28px;color:#999;cursor:pointer;line-height:1;}
    .cashtype li.disabled .quicktip{display:block;}
    .cashtype li+li{margin-top:10px;}
    .cashtype li.on{background:url(./../../assets/images/user/typeon.png) no-repeat 20px 21px;border-color:#f29118;}
    .cashtype li h6{color:#666;line-height:70px;}
    .cashtype li h6 em{font-size:12px;padding-left:5px;}
    .cashtype li.disabled{background-color:#f1f1f1;}
    .quikfeedesc{margin-top:-10px;line-height:30px;width:600px;}
}
.mu-cash {
    .wxtip{background:#fbfaf6;padding:25px 70px 35px;}
    .wxtip p{color:#999;line-height:26px;}
    .remarktable th,.remarktable td{border:1px solid #d2d2d2;line-height:24px;padding:5px 10px;text-align:center;color:#999;}
    .remarktable th{color:#555;}
}
</style>