<template>
  <div class="g-header">
      <section class="m-toper">
        <div class="wp clearfix">
            <div class="hotline">
                <img class="mr-5" src="@/assets/images/other/topPhone.png">
                <span class="mr-15">客服热线 400-090-9968 （工作日 09:00-18:00）</span>
            </div>
            <div class="careus" v-show="pageInfo.loginInfo.userType==1 || pageInfo.loginInfo.userType==2">
                <div class="careitem"><i class="icon-font icon-weixin2 careicon"></i>
                    <div class="icontip"><img src="@/assets/images/fwcode.png" class="mainpic">
                        <p>亿钱贷公众号</p>
                    </div>
                </div>
                <div class="careitem careitem2"><router-link to="/spa/static/downapp" target="_blank"><i class="icon-font icon-app2 careicon"></i></router-link>
                    <div class="icontip"><img src="@/assets/images/appcode.png" class="mainpic">
                        <p>亿钱贷手机APP</p>
                    </div>
                </div>
            </div>
            <div class="nav" v-if='!pageInfo.loginInfo.isLogin'>
                <router-link to="/spa/secure/login" class="text-default">登录</router-link>
                <router-link to="/spa/secure/register" class="text-default">注册</router-link>
                <router-link to="/spa/shop/index" class="text-default"><i class="icon-font icon-shopcart text-warning"></i> 购物车</router-link>
                <router-link to="/spa/help/index" class="text-default">帮助中心</router-link>
            </div>
             <div class="nav" v-else>
                <router-link to="/spa/member/account/index" class="text-default">您好，{{pageInfo.loginInfo.nickName}}</router-link>
                <router-link to="/spa/shop/index" class="text-default"><i class="icon-font icon-shopcart text-warning"></i> 购物车 <span v-if="pageInfo.loginInfo.itemCount" class="text-warning">{{pageInfo.loginInfo.itemCount}}</span></router-link>
                <router-link to="/spa/help/index" class="text-default" v-show="pageInfo.loginInfo.userType==1 || pageInfo.loginInfo.userType==2">帮助中心</router-link>
                <a href="javascript:;" class="text-default" @click="logout">安全退出</a>
             </div>
        </div>
      </section> 
      <section class="m-nav">
          <div class="bd wp">
              <div class="logo">
                  <router-link to="/"><img src="@/assets/images/logo2019.png"></router-link>
              </div>
              <ul class="nav" v-show="pageInfo.loginInfo.userType==1 || pageInfo.loginInfo.userType==2">
                  <li :class="{on:pageInfo.naverOn=='nav_index'}"><router-link to="/">首页</router-link></li>
                  <li :class="{on:pageInfo.naverOn=='nav_bid'}"><router-link to="/spa/transfer/index">我要出借</router-link><i class="icon-font icon-bottom"></i>
                      <ul class="subnav">
                          <li><router-link to="/spa/plan/index"><span>易智投</span></router-link></li>
                          <li><router-link to="/spa/product/index"><span>散标出借<span v-if="pageInfo.loginInfo.loanCount && pageInfo.loginInfo.loanCount>0">({{pageInfo.loginInfo.loanCount}})</span></span></router-link></li>
                          <li><router-link to="/spa/transfer/index"><span>债权转让</span></router-link></li>
                          <li v-if="pageInfo.loginInfo.vipStatus && pageInfo.loginInfo.vipStatus==1"><router-link to="/spa/product/vip"><span>VIP专区</span></router-link></li>
                      </ul>
                  </li>
                  <li :class="{on:pageInfo.naverOn=='nav_about'}"><router-link to="/spa/about/hegui">信息披露</router-link></li>
                  <li :class="{myaccount:true,on:pageInfo.naverOn=='nav_user'}">
                      <i class="icon-font icon-admin"></i>
                      <router-link to="/spa/member/account/index">我的账户</router-link>
                      <i class="icon-font icon-bottom"></i>
                      <ul class="account-list">
                          <li v-for="user in userList" :key="user.link"><router-link :to="user.link"><span>{{user.name}}</span><span class="dot" v-if="user.dot">●</span></router-link></li>
                      </ul>
                  </li>
              </ul>
          </div>
        </section> 
    </div>
</template>

