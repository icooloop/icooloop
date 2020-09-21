<template>
    <div>
        <Header :pageInfo="pageInfo"></Header> 
        <div class="g-mainer m-access login-bg" :style="'background:url('+bannerUrl+') no-repeat top center;'">
            <div class="m-access-layer">
                <div class="centerwp">
                    <Login @loginSuccess="loginSuccess" @getBannerUrl="getBannerUrl" :ifGetBanner="true"></Login>
                </div>
            </div>
        </div> 
        <LoginFooter :pageInfo="pageInfo"></LoginFooter> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import LoginFooter from '@/components/include/LoginFooter'
import Login from '@/components/layer/Login'
import defaultBannerUrl from '@/assets/images/access/banner_login.jpg'
import {toJson} from  '@/utils/utils'

let captchaUrl,qrcodeUrl;
export default {
    components:{
        Header,
        LoginFooter,
        Login,
    },
    data() {
        return {
            callbackUrl:'',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo
            },
            bannerUrl:defaultBannerUrl,
            ifLoginSuccess:false,
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    methods:{
        loginSuccess(){           
            this.$post('/member/session').then(res => {
                let result = toJson(res).jsonData
                this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin:true, ifGetInfo: true } , ...result }
                this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                this.toUrl();
            })
        },
        toUrl(){
            let callbackUrl = this.$route.query.callbackUrl
            if(!this.ifLoginSuccess){
                this.ifLoginSuccess = true
                if(callbackUrl){
                    this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo)
                    this.$router.push(callbackUrl)
                }else{
                    this.$router.push("/spa/member/account/index")
                }
            }
        },
        getBannerUrl(bannerUrl){
            this.bannerUrl=bannerUrl
        }
    },
 }
</script>

<style>
.m-access-form.loginform{position:absolute;right:0;top:50px;box-shadow: 0px 0px 12px rgba(60,60,60,.2);}
.m-access-form.loginform .hd{padding-top:40px;}
.m-access-form.loginform .otherlogin{ border-top:1px solid #d9d9d9; background-color: #f7f7f7;}
</style>