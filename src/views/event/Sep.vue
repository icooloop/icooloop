<template>
    <div class="m-page">
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer">
            <div class="md-act">
                <div class="acttime">&nbsp;</div>
                <div class="wp">
                    <div class="md-bonus">
                        <div class="maintitle">奖励券天天领</div>
                        <div class="maindesc mt-10">&nbsp;</div>
                        <ul class="list clearfix mt-30">
                            <li v-for="rule in rules" :key="rule.ruleId" :class="count>=allCount?'disabled':''">
                                <div class="jiaxi">奖励券</div> 
                                <div class="rate">{{rule.awardAmount}}<em>%</em></div> 
                                <div v-if="!pageInfo.loginInfo.isLogin"><button type="button" @click="layerLogin" class="btn btn-act">立即登录</button></div>
                                <div v-else-if="count>=allCount"><button type="button" class="btn btn-act disabled">明日再来</button></div>
                                <div v-else><button type="button" @click="openBonus(rule.ruleId,rule.awardAmount)" :class="['btn','btn-act',disabledBonus?'disabled':'']" :disabled="disabledBonus"><a-spin size="small" v-if="disabledBonus"/>立即领取</button></div>
                                <div class="limit">{{rule.limit}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="md-rule mt-60">
                        <div class="maintitle">活动规则</div>
                        <div class="bd">
                            <p>奖励券领取规则：每个账户每天可领取5张奖励券。每买入1笔债权，可新增1次领券机会。该奖励券可以用于债权转让，奖励收益与债权的本息回款同时发放。</p>
                        </div>
                    </div>
                </div>
                <EventFooter background='#ff7516' color="#fff" :height="80" class="mt-60"></EventFooter>
            </div>
        </div>
        <!-- 登录modal -->
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="closeLogin" :centered="true" width="490" :closable="false">
            <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
            <Login @loginSuccess="loginSuccess"></Login>
        </a-modal>
        <!-- 领取奖励券modal -->
        <a-modal class="md-bonuslayer" :title="false" :visible="bonusDiv.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="'auto'" :closable="false">
           <div class="md-bonustip">
                <div class="close" @click="closeBonus"><i class="icon-font icon-close"></i></div>
                <div class="bonusdesc">奖励券</div>
                <div class="amount">+{{awardAmount}}%</div>
                <div class="bonusbtn"><a href="javascript:;" class="btn-bonus" @click="closeBonus">好的</a></div>
            </div>
        </a-modal>
        <!-- layer金币 -->
        <div v-if="showBounsAni">
            <div class="win_state"><img src="@/assets/images/event/august/layericon.png" height="120" alt="" /></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import Login from '@/components/layer/Login'
import Whattip from '@/components/common/Whattip'
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
import { setTimeout } from 'timers'
import Vue from 'vue'
import {Pagination} from 'ant-design-vue'
Vue.use(Pagination)
export default {
    components:{
        Header,
        EventFooter,
        Login,
        Whattip,
    },
    data() { 
        return {
            showBounsAni:false,
            loginStyle:{padding:'20px 0 10px'},
            ifShowLogin:false,
            disabledBonus:false,
            bonusDiv:{
                ifShow:false,
                submit:false,
                bodyStyle:{padding:0,background:'none'},
            },
            count:0,
            allCount:0,
            awardAmount:0,
            rules:[],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    filters:{
        formatCurrency,dateformat
    },
    mounted(){
        this.initData()
        //this.showBonus()
    },
    methods:{
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
        initData(){
            this.$post('/event/2019/sep').then(res => {
                let result=toJson(res);
                console.log("[initdata]"+JSON.stringify(result))
                this.count=result.count;
                this.allCount=result.allCount;
                this.rules=result.rules;
            })
        },
        openBonus(ruleId,awardAmount){
            let _this=this;
            this.awardAmount=awardAmount;
            if (!this.bonusDiv.submit) {
                if(typeof ruleId == "undefined" || ruleId == null || ruleId == ""){
                    return this.$error({title:'活动未开始或已结束',content: '',centered:true,okText:"确定"});
                }
                this.disabledBonus=true;
                this.$post('/event/dec/award',{ruleId}).then(res => {
                    let result=toJson(res);
                    this.disabledBonus=false;
                    if(result.success){
                        this.count+=1;
                        this.showBonus()
                    }else{
                        if(result.code == '-3'){
                            this.$confirm({
                                iconType:'exclamation-circle',content:false,centered:true,
                                cancelText:"取消",okText:"去出借",title:result.msg,
                                onOk(){
                                    _this.$router.push('/spa/product/index')
                                }
                            });
                        }else{
                            if(result.code == '-1'){
                                let baseLoginInfo = {isLogin: false,voucherFlag: false,nickName: '',userType: 1,loanCount: 0,vipStatus: 0}
                                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo , ...baseLoginInfo}
                            }
                            this.$warning({title:result.msg,content: '',centered:true,okText:"确定"});
                        }
                    }
                })
            }
        },
        showBonus(){
            this.showBounsAni=true;
            setTimeout(()=>{
                this.showBounsAni=false
                if(this.count==this.allCount){
                    this.bonusDiv.submit = true;
                }
                this.bonusDiv.ifShow=true;
            },1500)
        },
        closeBonus(){
            this.bonusDiv.ifShow=false;
        },
    }
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/event/sep.less";
</style>

<style>
.md-bonuslayer .ant-modal-content{border-radius:35px;background:none;}
</style>
