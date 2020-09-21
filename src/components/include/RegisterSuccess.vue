<template>
<div class="bgmain" style="min-height:100vh;">
    <Header :pageInfo="pageInfo"></Header> 
    <div class="bgmain pt-30 pb-30">
        <div class="m-success">
            <div class="hd registerhd">
                <i class="icon-font icon-right1"></i>
                <div class="info">
                    <h2>恭喜您注册成功！</h2>
                    <p><span class="text-danger">888元</span>新手红包，已发放到您的账户中，<router-link to="/spa/member/voucher" class="text-primary">请查看</router-link></p>
                </div>
            </div>
            <div class="bd">
                <div class="deposit mt-10">
                    <a class="btn btn-info btn-deposit" href="/member/depository/form">开通存管账户</a>
                </div>
                <div class="text-r l20 mt-10"><router-link to="/spa" class="text-second">暂时跳过,回到首页</router-link></div>
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
export default {
    components:{
        Header,
        LoginFooter,
    },
    data() { 
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                ifAccess:true
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
@import "~@/assets/style/access.less";
</style>