<template>
    <div class="g-footer">
        <section class="m-footer">
            <div class="bd wp">
                <div class="linklist clearfix">
                    <ul class="item">
                        <li><h4>关于我们</h4></li>
                        <li><router-link to="/spa/about/operate/data">平台数据</router-link></li>
                        <li><router-link to="/spa/about/operate/report">运营报告</router-link></li>
                        <li><router-link to="/spa/about/info/intro">公司简介</router-link></li>
                    </ul>
                    <ul class="item">
                        <li><h4>新手帮助</h4></li>
                        <li><router-link to="/spa/event/novice">新手指引</router-link></li>
                        <li><router-link to="/spa/help/index">帮助中心</router-link></li>
                        <li><router-link to="/spa/about/project1">项目介绍</router-link></li>
                    </ul>
                    <ul class="item">
                        <li><h4>信息披露</h4></li>
                        <li><router-link to="/spa/about/hegui">合规进程</router-link></li>
                        <li><router-link to="/spa/about/riskmanage">风险管理</router-link></li>
                        <li><router-link to="/spa/about/law">出借人教育</router-link></li>
                    </ul>
                </div>
                <ul class="qrcode clearFix">
                    <li>
                        <img src="@/assets/images/fwcode.png">
                        <p>亿钱贷服务号</p>
                    </li>
                    <li>
                        <img src="@/assets/images/code.png">
                        <p>亿钱贷订阅号</p>
                    </li>
                    <li>
                        <img src="@/assets/images/appcode.png">
                        <p>亿钱贷APP</p>
                    </li>
                </ul>
                <div class="phone">
                    <h2>400-090-9968</h2>
                    <h6>咨询时间：周一至周五 09:00-18:00</h6>
                    <h6>邮箱：kefu@yiqiandai.com</h6>
                </div>
            </div>
        </section> 
        <section class="m-copyright">
            <div class="verification icongray">
                <a href="https://search.szfw.org/cert/l/CX20150626010503010627" oncontextmenu="return false;" target='_blank'><img src="@/assets/images/auth/cecdc.png" width="124px" height="47px"></a>
                <a href="https://ss.knet.cn/verifyseal.dll?sn=e15070744030059379xmdx000000&amp;ct=df&amp;a=1&amp;pa=0.7144523948139445" id="kx_verify" tabindex="-1" target="_blank" kx_type="图标式"><img src="https://ss.knet.cn/static/images/logo/cnnic.png" oncontextmenu="return false;" alt="可信网站"></a>
                <a href="https://v.yunaq.com/certificate?domain=www.yiqiandai.com" oncontextmenu="return false;" target="_blank"><img src="@/assets/images/auth/anquan.png"></a>
                <a href="http://szcert.ebs.org.cn/71a0114a-59d9-4a57-9770-74edc3e0dcf4" oncontextmenu="return false;" target="_blank"><img src="@/assets/images/auth/newGovIcon.gif" width="124px" height="47px"></a>
            </div>
            <div class="bd wp">
                <p>{{copyright[0]}}   <a href="http://www.miit.gov.cn/" class="keeplink" target="_blank" rel="noopener noreferrer">{{copyright[1]}}</a></p>
                <p>{{wxTip}}</p>
            </div>
        </section>
        <section class="m-elevator">
            <router-link to="/spa/shop/index" class="elevator shop">
                <i class="icon-font icon-shopcart"></i><img class="cat" src="@/assets/images/main/cat.png" alt="">
                <span class="itemcount" v-if="pageInfo.loginInfo.itemCount">{{pageInfo.loginInfo.itemCount}}</span>
            </router-link>
            <div class="elevator contact" @click="contactCustomer()">
                <i class="icon-font icon-qq2"></i>
            </div>
            <router-link to="/spa/static/downapp" target="_blank" class="elevator app">
                <i class="icon-font icon-phone"></i>
                <div class="app_hover"></div>
            </router-link>
            <div class="elevator calculator" @click="changeYJModal(true)">
                <i class="icon-font icon-feedback"></i>
            </div>
            <a-back-top>
                <div class="elevator">
                    <i class="icon-font icon-top"></i>
                    <em>返回<br/>顶部</em>
                </div>
            </a-back-top>
        </section>
        <Yijian :ifShowModal="ifShowModal" :pageInfo="pageInfo" @changeYJModal="changeYJModal"></Yijian>
  </div>
