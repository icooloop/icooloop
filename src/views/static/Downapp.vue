<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer" >
        <div class="container">
            <a target="_blank" rel="noopener noreferrer" class="ios-download" href="https://itunes.apple.com/cn/app/id1252524817?mt=8"></a>
            <a target="_blank" rel="noopener noreferrer" class="az-download" href="https://www.yiqiandai.com/apk/yqd.apk"></a>
            <!--<div class="desc1">Android应用市场下载：<a target="_blank" rel="noopener noreferrer" href="http://zhushou.360.cn/detail/index/soft_id/3864171" class="underline">360手机助手</a></div>-->
        </div>
    </div>    
    <Footer :pageInfo="pageInfo"></Footer> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'

export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    methods: {

    },
 }
</script>

<style scoped>
.g-mainer{height:572px;background:url(../../assets/images/access/loginbg_app.jpg) no-repeat top center;}
.container{position: relative; width:1200px; margin:0 auto;}
.ios-download{position: absolute; left:50px; top:330px; width:170px; height: 160px; cursor: pointer;} 
.az-download{position: absolute; left:286px; top:330px; width:170px; height: 160px; cursor: pointer;}
.desc1{position: absolute;left:286px;top:510px;line-height:20px;font-size:12px;}
</style>
