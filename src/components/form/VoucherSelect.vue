<template>
    <div :class="['m-multipleselect',showList?'focus':'',loan.selectStr=='无符合条件的优惠券'?'noselect':'hasselect']" :style="'width:'+width+';line-height:'+height" @click="showList=!showList" v-outside="outsideVal">
        <input type="text"  :style="'line-height:'+height+';height:'+height" :class="['input-text',disabled?'disabled':'']" :placeholder="placeholder" v-focus="showList" readonly :value="loan.selectStr" :disabled="disabled">
        <i class="icon-font icon-order-down"></i>
        <ul class="dropdown-menu" :style="'top:'+height" v-show="showList">
            <li class="readonly" v-if="mayRedList && mayRedList.length>0">红包</li>
            <li v-for="(voucher,index) in mayRedList" :key="'mayvoucher'+index" :value="voucher.awardDtlId"
                :class="['option',voucher.selected?'selected':'']"
                :selected="voucher.selected" @click="chooseRed(voucher)">{{voucher.limitRemarkStr}}<i class="icon-font icon-right"></i></li>

            <li class="readonly" v-if="mayTicketList && mayTicketList.length>0">奖励券</li>
            <li v-for="(voucher,index) in mayTicketList" :key="'mayticket'+index" :value="voucher.awardDtlId"
                :class="['option',voucher.selected?'selected':'']"
                :selected="voucher.selected" @click="chooseTicket(voucher)">{{voucher.limitRemarkStr}}<i class="icon-font icon-right"></i></li>

            <li class="readonly" v-if="(hasuseRedList && hasuseRedList.length>0) || (disabledRedList && disabledRedList.length>0)">红包(不符合条件)</li>
            <li v-for="(voucher,index) in hasuseRedList" :key="'hasusevoucher'+index" :value="voucher.awardDtlId"
                class="option hasuse" @click="chooseHasuse()">{{voucher.limitRemarkStr}}<i class="icon-font icon-error"></i></li>
            <li v-for="(voucher,index) in disabledRedList" :key="'diabledvoucher'+index" :value="voucher.awardDtlId"
                class="option disabled">{{voucher.limitRemarkStr}}<i class="icon-font icon-error"></i></li>

            <li class="readonly" v-if="(hasuseTicketList && hasuseTicketList.length>0) || (disabledTicketList && disabledTicketList.length>0)">奖励券(不符合条件)</li>
            <li v-for="(voucher,index) in hasuseTicketList" :key="'hasuseticket'+index" :value="voucher.awardDtlId"
                class="option hasuse" @click="chooseHasuse()">{{voucher.limitRemarkStr}}<i class="icon-font icon-error"></i></li>
            <li v-for="(voucher,index) in disabledTicketList" :key="'diabledticket'+index" :value="voucher.awardDtlId"
                class="option disabled">{{voucher.limitRemarkStr}}<i class="icon-font icon-error"></i></li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import {formatCurrency} from  '@/utils/utils'
