<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <div class="ma-notice notice_notice">
                <section class="ma-notice-notice pdabout" >
                    <div class="atitle">{{pageTitle}}</div>
                    <div class="mn newscontent">
                        <div class="newslist">
                            <ul >
                                <li v-for="item in dataList">
                                    <em>{{item.createTime |dateformat}}</em>
                                    <router-link :to="item.url">{{item.title}}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="page mt-40" v-if="hasPage">
                            <a-pagination :pageNo="pageNo" :pageSize.sync="pageSize" :total="total" @change="initData"/>
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
import {dateformat} from '@/utils/utils'

import Vue from 'vue'
import {Pagination} from 'ant-design-vue'
Vue.use(Pagination)

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        Signname
    },
    data() {
        return {
            pageTitle:'出借人教育',
            pageNo:1,
            pageSize:10,
            dataList:[],
            total:0,
            hasPage:false,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/law',
                naverOn:'nav_about',
            }
        }
    },
    filters:{
        dateformat
    },
    computed: {
        ...mapState(['loginInfo'])
    },
    mounted() {
       this.initData(1) 
    },
    methods: {
        initData(pageNo){
            let _this=this;
            _this.pageNo=pageNo;
            _this.$post('/article/law/ajList',{pageNo:_this.pageNo,pageSize:_this.pageSize,qType:0})
                .then(function (res) {
                   _this.total= JSON.parse(res).count
                   _this.hasPage=_this.total>_this.pageSize
                   _this.dataList= JSON.parse(res).data
                    for (const x of _this.dataList) {
                        let url ='/spa/article/law/'+x.uuid;
                        if(x.articleContentType=='2'){
                            url =x.newsUrl;
                        }else if(x.articleContentType=='3'){
                            url = x.contentFileLink;
                        }
                        x.url=url
                   }
                })
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
</style>