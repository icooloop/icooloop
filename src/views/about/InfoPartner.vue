<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content">
                <section class="pdabout wp">
                    <div class="atitle">{{pageTitle}}</div>
                    <div class="partnerlist mt-50">
                        <ul class="clearfix" >
                            <li v-for="item in dataList"><a :href="item.newsUrl" target="_blank" rel="noopener noreferrer">
                                <div class="logo"><img :src="item.bannerUrl"></div>
                                <h2>{{item.title}}</h2>
                                <p class="textIndent2">{{item.abstractContent}}</p>
                            </a></li>
                        </ul>
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
import {toJson} from  '@/utils/utils'

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
            pageTitle:'合作机构',
            pageNo:1,
            pageSize:10,
            dataList:[],
            total:0,
            hasPage:false,
            sideMenus:[
                {name:'公司简介',link:'/spa/about/info/intro'},
                {name:'平台信息',link:'/spa/about/info/platform'},
                {name:'组织架构',link:'/spa/about/info/org'},
                {name:'管理团队',link:'/spa/about/info/team'},
                {name:'合作机构',link:'/spa/about/info/partner',onClass:true},
                {name:'联系我们',link:'/spa/about/info/contact'},
            ],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/info',
                naverOn:'nav_about',
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted() {
       this.initData() 
    },
    methods: {
        initData(){
            let _this=this;
            _this.$post('/article/partner/ajList',{pageNo:_this.pageNo,pageSize:_this.pageSize,qType:0})
                .then(function (res) {
                   _this.total= toJson(res).count
                   _this.dataList= toJson(res).data
                })
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-info .partnerlist li{float:left;width:548px;height:400px;background:#fff;margin:0 25px;margin-bottom:40px;border:1px solid #eee;box-shadow:0 0 5px #eee;}
.ma-info .partnerlist li a{color:#333;}
.ma-info .partnerlist li .logo{line-height:90px;padding-top:10px;text-align:center;}
.ma-info .partnerlist li h2{font-size:20px;text-align:center;padding-bottom:20px;line-height:1;padding-top:10px;}
.ma-info .partnerlist li p{line-height:30px;font-size:16px;padding:0 35px;}  
</style>