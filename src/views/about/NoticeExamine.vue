<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content ma-notice notice_examine">
            <section class="ma-notice-examine pdabout" >
                <div class="wp">
                    <div class="atitle">审核信息</div>
                    <div class="text-c bd">
                        <img src="@/assets/images/about/notice/examine.png">
                        <a href="/public/pdf/Important-report-2018.pdf" target="_blank" class="desc desc1">审核报告已出具</a>
                        <a href="/public/pdf/Hegui-report-2018.pdf" target="_blank" class="desc desc2">审查报告已出具</a>
                        <a href="/public/pdf/Audit-report-2018.pdf" target="_blank" class="desc desc3">审计报告已出具</a>
                    </div>
                </div>
            </section>
        </div>
        </div>
    </div>     
    <Signname></Signname>
    <Footer :pageInfo="pageInfo"></Footer> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import AboutMenu from '@/components/about/AboutMenu'
import Signname from '@/components/about/Signname'
import AboutSide from '@/components/about/AboutSide'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        AboutSide,
        Signname
    },
    data() {
        return {
            sideMenus:[
                {name:'审核信息',link:'/spa/about/notice/examine',onClass:true},
                {name:'重大事项',link:'/spa/about/notice/matter'},
                {name:'平台公告',link:'/spa/about/notice/notice'},
                {name:'行业资讯',link:'/spa/about/notice/news'},
                {name:'资费说明',link:'/spa/about/notice/explain'}
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/notice',
                naverOn:'nav_about',
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
@import "~@/assets/style/about.less";
.ma-notice-examine{background:#fff;}
.ma-notice-examine .bd{position:relative;}
.ma-notice-examine .bd .desc{position:absolute;left:0;top:267px;line-height:30px;width:340px;padding:10px;font-size:16px;background:#fff;}
.ma-notice-examine .bd a.desc{text-decoration:underline;color:#3961cd;}
.ma-notice-examine .bd .desc1{left:20px;}
.ma-notice-examine .bd .desc2{left:420px;}
.ma-notice-examine .bd .desc3{left:820px;}
</style>