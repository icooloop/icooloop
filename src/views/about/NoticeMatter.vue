<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content ma-notice notice_matter">
                <section class="ma-notice-matter pdabout" >
                    <div class="atitle">重大事项</div>
                    <div class="mn">	
                        <table class="table datatable">
                            <tr><td>减资、合并、分立、解散或者申请破产</td><td width="80">无</td></tr>
                            <tr><td>破产程序</td><td>无</td></tr>
                            <tr><td>停业、整顿、关闭</td><td>无</td></tr>
                            <tr><td>从业机构受到刑事处罚</td><td>无</td></tr>
                            <tr><td>从业机构受到重大行政处罚</td><td>无</td></tr>
                            <tr><td>重大诉讼或者仲裁事项</td><td>无</td></tr>
                            <tr><td>法定代表人、实际控制人与控股股东、董事、监事、高级管理人员涉及的重大诉讼或者仲裁事项或重大行政处罚</td><td>无</td></tr>
                            <tr><td>主要或全部业务陷入停顿</td><td>无</td></tr>
                            <tr><td>欺诈、损害出借人利益等其他重大事项</td><td>无</td></tr>
                            <tr><td>公司是否涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</td><td>无</td></tr>
                        </table>
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
                {name:'审核信息',link:'/spa/about/notice/examine'},
                {name:'重大事项',link:'/spa/about/notice/matter',onClass:true},
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
.ma-notice-matter .datatable td{padding:20px 35px;line-height:26px;font-size:16px;border:1px solid #ccc;}
.ma-notice-matter .datatable tr:nth-child(2n){background:#f7f9ff;}
.ma-notice-matter .datatable tr td:nth-child(2){text-align:center;}
</style>