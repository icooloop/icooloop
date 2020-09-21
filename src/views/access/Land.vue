<template>
<div v-if="!ifRegisterSuccess">
    <div class="m-access land-bg">
        <div class="m-access-layer" id="register">
            <div class="centerwp">
                <div class="m-access-form registerform">
                    <div class="invited" v-if="user.code && user.realName">你的好友<span class="text-primary">{{user.realName}}</span>邀请你注册</div>
                    <div class="bd iconlabel">
                        <form class="forminfo pt-30" action="">
                            <div class="formline">
                                <div class="formlabel"><i class="icon-font icon-shouji1"></i></div>
                                <div class="forminput"><input class="input-text" v-model="form.userPhone" name="userPhone" @keyup="checkAccount" 
                                     v-validate="'required|mobile'" placeholder="请输入手机号码" maxlength="11"></div>
                                <span class="icontip icon-font icon-error" v-if="errors.has('userPhone')||chkAccount==1"></span>
                                <span class="icontip icon-font icon-right" v-else-if="chkAccount==2"></span>
                            </div>
                            <div class="formline mt-20">
                                <div class="formlabel"><i class="icon-font icon-lock1"></i></div>
                                <div class="forminput"><input class="input-text" v-model="form.userPassword" name="userPassword" v-validate="'required|isPwd'"
                                     :type="pwdType?'password':'text'" placeholder="6-20位字母、数字或字符组合" maxlength="20" autocomplete="new-password"></div>
                                <span class="eyepwd" @click="pwdType=!pwdType"><i class="icon-font icon-eye"></i></span>
                                <span class="icontip icon-font icon-error" v-if="errors.has('userPassword')" style="right:30px;"></span>
                                <span class="icontip icon-font icon-right" v-else-if="ifValidate" style="right:30px;"></span>
                            </div>
                            <div class="formline mt-20">
                                <div class="formlabel"><i class="icon-font icon-tuxing"></i></div>
                                <div class="forminput"><input class="input-text input-code" v-model="form.randCode" name="randCode" 
                                    v-validate="'required|alpha_num|min:5'" maxlength="5" placeholder="图形验证码" @keyup="checkCaptcha"></div>
                                <img class="randcode" :src="captchaUrl" alt="图形验证码" @click="refreshCaptcha">
                                <span class="icontip inputtip-code icon-font icon-error" v-if="errors.has('randCode')||chkCaptcha==1"></span>
                                <span class="icontip inputtip-code icon-font icon-right" v-else-if="chkCaptcha==2"></span>
                            </div>
                            <div class="formline mt-20">
                                <div class="formlabel"><i class="icon-font icon-duanxin"></i></div>
                                <div class="forminput"><input class="input-text input-code" v-model="form.phoneCode" @keyup="form.phoneCode=form.phoneCode.replace(/[^\d]/g,'')"
                                    name="phoneCode" v-validate="'required|max:6|min:6'" maxlength="6" placeholder="手机验证码"></div>
                                <span class="icontip inputtip-code icon-font icon-error" v-if="errors.has('phoneCode') ||formtip1=='手机验证码不正确'"></span>
                                <span class="icontip inputtip-code icon-font icon-right" v-else-if="ifValidate"></span>
                                <div class="codebtn" v-if="codebtnType==1"><a href="javascript:;" class="text-primary" @click="sendPhoneCode">获取验证码</a></div>
                                <div class="codebtn" v-else-if="codebtnType==2">还剩{{seconds}}秒</div>
                                <div class="codebtn" v-else-if="codebtnType==3"><a href="javascript:;" class="text-primary" @click="sendPhoneCode">重新获取</a></div>
                            </div>
                            <div class="agreementdiv mt-20">
                                <a-checkbox @change="changeAgreement">我已阅读并同意</a-checkbox>
                                <a target="_blank" href="/contract/zhuce" class="text-primary">《亿钱贷注册协议》</a>
                                <a target="_blank" href="/spa/about/risktip" class="text-primary">《风险及禁止性行为提示书》</a>
                            </div>
                            <Errortip v-if="formtip1||errors.any()" :msg="formtip1?formtip1:errors.all()[0]"></Errortip>
                            <div class="h30" v-else></div>
                            <div class="formline mt-10">
                                <a-button type="primary" html-type="button" block :class="['ant-btn-submit',disabledSubmit?'disabled':'']" :disabled="disabledSubmit" @click="checkForm">立即注册</a-button>
                            </div>
                            <div class="text-c mt-20">
                                    已有账号? <router-link class="text-primary" to="/spa/secure/login">请登录</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md-intro">
        <ul class="wp clearfix">
            <li><a href="javascript:;"><i class="icon-font icon-company2"></i>
                <h2>上市背景</h2>
                <p>A股上市公司控股</p>
            </a></li>
            <li><a href="javascript:;"><i class="icon-font icon-socket"></i>
                <h2>银行存管</h2>
                <p>新网银行资金存管</p>
            </a></li>
            <li><a href="javascript:;"><i class="icon-font icon-bridge"></i>
                <h2>合规运营</h2>
                <p>拥抱监管，合规发展</p>
            </a></li>
            <li><a href="javascript:;"><i class="icon-font icon-company-verify"></i>
                <h2>风险管理</h2>
                <p>多重风控优质资产</p>
            </a></li>
        </ul>
    </div>
    <div class="md-project">
        <div class="hd">优质项目 自由选择</div>
        <div class="bd">
            <ul class="wp clearfix">
                <li class="l item1">
                    <h2>易智投</h2>
                    <h6>自动匹配&nbsp;&nbsp;分散出借</h6>
                </li>
                <li class="l item2">
                    <div class="title newer">新手专享1个月</div>
                    <div class="rate">12<em>%</em></div>
                    <p>协议约定年化利率</p>
                </li>
                <li class="l item3">
                    <h4>委托期限</h4>
                    <h4 class="text-import">30天</h4>
                    <h4 class="mt-30">起投金额</h4>
                    <h4 class="text-import">1000元</h4>
                </li>
                <li class="l item4">
                    <a href="javascript:;" class="btn-go" @click="goAnchor('#register')">立即委托</a>
                </li>
            </ul>
            <ul class="wp clearfix">
                <li class="l item1">
                    <h2>优质散标</h2>
                    <h6>多种选择&nbsp;&nbsp;方便灵活</h6>
                </li>
                <li class="l item2">
                    <div class="title">微花贷</div>
                    <div class="rate">8<em>%</em></div>
                    <p>协议约定年化利率</p>
                </li>
                <li class="l item3">
                    <h4>委托期限</h4>
                    <h4 class="text-import">30天</h4>
                    <h4 class="mt-30">起投金额</h4>
                    <h4 class="text-import">100元</h4>
                </li>
                <li class="l item4">
                    <a href="javascript:;" class="btn-go" @click="goAnchor('#register')">立即出借</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="md-steps">
        <div class="wp bd">
            <div class="title">简单四步，新手壕赚888元</div>
            <ul class="mt-50 clearfix">
                <li>
                    <div class="num">01</div>
                    <div class="pic"><img src="@/assets/images/access/landstep1.png" alt=""></div>
                    <p>30秒快速注册<br>赚888元红包</p>
                </li>
                <li>
                    <div class="num">02</div>
                    <div class="pic"><img src="@/assets/images/access/landstep2.png" alt=""></div>
                    <p>开通新网银行存管<br>资金有保障</p>
                </li>
                <li>
                    <div class="num">03</div>
                    <div class="pic"><img src="@/assets/images/access/landstep3.png" alt=""></div>
                    <p>选择合适出借项目<br>专享12%约定年化利率</p>
                </li>
                <li>
                    <div class="num">04</div>
                    <div class="pic"><img src="@/assets/images/access/landstep4.png" alt=""></div>
                    <p class="line1">出借立返享收益</p>
                </li>
            </ul>
            <div class="btndiv"><a href="javascript:;" class="btn-go" @click="goAnchor('#register')">立即注册，领取福利</a></div>
        </div>
    </div>
    <div class="md-footer">
        <p>亿钱贷　|　© 2018 All Rights Reserved　|　深圳市亿钱贷电子商务有限公司    <a href="http://www.miit.gov.cn/" class="keeplink" target="_blank" rel="noopener noreferrer">粤ICP备14041671号-1</a>　|　市场有风险，出借需谨慎</p>
    </div>
