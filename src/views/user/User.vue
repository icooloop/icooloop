<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer bgmain">
            <div class="m-user">
                <div class="wp clearfix pt-20 pb-20">
                    <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
                    <div class="mu-right mu-loading" v-show="!ifInitDatas"><a-spin size="large"/></div>
                    <div class="mu-right mu-account" v-show="ifInitDatas">
                        <div class="mu-account-safe clearfix">
                            <div class="logo"><img src="@/assets/images/user/user.png"></div>
                            <div class="welcome"><span class="pr-15">{{pageInfo.loginInfo.nickName}},欢迎您
                                <a class="text-primary f-12 ml-5" href="javascript:;" @click="ifShowUpdateName=true" v-if="pageInfo.loginInfo.isDefaultUsername && pageInfo.loginInfo.isDefaultUsername==1">修改用户名</a>
                                </span>
                                <span v-if="pageInfo.loginInfo.isDepositary==1"> 
                                    <router-link to="/spa/member/secure/security" title="银行存管"><i class="icon-font text-primary icon-save_"></i></router-link>
                                    <router-link to="/spa/member/secure/security" title="交易密码"><i class="icon-font text-primary icon-lock2 "></i></router-link>
                                </span>
                                <span v-else> 
                                    <router-link to="/member/depository/form" title="银行存管"><i class="icon-font text-primary icon-save_ disabled"></i></router-link>
                                    <router-link to="/spa/member/secure/security" title="交易密码"><i class="icon-font text-primary icon-lock2 disabled"></i></router-link>
                                </span>	
                                
                                <router-link to="/spa/member/secure/security" title="短信设置"><i class="icon-font text-primary icon-email "></i></router-link>
                            </div>
                            <div class="risk" v-if="pageInfo.loginInfo.riskAss">风险评测：{{pageInfo.loginInfo.riskAss}}
                                <span v-if="user.isValid==0 ">
                                    <i> (已过期)</i>
                                    <span class="u-what"><i class="icon-font icon-wenhao"></i><span class="notes">您的风险承受能力测评结果已经过期，请重新测评</span></span>
                                </span>
                                <router-link class="text-primary ml-15" to="/member/auth/risk-ass">重新评测</router-link>
                            </div>
                            <div class="risk" v-else><router-link class="text-primary" to="/member/auth/risk-ass">风险评测</router-link></div>
                            <div class="sd"><router-link to="/spa/member/voucher" class="bonus">
                                <div class="pic"><img src="@/assets/images/user/coupon.png"></div>
                                <p>我的优惠券：{{user.count}}</p>
                            </router-link></div>
                        </div>
                        <div class="mu-account-tixing">
                            <swiper class="bd" :options="swiperOption" ref="mySwiper" v-show="user.arrivingCoupon|user.cashingAmount">
                                <swiper-slide class="item" v-if="user.arrivingCoupon">
                                    <i class="icon-font icon-tixing"></i>您有在途的<em> {{user.arrivingCoupon|formatCurrency}}</em> 元红包现金，将在出借项目放款后发放到您的账户
                                </swiper-slide>
                                <swiper-slide class="item" v-if="user.cashingAmount">
                                    <i class="icon-font icon-tixing"></i>您有<em> {{user.cashingAmount|formatCurrency}}</em> 元提现资金正在处理中
                                </swiper-slide>
                            </swiper>	
                        </div>
                        <div class="mu-account-total clearfix usertotal">
                            <div class="item hand">
                                <h4>昨日收益(元)<Whattip width="330px" arrow="center" notes="根据持有中项目的预期收益估算出的昨日收益，<br/>数据仅供参考，实际收益以具体到账为准"/></h4>
                                <h1>{{accountVo.yesterdayIncome|formatCurrency}}</h1>
                            </div>
                            <div class="item hand">
                                <h4>累计收益{{accountVo.obtainIncomeUnitStr?'':'(元)'}}</h4>
                                <h1>{{accountVo.obtainIncomeUnitStr?accountVo.obtainIncomeStr:accountVo.obtainIncome|formatCurrency}}{{accountVo.obtainIncomeUnitStr?'万':''}}
                                    <em class="mu-icontip" v-if="accountVo.obtainIncomeUnitStr"><i class="icon-font icon-wenhao"></i><span class="tag">{{accountVo.obtainIncome|formatCurrency}}元</span></em> 
                                </h1>
                                <ul class="menu menu2">
                                    <li>易智投<span>{{user.receiveIncome|formatCurrency}}</span></li>
                                    <li>散标&债权<span>{{user.investInCome|formatCurrency}}</span></li>
                                    <li>红包收益<span>{{user.voucherInCome|formatCurrency}}</span></li>
                                    <li>奖励券收益<span>{{user.subsidyAward|formatCurrency}}</span></li>
                                    <li>出借奖励<span>{{user.penaltyaward|formatCurrency}}</span></li>
                                    <li>推荐奖励<span>{{user.promotionaward|formatCurrency}}</span></li>
                                    <li>活动奖励<span>{{user.actaward|formatCurrency}}</span></li>
                                </ul>
                            </div>
                            <div class="item">
                                <h4>可用余额(元)</h4>
                                <h1>{{accountVo.availableAmt|formatCurrency}}</h1>
                                <a class="btn" @click="$router.push('/spa/user/paymentDetails')" v-if="user.isOpenPayment==='1'" style="border:1px solid #ccc;color:#333;background: #fff;margin-top:5px;">兑付详情</a>
                            </div> 
                            <div class="link">
                                <router-link to="/spa/member/account/cash" class="btn btn-info">提现</router-link> 
                                <router-link to="/spa/member/account/recharge" class="btn">充值</router-link>
                            </div>
                        </div>
                        <div class="mu-account-echart mt-20">
                            <div class="more xinwangtip"><div class="tip">资金已由新网银行存管</div></div>
                            <div class="echarts"><canvas id="totalEchart" height="240" width="980"></canvas></div>
                            <div class="total">总资产(元)<Whattip width="360px" arrow="center" notes="总资产 = 易智投 + 散标&债权 + 冻结资金 + 可用余额"/>
                                <span class="amount">{{accountVo.totalAsset|formatCurrency}}</span>
                            </div>
                            <router-link class="incomedetail text-primary" to="/spa/member/invest/backplan">待收明细 &gt;</router-link>
                            <a class="btn btn-primary btn-assets" href="/member/account/personalAssets" v-if="pageInfo.loginInfo.userType=='1'">资产概况</a>
                        </div>
                        <div class="mu-account-plan clearfix mt-20">
                            <div class="hd mu-title">
                                <h4>回款日历</h4>
                            </div>
                            <div class="bd">
                                <div class="calendarlist">
                                    <a-calendar>
                                        <template slot="dateCellRender" slot-scope="value">
                                            <div v-for="item in calendarList" :key="item.time">
                                                <div v-if="dateformat(value)==item.time" class="daynotes">
                                                    <span>{{item.title}}</span>
                                                    <div class="notes" v-html="item.description"></div>
                                                </div>
                                            </div>
                                            
                                        </template>
                                    </a-calendar>
                                </div>
                                <div class="calendardesc">
                                    <div class="date"><i class="icon-font icon-calendar mr-10"></i>{{currentTime|dateformat('MM月DD日')}}</div>
                                    <ul class="list mt-10">
                                        <li>今日待收金额：<em>{{user2.todayRepayAmt|formatCurrency}}</em> 元</li>
                                        <li>今日已收金额：<em>{{user2.todayPayedAmt|formatCurrency}}</em> 元</li>
                                        <li>今日回款笔数：<em>{{user2.todayPayedCount}}</em> 笔</li>
                                        <li class="mt-30">本月待收金额：<em>{{user2.monthRepayAmt|formatCurrency}}</em> 元</li>
                                        <li>本月已收总额：<em>{{user2.monthPayedAmt|formatCurrency}}</em> 元</li>
                                    </ul>
                                </div>
                                <p class="c-999 mt-25">提示：易智投服务到期日并不代表实际回款时间，实际回款时间以全部债权退出完成时间为准。易智投的预期回款金额不代表最终收益，最终收益以实际结算金额为准。</p>
                            </div>
                        </div>
                        <div class="mu-account-taskcenter mt-20">
                            <div class="mu-title"><h4>任务中心</h4><router-link class="more" to="/spa/member/task">完成任务领奖励 &gt;</router-link></div>
                            <ul class="tasklist clearfix">
                                <li v-if="user.actStart"><router-link to="/spa/activity/august">
                                <img src="@/assets/images/user/task-coupon.png" alt="">
                                    <div class="desc">奖励券天天领</div>
                                    <div class="btndesc">立即领取</div>
                                </router-link></li>
                                <li v-if="user.actStart"><router-link to="/spa/activity/august">
                                    <img src="@/assets/images/user/task-reward.png" alt="">
                                    <div class="desc">出借抽奖</div>
                                    <div class="btndesc">立即参与</div>
                                </router-link></li>
                                <li><router-link to="/spa/member/task">
                                    <img src="@/assets/images/user/task-cash.png" alt="">
                                    <div class="desc">免费快速提现</div>
                                    <div class="btndesc">立即领取</div>
                                </router-link></li>
                                <li><router-link to="/spa/event/recommend">
                                    <img src="@/assets/images/user/task-recommend.png" alt="">
                                    <div class="desc">邀请有奖</div>
                                    <div class="btndesc">了解详情</div>
                                </router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer>
        <a-modal title="修改用户名" :visible="ifShowUpdateName" :maskClosable="false" @ok="updateName" @cancel="ifShowUpdateName=false"
            cancelText="取消" okText="确定" :centered="true" :width="360" :closable="false">
            <button type="button" class="closemodal" @click="ifShowUpdateName=false"><i class="icon-font icon-close"></i></button>
            <div class="mu-security-username">
                <div><input type="text" maxlength="18" class="input-text" placeholder="请输入新用户名" v-model="username"/></div>
                <div class="l20 c-666 mt-10">* 用户名仅能修改一次</div>
                <div class="l20 c-666">* 6-18位字符，可包含小写英文字母、数字</div>
            </div> 
        </a-modal>
        <a-modal :title="false" :visible="ifShowDeposit" :maskClosable="false" :bodyStyle="layerStyle"
            :footer="null" :centered="true" width="610" :closable="false">
            <button type="button" class="closemodal" @click="ifShowDeposit=false"><i class="icon-font icon-close"></i></button>
            <Deposit></Deposit>
        </a-modal>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import UserMenu from '@/components/user/Menu'
