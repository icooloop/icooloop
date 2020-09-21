<template>
    <div>
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer">
            <div class="md-act">
                <div class="wp">
                    <div class="md-vouchers">
                        <div class="desc">待收本金满1000元可领，每日限量5张</div>
                        <ul class="list">
                            <li v-for="rule in rules" :key="rule.ruleId">
                                <div class="rate">{{rule.awardAmount}}<em>%</em></div> 
                                <div class="limit">{{rule.limit}}</div>
                                <div v-if="!pageInfo.loginInfo.isLogin"><button type="button" @click="layerLogin" class="btn btn-act">立即登录</button></div>
                                <div v-else-if="count>=5"><button type="button" class="btn btn-act disabled">明日再来</button></div>
                                <div v-else><button type="button" @click="openBonus(rule.ruleId)" :class="['btn','btn-act',disabledBonus?'disabled':'']" :disabled="disabledBonus"><a-spin size="small" v-if="disabledBonus"/> 立即领取 </button></div>
                            </li> 
                        </ul>
                    </div>
                    <div class="md-fanxian">
                        <div class="desc">周期一个月</div>
                        <div class="area1">
                            <div class="cashdesc">您的返现金额（元）</div>
                            <div class="cashamt">{{doubleMap.awardAmt|formatCurrency}}</div>
                            <div class="double" v-if="doubleMap.hasDouble"><em>+{{doubleMap.doubleAmt|formatCurrency}}</em>（翻倍奖励）</div>
                        </div>
                        <div class="area2">
                            <div class="cashdesc">年化出借金额：¥{{doubleMap.yearAmt|formatCurrency}}</div>
                            <div v-if="!pageInfo.loginInfo.isLogin"><button type="button" @click="layerLogin" class="btn btn-double">立即登录</button></div>
                            <div v-else-if="!doubleMap.hasDouble"><button type="button" :class="['btn','btn-double','disabled']" :disabled="true"><a-spin size="small" v-if="disabledDouble"/> 点击翻倍 </button></div>
                            <div v-else><button type="button" class="btn btn-double disabled" :disabled="true">奖励已翻倍</button></div>
                            <div class="tip">邀请好友返现可翻倍一次，最高100元</div>
                        </div>
                    </div>
                    <div class="md-rule">
                        <p>返现规则</p>
                        <p>1）活动期间出借的金额（债权转让除外），获得年化出借金额一个月3.6%的返现，返现周期1个月。</p>
                        <p>2）返现金额=年化出借金额*3.6%/12。</p>
                        <p>3）活动期间邀请1个好友注册并出借满1000元（债权转让除外），在返现金额的基础上可获得最高100元的翻倍，限翻倍1次。</p>
                        <p class="pl-25">举例：当前我的返现金额为50元，活动期间邀请1人出借满1000元，则可实现翻倍，则可获得50+50的返现，也可以在返现金额满100后再翻倍，则可返现100+100元。</p>
                        <p>4）返现金额在活动结束后7个工作日发放</p>
                        <p>5）活动时间：2019年5月1日-2019年5月31日</p>
                        <p class="mt-30">年化出借计算方式：</p>
                        <p>1）易智投/每月付息到期还本/一次性还本付息：年化=出借金额*(期限/12)</p>
                        <p>2）等额本息项目</p>
                        <p class="pl-25">期限≤3个月：年化=出借金额*(期限/12)*0.7</p>
                        <p class="pl-25">3个月＜期限≤6个月：年化=出借金额*(期限/12)*0.6</p>
                        <p class="pl-25">期限＞6个月：年化=出借金额*(期限/12)*0.55</p>
                        <p class="pl-25">说明：若是天标，则换算成月，月=项目天数/30</p>
                        <p class="pl-25">每笔出借换算的年化金额保留两位小数，两位小数后面位舍去。</p>
                    </div>
                </div>
            </div>
        </div>
        <EventFooter background='#ffc196' color="#c03523" :height="80"></EventFooter>
        <!-- 登录modal -->
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="closeLogin" :centered="true" width="490">
            <Login @loginSuccess="loginSuccess"></Login>
        </a-modal>
        <!-- 领取奖励券modal -->
        <a-modal :title="false" :visible="bonusDiv.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="'auto'" :closable="false">
           <div class="md-getbonus">
                <div class="close" @click="closeBonus"><i class="icon-font icon-close"></i></div>
                <div class="desc1">恭喜您领取成功</div>
                <div class="desc2 pt-50">您今日已经领取了<em>{{count}}</em>张<br>还可以领取<em>{{5-count}}</em>张</div>
                <div class="btndiv" v-if="count<5"><a href="javascript:;" class="btn btn-act" @click="closeBonus">好的</a></div>
                <div class="btndiv" v-else><a href="/spa/product/index" class="btn btn-act">我要出借</a></div>                
            </div>
        </a-modal>
        <!-- 翻倍modal -->
        <a-modal :title="false" :visible="doubleDiv.ifShow" :maskClosable="false" :bodyStyle="doubleDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="'auto'" :closable="false">
            <div class="md-getdouble">
                <div class="close" @click="closeDouble"><i class="icon-font icon-close"></i></div>
                <div class="result" v-if="doubleMap.status==4">翻倍成功</div>
                <div class="result" v-else>返现到家</div>
                <div class="resultdesc" v-if="doubleMap.status==1">活动期间邀请1人注册且出借<em>1000</em>元<br>可获得最高<em>100</em>元的翻倍奖励</div>
                <div class="resultdesc" v-else-if="doubleMap.status==2">活动期间邀请1人注册且出借<em>1000</em>元<br>可获得最高<em>100</em>元的翻倍奖励<br><br>您已成功邀请好友注册<br>但TA尚未出借满<em>1000</em>元<br>赶紧通知TA去出借吧</div>
                <div class="resultdesc" v-else-if="doubleMap.status==3">只能翻倍<em>1</em>次哦<br>最高可翻倍<em>100</em>元<br>返现奖励满<em>100</em>元后翻倍更划算</div>
                <div class="resultdesc" v-else-if="doubleMap.status==4">恭喜您总共获得<br><em>{{(doubleMap.awardAmt+doubleMap.doubleAmt)|formatCurrency}}</em>元奖励</div>
                <div class="mt-10" v-if="doubleMap.status==1"><a href="/spa/member/recommend" class="btn btn-double" target="_blank">邀请好友</a></div>
                <div class="mt-10" v-else-if="doubleMap.status==2"><a href="/spa/member/recommend" class="btn btn-double" target="_blank">邀请好友</a></div>
                <div class="mt-10" v-else-if="doubleMap.status==3">
                    <a href="/spa/product/index" class="btn btn-double" target="_blank">继续出借</a><br>
                    <button type="button" :class="['btn','btn-double',disabledDouble?'disabled':'']" :disabled="disabledDouble" @click="getDoubleSuccess"><a-spin size="small" v-if="disabledDouble"/> 继续翻倍 </button>
                </div>
                <div class="mt-10" v-else><a href="javascript:;" class="btn btn-double" @click="closeDouble">确定</a></div>
            </div>
        </a-modal>
        <!-- layer金币 -->
        <div v-if="showBounsAni">
            <div class="win_state"><img src="@/assets/images/event/2019/may/layericon.png" height="120" alt="" /></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import Login from '@/components/layer/Login'
