<template>
    <div v-if="!ifRegisterSuccess">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer m-access register-bg" :style="'background:url('+bannerUrl+') no-repeat top center;'" >
            <div class="m-access-layer">
                <div class="centerwp">
                    <!--注册第一步-->
                    <div class="m-access-form registerform" v-show="ifFirst">
                        <div class="invited" v-if="user.code && user.realName">你的好友<span class="text-primary">{{user.realName}}</span>邀请你注册</div>
                        <div class="hd">注册亿钱贷</div>
                        <div class="bd">
                            <form class="forminfo" action="">
                                <div class="formline mt-20">
                                    <div class="formlabel">手机号</div>
                                    <div class="forminput"><input class="input-text" v-model="form.userPhone" name="userPhone" maxlength="11" @keyup="form.userPhone=form.userPhone.replace(/[^\d]/g,'')" 
                                     v-validate="'required|mobile'" placeholder="请输入手机号码"></div>
                                </div>
                                <div class="formline mt-20 mb-20">
                                    <div class="formlabel">登录密码</div>
                                    <div class="forminput"><input class="input-text" v-model="form.userPassword" name="userPassword" v-validate="'required|isPwd'"
                                     :type="pwdType?'password':'text'" placeholder="6-20位字母、数字或字符组合" maxlength="20" autocomplete="new-password"></div>
                                    <span class="eyepwd" @click="pwdType=!pwdType"><i class="icon-font icon-eye"></i></span>
                                </div>
                                <div class="invitediv mt-10">
                                    <a @click="changeInvite" class="invitedesc text-primary" href="javascript:;">
                                        <i :class="['icon-font',ifShowInvite?'icon-xiasanjiao':'icon-yousanjiao']"></i>我有邀请人（选填）
                                    </a>
                                </div>
                                <div class="formline mt-10" v-show="ifShowInvite">
                                    <div class="formlabel">邀请人</div>
                                    <div class="forminput"><input autocomplete="off" class="input-text" v-model="recommendCode" name="recommendCode" placeholder="请输入邀请人的推荐码或手机号"></div>
                                </div>
                                <div class="agreementdiv mt-10">
                                    <a-checkbox @change="changeAgreement">我已阅读并同意</a-checkbox>
                                    <a target="_blank" href="/contract/zhuce" class="text-primary">《亿钱贷注册协议》</a>
                                    <a target="_blank" href="/spa/about/risktip" class="text-primary">《风险及禁止性行为提示书》</a>
                                </div>
                                <Errortip v-show="formtip1||errors.any()" :msg="formtip1?formtip1:errors.all()[0]"></Errortip>
                                <div class="formline mt-10">
                                    <a-button type="primary" html-type="button" block class="ant-btn-submit" @click="checkForm1">注册领红包</a-button>
                                </div>
                                <div class="bottomlink mt-20">
                                    <router-link class="text-default" to="/spa/secure/login">已有账号，去登录</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="m-access-form registerform" v-show="!ifFirst">
                        <div class="hd">手机号码验证</div>
                        <div class="infotip" v-html="infotip"></div>
                        <div class="bd">
                            <form class="forminfo" action="" id="myform2">
                                <div class="formline mt-20">
                                    <div class="formlabel">您的手机号</div>
                                    <div class="forminput"><input class="input-text readonly" :value="form.userPhone" readonly="readonly"></div>
                                </div>
                                <div class="formline mt-20">
                                    <div class="formlabel">手机验证码</div>
                                    <div class="forminput"><input class="input-text input-code" v-validate="'required|max:6|min:6'" @keyup="phoneCode=phoneCode.replace(/[^\d]/g,'')" maxlength="6" v-model="phoneCode" name="phoneCode" placeholder="6位数字"></div>
                                    <div class="codebtn" v-if="codebtnType==1"><a href="javascript:;" class="text-primary" @click="sendPhoneCode">获取验证码</a></div>
                                    <div class="codebtn" v-else-if="codebtnType==2">还剩{{seconds}}秒</div>
                                    <div class="codebtn" v-else-if="codebtnType==3"><a href="javascript:;" class="text-primary" @click="sendPhoneCode">重新获取</a></div>
                                    <div class="codebtn" v-else-if="codebtnType==4">重新获取</div>
                                    <div class="helptip">{{codehelp}}</div>
                                </div>
                                <div class="voicediv l20 mt-10" v-if="voicetipType==1">收不到短信？请使用<a  class="text-primary" @click="sendVoiceCode" href="javascript:;">语音验证码</a></div>
                                <div class="voicediv l20 mt-10" v-else-if="voicetipType==2">收不到短信？请使用语音验证码</div>
                                <div class="voicediv l20 mt-10" v-else-if="voicetipType==3">您可查看<a class="text-primary" href="/help/question?faqType=a3acf878fda746ba8bc0b29b6a784d4b" target="_blank">帮助中心</a>，或拨打客服热线400-090-9968</div>
                                <Errortip v-if="formtip2||errors.has('phoneCode')" :msg="formtip2?formtip2:errors.first('phoneCode')"></Errortip>
                                <div v-else style="height:20px;"></div>
                                <div class="formline mt-10">
                                    <a-button type="primary" html-type="button" block :class="['ant-btn-submit',disabledSubmit2?'disabled':'']" :disabled="disabledSubmit2" @click="registerSubmit">立即验证</a-button>
                                </div>
                                <div class="bottomlink mt-20">
                                    <a class="backlink text-primary" href="javascript:;" @click="ifFirst=true"><i class="icon-font icon-xiangzuo"></i>返回上一步</a>
                                    <router-link class="text-default" to="/spa/secure/login">已有账号，去登录</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoginFooter :pageInfo="pageInfo"></LoginFooter> 
        <div v-show="ifShowCodeValidatorLayer" class="m-sliderlayer mask">
            <div class="bd">
                <div class="close" @click="ifShowCodeValidatorLayer=false"><i class="icon-font icon-close"></i></div>
                <div class="slider" id="nc"></div>
            </div>
        </div>
    </div>
    <RegisterSuccess v-else></RegisterSuccess>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import LoginFooter from '@/components/include/LoginFooter'
