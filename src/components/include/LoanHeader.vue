<template>
  <div class="g-header">
      <section class="m-toper">
        <div class="wp clearfix">
            <div class="hotline">
                <img class="mr-5" src="@/assets/images/other/topPhone.png">
                <span class="mr-15">客服热线 400-090-9968 （工作日 09:00-18:00）</span>
            </div>
            <div class="nav" v-if='!pageInfo.loginInfo.isLogin'>
                <router-link to="/secure/loan/login" class="text-default">登录</router-link>
                <router-link to="/secure/loan/register" class="text-default">注册</router-link>
            </div>
             <div class="nav" v-else>
                <router-link to="/spa/member/account/index" class="text-default">您好，{{pageInfo.loginInfo.nickName}}</router-link>
                <a href="javascript:;" class="text-default" @click="logout">安全退出</a>
             </div>
        </div>
      </section> 
      <section class="m-nav">
          <div class="bd wp">
              <div class="logo">
                  <router-link to="/"><img src="@/assets/images/logo2019.png"></router-link>
              </div>
          </div>
        </section> 
    </div>
</template>

<script>
import {toJson} from  '@/utils/utils'
export default {
    props:['pageInfo'],
    data() {
        return {}
    },
    created() {
        window.scrollTo(0,0);
        this.getLoginInfo()
    },
    methods:{
        logout(){
            this.$store.commit('removeLoginInfo');
            if(process.env.NODE_ENV== 'development'){
                this.$get('/logout')
                setTimeout(()=>{this.getLoginInfo()},300)
            }else{
                window.location.href="/logout"
            }
        },
        getLoginInfo(){
            //if(!this.pageInfo.loginInfo.ifGetInfo){
                this.$post('/member/session').then(res => {
                    let result = res.jsonData
                    if (result.userType && result.nickName) {
                        this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo, ...{ isLogin: true, ifGetInfo: true }, ...result }
                    } else {
                        let baseLoginInfo = {isLogin: false,voucherFlag: false,nickName: '',userType: 1,loanCount: 0,vipStatus: 0, itemCount:0, ifGetInfo: true}
                        this.pageInfo.loginInfo = { ...this.pageInfo.loginInfo , ...baseLoginInfo , ...result }
                    }
                    this.$store.commit('changeLoginInfo',this.pageInfo.loginInfo);
                })
            //}
        }
    }
}
</script>
<style scoped>
.m-toper{position:relative;line-height:36px;height:36px;border: 1px solid transparent;z-index:70;background:#f1f0ef;}
.m-toper .wp{position: relative;height:36px}
.m-toper .hotline{color:#060001;float:left;}
.m-toper .nav{position: absolute;right:0;top:0;}
.m-toper .nav a{margin-left:15px;}
.m-toper .nav a:hover{text-decoration:underline;}

.m-nav{position:relative;line-height:70px;height:70px;background:#fff;z-index:20;}
.m-nav .bd{position:relative;}
.m-nav .logo{position: absolute;left:0;top:0;}
.m-nav .logo img{height:44px;}
</style>