</div>
<RegisterSuccess v-else></RegisterSuccess>
</template>

<script>
import {mapState} from 'vuex'
import '@/utils/validate'
import { Validator } from "vee-validate"
import {toJson} from  '@/utils/utils'
import Errortip from '@/components/common/Errortip'
import { setTimeout } from 'timers'
import RegisterSuccess from '@/components/include/RegisterSuccess'
Validator.localize({
    zh_CN: {
      attributes: {
        userPhone: "手机号",
        userPassword: "登录密码",
        phoneCode:'手机验证码',
        randCode:'图形验证码',
      }
    }
  });

let captchaUrl
export default {
    components:{
        Errortip,
        RegisterSuccess,
    },
    data() {
        return {
            form: {
                userPhone: '',
                userPassword: '',
                phoneCode:'',
                randCode:'',
            },
            pwdType:true,
            recommendCode:'',
            captchaUrl:this.baseUrl+'txjcaptcha.svl', //图形码URL
            agreement:false,
            ifShowInvite:false,
            user:{},
            formtip1:'',
            ifValidate:false,
            disabledSubmit:false,
            chkAccount:0,
            chkCaptcha:0,
            codebtnType:1,
            seconds:0,
            ifRegisterSuccess:false,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                ifAccess:true
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initData();
        captchaUrl=this.captchaUrl
    },
    methods:{
        initData(){
            this.$post('/secure/register',{code:this.$route.query.code}).then(res => {
                this.user=toJson(res).data
                if(this.user.code){
                    this.ifShowInvite=true
                    this.recommendCode=this.user.code
                } 
            })
        },
        refreshCaptcha(){//刷新二维码
            this.captchaUrl=captchaUrl+"?"+Math.random();
        },
        goAnchor(selector) {
            let anchor = this.$el.querySelector(selector)
            document.documentElement.scrollTop = anchor.offsetTop
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
        checkForm(){
            this.$validator.validateAll().then((result) => {
                this.ifValidate=true;
                if(result && this.chkAccount==2){
                    this.registerSubmit()
                }
            })
        },
        checkAccount(){
            this.form.userPhone=this.form.userPhone.replace(/[^\d]/g,'')
            if(this.form.userPhone.length==11){
                this.$post('/secure/register/check-account',{account: this.form.userPhone}).then(res => {
                    let result=toJson(res)
                    if(result.success){
                        this.chkAccount=2
                        this.formtip1=''
                    }else{
                        this.chkAccount=1
                        this.formtip1=result.msg
                    }
                })
            }
        },
        checkCaptcha(){
            if(this.form.randCode.length==5){
                this.chkCaptcha=2
                if(this.formtip1=='图形验证码不正确') this.formtip1=''
            }else{
                this.chkCaptcha=1
            }
        },
        sendPhoneCode(){ //验证邀请码
            this.$validator.validateAll({userPhone:this.form.userPhone}).then((resp) => {
                if(resp && this.chkAccount==2){
                    this.$post('/secure/register/verify-code',{phone: this.form.userPhone,captcha:this.form.randCode}).then(res => {
                        let result=toJson(res)
                        if(result.success){
                            this.chkCaptcha=2
                            this.$layer.msg(result.msg)
                            this.disableButtonByClock(60)
                        }else{
                            this.chkCaptcha=1
                            this.refreshCaptcha()
                            this.formtip1=result.msg
                        }
                    })
                }
            })
        },
        disableButtonByClock(seconds){
            this.codebtnType=2
            this.seconds=seconds;
            var time = parseInt(seconds);
            if (time == 0) {     //如果时间为0，则启用该控件
                this.codebtnType=3
            } else {
                setTimeout(()=>{
                    this.disableButtonByClock((time - 1))
                },1000)
            }
        },
        registerSubmit(){
            this.ifValidate=true;
            this.formtip1=''
            if(!this.agreement){
                this.formtip1='必须同意注册协议'
            }else{
                this.$post('/secure/register/ajax',{...this.form,userType:1,recommendCode:this.recommendCode}).then(res => {
                    let result=toJson(res)
                    if(result.success){
                        this.ifRegisterSuccess=true;
                    }else{
                        this.formtip1=result.msg
                    }
                })
            }
        }
    }
 }
</script>

<style scoped>
@import "~@/assets/style/access.less";
.m-access.land-bg{border-top: 1px solid #fff;background: url(../../assets/images/access/landbanner.jpg) no-repeat top center;}
.wp,.m-access .centerwp{width:1080px;}
.m-access-form .invited{top:-50px;line-height:50px;height:50px;}
.m-access-form .bd .formline .randcode{position:absolute;right:0;top:0;width:80px;height:44px;}
.m-access,.m-access .centerwp{height:562px;min-height:562px;}

.md-intro li{float:left;width:25%;background:#fff;position:relative;}
.md-intro li a{display:block;height:160px;position:relative;cursor:default;}
.md-intro li .icon-font{position:absolute;left:40px;top:40px;width:80px;height:80px;line-height:80px;display:inline-block;text-align:center;font-size:40px;color:#8c7ff4;border:2px solid #c8c2f8;border-radius:80px;}
.md-intro li h2{padding-left:140px;padding-top:57px;font-size:16px;line-height:26px;color:#8c7ff4;}
.md-intro li p{padding-left:140px;font-size:14px;line-height:20px;color:#8c7ff4;}

.md-project{background:#f0eefd;text-align:center;padding:70px 0;}
.md-project .hd{color:#8577ff;font-size:36px;line-height:1;padding-bottom:10px;}
.md-project .bd ul{box-shadow:0 0 5px 2px #cec8fe;border-radius:15px;margin-top:50px;height:234px;text-align:center;overflow:hidden;background:#fff;color:#888;}
.md-project .bd .item1{width:360px;background:#9083f4;height:100%;color:#fff;line-height:1;}
.md-project .bd ul+ul .item1{background:#9e6fb8;}
.md-project .bd .item2{padding-top:40px;width:300px;}
.md-project .bd .item3{padding-top:40px;width:190px;}
.md-project .bd .item4{padding-top:52px;width:220px;}
.md-project .bd h2{padding-top:70px;font-size:42px;}
.md-project .bd h6{padding-top:25px;font-size:24px;}
.md-project .bd h4{font-size:22px;line-height:32px;}
.md-project .bd p{font-size:16px;}
.md-project .bd .title{display:inline-block;font-size:20px;line-height:36px;padding:0 30px;border-radius:36px;color:#9083f4;background:#f1effe;}
.md-project .bd .title.newer{width:197px;background:url(../../assets/images/access/newerlabel.png) no-repeat center;color:#fff;}
.md-project .bd .rate{font-size:72px;color:#9083f4;line-height:1;padding:15px 0;}
.md-project .bd .text-import{color:#9083f4;}
.md-project .bd .rate em{font-size:36px;}
.md-project .bd .btn-go{font-size:22px;line-height:126px;display:inline-block;width:126px;border:2px solid #f26522;color:#f26522;border-radius:126px;}
.md-project .bd .btn-go:hover{background:#f26522;color:#fff;}

.md-steps .bd{padding-bottom:60px;text-align:center;}
.md-steps .title{line-height:160px;text-align:center;font-size:36px;color:#8677ff;}
.md-steps .bd li{float:left;position:relative;width:208px;margin:0 30px;border:1px solid #cec8fe;box-shadow:0 0 5px 2px #cec8fe;text-align:center;padding:50px 0 40px;border-radius:20px;}
.md-steps .bd li .pic{line-height:120px;}
.md-steps .bd li .num{width:140px;border-radius:140px 140px 0 0;line-height:70px;height:70px;background:#8677ff;color:#fff;font-size:36px;position:absolute;left:50%;margin-left:-70px;top:-50px;}
.md-steps .bd li p{line-height:25px;color:#8677ff;font-size:16px;}
.md-steps .bd li p.line1{line-height:50px;}
.md-steps .bd .btn-go{display:inline-block;line-height:90px;height:90px;width:480px;text-align:center;color:#fff;font-size:30px;background:#f26c4f;border-radius:90px;}
.md-steps .bd .btndiv{margin-top:90px;}

.md-footer{color:#fff;text-align:center;font-size:14px;line-height:70px;height:70px;background:#4d7efa;}
.md-footer a.keeplink{color:#fff;text-decoration:underline;}
</style>