import {toJson,formatCurrency} from  '@/utils/utils'
import { setTimeout } from 'timers'

export default {
    components:{
        Header,
        EventFooter,
        Login,
    },
    data() {
        return {
            showBounsAni:false,
            loginStyle:{padding:'20px 0 10px'},
            ifShowLogin:false,
            disabledBonus:false,
            disabledDouble:false,
            bonusDiv:{
                ifShow:false,
                submit:false,
                bodyStyle:{padding:0,background:'none'},
            },
            doubleDiv:{
                ifShow:false,
                bodyStyle:{padding:0,background:'none'},
            },
            count:0,
            rules:[],
            doubleMap:{awardAmt:0,doubleAmt:0,yearAmt:0,hasDouble:false,status:0},
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
        this.initData()
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
            this.$post('/event/2019/may').then(res => {
                let result=toJson(res);
                console.log("[initdata]"+JSON.stringify(result))
                this.count=result.count;
                if(result.doubleMap){
                    this.doubleMap=result.doubleMap;
                }else{
                    this.$store.commit('removeLoginInfo');
                }
                this.rules=result.rules;
            })
        },
        openBonus(ruleId){
            if (!this.bonusDiv.submit) {
                if(typeof ruleId == "undefined" || ruleId == null || ruleId == ""){
                    return this.$error({title:'活动未开始或已结束',content: '',centered:true,okText:"确定"});
                }
                this.disabledBonus=true;
                this.$post('/event/dec/award',{ruleId}).then(res => {
                    let result=toJson(res);
                    console.log("[award data]"+JSON.stringify(result))
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
                                    window.location.href="/product/index"
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
                if(this.count==5){
                    this.bonusDiv.submit = true;
                }
                this.bonusDiv.ifShow=true;
            },1500)
        },
        closeBonus(){
            this.bonusDiv.ifShow=false;
        },
        openDouble(){
            if(this.doubleMap.status==4){
                this.getDoubleSuccess();
            }else{
                this.doubleDiv.ifShow=true;
            }
        },
        getDoubleSuccess(){
            this.disabledDouble=true;
            this.doubleDiv.ifShow=false;
            this.$post('/event/2019/mayAward').then(res => {
                let result=toJson(res);
                console.log("[double award data]"+JSON.stringify(result))
                this.doubleMap.status=4;
                this.disabledDouble=false;
                if(result.success){
                    this.doubleDiv.ifShow=true;
                    this.doubleMap.hasDouble=true;
                    this.doubleMap.doubleAmt=parseFloat(result.msg);
                }else{
                    this.$warning({title:result.msg,content: '',centered:true,okText:"确定"});
                }
            })
        },
        closeDouble(){
            this.doubleDiv.ifShow=false;
        },
    }
 }
</script>
<style lang="less">
@import "~@/assets/style/event/ninemay.less";
.getbonusModal .ant-modal-content{background:none;box-shadow:none;}
</style>