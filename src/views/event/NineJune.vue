<template>
    <div class="m-page">
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer">
            <div class="md-act">
                <div class="acttime">活动时间：6月1日~6月30日</div>
                <div class="wp">
                    <div class="md-bonus">
                        <div class="maintitle">奖励券天天领</div>
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
                    <div class="maintitle mt-60">时来运转</div>
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
                    <div class="md-luck mt-50" v-show="pageInfo.loginInfo.isLogin && myCardList &&myCardList.length>0">
                        <div class="maintitle">我的财运卡</div>
                        <div class="maindesc mt-15">财运卡的4位数字码以及当日收盘上证指数后4位相减的绝对值最大和最小者中奖<a href="javascript:;" class="link ml-30" @click="ifShowLuckRule=true">财运卡中奖说明</a></div>
                        <swiper class="list" :options="swiperOption" ref="mySwiper">
                            <swiper-slide v-for="(item,index) in myCardList" :key="'luck'+index">
                                <div :class="['container', 'status'+item.awardStatus,item.getback?'getback':'']">
                                    <div class="item front">
                                        <div class="result" v-if="item.awardStatus==0">待开奖</div>
                                        <div class="result" v-else-if="item.awardStatus==2">未中奖</div>
                                        <div class="result" v-else>已中奖</div>
                                        <div class="number">{{item.cardNo}}</div>
                                        <div class="luckval" v-if="item.awardStatus==0">中奖值：--</div>
                                        <div class="luckval" v-else>中奖值：{{item.drawNoMin}}/{{item.drawNoMax}}</div>
                                        <div class="btndiv" v-if="item.awardStatus==1 ||item.awardStatus==3"><button type="button" class="btn btn-share btn-sel" @click="selmore(index)">查看奖励</button></div>
                                        <div class="btndiv" v-else><button type="button" class="btn btn-share hasicon" @click="layerShare"><i class="icon-font icon-weixin2"></i>分享有奖
                                            <div class="sharelayer">
                                                <h4><i class="icon-font icon-weixin2"></i>微信扫一扫</h4>
                                                <img :src="qrcodeUrl" alt="">
                                            </div>
                                        </button></div>
                                        <div class="date">{{item.createTime|dateformat}}<Whattip arrow="centerbottom" :notes="'当日收盘上证指数后四位:'+item.awardNo" icon="info1" iconColor="#fff" v-if="item.awardStatus!=0"/></div>
                                        <button type="button" class="btn btn-more" @click="selmore(index)" v-if="item.awardStatus!=0">查看更多</button>
                                    </div>
                                    <div class="item back" v-if="item.awardStatus!=0">
                                        <div class="hasshare">
                                            <p v-if="item.awardStatus==1 || item.awardStatus==3">当日年化出借金额:{{item.investAmt|formatCurrency}}元</p>
                                            <p class="mb-20" v-if="item.awardStatus==1">预计返现金额:<em>{{item.awardAmt|formatCurrency}}</em>元<Whattip arrow="centerbottom" width="190px" notes="财运卡中奖后，仍可在当日24点前追加出借金额，从而获得更高返现金额" icon="info1" iconColor="#7e3c06"/></p>
                                            <p class="mb-20" v-if="item.awardStatus==3">已收返现金额:<em>{{item.awardAmt|formatCurrency}}</em>元</p>
                                            <p :class="[item.awardStatus==2?'mt-30':'']">财运数：{{item.likeCount}}个 注册数：{{item.recomCount}}个</p>
                                            <p><em>分享奖励：{{item.receiveAmt|formatCurrency}}元</em></p>
                                        </div>
                                        <div class="btndiv" v-if="item.receiveCount<item.maxReceiveCount"><button type="button" class="btn btn-share hasicon"><i class="icon-font icon-weixin2"></i>分享有奖
                                            <div class="sharelayer">
                                                <h4><i class="icon-font icon-weixin2"></i>微信扫一扫</h4>
                                                <img :src="qrcodeUrl" alt="">
                                            </div>
                                        </button></div>
                                        <div class="btndiv" v-else><button type="button" class="btn btn-share">财运卡不足，去抽奖</button></div>
                                        <div class="date">{{item.createTime|dateformat}}<Whattip arrow="centerbottom" :notes="'当日收盘上证指数后四位:'+item.awardNo" icon="info1" iconColor="#fff"/></div>
                                        <button type="button" class="btn btn-more" @click="closemore(index)">返回</button>
                                    </div>
                                </div>
                            </swiper-slide>
                            <div class="swiper-button-prev prev" slot="button-prev" v-show="myCardList && myCardList.length>4"></div>
                            <div class="swiper-button-next next" slot="button-next" v-show="myCardList && myCardList.length>4"></div>
                        </swiper>
                        <div class="maindesc mt-10">分享小Tips：邀请5个好友#集财运#，且1个好友注册，可获得5元现金，现金份数 = 财运卡张数</div>
                        <div class="notices" v-show="winCardList && winCardList.length>0">
                            <swiper class="bd" :options="swiperOption2" ref="mySwiper2">
                                <swiper-slide class="item" v-for="(item,index) in winCardList" :key="'luckbonus'+index">
                                    用户 {{item.fuzzyUsername}} 成功获得返现机会，ta的财运卡数字码为<em>{{item.cardNo}}</em> <h6>{{item.createTime|dateformat}}</h6>
                                </swiper-slide>
                            </swiper>
                            <a href="javascript:;" class="more" @click="showLuckRecord">查看详情&gt;</a>
                        </div>
                    </div>
                    <div class="md-rule mt-60">
                        <div class="maintitle">活动规则</div>
                        <div class="bd">
                            <p>抽奖机会获得：单笔出借满2000获得1次（债权转让除外），例：单笔出借满10000，可获得5次（若使用购物车出借，则仅单个项目满2000计算抽奖次数，不以购物车多个项目的累计金额计算抽奖次数）</p>
                            <p>奖品发放：现金、红包实时发放</p>
                            <br>
                            <p>财运卡说明：</p>
                            <p>1、财运卡为带有4位随机数字码的卡片，仅在国内股市交易日0点-14:30可抽出财运卡。</p>
                            <p>2、当日抽取的财运卡与当日收盘上证指数后四位（含小数位）相减，绝对值最小和最大的获得一次返现机会，若绝对值一样，则先抽取的财运卡中奖。</p>
                            <p>例：6月4日上证指数收盘为2862.28，抽到一张财运卡数字码为6230，则用6230减去6228，取绝对值，若绝对值最小和最大者中奖。</p>
                            <p>3、中奖财运卡的返现比例为当日（0点-24点）出借金额年化的2%，最低获得88元（即根据出借计算的返现低于88时，也可获得88元）。</p>
                            <p>4、财运卡中奖后为了获得更高的返现，可在24点前追加出借。</p>
                            <p>5、一张财运卡只能参与一次上证指数抽奖（限当天）。</p>
                            <p>6、奖励发放：中奖的财运卡返现奖励于中奖第二日发放至平台账户。</p>
                            <br>
                            <p>财运卡分享说明：</p>
                            <p>1、可将财运卡转发给好友，完成5个好友页面点赞且推荐1个好友注册，可获得5元现金奖励，奖励可累计，即：若有10个好友点赞且2个好友注册，可获得10元现金，可获得的奖励金额≤财运卡张数*5元，奖励满足条件后即时发放。</p>
                            <p>2、通过财运卡注册，自动建立推荐关系，享受推荐奖励。</p>
                            <p>3、每个微信号只能为一个好友点赞。</p>
                        </div>
                    </div>
                </div>
                <EventFooter background='#ad2f50' color="#fff" :height="80" class="mt-50"></EventFooter>
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
           <div class="md-getbonus">
                <div class="close" @click="closeBonus"><i class="icon-font icon-close"></i></div>
                <div class="desc2">您今日已经领取了<em>{{count}}</em>张<br>还可以领取<em>{{5-count}}</em>张</div>
                <div class="btndiv" v-if="count<5"><a href="javascript:;" class="btn btn-act" @click="closeBonus">好的</a></div>
                <div class="btndiv" v-else><a href="/spa/product/index" class="btn btn-act">我要出借</a></div>                
            </div>
        </a-modal>

        <a-modal class="md-bonuslayer" :title="false" :visible="couponDiv.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="504" :closable="false">
            <div class="md-bonustip">
                <div class="bd" v-if="!couponDiv.success&&couponDiv.status==0">
                    <div class="close" @click="couponDiv.ifShow=false"><i class="icon-font icon-close"></i></div>
                    <div class="bonusdiv"><div class="nobonus"><img alt="" src="@/assets/images/event/2019/jun/dog.png"></div></div>
                    <div class="bonusdesc">您暂无抽奖机会哦</div>
                    <div class="bonusremark mt-30"><div class="disbonus">单笔出借每满2,000元可获得一次机会，<br>例：单笔出借满20,000元，可获得10次机会</div></div>
                    <div class="bonusbtn mt-10"><router-link to="/spa/product/index" class="btn-bonus" target="_blank">我要出借</router-link></div>
                </div>
                <div class="bd" v-if="couponDiv.success">
                    <div class="close" @click="couponDiv.ifShow=false"><i class="icon-font icon-close"></i></div>
                    <div class="text-c"><img src="@/assets/images/event/2019/jun/win.png" alt=""></div>
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
                    <div class="bonusdiv"><div class="nobonus"><img alt="" src="@/assets/images/event/2019/jun/dog.png"></div></div>
                    <div class="bonusdesc">未抽到奖品，再接再厉</div>
                    <div class="bonusbtn mt-30"><a href="javascript:;" class="btn-bonus" @click="couponDiv.ifShow=false">继续抽奖</a></div>
                </div>
            </div>
        </a-modal>
        <a-modal :title="false" :visible="couponRecord.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="760" :closable="false">
            <button type="button" class="closemodal" @click="couponRecord.ifShow=false"><i class="icon-font icon-close"></i></button>
            <div class="md-bonusrecord">
                <div class="title title1">中奖记录</div>
                <table class="table recordtable" v-if="couponRecord.dataList && couponRecord.dataList.length>0">
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
                <div class="tip mt-20" v-show="false">Tips：财运卡中奖后，仍可在当日24点前追加出借金额，从而获得更高返现金额</div>
            </div>
        </a-modal>
        <a-modal :title="false" :visible="luckRecord.ifShow" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="760" :closable="false">
            <button type="button" class="closemodal" @click="luckRecord.ifShow=false"><i class="icon-font icon-close"></i></button>
            <div class="md-bonusrecord">
                <div class="title title2">财运卡获奖情况</div>
                <table class="table recordtable" v-if="luckRecord.dataList && luckRecord.dataList.length>0">
                    <tr><th>用户名</th><th>数字码</th><th>中奖值</th><th>奖励金额(元)</th><th>获得时间</th></tr>
                    <tr v-for="(item,index) in luckRecord.dataList" :key="'luckrecord'+index">
                        <td>{{item.fuzzyUsername}}</td>
                        <td>{{item.cardNo}}</td>
                        <td>{{item.myAwardNo}}</td>
                        <td v-if="item.awardStatus==1">待确认</td>
                        <td v-else>{{item.awardAmt|formatCurrency}}</td>
                        <td>{{item.createTime|dateformat('YYYY-MM-DD HH:mm')}}</td>
                    </tr>
                </table>
                <div class="norecord" v-else>暂无记录</div>
                <div class="page mt-40" v-if="luckRecord.hasPage">
                    <a-pagination :pageNo="luckRecord.pageNo" :pageSize="luckRecord.pageSize" :total="luckRecord.total" @change="initLuckRecord"/>
                </div>
                <div class="tip mt-20">Tips：1、当日抽取的财运卡与当前交易日的收盘上证指数后四位相减（包括小数点前2位，小数点后2位），得到的绝对值中，最小和最大的两个数即为 中奖值；</div>
                <div class="tip mt-10">2、绝对值最小和最大的各获得一次返现机会；返现比例为当日（0点-24点）出借金额年化的2%，最低获得88元；</div>
                <div class="tip mt-10">3、财运卡中奖后，仍可在当日24点前追加出借金额，从而获得更高返现金额</div>
            </div>
        </a-modal>
        <a-modal :title="false" :visible="ifShowLuckRule" :maskClosable="false" :bodyStyle="bonusDiv.bodyStyle" wrapClassName="getbonusModal"
            :footer="null" :centered="true" :width="760" :closable="false">
            <button type="button" class="closemodal" @click="ifShowLuckRule=false"><i class="icon-font icon-close"></i></button>
            <div class="md-bonusrecord">
                <div class="title title2">财运卡中奖说明</div>
                <div class="desc">
                    <p>1、财运卡为带有4位随机数字码的卡片，仅在交易日0点-14:30出财运卡；</p>
                    <p>2、当日抽取的财运卡与当前交易日的收盘上证指数后四位相减（包括小数点前2位，小数点后2位），得到的绝对值中，最小和最大的两个数即为 中奖值；</p>
                    <p>3、绝对值最小和最大的各获得一次返现机会；返现比例为当日（0点-24点）出借金额年化的2%，最低获得88元（即根据投资计算的返现低于88时，也可获得88元）；</p>
                    <p>4、财运卡中奖后为了获得更高的返现，仍可在当日24点前追加出借金额，从而获得更高返现金额</p>
                    <p>5、财运卡只能参与一次上证指数抽奖（限当天），抽奖后标记为未中奖或已中奖</p>
                </div>
                
            </div>
        </a-modal>
        <!-- layer金币 -->
        <div v-if="showBounsAni">
            <div class="win_state"><img src="@/assets/images/event/2019/jun/layericon.png" height="120" alt="" /></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import EventFooter from '@/components/include/EventFooter'
