<template>
    <div class="mu-left">
        <ul class="mu-menu">
            <li :class="{on:userOn=='user_index'}"><router-link to="/spa/member/account/index"><i class="icon-font icon-account1"></i>账户总览</router-link></li>
            <li><h2><i class="icon-font icon-save"></i>我的出借</h2></li>
            <ul>
                <li :class="{on:userOn=='user_autobid'}"><router-link to="/spa/member/invest/autobid">易智投</router-link></li>
                <li :class="{on:userOn=='user_hold'}"><router-link to="/spa/member/invest/holdlist">散标资产</router-link></li>
                <li :class="{on:userOn=='user_plan'}"><router-link to="/spa/member/invest/backplan">回款计划</router-link></li>
            </ul>
            <li><h2><i class="icon-font icon-mymy"></i>我的资金</h2></li>
            <ul>
                <li :class="{on:userOn=='user_recharge'}"><router-link to="/spa/member/account/recharge">账户充值</router-link></li>
                <li :class="{on:userOn=='user_cash'}"><router-link to="/spa/member/account/cash">账户提现</router-link></li>
                <li :class="{on:userOn=='user_deal'}"><router-link to="/spa/member/deal/index">交易流水</router-link></li>
            </ul>
            <li><h2><i class="icon-font icon-take"></i>我的奖励</h2></li>
            <ul>
                <li :class="{on:userOn=='user_task'}"><router-link to="/spa/member/task">任务中心<span class="dot"></span></router-link></li>
                <li :class="{on:userOn=='user_voucher'}"><router-link to="/spa/member/voucher">优惠券<span class="dot" v-if="pageInfo.loginInfo.voucherFlag"></span></router-link></li>
                <li :class="{on:userOn=='user_recommend'}"><router-link to="/spa/member/recommend">推荐奖励</router-link></li>
            </ul>
            <li :class="{on:userOn=='user_security'}"><router-link to="/spa/member/secure/security"><i class="icon-font icon-save_"></i>账户设置</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['pageInfo','userOn'],
    data() { 
        return {
        }
    },
    mounted(){
        if(this.pageInfo.loginInfo.userType=='2' && this.pageInfo.loginInfo.authIdcard == '0'){
            this.$post('/member/auth/fresh').then(res => {
            })
        }
    },
 }
</script>

<style scoped>
.mu-left {background-color:#fff;color:#333333;margin:0 20px 20px 0;position:relative;width:195px;float:left;}
.mu-left .dot {display:inline-block;height:0;width:30px;position:relative;}
.mu-left .dot:after{content:'';background:#f00;border-radius:6px;width:6px;height:6px;position:absolute;left:8px;bottom:2px;}
.mu-menu li{position:relative;background:#fafafa;}
.mu-menu li .icon-font{position:absolute;left:30px;top:0;line-height:44px;color:#2c56ad;}
.mu-menu li a{display:block;padding-left:60px;line-height:40px;background:#fafafa;transition:transform .3s;}
.mu-menu>li,.mu-menu>li a{line-height:44px;background:#fff;}
.mu-menu ul{background:#fafafa;padding:3px 0;}
.mu-menu ul li+li{margin-top:5px;}
.mu-menu li a:hover,.mu-menu li.on a{background:#397fed;color:#fff;background:-webkit-linear-gradient(left, #0d55b0 , #037af5);background:linear-gradient(to right,#0d55b0, #037af5);}
.mu-menu li:hover a,.mu-menu li.on a{transform: translateX(8px);}
.mu-menu li:hover a:after,.mu-menu li.on a:after{display:block;content:'';width:0;height:0;border:10px solid transparent;border-left-color:#037af5;position:absolute;right:-20px;top:12px;}
.mu-menu ul li:hover a:after,.mu-menu ul li.on a:after{top:10px;}
.mu-menu li:hover a .icon-font,.mu-menu li.on a .icon-font{color:#fff;}
.mu-menu li h2{padding-left:60px;line-height:44px;background:#fff;line-height:44px;padding-bottom:0;color:#b5bbcc;}
.mu-menu li h2 .icon-font{color:#b5bbcc;}
</style>