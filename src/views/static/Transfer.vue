<template>
    <div id="index">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="md-act">
            <div class="wp">
                <div class="intro">
                    <div class="text-c"><img src="@/assets/images/static/transfer/process1.png" width="531"></div>
                    <div class="desc mt-40">亿钱贷平台为满足出借人的的资金流动性需求，推出了债权转让服务。该服务允许出借人将符合转让条件的债权转给平台其他出借人，进而缓解资金流动性问题。</div>
                    <div class="text-c mt-50"><img src="@/assets/images/static/transfer/process2.png" width="558"></div>
                </div>
                <div class="question">
                    <div class="title">常见问题</div>
                    <h2>Q1：哪些债权可以进行债权转让？</h2>
                    <p>1、债权处于非逾期状态；</p>
                    <p>2、债权持有时间不小于30天；</p>
                    <p>3、距离项目结清日不小于15天；</p>
                    <p>4、由保险公司出具保单的乐保贷项目禁止转让，其他乐保贷产品可以转让；</p>
                    <p>5、债权还款日当日不可发起债权转让申请，如需进行债权转让，可于还款后第二日进行尝试；</p>
                    <p>6、出借时如使用了红包，债权持有时间需大于等于红包使用期限条件才能进行债权转让；</p>
                    <p>7、如出借时参与了平台奖励活动，债权转让条件请参看相应活动细则。</p>
                    <h2>Q2：债权转让需要收手续费吗？</h2>
                    <p>1、手续费为转让价格的0.5%，转让成功后收取；</p>
                    <p>2、如债权持有大于等于90天，则免手续费。</p>
                    <h2>Q3：受让的债权还能再转让吗？</h2>
                    <p>1、只要符合转让条件，受让的债权可以再次申请转让，无次数限定。</p>
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

export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
.md-act{background:#ddd url(../../assets/images/static/transfer/banner.jpg?v2) no-repeat top center;padding-top:390px;padding-bottom:60px;}
.md-act>.wp{background:#fff;border-radius:40px;width:1100px;}
.md-act .intro{padding:90px 50px 50px;}
.md-act .intro .desc{padding:20px 50px;font-size:18px;border:1px dashed #d2d2d2;border-radius:10px;line-height:30px;}
.md-act .question{border-top:5px solid #f7f7f7;padding:60px 50px 90px;}
.md-act .question .title{padding-left:35px;background:url(../../assets/images/static/transfer/question.svg) no-repeat left center;font-size:24px;line-height:30px;}
.md-act .question h2{font-size:18px;color:#555;line-height:36px;padding-top:30px;}
.md-act .question p{font-size:16px;color:#888;line-height:36px;}
.md-act .question p+h2{border-top:1px dashed #d2d2d2;margin-top:30px;}
</style>