<template>
    <a href="javascript:;" :class="['condition',active==val?'active':'']" @click="changeVal">{{text}}</a>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:'text',
        },
        val:{
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
            this.$emit('click',{val:this.val,name:this.name})
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
a.condition{color:#666;}
a.active{color:@primary-color}
</style>