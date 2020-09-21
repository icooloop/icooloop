<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-recommend" v-show="ifInitDatas">
                        <a-tabs class="ant-tabs-yqd" defaultActiveKey="1" size="large">
                            <a-tab-pane tab="推荐好友" key="1">
                                <div class="mu-recommend-total">
                                    <ul class="clearfix">
                                        <li><h4>{{user.todayAmt|formatCurrency}}</h4>
                                            <p>昨日奖励（元）</p>
                                        </li>
                                        <li><h4>{{user.allAmt|formatCurrency}}</h4>
                                            <p>累计奖励（元）</p>
                                        </li>
                                        <li><h4><em>已出借</em>{{user.investCount}}<em class="ml-30">已注册</em>{{user.recomCount}}</h4>
                                            <p>成功推荐（人）</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="text-c l20 c-666 f-16 mt-20" v-if="user.isMax">
                                    您当前已享受年化<span class="text-warning">{{user.awardRate}}%</span>现金奖励，达到最高等级
                                </div>
                                <div class="text-c l20 c-666 f-16 mt-20" v-else-if="user.isMax==0">
                                    当前被推荐人待收本金之和为<span class="text-warning">{{user.planAmt}}</span>元，
                                    还差<span class="text-warning">{{user.diff}}</span>元即可享受年化<span class="text-warning">{{user.awardRate}}%</span>现金奖励</div>
                                <div class="text-c l20 c-666 f-16 mt-20" v-else-if="user.noaward">
                                    您当前账户待收不足<span class="text-warning">5,000.00</span>元，暂时无法领取推荐奖励，请速速充值~
                                </div>
                                <section class="mt-20">
                                    <div class="mu-title"><h6>邀请好友得奖励</h6></div>
                                    <div class="mu-recommend-invest">
                                        <ul class="sharelist clearfix">
                                            <li><div class="item">
                                                <i class="icon-font icon-weixin"></i>
                                                <p>分享至微信</p>
                                                <div class="more pd-30">
                                                    <div class="desc1">分享给微信好友</div>
                                                    <div class="mt-10"><img :src="qrcodeUrl" alt="" height="150"></div>
                                                    <div class="desc1 mt-10">打开微信，使用“扫一扫”<br>即可将网页分享给微信好友</div>
                                                </div>
                                            </div></li>
                                            <li><div class="item">
                                                <i class="icon-font icon-tuijianma"></i>
                                                <p>推荐码</p>
                                                <div class="more pd-20">
                                                    <div class="desc1">让您邀请的好友在注册时输入您的邀请码：{{user.recomCode}}</div>
                                                    <div class="desc1 mt-5">或您已认证的手机号码：{{user.userMobile}}</div>
                                                </div>
                                            </div></li>
                                            <li><a href="javascript:;" v-clipboard:copy="copyContent" v-clipboard:success="copySuccess" v-clipboard:error="copyError">
                                                <i class="icon-font icon-lianjie1"></i>
                                                <p>复制链接</p></a></li>
                                            <li><a href="javascript:;" @click="shareQQ">
                                                <i class="icon-font icon-qq"></i>
                                                <p>分享至qq</p></a></li>
                                            <li><a href="javascript:;" @click="shareQZone">
                                                <i class="icon-font icon-qqkongjian"></i>
                                                <p>分享至qq空间</p></a></li>
                                        </ul>
                                        <div class="text-c mt-20"><img src="@/assets/images/user/recommend_step.png" alt=""></div>
                                    </div>
                                </section>
                            </a-tab-pane>
                            <a-tab-pane tab="奖励明细" key="2">
                                <div class="mu-model mu-recommend-detail pd-30">
                                    <div class="mu-tabs1">
                                        <ul class="list clearfix">
                                            <li :class="[isJiangli?'on':'']" @click="isJiangli=true">我的推荐奖励</li>
                                            <li :class="[!isJiangli?'on':'']" @click="isJiangli=false">我的邀请好友</li>
                                        </ul>
                                        <div class="more innerrecommend text-primary" v-if="user.userType==1"><i class="icon-font icon-jiangli"></i>&nbsp;内部员工推荐</div>
                                    </div>
                                    <section class="mt-20" v-show="isJiangli">
                                        <div class="desc1">
                                            <a-month-picker :disabledDate="disabledDate" :allowClear="false" :defaultValue="moment(new Date(), 'YYYY-MM')" @change="onChangeMonth" placeholder="请选择月份"/>&nbsp;&nbsp;&nbsp;&nbsp;本月合计奖励金额：{{monthTotal|formatCurrency}}元
                                        </div>
                                        <table class="mu-table text-c mt-20">
                                            <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>奖励金额(元)</th>
                                                    <th>日期</th>
                                                    <th>奖励类型</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="awardRecord.dataList && awardRecord.dataList.length>0">
                                                <tr v-for="(item,index) in awardRecord.dataList" :key="'awardRecord'+index">
                                                    <td>{{index+1}}</td>
                                                    <td>{{item.awardMoney|formatCurrency}}</td>
                                                    <td>{{item.awardDate|dateformat}}</td>
                                                    <td v-if="item.awardType=='2'">好友累计出借{{item.planAmt|formatCurrency}}元</td>
                                                    <td v-else-if="item.awardType=='3'">推荐奖励</td>
                                                    <td v-else>好友待收本金之和的{{item.awardRate}}%</td>
                                                </tr> 
                                            </tbody>
                                            <tbody v-else>
                                                <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                            </tbody>
                                        </table>
                                        <div class="page mt-40" v-if="awardRecord.hasPage">
                                            <a-pagination :pageNo="awardRecord.pageNo" :pageSize="awardRecord.pageSize" :total="awardRecord.total" @change="initAwardRecord"/>
                                        </div>
                                    </section>
                                    <section class="mt-20" v-show="!isJiangli">
                                        <table class="mu-table text-c">
                                            <thead>
                                                <tr>
                                                    <th>序号</th>
                                                    <th>姓名</th>
                                                    <th>被推荐人账号</th>
                                                    <th>注册日期</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="userRecord.dataList && userRecord.dataList.length>0">
                                                <tr v-for="(item,index) in userRecord.dataList" :key="'userRecord'+index">
                                                    <td>{{index+1}}</td>
                                                    <td>{{item.realName?item.realName:'未实名'}}</td>
                                                    <td>{{item.phone}}</td>
                                                    <td>{{item.createTime|dateformat}}</td>
                                                </tr> 
                                            </tbody>
                                            <tbody v-else>
                                                <tr><td colspan="4"><img style="margin:30px 0" class="record" src="@/assets/images/user/record.png"></td></tr>
                                            </tbody>
                                        </table>
                                        <div class="page mt-40" v-if="userRecord.hasPage">
                                            <a-pagination :pageNo="userRecord.pageNo" :pageSize="userRecord.pageSize" :total="userRecord.total" @change="initUserRecord"/>
                                        </div>
                                    </section>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                        <div class="pic100 mt-20">
                            <router-link to="/spa/event/recommend"><img src="@/assets/images/user/recommend_banner.jpg" alt=""></router-link>
                        </div>
                        <div class="mu-tip">
                            <div class="hd pt-10">温馨提示</div>
                            <div class="bd">
                                <p>1、被推荐人出借时，推荐人账户待收需≥5000元才可享受奖励二和奖励三，符合条件的用户可同时享有以上三项奖励。</p>
                                <p>2、被推荐人通过推荐人分享的页面注册，或在注册时填写推荐人的推荐码或手机号码，注册成功即建立推荐关系。</p>
                                <p>3、自2018年10月1日起，建立的推荐关系，推荐奖励有效期为180天，2018年10月1日之前建立的推荐关系，推荐奖励有效期保留原有规则的一年期。</p>
                                <p>4、推荐活动时间：2018年10月1日-2019年12月31日。</p>
                                <p>5、本活动最终解释权归亿钱贷所有，如有调整，将以公告形式通知。</p>
                            </div>
                        </div>
                    </div>
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
import UserMenu from '@/components/user/Menu'
import {toJson,dateformat,formatCurrency} from '@/utils/utils'
import {Pagination,Tabs,Table,DatePicker} from 'ant-design-vue'
import Vue from 'vue'
import moment from 'moment'
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Table)
Vue.use(DatePicker)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
    components:{
        Header,
        Footer,
        UserMenu
    },
    data() { 
        return {
            ifInitDatas:false,
            user:{},
            isJiangli:true,
            userRecord:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            qrcodeUrl:this.baseUrl+'qrcode/recom', //二维码URL
            awardRecord:{
                dataList:[],
                pageSize:10,
                pageNo:1,
                total:0,
                hasPage:false,
            },
            queryDate:'',
            copyContent:'',
            monthTotal:0,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_recommend'
            }
        }
    },
    filters:{
        dateformat,formatCurrency,
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initData();
        this.initUserRecord(1);
        this.initAwardRecord(1);
    },
    methods:{
        initData(){
            this.$post('/member/recom/list').then(res => {
                this.ifInitDatas=true;
                this.user=toJson(res).data;
                this.copyContent='https://www.yiqiandai.com/spa/secure/land?code='+this.user.recomCode
            })
        },
        initUserRecord(pageNo){
            this.$post('/member/recom/recommendRecord',{pageNo:pageNo,pageSize:this.userRecord.pageSize}).then(res => {
                let result=toJson(res)
                this.userRecord.dataList=result.data;
                this.userRecord.total=result.count;
                this.userRecord.hasPage=this.userRecord.total>this.userRecord.pageSize
            })
        },
        initAwardRecord(pageNo){
            this.$post('/member/recom/awardRecord',{pageNo:pageNo,pageSize:this.awardRecord.pageSize,queryDate:this.queryDate}).then(res => {
                let result=toJson(res)
                this.monthTotal=result.totalAmt;
                this.awardRecord.dataList=result.data;
                this.awardRecord.total=result.count;
                this.awardRecord.hasPage=this.awardRecord.total>this.awardRecord.pageSize
            })
        },
        onChangeMonth(date, dateString) {
            this.queryDate=dateString;
            this.initAwardRecord();
        },
        disabledDate(current) {
            return current && current > moment().endOf('month');
        },
        copySuccess(){
            this.$layer.msg("复制成功~")
        },
        copyError(){
            this.$layer.msg("复制失败~")
        },
        shareQQ(){
            let p = {
                url:'https://www.yiqiandai.com/spa/secure/land?code='+this.user.recomCode,
                showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                desc:'送您888元新手专享红包',/*默认分享理由(可选)*/
                summary:'亿钱贷喊你领红包啦~ 现在新手注册即送888元现金红包，还有更多惊喜等你，快快上车！',/*分享摘要(可选)*/
                title:'送您888元新手专享红包',/*分享标题(可选)*/
                pics:'', /*分享图片的路径(可选)*/
                style:'203',
                width:98,
                height:22
            };
            let s = [];
            for(let i in p){
                s.push(i + '=' + encodeURIComponent(p[i]||''));
            }
            let url = ["http://connect.qq.com/widget/shareqq/index.html?",s.join('&')].join('');
            window.open(url);
        },
        shareQZone(){
            let p = {
                url:'https://www.yiqiandai.com/spa/secure/land?code='+this.user.recomCode,
                showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                desc:'送您888元新手专享红包',/*默认分享理由(可选)*/
                summary:'亿钱贷喊你领红包啦~ 现在新手注册即送888元现金红包，还有更多惊喜等你，快快上车！',/*分享摘要(可选)*/
                title:'送您888元新手专享红包',/*分享标题(可选)*/
                site:'https://www.yiqiandai.com/spa/secure/land?code='+this.user.recomCode,/*分享来源 如：腾讯网(可选)*/
                pics:'https://www.yiqiandai.com/public/images/logo.png', /*分享图片的路径(可选)*/
                style:'203',
                width:98,
                height:22
            };
            let s = [];
            for(let i in p){
                s.push(i + '=' + encodeURIComponent(p[i]||''));
            }
            let url = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",s.join('&')].join('');
            window.open(url);
        }
    },
 }
