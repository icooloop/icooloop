<template>
    <div class="automainer">
        <Header :pageInfo="pageInfo"></Header>
        <div class="g-mainer bgmain">
            <div class="md-error error404">
                <div class="bd ">
                    <div class="logo"><img src="@/assets/images/logo.png"></div>
                    <p class="mt-40">抱歉，您访问的页面不存在</p>
                    <p class="mt-30"><router-link class="btn btn-info" to="/spa/">返回首页</router-link></p>
                    <p class="mt-20"><span>{{countDownTxt}}</span>秒之后自动返回首页...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import { setTimeout } from 'timers';
export default {
    components:{
        Header,
        Footer,
    },
    data() { 
        return {
            countDownTxt:5,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.countDown();
    },
    methods:{
        countDown(){
            if (this.countDownTxt > 0) {
                this.countDownTxt-=1;
                console.log(this.countDownTxt)
                setTimeout(()=>{
                    this.countDown();
                },1000);
            } else {
                this.$router.push('/spa/')
            }
        }
    }
 }
</script>

<style scoped>
.md-error{width:730px;margin:60px auto 30px;padding-left:490px;min-height:425px;text-align:center;}
.md-error.error404{background:url(./../../assets/images/error/404.png) no-repeat left center;}
.md-error .logo{padding-top:100px;}
.md-error .btn-info{width:192px;line-height:46px;height:46px;font-size:18px;border-radius:46px;}
.md-error p{line-height:26px;font-size:16px;color:#666;}
</style>