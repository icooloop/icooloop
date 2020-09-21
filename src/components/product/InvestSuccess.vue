<template>
    <div class="subscription-success">
        <div class="hd clearfix">
            <i class="icon-font icon-cat-success text-success"></i>
            <h2>您已成功出借</h2>
            <p>{{investResult.prdName}}</p>
        </div>
        <div class="bd">
            <ul class="process">
                <li>
                    <h4>成功出借{{investResult.investAmount}}元
                        <span v-if="investResult.useCoupon">,使用红包{{investResult.useCoupon}}</span>
                        <span v-if="investResult.interestTicket">,使用奖励券{{investResult.interestTicket}}%</span>
                    </h4>
                    <span>{{investResult.currentTime| dateformat('YYYY-MM-DD HH:mm')}}</span>
                </li>
                <li>
                    <h4>开始计息</h4>
                    <span>满标后，放款成功开始计息</span>
                </li>
                <li>
                    <h4>项目到期</h4>
                    <span>起息日{{investResult.settleStr}}后到期， 
                        预期收益{{investResult.expectIncome|formatCurrency}}元
                    </span>
                </li>
            </ul>
            <div class="text-c mt-50">
                <router-link class="btn btn-default size-X radius mr-20" to="/spa/member/invest/holdlist?tabType=holdList">查看资产</router-link>
                <a class="btn btn-warning size-X radius" href="/spa/product/index">继续出借</a>
            </div>
        </div>
    </div>
</template>

<script>
import {formatCurrency,dateformat} from  '@/utils/utils'
export default {
     props:{
        investResult:{
            type: Object,
            default: () => ({})
        },
    },
    filters:{
        formatCurrency,dateformat
    },
    data() { 
        return {

        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/product.less";
</style>