</template>

<script>
import Vue from 'vue'
import {BackTop} from 'ant-design-vue'
import Yijian from './../layer/Yijian'
Vue.use(BackTop)

export default {
    props:['pageInfo'],
    components:{
        Yijian
    },
    data() {
        return {
            copyright:['© 2019 All Rights Reserved　|　深圳市亿钱贷电子商务有限公司','粤ICP备14041671号-1'],
            wxTip:'亿钱贷温馨提示：市场有风险，出借需谨慎；平台协议约定年化利率仅供参考，不代表未来实际收益',
            ifShowModal:false,
        }
    },
    methods:{
        changeYJModal(flag) {
            this.ifShowModal = flag
        }, 
        contactCustomer(){
            window.open("https://jq.qq.com/?_wv=1027&k=5beGtO3");
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/config.less";
.ant-back-top{position: relative;right:auto;bottom:auto;width:auto;height:auto;}
.m-footer{position:relative;background: #fff;padding-top: 20px;
    .bd{border-bottom: 1px solid #A0A0A0;overflow: hidden;height:160px;position: relative;
        .linklist{padding:15px 25px;
            .item{float:left;width:130px;
                li{line-height:26px;}
                a{color:#666;}
                a:hover{text-decoration:underline;color:#3961cd;}
            }
            h4{font-size:16px;font-weight:700;padding-bottom:10px;margin:0;color:#444;}
        }
        .qrcode{position: absolute;left: 400px;top:12px;min-width:420px;padding:0 20px;border-left:1px dashed #d2d2d2;border-right:1px dashed #d2d2d2;
            li{float: right;text-align: center;font-size: 16px;color: #666666;width: 140px;
                img{width:100px;}
                p{line-height:20px;padding-top:5px;font-size:14px;color:#666;}
            }
        }
        .phone{position: absolute;right: 30px;top: 25px;color: #666666;
            h2{font-size: 34px;line-height:1;padding-bottom:10px;font-weight: normal;letter-spacing:1pt;text-align: right}
            h6{font-size: 16px;line-height:30px;font-weight: normal;text-align: right}
        }
    }
}

.m-copyright{background: #434343;color: #fff;
    .bd{text-align:center;padding:0 0 20px;
        a.keeplink{color:#fff;}
        a:hover{text-decoration: underline;}
    }
    .link{margin:10px 0 0;
        b{margin-right: 20px;}
        a{padding: 0 10px 0 0;margin:0 10px 0 0;border-right: 1px solid #fff;color:#fff}
        a:last-child{border-right:none;}
    }
    .verification{line-height:47px;padding-top:30px;text-align:center;
        a{display:inline-block;margin:0 10px;line-height:47px;}
        img{display: block;}
    }
}


.m-elevator{width: 56px;border-right: none;background-color:#fff;position:fixed;top:50%;margin-top:-100px;border-radius: 5px 0 0 5px;right: 0;z-index: 99999;box-shadow:0 0 10px rgba(250,250,250,.95);
    .elevator{ display: block;width:100%;line-height:56px;height:56px;cursor:pointer;position: relative;text-align:center;transition: background-color 0.2s linear;
        .icon-font{font-size:28px;color:@warning-color;}
        .itemcount{position: absolute;right:1px;top:10px;background:#da3832;color:#fff;line-height:1;padding:2px 5px;border-radius:16px;font-size:12px;}
        .app_hover{display:none;width:191px;height: 178px;background:url(./../../assets/images/main/ewmapp.png) no-repeat top center;}
        em{display:none;}
        .cat{position: absolute;left:0;bottom:50px;}
    }
    .elevator:hover{
        background:@warning-color;
        .icon-font{color:#fff;}
        em{display:block;position:absolute;left:0;top:0;width:100%;height:56px;line-height:20px;padding:8px 0;background:@warning-color;color:#fff;}
        .app_hover{display:block;position:absolute;right:36px;padding-right:15px;top:-56px;}
    }
}

</style>