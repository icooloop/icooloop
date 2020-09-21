<template>
  <div>
     <Header :pageInfo="pageInfo"></Header> 
     <div class="g-mainer">
        <div class="ma-about ma-info">
            <AboutMenu :aboutOn="pageInfo.aboutOn"></AboutMenu>
            <AboutSide :sideMenus="sideMenus"></AboutSide>
            <div class="content ma-info-org">
                <section class="text-c pdabout">
                    <div class="atitle">组织架构</div>
                    <h6>目前公司下设市场拓展部、运营管理部、产品管理部、风险控制部、技术开发部、法务合规部、财务管理部、综合管理部和客户服务部<br>九个一级部门，团队管理大多以扁平化管理为主，各部门间相互配合、相互提升、分工明确，指令下达快速，业务活动组织较流畅。</h6>
                    <div class="text-c mt-40"><img src="@/assets/images/about/info/org.png" alt=""></div>
                </section>
                <section class="pdabout bgabout2 text-c">
                    <div class="atitle">人员结构</div>
                    <h6 class="mt-10">截至2019年4月，亿钱贷平台工作人员数总计49人。技术人员与风控人员合计22人，其中拥有本科及以上学历占73%，<br>具体的年龄结构与学历分布情况如下图：</h6>
                    <ul class="canvasdiv clearfix">
                        <li><canvas id="personAgeCanvas"></canvas></li>
                        <li><canvas id="personEducationCanvas"></canvas></li>
                    </ul>
                    <div class="canvastitle clearfix">
                        <div class="item">年龄结构</div>
                        <div class="item">学历结构</div>
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
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

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
            totalDatas1:[{name:'25岁即以下',value:16},{name:'26岁至30岁',value:45},{name:'31岁至40岁',value:35},{name:'40岁即以上',value:4},],
            totalDatas2:[{name:'博士及硕士',value:12},{name:'本科',value:61},{name:'专科',value:27}],
            sideMenus:[
                {name:'公司简介',link:'/spa/about/info/intro'},
                {name:'平台信息',link:'/spa/about/info/platform'},
                {name:'组织架构',link:'/spa/about/info/org',onClass:true},
                {name:'管理团队',link:'/spa/about/info/team'},
                {name:'合作机构',link:'/spa/about/info/partner'},
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
        this.initEcharts1();
        this.initEcharts2();
    },
    methods: {
        initEcharts1() {
            let _this=this;
            let myChart = _this.$echarts.init(document.getElementById('personAgeCanvas'))
            let totalDatas=_this.totalDatas1
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    show : true,
                    left : 160,
                    orient: 'vertical',
                    top : 'middle',
                    itemWidth:15,
                    itemGap :15,
                    formatter: function (name) {
                        return _this.getEchartsLegend(totalDatas,name);
                    },
                    textStyle : {color:'#666'},
                    data:[totalDatas[0].name,totalDatas[1].name,totalDatas[2].name,totalDatas[3].name]
                },
                color:['#21c28e','#2ad4da','#51a0e3','#43aee0'],
                series: [{
                    name: '年龄结构',
                    type: 'pie',
                    center : [ '70px', '50%' ],
                    radius : [ '55%', '80%' ],
                    minAngle : 0.1,
                    label : {
                        normal : {
                            show : false,
                            position: 'center'
                        }
                    },
                    data: totalDatas
                }]
            });
        },
        initEcharts2() {
            let _this=this;
            let myChart = _this.$echarts.init(document.getElementById('personEducationCanvas'))
            let totalDatas=_this.totalDatas2
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    show : true,
                    left : 160,
                    orient: 'vertical',
                    top : 'middle',
                    itemWidth:15,
                    itemGap :15,
                    formatter: function (name) {
                        return _this.getEchartsLegend(totalDatas,name);
                    },
                    data:[totalDatas[0].name,totalDatas[1].name,totalDatas[2].name]
                },
                color:['#7177e8','#7ab5ed','#7edaea'],
                series: [{
                    name:'学历结构',
                    type: 'pie',
                    center : [ '70px', '50%' ],
                    radius : [ '55%', '80%' ],
                    minAngle : 0.1,
                    label : {
                        normal : {
                            show : false,
                            position: 'center'
                        }
                    },
                    data: totalDatas
                }]
            });
        },
        getEchartsLegend(totalDatas,name){
            for(let i=0;i<totalDatas.length;i++){
                let legend=name+'：';
                if(name==totalDatas[i].name){
                    let str=legend+totalDatas[i].value+'%';
                    return str;
                }
            }
        }
    },
 }
</script>

<style scoped>
@import "~@/assets/style/about.less";
.ma-info-org .canvasdiv{width:1000px;height:220px;margin:80px auto 0;overflow:hidden;}
.ma-info-org .canvasdiv canvas{width:400px;height:200px;margin:0 50px;display: inline-block;}
.ma-info-org .canvasdiv li{float: left;width:50%;padding:0 50px;}
.ma-info-org .canvastitle{width:1000px; margin:0 auto;}
.ma-info-org .canvastitle .item{float: left;width:50%;text-align:center;font-size:20px;font-weight:700;}
</style>