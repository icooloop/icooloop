<template>
  <div class="automainer">
    <Header :pageInfo="pageInfo"></Header>
    <div class="g-mainer bgmain">
      <div class="m-user">
        <div class="wp clearfix pt-20 pb-20">
          <UserMenu :pageInfo="pageInfo" :userOn="pageInfo.userOn"></UserMenu>
          <div class="mu-right mu-loading" v-show="!ifInitDatas">
            <a-spin size="large"/>
          </div>
          <div class="mu-right" v-show="ifInitDatas">
            <div class="mu-account-total clearfix total4 ">
              <div class="item br1">
                <h4>可用余额(元)</h4>
                <h1>
                  ￥{{userAvailable|formatCurrency}}
                </h1>
              </div>
              <div class="item br1">
                <h4>累计充值金额(元)</h4>
                <h1>{{sumRecharge|formatCurrency}}</h1>
              </div>
              <div class="item">
                <h4>累计提现金额(元)</h4>
                <h1>{{sumCash|formatCurrency}}</h1>
              </div>
            </div>
            <div class="mu-model mu-deal mt-20">
              <div class="hd clearfix">
                <b>兑付详情</b>
                <span class="r" style="cursor: pointer" @click="onClickInfoHandle">说明</span>
              </div>
              <div class="bd pd-20">
                <table class="mu-table">
                  <tbody>
                  <tr>
                    <td colspan="5">兑付本金总额：￥{{sumPayment|formatCurrency}}</td>
                  </tr>
                  <tr v-for="(item,index) in paymentDetails" :key="'invest2'+index">
                    <td style="width:100px;">第{{index+1}}轮</td>
                    <td>兑付本金总额:￥{{item.paymentTotal|formatCurrency}}</td>
                    <td>已兑付本金:￥{{item.actualPaymentPrincipal|formatCurrency}}</td>
                    <td>待兑付本金:￥{{item.planPaymentPrincipal|formatCurrency}}</td>
                    <td v-show="item.paymentTime">兑付时间:{{item.paymentTime|dateformat}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :pageInfo="pageInfo"></Footer>
    <a-modal title="兑付说明" :visible="ifConfirmInvest" :maskClosable="false" :bodyStyle="{width:'560px',padding:'25px'}"
             :footer="null" @cancel="ifConfirmInvest=!ifConfirmInvest" width="560px">
      每一笔项目回款，让符合要求的出借人可以拿到相同比例的本金。<br/>

      符合要求的出借人筛选：<br/>

      a、有待收的出借人；<br/>

      b、出借本金没有收回的出借人，出借人权益账户筛选：总充值金额＞总提现金额+可用余额<br/>

      计算公式如下：<br/>
      出借人权益账户金额 = 总充值金额-（总提现金额+可用余额）<br/>

      单个出借人回款金额 = （出借人权益账户金额 / 名单内出借人数*出借人账户总额）* 回款总额
    </a-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Header from '@/components/include/Header'
  import Footer from '@/components/include/Footer'
  import UserMenu from '@/components/user/Menu'
  import Whattip from '@/components/common/Whattip'
  import {toJson, dateformat, formatCurrency} from '@/utils/utils'
  import Vue from 'vue'
  import {Pagination, Tabs, DatePicker} from 'ant-design-vue'

  Vue.use(Pagination)
  Vue.use(Tabs)
  Vue.use(DatePicker)

  export default {
    components: {
      Header,
      Footer,
      UserMenu,
      Whattip,
    },
    data() {
      return {
        placeholder: ['开始日期', '结束日期'],
        ifInitDatas: false,
        user: {},
        accountVo: {},
        queryTime: '30',
        subjectType: '',
        queryDate: [],
        investData: {
          dataList: [],
          pageSize: 10,
          pageNo: 1,
          total: 0,
          hasPage: false,
        },
        pageInfo: {
          loginInfo: this.$store.state.loginInfo,
          userOn: 'user_deal'
        },
        paymentDetails: [],
        sumCash: "",
        sumPayment: "",
        sumRecharge: "",
        userAvailable: "",
        tipsVisible: false,
        ifConfirmInvest: false
      }
    },
    filters: {
      dateformat, formatCurrency,
    },
    computed: {
      ...mapState(['loginInfo'])
    },
    mounted() {
      this.initData();
      this.ifInitDatas = true
    },
    methods: {
      formatCurrency,
      initData() {
        this.$post('/member/account/paymentDetails').then(response => {
          this.paymentDetails = response.data.paymentDetails
          this.sumCash = response.data.sumCash
          this.sumPayment = response.data.sumPayment
          this.sumRecharge = response.data.sumRecharge
          this.userAvailable = response.data.userAvailable
          this.ifInitDatas = true
        })
      },
      onChangeDate(date, dateString) {
        this.investData.startDate = dateString[0];
        this.investData.endDate = dateString[1];
      },
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      disabledDate(current) {
        return current && current > this.moment().endOf('day');
      },
      changeQueryTime() {
        if (this.queryTime != 'auto') {
          this.queryDate[0] = this.moment().subtract(this.queryTime, 'days');
          this.queryDate[1] = this.moment();
        }
      },
      onClickInfoHandle() {
        this.ifConfirmInvest = true
      }
    },
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/user.less";

  .mu-deal .hd {
    padding: 20px 30px;
    border-bottom: 1px solid #e2e2e2;
    line-height: 36px;
    font-size: 16px;
  }

  .mu-deal.rechargedeal .hd {
    border: 0;
    padding: 20px 30px 0;
  }

  .m-user .mu-table tbody tr {
    border-bottom: none;
  }
</style>