import {calculateIncome} from '@/utils/product'
export default {
    props:{
        disabled:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'180px'
        },
        height:{
            type:String,
            default:'32px'
        },
        placeholder:{
            type:String,
            default:'未选择优惠券'
        },
        ifInit:{
            type:Boolean,
            default:true
        },
        ifMultiple:{
            type:Boolean,
            default:false
        },
        amount:{
            type:Number,
            default:0
        },
        loanId:{
            type:String,
            default:''
        },
        selectStr:{
            type:String,
            default:''
        },
        selectedRedTotal:{
            type:Array,
            default: () => {return []}
        },
        selectedTicketTotal:{
            type:Array,
            default: () => {return []}
        },
        loan:{
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            showList:false,
            selectedRedList:[],
            selectedTicket:[],
            totalLimitAmt:0,
            totalRedAmt:0,
            maxRate:0,
            investAmt:0,
            redIncome:0,
            ticketIncome:0,
            resultSelect:{},
        }
    },
    directives:{
        "focus":(el,binding) => {
            if(binding.value){
                el.focus();
            }
        },
        "outside":(el,binding,vnode) =>{
            let clickHandler=(e)=>{
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }
            el.__vueClickOutside__ = clickHandler;
            document.addEventListener('click', clickHandler);
        }
    },
    computed:{
        selectedRedTotal3(){
            return [...this.selectedRedTotal]
        },
        selectedTicketTotal3(){
            return [...this.selectedTicketTotal]
        },
        hasuseRedList(){
            let objList=[...this.loan.redList]
            let newList=[]
            objList.forEach(item=>{
                if(item.hasuse) newList.push(item);
            })
            //let newList= objList.filter(item => item.hasuse==true)
            return newList
        },
        disabledRedList(){
            let objList=[...this.loan.redList]
            let newList=[]
            objList.forEach(item=>{
                if(item.disabled) newList.push(item);
            })
            //let newList= objList.filter(item => item.disabled==true)
            return newList
        },
        mayRedList(){
            let objList=[...this.loan.redList]
            let newList=[]
            objList.forEach(item=>{
                if(!item.disabled && !item.hasuse) newList.push(item);
            })
            //let newList= objList.filter(item => !item.disabled && !item.hasuse)
            return newList
        },
        hasuseTicketList(){
            let objList=[...this.loan.ticketList]
            let newList=[]
            objList.forEach(item=>{
                if(item.hasuse) newList.push(item);
            })
            //let newList= objList.filter(item => item.hasuse==true)
            return newList
        },
        disabledTicketList(){
            let objList=[...this.loan.ticketList]
            let newList=[]
            objList.forEach(item=>{
                if(item.disabled) newList.push(item);
            })
            //let newList= objList.filter(item => item.disbled==true)
            return newList
        },
        mayTicketList(){
            let objList=[...this.loan.ticketList]
            let newList=[]
            objList.forEach(item=>{
                if(!item.disabled && !item.hasuse) newList.push(item);
            })
            //let newList= objList.filter(item => !item.disbled && !item.hasuse)
            return newList
        },
    },
    methods:{
        outsideVal(){
            this.showList=false;
        },
        chooseRed(voucher){
            //红包多选
            let loan={...this.loan};
            let selectedRedTotal=[...this.selectedRedTotal3]
            //console.log('[this.selectedRedTotal3]'+JSON.stringify(selectedRedTotal),voucher.awardDtlId,selectedRedTotal.includes(voucher.awardDtlId))
            let selectedTicketTotal=[...this.selectedTicketTotal3]
            if(!voucher.disabled){
                if(voucher.selected){
                    voucher.selected=false
                }else if(selectedRedTotal.includes(voucher.awardDtlId)){
                    this.$layer.msg('该红包已在其他项目中使用')
                    return;
                }else if((voucher.limitAmount+loan.totalLimitAmt)>loan.investAmt){
                    this.$layer.msg('所选红包总额不能大于出借金额')
                    return;
                }else{
                    voucher.selected=true
                }
                //Vue.set(loan.redList,index,voucher)
                if(voucher.selected){
                    loan.ticketAmt=0
                    if(loan.selectedTicket){
                        this.$layer.msg('红包和优惠券不能同时使用')
                        loan.ticketList.map(item=>{
                            item.selected=false
                            return item
                        })
                        loan.maxRate=0
                        loan.selectedTicket=''
                        selectedTicketTotal.splice(selectedTicketTotal.findIndex(v => v ==loan.selectedTicket),1);//已选奖励券库删除之前选择的奖励券
                    }
                    loan.selectedRedList.push(voucher.awardDtlId)
                    selectedRedTotal.push(voucher.awardDtlId)
                    loan.totalLimitAmt+=voucher.limitAmount
                    loan.totalRedAmt+=voucher.awardAmount
                }else{
                    loan.selectedRedList.splice(loan.selectedRedList.findIndex(v => v ==voucher.awardDtlId),1);
                    selectedRedTotal.splice(selectedRedTotal.findIndex(v => v ==voucher.awardDtlId),1);//已选红包库删除当前选择的红包
                    loan.totalLimitAmt-=voucher.limitAmount
                    loan.totalRedAmt-=voucher.awardAmount
                }
                if(loan.totalLimitAmt>0 || loan.totalRedAmt>0){
                    loan.selectStr='满'+loan.totalLimitAmt+'返'+loan.totalRedAmt
                }else{
                    loan.selectStr=''
                }
                loan.selectedRedTotal=selectedRedTotal;
                loan.selectedTicketTotal=selectedTicketTotal;
                this.$emit('change',this.changeVoucherIncome(loan));

            }
        },
        chooseTicket(voucher){
            //奖励券单选
            let loan={...this.loan};
            let selectedRedTotal=[...this.selectedRedTotal3]
            let selectedTicketTotal=[...this.selectedTicketTotal3]
            if(!voucher.disabled){
                if(voucher.selected){
                    voucher.selected=false
                    loan.selectedTicket=''
                    selectedTicketTotal.splice(selectedTicketTotal.findIndex(v => v ==loan.selectedTicket),1);//已选奖励券库删除之前选择的奖励券
                    loan.maxRate=0
                    loan.ticketAmt=0
                }else if(selectedTicketTotal.includes(voucher.awardDtlId)){
                    this.$layer.msg('该奖励券已在其他项目中使用')
                    return;
                }else{
                    voucher.selected=true
                }
                //Vue.set(loan.ticketList,index,voucher)
                loan.ticketList.map(item2=>{
                    item2.selected=(item2.awardDtlId==voucher.awardDtlId&&voucher.selected)
                    return item2
                })
                if(voucher.selected){
                    loan.totalRedAmt=0
                    //this.showList=false; //关闭选择框
                    if(loan.selectedRedList && loan.selectedRedList.length>0){
                        this.$layer.msg('红包和优惠券不能同时使用')
                        loan.redList.map(item=>{
                            item.selected=false
                            return item
                        })
                        loan.selectedRedList.forEach(itemId=>{
                            selectedRedTotal.splice(selectedRedTotal.findIndex(v => v ==itemId),1);//已选红包库删除之前选择的红包
                        })
                        loan.totalLimitAmt=0
                        loan.selectedRedList=[]
                    }
                    if(loan.selectedTicket){ //已经使用过奖励券
                        selectedTicketTotal.splice(selectedTicketTotal.findIndex(v => v ==loan.selectedTicket),1);//已选奖励券库删除之前选择的奖励券
                    }
                    loan.selectedTicket=voucher.awardDtlId
                    selectedTicketTotal.push(loan.selectedTicket)//已选奖励券库新增当前选择的奖励券
                    loan.maxRate=voucher.awardAmount
                }
                if(loan.maxRate>0){
                    loan.selectStr='奖励'+loan.maxRate+'%'
                    if (loan.isTransfer) loan.investAmt = loan.transferPrincipal
                    let currentLoan = { ...loan, ...{ rate: loan.maxRate } }
                    loan.ticketAmt = calculateIncome(currentLoan)// 奖励券收益
                    if(loan.ticketAmt<0.01){
                      loan.ticketAmt=0.01
                    }
                    if (loan.isTransfer) loan.ticketAmt = loan.ticketAmt * loan.remainDays / loan.remainPeriodDays
                }else{
                    loan.selectStr=''
                    loan.ticketAmt=0
                }
                loan.selectedRedTotal=selectedRedTotal;
                loan.selectedTicketTotal=selectedTicketTotal;
                this.$emit('change',this.changeVoucherIncome(loan));
            }
        },
        changeVoucherIncome(oldloan){
            let loan={...oldloan}
            loan.totalInterest = loan.baseInterest + loan.awardInterest + loan.totalRedAmt + loan.ticketAmt
            let baseDesc = loan.investAmt ? '项目收益 ' + formatCurrency(loan.baseInterest) : ''
            let awardDesc = loan.awardInterest ? ' + 出借奖励 ' + formatCurrency(loan.awardInterest) : ''
            let redDesc = ''
            if (loan.totalRedAmt) redDesc = ' + 红包收益 ' + formatCurrency(loan.totalRedAmt)
            if (loan.ticketAmt) redDesc = ' + 奖励券收益 ' + formatCurrency(loan.ticketAmt)
            loan.totalInterestText = baseDesc + awardDesc + redDesc
            console.log(loan.totalRedAmt,loan.ticketAmt)
            return loan
        },
        chooseHasuse(){
            this.$layer.msg('该优惠券已在其他项目中使用')
        }
    }
 }
