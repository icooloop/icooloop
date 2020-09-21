<template>
    <div class="m-layer-risk">
        <div class="bd" v-if="!user.assessStatus">
            <div class="pic"><img src="@/assets/images/product/img_risk.png"></div>
            <h5>{{user.riskTip=='0'?'您风险评估已过期':'您尚未完成风险评估'}}<br>完成评估后即可继续出借</h5>
            <h6 class="mt-20">为了让我们更好的了解您的风险偏好与风险承受能力</h6>
            <div class="mt-20"><a class="btn btn-primary" href="/member/auth/risk-ass">立即评测</a></div>
        </div>
        <div class="bd" v-else-if="isAssetstRisk">
            <h6>您的风险承受能力为</h6>
            <div class="pic"><img src="@/assets/images/product/img_risk2.png"></div>
            <h5>{{pageInfo.loginInfo.riskAss}}</h5>
            <div class="mt-20">当前项目的风险等级为<span class="text-danger">{{user.riskGradeStr}}</span>,请重新选择其他出借的项目</div>
            <div class="mt-5">或重新进行<a class="text-primary" href="/member/auth/risk-ass">风险评测</a></div>
            <div class="mt-20"><a class="btn btn-primary" href="javascript:;" @click="closemodal">我知道了</a></div>
        </div>
        <div class="bd" v-else-if="(user.totalDue+loan.investAmt)>(user.userAssessLimit)*10000">
            <div class="closeicon" onclick="layer.closeAll()"><i class="icon-font icon-close"></i></div>
            <h6>您的风险承受能力为 </h6>
            <div class="pic"><img src="@/assets/images/product/img_risk2.png"></div>
            <h5>{{pageInfo.loginInfo.riskAss}}</h5>
            <div class="mt-20">相对应的出借金额上限为<span class="text-danger">{{user.userAssessLimit}}万元</span></div>
            <div class="mt-5">当前累计已出借<span class="text-danger">{{user.totalDue}}</span>元,请修改出借金额或重新进行<a class="text-primary" href="/member/auth/risk-ass">风险评测</a></div>
            <div class="mt-20"><a class="btn btn-primary" href="javascript:;" @click="closemodal">我知道了</a></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pageInfo:{
            type: Object,
            default: () => ({})
        },
        user:{
            type: Object,
            default: () => ({})
        },
        loan:{
            type: Object,
            default: () => ({})
        },
        isAssetstRisk:{
            type: Boolean,
            default:false
        },
    },
    data() { 
        return {

        }
    },
    methods:{
        closemodal(){
            this.$emit('closemodal')
        }
    }
 }
</script>

<style lang="less" scoped>
.m-layer-risk{
    .bd{text-align:center;position:relative;padding:50px 20px;
        h5{line-height:25px;font-size:18px;font-weight:bold;}
        h6{line-height:20px;font-size:16px;color:#8e8e8e;}
        .pic{padding:5px;}
        .btn{line-height:42px;height:42px;width:160px;padding:0;font-size:16px;border-radius:5px;}
    }
}
</style>