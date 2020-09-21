<template>
    <div :class="['u-rank',active==name?'active':'']" @click="changeVal">
        {{text}}
        <i :class="['icon-font','icon-order-up',active==name && orderSc=='ASC'?'active':'']" v-if="name!=''"></i>
        <i :class="['icon-font','icon-order-down',active==name && orderSc=='DESC'?'active':'']" v-if="name!=''"></i>
    </div>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:'text',
        },
        orderSc:{
            type:String,
            default:'',
        },
        name:{
            type:String,
            default:'', 
        },
        active:{
            type:String,
            default:'', 
        }
    },
    data() { 
        return {
        }
    },
    methods:{
        changeVal(){
            this.$emit('click',this.name)
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
.u-rank{
    display: inline-block;
    position: relative;
    padding-right:14px;
    cursor: pointer;
    .icon-font{
        position: absolute;
        right:4px;
        line-height:1;
        text-align:center;
        font-size:14px;
        width:14px;
        text-align:center;
        color:#666;
    }
    .icon-font.active{
        color:@warning-color;
    }
    .icon-order-up{
        top:50%;
        margin-top:-10px;
    }
    .icon-order-down{
        bottom:50%;
        margin-bottom:-11px;
    }
}
.u-rank.active{color:@primary-color;font-weight:700;}
</style>