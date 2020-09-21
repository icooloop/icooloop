<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer pb-20 bgproduct" v-if="!submitSuccess">
            <div class="wp">
                <div class="m-shoplist" v-if="!initSuccess">
                    <div class="hd pt-10"><i class="icon-font icon-shopcart"></i>购物车</div>
                    <div class="loadingdata">
                        <a-spin size="large" />
                    </div>
                </div>
                <div class="m-shoplist" v-else-if="shoplist && shoplist.length>0">
                    <div class="hd pt-10 xxxx"><i class="icon-font icon-shopcart"></i>购物车</div>
                    <div class="bd">
                        <div class="shoplist">
                            <a-affix :offsetTop="0">
                                <ul class="thead">
                                    <li class="col1"><a-checkbox @change="selectAll" :indeterminate="indeterminate" :checked="checkAll">全选</a-checkbox></li>
                                    <li class="col2">协议约定年化利率<Whattip arrow="bottom" notes="此利率不构成亿钱贷对出借人的任何承诺，最终收益以实际为准"/></li>
                                    <li class="col3">借款期限</li>
                                    <li class="col4">剩余可投（元）</li>
                                    <li class="col5">出借金额（元）</li>
                                    <li class="col6">选择优惠券</li>
                                    <li class="col7">预期收益（元）<Whattip width="auto" :nowrap="true" arrow="right" notes="预期收益 = 预期项目利息 + 优惠券收益" style="margin-left:0;"/></li>
                                    <li class="col8">操作</li>
                                </ul>
                            </a-affix>
                            <div class="tbody">
                                <div class="item" v-for="(loan,index) in shoplist" :key="'shopcart'+index">
                                    <ul class="title">
                                        <li class="col1">
                                            <a-checkbox :value="loan.loanId" :checked="checkedList.includes(loan.loanId)" @change="selectSingle" v-if="loan.loanStatus==2"></a-checkbox>
                                            <div v-else class="text-danger">已满标</div>
                                        </li>
                                        <li><router-link :to="'/spa/product/detail/'+loan.loanId" target="_blank"><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.loanTitle}}</router-link></li>
                                    </ul>
                                    <ul class="detail">
                                        <li class="col1"></li>
                                        <li class="col2"><div class="rate">{{loan.platRate}}%<span v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></div></li>
                                        <li class="col3"><div class="limit">{{loan.loanPeriod}}<em> {{loan.periodStr}}</em></div></li>
                                        <li class="col4">{{loan.remainderAmt|formatCurrency}}</li>
                                        <li class="col5">
                                            <InputNumber :loanId="loan.loanId" :inputkey="'key'+index" :width="120" :hasunit="false" :disabled="loan.loanStatus!=2" :showBtn="false" :defaultValue="loan.investAmt?loan.investAmt:0"
                                            :max="loan.remainderAmt" :type="'currency'" @change="changeInputNumber" :maxlength="8"/>
                                            <Errortip :msg="loan.inputTip" v-if="loan.inputTip" size="small" class="inputtip"></Errortip>
                                        </li>
                                        <li class="col6">
                                            <VoucherSelect ref="voucherselect" :loan="loan" width="170px" :disabled="loan.loanStatus!=2" :ifMultiple="true"
                                            @change="changeVoucher" :selectedRedTotal="selectedRedTotal" :selectedTicketTotal="selectedTicketTotal"/>
                                        </li>
                                    <li class="col7">{{loan.totalInterest|formatCurrency}}<Whattip width="auto" :nowrap="true" arrow="right" :notes="loan.totalInterestText" v-if="false"/></li>
                                        <li class="col8"><a href="javascript:;" class="text-primary" @click="delShopcart(loan.loanId)">删除</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a-affix :offsetBottom="0">
                        <div class="ft pb-20">
                            <ul class="total">
                                <li>
                                    <a-checkbox @change="selectAll" :indeterminate="indeterminate" :checked="checkAll">全选</a-checkbox>
                                    <a href="javascript:;" class="text-primary ml-10" @click="delSelectShopcart">删除选中</a>
                                    <span class="pl-20">已选散标：{{checkedList.length}}个</span>
                                    <span class="pl-30">可用余额(元)：{{availableAmt|formatCurrency}}</span>
                                    <router-link to="/spa/member/account/recharge" target="_blank" class="text-primary ml-20">充值</router-link>
                                </li>
                                <li>
                                    <span>总出借金额(元)：<span class="text-warning f-18">{{totalInvestAmt|formatCurrency}}</span></span>
                                    <span class="ml-40">总预期收益(元)：<span class="f-16">{{totalIncome|formatCurrency}}</span></span>
                                    <button :class="['btn-submit','btn','ml-40','btn-primary',disabledSubmit?'disabled':'']" @click="confirmInvest()" :disabled="disabledSubmit"><a-spin size="small" class="mr-5" v-if="disabledSubmit"/>确认支付</button>
                                </li>
                            </ul>
                            <div class="l20 text-r mt-15 pr-20">
                                <a-checkbox @change="changeAgreement">我已阅读并同意所有项目的《借款协议》以及</a-checkbox>
                                <a target="_blank" class="text-primary" href="/contract/debt-risk">《风险及禁止性行为提示书》</a>
                                <span class="text-muted ml-10">如需再次查看《借款协议》请至散标详情页</span>
                            </div>
                        </div>
                    </a-affix>
                </div>
                <div class="noshop" v-else>
                    <img src="@/assets/images/product/shopcart.png" alt="" class="shopcart">
                    <p>您的购物车暂无出借信息</p>
                    <router-link class="btn btn-primary" to="/spa/product/index">去出借</router-link>
                </div>
            </div>
            
        </div>
        <div class="g-mainer pd-30 bgproduct" v-else>
            <div class="m-shopresult">
                <div class="hd" v-if="submitResult.totalIncome>0"><i class="icon-font icon-cat-success text-success"></i><span class="bold">您已完成出借申请</span></div>
                <div class="hd" v-else><i class="icon-font icon-cat-fail text-danger"></i><span class="bold">您已完成出借申请</span></div>
                <div class="bd">
                    <div class="result">该笔申请 : 成功 <span class="text-warning">{{submitResult.successCount}}</span> 笔，失败 <span class="text-warning">{{submitResult.failCount}}</span> 笔，总出借金额 <span class="text-warning">{{submitResult.totalSuccessAmt|formatCurrency}}</span> 元
                        <Whattip width="auto" arrow="center" :nowrap="true" notes="此操作是提交出借申请，是否成功以最终交易结果为准"/>
                    </div>
                    <table class="bidtable">
                        <tr><th width="240">项目名称</th><th width="180">出借金额(元)</th><th>出借状态</th></tr>
                        <tr v-for="(loan,index) in submitResult.successList" :key="'success'+index">
                            <td><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.prdName}}</td>
                            <td>{{loan.investAmount|formatCurrency}}</td>
                            <td>
                                <span class="text-warning">申请成功</span>
                            </td>
                        </tr>
                        <tr v-for="(loan,index) in submitResult.failList" :key="'fail'+index">
                            <td><ULabel :type="prdTypes[loan.prdType]" size="small"/> {{loan.prdName}}</td>
                            <td>{{loan.investAmount|formatCurrency}}</td>
                            <td>
                                <span class="text-muted">申请失败</span>
                            </td>
                        </tr>
                    </table>
                    <div class="shopprogress" v-if="submitResult.totalIncome>0"><img src="@/assets/images/product/shopprogress.png" alt="">
                        <div class="desc1">
                            <h5>出借完成</h5>
                            <p>{{submitResult.datetime| dateformat('YYYY-MM-DD HH:mm')}}</p>
                        </div>
                        <div class="desc2">
                            <h5>开始计息</h5>
                            <p>每个标的的满标放款时间</p>
                        </div>
                        <div class="desc3">
                            <h5>收回本息</h5>
                            <p>预期收益 {{submitResult.totalIncome|formatCurrency}} 元</p>
                        </div>
                    </div>
                </div>
                <div class="ft">
                    <router-link class="btn btn-default" to="/spa/member/account/index">查看我的账户</router-link>
                    <router-link class="btn btn-warning" to="/spa/product/index">浏览出借项目</router-link>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import ULabel from '@/components/common/ULabel'