</script>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-recommend{
    .employee-btn{padding:0 20px;line-height:40px;height:40px;border-radius:40px;position:absolute;right:20px;top:10px;color:#666;background:#d1c6ae;background: -webkit-linear-gradient(top,#fff,#d1c6ae);background:linear-gradient(180deg,#fff,#d1c6ae);
        img{height:25px;margin-right:5px;}
    }
    .mu-recommend-total{position:relative;
        ul{padding:45px 0;background:#fff;
            li{float:left;width:33%;text-align:center;
                h4{font-size:30px;line-height:1;text-align:center;margin:0;} 
                h4 em{font-size:16px;padding-right:10px;}
                p{font-size:16px;color:#999;line-height:20px;text-align:center;padding-top:10px;padding-left:5px;}
            }
            li+li{border-left:1px dashed #d2d2d2;}
        }
        
    }
    .mu-recommend-invest{
        padding:30px 40px 40px;background:#fff;
        .sharelist{display:flex; 
            li{flex:1;padding:0 35px;text-align:center;position: relative;
                a,.item{padding:10px 0;display: inline-block;cursor: pointer;}
                p{line-height:20px;padding-top:10px;}
                .icon-font{display:inline-block;font-size:50px;line-height:1;}
                .icon-weixin{color:#3eb034;}
                .icon-qq{color:#4cafea;}
                .icon-qqkongjian{color:#eed03e;}
                .icon-lianjie1{color:#8560a8;}
                .icon-tuijianma{color:#f06eaa;}
                .more{display:none;position: absolute;left:50%;bottom:98%;background:#fff;transform:translateX(-50%);border-radius:10px;border:1px solid #ddd;box-shadow:0 0 4px rgba(66,66,66,.2);
                    .desc1{white-space: nowrap;line-height:20px;}
                }
                .more:before{content: ""; position: absolute; width: 0; height: 0; left: 50%; bottom: -16px; border: 8px solid transparent; border-top-color: #ddd;transform:translateX(-50%);}
                .more:after{content: ""; position: absolute; width: 0; height: 0; left: 50%; bottom: -15px; border: 8px solid transparent; border-top-color: #fff;transform:translateX(-50%);}
           }
           li .item:hover .more{display: block;}
        }
    }
    .mu-recommend-detail{
        .desc1{line-height:32px;font-size:16px;}
    }
    .innerrecommend .icon-font{display:inline-block;transform:translateY(2px);}
}
</style>