</script>

<style lang="less" scoped>
@import "~@/assets/style/config.less";
.m-multipleselect{
    display: inline-block;
    position: relative;
    .input-text{padding:0 15px;width:100%;border:1px solid #e1e1e1;border-radius:5px;cursor: pointer;}
    .icon-order-down{position: absolute;right:3px;top:1px;}
    .dropdown-menu{
        position: absolute;
        left:0;
        background:#fff;
        border:1px solid #e1e1e1;
        min-width:100%;
        margin-top:4px;
        max-height:250px;
        z-index:1000;
        overflow:auto;
        border-radius:5px;
        li{line-height:22px;padding:5px 20px;white-space: nowrap;cursor: pointer;}
        li.readonly{color:#999;padding-left:10px;font-size:12px;cursor:text;}
        li.option{padding-right: 32px;position: relative;
            .icon-font{position: absolute;right:5px;top:5px;display:none;}
        }
        li.option:hover{background:#f0f6ff;
            .icon-font{display: inline-block;color:#ddd}
        }
        li.option.hasuse{background:#f2f2f2;cursor: not-allowed;color:#999;
            .icon-font{display: inline-block;color:#ddd}
        }
        li.option.selected{background:#f0f6ff;cursor: pointer;
            .icon-font{display: inline-block;color:@primary-color}
        }
        li.option.disabled{color:#bbb;cursor: not-allowed;}
        li.option.disabled:hover{background:#f2f2f2;}
    }
}
.m-multipleselect.focus .input-text{border:1px solid #33aaff;border-color:rgba(82,168,236,0.8);box-shadow:0 0 8px rgba(82,168,236,0.6)}
</style>