import Whattip from '@/components/common/Whattip'
import Errortip from '@/components/common/Errortip'
import InputNumber from '@/components/form/InputNumber'
import VoucherSelect from '@/components/form/VoucherSelect'
import {toJson,formatCurrency,dateformat} from  '@/utils/utils'
import {loanMatchVoucher} from '@/utils/product'
let loanList=[];
export default {
    components:{
        Header,
        Footer,
        ULabel,
        InputNumber,
        VoucherSelect,
        Whattip,
        Errortip,
    },
    data() {
        return {
            agreement:false,
            disabledSubmit:false,
            submitResult:{},
            submitSuccess:false,
            initSuccess:false,
            prdTypes:['qn','sn','wh','lb','cb','wq'],
            checkAll:true, //是否全选
            indeterminate: false, //是否部分选
            shoplist:[],//购物车标的数组
            loanIdList:[],//loanId数组
            redList:[],//红包List
            ticketList:[],//奖励券List
            checkedList:[],//选中的loanId数组
            selectedRedTotal:[],//已选的红包ID数组
            selectedTicketTotal:[],//已选的奖励券ID数组
            availableAmt:0,//可用余额
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed: {
        ...mapState(['loginInfo']),
        totalInvestAmt(){
            let total=0;
            this.shoplist.forEach(loan=>{
                if(this.checkedList.includes(loan.loanId)) total+=loan.investAmt;
            })
            return total;
        },
        totalIncome(){
            let total=0;
            this.shoplist.forEach(loan=>{
                if(this.checkedList.includes(loan.loanId)) total+=loan.totalInterest;
            })
            return total;
        }
    },
    mounted(){
        this.initShopcartData();
    },
    filters:{
        formatCurrency,dateformat
    },
    methods:{
        initShopcartData(){
            this.$post('/product/buyCart/list').then(res => {
                this.initSuccess=true;
                let result=toJson(res).data;
                if(res.success){
                    loanList = result.buyCarts;
                    this.availableAmt=result.availableAmt;
                    this.redList=result.voucherList;
                    this.ticketList=result.ticketList;
                    if(loanList && loanList.length > 0 ){  //初始化购物车
                        loanList.map((loan)=>{
                            if(loan.loanStatus==2){
                                if(loan.investAmt>loan.remainderAmt) loan.investAmt=loan.remainderAmt
                                this.checkedList.push(loan.loanId);
                                this.loanIdList.push(loan.loanId);
                                let loanMatch=loanMatchVoucher(loan,this.redList,this.ticketList,this.selectedRedTotal,this.selectedTicketTotal);
                                this.selectedRedTotal=[...loanMatch.selectedRedTotal]
                                this.selectedTicketTotal=[...loanMatch.selectedTicketTotal]
                                return loanMatch.loan;
                            }
                            return loan;
                        })
                        loanList.map(loan=>{
                            if(loan.redList &&loan.redList.length>0){
                                loan.redList.map(voucher=>{
                                    voucher.hasuse = this.selectedRedTotal.includes(voucher.awardDtlId) && !loan.selectedRedList.includes(voucher.awardDtlId)
                                    return voucher
                                })
                            }
                            if(loan.ticketList &&loan.ticketList.length>0){
                                loan.ticketList.map(voucher=>{
                                    voucher.hasuse = this.selectedTicketTotal.includes(voucher.awardDtlId) && loan.selectedTicket!=voucher.awardDtlId;
                                    return voucher
                                })
                            }
                            return loan;
                        })
                        this.shoplist=[...loanList];
                    }
                }else{
                    this.$layer.msg(res.msg)
                    if(res.code=="401") window.location.reload();
                }
            })
        },
        changeInputNumber(result){  //修改出借金额触发
            this.shoplist.forEach((loan,index)=>{
                if(loan.loanId==result.loanId){
                    loan.inputTip=''
                    if(result.value<(loan.minAmt?loan.minAmt:0) && result.value < loan.remainderAmt){
                        loan.inputTip='最小出借金额为'+(loan.remainderAmt<loan.minAmt?loan.remainderAmt:loan.minAmt)+'元'
                    }
                    loan.selectedRedList.forEach(itemId=>{
                        this.selectedRedTotal.splice(this.selectedRedTotal.findIndex(v => v ==itemId),1);//已选红包库删除之前选择的红包
                    })
                    if(loan.selectedTicket) this.selectedTicketTotal.splice(this.selectedTicketTotal.findIndex(v => v ==loan.selectedTicket),1);//已选奖励券库删除之前选择的奖励券
                    loan.investAmt=result.value
                    let loanMatch=loanMatchVoucher(loan,this.redList,this.ticketList,this.selectedRedTotal,this.selectedTicketTotal);
                    loan=loanMatch.loan;
                    loan.selectedRedTotal=[...loanMatch.selectedRedTotal]
                    loan.selectedTicketTotal=[...loanMatch.selectedTicketTotal]
                    this.changeVoucher(loan)
                }
            })
        },
        selectAll(e){ //选中全部
            Object.assign(this, {
                checkedList: e.target.checked ? [...this.loanIdList] : [],
                indeterminate: false,
                checkAll: e.target.checked,
            })
        },
        selectSingle(e){ //全中单个
            e.target.checked?this.checkedList.push(e.target.value):this.checkedList.splice(this.checkedList.findIndex(v => v ==e.target.value),1);
            this.indeterminate =this.checkedList.length>0 && this.checkedList.length < this.loanIdList.length
            this.checkAll = this.checkedList.length == this.loanIdList.length
        },
        changeVoucher(loan){ //红包改变事件
            this.selectedRedTotal=loan.selectedRedTotal
            this.selectedTicketTotal=loan.selectedTicketTotal
            this.shoplist.forEach((item,index)=>{
                if(loan.loanId==item.loanId){
                    item={...loan}
                }
                let maySelect=false;//是否有可选用的优惠券  
                item.redList.map(voucher=>{
                    voucher.hasuse = this.selectedRedTotal.includes(voucher.awardDtlId) && !item.selectedRedList.includes(voucher.awardDtlId)
                    if(!voucher.hasuse&&!voucher.selected&&!voucher.disabled) maySelect=true;
                    return voucher
                })
                item.ticketList.map(voucher=>{
                    voucher.hasuse = this.selectedTicketTotal.includes(voucher.awardDtlId) && item.selectedTicket!=voucher.awardDtlId;
                    if(!voucher.hasuse&&!voucher.selected&&!voucher.disabled) maySelect=true;
                    return voucher
                })
                if(maySelect && item.selectStr=='无符合条件的优惠券') item.selectStr=''
                if(!maySelect && item.selectStr=='') item.selectStr='无符合条件的优惠券'
                Vue.set(this.shoplist,index,item)
            })
        },
        confirmInvest(){ //确认投资
            if(this.agreement){
                if(this.checkedList.length==0){
                    this.$layer.msg('请先选中要出借的项目');
                    return;
                }
                if(this.availableAmt<this.totalInvestAmt){
                    this.$layer.msg('可用余额不足，请充值');
                    return;
                }
                if(this.checkInvestAmt()){
                    let vos=[];
                    this.shoplist.forEach(loan=>{
                        if(this.checkedList.includes(loan.loanId)){
                            let item={};
                            item.amount=loan.investAmt;
                            item.loanId=loan.loanId;
                            item.couponIdsStr=loan.selectedRedList.join(',');
                            item.ticketId=loan.selectedTicket
                            vos.push(item)
                        }
                    })
                    this.disabledSubmit=true;
                    this.$post('/product/buyCart/invest',{vos:JSON.stringify(vos)}).then(res=>{
                        this.disabledSubmit=false;
                        let result=res.jsonData;
                        if(res.success){
                            this.submitResult.resultList=result.result;
                            this.submitResult.successCount=0
                            this.submitResult.failCount=0
                            this.submitResult.totalSuccessAmt=0;
                            this.submitResult.datetime=result.currentTime
                            this.submitResult.totalIncome=0;
                            this.submitResult.successList=[];
                            this.submitResult.failList=[];
                            if(this.submitResult.resultList && this.submitResult.resultList.length>0){
                                this.submitResult.resultList.forEach(item=>{
                                    if(item.successed){
                                        this.submitResult.successCount+=1
                                        this.submitResult.totalIncome+=(item.expectedIncome?item.expectedIncome:0)
                                        this.submitResult.totalSuccessAmt+=(item.investAmount?item.investAmount:0)
                                        this.submitResult.successList.push(item)
                                    }else{
                                        this.submitResult.failCount+=1  
                                        this.submitResult.failList.push(item)   
                                    }
                                })
                            }
                            this.submitSuccess=true;
                            
                            this.pageInfo.loginInfo.itemCount=result.itemCount
                            this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo); 
                        }else{
                            this.$layer.msg(res.msg);
                        }
                    })
                }
            }else{
                this.$layer.msg('请勾选项目借款协议')
            }
            
        },
        checkInvestAmt(){
            let flag=true;
            this.shoplist.forEach((loan,index)=>{
                if(this.checkedList.includes(loan.loanId)){
                    if(loan.remainderAmt>0 && (!loan.investAmt || (loan.investAmt<(loan.minAmt?loan.minAmt:0) && loan.investAmt< loan.remainderAmt))){
                        this.$layer.msg('请先修改出借金额');
                        loan.inputTip='最小出借金额为'+(loan.remainderAmt<loan.minAmt?loan.remainderAmt:loan.minAmt)+'元'
                        flag=false;
                        Vue.set(this.shoplist,index,loan)
                    } 
                }
            })
            return flag;
        },
        delSelectShopcart(){  //删除选中
            let self=this;
            if(self.checkedList.length==0){
                this.$layer.msg('请选择要删除的项目');
            }else{
                self.$confirm({
                    title: '确定删除选中的项目吗?',
                    content: '',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        self.delShop(self.checkedList);
                    },
                    centered: true,
                });
            }
        },
        delShopcart(loanId){ //删除单个
            let self=this;
            self.$confirm({
                title: '确定删除该项目吗?',
                content: '',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    let checkedList=[];
                    checkedList.push(loanId);
                    self.delShop(checkedList);
                },
                centered: true,
            });
        },
        delShop(checkedList){
            let self=this;
            let loanIdsStr=checkedList.join(',');
            self.$post('/product/buyCart/delete',{loanIdsStr:loanIdsStr}).then(res => {
                let result=toJson(res);
                if(result.success){
                    this.shoplist.forEach(loan=>{   //重置删除的标的选择的优惠券
                        if(checkedList.includes(loan.loanId)){
                            if(loan.selectedRedList){
                                loan.selectedRedList.forEach(voucherId=>{
                                    this.selectedRedTotal.splice(this.selectedRedTotal.findIndex(v => v ==voucherId),1);//已选红包库删除当前选择的红包
                                })
                            }
                            if(loan.selectedTicket){
                                this.selectedTicketTotal.splice(this.selectedTicketTotal.findIndex(v => v ==loan.selectedTicket),1);//已选奖励券库删除之前选择的奖励券
                            }
                        }
                    })
                    this.pageInfo.loginInfo.itemCount=res.jsonData.itemCount
                    this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo); 
                    this.$layer.msg('删除成功');
                    if(checkedList){
                        checkedList.forEach(loanId=>{
                            self.shoplist.splice(self.shoplist.findIndex(item => loanId==item.loanId), 1)
                        })
                    }
                    
                }else{
                    this.$layer.msg('删除失败');
                }
            })
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
    }
 }
