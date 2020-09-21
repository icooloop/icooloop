<template>
    <div :class="['u-what',arrow]">
        <slot></slot>
        <i v-if="!$slots.default" :class="['icon-font','icon-'+icon]" :style="'color:'+iconColor"></i>
        <span :class="['notes',nowrap?'nowrap':'']" :style="{width:width,textAlign:align}" v-html="notes"></span>
    </div>
</template>

<script>
export default {
    props:{
        notes:{type:String,default:'这是提示'},
        arrow:{type:String,default:''},
        align:{type:String,default:'left'},
        icon:{type:String,default:'wenhao'},
        width:{type:String,default:'230px'},
        nowrap:{type:Boolean,default:false},
        iconColor:{type:String,default:'#888'},
    },
    data() { 
        return {}
    }
 }
</script>

<style scoped>
.u-what{display: inline-block;position:relative;width:0;height: 0;line-height:20px;margin-left:2px;margin-right:16px;text-align:left;}
.u-what .icon-font{position: absolute; left: 3px; bottom: -5px; color: #888; cursor: pointer; display: inline-block; font-size: 14px;}
.u-what .notes{ display:none;position: absolute; left: 0; bottom: 23px; line-height:20px; padding:10px 15px; font-size: 14px; background: #fff; color: #666; border: 1px solid #ddd; border-radius:5px;  z-index: 10;font-weight:400;}
.u-what:hover .notes{display: block;box-shadow:0 0 10px rgba(0,0,0,0.2);}
.u-what .notes:before{content: ""; position: absolute; width: 0; height: 0; left: 10px; bottom: -8px; border: 8px solid transparent; border-left-color: #ddd;}
.u-what .notes:after{content: ""; position: absolute; width: 0; height: 0; left: 10px; bottom: -7px; border: 8px solid transparent; border-left-color: #fff;}
.u-what.right .notes{right: -20px; left: auto;}
.u-what.right .notes:before{left: auto; right: 10px; border-left: none; border-right-color: #ddd;}
.u-what.right .notes:after{left: auto; right: 10px; border-left: none; border-right-color: #fff;}

.u-what.bottom .notes{top:15px; bottom:auto;}
.u-what.bottom .notes:before{bottom: auto; top: -8px;}
.u-what.bottom .notes:after{bottom: auto; top: -7px;}

.u-what.center .notes{transform:translateX(-50%);left:10px;}
.u-what.center .notes:before{left:50%;}
.u-what.center .notes:after{left:50%;}

.u-what.centerbottom .notes{transform:translateX(-50%);left:10px;top:15px; bottom:auto;}
.u-what.centerbottom .notes:before{left:50%;bottom: auto; top: -8px;}
.u-what.centerbottom .notes:after{left:50%;bottom: auto; top: -7px;}

.u-what .nowrap{white-space: nowrap;}
</style>
