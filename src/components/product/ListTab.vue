<template>
    <div class="mp-tabs">
        <ul class="bd wp">
            <li v-for="tab in tabs" :key="tab.key" v-if="tab.show">
                <router-link :to="tab.link" :class="{on:tabOn==tab.key}">{{tab.name}}<span v-if="tab.loanCount && tab.loanCount>0">({{tab.loanCount}})</span></router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        tabOn:{
            type:String,
            default:'product'
        }
    },
    data() { 
        return {
            tabs:[
                {key:"plan",link:'/spa/plan/index',name:'易智投',show:true},
                {key:"product",link:'/spa/product/index',name:'散标出借',loanCount:this.$store.state.loginInfo.loanCount,show:true},
                {key:"transfer",link:'/spa/transfer/index',name:'债权转让',show:true},
                {key:"vip",link:'/spa/product/vip',name:'VIP专区',show:(this.$store.state.loginInfo.vipStatus && this.$store.state.loginInfo.vipStatus==1)},
            ]
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
.mp-tabs{
    background:#f8f8f8;
    border-bottom:1px solid #efefef;
    .bd{
        position: relative;
        display:flex;
        li a{
            display:block;
            margin:0 10px;
            min-width:90px;
            padding:0 10px;
            text-align:center;
            line-height:60px;
            font-size:16px;
            position: relative;
        }
        a:before{
            content: '';
            display: block;
            position: absolute;
            bottom:0;
            left: 0;
            height:4px;
            width: 0;
            background:@primary-color;
            transform: scale3d(0, 1, 1);
            transition: transform 0.1s
        }
        a.on:before,a:hover:before {
            transform: scale3d(1, 1, 1);
            transition-duration: 0.3s;
            width: 100%;
        }
    }
}
</style>
