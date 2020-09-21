<template>
    <div class="md-footer" :style="'background:'+background+';color:'+color+';height:'+height+'px;line-height:'+height+'px;border-top:'+borderTop">
        <p>亿钱贷　|　© 2019 All Rights Reserved　|　深圳市亿钱贷电子商务有限公司   <a href="http://www.miit.gov.cn/" :style="'color:'+color"
         class="keeplink" target="_blank" rel="noopener noreferrer">粤ICP备14041671号-1</a>　|　市场有风险，出借需谨慎</p>
    </div>
</template>

<script>
export default {
    props:{
        height:{
            type:Number,
            default:70
        },
        background:{
            type:String,
            default:'#fff'
        },
        color:{
            type:String,
            default:'#666'
        },
        borderTop:{
            type:String,
            default:'none'
        },
    },
    data() { 
        return {

        }
    }
 }
</script>

<style lang="less" scoped>
.md-footer{text-align:center;font-size:14px;
    a.keeplink{text-decoration:underline;}
}
</style>

