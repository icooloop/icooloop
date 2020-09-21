<template>
    <div class="m-deposit">
        <div class="hd"><img alt="" src="@/assets/images/user/deposit_logo.png" class="logo"></div>
        <div class="bd">
            <h4>账户升级为新网银行存管账户</h4>
            <div class="desc mt-30">亿钱贷已接入新网银行资金存管，<br> 您的充值、出借、提现等资金操作均需开通存管账户后才能进行。</div>
            <div class="mt-30"><a class="btn btn-warning btn-deposit" href="/member/depository/form" target="_parent">开通存管账户</a></div>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        return {

        }
    },
    methods:{
        closeModal(){
            this.$emit('closeModal');
        }
    }
 }
</script>

<style scoped>
.m-deposit{position:relative;text-align:center;}
.m-deposit .hd{line-height:156px;height:156px;position:relative;}
.m-deposit .bd{border-top:1px solid #e5e5e5;padding-top:40px;padding-bottom:40px;}
.m-deposit .bd .btn-deposit{width:310px;line-height:50px;height:50px;font-size:16px;border-radius:5px;}
.m-deposit .bd h4{font-size:20px;font-weight:700;}
.m-deposit .bd .desc{color:#666;line-height:25px;}
</style>