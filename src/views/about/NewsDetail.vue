<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
             <section class="ma-newsdetail">
                <div class="wp">
                    <div class="bd">
                            <div class="hd">
                                <div class="title">{{notice.title}}</div>
                                <div class="info">{{notice.updateTime|dateformat('YYYY-MM-DD HH:mm:ss')}} &nbsp;&nbsp;点击次数：{{notice.visitCount}}次</div>
                            </div>
                            <div class="content" v-html="notice.content"></div>
                        </div>
                </div>
            </section>
        </div>
    </div>     
    <Footer :pageInfo="pageInfo"></Footer> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import Footer from '@/components/include/Footer'
import AboutMenu from '@/components/about/AboutMenu'
import Signname from '@/components/about/Signname'
import {dateformat,toJson} from '@/utils/utils'

export default {
    components:{
        Header,
        Footer,
        AboutMenu,
        Signname
    },
    data() {
        return {
            uuid:'',
            type:'notice',
            notice:{},
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                aboutOn:'/spa/about/notice',
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
    mounted(){
        let routename=this.$route.name
        this.type=routename.substring(8,routename.length);
        if(this.type=='law'){
            this.pageInfo.aboutOn='/spa/about/law'
        }
        this.uuid=this.$route.params.uuid
        this.initData()
    },
    methods:{
        initData(){
            var self=this;
            this.$post('/article/'+this.type+'/'+this.uuid).then(res => {
                this.notice=toJson(res).notice;
            })
        }
    }
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-newsdetail{background:#f0f2f5;padding:40px 0;}
.ma-newsdetail .bd{background-color: #fff;padding:20px 50px 50px;}
.ma-newsdetail .bd .content{line-height:30px;padding-top:20px;}
.ma-newsdetail .hd {border-bottom: 1px dashed #ccc;padding:20px;text-align: center;}
.ma-newsdetail .hd .title{color: #3961cd;font-size: 18px;text-decoration: none;}
.ma-newsdetail .hd .info{color:#999;padding-top:10px;font-size:13px;}
.ma-newsdetail .bd img{max-width: 100%!important;}
</style>