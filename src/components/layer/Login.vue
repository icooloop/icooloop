<template>
    <div class="m-access-form loginform">
        <div class="hd">
            <ul class="clearfix">
                <li :class="{on:formlogin}" @click="formlogin=true">账户登录</li>
                <li :class="{on:!formlogin}" @click="formlogin=false">扫码登录</li>
            </ul>
        </div>
        <div class="bd">
            <section class="formlogin" v-show="formlogin">
                <form action="">
                    <PasswordHide></PasswordHide>
                    <input type="hidden" name="userType" value="2" />
                    <a-form-item label="" :wrapper-col="{ span: 24 }" class="mt-20">
                        <a-input placeholder="请输入手机号/用户名" maxlength="18" v-model="userLoginName" v-validate="'required'" 
                            autocomplete="new-password" name="userLoginName"/>
                    </a-form-item>
                    <a-form-item label="" :wrapper-col="{ span: 24 }">
                        <a-input placeholder="请输入您的登录密码" maxlength="20" type="password" v-model="userPassword" v-validate="'required|min:6'"  name="userPassword" @keyup.enter="handleSubmit"/>
                    </a-form-item>
                    <a-form-item label="" :wrapper-col="{ span: 16 }" v-if="captchaneed">
                        <a-input placeholder="图形验证码" maxlength="5"  v-validate="'required|alpha_num|min:5'" name="captcha" v-model="captcha"/>
                        <img class="captcha" :src="captchaUrl"  alt="验证码" @click="refreshCaptcha">
                    </a-form-item>
                    <div class="clearfix">
                        <a-checkbox :checked="isSaveUserName" @change="handleChange" class="pull-left">记住用户名</a-checkbox>
                        <a class="text-primary pull-right" href="/secure/findPwd">忘记密码</a>
                    </div>
                    <Errortip v-show="errors.any()" :msg="errors.all()[0]"></Errortip>
                    <a-form-item class="mt-10">
                        <a-button type="primary" html-type="button" block :class="['ant-btn-submit',disabledLogin?'disabled':'']" @click="handleSubmit" :disabled="disabledLogin"><a-spin size="small" v-if="disabledLogin"/>&nbsp;安全登录&nbsp;</a-button>
                    </a-form-item>
                </form>
            </section>
            <section class="qrcodelogin"  v-show="!formlogin">
                <div v-show="!scanFlag">
                    <div class="qrcodediv">
                        <img alt="" :src="qrcodeUrl">
                        <div class="invalid" v-show="qrcodeInvalid">
                            <p>二维码已失效</p>
                            <a class="btn btn-primary mt-15" href="javascript:;" @click="refreshQrcode">刷新</a>
                        </div>
                    </div>
                    <div class="qrcodedesc mt-15">打开<router-link class="text-primary" to="/spa/static/downapp" target="_blank">亿钱贷APP</router-link> 扫描二维码</div>
                    <div class="qrcodetip mt-30"><img alt="" src="@/assets/images/access/qrcodetip.png"></div>
                </div>
                <div v-show="scanFlag">
                    <div class="pt-30"><i class="icon-font icon-right1"></i></div>
                    <h2 class="mt-25">扫描成功</h2>
                    <div class="qrcodedesc mt-20">请在手机上 确认登录</div>
                    <div class="qrcodetip mt-30"><img alt="" src="@/assets/images/access/qrcodetip.png"></div>
                </div>
            </section>
        </div>
        <div class="otherlogin">
            <router-link class="text-primary" to="/spa/secure/register">注册新用户</router-link>
        </div>
    </div>    
</template>

<script>
import {setMaxDigits, RSAKeyPair, encryptedString} from '@/utils/safe'
import {mapState} from 'vuex'
import PasswordHide from '@/components/common/PasswordHide'
import '@/utils/validate'
import Errortip from '@/components/common/Errortip'
import  { Validator } from "vee-validate";
import {toJson} from  '@/utils/utils'

Validator.localize({
    zh_CN: {
        attributes: {
            userLoginName: "手机号/用户名",
            userPassword: "登录密码",
            captcha:'图形验证码',
        }
    }
})

