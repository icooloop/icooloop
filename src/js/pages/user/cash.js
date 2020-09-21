/**
 * Created by lib on 2019/1/14.
 */
$(function(){
	//$('input.icheck').iCheck({ checkboxClass: 'icheckbox',radioClass: 'iradio'});
	initCashTypes();
	$("#cashSubmitBtn").on('click', function () {
        if (!checkAmount()) {
            return false;
        }
        
        var flag = false;
        //计算剩余额度
        if($("#cashtypes li.on").attr("type")=='quik'){
        	 $.ajax({
                 type: "post",
                 dataType: "json",
                 url: basePath+'/member/account/cash_quota',
                 data: {
                     "amt": 	 $("#amount").val()
                 },
                 async: false,
                 success: function(data) {
                     if (data.success) {
                     	flag = true;
                     } else {
                     	layerFullQuataTip(data.msg);
                     	flag = false;
                     }
                 }
             });
        }else{
        	flag = true;
        }
       
       
        if(!flag){
        	 return false;
        }
        
		layer.open({
			type:1,
			title:false,
			closeBtn:false,
			area: ['530px', $("#netpayLayerTip").height()+'px'], //宽高
			content:$("#netpayLayerTip")
		})
        
        var url = basePath+"/member/account/cashConfirm";
		var type2 = $("#cashtypes li.on").attr("type") == 'base' ? "NORMAL":"URGENT" ;
        url = url + "?amount=" + $("#amount").val() +"&withdrawType="+type2;
        if($("#deductFee").is(':checked')){
        	url=url+"&cashCoupon=1";
        }
        $(this).attr("href", url);
        return true;
	});
})

function initCashTypes(){
	$("#cashtypes li").on("click",function(){
		var _this=$(this);
		var amount = $("#amount").val();
		var cashtype=_this.attr("type");
		if(t0Switch=='true'&&!_this.hasClass("disabled")){
			if(cashtype=="quik"&&currentHour>=minQuikHour&&amount>t0LimitAmount){
				$("#quikTip").html("22:00~24:00申请"+formatCurrency(t0LimitAmount)+"以上的提现，将无法在当日到账");
			}else{
				(cashtype=="quik")?$("#quikCashFee").show():$("#quikCashFee").hide();
				$("#quikTip").html("");
				_this.addClass("on").siblings().removeClass("on");
			}
		}
		calateAmt();
		if(_this.hasClass("disabled")){
			layerQuickTip();
		}
	});
	
	if(redirectCode=='1'){
		redirectCode=0;
		layerFullQuataTip(t0Quota);
		return;
	}
}

