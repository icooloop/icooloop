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
            <div class="mu-title"><h4>账户设置</h4>
              <div class="more">注册时间：{{user.regTime?dateformat(user.regTime,'YYYY-MM-DD HH:mm'):'无'}}</div>
            </div>
            <div class="mu-security">
              <div class="item">
                <strong><i
                  class="ideOn"></i>已设置</strong><em>用户名</em><span>可使用用户名或手机号登录亿钱贷</span><i>{{pageInfo.loginInfo.nickName}}</i>
                <a @click="unBindAccountHandle">销户</a>
                <a href="javascript:;;" v-if="user.canUpdateUsername && user.canUpdateUsername=='1'"
                   @click="ifShowUpdateName=true">修改</a>
              </div>
              <div class="item">
                <strong><i class="ideOn"></i>已绑定</strong><em>绑定手机号</em><span>取现、重置登录密码等操作需手机验证码</span>
                <i>{{userSecurity.phone}}</i>
                <a href="/member/secure/phone/update" target="_blank">修改</a>
              </div>
              <div class="item">
                <strong><i class="ideOn"></i>已设置</strong><em>登录密码 </em><span>登录亿钱贷账户密码 </span>
                <i></i>
                <a href="/member/secure/password/update" target="_blank">修改</a>
              </div>
              <div class="item" v-if="pageInfo.loginInfo.isDepositary!='1'">
                <strong><i class=""></i>未开通</strong><em>存管账户 </em><span>与新网银行合作资金存管，保障用户资金</span>
                <i v-if="user.xwAuditStatus">({{user.xwAuditStatus}})</i>
                <a href="/member/depository/form" target="_blank">开通存管</a>
              </div>
              <div class="item" v-else>
                <strong><i class="ideOn"></i>已开通</strong><em>存管账户 </em><span>与新网银行合作资金存管，保障用户资金</span>
                <i>({{user.xwAuditStatus}})</i>
              </div>

              <div class="item">
                <strong v-if="userSecurity && userSecurity.checkName && pageInfo.loginInfo.isDepositary=='1'"><i
                  class="ideOn"></i>已认证</strong>
                <strong v-else><i></i>未认证</strong>
                <em>实名认证</em><span>保障账户安全，确认出借身份</span>
                <a href="/member/auth/identify" target="_blank"
                   v-if="user.userType &&(user.userType=='5'||user.userType=='1') && user.xwAuditStatus&& ( user.xwAuditValue=='AUDIT' || user.xwAuditValue=='BACK')">上传证件照</a>
                <i
                  v-if="userSecurity && userSecurity.checkName && pageInfo.loginInfo.isDepositary=='1'">{{userInfo.userNameStr}}({{userInfo.userIdnoStr}})</i>
                <i v-else></i>
              </div>
              <div class="item"
                   v-if="user.userType == '2' && userSecurity.bindBank && pageInfo.loginInfo.isDepositary=='1'">
                <strong><i class="ideOn"></i>已绑定</strong><em>绑定对公账户</em><span>保障资金安全，充值、取现资金同卡进出</span>
                <i>{{user.bankName}} 尾号{{userBank.accountStar.substring(14)}} </i>
              </div>
              <div class="item" v-else-if="user.userType == '2'">
                <strong><i></i>未绑定</strong><em>绑定对公账户</em><span>保障资金安全，充值、取现资金同卡进出</span>
                <i></i>
              </div>
              <div class="item" v-else-if="userSecurity.bindBank && pageInfo.loginInfo.isDepositary=='1'">
                <strong><i class="ideOn"></i>已绑定</strong><em>绑定银行卡</em><span>用于快捷支付充值、提现</span>
                <i>{{user.bankName}} 尾号{{userBank.accountStar.substring(14)}}</i>
                <a v-if="userBank.undoStatus==='1'" href="/member/secure/bankcard/unbind">解绑</a>
                <a href="/member/secure/changeCard"
                   v-if="user.userBank &&userBank.changeStatus && userBank.changeStatus=='1'">更换</a>
                <a href="/member/secure/updateExpandMobile">预留手机</a>
              </div>
              <div class="item" v-else-if="!userSecurity.bindBank && pageInfo.loginInfo.isDepositary=='1'">
                <strong><i></i>未绑定</strong><em>绑定银行卡</em><span>用于快捷支付充值、提现</span>
                <i></i>
                <a href="/member/secure/changeCard">重新绑定</a>
              </div>
              <div class="item" v-else>
                <strong><i></i>未绑定</strong><em>绑定银行卡</em><span>用于快捷支付充值、提现</span>
                <i></i>
              </div>
              <div class="item">
                <strong v-if="userSecurity.password && pageInfo.loginInfo.isDepositary=='1'"><i
                  class="ideOn"></i>已设置</strong>
                <strong v-else><i></i>未设置</strong>
                <em>交易密码 </em>
                <span>充值、取现等资金相关操作时使用</span>
                <i></i>
                <a href="/member/secure/xwtrpwd" target="_blank"
                   v-if="userSecurity.password && pageInfo.loginInfo.isDepositary=='1'">修改</a>
                <a href="/member/secure/xwtrpwd?type=1" target="_blank"
                   v-if="userSecurity.password && pageInfo.loginInfo.isDepositary=='1'">找回</a>
              </div>
              <div class="item">
                <strong v-if="userSecurity && userSecurity.authListStatus"><i class="ideOn"></i>已授权</strong>
                <strong v-else><i></i>未授权</strong>
                <em>授权业务</em><span>授权投标以及认购债权</span>
                <a href="javascript:;" @click="cancelEmpower"
                   v-if="pageInfo.loginInfo.isDepositary=='1' &&userSecurity&&userSecurity.authListStatus">取消授权</a>
                <span v-else-if="pageInfo.loginInfo.isDepositary=='1'">
                                    <i><img alt="" src="@/assets/images/user/warn.png" class="mr-5">开通存管时同步完成</i>
                                    <a href="/member/secure/author" target="_blank">开启授权</a>
                                </span>
              </div>
              <div class="item">
                <strong v-if="user.assessType && ['1','2','3','4'].includes(user.assessType)"><i
                  class="ideOn"></i>已评估</strong>
                <strong v-else><i></i>未评估</strong>
                <em>风险承受能力 </em>
                <span>根据风险评估结果选择您适合的出借项目</span>
                <i v-if="user.assessType && user.assessType=='1'">保守型</i>
                <i v-else-if="user.assessType && user.assessType=='2'">稳健型</i>
                <i v-else-if="user.assessType && user.assessType=='3'">积极型</i>
                <i v-else-if="user.assessType && user.assessType=='4'">平衡型</i>
                <i v-if="user.isValid =='0'"> (已过期)</i>
                <a href="/member/auth/risk-ass" target="_blank"
                   v-if="user.assessType && ['1','2','3','4'].includes(user.assessType)">重新评估</a>
                <a href="/member/auth/risk-ass" target="_blank" v-else>评估</a>
              </div>
              <div class="item">
                <strong><i class="ideOn"></i>已设置</strong><em>通知短信设置</em><span>通知类短信私人定制 </span>
                <i></i>
                <a href="javascript:;" @click="ifShowSetSMS=true">修改</a>
              </div>
              <div class="item">
                <strong v-if="user.openId"><i class="ideOn"></i>已绑定</strong>
                <strong v-else><i></i>未绑定</strong>
                <em>绑定微信</em><span class="line2">可用于接受项目回款、提现到账等资金动态信息</span>
                <i></i>
                <a href="javascript:;" @click="unbindWechat" v-if="user.openId">解绑</a>
                <a href="javascript:;" @click="ifShowBindWechat=true" v-else>绑定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :pageInfo="pageInfo"></Footer>
    <a-modal title="修改用户名" :visible="ifShowUpdateName" :maskClosable="false" @ok="updateName"
             @cancel="ifShowUpdateName=false"
             cancelText="取消" okText="确定" :centered="true" :width="360" :closable="false">
      <button type="button" class="closemodal" @click="ifShowUpdateName=false"><i class="icon-font icon-close"></i>
      </button>
      <div class="mu-security-username">
        <div><input type="text" maxlength="18" class="input-text" placeholder="请输入新用户名" v-model="username"/></div>
        <div class="l20 c-666 mt-10">* 用户名仅能修改一次</div>
        <div class="l20 c-666">* 6-18位字符，可包含小写英文字母、数字</div>
      </div>
    </a-modal>
    <a-modal title="通知短信设置" :visible="ifShowSetSMS" :maskClosable="false" @ok="setSMS" @cancel="ifShowSetSMS=false"
             cancelText="取消" okText="确定" :centered="true" :width="520" :closable="false">
      <button type="button" class="closemodal" @click="ifShowSetSMS=false"><i class="icon-font icon-close"></i></button>
      <div class="mu-security-sms">
        <div class="bd">
          <li><h4>短信类型：</h4><h6>出借通知短信</h6></li>
          <li><h4>发送方式：</h4>
            <a-radio-group class="types" @change="changeInvestSendWay" v-model="investSendWay">
              <div class="item">
                <a-radio value="1">逐条发送</a-radio>
                <span class="desc">每笔出借都发送一条通知短信</span></div>
              <div class="item">
                <a-radio value="2">合并发送</a-radio>
                <span class="desc">每天21:00统计当日出借，发送通知短信</span></div>
              <div class="item">
                <a-radio value="0">不发送</a-radio>
                <span class="desc">不发送出借通知短信</span></div>
            </a-radio-group>
          </li>
          <li class="mt-20"><h4>短信类型：</h4><h6>回款通知短信</h6></li>
          <li><h4>发送方式：</h4>
            <a-radio-group class="types" @change="changeRepayedSendWay" v-model="repayedSendWay">
              <div class="item">
                <a-radio value="1">逐条发送</a-radio>
                <span class="desc">每笔回款都发送一条通知短信</span></div>
              <div class="item">
                <a-radio value="2">合并发送</a-radio>
                <span class="desc">每天21:00统计当日回款，发送通知短信</span></div>
              <div class="item">
                <a-radio value="0">不发送</a-radio>
                <span class="desc">不发送回款通知短信</span></div>
            </a-radio-group>
          </li>
        </div>
      </div>
    </a-modal>
    <a-modal title="绑定微信" :visible="ifShowBindWechat" :maskClosable="false"
             :centered="true" :width="360" :closable="false" :footer="null">
      <button type="button" class="closemodal" @click="ifShowBindWechat=false"><i class="icon-font icon-close"></i>
      </button>
      <div class="pd-10">
        <div class="text-c"><img src="@/assets/images/fwcode.png"></div>
        <div class="l20 text-second mt-20">1、扫描二维码关注并进入 “深南服务” 服务号<br>
          2、点击底部菜单栏，选择 “绑定账号”<br>
          3、登录平台账号后，即可成功绑定
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
  import {toJson, dateformat, formatCurrency} from '@/utils/utils'
  import Whattip from '@/components/common/Whattip'
  import Vue from 'vue'
  import {Pagination, Tabs} from 'ant-design-vue'

  Vue.use(Pagination)
  Vue.use(Tabs)

  export default {
    components: {
      Header,
      Footer,
      UserMenu,
      Whattip
    },
    data() {
      return {
        ifInitDatas: false,
        user: {},
        userSecurity: {},
        userInfo: {},
        userBank: {},
        username: '',
        investSendWay: '',
        repayedSendWay: '',
        ifShowUpdateName: false,
        ifShowSetSMS: false,
        ifShowBindWechat: false,
        logoffuser: false,
        pageInfo: {
          loginInfo: this.$store.state.loginInfo,
          userOn: 'user_security'
        }
      }
    },
    filters: {
      dateformat, formatCurrency,
    },
    computed: {
      ...mapState(['loginInfo']),
      userBankUnbindText() {
        if (!this.userSecurity.bindBank && this.pageInfo.loginInfo.isDepositary == '1') {
          return '重新绑定'
        } else {
          return '解绑'
        }
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      dateformat,
      initData() {
        this.$post('/member/secure/security').then(res => {
          let result = toJson(res)
          this.user = result.data
          this.userSecurity = result.data.userSecurity
          this.investSendWay = this.userSecurity.investSendWay
          this.repayedSendWay = this.userSecurity.repayedSendWay
          this.userInfo = result.data.userInfo
          this.userBank = result.data.userBank
          this.ifInitDatas = true
          this.logoffuser = result.data.logoffuser
        })
      },
      unBindBankCardHandle() {
        let _this = this;
        this.$confirm({
          title: '取消银行卡绑定',
          content: '是否要取消银行卡绑定？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            _this.$get('/member/secure/bankcard/unbind').then(res => {
              let result = toJson(res)
              if (result.success) {
                _this.$layer.msg('取消绑定成功');
                _this.userSecurity.authListStatus = false;
              } else {
                _this.$layer.msg(result.msg);
              }
            })
          },
          onCancel() {

          },
        });
      },
      unBindAccountHandle() {
        if (this.logoffuser) {
          window.location.href = '/member/secure/logoffpage'
        } else {
          this.$layer.alert('您的账户里还有资金未到绑定银行卡，账户需要清零后才可注销。', {shade: true, shadeClose: false})
        }
      },
      updateName() {
        let userName = this.username
        if (userName == '') {
          this.$layer.msg('用户名不能为空');
        } else if (userName.length < 6) {
          this.$layer.msg('用户名长度应为6-18位');
        } else if (!/^([a-z0-9]{6,18})$/.test(userName)) {
          this.$layer.msg('用户名只支持小写英文字母、数字');
        } else {
          this.$post('/member/secure/username/update', {"userName": userName}).then(res => {
            if (res.success) {
              this.$layer.msg('修改成功');
              this.pageInfo.loginInfo.isDefaultUsername = 0;
              this.ifShowUpdateName = false;
            } else {
              this.$layer.msg(res.msg);
            }
          })

        }

      },
      cancelEmpower() {
        let _this = this;
        let count = parseInt(this.user.couldCancelAuth);
        if (count <= 0) {
          this.$confirm({
            title: '取消授权投标',
            content: '取消授权之后将无法投标！',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$post('/member/secure/cancle-auth').then(res => {
                let result = toJson(res)
                if (result.success) {
                  _this.$layer.msg('取消授权投标成功');
                  _this.userSecurity.authListStatus = false;
                } else {
                  _this.$layer.msg(result.msg);
                }
              })
            },
            onCancel() {

            },
          });
        } else {
          this.$layer.msg('您有未到期的易智投，暂无法取消授权投标');
        }
      },
      setSMS() {
        this.$post('/member/auth/updateSmsSendWay', {
          investSendWay: this.investSendWay,
          repayedSendWay: this.repayedSendWay
        }).then(res => {
          let result = toJson(res)
          if (result.success) {
            this.ifShowSetSMS = false;
            this.$layer.msg('设置成功');
          } else {
            this.$layer.msg(result.msg);
          }

        })
      },
      changeInvestSendWay(e) {
        this.investSendWay = e.target.value
      },
      changeRepayedSendWay(e) {
        this.repayedSendWay = e.target.value
      },
      unbindWechat() {
        this.$post('/member/wechat/unbind').then(res => {
          let result = toJson(res)
          if (result.success) {
            this.$layer.msg('解绑成功');
            this.user.openId = ''
          } else {
            this.$layer.msg(result.msg);
          }
        })
      }
    },
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/user.less";

  .mu-security {
    padding: 20px 0 50px;
    background-color: #fff;

    .item {
      height: 70px;
      line-height: 70px;
      font-size: 14px;
      color: #333;
      padding-left: 40px;
      padding-right: 50px;
    }

    .item:nth-child(even) {
      background-color: #F9F9F9;
    }

    .item strong, .item em, .item span, .item > i {
      float: left;
      height: 70px;
      line-height: 70px;
    }

    .item > i.line2 {
      line-height: 20px;
      padding: 15px 0;
      height: 40px;
      padding-left: 40px;
    }

    .item strong > i {
      width: 16px;
      height: 14px;
      display: inline-block;
      background: url(./../../assets/images/user/close.png) no-repeat;
      vertical-align: middle;
      margin-right: 15px;
    }

    .item strong > i.ideOn {
      background: url(./../../assets/images/user/correct.png) no-repeat;
    }

    .item strong > i.waiting {
      background: url(./../../assets/images/user/waiting.png) no-repeat;
    }

    .item em {
      display: inline-block;
      padding-left: 20px;
      padding-right: 40px;
      width: 146px;
    }

    .item > span {
      width: 260px;
      white-space: nowrap;
    }

    .item > i {
      color: #999999;
      padding-left: 40px;
      font-style: normal;
    }

    .item .u-what {
      float: right;
    }

    .item a, .item .u-what {
      min-width: 50px;
      padding: 0 5px;
      height: 25px;
      line-height: 25px;
      display: inline-block;
      float: right;
      margin: 20px 0 0 10px;
      text-align: center;
      font-size: 14px;
      color: #3961cd;
      border: 1px solid #3961cd;
      border-radius: 5px;
    }

    .item a:hover, .item a.on {
      color: #fff;
      background-color: #3961cd;
      border-color: #3961cd;
    }
  }

  .mu-security-sms .bd {
    position: relative;

    li {
      overflow: hidden;

      h4 {
        float: left;
        font-weight: 700;
        line-height: 30px;
      }

      h6 {
        float: left;
        line-height: 30px;
      }

      .types {
        float: left;

        .item {
          line-height: 30px;

          label {
            display: inline-block;
            width: 100px;
          }

          .desc {
            color: #999;
          }
        }
      }
    }
  }
</style>