</script>
<style scoped>
   .m-shoplist >>> .hasselect .input-text {color:#3961cd;}
</style>
<style lang="less" scoped>
@import "~@/assets/style/product.less";
@import "~@/assets/style/config.less";
.noshop{
    text-align: center;padding:120px 0;
    .shopcart{margin-right:20px;}
    p{font-size:16px;color:#666;line-height:20px;margin-top:30px;}
    .btn{line-height:40px;width:146px;border-radius:5px;margin-top:20px;}
}
.m-shoplist{
    .loadingdata{text-align:center;line-height:500px;}
    .hd{
        font-size:18px;line-height:40px;
        .icon-font{font-size:20px;margin:0 5px;}
    }
    .bd{
        .shoplist{
            .col1{width:70px;text-align:center}
            .col2{width:175px;}
            .col3{width:125px;}
            .col4{width:170px;}
            .col5{width:175px;height:32px;position:relative;
                .inputtip{position: absolute;left:0;bottom:40px;line-height:20px;height:20px;}
            }
            .col6{width:220px;}
            .col7{width:125px;}
            .col8{width:140px;text-align:center}
            .thead{display:flex;line-height:50px;background:#efefef;}
            .tbody{
                background:#fff;color:#666;
                .title{line-height:30px;display:flex;padding-top:10px;}
                .detail{border-bottom:1px solid #efefef;height:60px;display:flex;align-items:center;padding-bottom:10px;}
                .item:hover{box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);}
                .rate{font-size:16px;line-height:1;position:relative;display:inline-block;}
                .limit{font-size:16px;}
            }
        }
    }
    .ft{background:#efefef;
        .total{display:flex;align-items: center;justify-content:space-between;height:80px;padding-left:20px;background:#f6f6f6;box-shadow: 0 0 20px rgba(0,0,0,0.2);}
        .btn-submit{width:140px;line-height:80px;height:80px;}
        .confirm{padding-right:50px;text-align:right;}
        .agreementdiv{padding-right:45px;text-align:right;line-height:20px;
            .desc{text-align:left;display: inline-block;color:#999;line-height:24px;}
        }
    }
}
.m-shopresult{
    width:860px;background:#fff;border-radius:10px;margin:0 auto;
    .hd{
        text-align:center;display:flex;height:130px;padding-top:20px;;align-items:center;justify-content:center;border-bottom:1px dashed #ddd;font-size:18px;
        .icon-font{font-size:50px;margin-right:40px;}
    }
    .bd{
        padding:30px 80px 0;
        .result{text-align:center;color:#999;line-height:20px;}
        .bidtable{
            margin-top:30px;;
            th,td{border:1px solid #ddd;line-height:42px;text-align: center;}
            td{color:#666;}
        }
        .shopprogress{
            margin-top:40px;padding-bottom:45px;position: relative;font-size:14px;margin-left:50px;
            h5{line-height:20px;color:#666;font-weight:700;}
            p{line-height:20px;color:#999;}
            .desc1{position: absolute;left:0;bottom:0;}
            .desc2{position: absolute;left:266px;bottom:0;}
            .desc3{position: absolute;left:530px;bottom:0;}
        }
    }
    .ft{
        text-align:center;margin-top:40px;padding-bottom:50px;
        .btn{line-height:40px;height:40px;width:168px;border-radius:5px;margin:0 15px;}
        .btn-default{border:1px solid #b5b5b5;}
    }
}
</style>