import RegisterSuccess from '@/components/include/RegisterSuccess'
import defaultBannerUrl from '@/assets/images/access/banner_register.jpg'
import '@/utils/validate'
import PasswordHide from '@/components/common/PasswordHide'
import Errortip from '@/components/common/Errortip'
import  { Validator } from "vee-validate";
import {toJson} from  '@/utils/utils'
import "@/utils/ali_validate"
import { setTimeout } from 'timers';

let nc = null
Validator.localize({
    zh_CN: {
      attributes: {
        userPhone: "手机号",
        userPassword: "登录密码",
        phoneCode:'手机验证码'
      }
    }
  });

export default {
    components:{
        Header,
        LoginFooter,
        PasswordHide,
        Errortip,
        RegisterSuccess,
    },
    data() {
        return {
            form: {
                userPhone: '',
                userPassword: ''
            },
            phoneCode:'',
            pwdType:true,
            recommendCode:'',
            agreement:false,
            user:{},
            formtip1:'',
            formtip2:'',
            ifFirst:true,
            disabledRegister:false,
            ifShowInvite:false,
            infotip:'',
            voicetype:false,
            ifSendPhoneCode:false,
            voicetipType:0,
            codehelp:'',
            codebtnType:1,
            seconds:0,//倒计时
            codeType:1,//1 短信验证 2 语音验证
            firstFlag:false,
            slidercode:false,
            codehelpFlag:false,
            submitFlag:false,
            chkForm1:false,
            chkAccount:false,
            chkInvest:false,
            ifRegisterSuccess:false,
            alinc:{csessionid:'',sig:'',token:'',scene:''},
            ifShowCodeValidatorLayer:false,
            bannerUrl:defaultBannerUrl,
            disabledSubmit2:false,
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
        this.initAliNC();
    },
    methods:{
        initAliNC(){
            let nc_appkey = 'FFFF0N00000000005F1A';// 应用标识,不可更改
            let nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
            let nc_scene = 'nc_register';
            nc = NoCaptcha.init({
                renderTo: '#nc',
                appkey: nc_appkey,
                scene: nc_scene,
                token: nc_token,
                elementID: ['phone'],
                callback: (data) => {
                    let result={csessionid:data.csessionid,sig:data.sig,scene: nc_scene,token: nc_token}
                    this.onValidatorResult(result)
                }
            });
            NoCaptcha.upLang('cn', {
                'SLIDER_LABEL': "向右滑动以完成验证",//等待滑动
            });
            NoCaptcha.setEnabled(true)
            nc.reset()
        },
        showAliNC(){
            nc.reset();
            setTimeout(()=>{
                this.ifShowCodeValidatorLayer = true
            },100)
        },
        initData(){
            this.$post('/secure/register',{code:this.$route.query.code}).then(res => {
                this.user=toJson(res).data
                if(this.user.code){
                    this.ifShowInvite=true
                    this.recommendCode=this.user.code
                } 
                if(this.user.imgUrl) this.bannerUrl=this.user.imgUrl
            })
        },
        changeInvite(){
            this.ifShowInvite=!this.ifShowInvite
            if(!this.ifShowInvite) this.recommendCode=''
        },
        changeAgreement(e){
            this.agreement=e.target.checked
        },
        checkForm1(){
            var self=this
            if(this.user.regStart==0) this.$router.push('/spa/static/reg_notice')
            self.$validator.validateAll(this.form).then((result) => {
                if(result){
                    if(this.recommendCode!==''){
                        this.chkInvest=false
                        this.checkInvest()
                    }else{
                        this.chkInvest=true
                    }
                    this.checkAccount()
                }
            })
        },
        checkAccount(){
            this.$post('/secure/register/check-account',{account: this.form.userPhone}).then(res => {
                let result=toJson(res)
                if(result.success){
                    this.chkAccount=true
                    this.gotoNext()
                }else{
                    this.formtip1=result.msg
                }
            })
        },
        checkInvest(){ //验证邀请码
            this.$post('/secure/register/check-code',{code: this.recommendCode}).then(res => {
                let result=toJson(res)
                if(result.success){
                    this.chkInvest=true
                    this.gotoNext()
                }else{
                    this.formtip1=result.msg
                }
            })
        },
        gotoNext(){
            if(this.chkAccount && this.chkInvest){
                this.formtip1=''
                if(!this.agreement){
                    this.formtip1='必须同意注册协议'
                }else{
                    this.ifFirst=false
                    this.chkForm1=true
                    if(!this.ifSendPhoneCode) this.sendPhoneCode()
                }
            }
        },
        sendPhoneCode(){
            if(this.user.captchaCheck!=0 && !this.slidercode){
                this.codeType=1;
                this.showAliNC()
                return false;
            }
            this.$post('/secure/register/verify-codevoice',{phone:this.form.userPhone,...this.alinc}).then(res => {
                if (res.success) {
                    this.disabledSubmit2=false;
                    this.submitFlag=true;
                    if (res.sendTime >= 6 && res.sendTime < 10) {
                        this.formtip2=''
                        this.codehelpFlag=true;
                        this.disableButtonByClock(60);
                        this.infotip='验证码已发送到您的手机，10分钟内输入有效，请勿泄露'
                        this.slidercode=false
                        nc.reset();
                    }else if(res.sendTime >= 10){
                        this.codehelpFlag=false;
                        this.submitFlag=false;
                        this.codebtnType=4
                        this.formtip2='验证码错误，本日手机号码验证次数已达上限'
                        this.voicetipType=3
                        this.infotip=''
                        this.disabledSubmit2=true;
                    }else{
                        this.formtip2=''
                        this.codehelpFlag=false;
                        this.disableButtonByClock(60);
                        this.infotip='验证码已发送到您的手机，10分钟内输入有效，请勿泄露'
                        this.slidercode=false
                        nc.reset();
                    }
                } else {
                    this.formtip2=res.msg
                }
            })
        },
        sendVoiceCode(){
            if(this.user.captchaCheck!=0 && !this.slidercode){
                this.codeType=2;
                this.showAliNC()
                return false;
            }
            this.$post('/secure/register/verify-codevoice',{phone:this.form.userPhone,type:'1',...this.alinc}).then(res => {
                if (res.success) {
                    this.disabledSubmit2=false;
                    this.submitFlag=true;
                    if (res.sendTime >= 6 && res.sendTime < 10) {
                        this.formtip2=''
                        this.codehelpFlag=true;
                        this.disableButtonByClockVoice(60);
                        this.infotip='验证码已经发送，请留意接听来电'
                        this.slidercode=false
                        nc.reset();
                    }else if(res.sendTime >= 10){
                        this.codehelpFlag=false;
                        this.submitFlag=false;
                        this.codebtnType=4
                        this.formtip2='验证码错误，本日手机号码验证次数已达上限'
                        this.voicetipType=3
                        this.infotip=''
                        this.disabledSubmit2=true;
                    }else{
                        this.formtip2=''
                        this.codehelpFlag=false;
                        this.disableButtonByClockVoice(60);
                        this.infotip='验证码已经发送，请留意接听来电'
                        this.slidercode=false
                        nc.reset();
                    }
                } else {
                    this.formtip2=res.msg
                }
            })
        },
        disableButtonByClock(seconds){
            if(!this.voicetype){
                this.ifSendPhoneCode=true;
                this.codebtnType=2
                this.seconds=seconds;
                var time = parseInt(seconds);
                if (time == 0) {     //如果时间为0，则启用该控件
                    this.ifSendPhoneCode=false;
                    this.firstFlag=true;
                    this.codebtnType=3
                    this.voicetipType=1;
                } else {
                    setTimeout(()=>{
                        this.disableButtonByClock((time - 1))
                    },1000)
                    !this.firstFlag?this.voicetipType=0:this.voicetipType=2;
                }
            }
        },
        disableButtonByClockVoice(seconds) {
            this.voicetype=true;
            this.ifSendPhoneCode=true;
            this.codebtnType=2
            this.seconds=seconds;
            this.voicetipType=2;
            var time = parseInt(seconds);
            if (time == 0) {     //如果时间为0，则启用该控件
                this.voicetype=false;
                this.ifSendPhoneCode=false;
                this.codebtnType=1
                this.voicetipType=1;
            } else {
                setTimeout(()=>{
                    this.disableButtonByClockVoice((time - 1))
                },1000)
            }
        },
        registerSubmit(){
            if(this.chkForm1){
                var self=this
                self.$validator.validateAll().then((result) => {
                    if(result){
                        this.formtip2=''
                        let params={...this.alinc,...this.form,phoneCode:this.phoneCode,recommendCode:this.recommendCode}
                        this.disabledSubmit2=true;
                        this.$post('/secure/register/ajax-submit',params).then(res => {
                            let result=toJson(res)
                            this.disabledSubmit2=false;
                            if(result.success){
                                this.ifRegisterSuccess=true
                            }else{
                                this.formtip2=result.msg
                            }
                        })
                    }
                })
            }
        },
        onValidatorResult(result) {
            this.alinc={...result}
            this.slidercode=true
            this.ifShowCodeValidatorLayer = false
            this.codeType==1?this.sendPhoneCode():this.sendVoiceCode()
        },
    }
 }
</script>

<style scoped>
@import "~@/assets/style/access.less";

.m-sliderlayer .bd{position: fixed;top:50%;left:50%;width:420px;height:100px;margin-top:-50px;margin-left:-210px;text-align:center;padding:30px 50px;background:#fff;border-radius:10px;}
.m-sliderlayer .bd .close{display:inline-block;position:absolute;right:15px;top:15px;line-height:1;cursor:pointer;}
.m-sliderlayer .bd .close .icon-font{line-height:1;color:#999;font-size:25px;}
</style>