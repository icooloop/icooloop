<template>
    <div>
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer">
            <div class="md-act">
                <div class="bd wp">
                    <div class="act1" id="mode1">
                        <div class="intro">好友注册后自动发放10元红包，数量上不封顶</div>
                        <a href="javascript:;" class="btn btn-invest" @click="layerLogin" v-if="!pageInfo.loginInfo.isLogin">马上邀请</a>
                        <a href="/spa/member/recommend" class="btn btn-invest" v-else>马上邀请</a>
                    </div>
                    <div class="act2" id="mode2">
                        <div class="intro">推荐的单个好友注册后30个自然日内，累计出借达到相应的金额（出借期限≥3个月或90天），可获得相应的现金奖励</div>
                        <div class="rule" @click="ifShowRule1=true">规则详情>></div>
                        <ul class="list">
                            <li><div class="amount">¥50</div>
                                <p>10,000元≤累计出借额＜30,000元</p>
                            </li>
                            <li><div class="amount">¥50</div>
                                <p>30,000元≤累计出借额＜50,000元</p>
                            </li>
                            <li><div class="amount">¥100</div>
                                <p>累计出借额≥50,000元</p>
                            </li>
                        </ul>
                    </div>
                    <div class="act3" id="mode3">
                        <div class="intro">推荐用户出借，可获得被推荐人待收本金年化x%的现金奖励</div>
                        <div class="rule" @click="ifShowRule2=true">规则详情>></div>
                        <ul class="list">
                            <li><div class="desc">好友待收本金年化</div>
                                <div class="amount">奖励<span class="c-import"><em>0.4</em>%</span></div>
                                <div class="remark">被推荐人待收之和<50,000元</div>
                            </li>
                            <li><div class="desc">好友待收本金年化</div>
                                <div class="amount">奖励<span class="c-import"><em>0.6</em>%</span></div>
                                <div class="remark">50,000元≤被推荐人待收之和＜200,000元</div>
                            </li>
                            <li><div class="desc">好友待收本金年化</div>
                                <div class="amount">奖励<span class="c-import"><em>0.8</em>%</span></div>
                                <div class="remark">被推荐人待收之和≥200,000元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="btndiv" v-if="!pageInfo.loginInfo.isLogin"><a href="javascript:;" class="btn btn-invest" @click="layerLogin">马上邀请</a></div>
                    <div class="btndiv" v-else><a href="/spa/member/recommend" class="btn btn-invest">马上邀请</a></div>
                </div>
            </div>
        </div>
        <EventFooter background='#171717' color="#fff" :height="60"></EventFooter>
        <!-- 登录modal -->
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="closeLogin" :centered="true" width="490">
            <Login @loginSuccess="loginSuccess"></Login>
        </a-modal>
        <a-modal class="md-layer" :title="false" :visible="ifShowRule1" :maskClosable="false" :bodyStyle="bodyStyle"
            :footer="null" :centered="true" :width="700" :closable="false">
            <div class="md-rule">
                <div class="hd">规则详情<i class="icon-font icon-close" @click="ifShowRule1=false"></i></div>
                <div class="bd">
                    <p>1、推荐的单个好友注册后30个自然日内，累计出借达到相应的金额（出借期限≥3个月或90天），可获得相应的现金奖励，具体如下：</p>
                    <table class="table datatable mt-10">
                        <tr><td>级别1</td><td>10,000元≤累计出借额＜30,000元</td><td>50元</td></tr>
                        <tr><td>级别2</td><td>30,000元≤累计出借额＜50,000元</td><td>50+50元</td></tr>
                        <tr><td>级别3</td><td>累计出借额≥50,000元</td><td>50+50+100元</td></tr>
                    </table>
                    <p class="mt-10">2、奖励发放：满足条件以出借时间为准，奖励在满足各级别的最后一个项目放款后次个自然日发放。推荐好友注册人数不限，符合条件即可获得奖励。举例：A推荐B，B在注册后30天内累计出借5万，则可获得50+50+100元现金奖励。</p>
                    <p class="mt-10">3、适用项目：散标、易智投。</p>
                    <p class="mt-10">4、活动时间节点说明：2018年10月1日起推荐注册的会员享受此项奖励。</p>
                </div>
            </div>

        </a-modal>
        <a-modal class="md-layer" :title="false" :visible="ifShowRule2" :maskClosable="false" :bodyStyle="bodyStyle" 
            :footer="null" :centered="true" :width="700" :closable="false">
            <div class="md-rule">
                <div class="hd">规则详情<i class="icon-font icon-close" @click="ifShowRule2=false"></i></div>
                <div class="bd">
                    <p>1，推荐用户出借，可获得被推荐人待收本金年化x%的现金奖励，奖励比例如下：</p>
                    <table class="table datatable mt-10">
                        <tr><td>被推荐人待收之和＜50,000元</td><td><span class="text-import">0.4%</span></td></tr>
                        <tr><td>50,000元≤被推荐人待收之和＜200,000元</td><td><span class="text-import">0.6%</span></td></tr>
                        <tr><td>被推荐人待收之和≥200,000元</td><td><span class="text-import">0.8%</span></td></tr>
                    </table>
                    <p class="mt-10">2，奖励发放时间：出借项目放款后（易智投起息后）计入待收本金，每日奖励金额=待收本金*x%/360天，次日发放。</p>
                    <p class="mt-10">3，适用项目：散标、易智投、债权转让。</p>
                    <p class="mt-10">4，活动时间节点说明：自2018年10月1日起，待收本金的奖励比例按照以上规则计算。因2018年8月1日0点之前起息的债权推荐奖励一次性发放，则该时间前的债权不计算此部分奖励。</p>
                </div>
            </div>
        </a-modal>
        <div class="md-side">
            <ul class="list">
                <li><a href="javascript:;" class="desc" @click="goAnchor('#mode1')">10元红包</a></li>
                <li><a href="javascript:;" class="desc" @click="goAnchor('#mode2')">200元现金</a></li>
                <li><a href="javascript:;" class="desc" @click="goAnchor('#mode3')">0.8%佣金</a></li>
                <li v-if="!pageInfo.loginInfo.isLogin"><div class="btn-invest" @click="layerLogin">马上邀请</div></li>
                <li v-else><div class="btn-invest" @click="ifShowInvest=!ifShowInvest">马上邀请</div>
                    <div class="investhover" v-show="ifShowInvest">
                        <div class="hd">通过以下姿势邀请好友<i class="icon-font icon-close" @click="ifShowInvest=false"></i></div>
                        <div class="bd">
                            <div class="item"><em>姿势一</em>
                                <p>请好友注册时填写您的专属推荐码</p>
                                <h6 class="mt-5"><span class="text-import">{{recomCode}}</span>或<span class="text-import">{{userMobile}}</span></h6>
                            </div>
                            <div class="item mt-15"><em>姿势二</em>
                                <p>复制链接发送给好友<a href="javascript:;" class="btn btn-copy ml-30" v-clipboard:copy="copyContent" v-clipboard:success="copySuccess" v-clipboard:error="copyError">点击复制</a></p>
                            </div>
                        </div>
                    </div>
                </li>
                <li v-if="pageInfo.loginInfo.isLogin"><a class="btn-link" href="/spa/member/recommend" target="_blank">查看我的奖励</a></li>
                <li v-else><a class="btn-link"  href="javascript:;" @click="layerLogin">查看我的奖励</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import Login from '@/components/layer/Login'
