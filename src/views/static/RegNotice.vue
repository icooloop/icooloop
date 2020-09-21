<template>
<div class="bgmain" style="min-height:100vh;">
    <div class="g-header">
        <section class="m-nav">
            <div class="bd wp">
                <div class="logo">
                    <a href="javascript:;"><img src="@/assets/images/logo2019.png"></a>
                </div>
            </div>
        </section> 
    </div>
    <div class="md-notice wp mt-60">
        <div class="bd">
            <div class="title">关于亿钱贷暂时关闭注册的公告</div>
            <div class="content pt-30">
                <p>尊敬的亿家人：</p><br>
                <p class="textIndent2">2018年12月6日，深圳市互金协会发布《关于进一步规范网络借贷信息中介行业专项整治期间有关行为的通知》，暂时控制待偿余额不增长，保持出借人总数动态减少。</p>
                <p class="textIndent2">为严格执行该通知，亿钱贷将暂时关闭注册入口。在存量出借人总量有减少的情况下，不定时重新开启注册入口。合规运营是亿钱贷一直以来的坚持，感谢大家的理解与支持。</p>
                <br><br><br><br><br>
                <p class="text-r">亿钱贷运营管理部<br>2018年12月8日</p>
            </div>
        </div>
    </div>
    <div class="g-footer mt-60">
        <section class="m-footer">
            <div class="bd wp">
                <div class="footer-logo"><img src="@/assets/images/logo2019.png" height="50" alt=""></div>
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
        <div class="m-copyright">
            <div class="bd wp">
                <p>© 2018 亿钱贷 | All rights reserved | 深圳市亿钱贷电子商务有限公司 <a href="http://www.miit.gov.cn/" class="keeplink" target="_blank">粤ICP备14041671号-1</a> | 市场有风险，出借需谨慎</p>
            </div>
        </div> 
    </div>
</div>  
</template>

<script>
export default {
    data() { 
        return {

        }
    }
 }
</script>

<style lang="less" scoped>
.m-nav{position:relative;line-height:70px;height:70px;background:#fff;z-index:20;}
.m-nav .bd{position:relative;}
.m-nav .logo{position: absolute;left:0;top:0;}
.m-nav .logo img{height:44px;}

.md-notice{background:#fff;}
.md-notice .bd{padding:60px;}
.md-notice .title{font-size:24px;text-align:center;padding-bottom:40px;border-bottom:1px dashed #c1c1c1;}
.md-notice .content p{line-height:30px;font-size:18px;color:#685a52;}

.m-footer{position:relative;background: #fff;padding-top: 20px;
    .bd{border-bottom: 1px solid #A0A0A0;overflow: hidden;height:160px;position: relative;
        .footer-logo{ position: absolute;left: 0px;top: 35px;}
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

.m-copyright{background: #41332d;color: #fff;text-align:center;line-height:70px;
    .bd{text-align:center;
        a.keeplink{color:#fff;}
        a:hover{text-decoration: underline;}
    }
}
</style>