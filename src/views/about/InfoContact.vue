<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content">
                <section class="ma-info-contact">
                    <baidu-map class="map" :center="center" :zoom="zoom">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                            <bm-label :content="company" :position="center" :labelStyle="label" :title="company"/>
                        </bm-marker>
                    </baidu-map>
                    <div class="wp">
                        <div class="address mt-50">
                            <h4>通讯地址</h4>
                            <p>公司地址：深圳市福田区福保街道菩提路228号 益田花园 D区28栋二楼</p>
                            <p>电话号码：0755-82550710</p>
                            <p>邮政编码：518000</p>
                        </div>
                        <ul class="services clearfix">
                            <li><i class="icon-font icon-contractx"></i>
                                <h4>客户服务</h4>
                                <p>咨询/投诉/举报/联系电话：400-090-9968<br>
                                工作时间：周一至周五 9:00-18:00<br>
                                客服邮箱：kefu@yiqiandai.com<br>
                                QQ群：984531702<br>
                                微信公众号：yiqiandai</p>
                            </li>
                            <li><i class="icon-font icon-mediax"></i>
                                <h4>媒体关系</h4>
                                <p>联系人：陈先生<br>
                                联系方式：chenwn@yiqiandai.com</p>
                            </li>
                            <li><i class="icon-font icon-coperatex"></i>
                                <h4>市场合作</h4>
                                <p>联系人：黄先生<br>
                                联系方式：market@yiqiandai.com</p>
                            </li>
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

import Vue from 'vue'
import BMap from 'vue-baidu-map'
Vue.use(BMap,{ak:'nplDeGOKbQZ8pSsQ68yBXhap'})

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
            company:'深圳市亿钱贷电子商务有限公司',
            center: {lng:114.063657, lat:22.517879},
            zoom: 18,
            label:{
                borderRadius : "10px",
                textAlign : "center",
                color : "white",
                fontSize : "16px",
                lineHeight : "18px",
                fontFamily:"微软雅黑",	
                padding: "12px 30px",
                background: "rgba(34,97,201,.8)",
                border:"rgba(34,97,201,.8)",
                marginLeft:'-140px',
                marginTop:'-50px',
            },
            sideMenus:[
                {name:'公司简介',link:'/spa/about/info/intro'},
                {name:'平台信息',link:'/spa/about/info/platform'},
                {name:'组织架构',link:'/spa/about/info/org'},
                {name:'管理团队',link:'/spa/about/info/team'},
                {name:'合作机构',link:'/spa/about/info/partner'},
                {name:'联系我们',link:'/spa/about/info/contact',onClass:true},
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
    methods: {

    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-info-contact .map{height:440px;width:100%;}
.ma-info-contact .address{background:#f9f9f9;padding:40px 45px;margin-bottom:140px;}
.ma-info-contact .address h4{font-size:24px;font-weight:700;line-height:30px;padding-bottom:10px;}
.ma-info-contact .address p{line-height:26px;color:#555;font-size: 16px;}

.ma-info-contact .services li{float:left;width:380px;margin:0 10px;background:#f2f8ff;padding:25px 20px 25px 30px;height:205px;position:relative;}
.ma-info-contact .services h4{font-size:18px;line-height:30px;}
.ma-info-contact .services p{line-height:25px;}
.ma-info-contact .services .icon-font{display:inline-block;text-align:center;background:#f2f8ff;width:150px;line-height:50px;font-size:40px;padding-top:25px;
    color:#2261c9;position:absolute;left:50%;margin-left:-75px;top:-75px;border-radius:150px 150px 0 0;} 
</style>
