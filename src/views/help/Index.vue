<template>
    <div class="bgmain">
        <Header :pageInfo="pageInfo"></Header> 
        <div class="m-help">
            <div class="banner">
                <div class="bd wp">
                    <h2>欢迎使用亿钱贷帮助中心</h2>
                    <div class="searchinput mt-15">
                        <input type="text" class="input-text" placeholder="请输入问题关键词" v-model="keyword" autocomplete="off" @keyup.enter="searchHelp">
                        <button type="button" class="btn btn-warning btn-search" @click="searchHelp"><i class="icon-font icon-question1"></i>搜索</button>
                    </div>
                    <div class="keyword mt-10">
                        <em @click="selKeyword('债权转让')">债权转让</em>
                        <em @click="selKeyword('充值')">充值</em>
                        <em @click="selKeyword('提现')">提现</em>
                        <em @click="selKeyword('银行存管')">银行存管</em>
                    </div>
                </div>
            </div>
            <div class="wp pb-30">
                <div class="m-help-template mt-30">
                    <div class="hd">热点问题</div>
                    <div class="bd">
                        <ul class="faqs clearfix">
                            <li v-for="(faq,index) in faqs" :key="'faq'+index">
                                <router-link :to="'/spa/help/question?faqId='+faq.faqId+'&faqType='+faq.faqType">{{faq.faqQuestion}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="m-help-template mt-30">
                    <div class="hd">自助服务</div>
                    <div class="bd">
                        <ul class="selfhelp clearfix">
                            <li><router-link to="/spa/secure/login">
                                <i class="icon-font icon-lock2"></i>
                                <p>登录</p>
                            </router-link></li>
                            <li><router-link to="/spa/secure/register">
                                <i class="icon-font icon-new-member_"></i>
                                <p>新手注册</p>
                            </router-link></li>
                            <li><router-link to="/secure/findPwd">
                                <i class="icon-font icon-rules"></i>
                                <p>找回密码</p>
                            </router-link></li>
                            <li><router-link to="/spa/member/account/recharge">
                                <i class="icon-font icon-withdraw1"></i>
                                <p>账户充值</p>
                            </router-link></li>
                            <li><router-link to="/spa/about/deposit" v-if="!pageInfo.loginInfo.isLogin">
                                    <i class="icon-font icon-mymy"></i>
                                    <p>银行存管</p>
                                </router-link>
                                <router-link to="/member/depository/form" v-else-if="pageInfo.loginInfo.isDepositary">
                                    <i class="icon-font icon-mymy"></i>
                                    <p>银行存管</p>
                                </router-link>
                                <router-link to="/member/depository/form" v-else>
                                    <i class="icon-font icon-mymy"></i>
                                    <p>银行存管</p>
                                </router-link></li>
                            <li><router-link to="/spa/static/wechat">
                                <i class="icon-font icon-weixin1"></i>
                                <p>绑定微信</p>
                            </router-link></li>
                            <li><a href="javascript:void(0)" @click="changeYJModal(true)">
                                <i class="icon-font icon-feedback"></i>
                                <p>我要留言</p>
                            </a></li>
                        </ul>
                    </div>
                </div>
                <div class="m-help-template mt-30">
                    <div class="hd">常见问题</div>
                    <div class="bd">
                        <!-- <ul class="problems clearfix">
                            <li v-for="(type,index) in types" :key="'type'+index">
                                <router-link :to="'/spa/help/question?faqType='+type.typeId">{{type.typeName}}</router-link>
                            </li>
                        </ul> -->
                        <ul class="commons">
                            <li><router-link to="/spa/help/question?faqType=f94233ecc88044069f7b285b7fc19f8d" tag="h3">新手必读</router-link>
                                <p class="mt-15">
                                    <router-link to="/spa/help/question?faqId=70ca52a482984bbfa26a728782f7d5ae&faqType=f94233ecc88044069f7b285b7fc19f8d">亿钱贷简介</router-link>
                                    <span class="split">|</span>
                                    <router-link to="/spa/help/question?faqId=3af21f35136c4882a89a77a2c92f7fb8&faqType=f94233ecc88044069f7b285b7fc19f8d">平台优势</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=ec3e803f0e1648438ea1d2879da3b17e&faqType=f94233ecc88044069f7b285b7fc19f8d">新手活动</router-link>
                                    <span class="split">|</span>
                                    <router-link to="/spa/help/question?faqId=701a512b582b4d1b8f224fee87682daa&faqType=f94233ecc88044069f7b285b7fc19f8d">如何获取多渠道服务</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=d87674ede89c450cabaca9bf22bb4c09&faqType=f94233ecc88044069f7b285b7fc19f8d">用户名如何修改</router-link>
                                </p>
                            </li>
                            <li><router-link to="/spa/help/question?faqType=a3acf878fda746ba8bc0b29b6a784d4b" tag="h3">注册登录</router-link>
                                <p class="mt-15">
                                    <router-link to="/spa/help/question?faqId=404c8859a739426bbcfac24c2ec58415&faqType=a3acf878fda746ba8bc0b29b6a784d4b">如何注册亿钱贷账户</router-link>
                                    <span class="split">|</span>
                                    <router-link to="/spa/help/question?faqId=20297f57afca4794b3861b6104c2bd1f&faqType=a3acf878fda746ba8bc0b29b6a784d4b">注册时收不到验证码怎么办</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=c68cc387245347e8a2ceeb2679bf52a9&faqType=a3acf878fda746ba8bc0b29b6a784d4b">手机号已被注册怎么办</router-link>
                                    <span class="split">|</span>
                                    <router-link to="/spa/help/question?faqId=ba3d37504ecf434bbc3d684a0f40bcb8&faqType=a3acf878fda746ba8bc0b29b6a784d4b">如何修改登录密码？</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=360dea6571f9471abbcbd0da6a91a9d4&faqType=a3acf878fda746ba8bc0b29b6a784d4b">忘记登录密码如何处理</router-link>
                                </p>
                            </li>
                            <li><router-link to="/spa/help/question?faqType=fa68e12ded6b4ce7b52aaf0151589401" tag="h3">银行存管</router-link>
                                <p class="mt-15">
                                    <router-link to="/spa/help/question?faqId=ac7382250f244d28a6cd68258df05c98&faqType=fa68e12ded6b4ce7b52aaf0151589401">为什么要接入银行存管</router-link>
                                    <span class="split">|</span>
                                    <router-link to="/spa/help/question?faqId=0a6e553d10ca4b9cbe52237886587e2c&faqType=fa68e12ded6b4ce7b52aaf0151589401">银行存管有什么好处</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=ca943599c892430bb2b55c926356aac0&faqType=fa68e12ded6b4ce7b52aaf0151589401">为什么选择新网银行</router-link>
                                    <br>
                                    <router-link to="/spa/help/question?faqId=a57207ff2b0d4479a1fc825dcf10e971&faqType=fa68e12ded6b4ce7b52aaf0151589401">新网银行如何保障亿钱贷出借人的资金与交易安全</router-link>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="m-help-template mt-30">
                    <div class="hd">联系我们</div>
                    <div class="bd">
                        <ul class="contacts">
                            <li><h3>客户服务</h3>
                                <p class="mt-15">咨询/投诉/举报/联系电话：400-090-9968<br>
                                工作时间：周一至周五 9:00-18:00<br>
                                客服邮箱：kefu@yiqiandai.com<br>
                                QQ群：984531702<br>
                                微信公众号：yiqiandai</p>
                            </li>
                            <li><h3>媒体关系</h3>
                                <p class="mt-15">联系人：陈小姐<br>
                                联系方式：chenmei@yiqiandai.com</p>
                            </li>
                            <li><h3>市场合作</h3>
                                <p class="mt-15">联系人：袁先生<br>
                                联系方式：yuanming@yiqiandai.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer>
        <Yijian :ifShowModal="ifShowModal" :pageInfo="pageInfo" @changeYJModal="changeYJModal"></Yijian>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import Yijian from '@/components/layer/Yijian'
import {toJson} from '@/utils/utils'

export default {
    components:{
        Header,
        Footer,
        Yijian,
    },
    data() {
        return {
            ifShowModal:false,
            keyword:'',
            types:[],
            faqs:[],
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    methods:{
        changeYJModal(flag) {
            this.ifShowModal = flag
        }, 
        initTypes(){
            this.$post('/help/index').then((res)=>{
                this.types=toJson(res).types
                this.faqs=toJson(res).faqs
            })
        },
        selKeyword(keyword){
            this.keyword=keyword;
            this.searchHelp();
        },
        searchHelp(){
            if(this.keyword){
                this.$router.push('/spa/help/question?keyword='+this.keyword)
            }else{
                this.$layer.msg('请输入问题关键词')
            }
        }
    },
    mounted(){
        this.initTypes()
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/help.less";
</style>