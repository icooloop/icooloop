<template>
    <div :class="['u-label','size-'+size,'label-'+type]" :style="'transform:translateY(-'+movegap+'px)'">{{name}}<span class="notes" v-show="notes!=''">{{notes}}</span></div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:'normal'
        },
        size:{
            type:String,
            default:'normal'
        },
        content:{
            type:String,
            default:'label'
        },
        movegap:{
            type:Number,
            default:0,
        },
        notes:{
            type:String,
            default:''
        },
    },
    data() { 
        return {
            name:this.content,
            labels:[
                {type:'qn',content:'企'},
                {type:'sn',content:'农'},
                {type:'wh',content:'微'},
                {type:'lb',content:'保'},
                {type:'cb',content:'车'},
                {type:'wq',content:'商'},
            ],
        }
    },
    mounted(){
        this.initLabel()
    },
    watch:{
        type(val){
            this.initLabel()
        }
    },
    methods:{
        initLabel(){
            this.labels.forEach(label=>{
                if(this.type==label.type) this.name=label.content
            })
        }
    },
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
.u-label{
    display:inline-block;*display:inline;
    position:relative;
    display:inline-block;
    background-color:@primary-color;
    padding: 4px 5px;
    color:#fff;
    border-radius:3px;
    font-size:14px;
    line-height:1;
    white-space: nowrap;
    .notes{
        display:none;position: absolute;transform:translate(-15px,-8px);left:100%;bottom:100%;line-height:20px; padding:10px 15px; font-size: 14px; background: #fff; color: #666; border: 1px solid #ddd; border-radius:5px;  z-index: 10;font-weight:400;
    }
    .notes:before{content: ""; position: absolute; width: 0; height: 0; left: 10px; bottom: -8px; border: 8px solid transparent; border-left-color: #ddd;}
    .notes:after{content: ""; position: absolute; width: 0; height: 0; left: 10px; bottom: -7px; border: 8px solid transparent; border-left-color: #fff;}

}
.u-label:hover .notes{display: block;}
.u-label.size-small{font-size:12px;padding:3px 4px;}
.label-red{background:#ffe9ee;color:#ff366d;border:1px solid #ed145b;}
.label-orange{background:#fff2e2;color:#f07428;border:1px solid #fbaf5d;}
.label-wh{background-color:#e35064;}
.label-lb{background-color:#743f8f;}
.label-qn{background-color:#a2753f;}
.label-sn{background-color:#075c1f;}
.label-cb{background-color:#4459a6;}
.label-wq{background-color:#000d59;}
.u-label.hand{cursor:pointer;}
</style>