let captchaUrl,qrcodeUrl;
let modulus,exponent,bannerUrl;
export default {
    props:{
        ifGetBanner:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        PasswordHide,
        Errortip,
    },
    data() {
        return {
            disabledLogin:false,
            publicKeyMap:false,
            form: this.$form.createForm(this),
            formlogin:true,  //是否账户登录
            captchaneed:false,  //是否显示图形码
            scanFlag:false, //扫描成功
            qrcodeInvalid:false, //二维码失效
            captchaUrl:this.baseUrl+'txjcaptcha.svl', //图形码URL
            qrcodeUrl:this.baseUrl+'secure/login/qrcode', //二维码URL
            errorInfo:'', //表单错误提示
            scanTimeout:true,
            isSaveUserName:false, //是否保存用户名
            userLoginName:'',
            userPassword:'',
            captcha:'',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo
            },
        }
    },
    mounted() {
        this.setUserName()
        captchaUrl=this.captchaUrl
        qrcodeUrl=this.qrcodeUrl
        this.scan()
    },
    created() {
        this.$post('/secure/login/ras').then(res => {
            modulus = toJson(res).jsonData.ras.modulus
            exponent = toJson(res).jsonData.ras.exponent
            if(this.ifGetBanner && toJson(res).jsonData.imgUrl)this.$emit('getBannerUrl',toJson(res).jsonData.imgUrl);
        })
    },
    methods: {
        refreshCaptcha(){//刷新二维码
            this.captchaUrl=captchaUrl+"?"+Math.random();
        },
        refreshQrcode(){//刷新扫描码
            this.qrcodeUrl=qrcodeUrl+"?"+Math.random();
            this.qrcodeInvalid=false;
            this.scan();
        },
        invalidQrcode(){//二维码失效
            this.scanFlag=false;
            this.qrcodeInvalid=true;
        },
        scanSuccess(){//二维码扫描成功
            this.scanFlag=true;
        },
        scan(){
            var self=this;
            if(self.scanTimeout){
                self.scanTimeout=false
                self.$post('/secure/login/scan',{},{timeout:35000}).then(res=>{
                    let data = toJson(res)
                    console.log("[scan success]"+JSON.stringify(data))
                    if(data.code == '1'){//扫码登录成功
                        self.scanSuccess()
                        self.loginSuccess();
                        return;
                    }if(data.code == '0'){//已经扫码,继续扫描直至确认登录
                        self.scanTimeout = true;
                        self.scanSuccess()
                    }if(data.code == '-1'){
                        self.invalidQrcode();
                        self.scanTimeout = true;
                        return;
                    }else{//登录失败
                        self.scanTimeout = true;
                        setTimeout(()=>{self.scan()},1500)
                    }
                }).catch(function (error) {
                    self.scanTimeout = true
                    console.log('[scan error]'+JSON.stringify(error))
                    setTimeout(()=>{self.scan()},35000)
                })
            }
        },
        handleSubmit() {
            var self=this
            self.$validator.validateAll().then((result) => {
                if(this.isSaveUserName){
                    window.localStorage.userLoginName=self.userLoginName    
                    window.localStorage.isSaveUserName=true
                }else{
                    window.localStorage.userLoginName=''    
                    window.localStorage.isSaveUserName=false
                }
                this.confirmLoading = true;
                if(result){
                    setMaxDigits(130)
                    let key = new RSAKeyPair(exponent, "", modulus)
                    let pwd = encryptedString(key, this.userPassword)
                    if(pwd){
                        this.disabledLogin=true
                        this.$post('/secure/login/ajax',{userLoginName:self.userLoginName,userPassword: pwd,captcha:self.captcha}).then(res => {
                            let result=toJson(res);
                            this.disabledLogin=false
                            if(result.successed){
                                self.loginSuccess();
                            }else{
                                self.$layer.msg(result.message);
                                self.captchaneed=result.captchaneed
                                if(self.captchaneed) self.refreshCaptcha();
                            }
                        })
                    }
                } else {
                    //this.$message.error(this.errors.all()[0]);
                }
            })
        },
        loginSuccess(){
            console.log('[warn] loginSuccess')
            this.$emit('loginSuccess');
        },
        setUserName(){
            if(window.localStorage&&window.localStorage.userLoginName){
                this.isSaveUserName=(window.localStorage.isSaveUserName=='true')
                this.userLoginName=window.localStorage.userLoginName
            }
        },
        handleChange(){
            this.isSaveUserName=!this.isSaveUserName
        },
    },
    computed: {
        ...mapState(['loginInfo'])
    },
 }

</script>

<style scoped>
@import "~@/assets/style/access.less";
.m-access-form.loginform{width:440px;}
.m-access-form.loginform .hd{padding-left:50px;padding-right:50px;position:relative;}
.m-access-form.loginform .hd ul{padding:0 10px;border-bottom:1px solid #d2d2d2;}
.m-access-form.loginform .hd li{position:relative;float:left;width:50%;text-align:center;line-height:40px;font-size:16px;color:#666;cursor:pointer;}
.m-access-form.loginform .hd li:hover{color:#3961cd;}
.m-access-form.loginform .hd li.on{color:#3961cd;font-weight:700;}
.m-access-form.loginform .hd li.on:before{display:block;content:'';height:2px;width:100%;position:absolute;left:0;bottom:-1px;background:#3961cd;}
.m-access-form.loginform .bd .qrcodelogin{text-align:center;padding-top:40px;height:300px;}
.m-access-form.loginform .bd .qrcodediv{position:relative;width:150px;height:150px;margin:0 auto;}
.m-access-form.loginform .bd .qrcodediv img{width:100%;height:100%;}
.m-access-form.loginform .bd .qrcodediv .invalid{position:absolute;left:0;top:0;width:100%;height:100%;background:url(./../../assets/images/access/backdrop.png) repeat;}
.m-access-form.loginform .bd .qrcodediv .invalid p{color:#fff;padding-top:45px;line-height:1;}
.m-access-form.loginform .bd .qrcodediv .invalid .btn{width:70px;line-height:30px;height:30px;padding:0;text-align:center;border-radius:10px;}
.m-access-form.loginform .bd .qrcodedesc{color:#999;line-height:20px;}
.m-access-form.loginform .bd .qrcodetip{margin-bottom:-10px;}
.m-access-form.loginform .qrcodelogin h2{font-size:18px;line-height:20px;}
.m-access-form.loginform .qrcodelogin .icon-right1{font-size:70px;line-height:1;display:inline-block;color:#2c8f0e;font-weight:700;}
.m-access-form.loginform .otherlogin{position:relative;padding:0 48px;text-align:right;line-height:70px;}
.m-access-form.loginform .otherlogin .otherlink{position:absolute;left:48px;top:0;cursor:pointer;display:inline-block;color:#666;text-decoration:none;}
.m-access-form.loginform .otherlogin .otherlink img{height: 22px;}
.m-access-form.loginform .captcha{position: absolute;left:250px;top:50%;height:40px;width:90px;margin-top:-18px;}
</style>