import {toJson,formatCurrency} from  '@/utils/utils'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
    components:{
        Header,
        EventFooter,
        Login,
    },
    data() {
        return {
            loginStyle:{padding:'20px 0 10px'},
            bodyStyle:{padding:0,background:'none'},
            ifShowRule1:false,
            ifShowRule2:false,
            ifShowLogin:false,
            ifShowInvest:false,
            userMobile:'',
            recomCode:'',
            copyContent:'',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    filters:{
        formatCurrency
    },
    mounted(){
        if(this.pageInfo.loginInfo.isLogin) this.initData()
    },
    methods:{
        initData(){
            this.$post('/event/recommend').then((res)=>{
                this.recomCode=toJson(res).recomCode
                this.userMobile=toJson(res).userMobile
                this.copyContent='https://www.yiqiandai.com/secure/land?code='+this.recomCode
            })
        },
        layerLogin(){
            this.ifShowLogin=true
        },
        closeLogin(){
            this.ifShowLogin=false
        },
        loginSuccess(){
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.closeLogin()
                this.initData()
            })
        },
        goAnchor(selector) {
            let anchor = this.$el.querySelector(selector)
            document.documentElement.scrollTop = anchor.offsetTop
        },
        copySuccess(){
            this.$layer.msg("复制成功~")
        },
        copyError(){
            this.$layer.msg("复制失败~")
        }
    }
 }
</script>
<style lang="less">
@import "~@/assets/style/event/recommend.less";
.md-layer .ant-modal-content{border-radius:10px;overflow: hidden;}
</style>