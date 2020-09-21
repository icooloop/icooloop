<template>
	<a-affix :offsetTop="0">
		<div class="ma-menu" id="aboutMenu">
			<ul class="bd wp clearfix">
				<li v-for='item in aboutmenus'>
					<router-link :to="item.link" :class="{on:aboutOn==item.link}">{{item.name}}</router-link>
					<ul class="submenu" v-if="item.hasson">
						<li v-for='subitem in item.submenus'><router-link :to="subitem.link">{{subitem.name}}</router-link></li>
					</ul>
				</li>
			</ul>
		</div>
	</a-affix>
</template>
<script>
import Vue from 'vue'
import {Affix } from 'ant-design-vue'
Vue.use(Affix)

export default {
    props:['aboutOn'],
    data() {
        return {
            aboutmenus:[
				{name:'合规进程',link:'/spa/about/hegui',hasson:false},
				{name:'公司信息',link:'/spa/about/info',hasson:true,submenus:[
					{name:'公司简介',link:'/spa/about/info/intro'},
					{name:'平台信息',link:'/spa/about/info/platform'},
					{name:'组织架构',link:'/spa/about/info/org'},
					{name:'管理团队',link:'/spa/about/info/team'},
					{name:'合作机构',link:'/spa/about/info/partner'},
					{name:'联系我们',link:'/spa/about/info/contact'},
				]},
				{name:'平台运营',link:'/spa/about/operate',hasson:true,submenus:[
					{name:'平台数据',link:'/spa/about/operate/data'},
					{name:'运营报告',link:'/spa/about/operate/report'}
				]},
				{name:'平台公告',link:'/spa/about/notice',hasson:true,submenus:[
					{name:'审核信息',link:'/spa/about/notice/examine'},
					{name:'重大事项',link:'/spa/about/notice/matter'},
					{name:'平台公告',link:'/spa/about/notice/notice'},
					{name:'行业资讯',link:'/spa/about/notice/news'},
					{name:'资费说明',link:'/spa/about/notice/explain'}
				]},
				{name:'风险管理',link:'/spa/about/riskmanage',hasson:true,submenus:[
					{name:'风险控制',link:'/spa/about/riskmanage'},
					{name:'银行存管',link:'/spa/about/deposit'}
				]},
				{name:'项目介绍',link:'/spa/about/project',hasson:true,submenus:[
					{name:'微农贷',link:'/spa/about/project1'},
					{name:'企链贷',link:'/spa/about/project2'},
					{name:'微花贷',link:'/spa/about/project3'},
					{name:'乐保贷',link:'/spa/about/project4'},
					{name:'优车贷',link:'/spa/about/project5'},
					{name:'微企贷',link:'/spa/about/project6'}
				]},
				{name:'出借人教育',link:'/spa/about/law',hasson:false},
				{name:'风险提示',link:'/spa/about/risktip',hasson:false}
			]
        }
    }
}
</script>
<style scoped>
.ma-menu {margin-top:5px;background:#2261c9;z-index:30;}
.ma-menu.headroom--pinned{position:fixed;top:0;left:0;width:100%;z-index:1000;}
.ma-menu .bd>li{float:left;width:12.5%;position:relative;height:50px;}
.ma-menu .bd>li>a{text-align:center;line-height:50px;display:block;color:#87abe7;text-decoration:none;font-size:16px;position:absolute;left:2%;top:0;width:96%;transition:background 0.6s;}
.ma-menu .bd>li:hover>a,.ma-menu .bd>li>a.on{
	line-height:60px;top:-5px;background:#2f2489;color:#fff;z-index:40;box-shadow:0 0 5px rgba(0,74,147,.15);
	background: linear-gradient(to bottom right,#0245af,#3c2d85);
}
.ma-menu .bd>li .submenu{display:none;position:absolute;left:2%;top:55px;text-align:center;width:96%;z-index:40;background:none;}
.ma-menu .bd>li:hover .submenu{display:block;box-shadow:0 0 5px rgba(0,74,147,.15);}
.ma-menu .submenu li+li{border-top: 1px solid #ebebeb;}
.ma-menu .submenu li a{display:block;line-height:56px;background:#fff;color:#004a93;transition:background 0.6s;}
.ma-menu .submenu li a:hover{background:#2f2489;color:#fff;background: linear-gradient(to bottom right,#0245af,#3c2d85);}
</style>

