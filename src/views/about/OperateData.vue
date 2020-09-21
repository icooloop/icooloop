<template>
  <div>
     <Header :pageInfo="pageInfo"></Header>
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="operate_data ma-operate-data">
                <section class="data1 pdabout">
                    <div class="atitle">平台整体数据
                        <h6>数据更新截止时间：{{stsMonth}}</h6>
                    </div>
                    <ul class="datalist1 clearfix">
                        <li class="br1 pdmin"><h4>累计交易总额（元）</h4>
                            <h6>{{totalTransaction|formatCurrency}}</h6></li>
                        <li class="br1"><h4>累计为出借人赚取利息（元）</h4>
                            <h6>{{earnInterest|formatCurrency}}</h6></li>
                        <li><h4>累计交易笔数（笔）</h4>
                            <h6>{{numberTransactions}}</h6></li>
                        <li class="br1 pdmin"><h4>累计注册人数量（人）</h4>
                            <h6>{{numberRegist}}</h6></li>
                        <li class="br1"><h4>累计出借人数量（人）</h4>
                            <h6>{{numberLenders}}</h6></li>
                        <li><h4>当前出借人数量（人）</h4>
                            <h6>{{currentLenders}}</h6></li>
                        <li class="w4 pdmin"><h4>最大单户出借余额（元）</h4>
                            <h6>{{maxper|formatCurrency}}</h6></li>
                        <li class="w4 pdmin br1"><h4>占借贷余额比率</h4>
                            <h6>{{maxAvalRate}}%</h6></li>
                        <li class="w4 pdmin"><h4>最大十户出借余额（元）</h4>
                            <h6>{{tenMaxper|formatCurrency}}</h6></li>
                        <li class="w4 pdmin"><h4>占借贷余额比率</h4>
                            <h6>{{maxTenRate}}%</h6></li>
                    </ul>
                </section>
                <section class="wp pdabout">
                    <div class="atitle">平台借款数据</div>
                    <div class="data2">
                        <ul class="datalist2 clearfix">
                            <li><h4>累计借贷金额（元）</h4>
                                <h6>{{loanAmt|formatCurrency}}</h6></li>
                            <li><h4>累计借款人数量（人）</h4>
                                <h6>{{loanPepole}}</h6></li>
                            <li><h4>累计借贷笔数（笔）</h4>
                                <h6>{{loanNum}}</h6></li>
                            <li><h4>人均累计借款金额（元）</h4>
                                <h6>{{aveLoanAmt|formatCurrency}}</h6></li>
                            <li><h4>借贷余额（元）</h4>
                                <h6>{{stillLoanBalance|formatCurrency}}</h6></li>
                            <li><h4>当前借款人数量（人）</h4>
                                <h6>{{stillLoanPepole}}</h6></li>
                            <li><h4>借贷余额笔数（笔）</h4>
                                <h6>{{stillLoan}}</h6></li>
                            <li><h4>利息余额（元）</h4>
                                <h6>{{interAmt|formatCurrency}}</h6></li>
                            <li><h4>关联关系借款余额（元）</h4>
                                <h6>{{relatedBalance|formatCurrency}}</h6></li>
                            <li><h4>关联关系借款余额笔数（笔）</h4>
                                <h6>{{relatedBalanceNum}}</h6></li>
                        </ul>
                        <ul class="datalist3 clearfix">
                            <li><h4>最大单一借款人待还金额（元）</h4>
                                <h6>{{stillMaxper|formatCurrency}}</h6></li>
                            <li><h4>占借贷余额比率</h4>
                                <h6>{{bigLoanRate}}%</h6></li>
                            <li><h4>前十大借款人待还金额（元）</h4>
                                <h6>{{tenStillMaxper|formatCurrency}}</h6></li>
                            <li><h4>占借贷余额比率</h4>
                                <h6>{{tenRate}}%</h6></li>
                        </ul>
                    </div>
                </section>
                <section class="data3 pdabout">
                    <div class="atitle">平台逾期数据</div>
                    <div class="wp">
                        <div class="datalist4 mt-70">
                            <div class="leftdata">
                                <h6>{{overdueAmt|formatCurrency}}</h6>
                                <h4>历史项目逾期金额（元）</h4>
                            </div>
                            <ul class="clearfix">
                                <li><h4>逾期项目数（笔）</h4>
                                    <h6>{{overdueCount}}</h6></li>
                                <li><h4>历史项目逾期率</h4>
                                    <h6>{{historyOverdueRate}}%</h6></li>
                                <li><h4>累计代偿金额（元）</h4>
                                    <h6>{{compensationAmt|formatCurrency}}</h6></li>
                                <li><h4>累计代偿笔数（笔）</h4>
                                    <h6>{{compensationCount}}</h6></li>
                            </ul>
                        </div>
                        <ul class="datalist3 datalist5 clearfix mt-50">
                            <li><h4>逾期金额（元）</h4>
                                <h6 class="mt-30">{{overdueAmt|formatCurrency}}</h6></li>
                            <li class="br1"><h4>逾期笔数（笔）</h4>
                                <h6 class="mt-30">{{overdueCount}}</h6></li>
                            <li><h4>逾期90天（不含）</h4>
                                <h4>以上金额（元）</h4>
                                <h6>{{morethan90daysAmt|formatCurrency}}</h6></li>
                            <li><h4>逾期90天（不含）</h4>
                                <h4>以上笔数（笔）</h4>
                                <h6>{{morethan90daysCount}}</h6></li>
                        </ul>
                        <div class="datalist6 clearfix mt-50">
                            <ul>
                                <li>项目逾期率<em>{{overdueRate}}%</em></li>
                                <li>项目分级逾期率（90天以上）<em>{{overdueMorethan90daysRate}}%</em></li>
                                <!-- <li>项目分级逾期率（91-180天）<em>0%</em></li>
                                <li>项目分级逾期率（181天以上）<em>0%</em></li> -->
                            </ul>
                            <ul>
                                <li>金额逾期率<em>{{amountOverdueRate}}%</em></li>
                                <li>金额分级逾期率（90天以上）<em>{{amountMorethan90daysRate}}%</em></li>
                                <!-- <li>金额分级逾期率（91-180天）<em>0%</em></li>
                                <li>金额分级逾期率（181天以上）<em>0%</em></li> -->
                            </ul>
                        </div>
                    </div>
                </section>
              <section class="wp pdabout" v-if="isSuccess">
                <div class="atitle">月度运营数据</div>
                <div class="data2">
                  <ul class="datalist2 clearfix">
                    <li><h4>本月还款金额（元）</h4>
                      <h6>{{repayAmt|formatCurrency}}</h6></li>
                    <li><h4>本月还款数（笔）</h4>
                      <h6>{{repayCount}}</h6></li>
                    <li><h4>本月逾期金额（元）</h4>
                      <h6>{{overdueRepayAmt|formatCurrency}}</h6></li>
                    <li><h4>本月逾期数（笔）</h4>
                      <h6>{{overdueRepayCount}}</h6></li>
                    <li><h4>本月提前还款金额（元）</h4>
                      <h6>{{earlyRepayAmt|formatCurrency}}</h6></li>
                    <li><h4>本月提前还款数（笔）</h4>
                      <h6>{{earlyRepayCount}}</h6></li>
                    <li><h4>本月债权转让金额（元）</h4>
                      <h6>{{transferAmt|formatCurrency}}</h6></li>
                    <li><h4>本月债权转让数（笔）</h4>
                      <h6>{{transferCount}}</h6></li>
                  </ul>
                  <ul class="datalist3 clearfix">
                    <li><h4>90天以内债权转让金额（元）</h4>
                      <h6>{{periodWithin90daysAmt|formatCurrency}}</h6></li>
                    <li><h4>90天以内债权转让数 (笔)</h4>
                      <h6>{{periodWithin90daysCount}}</h6></li>
                    <li><h4>91-180天债权转让金额（元）</h4>
                      <h6>{{periodBetween91and180dayAmt|formatCurrency}}</h6></li>
                    <li><h4>91-180天债权转让数 (笔)</h4>
                      <h6>{{periodBetween91and180daysCount}}</h6></li>
                    <li><h4>181-360天债权转让金额 (元)</h4>
                      <h6>{{periodBetween181and360daysAmt|formatCurrency}}</h6></li>
                    <li><h4>181-360天债权转让数 (笔)</h4>
                      <h6>{{periodBetween181and360daysCount}}</h6></li>
                    <li><h4>大于等于360天债权转让金额 (元)</h4>
                      <h6>{{periodMorethan360daysAmt|formatCurrency}}</h6></li>
                    <li><h4>大于等于360天债权转让数 (笔)</h4>
                      <h6>{{periodMorethan360daysCount}}</h6></li>
                  </ul>
                </div>
              </section>
            </div>
        </div>
    </div>
    <Signname></Signname>
    <Footer :pageInfo="pageInfo"></Footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import AboutMenu from '@/components/about/AboutMenu'
