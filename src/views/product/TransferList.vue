<template>
  <div>
    <Header :pageInfo="pageInfo"></Header>
    <div class="g-mainer pb-40 bgproduct">
      <router-link :style="'display:block;background:url('+bannerUrl+') no-repeat top center;height:260px;'"
                   to="/spa/event/transfer"></router-link>
      <ListTab tabOn="transfer"></ListTab>
      <section class="screen-list">
        <div class="bd wp">
          <ul>
            <li>
              <span class="title">剩余期限</span>
              <Condition val='' :active="condition.remainPeriodDay" name="remainPeriodDay" text='全部'
                         @click="changeCondition"/>
              <Condition val='1' :active="condition.remainPeriodDay" name="remainPeriodDay" text='3个月以内'
                         @click="changeCondition"/>
              <Condition val='2' :active="condition.remainPeriodDay" name="remainPeriodDay" text='3~6个月'
                         @click="changeCondition"/>
              <Condition val='3' :active="condition.remainPeriodDay" name="remainPeriodDay" text='7~12个月'
                         @click="changeCondition"/>
              <Condition val='4' :active="condition.remainPeriodDay" name="remainPeriodDay" text='12个月以上'
                         @click="changeCondition"/>
            </li>
            <li data-type="period">
              <span class="title">排序方式</span>
              <URank name="" :active="condition.orderColumn" :orderSc="condition.orderSc" text="默认" class="mr-10"
                     @click="changeRank"/>
              <URank name="2" :active="condition.orderColumn" :orderSc="condition.orderSc" text="协议约定年化利率" class="mr-25"
                     @click="changeRank"/>
              <URank name="3" :active="condition.orderColumn" :orderSc="condition.orderSc" text="剩余期限" class="mr-25"
                     @click="changeRank"/>
              <URank name="4" :active="condition.orderColumn" :orderSc="condition.orderSc" text="债权金额" class="mr-25"
                     @click="changeRank"/>
            </li>
            <li class="opt" v-show="moretypes">
              <span class="title">标的类型</span>
              <Condition val='' :active="condition.prdType" name="prdType" text='全部' @click="changeCondition"/>
              <ULabel type="sn" size="small"/>
              <Condition val='1' :active="condition.prdType" name="prdType" text='微农贷' @click="changeCondition"/>
              <ULabel type="qn" size="small"/>
              <Condition val='0' :active="condition.prdType" name="prdType" text='企链贷' @click="changeCondition"/>
              <ULabel type="cb" size="small"/>
              <Condition val='4' :active="condition.prdType" name="prdType" text='优车贷' @click="changeCondition"/>
              <ULabel type="lb" size="small"/>
              <Condition val='3' :active="condition.prdType" name="prdType" text='乐保贷' @click="changeCondition"/>
              <ULabel type="wh" size="small"/>
              <Condition val='2' :active="condition.prdType" name="prdType" text='微花贷' @click="changeCondition"/>
              <ULabel type="wq" size="small"/>
              <Condition val='5' :active="condition.prdType" name="prdType" text='微企贷' @click="changeCondition"/>
            </li>
            <li class="opt" v-show="moretypes">
              <span class="title">还款方式</span>
              <Condition val='' :active="condition.repayModeStr" name="repayModeStr" text='全部'
                         @click="changeCondition"/>
              <Condition val='2' :active="condition.repayModeStr" name="repayModeStr" text='一次还本付息'
                         @click="changeCondition"/>
              <Condition val='3' :active="condition.repayModeStr" name="repayModeStr" text='按月付息,到期还本'
                         @click="changeCondition"/>
              <Condition val='0' :active="condition.repayModeStr" name="repayModeStr" text='等额本息'
                         @click="changeCondition"/>
              <Condition val='1' :active="condition.repayModeStr" name="repayModeStr" text='等额本金'
                         @click="changeCondition"/>
            </li>
            <template v-if="actList.length">
              <li class="opt" v-show="moretypes">
                <span class="title">优惠类型</span>
                <Condition v-for="item in actList" :val='item.value' :active="condition.act" name="act"
                           :text='item.name' @click="changeCondition"/>
              </li>
            </template>
          </ul>
          <div class="moretype" @click="moretypes=!moretypes;" v-if="moretypes">收起<i
            class="icon-font icon-doubleup ml-5"></i></div>
          <div class="moretype" @click="moretypes=!moretypes;" v-else>更多筛选条件(标的类型、还款方式)<i
            class="icon-font icon-doubledown ml-5"></i></div>
        </div>
      </section>
      <div class="wp search-layer">
        <div class="forminput fr">
          <input class="input-text" v-model="debtCode" placeholder="请输入用户名或债权编号">
          <button type="button" class="ant-btn ant-btn-primary search-btn" @click="searchIdHandle"><span>搜索</span>
          </button>
        </div>
      </div>
      <section class="m-bid wp mt-40" v-show="pageInfo.loginInfo.isLogin">
        <router-link :to="'/spa/transfer/detail/'+loan.transferApplyId" target="_blank" class="item"
                     v-for="(loan,index) in dataList" :key="'loan'+index">
          <div class="hd">
            <ULabel :type="prdTypes[loan.prdType]" size="small"/>
            {{loan.loanTitle}}
            <ULabel class="ml-5" type="red" size="small"
                    :content="'折价'+parseFloat(loan.discountScale*100).toFixed(2)+'%'" v-if="loan.discountScale>0"/>
            <ULabel class="ml-5" type="orange" size="small" content="免垫付利息" v-if="loan.isFree==1"
                    notes="受让方无需垫付本期未结利息"/>
            <ULabel class="ml-5" type="red" size="small" content="最后一笔" v-if="loan.isLast=='1'" notes="受让债权人最后一笔债权有返现奖励"/>
            <span style="color:#999;margin:0 0 0 20px;font-size: 12px">债权编号:{{loan.debtCode}}</span>
          </div>
          <table class="datatable">
            <tr>
              <td width="250">
                <div class="rate text-warning">{{loan.loanRate}}<em>%<span
                  v-if="loan.awardRate&&(loan.awardRate>0)">+{{loan.awardRate}}%</span></em>
                  <ULabel class="ml-5" type="red" size="small" content="奖励" :movegap="3"
                          v-if="loan.awardRate&&(loan.awardRate>0)&&[2,5].includes(loan.loanStatus)"/>
                </div>
                <p>原协议约定年化利率
                  <Whattip :notes="whatnotes"/>
                </p>
              </td>
              <td width="210">
                <div class="limit">{{loan.remainDays}}<em>天</em></div>
                <p>剩余期限</p>
              </td>
              <td width="250">
                <div class="limit"><em>{{loan.repayMode}}</em></div>
                <p>还款方式</p>
              </td>
              <td width="230">
                <div class="limit">{{loan.transferPrice|formatCurrency}}
                  <Whattip v-if="loan.fairPrice && loan.fairPrice>loan.transferPrice" width="auto" :nowrap="true"
                           :notes="'原价'+loan.fairPrice+'元，节省'+parseFloat(loan.fairPrice-loan.transferPrice).toFixed(2)+'元'"/>
                </div>
                <p>转让金额(元)<span class="del"
                                v-if="loan.fairPrice && loan.fairPrice>loan.transferPrice">{{loan.fairPrice|formatCurrency}}</span>
                </p>
              </td>
              <td class="text-c" v-if="loan.applyStatus!=2">
                <div class="btn btn-disabled">已转让</div>
              </td>
              <td class="text-c" v-else-if="!pageInfo.loginInfo.isLogin">
                <a class="btn btn-warning" href="javascript:;" @click="ifShowLogin=true">我要出借</a>
              </td>
              <td class="text-c" v-else>
                <span class="btn btn-warning">我要出借</span>
                <p style="color:#888;">转让方:{{loan.fuzzyUserLoginName}}</p>
              </td>
            </tr>
          </table>
        </router-link>
        <div class="page mt-40" v-if="bidData.hasPage">
          <a-pagination :pageNo="condition.pageNo" :pageSize="condition.pageSize" :total="bidData.total"
                        @change="initData"/>
        </div>
      </section>
      <section class="nologin mt-50 mb-30" v-show="!pageInfo.loginInfo.isLogin">
        <img src="@/assets/images/product/login_before.png">
        <p>详细信息请<a href="javascript:;" @click="ifShowLogin=true" class="text-primary">登录</a>后查看</p>
      </section>
    </div>
    <Footer :pageInfo="pageInfo"></Footer>
    <a-modal :title="false" :visible="ifShowLogin" :maskClosable="false" :bodyStyle="loginStyle"
             :footer="null" @cancel="ifShowLogin=false" :centered="true" width="490" :closable="false">
      <Login @loginSuccess="loginSuccess"></Login>
      <button type="button" class="closemodal" @click="ifShowLogin=false"><i class="icon-font icon-close"></i></button>
    </a-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Header from '@/components/include/Header'
  import Footer from '@/components/include/Footer'
  import ListTab from '@/components/product/ListTab'
  import bannerUrl from '@/assets/images/product/banner_transfer.jpg'
  import Whattip from '@/components/common/Whattip'
  import ULabel from '@/components/common/ULabel'
  import URank from '@/components/common/URank'
  import Condition from '@/components/product/Condition'
  import Login from '@/components/layer/Login'
  import Vue from 'vue'
  import {Pagination} from 'ant-design-vue'

  Vue.use(Pagination)
  import {toJson, formatCurrency, dateformat} from '@/utils/utils'


  export default {
    components: {
      Header,
      Footer,
      ListTab,
      Whattip,
      ULabel,
      URank,
      Condition,
      Login,
    },
    data() {
      return {
        prdTypes: ['qn', 'sn', 'wh', 'lb', 'cb', 'wq'],
        ifShowLogin: false,
        moretypes: false,
        loginStyle: {padding: '20px 0 10px'},
        bannerUrl: bannerUrl,
        rateName: '协议约定年化利率',
        whatnotes: '此利率不构成亿钱贷对出借人的<br>任何承诺，最终收益以实际为准',
        bidData: {
          total: 0,
          hasPage: false,
        },
        dataList: [],
        actList: [],
        condition: {
          pageNo: 1,
          pageSize: 10,
          remainPeriodDay: '',
          prdType: '',
          repayModeStr: '',
          orderColumn: '',
          orderSc: '',
          act: ''
        },
        pageInfo: {
          loginInfo: this.$store.state.loginInfo,
          naverOn: 'nav_bid',
        },
        debtCode: ""
      }
    },
    computed: {
      ...mapState(['loginInfo'])
    },
    filters: {
      formatCurrency, dateformat
    },
    mounted() {
      this.initData(1);
    },
    methods: {
      initData(pageNo) {
        let params = {}
        this.condition.pageNo = pageNo
        for (let [key, value] of Object.entries(this.condition)) {
          if (value) params[key] = value
        }
        this.$post('/transfer/list', params).then(res => {
          let result = toJson(res);
          this.bidData.total = result.data.page.totalCount
          this.bidData.hasPage = this.bidData.total > this.condition.pageSize
          this.dataList = result.data.list.result;
          this.actList = result.data.act
        })
      },
      changeCondition(obj) {
        this.condition[obj.name] = obj.val;
        this.initData(1);
      },
      searchIdHandle() {
        this.condition['debtCode'] = this.debtCode;
        this.initData(1);
      },
      changeRank(name) {
        if (name == '') {
          this.condition.orderSc = ''
        } else {
          this.condition.orderSc = (name == this.condition.orderColumn && this.condition.orderSc == 'DESC') ? 'ASC' : 'DESC'
        }
        this.condition.orderColumn = name
        this.initData(1);
      },
      loginSuccess() {//登录成功
        this.$post('/member/session').then(res => {
          let result = toJson(res).jsonData
          this.pageInfo.loginInfo = {...this.pageInfo.loginInfo, ...{isLogin: true}, ...result}
          this.$store.commit('changeLoginInfo', this.pageInfo.loginInfo);
          this.ifShowLogin = false
          //this.initData()
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/product.less";

  .m-bid .item .datatable tr td .btn-over {
    transform: scale(0.7) rotate(15deg) translateY(-5px)
  }

  .m-bid .del {
    text-decoration: line-through;
    margin-left: 5px;
    display: inline-block;
    font-size: 14px;
  }

  .nologin {
    text-align: center;
    font-size: 18px;
  }

  .search-layer {
    padding: 20px 0;
    height: 30px;

    .search-btn {
      font-size: 14px;
      margin: 0 0 0 5px;
    }

    .input-text {
      height: 32px;
      line-height: 32px;
      padding-left: 10px;
    }

    .forminput {
      float: right;
    }
  }
</style>
