<template>
    <div class="yqd-input-number" ref="inputnumber">
        <input type="text" :class="['input-text',focus?'focus':'',disabled||disabledInput?'disabled':'',readonly?'readonly':'']" :disabled="disabled||disabledInput" ref="val" v-model="val" 
            @change="onChange" :maxlength="maxlength" @keyup="keyupVal" @blur="blurVal" @focus="focusVal" :style="inputStyle" :placeholder="placeholder" :readonly="readonly">
        <div class="currency" v-if="type=='currency'&& hasunit" :style="unitStyle">{{unit}}</div>
        <button type="button" :class="['opbtn','btn-reduce',disabled||disabledBtn||reduceDisabled?'disabled':'']" :style="btnStyle" 
            @mousedown="downVal('reduce')" @mouseup="upVal" @mouseleave="upVal" @click="reduce" :disabled="disabled||disabledBtn||reduceDisabled" v-if="showBtn">
            <i class="icon-font icon-jian" :style="'font-size:'+iconSize+'px'"></i>
        </button>
        <button type="button" :class="['opbtn','btn-increase',disabled||disabledBtn||increaseDisabled?'disabled':'']" :style="btnStyle"
            @mousedown="downVal('increase')" @mouseup="upVal" @mouseleave="upVal" @click="increase" :disabled="disabled||disabledBtn||increaseDisabled" v-if="showBtn">
            <i class="icon-font icon-jia" :style="'font-size:'+iconSize+'px'"></i>
        </button>
    </div>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
