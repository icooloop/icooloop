<template>
    <div id="index">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer">
            <div :class="{'new-hard':true,'islogin':pageInfo.loginInfo.isLogin}">
                <div class="login-container">
                </div>
                <div class="title">注册即领888元红包</div>
                    <ul class="red-list clearfix">
                        <li>
                            <h3>20<span>元</span></h3>
                            <p>单笔出借≥2,000元</p>
                            <p>项目期限≥30天</p>
                        </li>
                        <li>
                            <h3>50<span>元</span></h3>
                            <p>单笔出借≥6,000元</p>
                            <p>项目期限≥90天</p>
                        </li>
                        <li>
                            <h3>100<span>元</span></h3>
                            <p>单笔出借≥20,000元</p>
                            <p>项目期限≥90天</p>
                        </li>
                        <li>
                            <h3>160<span>元</span></h3>
                            <p>单笔出借≥20,000元</p>
                            <p>项目期限≥180天</p>
                        </li>
                        <li>
                            <h3>258<span>元</span></h3>
                            <p>单笔出借≥32,000元</p>
                            <p>项目期限≥180天</p>
                        </li>
                        <li>
                            <h3>300<span>元</span></h3>
                            <p>单笔出借≥40,000元</p>
                            <p>项目期限≥180天</p>
                        </li>
                    </ul>
                <div class="title">简单四步，立返现金享收益</div>
                <ul class="process-list clearfix">
                    <li><p>30秒快速注册</p>
                        <p>赚888元红包</p></li>
                    <li><p>实名认证和绑卡</p>
                        <p>资金更透明</p></li>
                    <li>选择合适出借项目</li>
                    <li>出借立返享收益</li>
                </ul>
                <div class="title">
                    活动规则
                </div>
                <ul class="rule-list">
                    <li>&nbsp;</li>
                    <li>1、活动期内，新用户完成注册即可领取888元大礼包；</li>
                    <li>2、赠送的大礼包，将以红包的形式发放至用户个人中心【我的账户】-【优惠券】中；</li>
                    <li>3、红包使用：①出借时，您可自行选择符合使用条件的红包，出借成功后红包将以现金形式直接发放至账户余额；②红包可叠加使用；③红包需在有效期内进行使用，超过使用期限，则红包自动失效；</li>
                    <li>4、若有疑问可咨询在线客服或拨打客服电话：400-090-9968（工作日9:00-18:00）；</li>
                    <li>5、活动期间内，如规则有所调整，以本平台公布的新公告或公告刷新的内容为准，恕不再另外单独向用户进行提醒；</li>
                </ul>
                <router-link class="reg-link" to="/spa/secure/register" v-show="!pageInfo.loginInfo.isLogin">注册领取888元红包</router-link>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'

export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
@import "~@/assets/style/event/novice.less";
</style>