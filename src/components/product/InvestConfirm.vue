<template>
    <div class="m-layer-subscription">
        <div class="biddetail">
            <div class="title"><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.loanTitle}}</div>
            <ul class="details">
                <li>
                    <div class="rate text-warning">{{loan.platRate}}<em>%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em></div>
                    <p>协议约定年化利率<Whattip :notes="whatnotes"/></p></li>
                <li>
                    <div class="limit">{{loan.loanPeriod}}<em> {{loan.periodStr}}</em></div>
                    <p>{{loan.repayModeStr}}</p>
                </li>
            </ul>
        </div>
        <div class="bd">
            <table class="table datatable">
                <tbody>
                <tr>
                    <td class="text-muted" width="120">出借金额：</td>
                    <td><b>{{loan.investAmt|formatCurrency}}</b>元</td>
                </tr>
                <tr>
                    <td class="text-muted">选择优惠券<Whattip width="275px" notes="平台自动匹配的红包/奖励券不保证符合您的最优选择，以您实际确认使用为准"></Whattip>：</td>
                    <td>
                        <VoucherSelect ref="voucherselect" :loan="loan" width="100%" 
                        @change="changeVoucher" :selectedRedTotal="[]" :selectedTicketTotal="[]"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-muted">预期收益：</td>
                    <td><span class="f-16">{{loan.totalInterest|formatCurrency}}</span> 元<Whattip width="auto" :nowrap="true" arrow="right" :notes="loan.totalInterestText" v-if="loan.totalInterest"/></td>
                </tr>
                </tbody>
            </table>
            <div class="agreementdiv mt-10">
                <a-checkbox @change="changeAgreement">我已阅读并同意</a-checkbox>
                <a target="_blank" class="text-primary" :href="'/contract/exchange?assetsId='+loan.loanId">《借款协议》</a>
                <a target="_blank" class="text-primary" href="/contract/debt-risk">《风险及禁止性行为提示书》</a>
            </div>
            <div class="text-center mt-20">
                <button :class="['btn','btn-warning','btn-subscription',disabledSubmit?'disabled':'']" @click="submitInvest" :disabled="disabledSubmit"><a-spin size="small" class="mr-5" v-if="disabledSubmit"/>确认出借</button>
            </div>
            <p class="text-c text-muted mt-15">市场有风险，出借需谨慎</p>
        </div>
    </div>
</template>

<script>
import ULabel from '@/components/common/ULabel'
import Whattip from '@/components/common/Whattip'
import VoucherSelect from '@/components/form/VoucherSelect'
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
export default {
    props:{
        loan:{
            type: Object,
            default: () => ({})
        },
        disabledSubmit:{
            type: Boolean,
            default:false
        },
    },
    components:{
        Whattip,
        ULabel,
        VoucherSelect,
    },
    data() { 
        return {
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            whatnotes:'此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准',
        }
    },
    filters:{
        formatCurrency,dateformat
    },
    methods:{
        submitInvest(){
            this.$emit('submitInvest')
        },
        changeAgreement(e){
            this.$emit('changeAgreement',e)
        },
        changeVoucher(loan){
            this.$emit('changeVoucher',loan)
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/product.less";
</style>