let longPut = null ;
export default {
    props:{
        loanId:{//标的ID
            type:String,
            default:''
        },
        inputkey:{//组件key
            type:String,
            default:'inputNumber'
        },
        defaultValue:{//默认值
            type:Number,
            default:0
        },
        disabled:{//组件是否禁用
            type:Boolean,
            default:false
        },
        readonly:{//组件是否只读
            type:Boolean,
            default:false
        },
        disabledInput:{ //是否禁用输入框
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:'请输入出借金额'
        },
        disabledBtn:{//是否禁用按钮
            type:Boolean,
            default:false
        },
        showBtn:{ //是否显示按钮
            type:Boolean,
            default:true
        },
        iconSize:{ //icon大小
            type:Number,
            default:18
        },
        fontSize:{  //输入框字体大小
            type:Number,
            default:14
        },
        decimalPoint:{//小数点位数
            type:Number,
            default:0
        },
        unit:{ //单位
            type:String,
            default:'￥',
        },
        unitPosition:{
            type:String,
            default:'left',
        },
        max:{ //最大值
            type:Number,
            default:Infinity
        },
        min:{ //最小值
            type:Number,
            default:0
        },
        width:{ //宽度
            type:Number,
            default:190
        },
        height:{ //高度
            type:Number,
            default:32
        },
        step:{ //每次加减值
            type:Number,
            default:1
        },
        type:{ //方式
            type:String,
            default: 'number'
        },
        maxlength:{ //输入框最大长度
            type: Number,
            default:8
        },
        hasunit:{ //是否含有单位
            type:Boolean,
            default:true
        },
        ifFocusEvent:{ //是否含有focus世界
            type:Boolean,
            default:false
        },
        ifShowZero:{ //是否隐藏0
            type:Boolean,
            default:false
        },
    },
    computed:{

    },
    data() { 
        return {
            reduceDisabled:false,
            increaseDisabled:false,
            val:this.defaultValue,
            focus:false,
            changeType:'',
            longFlag:false,
            unitStyle:{
                lineHeight:this.height+'px',
                left:this.unitPosition=='left'?((this.showBtn?this.height:0)+'px'):'auto',
                right:this.unitPosition=='right'?((this.showBtn?this.height:0)+'px'):'auto',
            },
            inputStyle:{
                fontSize:this.fontSize+'px',
                lineHeight:this.height+'px',
                height:this.height+'px',
                width:this.width+'px',
                paddingLeft:(10+(this.showBtn?this.height:0)+(this.type=='currency'&& this.hasunit?20:0))+'px',
                paddingRight:(10+(this.showBtn?this.height:0))+'px',
            },
            btnStyle:{
                lineHeight:(this.height-2)+'px',
                height:(this.height-2)+'px',
                width:(this.height-2)+'px',
            }
        }
    },
    mounted(){
        this.setValue();
    },
    watch:{
        defaultValue(val){
            this.val=this.defaultValue==0?'':this.defaultValue
        }
    },
    methods:{
        reduce(){
            this.val=this.val==''?0:this.val;
            if(Number.isFinite(this.val) && !this.disabled && !this.disabledBtn){
                this.val-=this.step;
                this.val=(Number.isFinite(this.min)&&(this.val<this.min))?this.min:this.val
                this.onChange();
            }
        },
        increase(){
            this.val=this.val==''?0:this.val;
            if(Number.isFinite(this.val) && !this.disabled && !this.disabledBtn){
                this.val+=this.step;
                this.val=(Number.isFinite(this.max)&&(this.val>this.max))?this.max:this.val
                this.onChange();
            }
        },
        changeVal(val){
            this.val=val;
            this.setValue();
        },
        setValue(){
            this.initDiabled()
            if(this.type=='currency'){
                this.$nextTick(() => {
                    if(!this.ifShowZero)this.val=this.val==0?'':this.val;
                    if(this.decimalPoint>0){
                        this.val= (this.val+'').replace(/[^\d.]/g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
                        if(this.val.indexOf(".")< 0 && this.val !=""){
                            this.val= parseFloat(this.val); 
                        }
                        if(!this.focus){
                            this.val=Number(parseFloat(this.val).toFixed(this.decimalPoint))
                        }
                    }else{
                        this.$refs.val.value =(this.val==='')?'':(this.val+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                })
            }
        },
        onChange(){
            this.setValue();
            let returnResult={value:this.val,loanId:this.loanId}
            this.$emit('change',returnResult);
        },
        initDiabled(){
            this.val=this.val==''?0:this.val;
            this.reduceDisabled=!Number.isFinite(this.val) || this.erReduce();
            this.increaseDisabled=!Number.isFinite(this.val) || this.erIncrease();
            //console.log('[disabled]',this.reduceDisabled,this.increaseDisabled)
        },
        keyupVal(){
            this.val=this.val==''?0:this.val;
            if(this.decimalPoint==0) this.val=Number((this.val+'').replace(/[^\d]/g,''));
            //if(Number.isFinite(this.min) && this.val < this.min) this.val = this.min
            if(Number.isFinite(this.max) && this.val > this.max) this.val = this.max
            this.onChange();
        },
        focusVal(){
            if(this.ifFocusEvent) this.$emit('focus',{ifFocus:true,loanId:this.loanId});
            this.focus=true;
        },
        blurVal(){
            if(this.ifFocusEvent) this.$emit('focus',{ifFocus:false,loanId:this.loanId});
            this.val=this.val==''?0:this.val;
            if(Number.isFinite(this.min) && this.val < this.min) this.val = this.min
            this.focus=false;
            this.onChange()
        },
        erReduce(){
            this.changeType='reduce';
            return Number.isFinite(this.min) && !(this.val > this.min)
        },
        erIncrease(){
            this.changeType='increase';
            return Number.isFinite(this.max) && !(this.val < this.max)
        },
        downVal(longtype){
            this.longFlag=true;
            setTimeout(()=>{
                if(this.longFlag && longPut==null){
                    longPut=setInterval(()=>{
                        if(longtype=='reduce'){
                            this.reduce();
                        }
                        if(longtype=='increase'){
                            this.increase();
                        }
                    },100);
                }
            },800);
        },
        upVal(){
            this.longFlag=false;
            if(longPut!=null){
                clearInterval(longPut)
                longPut=null
            }
        },
    }

 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
.yqd-input-number{
    display: inline-block;
    overflow: hidden;
    position:relative;
    text-align:center;
    border-radius:@border-radius-base;
    input.input-text{
        width:100%;
        padding:0 10px;
        border:1px solid #ddd;
        border-radius:@border-radius-base;
    }
    input.input-text.focus{border:1px solid #33aaff;border-color:rgba(82,168,236,0.8);box-shadow:0 0 8px rgba(82,168,236,0.6)}
    input.input-text.readonly{background:#f1f1f1;border:1px solid #ddd;}
    input.input-text.disabled{color:#c5c5c5;background:#f1f1f1;}
    .currency{position: absolute;left:0;top:1px;width:32px;color:#c5c5c5;}
    .opbtn{
        display:block;
        border:none;
        padding:0;
        background:#efefef;
        cursor: pointer;
        position:absolute;
        bottom:1px;
        .icon-font{color:@warning-color;font-size:18px;}
    }
    .opbtn:hover{
        background:@warning-color;
        .icon-font{color:#fff;}
    }
    .opbtn.disabled{cursor:not-allowed;background:#ebebeb;
        .icon-font{color:#fff;}
    }
    .btn-reduce{
        left:1px;
        border-radius:@border-radius-base 0 0 @border-radius-base;
    }
    .btn-increase{
        right:1px;
        border-radius:0 @border-radius-base @border-radius-base 0;
    }
}
</style>