import p1 from '@/assets/images/event/2019/jun/p1.png'
import p2 from '@/assets/images/event/2019/jun/p2.png'
import p3 from '@/assets/images/event/2019/jun/p3.png'
import p4 from '@/assets/images/event/2019/jun/p4.png'
import p5 from '@/assets/images/event/2019/jun/p5.png'
import p6 from '@/assets/images/event/2019/jun/p6.png'
import p7 from '@/assets/images/event/2019/jun/p7.png'
import p8 from '@/assets/images/event/2019/jun/p8.png'
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
            qrcodeUrl:this.baseUrl+'qrcode/act', //二维码URL
            swiperOption:{
                slidesPerView:4,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                grabCursor : true,
            },
            swiperOption2:{
                autoplay: true,
                direction : 'vertical',
            },
            showBounsAni:false,
            loginStyle:{padding:'20px 0 10px'},
            ifShowLogin:false,
            ifShowLuckRule:false,
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
            myCardList:[],
            luckList:[
                {getback:false},
                {getback:false},
                {getback:false},
                {getback:false},
            ],
            luckRecord:{
                ifShow:false,
                dataList:[],
                pageSize:5,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            winCardList:[],
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
        this.initLuck()
        this.initLuckSwiper()
        this.swiper.slideTo(0, 1000, false)
        //this.startGame();
        //this.showBonus()
    },
    methods:{
        initLuck(){
            this.$post('/event/2019/myCardList',{pageNo:1,pageSize:300}).then(res => {
                if(res.success){
                    this.myCardList=res.data.record; 
                    this.myCardList.map(item=>{
                        item.getback=false;
                        item.recomCount=0;
                        item.maxReceiveCount=1;
                        item.investAmt=0;
                        item.receiveCount=0;
                        item.likeCount=0;
                        item.receiveAmt=0;
                        item.awardAmt=0;
                        return item;
                    })
                }
                //console.log("[myCardList]"+JSON.stringify(this.myCardList))
            })
        },
        showLuckRecord(){
            this.initLuckRecord(1);
            this.luckRecord.ifShow=true;
        },
        initLuckRecord(pageNo){
            this.$post('/event/2019/winCardList',{pageNo:pageNo,pageSize:this.luckRecord.pageSize}).then(res => {
                if(res.success){
                    this.luckRecord.dataList=res.data.record;
                    this.luckRecord.total=res.data.page.totalCount;
                    this.luckRecord.hasPage=this.luckRecord.total>this.luckRecord.pageSize
                }else{
                    this.$layer.msg(res.msg)
                }
                console.log("[luckRecord1]"+JSON.stringify(res))
            })
        },
        initLuckSwiper(){
            this.$post('/event/2019/winCardList',{pageNo:1,pageSize:10}).then(res => {
                if(res.success){
                    this.winCardList=res.data.record;
                    setTimeout(() => {
                        this.swiper2.slideTo(0, 1000, false)
                    }, 10)
                }else{
                    this.$layer.msg(res.msg)
                }
            })
        },
        selmore(index){
            let item=this.myCardList[index]
            item.getback=true;
            Vue.set(this.myCardList,index,item);
            this.$post('/event/2019/cardDetail',{awardId:item.awardId}).then(res => {
                item={...item,...res.data};
                Vue.set(this.myCardList,index,item);
                console.log("[myCardList]"+JSON.stringify(item))
            })
        },
        closemore(index){
            let item=this.myCardList[index]
            item.getback=false;
            Vue.set(this.myCardList,index,item)
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
                this.initLuck()
            })
        },
        initData(){
            this.$post('/event/2019/june').then(res => {
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
                                    window.location.href="/spa/product/index"
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
            this.$post('/event/2019/juneAward').then(res => {
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
            this.initLuck()
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
            this.$post('/event/2019/juneRecod',{pageNo:pageNo,pageSize:this.couponRecord.pageSize}).then(res => {
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
@import "~@/assets/style/event/ninejun.less";
.getbonusModal .ant-modal-content{background:none;box-shadow:none;}
</style>

<style>
.md-bonuslayer .ant-modal-content{border-radius:15px;}
</style>