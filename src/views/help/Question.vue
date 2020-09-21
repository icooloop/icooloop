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
            <div class="wp pt-30 pb-30 clearfix">
                <div class="mh-left">
                    <router-link to="/spa/help/index" tag="h1"><i class="icon-font icon-prev"></i> 常见问题 &nbsp;&nbsp;</router-link>
                    <ul>
                        <li v-for="(type,index) in types" :class="{on:type.typeId==faqType}" :key="'type'+index"><a href="javascript:;" @click="initContent(type.typeId)"><span>{{type.typeName}}</span></a></li>  
                    </ul>             
                </div>
                <div class="mh-right">
                    <div class="result" v-if="keyword&&helplist.length>0">关于<em class="text-warning">{{keyword}}</em>的问题，共<em>{{helplist.length}}</em>条</div>
                    <div class="bd" v-if="helplist.length>0">
                        <ul :class="keyword?'':'pt-10'">
                            <li v-for="help in helplist" :key="help.faqId" :class="{on:help.ifShow}">
                                <div class="title" @click="help.ifShow=!help.ifShow">{{help.faqQuestion}}
                                    <i :class="['icon-font', help.ifShow?'icon-close1':'icon-open']"></i>
                                </div>
                                <transition name="custom-classes-transition"
                                    enter-active-class="animated fadeIn" 
                                    leave-active-class="animated fadeOut"
                                    :duration="{enter:400, leave:200}">
                                    <div class="content" v-html="help.faqAnswer" v-show="help.ifShow"></div>
                                </transition>
                            </li>
                        </ul>
                    </div>
                    
                    <div v-else class="bd norecord">
                        抱歉，没有搜索到相关结果
                    </div>
                </div>
            </div>
        </div>
        <Footer :pageInfo="pageInfo"></Footer> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import animate from 'animate.css'
import {toJson} from '@/utils/utils'

export default {
    components:{
        Header,
        Footer,
    },
    data() {
        return {
            helplist:[],
            types:[],
            keyword:'',
            faqType:'',
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    computed:{
        ...mapState(['loginInfo'])
    },
    mounted(){
        this.initTypes()
        if(this.$route.query.faqType) this.initContent(this.$route.query.faqType);
        if(this.$route.query.keyword){
            this.keyword=this.$route.query.keyword;
            this.searchHelp();
        } 
    },
    methods:{
        initContent(faqType){
            this.keyword=''
            this.faqType=faqType
            this.$post('/help/question/'+this.faqType).then((res)=>{
                this.helplist=JSON.parse(res).data.map(item=>{
                    item.ifShow=item.faqId==this.$route.query.faqId
                    return item
                })
            })
        },
        initTypes(){
            this.$post('/help/index').then((res)=>{
                this.types=toJson(res).types
            })
        },
        selKeyword(keyword){
            this.keyword=keyword;
            this.searchHelp();
        },
        searchHelp(){
            if(this.keyword){
                this.faqType=''
                this.$post('/help/question/search',{keyword:this.keyword}).then((res)=>{
                    this.helplist=JSON.parse(res).data.map(item=>{
                        item.ifShow=false
                        return item
                    })
                })
            }else{
                this.$layer.msg('请输入问题关键词')
            }
        }
    },
 }
</script>
<style>
.m-help .mh-right .content *{font-size:14px !important;color:#333 !important;font-family: 微软雅黑,Microsoft YaHei !important;}
</style>
<style lang="less" scoped>
@import "~@/assets/style/help.less";
</style>