import Whattip from '@/components/common/Whattip'
import Deposit from '@/components/layer/Deposit'
import {toJson,dateformat,formatCurrency} from '@/utils/utils'
import Vue from 'vue'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
import {Calendar,Pagination,Tabs} from 'ant-design-vue'
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Calendar)

export default {
    components:{
        Header,
        Footer,
        Whattip,
        UserMenu,
        Deposit,
    },
    data() { 
        return {
            ifShowDeposit:false,
            layerStyle:{width:'560px',padding:0},
            swiperOption:{
                autoplay: true,
                direction : 'vertical',
            },
            ifShowUpdateName:false,
            totalDatas:[],
            user:{},
            ifInitDatas:false,
            user2:{
              todayRepayAmt:0,
              todayPayedAmt:0,
              todayPayedCount:0,
              monthRepayAmt:0,
              monthPayedAmt:0, 
            },
            currentTime:new Date(),
            accountVo:{},
            repayData:{},
            username:'',
            calendarList:[],
            confirmLoading: false,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                userOn:'user_index'
            }
        }
    },
    filters:{
        dateformat,formatCurrency,
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        ...mapState(['loginInfo'])
    },
    mounted(){
        if(!this.pageInfo.loginInfo.isDepositary){
            let user = this.pageInfo.loginInfo.nickName+'tipsdate2019';
            let tipsDate = localStorage.getItem(user);
            if(tipsDate){
                let currentDate=this.moment().format('YYYY-MM-DD');
                if(tipsDate!=currentDate){
                    localStorage.setItem(user,currentDate);
                    this.ifShowDeposit=true;
                }
            }else{
                localStorage.setItem(user,this.moment().format('YYYY-MM-DD'));
                this.ifShowDeposit=true;
            }
        }
        this.initData();
    },
    methods:{
        initData(){
            this.$post('/member/account/index').then(res => {
                let result=toJson(res)
                this.currentTime=result.currentTime;
                this.user=result.data;
                this.accountVo=this.user.accountVo;
                this.repayData=toJson(result.data.repayData);
                setTimeout(() => {
                    this.swiper.slideTo(0, 1000, false)
                    this.initEcharts();
                    this.initCalendar();
                }, 10)
            })
        },
        updateName(){
            let userName=this.username
            if(userName==''){
                this.$layer.msg('用户名不能为空');
            }else if(userName.length<6){
                this.$layer.msg('用户名长度应为6-18位');
            }else if(!/^([a-z0-9]{6,18})$/.test(userName)){
                this.$layer.msg('用户名只支持小写英文字母、数字');
            }else{
                this.$post('/member/secure/username/update',{"userName":userName}).then(res => {
                    if (res.success) {
                        this.$layer.msg('修改成功');
                        this.pageInfo.loginInfo.isDefaultUsername=0;
                        this.ifShowUpdateName=false;
                    } else {
                        this.$layer.msg(res.msg);
                    }
                })
                
            }
            
        },
        initEcharts(){ //图表
            let _this=this;
            let myChart = _this.$echarts.init(document.getElementById('totalEchart'))
            this.totalDatas.push({value:this.user.hplanPrin+this.user.hplanInter,name:'易智投　　'});
            this.totalDatas.push({value:this.user.duePrincipal+this.user.dueInterest,name:'散标&债权'});
            this.totalDatas.push({value:this.accountVo.frozeAmt,name:'冻结资金　'});
            this.totalDatas.push({value:this.accountVo.availableAmt,name:'可用余额　'});
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}元 ({d}%)"
                },
                legend: {
                    show : true,
                    left : 400,
                    orient: 'vertical',
                    top : 'middle',
                    itemWidth:15,
                    itemGap :20,
                    formatter: function (name) {
                        return _this.getEchartsLegend(name);
                    },
                    textStyle : {color : '#999',fontSize :16},
                    data:[_this.totalDatas[0].name,_this.totalDatas[1].name,_this.totalDatas[2].name,_this.totalDatas[3].name]
                },
                color:['#e6c182','#384e8a','#a1adcc','#6aaaff'],
                series: [
                    {
                        name:'账户总资产',
                        type:'pie',
                        center : [ '150px', '50%' ],
                        radius : [ '50%', '80%' ],
                        minAngle : 0.1,
                        label : {
                            normal : {
                                show : false,
                                position: 'center'
                            }
                        },
                        data:_this.totalDatas
                    }
                ]
            });
            myChart.on('legendselectchanged', function(obj) {
                myChart.dispatchAction({type:'legendSelect',name:obj.name});//点击始终选中
                if(obj.name == _this.totalDatas[0].name){
                    _this.$router.push('/spa/member/invest/autobid')
                }else if(obj.name == _this.totalDatas[1].name){
                    _this.$router.push('/spa/member/invest/holdlist')
                }
            });
            this.ifInitDatas=true;
        },
        getEchartsLegend(name){
            let _this=this;
            for(let i=0;i<_this.totalDatas.length;i++){
                let legend='　'+name+'　　';
                if(name==_this.totalDatas[i].name){
                    if(name.length==3){
                        legend+='　';
                    }
                    return legend+formatCurrency(_this.totalDatas[i].value)+'元';
                }
            }
        },
        initCalendar() {
            let self = this;
            let calendarList=[];
            let systemDate=new Date(self.currentTime);
            let lastMonth=[];
            let length = self.repayData.data.length,semp;
	        for (let i = length - 1; 0 < i; i--) {//月份排序
	            for (let j = 0; j < i; j++) {
	                if (new Date(self.repayData.data[j].yearMonth+'-01') > new Date(self.repayData.data[j + 1].yearMonth+'-01')) {
                        semp=self.repayData.data[j];
                        self.repayData.data[j] = self.repayData.data[j + 1];
	                    self.repayData.data[j + 1] = semp;
	                }
	            }
	        }         
			let repaying=0;
			let repayed=0;
			let repayTotal=0;
			for(let i in self.repayData.data){
				let data=self.repayData.data[i];
				if(dateformat(self.currentTime,'YYYY-MM')==data.yearMonth){
					for(let x in data.repayList){
        				let item=data.repayList[x];
        				repayTotal+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				if(item.investStatus=="4"){
        					repayed+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				}else{
        					repaying+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				}
        			}
				}
            }	
            self.user2.monthRepayAmt=repaying
            self.user2.monthPayedAmt=repayed
            
            let timeDay=[];
            let hashArr=[];
            for(let i in self.repayData.data){
            	let data=self.repayData.data[i];
        		let yearMonth=new Date(data.yearMonth+'-01');
        		
            	for(let x in data.repayList){
            		let item=data.repayList[x];
            		//console.log(item)
            		let day=new Date(item.settleDate);
            		let currentMonth=day.getMonth()+1;
        			currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
        			let currentDate=day.getDate();
        			currentDate=currentDate<10?"0"+currentDate:currentDate;
        			let currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
        			timeDay.push({time:currentDay,investStatus:item.investStatus,investType:item.investType,amt:item.principal+item.allIncome});
        			if(!hashArr[currentDay]){
        				hashArr[currentDay]=true;
            			let investStatus=(item.investStatus!="4")?"待收":"已收";
            			let money=formatCurrency(item.principal+item.allIncome);
            			calendarList.push({
                			title:money,
                            start: currentDay,
                            time:currentDay,
                            investType : item.investType,
                            description:'1笔'+investStatus+'，共'+money+'元'
                		})
            		}
            	}
            	for (let j = 0; j < calendarList.length; j++) {
            		let repayAmount=0;
            		let payedAmount=0;
            		let repayTotal=0;
            		let payedTotal=0;
            		let ele = calendarList[j];
            		for (let i = 0; i < timeDay.length; i++) {
    					if(timeDay[i].time==ele.time){
    						let item=timeDay[i];
    						if(item.investStatus=="4"){
    							payedAmount+=item.amt;
    							payedTotal++;
    						}else{
    							repayAmount+=item.amt;
    							repayTotal++;
    						}
    					}
    				}
            		if(payedAmount>0||repayAmount>0){
            			let title ="";
            			let str = '';
            			if(repayTotal>0){
            				title=self.formatMoney(repayAmount+payedAmount);
            				ele.type='repay';
            				str = '<p>'+repayTotal+'笔待收，共'+formatCurrency(repayAmount)+'元</p>';
            			}
            			if(payedTotal>0){
            				if(title==''){
            					title=self.formatMoney(repayAmount+payedAmount);
            				}
                            ele.type='pay';
            				str += '<p>'+payedTotal+'笔已收，共'+formatCurrency(payedAmount)+'元</p>';
            			}
            			ele.title=title;
						ele.description=str;
						if(ele.time==dateformat(self.currentTime,'YYYY-MM-DD')){
                            self.user2.todayRepayAmt=repayAmount
                            self.user2.todayPayedAmt=payedAmount
                            self.user2.todayPayedCount=payedTotal+repayTotal
						}
            		}
				}
            }
            this.calendarList=calendarList;
        },
        dateformat(value, pattern = 'YYYY-MM-DD'){
            return dateformat(value,pattern)
        },
        formatMoney(num){
        	if(parseInt(num)<100000){
        		return formatCurrency(num)+'元';
			}else{
        		return this.returnFloat(Math.floor(num/10000 * 100) / 100)+'万'
			}
        },
        returnFloat(value){
            value=Math.round(parseFloat(value)*100)/100;
            let xsd=value.toString().split(".");
            if(xsd.length==1){
                value=value.toString()+".00";
                return value;
            }
            if(xsd.length>1){
                if(xsd[1].length<2){
                    value=value.toString()+"0";
                }
                return value;
            }
		}
    },
 }
