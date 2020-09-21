<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content ma-notice notice_explain">
                <section class="ma-notice-explain pdabout" >
                    <div class="atitle">资费说明</div>
                    <div class="mn">	
                        <table class="table datatable">
                            <tbody><tr>
                                <th width="120">类别</th>
                                <th>出借人资费标准</th>
                            </tr>
                            <tr>
                                <td>充值费用</td>
                                <td>0元</td>
                            </tr>
                            <tr>
                                <td>提现手续费</td>
                                <td>1、普通提现，有3次/日免费提现次数，超过免费次数后收取5元/笔手续费。<br>
                                    2、快速提现，手续费为提现金额的0.05%，超过3次/日提现次数后加收5元/笔手续费。<br>
                                    3、超出提现减免额度，出借人的提现手续费按照3次/日后手续费标准收费。<br>
                                    提现手续费减免额度=账户当前出借已收本息+平台奖励-已成功提现金额
                                </td>
                            </tr>
                            <tr>
                                <td>债权转让管理费</td>
                                <td>债权转让管理费为债权金额的0.5%，转让成功后收取；如债权持有大于等于90天，则免管理费。</td>
                            </tr>
                            <tr>
                                <td>提前还款补偿金</td>
                                <td>以剩余利息为计算基数，计收比例为0-5%，计算标准为：剩余利息 x 计收比例。<br>（部分产品无提前还款补偿金，具体以合同为准。）</td>
                            </tr>
                            <tr>
                                <td>逾期补偿金</td>
                                <td>以剩余未还本金为基数，每逾期1天，出借人获得0.02%作为补偿，即：剩余未还本金 x 0.02% x 逾期天数。
                                </td>
                            </tr>
                            <tr>
                                <td>借款取消补偿金</td>
                                <td>借款放款起息前，借款人取消借款的，出借人可获得借款取消补偿金，按出借金额的0.05％/天计算。
                                </td>
                            </tr>
                        </tbody></table>
                        <table class="table datatable mt-50">
                            <tbody><tr>
                                <th width="120">类别</th>
                                <th colspan="3">借款人资费标准</th>
                            </tr>
                            <tr>
                                <td rowspan="6">借款服务费率</td>
                                <td>产品</td>
                                <td>出借费率（年化）</td>
                                <td>居间服务费（年化）</td>
                            </tr>
                            <tr>
                                <td>微农贷</td>
                                <td>≤10.5%</td>
                                <td>0.5%≤居间服务费≤8%</td>
                            </tr>
                            <tr>
                                <td>企链贷</td>
                                <td>≤10.5%</td>
                                <td>0.5%≤居间服务费≤8%</td>
                            </tr>
                            <tr>
                                <td>优车贷</td>
                                <td>≤10.5%</td>
                                <td>2%≤居间服务费≤10%</td>
                            </tr>
                            <tr>
                                <td>乐保贷</td>
                                <td>≤10%</td>
                                <td>0.5%≤居间服务费≤5%</td>
                            </tr>
                            <tr>
                                <td>微花贷</td>
                                <td>≤10.5%</td>
                                <td>2%≤居间服务费≤12%</td>
                            </tr>
                            <tr>
                                <th>提前还款违约金</th>
                                <td colspan="3">申请提前归还贷款本金的，则需在还款当日向亿钱贷平台支付提前还款违约金，收费标准为剩余利息之和的5%-20%作为提前还款手续费用</td>
                            </tr>
                            <tr>
                                <th>逾期还款违约金</th>
                                <td colspan="3">借款人按逾期本金的万分之四每日计收逾期违约金</td>
                            </tr>
                        </tbody></table>
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
                {name:'审核信息',link:'/spa/about/notice/examine'},
                {name:'重大事项',link:'/spa/about/notice/matter'},
                {name:'平台公告',link:'/spa/about/notice/notice'},
                {name:'行业资讯',link:'/spa/about/notice/news'},
                {name:'资费说明',link:'/spa/about/notice/explain',onClass:true}
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/notice',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {

    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-notice-explain .datatable td,.ma-notice-explain .datatable th{padding:25px 30px;line-height:26px;font-size:16px;border:1px solid #ccc;}
.ma-notice-explain .datatable tr td:nth-child(1),
.ma-notice-explain .datatable tr th{color:#999;}
.ma-notice-explain .datatable tr:nth-child(2n){background:#f7f9ff;}
</style>