<template>
    <div id="index">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="md-control">
            <div class="wp">
                <div class="mtitle"><img src="@/assets/images/event/control/title.png"></div>
                <div class="bd">
                    <p>2018年12月6日，深圳市互金协会发布《关于进一步规范网络借贷信息中介行业专项整治期间有关行为的通知》，暂时控制待偿余额不增长，保持出借人总数动态减少。</p>
                    <p>为严格执行该通知，亿钱贷从即日起实行以下待偿余额及出借人总数管控的暂行办法。合规运营是亿钱贷一直以来的坚持，感谢大家的理解与支持。</p>
                    <div class="data clearfix mt-30">
                        <div class="item item1">
                            <h4>{{loanControlSum|formatCurrency}}</h4>
                            <h6>当前代偿余额</h6>
                        </div>
                        <div class="item item2">
                            <h4>445,595,650.05</h4>
                            <h6>2018年12月6日代偿余额</h6>
                        </div>
                        <div class="item item3">
                            <h4>{{loanControlCount}}</h4>
                            <h6>当前出借人总数</h6>
                        </div>
                        <div class="item item4">
                            <h4>4,745</h4>
                            <h6>2018年12月6日出借人总数</h6>
                        </div>
                    </div>
                    <h2 class="mt-30">一、关于代偿余额的管控</h2>
                    <p>平台将通过控制易智投和散标的发布，实现对代偿余额的管控。当代偿余额接近或高于2018年12月6日代偿余额时，将暂停发布新的易智投或散标。</p>
                    <h2 class="mt-30">二、关于出借人总数的管控</h2>
                    <p>平台将通过“出借资格”实现对出借人总数的管控。具备“出借资格”的用户才能进行出借，具体措施如下：<br>
                    1、从即日起有待收资产的用户，或无待收但7天内有回款的用户，将自动获得“出借资格”；<br>
                    2、当出借人总数低于2018年12月6日出借人总数时，无“出借资格”的用户在出借时，将自动获得“出借资格”；<br>
                    3、拥有“出借资格”的用户，全部资产已回款，无待收的情况连续超过7天，将自动失去“出借资格”。</p>
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
import {formatCurrency} from '@/utils/utils'


export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            loanControlSum:0,
            loanControlCount:0,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    filters:{
		formatCurrency
	},
    computed:{
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
.md-control{background:url(../../assets/images/event/control/bg.jpg) no-repeat top center;min-height:1156px;}
.md-control .wp{width:1154px;}
.md-control .mtitle{padding:130px 50px 90px;}
.md-control .bd{background:#fff;border-radius:10px;padding:35px 0 100px;}
.md-control .bd>p{padding:0 55px;line-height:30px;font-size:16px;color:#666;}
.md-control .bd>h2{padding:0 55px;line-height:40px;font-size:18px;color:#666;font-weight:700;}
.md-control .bd .data{background:url(../../assets/images/event/control/bg2.png) no-repeat top center;padding:59px 0;}
.md-control .bd .data1{float:left;width:605px;}
.md-control .bd .data2{float:left;width:440px;}
.md-control .bd .data .item{float:left;text-align:center;position:relative;}
.md-control .bd .data .item1,.md-control .bd .data .item2{width:330px;}
.md-control .bd .data .item3,.md-control .bd .data .item4{width:225px;}
.md-control .bd .data .item1:after,.md-control .bd .data .item3:after{display:block;content:"";width:4px;height:60px;background:url(../../assets/images/event/control/border.png) no-repeat;position:absolute;right:0;top:0;}
.md-control .bd .data .item h4{line-height:30px;font-size:30px;}
.md-control .bd .data .item h6{line-height:25px;font-size:16px;padding-top:5px;}
</style>