<template>
    <div class="m-page">
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer">
            <div class="md-act">
                <div class="wp">
                    <div class="md-bonus">
                        <div class="maintitle"><img src="@/assets/images/event/july/title1.png" alt=""></div>
                        <div class="maindesc mt-20">待收本金满1000元可领，每日限量5张</div>
                        <ul class="list clearfix mt-30">
                            <li v-for="rule in rules" :key="rule.ruleId">
                                <div class="rate">{{rule.awardAmount}}<em>%</em></div> 
                                <div v-if="!pageInfo.loginInfo.isLogin"><button type="button" @click="layerLogin" class="btn btn-act">立即登录</button></div>
                                <div v-else-if="count>=5"><button type="button" class="btn btn-act disabled">明日再来</button></div>
                                <div v-else><button type="button" @click="openBonus(rule.ruleId)" :class="['btn','btn-act',disabledBonus?'disabled':'']" :disabled="disabledBonus"><a-spin size="small" v-if="disabledBonus"/>立即领取</button></div>
                                <div class="limit">{{rule.limit}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="md-game mt-60">
                        <div class="maintitle"><img src="@/assets/images/event/july/title2.png" alt=""></div>
                        <div class="maindesc mt-15">单笔出借满2000获得1次抽奖机会</div>
                        <div :class="['game-content','mt-50',startGameFlag0?'gaming':'']">
                            <div class="game-goods-list">
                                <div class="game-goods goods1">
                                    <ul :class="['game-goods-ul',startGameFlag0?'fx-roll':'']" :style="'transform:translateY(-'+settings.gameP0+'px);'">
                                        <li style="height:220px" v-for="(imgUrl,index) in picList" :key="'imgs1'+index"><img :src="imgUrl"></li>
                                    </ul>
                                </div>
                                <div class="game-goods goods2">
                                    <ul :class="['game-goods-ul',startGameFlag1?'fx-roll':'']" :style="'transform:translateY(-'+settings.gameP1+'px);'">
                                        <li style="height:220px" v-for="(imgUrl,index) in picList" :key="'imgs2'+index"><img :src="imgUrl"></li>
                                    </ul>
                                </div>
                                <div class="game-goods goods3">
                                    <ul :class="['game-goods-ul',startGameFlag2?'fx-roll':'']" :style="'transform:translateY(-'+settings.gameP2+'px);'">
                                        <li style="height:220px" v-for="(imgUrl,index) in picList" :key="'imgs3'+index"><img :src="imgUrl"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="game-btn" @click="layerLogin" v-if="!pageInfo.loginInfo.isLogin"></div>
                            <div class="game-btn" @click="startGame" v-else></div>
                            <div class="game-desc" v-if="!pageInfo.loginInfo.isLogin"><a href="javascript:;" class="link" @click="layerLogin">请先登录</a></div>
                            <div class="game-desc" v-else>您已抽奖{{couponDiv.drawCount}}次，剩余{{couponDiv.remainderCount}}次机会</div>
                            <div class="game-record" v-if="!pageInfo.loginInfo.isLogin"><a href="javascript:;" class="link" @click="layerLogin">中奖记录&gt;</a></div>
                            <div class="game-record" v-else><a href="javascript:;" class="link" @click="showCouponRecord">中奖记录&gt;</a></div>
                        </div>
                    </div>
                    <div class="md-rule mt-60">
                        <div class="maintitle"><img src="@/assets/images/event/july/title3.png" alt=""></div>
                        <div class="bd">
                            <p>抽奖机会获得：单笔出借满2000获得1次（债权转让除外），例：单笔出借满10000，可获得5次（若使用购物车出借，则仅单个项目满2000计算抽奖次数，不以购物车多个项目的累计金额计算抽奖次数）</p>
                            <p>奖品发放：现金、红包实时发放</p>
                        </div>
                    </div>
                </div>
                <EventFooter background='none' color="#fff" :height="80" class="mt-50"></EventFooter>
            </div>
        </div>
        <!-- 登录modal -->
        <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
            :footer="null" @cancel="closeLogin" :centered="true" width="490" :closable="false">
            <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
            <Login @loginSuccess="loginSuccess"></Login>
        </a-modal>
        <!-- 领取奖励券modal -->
        <a-modal class="md-bonuslayer" :title="false" :visible="bonusDiv.ifShow" :maskClosable="false" :bodyStyle="couponDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="'auto'" :closable="false">
           <div class="md-bonustip">
                <div class="close" @click="closeBonus"><i class="icon-font icon-close"></i></div>
                <div class="text-c pt-20"><img src="@/assets/images/event/july/lucked.png" alt=""></div>
                <div class="bonusdiv mt-20"><img alt="" src="@/assets/images/event/july/look.png" height="200"></div>
                <div class="desc2 mt-20">您今日已经领取了<em>{{count}}</em>张<br>还可以领取<em>{{5-count}}</em>张</div>
                <div class="bonusbtn mt-20" v-if="count<5"><a href="javascript:;" class="btn-bonus" @click="closeBonus">好的</a></div>
                <div class="bonusbtn" v-else><router-link to="/spa/product/index" class="btn-bonus">我要出借</router-link></div>                
            </div>
        </a-modal>

        <a-modal class="md-bonuslayer" :title="false" :visible="couponDiv.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="455" :closable="false">
            <div class="md-bonustip">
                <div class="bd" v-if="!couponDiv.success&&couponDiv.status==0">
                    <div class="close" @click="couponDiv.ifShow=false"><i class="icon-font icon-close"></i></div>
                    <div class="bonusdiv"><div class="nobonus"><img alt="" src="@/assets/images/event/july/dog.png"></div></div>
                    <div class="bonusdesc">您暂无抽奖机会哦</div>
                    <div class="bonusremark mt-30"><div class="disbonus">单笔出借每满2,000元可获得一次机会，<br>例：单笔出借满20,000元，可获得10次机会</div></div>
                    <div class="bonusbtn mt-10"><router-link to="/spa/product/index" class="btn-bonus" target="_blank">我要出借</router-link></div>
                </div>
                <div class="bd" v-if="couponDiv.success">
                    <div class="close" @click="couponDiv.ifShow=false"><i class="icon-font icon-close"></i></div>
                    <div class="text-c"><img src="@/assets/images/event/july/win.png" alt=""></div>
                    <div class="bonusdiv" v-if="couponDiv.result.awardType==2"><div class="gainbonus"><em>{{couponDiv.result.awardAmt}}</em>元</div></div>
                    <div class="bonusdiv" v-else-if="couponDiv.result.awardType==3"><div class="gainjiaxi"><em>{{couponDiv.result.awardAmt}}</em>%</div></div>
                    <div class="bonusdiv" v-else-if="couponDiv.result.awardType==4"><div class="gaincash"><em>{{couponDiv.result.awardAmt}}</em>元</div></div>
                    <div class="bonusdiv" v-else><div class="bonusimg"><img alt="" :src="picList[(couponDiv.result.awardType-1)]"></div></div>
                    <div class="bonusdesc" v-if="couponDiv.result.awardType==2">恭喜您获得{{couponDiv.result.awardAmt}}元红包</div>
                    <div class="bonusdesc" v-else-if="couponDiv.result.awardType==3">恭喜您获得{{couponDiv.result.awardAmt}}%奖励券</div>
                    <div class="bonusdesc" v-else-if="couponDiv.result.awardType==4">恭喜您获得{{couponDiv.result.awardAmt}}元现金</div>
                    <div class="bonusdesc" v-else-if="couponDiv.result.awardType==7">恭喜您获得财运卡</div>
                    <div class="bonusdesc" v-else>恭喜您获得{{couponDiv.result.awardAmt}}</div>
                    <div class="bonusremark" v-if="couponDiv.result.awardType==2">红包已发放至您账户</div>
                    <div class="bonusremark" v-else-if="couponDiv.result.awardType==3">奖励券已发放至您账户</div>
                    <div class="bonusremark" v-else-if="couponDiv.result.awardType==4">现金已发放至您账户</div>
                    <div class="bonusremark" v-else-if="couponDiv.result.awardType==7"></div>
                    <div class="bonusremark" v-else>活动结束后7个工作日内发放</div>
                    <div class="bonusbtn mt-10"><a href="javascript:;" class="btn-bonus" @click="couponDiv.ifShow=false">继续抽奖</a></div>
                </div>
                <div class="bd" v-if="!couponDiv.success&&couponDiv.status==2">
                    <div class="close" @click="couponDiv.ifShow=false"><i class="icon-font icon-close"></i></div>
                    <div class="bonusdiv"><div class="nobonus"><img alt="" src="@/assets/images/event/july/dog.png"></div></div>
                    <div class="bonusdesc">未抽到奖品，再接再厉</div>
                    <div class="bonusbtn mt-30"><a href="javascript:;" class="btn-bonus" @click="couponDiv.ifShow=false">继续抽奖</a></div>
                </div>
            </div>
        </a-modal>
        <a-modal :title="false" :visible="couponRecord.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="760" :closable="false">
            <button type="button" class="closemodal" @click="couponRecord.ifShow=false"><i class="icon-font icon-close"></i></button>
            <div class="md-bonusrecord">
                <div class="title"><img src="@/assets/images/event/july/record.png" alt=""></div>
                <table class="table recordtable mt-20" v-if="couponRecord.dataList && couponRecord.dataList.length>0">
                    <tr><th>奖品类型</th><th>奖品金额(元)</th><th>发放状态</th><th>获得时间</th></tr>
                    <tr v-for="(item,index) in couponRecord.dataList" :key="'record'+index">
                        <td>{{getAwardTypeName(item.awardType)}}</td>
                        <td v-if="item.awardStatus==1 && item.awardType==7">待确认</td>
                        <td v-else-if="item.awardType==3">{{item.awardAmt}}%</td>
                        <td v-else>{{item.awardAmt|formatCurrency}}</td>
                        <td v-if="item.awardStatus==1 && item.awardType==7">待发放</td>
                        <td v-else>已发放</td>
                        <td>{{item.createTime|dateformat('YYYY-MM-DD HH:mm')}}</td>
                    </tr>
                </table>
                <div class="norecord" v-else>暂无奖品</div>
                <div class="page mt-40" v-if="couponRecord.hasPage">
                    <a-pagination :pageNo="couponRecord.pageNo" :pageSize="couponRecord.pageSize" :total="couponRecord.total" @change="initCouponRecord"/>
                </div>
            </div>
        </a-modal>
        <!-- layer金币 -->
        <div v-if="showBounsAni">
            <div class="win_state"><img src="@/assets/images/event/july/layericon.png" height="120" alt="" /></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import p1 from '@/assets/images/event/july/p1.png'
import p2 from '@/assets/images/event/july/p2.png'
import p3 from '@/assets/images/event/july/p3.png'
import p4 from '@/assets/images/event/july/p4.png'
import p5 from '@/assets/images/event/july/p5.png'
import p6 from '@/assets/images/event/july/p6.png'
import p7 from '@/assets/images/event/july/p7.png'
import p8 from '@/assets/images/event/july/p8.png'
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
            picList:[p1,p2,p3,p4,p5,p6,p7,p8],
            bonusDiv:{
                ifShow:false,
                submit:false,
                bodyStyle:{padding:0,background:'none'},
            },
            couponDiv:{
                ifShow:false,
                bodyStyle:{padding:0,background:'none'},
                remainderCount:0,
                drawCount:0,
                status:0,
                success:false,
                result:{},
            },
            couponRecord:{
                ifShow:false,
                dataList:[],
                pageSize:5,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            count:0,
            rules:[],
            startGameFlag0:false,
            startGameFlag1:false,
            startGameFlag2:false,
            settings:{
                gameLen:8,
    	        pagesize:10,//生成多少圈同样的东西
    	        zjArr:{
    	        	is_win:1,
    	        	number:1,
    	        	bonusAmount:0,
    	        	bonusName:'xx',
    	        	bonusResult:"xx",
    	        	bonusRemark:""
                },
                gameInit:[],
                itemH:220,
            },
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        swiper2() {
            return this.$refs.mySwiper2.swiper
        },
        ...mapState(['loginInfo'])
    },
    filters:{
        formatCurrency,dateformat
    },
    mounted(){
        this.initData()
        this.createGame()
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
            this.$post('/event/2019/july').then(res => {
                let result=toJson(res);
                console.log("[initdata]"+JSON.stringify(result))
                this.count=result.count;
                this.rules=result.rules;
                if(this.pageInfo.loginInfo.isLogin){
                    this.couponDiv.drawCount=result.drawCount;
                    this.couponDiv.remainderCount=result.remainderCount;
                }
            })
        },
        openBonus(ruleId){
            let _this=this;
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
                if(this.count==5){
                    this.bonusDiv.submit = true;
                }
                this.bonusDiv.ifShow=true;
            },1500)
        },
        closeBonus(){
            this.bonusDiv.ifShow=false;
        },
        createGame(){
            let arr=this.randNum2();
            this.settings.gameP0=this.settings.itemH*arr[0]
            this.settings.gameP1=this.settings.itemH*arr[1]
            this.settings.gameP2=this.settings.itemH*arr[2]
        },
        startGame(){
            this.$post('/event/2019/julyAward').then(res => {
                let data=toJson(res);
                console.log("[juneAward]"+JSON.stringify(data))
                //中奖号 2、红包 3、加息卷 4 返现 7财运卡
                //let data={success:true,msg:'sssss',code:2,jsonData:{awardPic:0,bonusName:'元现金',awardAmt:100,signCount:3}}; //测试
                this.couponDiv.status=data.code;
                this.couponDiv.success=data.success;
                this.couponDiv.result=data.jsonData;
                if(data.success){
                   this.aniGame();
                    setTimeout(()=>{
                        let itemH=(data.jsonData.awardType-1)*this.settings.itemH;
                        this.settings.gameP0=itemH
                        this.settings.gameP1=itemH
                        this.settings.gameP2=itemH
                    },1000)
                }else{
                    if(data.code==0){
                        this.couponDiv.ifShow=true;
                        this.endGame();
                    }else if(data.code==2){
                        this.aniGame();
                        setTimeout(()=>{
                            this.createGame()
                        },1000)
                    }else{
                        this.$layer.msg(data.msg);
                    }
                }
            })
        },
        aniGame(){
            this.startGameFlag0=true;
            setTimeout(()=>{
                this.startGameFlag1=true;
            },400)
            setTimeout(()=>{
                this.startGameFlag2=true;
            },800)
            setTimeout(()=>{
                this.createGame()
            },1000)
            setTimeout(()=>{
                this.startGameFlag0=false;
            },2000)
            setTimeout(()=>{
                this.startGameFlag1=false;
            },2400)
            setTimeout(()=>{
                this.startGameFlag2=false;
            },2800)
            setTimeout(()=>{
                this.couponDiv.ifShow=true;
                this.endGame();
            },3500)
            if(this.couponDiv.remainderCount>0){
                this.couponDiv.remainderCount-=1
                this.couponDiv.drawCount+=1
            }
        },
        endGame(){

        },
        randNum2(){
          	let a=Math.floor(Math.random() * this.settings.gameLen);
          	let b=Math.floor(Math.random() * this.settings.gameLen);
          	let c=Math.floor(Math.random() * this.settings.gameLen);
          	if(a==b){
          		return this.randNum2();
          	}else{
          		return [a,b,c];
          	}
        },
        showCouponRecord(){
            this.initCouponRecord(1);
            this.couponRecord.ifShow=true;
        },
        initCouponRecord(pageNo){
            this.$post('/event/2019/julyRecod',{pageNo:pageNo,pageSize:this.couponRecord.pageSize}).then(res => {
                let result=toJson(res)
                this.couponRecord.dataList=result.data.recod;
                this.couponRecord.total=result.data.page.totalCount;
                this.couponRecord.hasPage=this.couponRecord.total>this.couponRecord.pageSize
                //console.log("[juneRecod]"+JSON.stringify(this.couponRecord))
            })
        },
        getAwardTypeName(awardType){
            let name="其他"
            if(awardType==2){
                name="红包"
            }else if(awardType==3){
                name="奖励券"
            }else if(awardType==4){
                name="现金"
            }else if(awardType==7){
                name="财运卡"
            }
            return name;
        },
        layerShare(){

        }
    }
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/event/ninejuly.less";
.getbonusModal .ant-modal-content{background:none;box-shadow:none;}
</style>

<style>
.md-bonuslayer .ant-modal-content{border-radius:35px;}
</style>