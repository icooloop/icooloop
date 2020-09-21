<template>
    <div>
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer md-wechat" >
            <div class="container">
                <ul class="list list1 clearfix">
                    <li class="wow rollIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        <img src="@/assets/images/static/wechat/icon1.png">
                        <p>项目回款</p></li>
                    <li class="wow rollIn" data-wow-duration="1s" data-wow-delay="0.4s">
                        <img src="@/assets/images/static/wechat/icon2.png">
                        <p>提现到账</p></li>
                    <li class="wow rollIn" data-wow-duration="1s" data-wow-delay="0.7s">
                        <img src="@/assets/images/static/wechat/icon3.png">
                        <p>充值到账</p></li>
                    <li class="wow rollIn" data-wow-duration="1s" data-wow-delay="1s">
                        <img src="@/assets/images/static/wechat/icon4.png">
                        <p>出借成功</p></li>
                </ul>
                <ul class="list list2 clearfix">
                    <li class="wow rotateInDownRight" data-wow-duration="1s" data-wow-delay="0.1s">
                        <img src="@/assets/images/static/wechat/icon5.png">
                        <p>新手指引</p></li>
                    <li class="wow rotateInDownRight" data-wow-duration="1s" data-wow-delay="0.4s">
                        <img src="@/assets/images/static/wechat/icon6.png">
                        <p>新手福利</p></li>
                    <li class="wow rotateInDownRight" data-wow-duration="1s" data-wow-delay="0.7s">
                        <img src="@/assets/images/static/wechat/icon7.png">
                        <p>随时出借</p></li>
                    <li class="wow rotateInDownRight" data-wow-duration="1s" data-wow-delay="1s">
                        <img src="@/assets/images/static/wechat/icon8.png">
                        <p>信息披露</p></li>
                </ul>
                <div class="steps">
                    <img class="step1 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.1s" src="@/assets/images/static/wechat/step1.png" alt="">
                    <img class="step2 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.5s" src="@/assets/images/static/wechat/step2.png" alt="">
                    <img class="step3 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.9s" src="@/assets/images/static/wechat/step3.png" alt="">
                    <img class="step4 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.1s" src="@/assets/images/static/wechat/step4.png" alt="">
                    <img class="step5 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.5s" src="@/assets/images/static/wechat/step5.png" alt="">
                    <img class="step6 wow bounceIn" data-wow-duration="1s" data-wow-delay="0.9s" src="@/assets/images/static/wechat/step6.png" alt="">
                </div>
            </div>
        </div>  
        <EventFooter background='#f46b41' color="#fff"></EventFooter>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import { WOW } from 'wowjs'
import animate from 'animate.css'

export default {
    components:{
        Header,
        EventFooter,
    },
    data() {
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted() {
        new WOW().init();
    },
 }
</script>

<style lang="less">
.md-wechat{
    height:2491px;
    background:url(../../assets/images/static/wechat/bg.jpg) no-repeat top center;
    .container{
        position: relative;
        width:890px; 
        margin:0 auto;
        padding-top:777px;
        .list{
            padding:0 50px;
            li{text-align: center;float: left;width:195px;
                p{padding-top:10px;color:#666;}
            }
        }
        .list1{height:330px;}
        .list2{height:440px;}
        .steps{
            position: relative;height:850px;
            .step1{position: absolute;left:65px;top:47px;}
            .step2{position: absolute;left:330px;top:56px;}
            .step3{position: absolute;left:620px;top:147px;}
            .step4{position: absolute;left:28px;top:534px;}
            .step5{position: absolute;left:339px;top:535px;}
            .step6{position: absolute;left:636px;top:636px;}
        }
    }
}
</style>