</script>
<style scoped>
    .mu-account-plan >>> .ant-fullcalendar-calendar-body{padding:5px 0;}
    .mu-account-plan >>> .ant-fullcalendar-header{text-align:center;}
    .mu-account-plan >>> .ant-fullcalendar-header .ant-radio-group{display:none;}
    .mu-account-plan >>> .ant-fullcalendar-month,
    .mu-account-plan >>> .ant-fullcalendar-date{border-top:none;background:#f2f2f2;margin-top:7px;}
    .mu-account-plan >>> .ant-fullcalendar-column-header{text-align: center;padding-right: 0;}
    .mu-account-plan >>> .ant-fullcalendar-month,
    .mu-account-plan >>> .ant-fullcalendar-date{height:56px;}
    .mu-account-plan >>> .ant-fullcalendar-value{text-align:left;}
    .mu-account-plan >>> .ant-fullcalendar-today .ant-fullcalendar-date{background:#fcf8e3;}
    .mu-account-plan >>> .ant-fullcalendar-month,
    .mu-account-plan >>> .ant-fullcalendar-date{padding:4px 5px;}
    .mu-account-plan >>> .ant-fullcalendar-next-month-btn-day .ant-fullcalendar-date,
    .mu-account-plan >>> .ant-fullcalendar-last-month-cell .ant-fullcalendar-date{background:#fcfcfc;}
    .mu-account-plan >>> .ant-fullcalendar-content{overflow:visible;text-align:right;position: relative;height:20px;}
    .mu-account-plan >>> .ant-fullcalendar-content .daynotes{line-height:20px;font-size:12px;white-space: nowrap;}
    .mu-account-plan >>> .ant-fullcalendar-content .daynotes:before{display:block;content:'';background-color:#3bbbfc;width:6px;height:6px;border-radius:6px;position: absolute;right:0;top:-16px;}
    .mu-account-plan >>> .ant-fullcalendar-content .daynotes .notes{display: none;font-size:14px;position: absolute;left:70px;top:0;background:#fff;z-index:1000;transform:translateY(-50%);padding:10px 15px;line-height:22px;border-radius:5px;border:1px solid #ddd;box-shadow:0 0 5px rgba(100,100,100,.3)}
    .mu-account-plan >>> .ant-fullcalendar-date:hover .ant-fullcalendar-content .daynotes .notes{display:block;text-align:left;}
    .mu-account-plan >>> .ant-fullcalendar-content .daynotes .notes:before{content: ""; position: absolute; width: 0; height: 0; left: -16px; top: 50%; border: 8px solid transparent; border-right-color: #ddd;transform:translateY(-5px);}
    .mu-account-plan >>> .ant-fullcalendar-content .daynotes .notes:after{content: ""; position: absolute; width: 0; height: 0; left: -15px; top: 50%; border: 8px solid transparent; border-right-color: #fff;transform:translateY(-5px);}
    
</style>
<style lang="less" scoped>
@import "~@/assets/style/user.less";
.mu-account-safe{position: relative;height:170px;padding:50px 240px 50px 210px;background:#fff;
    .logo{position: absolute;left:0;top:0;width:210px;line-height:170px;text-align:center;
        img{width:134px;height:134px;border-radius:50%;}
    }
    .welcome{font-size:18px;
        .icon-font{margin-right:5px;}
        .icon-font.disabled{color:#999;}
    }
    .risk{line-height:20px;padding-top:20px;}
    .sd{position: absolute;right:0;top:25px;width:240px;text-align:center;height:120px;border-left:1px dashed #d2d2d2;
        .bonus{display: inline-block;margin-top:25px;}
        .pic{height:55px;}
        p{font-size:16px;color:#000;}
    }
}

.mu-account-tixing{position:relative;padding:10px 0;
    .bd{
        height:40px;
        .item{text-align:left;line-height:40px;color:#666;font-size:14px;
            em{color:#c00;}
            .icon-font{margin-right:5px;}
        }
    }
}
.mu-account-total.usertotal{padding-right:250px;
    .link{position: absolute;right:20px;top:25px;line-height:120px;text-align: center;}
    .btn{line-height:30px;border:1px solid #f1ab3e;background:#f1ab3e;width:84px;margin:0 5px;border-radius:5px;color:#fff;}
    .btn:hover{opacity:.9;}
    .btn-info{background:none;border:1px solid #3961cd;color:#3961cd;}
}
.mu-account-taskcenter{background:#fff;
    .tasklist{padding:20px 10px 40px;}
    .tasklist li{float: left;text-align:center;position: relative;width:240px;}
    .tasklist .btndesc{position: absolute;left:124px;top:53px;text-align:center;color:#fff;line-height:24px;font-size: 12px;}
    .desc{font-size:16px;color:#fff;position: absolute;line-height:1;min-width:100px;text-align: center;left:106px;top:25px;}
}
.mu-account-echart{background:#fff;position:relative;padding-top:50px;padding-bottom:20px;
    .echarts{width:100%;height:240px;} 
    .xinwangtip{position:absolute;right:20px;top:0;line-height:40px;}
    .total{position: absolute;left:405px;top:45px;font-size:16px;}
    .amount{color:#333;font-size:26px;margin-left:20px;line-height:1;}
    .amount em{font-size:20px;}
    .incomedetail{position:absolute;right:20px;top:50px;font-size:16px;line-height:20px;}
    .btn-assets{position:absolute;right:20px;top:80px;line-height:30px;padding:0 15px;border-radius:5px;}
} 
.mu-account-plan{
    .hd .more em{font-size:16px;cursor:pointer;}
    .hd .more em.on{color:#3961cd;font-weight:700;}
    .bd{background:#fff;position:relative;padding:20px 30px;}
    .bd .calendarlist{width:560px;height:460px;}
    .repay-info{color:#333;
        span.label {display:inline-block;width:12px;height:12px;border-radius:50%;}
        span.label-info {background-color:#f29118;}
        span {margin-right:4px;}
        span.label-primary {background-color:#3961cd;margin-left:20px;}
    } 
    .calendardesc{position:absolute;right:0;top:100px;width:326px;
        .date{vertical-align:bottom;color:#666;font-size:18px;}
        .date .icon-font{font-size:20px;color:#737373;}
        .list li{line-height:30px;font-size:14px;color:#777;}
        .list li em{display: inline-block;min-width:80px;text-align:right;color:#333;font-size:16px;}
    }
} 
</style>
