<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-transfer-detail" v-show="ifInitDatas">
                        <div class="mu-title"><h4>债权转让</h4></div>
                        <div class="bd">
                            <div class="text-primary l20">{{user.loanTitle}}</div>
                            <table class="table datatable mt-10">
                                <tbody> 
                                    <tr>
                                        <td>出借本金</td>
                                        <td>{{user.investAmt}}</td>
                                        <td>原项目协议约定年化利率</td>
                                        <td>{{user.platRate}}%</td>
                                        <td>剩余期数/总期数</td>
                                        <td>{{user.remainPeriod}}/{{user.planPeriod}}</td>
                                    </tr>
                                    <tr>
                                        <td>还款方式</td>
                                        <td>{{user.repayModeStr}}</td>
                                        <td>起息日</td>
                                        <td>{{user.calcPeroid}}</td>
                                        <td>到期日</td>
                                        <td>{{user.settleDate}}</td>
                                    </tr>
                                    <tr>
                                        <td>已收本金</td>
                                        <td>{{user.receivedPrincipal|formatCurrency}}元</td>
                                        <td>待收本金</td>
                                        <td>{{user.planPrincipal|formatCurrency}}元</td>
                                        <td>剩余期限</td>
                                        <td>{{user.endPlanDate}}天</td>
                                    </tr>
                                    <tr>
                                        <td>已收利息</td>
                                        <td>{{user.receivedProInterAmt|formatCurrency}}元</td>
                                        <td>待收利息</td>
                                        <td>{{user.proInterAmt|formatCurrency}}元</td>
                                        <td>本期未结利息<Whattip width="auto" :nowrap="true" arrow="center" notes="上期还款日至今日的期限内，未结算的利息"/></td>
                                        <td>{{user.advanceInterest|formatCurrency}}元</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="tip-warning mt-20">提醒：因“本期未结利息”每天动态结算，所以以下债权金额、手续费仅供参考，以转让成交当天结算为准。</div>
                            <ul class="infolist">
                                <li> 
                                    <div class="desc">债权金额：</div>
                                    <div class="amount"><span class="text-import">{{zqAmt|formatCurrency}}</span>&nbsp;元</div>
                                    <div class="tips" v-if="isFree==0">债权金额=(待收本金+本期未结利息)x转让比例</div>
                                    <div class="tips" v-else>债权金额=待收本金x转让比例</div>
                                </li>
                                <li v-if="user.isOpenTransferScale"> 
                                    <div class="desc">转让比例：</div>
                                    <div class="amount"><InputNumber ref="inputnumber" :ifFocusEvent="true" :loanId="user.debtId" :step="1" :min="1" :max="100" unit="%" unitPosition="right" :ifShowZero="true"
                                        type="currency" :readonly="false" :decimalPoint="1" @change="changeTransferScale" :maxlength="3" placeholder="" :defaultValue="100"/></div>
                                    <div class="tips">债权金额可以按比例转让部分债权，可设为1%~100%，间隔1%</div>
                                </li>
                                <li style="margin:0 0 15px">
                                  <div class="desc2"><a-checkbox @change="changeIsFree">转让时免垫付利息</a-checkbox></div>
                                  <div class="tips tips2">免垫付利息，则转让时只收回待收本金，受让方无需垫付本期未结利息</div>
                                </li>
                                <li v-if="user.maxDiscountScale&&user.maxDiscountScale>0"> 
                                    <div class="desc">折价比例：</div>
                                    <div class="amount"><InputNumber ref="inputnumber" :ifFocusEvent="true" :loanId="user.debtId" :step="0.1" :min="0" :max="user.maxDiscountScale" unit="%" unitPosition="right" :ifShowZero="true"
                                        type="currency" :readonly="false" :decimalPoint="1" @change="changeDiscountScale" :maxlength="3" placeholder="" :defaultValue="0"/></div>
                                    <div class="tips">折价可以让转让尽快成交，可设为0%~{{user.maxDiscountScale}}%，间隔0.1%，设为0%则不折价</div>
                                </li>
                                <li> 
                                    <div class="desc">转让金额：</div>
                                    <div class="amount"><span class="text-import">{{transferedAmt|formatCurrency}}</span>&nbsp;元</div>
                                    <div class="tips">转让金额=待收本金x转让比例{{user.maxDiscountScale?'x(1-折价比例)':''}}{{isFree?'':'+本期未结利息x转让比例'}}</div>
                                </li>
                                <li>
                                    <div class="desc">手&nbsp;&nbsp;续&nbsp;&nbsp;费：</div>
                                    <div class="amount"><span>{{(user.transferFee>0)?formatCurrency(zqAmt*0.005):'0.00'}}</span>&nbsp;元</div>
                                    <div class="tips">债权金额的0.5%，转让成功后收取；如债权持有大于等于90天，则免手续费；</div>
                                </li>
                                <li>
                                    <a-checkbox @change="changeAgreement">我已阅读并同意</a-checkbox>
                                    <a :href="'/contract/debt?assetsId='+user.debtId" target="_blank">《债权转让协议》</a>
                                </li>
                                <li>
                                    <button type="button" :class="['btn','btn-primary',agreement?'':'disabled']" :disabled="!agreement" @click="submitApply">确定</button>
                                </li>
                            </ul>
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
import InputNumber from '@/components/form/InputNumber'
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
        InputNumber
    },
    data() { 
        return {
            ifInitDatas:false,
            agreement:false,
            discountScale:0,
            transferScale:100,
            loanId:'',
            isFree:0,
            user:{},
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
        zqAmt(){
            let advanceInterest=(this.isFree==0)?this.user.advanceInterest:0;
            return (this.user.planPrincipal+advanceInterest)*(this.transferScale/100);
        },
        transferedAmt(){
            let advanceInterest=(this.isFree==0)?this.user.advanceInterest:0;
            return this.user.planPrincipal*(this.transferScale/100)*(1-this.discountScale/100) + advanceInterest*(this.transferScale/100);
        },
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.loanId=this.$route.params.uuid
        this.initData();
    },
    methods:{
        formatCurrency,
        initData(){
            this.$post('/member/transfer/apply/'+this.loanId).then(res => {
                this.user=toJson(res).data;
                console.log(this.user.transferAmt,this.user.planPrincipal)
                this.ifInitDatas=true;
            })
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
        changeIsFree(e){
            this.isFree=e.target.checked?1:0;  
        },
        changeTransferScale(result){
            this.transferScale=Number(parseFloat(result.value).toFixed(1))
        },
        changeDiscountScale(result){
            this.discountScale=Number(parseFloat(result.value).toFixed(1))
        },
        submitApply(){
            let _this=this;
            if(Number.isFinite(_this.discountScale)){
                this.$confirm({
                    title: '您确定要申请转让该笔债权吗？',
                    content: '',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        _this.$post('/member/transfer/applyConfirm',{
                            discountScale:_this.discountScale,
                            debtId:_this.user.debtId,
                            isFree:_this.isFree,
                            transferScale:_this.transferScale,
                        }).then(res => {
                            let result=toJson(res)
                            if (result.success) {
                                _this.$router.push('/spa/member/invest/holdlist')
                            } else {
                                _this.$layer.msg(result.msg);
                            }
                        })
                    },
                    onCancel() {
                    
                    },
                });
            }else{
                _this.$layer.msg('请输入正确格式的折价比例');
            }
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-transfer-detail{
    .bd{background:#fff;padding:20px;}
    .datatable{
        tbody td{border:1px solid #d2d2d2;text-align:center;color: #666;height:46px;line-height:46px;padding:0 5px;}
        tbody tr td:nth-child(2n-1){background:#fafafa;}
    } 
    .tip-warning{background: #fff0cd;color: #a26400;line-height: 25px;padding: 10px 20px;}
    ul.infolist{background:#f8f8f8;padding:20px 25px;margin-top:20px;
        li{line-height:30px;overflow:hidden;}
        .desc{float:left;width:90px;padding-bottom:10px;}
        .desc2{float:left;width:250px;}
        .amount{float:left;width:160px;padding-bottom:10px;text-align:right;}
        .amount span{font-size:16px;}
        .amount span.text-import{color:#ff8c00;font-size:24px;}
        .tips{float:left;color:#666;padding-bottom:10px;padding-left:50px;}
        .tips2{padding-bottom:0;}
        .agreement{color:#999;}
        .btn{width:170px;margin:10px 25px 0;line-height:40px;height:40px;border:1px solid transparent;white-space: nowrap;padding:0 10px;border-radius:5px;}
        .btn.disabled{background:#ccc;color:#fff;border-color:#ccc;}
    }
}
</style>
