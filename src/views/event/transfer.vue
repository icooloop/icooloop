<template>
  <div class="transfer-activity-layer">
    <div class="banner">

    </div>
    <div class="content">
      <p style="font-size: 16px;margin:0 0 20px">亿钱贷平台为满足出借人的的资金流动性需求，推出了债权转让服务。该服务允许出借人将符合转让条件的债权转给平台其他出借人，进而缓解资金流动性问题。</p>
      <img src="@/assets/images/activity/transfer/step1.jpg" class="step1"/>
      <div class="title">
        买债转项目 享赚钱秘笈
      </div>
      <template v-if="hasDiscount">
        <p class="tips">
          <img src="@/assets/images/activity/transfer/icon.png"/>
          赚钱秘笈、购买“打折转让”的债权
        </p>
        <p style="font-size: 14px">转让人减价卖，增加资金流动性；受让人便宜买，享受更好收益。如图，受让人购买此笔“折价1.0%”标签的债权，少花了182元哦<img style="width: 20px"
                                                                             src="@/assets/images/activity/transfer/icon2.png">
        </p>
        <img src="@/assets/images/activity/transfer/step2.png" class="step step2"/>
      </template>
      <p class="tips">
        <img src="@/assets/images/activity/transfer/icon.png"/>
        赚钱秘笈、购买“免垫付利息”的债权
      </p>
      <p style="font-size: 14px">一般情况下受让人购买转让人债权时，本期未结利息需要受让人暂时先垫付给转让人，购买此类带“免垫付利息”标签的债权，则无需垫付本期未结利息给转让人，又赚啦<img style="width:20px"
                                                                                         src="@/assets/images/activity/transfer/icon2.png">
      </p>
      <img src="@/assets/images/activity/transfer/step3.png" class="step step3"/>
      <template v-if="hasLastDebtAct">
        <p class="tips">
          <img src="@/assets/images/activity/transfer/icon.png"/>
          赚钱秘笈、购买“最后一笔”的债权
        </p>
        <p style="font-size: 14px">购买此类带“最后一笔”标签的债权，受让债权人最后一笔债权还有额外的返现奖励哦</p>
        <img src="@/assets/images/activity/transfer/step4.png" class="step step4"/>
        <table class="info-table">
          <thead>
          <tr>
            <th>债权金额(元)</th>
            <th>奖励金额(元)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>≤100</td>
            <td>1元</td>
          </tr>
          <tr>
            <td>100＜x≤1000</td>
            <td>5元</td>
          </tr>
          <tr>
            <td>1000＜x≤10000</td>
            <td>10元</td>
          </tr>
          <tr>
            <td>≥10000</td>
            <td>20元</td>
          </tr>
          </tbody>
        </table>
      </template>

      <p class="tips">
        <img src="@/assets/images/activity/transfer/icon.png"/>
        赚钱秘笈、购买债转项目，加息高达1%
      </p>
      <p style="font-size: 14px">现在购买债转专区的项目可以使用加息券啦，记得出借之前去活动页面领取，每天都有加息券领取哦</p>
      <a href="/spa/activity/sep"><img class="banner2" src="@/assets/images/activity/transfer/banner2.png"/></a>
      <div class="opt">
        <h2>
          <img src="@/assets/images/activity/transfer/icon3.png"/>
          常见问题
        </h2>
        <ul>
          <li>
            <h3>Q1：哪些债权可以进行债权转让？</h3>
            <ul>
              <li>1、债权处于非逾期状态；</li>
              <li>2、债权持有时间不小于30天；</li>
              <li>3、距离项目结清日不小于15天；</li>
              <li>4、乐保贷禁止债权转让；</li>
              <li>5、债权还款日当日不可发起债权转让申请，如需进行债权转让，可于还款后第二日进行尝试；</li>
              <li>6、出借时如使用了红包，债权持有时间需大于等于红包使用期限条件才能进行债权转让；</li>
              <li>7、如出借时参与了平台奖励活动，债权转让条件请参看相应活动细则。</li>
            </ul>
          </li>
          <li>
            <h3>Q2：债权转让需要收手续费吗？</h3>
            <ul>
              <li>1、手续费为转让价格的0.5%，转让成功后收取；</li>
              <li>2、如债权持有大于等于90天，则免手续费。</li>
            </ul>
          </li>
          <li>
            <h3>Q3：受让的债权还能再转让吗？</h3>
            <ul>
              <li>1、只要符合转让条件，受让的债权可以再次申请转让，无次数限定。</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        hasDiscount: false,
        hasLastDebtAct: false
      }
    },
    computed: {},
    mounted() {
      this.$get('/event/2019/transfer').then(response => {
        this.hasDiscount=response.data.hasDiscount
        this.hasLastDebtAct=response.data.hasLastDebtAct
      })
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/event/transfer.less";
</style>
