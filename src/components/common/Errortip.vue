<template>
    <div :class="['errortip',size]">
        <i class="icon-font icon-error"></i>{{msg}}
    </div>
</template>

<script>
export default {
    name:'Errortip',
    props:{
        msg:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:'normal'
        }
    },
    data() { 
        return {

        }
    }
 }
</script>

<style scoped>
.errortip{color:#f3000b;}
.errortip .icon-font{display: inline-block;font-size:14px;line-height:30px;margin-right:3px;}
.errortip.small{font-size:13px;}
</style>