<script>
import {toJson} from  '@/utils/utils'
export default {
    props:['pageInfo'],
    data() {
        return {
            userList:[
              {name:'账户总览',link:'/spa/member/account/index'},
              {name:'易智投',link:'/spa/member/invest/autobid'},
              {name:'散标资产',link:'/spa/member/invest/holdlist'},
              {name:'回款计划',link:'/spa/member/invest/backplan'},
              {name:'账户充值',link:'/spa/member/account/recharge'},
              {name:'账户提现',link:'/spa/member/account/cash'},
              {name:'交易流水',link:'/spa/member/deal/index'},
              {name:'任务中心',link:'/spa/member/task'},
              {name:'优惠券',link:'/spa/member/voucher',dot:this.pageInfo.loginInfo.voucherFlag},
              {name:'推荐奖励',link:'/spa/member/recommend'},
              {name:'账户设置',link:'/spa/member/secure/security'},
            ],
        }
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
                        if(this.$route.name=='secure-login') this.$router.push('/spa/member/account/index')
                        if(this.$route.name=='product-vip' && this.pageInfo.loginInfo.vipStatus!=1) this.$router.push('/spa/product/index')
                    } else if(this.$route.meta.auth){
                        this.$router.push('/spa/secure/login?callbackUrl='+this.$route.path)
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
.m-toper .careus{float:left;position:relative;display: inline-block;font-size:12px;color: #333;width:120px;height:36px;padding-right:80px;}
.m-toper .careitem{position:relative;display: inline-block;position:absolute;left:0;top:9px;line-height:1;}
.m-toper .careitem2{left:30px;}
.m-toper .careicon{position:relative;display: inline-block;}
.m-toper .careitem .icon-font{font-size:18px;display:inline-block;cursor:pointer;line-height:1;color:#333;}
.m-toper .careitem .icon-font:hover{color:#3961cd;}
.m-toper .careitem .icon-weixin2:hover{color:#4cc955;}
.m-toper .careitem:hover .icontip{display:block;}
.m-toper .careitem .icontip{display:none;position:absolute;left:-55px;top:36px;z-index:10;padding:14px;border: 1px solid #ddd;background: #fff;border-radius:5px;}
.m-toper .icontip .mainpic{width:100px;height:100px;}
.m-toper .icontip p{line-height:1;font-size:14px;color:#666;text-align:center;padding-top:8px;width:100px;}
.m-toper .icontip:before,.m-toper .icontip:after{display: block;content: '';position: absolute;width: 0;height: 0;border-color:transparent;border-style: dashed;*overflow: hidden;}
.m-toper .icontip:before {left:50%;border-bottom-color: #ddd;border-width: 9px;top: -18px;border-bottom-style: solid;margin-left:-9px;}
.m-toper .icontip:after {left:50%;border-bottom-color: #fff;border-width: 8px;top: -16px;border-bottom-style: solid;margin-left:-8px;}
.m-toper .nav{position: absolute;right:0;top:0;}
.m-toper .nav a{margin-left:15px;}
.m-toper .nav a:hover{text-decoration:underline;}

.m-nav{position:relative;line-height:70px;height:70px;background:#fff;z-index:20;}
.m-nav .bd{position:relative;}
.m-nav .logo{position: absolute;left:0;top:0;}
.m-nav .logo img{height:44px;}
.m-nav .nav{position:absolute;right:0;top:0;}
.m-nav .nav li{position:relative; float:left;line-height: 70px;margin-left: 38px;}
.m-nav .nav li a{position:relative;display:inline-block;color: #666666;font-size: 18px;line-height: 35px;}
.m-nav .nav li a .dot-new{position:absolute;right:-10px;top:-2px;color:#f00;font-size:16px;line-height:1;display:none;}
.m-nav .nav>li>a:before{content: '';display: block;position: absolute;bottom: -3px;left: 0;height: 3px;width: 0;background: #3961cd;transform: scale3d(0, 1, 1);transition: transform 0.1s;}
.m-nav .nav>li.on>a:before,.m-nav .nav>li:hover>a:before {transform: scale3d(1, 1, 1);transition-duration: 0.5s;width: 100%;}
.m-nav .nav li a:hover,.m-nav .nav li.on a{border-color: #3961cd;color: #3961cd;text-decoration:none}
.m-nav .nav li .icon-bottom{transition: all 0.4s ease;display:inline-block;}
.m-nav .nav li:hover .icon-bottom{transform: rotate(180deg);}
.m-nav .nav li .icon-hot{position: absolute; right: -24px; top: 17px; color: red; font-size: 12px; line-height: 1;}
.m-nav .nav li.myaccount{position: relative;width: 136px;height: 36px;line-height: 28px;border: 1px solid #d7d7d7;padding: 0 0 0 10px;margin: 15px 0 0 38px;cursor: pointer;box-sizing: border-box;}
.m-nav .nav li.myaccount>a:before{display:none;}
.m-nav .nav li.myaccount:hover{background-color: #fff;color: #3961cd;box-shadow: 0 0 8px rgba(0,0,0,.15);}
.m-nav .nav li.myaccount:hover .account-list{display: block;}
.m-nav .nav li.myaccount .icon-admin{color: #f29118;font-size:16px;font-weight: bold;}
.m-nav .nav li.myaccount.on .icon-bottom{color: #999;}
.m-nav .nav li.myaccount a{color: #666;line-height: 36px;border-bottom: none;vertical-align: middle;}
.m-nav .nav li.myaccount a:hover{color: #666;}
.m-nav .nav li.myaccount .account-list{position: absolute;display: none;top: 34px;left: -1px;width: 134px;padding:5px 0;background-color: #fff;border: 1px solid #d7d7d7;border-top:none;box-shadow: 0 6px 6px rgba(30, 30, 30, .2);z-index: 999;text-align: center;}
.m-nav .nav li.myaccount .account-list li{position:relative;line-height: 36px;margin: 0;float: none;}
.m-nav .nav li.myaccount .account-list li a{margin: 0;display: block;line-height: 36px;font-size: 16px;-webkit-transition: color .2s,background-color .2s,border-color .2s;transition: color .2s,background-color .2s,border-color .2s;}
.m-nav .nav li.myaccount .account-list li a:hover{background-color:#e1e2ee;color:#3961cd;}
.m-nav .nav li.myaccount .account-list li .dot{position:absolute;right:15px;top:0;color:#f00;font-size:18px;line-height:32px;}
.m-nav .nav li .subnav{display:none;position:absolute;left:50%;margin-left:-8px;transform:translateX(-50%);padding:5px 0;top:60px;background-color:#fff;border:1px solid #eee;box-shadow:0 0 4px rgba(30,30,30,.2);z-index:999;text-align:center;border-radius:5px;}
.m-nav .nav li:hover .subnav{display:block;}
.m-nav .nav li .subnav li{line-height:36px;margin:0;float:none;}
.m-nav .nav li .subnav li a{margin:0;display:block;padding:0 15px;line-height:36px;font-size:16px;color:#333;border:none;white-space:nowrap;}
.m-nav .nav li .subnav li:hover a{background-color:#e1e2ee;color:#3961cd;}
</style>