import Signname from '@/components/about/Signname'
import AboutSide from '@/components/about/AboutSide'
import {formatCurrency,dateformat} from '@/utils/utils'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        AboutSide,
        Signname
    },
    data() {
        return {
            sideMenus:[
                {name:'平台数据',link:'/spa/about/operate/data',onClass:true},
                {name:'运营报告',link:'/spa/about/operate/report'},
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/operate',
                naverOn:'nav_about',
            },
            isSuccess:false,
            stsMonth: "",
            overdueRepayAmt: "",
            overdueRepayCount: "",
            repayAmt: "",
            repayCount: "",
            earlyRepayAmt: "",
            earlyRepayCount: "",
            transferAmt: "",
            transferCount: "",
            periodWithin90daysCount: "",
            periodWithin90daysAmt: "",
            periodBetween91and180daysCount: "",
            periodBetween91and180dayAmt: "",
            periodBetween181and360daysCount: "",
            periodBetween181and360daysAmt: "",
            periodMorethan360daysCount: "",
            periodMorethan360daysAmt: "",
            overdueAmt: "2,00,000.00",
            overdueCount: "1",
            compensationAmt: "1,698,399.4",
            compensationCount: "203",
            historyOverdueRate: "0.01",
            overdueRate: "0",
            amountOverdueRate: "0",
            overdueMorethan90daysRate: "0",
            amountMorethan90daysRate: "0",
            morethan90daysAmt: "0.00",
            morethan90daysCount: "0",
            totalTransaction: "1,775,234,366.75",
            earnInterest: "51,922,801.72",
            numberTransactions: "718366",
            numberRegist: "703480",
            numberLenders: "12675",
            currentLenders: "3492",
            maxAvalRate: "2.45",
            maxTenRate: "9.19",
            loanAmt: "1,775,120,298.75",
            loanPepole: "202518",
            loanNum: "288095",
            aveLoanAmt: "8765.24",
            stillLoanBalance: "170,887,853.30",
            stillLoanPepole: "3345",
            stillLoan: "3343",
            interAmt: "7,877,730.99",
            relatedBalance: "0",
            relatedBalanceNum: "0",
            bigLoanRate: "0.58",
            tenRate: "5.85",
            createTime: "",
            maxper: "4,186,752.40",
            tenMaxper: "15,704,593.71",
            tenStillMaxper: "10,000,000.00",
            stillMaxper: "1,000,000.00"
        }
    },
    computed: {
       ...mapState(['loginInfo'])
    },
    created(){
        this.$post('/static/operate/data').then((res)=>{
            if(res.success){
                this.isSuccess=true
                for (let name in res.data.opeMonthData) {
                    let item = res.data.opeMonthData[name]
                    if (item) {
                        if (name.substring(name.length - 4, name.length) === "Rate") {
                            this[name] = (item * 100).toFixed(2);
                        } else {
                            this[name] = item
                        }
                    } else {
                        this[name] = "0"
                    }
                }
                this.stsMonth = dateformat(res.data.opeMonthData.stsMonth)
            }else{
                this.isSuccess=false
            }
        })
    },
    filters:{
        formatCurrency
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-operate-data .data1{background:url(./../../assets/images/about/operate/bg.png) no-repeat top center;}
.ma-operate-data .data2{border-radius:10px;background:#fff;box-shadow:0 0 4px rgba(100,113,214,.5);overflow:hidden;}
.ma-operate-data .data3{background:#fbfdff;background: -webkit-linear-gradient(#fbfdff,#fff);background: linear-gradient(#fbfdff,#fff);}
.ma-operate-data .datalist1{width:1080px;margin-left:auto;margin-right:auto;background:#fff;padding:30px 60px 60px;border-radius:10px;}
.ma-operate-data .datalist1 li{position:relative;position:relative;float:left;width:33.33%;padding:25px 0;border-bottom:1px solid #90a0cf;}
.ma-operate-data .datalist1 li.w4{width:25%;}
.ma-operate-data .datalist1 li.br1:before{display:block;content:'';width:1px;height:44px;background:#90a0cf;position:absolute;right:0;top:43px;}
.ma-operate-data .datalist1 li h4{font-size:18px;color:#1d2088;line-height:40px;padding-left:65px;white-space:nowrap;}
.ma-operate-data .datalist1 li h6{font-size:30px;color:#333;line-height:40px;padding-left:65px;white-space:nowrap;}
.ma-operate-data .datalist1 li.pdmin h4,.ma-operate-data .datalist1 li.pdmin h6{padding-left:40px;}
.ma-operate-data .datalist2{background:#6f67d6;background: -webkit-linear-gradient(120deg, #4d98d6,#6f67d6,#6471d6);background: linear-gradient(120deg,#4d98d6,#6f67d6,#6471d6); padding:16px 70px;}
.ma-operate-data .datalist2 li{float:left;width:25%;padding:20px 0;}
.ma-operate-data .datalist2 li h4{font-size:18px;color:#c0ccec;line-height:35px;padding-left:65px;white-space:nowrap;}
.ma-operate-data .datalist2 li h6{font-size:30px;color:#fff;line-height:35px;padding-left:65px;white-space:nowrap;}
.ma-operate-data .datalist3{margin:40px 0 30px;}
.ma-operate-data .datalist3 li{position:relative;float:left;width:25%;margin:0 0 20px;}
.ma-operate-data .datalist3 li.br1:before{display:block;content:'';width:2px;height:60px;background:#90a0cf;position:absolute;right:0;top:0;}
.ma-operate-data .datalist3 li h4{font-size:18px;color:#1d2088;line-height:20px;padding-left:65px;white-space:nowrap;padding-bottom:10px;}
.ma-operate-data .datalist3 li h6{font-size:30px;color:#333;line-height:30px;padding-left:65px;white-space:nowrap;}
.ma-operate-data .datalist5{padding:0 80px;}
.ma-operate-data .datalist5 li.br1:before{height:70px;top:10px;}
.ma-operate-data .datalist5 li h6{text-align:left;padding-right:65px;}
.ma-operate-data .datalist4{position:relative;background:url(./../../assets/images/about/operate/bg_data4.png) no-repeat;height:311px;padding-left:390px;}
.ma-operate-data .datalist4 .leftdata{position:absolute;left:0;top:0;width:390px;text-align:center;}
.ma-operate-data .datalist4 .leftdata h6{color:#333;font-size:66px;padding-top:75px;line-height:1;}
.ma-operate-data .datalist4 .leftdata h4{font-size:20px;line-height:1;padding-top:25px;color:#333;}
.ma-operate-data .datalist4 ul{padding-top:35px;}
.ma-operate-data .datalist4 li{float:left;width:45%;padding:20px 0;}
.ma-operate-data .datalist4 li h4{font-size:18px;color:#333399;line-height:40px;padding-left:120px;white-space:nowrap;}
.ma-operate-data .datalist4 li h6{font-size:30px;color:#333;line-height:40px;padding-left:120px;white-space:nowrap;}
.ma-operate-data .datalist6{position:relative;background:url(./../../assets/images/about/operate/bg_data6.png) no-repeat top center;height:262px;}
.ma-operate-data .datalist6 ul{float:left;padding-top:45px;padding-left:130px;padding-right:40px;width:550px;}
.ma-operate-data .datalist6 li{position:relative;line-height:34px;font-size:18px;}
.ma-operate-data .datalist6 li em{display:block;position:absolute;right:0;top:0;line-height:34px;font-size:24px;}

</style>