//验证金额
function keyupAmount(){
	var _input = $("#amount");
	var inputValue = $.trim(_input.val());
	inputValue=inputValue.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
	inputValue=inputValue.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
	inputValue=inputValue.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
	inputValue=inputValue.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(inputValue.indexOf(".")< 0 && inputValue !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
    	inputValue= parseFloat(inputValue); 
    }
    if(inputValue>availableAmt){
    	inputValue= availableAmt;
    }
    
	_input.val(inputValue);
	
	var cashtype=$("#cashtypes li.on").attr("type");
	var amount = $("#amount").val();
	

  if (Number(amount) > Number(t0Quota)) {
    	$("#quik").addClass("disabled").removeClass("on")
    	$("#quikCashFee").hide();
    	$("#base").addClass("on")
    	tipsFlag = false;
    }else{
    	$("#quik").removeClass("disabled");
    	if(cashtype=="quik"){
    		$("#quikCashFee").show();
    	}
    
    	
    }
	if(cashtype=="quik" && currentHour>=minQuikHour && amount>t0LimitAmount){
		$("#cashtypes li[type='base']").click();
		$("#quikTip").html("22:00~24:00申请"+formatCurrency(t0LimitAmount)+"以上的提现，将无法在当日到账");
	}else{
		$("#quikTip").html("");
	}
	var cashAmount= Number(inputValue);
	
	calateAmt();
}
function checkAmount() {
    var _input = $("input[name=amount]");
    var _val = $("#amount").val();
    var _tips = $("#formtip1");
    _input.removeClass("Validform_error");
    _tips.html("");

    if (_val == "" || isNaN(_val) || Number(_val) <= 0) {
    	_input.addClass("Validform_error");
        _tips.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入正确的提现金额</span>');
        return false;
    } else if (Number(_val) > Number(maxCashAmt)) {
        _input.addClass("Validform_error");
        _tips.html('<span class="errortip"><i class="icon-font icon-error"></i>单笔提现金额最高为' + tempAmt + '元</span>');
        return false;
    } else if (Number(_val) < Number(minCashAmt)) {
    	_input.addClass("Validform_error");
        _tips.html('<span class="errortip"><i class="icon-font icon-error"></i>单笔提现金额最低为' + minCashAmt + '元</span>');
        return false;
    }
    if (Number(_val) > Number(availableAmt)) {
    	_input.addClass("Validform_error");
        _tips.html('<span class="errortip"><i class="icon-font icon-error"></i>提现金额不能大于账户余额</span>');
        return false;
    }
    //计算提现手续费
    calateAmt();

    return true;
}
//计算提现手续费
function calateAmt() {
    var amount = Number($("#amount").val());
    if(amount=='' || amount < Number(minCashAmt)){
    	amount=0;
    }
    
	var cashtype = $("#cashtypes li.on").attr("type");
	var fee = 0;
	var text = "";
	if(cashtype=="quik" ){//t0提现
		if(remainT0Count<=0){//是否前三次
			text = singleCashFee+"元/笔+提现金额×"+feeRate*100+"%";
			fee = Number((amount*feeRate).toFixed(2)) + singleCashFee;
		}else if (freeAmt <amount){//免费额度不足
			text = singleCashFee+"元/笔+提现金额×"+feeRate*100+"%,已超过免费额度";
			fee = Number((amount*feeRate).toFixed(2)) + singleCashFee;
		}else{
			text = "提现金额×"+feeRate*100+"%,今天剩余"+remainT0Count+"次手续费优惠次数, 超过次数将收取"+singleCashFee+"元/笔+提现金额×"+feeRate*100+"%的手续费";
			fee = Number((amount*feeRate).toFixed(2));
		}
	}else{
		if(remainT1Count<=0){
			text = singleCashFee+"元/笔";
			fee = singleCashFee;
		}else if (freeAmt <amount){
			text = singleCashFee+"元/笔,已超过免费额度";
			fee = singleCashFee;
		}else{
			text = "今天剩余"+remainT1Count+"次手续费优惠次数, 超过次数将收取"+singleCashFee+"元/笔手续费";
		}
	}
	if(cashtype=="quik" && $("#deductFee").is(':checked')){//勾选免费提现
		fee=0;
	}
	if( !isUser){
		fee=0;
	}
	if(amount==0 || amount<fee){
		fee=0;
	}
		
	$(".notes").html(text);
	$("#fee").html(formatCurrency(fee));
	$("#relAccount").html(formatCurrency(amount-fee));
    	
}
//提现冻结资金说明
function layerFrozenTip(){
	var _content='<p class="textIndent2">确认提现后您将进入银行存管页面进行操作，资金会进入冻结状态。</p><p class="textIndent2">若未能成功提交提现申请（无论是否输入过交易密码），则资金会在30分钟内解冻并退回至账户余额，请您放心~</p>'
	layer.open({
		  content:_content,
		  title:'提现冻结资金说明',
		  btn: ['我知道了'],
		  yes: function(index, layero){
		    layer.closeAll();
		  }
		});
}

function layerFullQuataTip(amt){
	var _content='<p class="textIndent2">当日剩余快速提现额度：'+amt+'元</p><p class="textIndent2">您当前输入的提现金额已超出当日的快速提现额度，请修改提现金额或更改为普通提现。快速提现额度将在次日0点自动恢复。给您带来的不便敬请谅解。</p>'
	layer.open({
		  content:_content,
		  title:false,
		  closeBtn:false,
		  btn: ['我知道了'],
		  yes: function(index, layero){
		    layer.closeAll();
		  }
		});
}

function layerQuickTip(){
	if(t0Quota>0){
		layerFullQuataTip(t0Quota);
		return;
	}
	var _content='<p class="textIndent2"> 当日的快速提现额度已用尽，请更改为普通提现或次日再次申请。快速提现额度将在次日0点自动恢复，给您带来的不便敬请谅解。</p>'
		layer.open({
			  content:_content,
			  title:false,
			  closeBtn:false,
			  btn: ['我知道了'],
			  yes: function(index, layero){
			    layer.closeAll();
			  }
			});
}
//全部提现
function cashAll(){
	if(availableAmt<minCashAmt){
		layer.msg("单笔提现金额最低"+minCashAmt+"元，当前账户余额不足"+minCashAmt+"元");
	}else{
		$("#amount").val(availableAmt);
	}
}