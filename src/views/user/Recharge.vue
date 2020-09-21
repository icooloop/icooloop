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
          <div class="mu-right" v-if="ifInitDatas">
            <section class="mu-recharge">
              <div class="mu-title">
                <a-tabs class="ant-tabs-yqd" defaultActiveKey="1" size="large">
                  <a-tab-pane tab="账户充值" key="1">
                    <form action="" class="m-form mu-recharge-form">
                      <div class="pd1">
                        <div class="formline mt-20">
                          <div class="formlabel">充值金额</div>
                          <div class="forminput">
                            <input type="text" :class="['input-text',errorInput?'Validform_error':'']"
                                   placeholder="≥100" v-model="amount" @keyup="amount=(amount+'').replace(/[^\d]/g,'')"
                                   @blur="amountCheck" maxlength="8">
                            <span class="unit">元</span>
                          </div>
                          <div class="formafter pt-5">
                            <div class="cztip1">当前的账户余额： <em>{{pageInfo.loginInfo.availableAmt|formatCurrency}}</em>元
                            </div>
                            <div class="cztip1">充值后账户余额： <em class="text-warning"
                                                             v-if="amount">{{afterAmount|formatCurrency}}元</em></div>
                          </div>
                        </div>
                        <div class="formline mt-20">
                          <div class="formlabel">充值方式</div>
                          <ul class="rechargetype">
                            <li :class="rechargetype=='q-pay'?'on':''" v-if="user.userType=='1' && userBank"
                                @click="changeRechargeType('q-pay')">
                              <div class="pic"><img src="@/assets/images/user/qpay.png"></div>
                              <h6>资金同卡进出，安全快捷</h6>
                              <div class="sd"><img
                                :src="getBankUrl(userBank.bankCode)"> 尾号{{userBank.accountStar.substring(14)}}
                              </div>
                            </li>
                            <li :class="rechargetype=='net-pay'?'on':''" @click="changeRechargeType('net-pay')">
                              <div class="pic"><img src="@/assets/images/user/netpay.png"></div>
                              <h4>网上银行</h4>
                              <h6>登录网上银行完成支付</h6>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="rechargebd">
                        <section class="pd1">
                          <div class="pdleft formdesc mt-10"
                               v-show="rechargetype=='q-pay'">充值限额：{{userBank.bankLimit}}
                          </div>
                          <div class="formline mt-30" v-show="rechargetype=='net-pay'">
                            <div class="formlabel">开户银行</div>
                            <div class="bankdescs">
                              <ul class="banklist clearfix">
                                <li v-for="(item,index) in payQuotas" :key="item.bankCode" @click="changeBank(item)"
                                    :class="item.bankCode==selectBank.bankCode?'on':''" v-show="allbanks||index<7"><img
                                  :src="getBankUrl(item.bankCode)"></li>
                                <li class="more text-primary" v-if="!allbanks" @click="allbanks=true">选择其他银行<i
                                  class="icon-font">&#xe601;</i></li>
                                <li class="more text-primary" v-else @click="allbanks=false">选择其他银行<i
                                  class="icon-font">&#xe67c;</i></li>
                              </ul>
                              <div class="bankinfoTable mt-20">
                                <table class="table">
                                  <tr>
                                    <th width="100">银行名称</th>
                                    <th width="120">单笔限额（元）</th>
                                    <th width="120">单日限额（元）</th>
                                    <th>所需网银类型</th>
                                  </tr>
                                  <tr v-for="(limitinfo,index) in selectBank.limitlist" :key="'limitinfo'+index">
                                    <td :rowspan="selectBank.limitlist.length" v-if="index==0">{{selectBank.bankname}}
                                    </td>
                                    <td>{{limitinfo.singleLimit}}</td>
                                    <td>{{limitinfo.dayLimit}}</td>
                                    <td class="text-l">{{limitinfo.type}}</td>
                                  </tr>
                                </table>
                              </div>
                              <div class="l30 mt-10">如需了解更多，请致电{{selectBank.bankname}}服务热线：{{selectBank.hotline}}</div>
                            </div>
                          </div>
                          <div class="pdleft tipdiv mt-10" v-show="formtip"><span class="errortip"><i
                            class="icon-font icon-error"></i>{{formtip}}</span></div>
                          <div class="formline mt-15 pdleft">
                            <a class="btn btn-submit" target="_blank" :href="toUrl" @click="rechargeSubmit">立即充值</a>
                          </div>
                        </section>
                      </div>
                    </form>
                    <div class="wxtip">
                      <h2>温馨提示：</h2>
                      <p>
                        1、充值后未用于出借的金额若申请提现，系统将收取每笔5元的提现费；<br>
                        2、每日充值限额以银行充值限额为准；<br>
                        3、严禁利用充值功能进行信用卡套现、转账、洗钱等行为；一旦发现，将关闭该 用户的充值端口；<br>
                        4、若存在操作问题，可进入
                        <router-link class="text-primary"
                                     to="/spa/help/question?faqType=70d88c7b639346feac0aebe5c081c45f">帮助中心-充值提现
                        </router-link>
                        ，查看相关细则；<br>
                        5、充值如遇任何疑问，请拨打亿钱贷客服热线<span class="text-primary">400-090-9968</span>进行咨询。
                      </p>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane tab="转账充值" key="2">
                    <div class="transfer-bank-layer" style="padding:30px 50px;">
                      <div style="width:300px;height:100px;margin:0 0 0 100px;text-align: center">
                        <div style="float:left;margin-top: -5px">
                          <img style="width:120px;" :src="getBankUrl(userBank.bankCode)"/>
                          <p>我的银行卡</p>
                          <p style="color:#999">{{userBank.bankName}}({{userBank.accountStar.substring(14)}})</p>
                        </div>
                        <img style="float:left" src="@/assets/images/user/xw_icon.png"/>
                      </div>

                      <ul style="margin-bottom: 30px">
                        <li style="margin-bottom: 35px">
                          <p
                            style="font-size: 16px;color: #333;">请用您绑定的银行卡<strong>({{userBank.bankName}}尾号为{{userBank.accountStar.substring(14)}}银行卡)</strong>进行转账充值
                          </p>
                          <p>转账充值功能仅支持本人绑定银行卡进行充值操作,如使用其他银行卡充值无法到账,需反馈存管银行退汇处理,所造成时间损失将自行承担</p>
                        </li>
                        <li>
                          <p style="font-size: 16px;color: #333;">如何转账充值？</p>
                          <p>通过手机银行、网上银行、柜面或电话转账至亿钱贷资金存管账户</p>
                          <table>
                            <tr>
                              <td>收款账户名称</td>
                              <td>{{rechargeAccount}}</td>
                            </tr>
                            <tr>
                              <td>收款账户帐号</td>
                              <td>{{rechargeBankcard}}</td>
                            </tr>
                            <tr>
                              <td>收款账户开户行</td>
                              <td>{{rechargeBankname}}</td>
                            </tr>
                          </table>
                        </li>
                      </ul>
                      <div class="wxtip" style="padding:25px 0">
                        <h2>温馨提示：</h2>
                        <p>
                          1. 请您务必使用本人在平台绑定的银行卡进行转账操作。否则将导致资金挂账，挂账资金退款时间依赖银行流程，需7-10个工作日到账。<br>
                          2. 转账金额＜5万，当日实时到账（0-2小时）。转账金额≥5万时间为工作日8:30-17:00，实时到账（0-2小时）；否则下一工作日到账。<br>
                          3. 最低转账金额应大于 1 （含）元。<br>
                          4. 3个自然日之前的转账请联系客服专线400-090-9968处理。<br>
                        </p>
                      </div>
                    </div>
                  </a-tab-pane>
                </a-tabs>
                <div class="more xinwangtip">
                  <div class="tip">资金已由新网银行存管</div>
                  <router-link to="/spa/member/deal/recharge" class="btn btn-info ml-40">充值记录</router-link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Footer :pageInfo="pageInfo"></Footer>
    <a-modal :title="false" :visible="ifShowDeposit" :maskClosable="false" :bodyStyle="layerStyle"
             :footer="null" :centered="true" width="610" :closable="false">
      <router-link class="closemodal" to="/spa/member/account/index"><i class="icon-font icon-close"></i></router-link>
      <Deposit></Deposit>
    </a-modal>
    <a-modal :title="false" :visible="ifShowConformRecharge" :maskClosable="false" @ok="continueRecharge"
             @cancel="ifShowConformRecharge=false"
             :centered="true" :width="400" :closable="false" cancelText="取消" okText="继续充值">
      <div v-if="this.user.loanMaxLimit==-1">依照监管部门要求，亿钱贷平台对出借人总数进行控制，暂不开放新增出借人。您充值后可能无法及时出借获得收益，请确认是否继续充值？<a
        href="/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a></div>
      <div v-if="this.user.loanMaxLimit==-2">依照监管部门要求，亿钱贷平台对出借人总数进行控制，当前出借人总数已接近上限。您充值后请尽快出借。<a
        href="/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a></div>
    </a-modal>
    <a-modal :title="false" :visible="ifShowResultTip" :maskClosable="false" :bodyStyle="bodyStyle"
             :centered="true" :width="530" :closable="false" :footer="null">
      <button type="button" class="closemodal" @click="ifShowResultTip=false"><i class="icon-font icon-close"></i>
      </button>
      <div class="mu-layer-netpay">
        <div class="hd">
          <div>请在新打开的页面完成充值</div>
        </div>
        <div class="bd">
          <div class="item">
            <i class="icon-font icon-right mr-20"></i><span class="result mr-20">充值成功</span><span>您可以：</span>
            <router-link to="/spa/member/account/index" class="text-primary mr-20 ml-20">查看我的账户</router-link>
            <router-link to="/spa/product/index" class="text-primary">浏览出借项目</router-link>
          </div>
          <div class="item mt-20">
            <i class="icon-font icon-gth mr-20"></i><span class="result mr-20">充值失败</span><span>建议您：</span><a
            href="javascript:;" class="text-primary mr-20 ml-20" @click="ifShowResultTip=false">其他充值方式</a>
            <router-link to="/spa/help/question?faqType=70d88c7b639346feac0aebe5c081c45f" class="text-primary">查看帮助中心
            </router-link>
          </div>
        </div>
        <div class="ft">
          <p>如仍有疑问，请致电：<span class="text-primary">400-090-9968</span></p>
        </div>
      </div>
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
      Deposit,
    },
    data() {
      return {
        ifInitDatas: false,
        ifShowDeposit: false,
        ifShowConformRecharge: false,
        ifShowResultTip: false,
        layerStyle: {width: '560px', padding: 0},
        bodyStyle: {padding: 0, background: 'none'},
        user: {},
        userBank: {},
        payQuotas: [],
        bankTypes: [],
        allbanks: false,
        rechargetype: 'q-pay',
        amount: '',
        errorInput: false,
        formtip: '',
        BankinfoList: [
          {
            bankCode: "ICBC",
            bankname: "工商银行",
            hotline: "95588",
            limitlist: [{type: "e支付", singleLimit: "1万", dayLimit: "1万"}, {
              type: "网银支付",
              singleLimit: "500万",
              dayLimit: "无限额"
            }]
          },
          {
            bankCode: "ABC",
            bankname: "农业银行",
            hotline: "95599",
            limitlist: [{type: "K码支付", singleLimit: "1000", dayLimit: "1000"}, {
              type: "K宝",
              singleLimit: "100万",
              dayLimit: "100万"
            }]
          },
          {
            bankCode: "BOC",
            bankname: "中国银行",
            hotline: "95566",
            limitlist: [{type: "中银快付", singleLimit: "1000", dayLimit: "1000"}, {
              type: "动态口令+手机交易码",
              singleLimit: "5万",
              dayLimit: "50万"
            }]
          },
          {
            bankCode: "CCB",
            bankname: "建设银行",
            hotline: "95533",
            limitlist: [{type: "网银盾1代", singleLimit: "5万", dayLimit: "10万"}, {
              type: "网银盾2代",
              singleLimit: "50万",
              dayLimit: "50万"
            }]
          },
          {
            bankCode: "CMB",
            bankname: "招商银行",
            hotline: "95555",
            limitlist: [{type: "卡号密码支付", singleLimit: "5000", dayLimit: "1万"}, {
              type: "手机支付",
              singleLimit: "5000",
              dayLimit: "限额"
            }, {type: "专业版", singleLimit: "500万", dayLimit: "1000万以上"}]
          },
          {
            bankCode: "BOCO",
            bankname: "交通银行",
            hotline: "95559",
            limitlist: [{type: "手机短信密码验证", singleLimit: "500", dayLimit: "5万"}, {
              type: "USBKey证书认证",
              singleLimit: "500",
              dayLimit: "100万"
            }]
          },
          {
            bankCode: "PSBC",
            bankname: "邮政储蓄银行",
            hotline: "95580",
            limitlist: [{type: "手机短信客户", singleLimit: "1万", dayLimit: "1万"}, {
              type: "电子令牌+短信客户",
              singleLimit: "20万",
              dayLimit: "20万"
            }, {type: "Ukey+短信客户", singleLimit: "100万", dayLimit: "100万"}]
          },
          {
            bankCode: "CITIC",
            bankname: "中信银行",
            hotline: "95558",
            limitlist: [{type: "手机动态密码", singleLimit: "1000", dayLimit: "5000"}, {
              type: "U盾",
              singleLimit: "100万",
              dayLimit: "100万"
            }]
          },
          {
            bankCode: "CIB",
            bankname: "兴业银行",
            hotline: "95561",
            limitlist: [{type: "手机动态密码版", singleLimit: "日累积范围内无限额", dayLimit: "初始5000，可至网点加大"}, {
              type: "网银支付",
              singleLimit: "40万 ",
              dayLimit: "100万 "
            }]
          },
          {
            bankCode: "CEB",
            bankname: "光大银行",
            hotline: "95595",
            limitlist: [{type: "手机动态密码", singleLimit: "1万", dayLimit: "1万"}, {
              type: "令牌动态密码及阳光网盾验证方式",
              singleLimit: "100万",
              dayLimit: "100万"
            }]
          },
          {
            bankCode: "CMBC",
            bankname: "民生银行",
            hotline: "95568",
            limitlist: [{type: "大众版", singleLimit: "300", dayLimit: "300"}, {
              type: "贵宾版",
              singleLimit: "5000",
              dayLimit: "5000"
            }, {type: "U宝用户", singleLimit: "50万", dayLimit: "50万"}]
          },
          {
            bankCode: "GDB",
            bankname: "广发银行",
            hotline: "400-830-8003",
            limitlist: [{type: "手机验证码", singleLimit: "3000", dayLimit: "3000"}, {
              type: "key盾",
              singleLimit: "2万",
              dayLimit: "2万"
            }, {type: "卡密支付", singleLimit: "1000", dayLimit: "1000"}]
          },
          {
            bankCode: "BOS",
            bankname: "上海银行",
            hotline: "95594",
            limitlist: [{
              type: "办理动态密码版个人网银（含文件证书）,开通网上支付功能",
              singleLimit: "6000",
              dayLimit: "1万"
            }, {type: "办理E盾证书版个人网银，开通网上支付功能", singleLimit: "10万", dayLimit: "100万"}]
          },
          {
            bankCode: "SPDB",
            bankname: "浦发银行",
            hotline: "95528",
            limitlist: [{type: "手机动态密码", singleLimit: "500", dayLimit: "20万"}, {
              type: "数字证书（浏览器证书或U盾）",
              singleLimit: "500",
              dayLimit: "无限额，自行设置"
            }]
          },
          {
            bankCode: "PAB",
            bankname: "平安银行",
            hotline: "95511",
            limitlist: [{type: "网银", singleLimit: "5万", dayLimit: "5万"}]
          },
          {
            bankCode: "BOB",
            bankname: "北京银行",
            hotline: "95526",
            limitlist: [{type: "普通版", singleLimit: "300", dayLimit: "300"}, {
              type: "动态密码版",
              singleLimit: "1000",
              dayLimit: "5000"
            }, {type: "证书版", singleLimit: "100万", dayLimit: "100万"}]
          },
          {
            bankCode: "HXB",
            bankname: "华夏银行",
            hotline: "95577",
            limitlist: [{type: "卡密码校验", singleLimit: "300", dayLimit: "1000"}, {
              type: "手机动态验证码",
              singleLimit: "1000",
              dayLimit: "5000"
            }, {type: "U盾", singleLimit: "5000", dayLimit: "10万"}]
          },
          {
            bankCode: "BRCB",
            bankname: "北京农商银行",
            hotline: "96198",
            limitlist: [{type: "大众版", singleLimit: "500", dayLimit: "500"}, {
              type: "手机认证",
              singleLimit: "10万",
              dayLimit: "50万"
            }, {type: "证书认证", singleLimit: "20万", dayLimit: "100万"}]
          },
          {
            bankCode: "SRCB",
            bankname: "上海农商银行",
            hotline: "021-962999",
            limitlist: [{type: "短信版", singleLimit: "1000", dayLimit: "5000"}, {
              type: "证书版",
              singleLimit: "1万",
              dayLimit: "1万"
            }]
          },
          {
            bankCode: "CZBANK",
            bankname: "浙商银行",
            hotline: "95527",
            limitlist: [{type: "自助注册", singleLimit: "200", dayLimit: "200"}, {
              type: "大众版",
              singleLimit: "1000",
              dayLimit: "1000"
            }]
          },
          {
            bankCode: "NBCB",
            bankname: "宁波银行",
            hotline: "95574",
            limitlist: [{type: "无", singleLimit: "限额由个人设置", dayLimit: "限额由个人设置"}]
          },
          {
            bankCode: "HZBANK",
            bankname: "杭州银行",
            hotline: "400-888-8508",
            limitlist: [{type: "卡密支付", singleLimit: "300", dayLimit: "300"}, {
              type: "证书支付",
              singleLimit: "100万",
              dayLimit: "500万"
            }]
          }
        ],
        selectBank: {},
        toUrl: 'javascript:;',
        pageInfo: {
          loginInfo: this.$store.state.loginInfo,
          userOn: 'user_recharge'
        },
        rechargeAccount: "",
        rechargeBankcard: "",
        rechargeBankname: ""
      }
    },
    filters: {
      dateformat, formatCurrency,
    },
    computed: {
      ...mapState(['loginInfo']),
      afterAmount() {
        return Number(this.pageInfo.loginInfo.availableAmt) + Number(this.amount)
      },
      bindBankName() {
        return this.BankinfoList.find(item => {
          return item.bankCode == this.userBank.bankCode
        }).bankname
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      formatCurrency,
      initData() {
        this.$post('/member/account/recharge').then(res => {
          let result = toJson(res)
          this.ifInitDatas = true
          if (result.success) {
            this.rechargeAccount = result.data.rechargeAccount
            this.rechargeBankcard = result.data.rechargeBankcard
            this.rechargeBankname = result.data.rechargeBankname

            this.user = result.data
            this.userBank = this.user.userBank
            this.bankTypes = this.user.bankTypes
            this.payQuotas = this.user.payQuotas
            this.ifInitDatas = true
            this.rechargetype = this.user.defaultChannel == '8' ? 'q-pay' : 'net-pay'
            this.amount = this.user.goRechageAmt ? this.user.goRechageAmt : ''
            this.formtip1 = this.user.redirectMessage ? this.user.redirectMessage : ''
            this.changeBank(this.payQuotas[0])
          } else if (!this.pageInfo.loginInfo.isDepositary) {
            this.ifShowDeposit = true;
          }
        })
      },
      getBankUrl(bankCode) {
        return require("@/assets/images/bank/" + bankCode + ".png");
      },
      changeRechargeType(rechargetype) {
        this.rechargetype = rechargetype
        this.formtip = ''
        this.errorInput = false;
      },
      changeBank(bank) {
        this.BankinfoList.forEach(item => {
          if (item.bankCode == bank.bankCode) {
            this.selectBank = {...bank, ...item};
          }
        })
      },
      amountCheck() {
        this.formtip = ''
        this.errorInput = false;
        if (this.amount == "" || this.amount.length < 1 || typeof (this.amount) == "undefined") {
          this.errorInput = true
          this.formtip = '请输入充值金额';
          return false;
        }
        if (Number.isFinite(this.amount) || Number(this.amount) <= 0) {
          this.errorInput = true
          this.formtip = '请输入正确的充值金额';
          return false;
        }
        if (Number(this.amount) < 100) {
          this.errorInput = true
          this.formtip = '充值金额不能低于100元';
          return false;
        }
        //快捷充值判断
        if (this.rechargetype == 'q-pay') {
          if (this.userBank.singleAmount > 0) {
            if (Number(this.amount) > this.userBank.singleAmount) {
              this.errorInput = true
              this.formtip = '充值金额超过单笔限额，请修改金额分多次充值，或选择网银充值';
              return false;
            }
          }
          if (this.userBank.signleDayAmount > 0) {
            if (Number(this.amount) > (this.userBank.remainderDayAmount)) {
              this.errorInput = true
              this.formtip = '充值总金额超过单日限额，请选择网银充值，或拨打客服热线：400-090-9968';
              return false;
            }
          }
        }
        return true;
      },
      rechargeSubmit() {
        if (this.user.banRecharge == 0) {
          this.$layer.alert('为执行“三降”的要求，动态减少出借人总数，平台暂时关闭无待收资产用户的充值入口，感谢您的理解与支持。', {shade: true, shadeClose: false})
          return false;
        }
        if (!this.pageInfo.loginInfo.isDepositary) {
          this.ifShowDeposit = true;
          return false;
        }
        if (this.user.loanMaxLimit && (this.user.loanMaxLimit == -1 || this.user.loanMaxLimit == -2)) {
          this.ifShowConformRecharge = true
          return false;
        }
        this.continueRecharge();
      },
      continueRecharge() {
        this.toUrl = "javascript:;";
        if (this.amountCheck()) {
          this.ifShowResultTip = true;
          if (this.rechargetype == 'q-pay') {
            window.open("/member/account/netsaveConfirm?rechargeType=8&amount=" + this.amount + "&bankCode=" + this.selectBank.bankCode);
          } else if (this.rechargetype == 'net-pay') {
            window.open("/member/account/netsaveConfirm?rechargeType=6&amount=" + this.amount + "&bankCode=" + this.selectBank.bankCode);
          }
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/user.less";

  .mu-recharge {
    position: relative;
    background: #fff;
  }

  .mu-recharge .headmenu li {
    width: 33.333%;
  }

  .mu-recharge .wxtip {
    border-top: 1px solid #d6d6d6;
    padding: 25px 70px 35px;
  }

  .mu-recharge .wxtip h2 {
    font-size: 16px;
    line-height: 30px;
    color: #000;
  }

  .mu-recharge .wxtip p {
    font-size: 14px;
    line-height: 24px;
    color: #666;
  }

  .mu-recharge .banklist {
    margin-left: -20px;
  }

  .mu-recharge .banklist li {
    float: left;
    position: relative;
    background: #fff;
    width: 157px;
    height: 47px;
    line-height: 47px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    margin-left: 20px;
    margin-bottom: 15px;
    cursor: pointer;
    text-align: center;
  }

  .mu-recharge .banklist li img {
    max-height: 47px;
    max-width: 157px;
  }

  .mu-recharge .banklist li.more {
    border: none;
    margin-bottom: 0;
  }

  .mu-recharge .banklist li.on {
    background: url(./../../assets/images/bank/bankon1.png) no-repeat;
    border-color: transparent;
  }

  .mu-recharge .bankinfoTable .table th {
    background: #fafafa;
    border: 1px solid #d2d2d2;
    line-height: 50px;
    padding: 0 10px;
    text-align: center;
  }

  .mu-recharge .bankinfoTable .table td {
    border: 1px solid #d2d2d2;
    padding: 10px;
    line-height: 25px;
    text-align: center;
  }

  .mu-recharge .bankinfoTable .table td.text-l {
    text-align: left;
  }

  .mu-recharge .gatherinfo {
    background: #f9f9f9;
    padding: 20px 30px;
  }

  .mu-recharge .gatherinfo .item {
    float: left;
    line-height: 40px;
    width: 100%;
  }

  .mu-recharge .gatherinfo .item.w50 {
    width: 50%;
  }

  .mu-recharge .gatherinfo .item em {
    display: inline-block;
    width: 100px;
    padding-right: 3px;
    text-align: right;
  }

  .mu-recharge-form {
    position: relative;
    padding: 30px 0;
  }

  .mu-recharge-form .pd1 {
    padding-left: 70px;
    padding-right: 70px;
  }

  .mu-recharge-form .tips-up, .mu-recharge-form .icon-gth {
    color: #960;
    vertical-align: middle;
  }

  .mu-recharge-form .icon-font {
    margin: 0 3px 0 0;
  }

  .mu-recharge-form .formlabel {
    float: left;
    width: 100px;
    line-height: 50px;
    font-size: 15px;
  }

  .mu-recharge-form .forminput {
    float: left;
    width: 285px;
    line-height: 50px;
    position: relative;
  }

  .mu-recharge-form .forminput .input-text {
    line-height: 48px;
    height: 48px;
    padding: 0 20px;
    width: 100%;
    border-radius: 5px;
  }

  .mu-recharge-form .forminput .unit {
    position: absolute;
    right: 15px;
    top: 0;
    line-height: 50px;
    text-align: center;
    color: #999;
  }

  .mu-recharge-form .forminput .input-code {
    width: 130px;
  }

  .mu-recharge-form .forminput .codebtn {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    text-align: center;
    border: none;
    background: none;
    outline: none;
    line-height: 50px;
    color: #ff872f;
    cursor: pointer;
  }

  .mu-recharge-form .forminput .codebtn.disabled, .mu-recharge-form .forminput .codebtn[disabled] {
    color: #999;
  }

  .mu-recharge-form .formafter {
    float: left;
    line-height: 50px;
  }

  .mu-recharge-form .formdesc {
    color: #999;
  }

  .mu-recharge-form .addbank {
    display: block;
    border: 1px solid #ddd;
    border-radius: 5px;
    line-height: 48px;
    width: 233px;
    font-size: 16px;
    color: #333;
    padding-left: 50px;
  }

  .mu-recharge-form .addbank em {
    color: #c96;
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    display: block;
    position: absolute;
    left: 20px;
    top: -2px;
  }

  .mu-recharge-form .bindbank {
    position: relative;
    display: block;
    border: 1px solid #ddd;
    border-radius: 5px;
    line-height: 48px;
    width: 283px;
    font-size: 16px;
    background: #fffaf6;
    color: #333;
    overflow: hidden;
  }

  .mu-recharge-form .bindbank img {
    max-height: 48px;
    max-width: 172px;
  }

  .mu-recharge-form .bindbank .pic {
    float: left;
    width: 182px;
    text-align: center;
    line-height: 48px;
    height: 48px;
  }

  .mu-recharge-form .bindbank em {
    float: left;
    display: block;
    line-height: 22px;
    border-left: 1px solid #f5ac5e;
    width: 100px;
    text-align: center;
    margin-top: 13px;
  }

  .mu-recharge-form .btn-submit {
    width: 285px;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
    padding: 0;
    border-radius: 5px;
  }

  .mu-recharge-form .btn-submit.btn-cancel {
    background: #e5e5e5;
    color: #333;
  }

  .mu-recharge-form .btn-submit .righticon {
    color: #9f6;
    padding-right: 15px;
    font-size: 18px;
    font-weight: 700;
  }

  .mu-recharge-form .btn-submit .erroricon {
    color: #c00;
    padding-right: 15px;
    font-size: 18px;
    font-weight: 700;
  }

  .mu-recharge-form .pdleft {
    padding-left: 100px;
  }

  .mu-recharge-form .cztip1 {
    line-height: 20px;
    color: #999;
    font-size: 14px;
    padding: 0 20px;
  }

  .mu-recharge-form .warntip1 {
    color: #c96;
    font-size: 16px;
    line-height: 20px;
  }

  .mu-recharge-form .formhd {
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    color: #666;
  }

  .mu-recharge-form .formhd em {
    color: #999;
    font-size: 14px;
    padding-left: 20px;
    line-height: 1;
    display: inline-block;
  }

  .mu-recharge-form.formtype2 .formlabel {
    float: none;
    position: absolute;
    left: 10px;
    top: 0;
    z-index: 2;
    color: #666;
    font-size: 14px;
  }

  .mu-recharge-form.formtype2 .forminput {
    float: none;
  }

  .mu-recharge-form .rechargetype {
    float: left;
    width: 590px;
    position: relative;
  }

  .mu-recharge-form .rechargetype li {
    border: 1px solid #ccc;
    padding-left: 52px;
    line-height: 70px;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    background: url(./../../assets/images/user/typeitem.png) no-repeat 20px 25px;
    zoom: 1
  }

  .mu-recharge-form .rechargetype li + li {
    margin-top: 10px;
  }

  .mu-recharge-form .rechargetype li.on {
    background: url(./../../assets/images/user/typeon.png) no-repeat 20px 21px;
    border-color: #f29118;
  }

  .mu-recharge-form .rechargetype li:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .mu-recharge-form .rechargetype li .pic {
    float: left;
  }

  .mu-recharge-form .rechargetype li h4 {
    float: left;
    line-height: 70px;
    margin-left: 15px;
  }

  .mu-recharge-form .rechargetype li h6 {
    float: left;
    margin: 0 30px;
    color: #999;
    line-height: 70px;
  }

  .mu-recharge-form .rechargetype li .sd {
    float: right;
    margin-right: 30px;
    line-height: 70px;
  }

  .mu-recharge-form .rechargetype li .sd img {
    max-width: 120px;
  }

  .mu-recharge-form .bankdescs {
    float: left;
    width: 699px;
    position: relative;
  }

  .transfer-bank-layer {
    ul {
      table {
        border-collapse: collapse;
        border: 1px solid #eaeaea;
        margin: 20px 0 0;

        tr {
          td {
            border-bottom: 1px solid #eaeaea;
          }

          td:first-child {
            background-color: #fafafa;
            height: 45px;
            text-align: center;
            border-right: 1px solid #eaeaea;
          }

          td:last-child {
            padding-left: 20px;
          }
        }
      }
    }
  }
</style>
