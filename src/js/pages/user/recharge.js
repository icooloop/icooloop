/**
 * Created by lib on 2019/1/1.
 */
var rechargeCodeFlag = false;
var _tips1 = $("#formtip1");
var _tips2 = $("#formtip2");
var _tips3 = $("#formtip3");

var depositCheck =($("#needDeposit").val()=="true"); //是否开通存管
//1.1 美化单复选框
$('input.icheck').iCheck({
	checkboxClass:'icheckbox',
	radioClass:'iradio' 
}); //icheck

+(function(){
	$("#nav_member").addClass("on");
//	var _cztype=getQueryString("cztype");
//	if(_cztype){
//		$(".mu-recharge .headmenu li[type='"+_cztype+"']").addClass("on").siblings().removeClass("on");
//		$(".mu-recharge .rechargebd section[type='"+_cztype+"']").show().siblings().hide();
//	} 
	if(depositCheck){
		layerDeposit();
	}
	$("#rechargetypes li").on("click",function(){
		var _this=$(this);
		_this.addClass("on").siblings().removeClass("on");
		var type=_this.attr("type");
		$(".mu-recharge .rechargebd section[type='"+type+"']").show().siblings().hide();
		if(type=='z-pay'){//转账充值
			$("#default_tips").hide();
			$("#tranfer_tips").show();
		}else{
			$("#default_tips").show();
			$("#tranfer_tips").hide();
		}
	});
	
	if($("#defaultChannel").val()==="8"){
		$("#rechargetypes li").eq(0).click();
	}else{
		$("#rechargetypes li").eq(1).click();
		
	}

})()


//验证充值金额
function checkAmount(valId,tipId){
	var rechargeTypeFlag = $("#rechargetypes li.on").attr("type")=='q-pay';//是否为快捷支付
    var _input=$(valId),_val = $(valId).val(),_tips=$(tipId);
	_input.removeClass("Validform_error");
    _tips.html('');
    if (_val == "") {
    	_input.addClass("Validform_error");
        _tips.html('<span class="errortip"><i class="icon-font icon-error"></i>充值金额不能为空</span>');
        return false;
    }
    if (isNaN(_val) || Number(_val) <= 0) {
    	_input.addClass("Validform_error");
    	_tips.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入正确的数字</span>');
        return false;
    }
    if (_val == "" || _val.length < 1 || typeof(_val) == "undefined") {
    	_input.addClass("Validform_error");
    	_tips.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入充值金额</span>');
        return false;
    }
    if (parseInt(_val) != _val) {
    	_input.addClass("Validform_error");
    	_tips.html('<span class="errortip"><i class="icon-font icon-error"></i>充值金额必须是整数</span>');
        return false;
    }
    if (Number(_val) < 100) {
    	_input.addClass("Validform_error");
    	_tips.html('<span class="errortip"><i class="icon-font icon-error"></i>充值金额不能低于100元</span>');
        return false;
    }
    //快捷充值判断
    if(rechargeTypeFlag){
    	 var singleAmount = $("#singleAmount").val();
    	 var remainderDayAmount = $("#remainderDayAmount").val();
    	 var signleDayAmount = $("#signleDayAmount").val();
    	 if(singleAmount>0){
    		 if(Number(_val)>singleAmount){
		    	 _input.addClass("Validform_error");
		    	 layer.alert('充值金额超过单笔限额，请修改金额分多次充值，或选择网银充值');
		    	 //_tips.html('<span class="errortip"><i class="icon-font icon-error"></i></span>');
    			 return false;
        	 }
    	 }
    	
    	 if(signleDayAmount>0){
    		 if (Number(_val) > remainderDayAmount) {
    			 _input.addClass("Validform_error");
		    	 layer.alert('充值总金额超过单日限额，请选择网银充值，或拨打客服热线：400-090-9968');
    			 //_tips.html('<span class="errortip"><i class="icon-font icon-error"></i>充值总金额超过单日限额，请选择网银充值，或拨打客服热线：400-090-9968</span>');
                 return false;
             }
    	 }
    	
    }
    _tips.html('');
    return true;
}
function changeAmount(valId,afterAmountId){
	var amount=parseInt($(valId).val());
	var beforeAmount=parseFloat($("#availableAmt").val());
	$(afterAmountId).html(formatCurrency(beforeAmount+amount,true)+"元");
}

//3 快捷充值
//2.0 监听充值金额改变
function amountChange(){
	changeAmount("#amount","#afterAmount");
}
//2.1 验证充值金额
function amountCheck() {
	var valId="#amount",tipId="#formtip1";
	return checkAmount(valId,tipId);
}

var isInvest = $("#goRechageAmt").val() != '';
//2.6 提交快捷充值表单
$("#qpaySubmitBtn").on('click', function () { //快捷支付提交
	if(depositCheck){
		layerDeposit();
		return false;
	}
	if(!amountCheck()){
		return false;
	}
	var loanMaxLimit=$("#loanMaxLimit").val();
	console.log(loanMaxLimit)
	if(loanMaxLimit==-1){
		layer.open({
		  title:'提示',
		  content: '依照监管部门要求，亿钱贷平台对出借人总数进行控制，暂不开放新增出借人。您充值后可能无法及时出借获得收益，请确认是否继续充值？<a href="'+basePath+'/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a>'
		  ,btn: ['继续充值','取消']
		  ,yes: function(index, layero){
			  continueQuickRecharge();
		  }
		  ,btn2: function(index, layero){
			 layer.closeAll();
		  }
		});
		return false;
	}
	if(loanMaxLimit==-2){
		layer.open({
		  title:'提示',
		  content: '依照监管部门要求，亿钱贷平台对出借人总数进行控制，当前出借人总数已接近上限。您充值后请尽快出借。<a href="'+basePath+'/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a>'
		  ,btn: ['继续充值','取消']
		  ,yes: function(index, layero){
			  continueQuickRecharge();
		  }
		  ,btn2: function(index, layero){
			 layer.closeAll();
		  }
		});
		return false;
	}
	continueQuickRecharge();
})
function continueQuickRecharge(){

	if(amountCheck()){
		layer.open({
			type:1,
			title:false,
			closeBtn:false,
			area: ['530px', $("#netpayLayerTip").height()+'px'], //宽高
			content:$("#netpayLayerTip")
		})
	    //$("#netRechargeTitle").text('请在新打开的 ' + selectBankname + ' 页面完成充值');
	    var amount = $("#amount").val();
		var bankCode = $("#bankCode").val();
	    var url = basePath+"/member/account/netsaveConfirm";
	    url = url + "?rechargeType=8&amount=" + amount + "&bankCode=" + bankCode;
	    $("#qpaySubmitBtn").attr("href", url);
	}
}
//3 网银充值
var banklistShowAll=false;
var selectBankcode="";
var selectBankname="";
+(function(){
	initBanklist();
})()
//3.0 监听充值金额改变
function amountChange2(){
	changeAmount("#amount","#afterAmount");
}
//3.1 验证充值金额
function amountCheck2() {
	var valId="#amount",tipId="#formtip2";
	return checkAmount(valId,tipId);
}
//3.2 银行卡
function initBanklist(){
	var banklistItem=$("#banklist li");
	selectBankcode=banklistItem.eq(0).attr("bankcode");
	banklistItem.eq(0).addClass("on");
	changeBankInfo(selectBankcode);
	banklistItem.slice(7).hide();
	banklistItem.last().show();
}
//3.3 选择银行卡
function selectBank(obj){
	var _this=$(obj);
	selectBankcode=_this.attr("bankcode");
	_this.addClass('on').siblings().removeClass('on');
	//$("#banklist").prepend('<li bankcode="'+selectBankcode+'" bankname="'+selectBankname+'" class="on"  onclick="selectBank(this)"><img src="'+basePath+'/public/images/bank/'+selectBankcode+'.png"></li>');
	//_this.remove();
	changeBankInfo(selectBankcode);
}
function changeBankInfo(bankcode){
	$.each(BankinfoList,function(index,bankinfo){
		if(bankinfo.bankcode==bankcode){
			var _bankinfoTableSZ=[];
			_bankinfoTableSZ.push('<tr><th width="100">银行名称</th><th width="120">单笔限额（元）</th><th width="120">单日限额（元）</th><th>所需网银类型</th></tr>');
			selectBankname=bankinfo.bankname;
			$.each(bankinfo.limitlist,function(index2,limitinfo){
				_bankinfoTableSZ.push('<tr>');
				if(index2==0){
					_bankinfoTableSZ.push('<td rowspan="'+bankinfo.limitlist.length+'">'+bankinfo.bankname+'</td>');
				}
				_bankinfoTableSZ.push('<td>'+limitinfo.singleLimit+'</td>');
				_bankinfoTableSZ.push('<td>'+limitinfo.dayLimit+'</td>');
				_bankinfoTableSZ.push('<td class="text-l">'+limitinfo.type+'</td></tr>');
			});
			$("#bankinfoTable").html(_bankinfoTableSZ.join(''));
			$("#bankHotlineTip").html("如需了解更多，请致电"+bankinfo.bankname+"服务热线："+bankinfo.hotline);
		}
	});
}
//3.4 更多银行卡
$("#banklistMore").on("click",function(){
	var banklistItem=$("#banklist li");
	if(banklistShowAll){
		banklistShowAll=false;
		banklistItem.slice(7).hide();
		banklistItem.last().show();
		$("#banklistMore .icon-font").html("&#xe601;");
	}else{
		banklistShowAll=true;
		banklistItem.show();
		$("#banklistMore .icon-font").html("&#xe67c;");
	}
})
$("#goRechargeBtn").on('click', function () {
	if(depositCheck){
		layerDeposit();
		return;
	}

	if(!amountCheck2()){
		return false;
	}
	var loanMaxLimit=$("#loanMaxLimit").val();
	console.log(loanMaxLimit)
	if(loanMaxLimit==-1){
		layer.open({
		  title:'提示',
		  content: '依照监管部门要求，亿钱贷平台对出借人总数进行控制，暂不开放新增出借人。您充值后可能无法及时出借获得收益，请确认是否继续充值？<a href="'+basePath+'/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a>'
		  ,btn: ['继续充值','取消']
		  ,yes: function(index, layero){
			  continueBankRecharge();
		  }
		  ,btn2: function(index, layero){
			 layer.closeAll();
		  }
		});
		return false;
	}
	if(loanMaxLimit==-2){
		layer.open({
		  title:'提示',
		  content: '依照监管部门要求，亿钱贷平台对出借人总数进行控制，当前出借人总数已接近上限。您充值后请尽快出借。<a href="'+basePath+'/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a>'
		  ,btn: ['继续充值','取消']
		  ,yes: function(index, layero){
			  continueBankRecharge();
		  }
		  ,btn2: function(index, layero){
			 layer.closeAll();
		  }
		});
		return false;
	}
	
	continueBankRecharge();
	
})
function continueBankRecharge(){

	if (amountCheck2()) {
		layer.open({
			type:1,
			title:false,
			closeBtn:false,
			area: ['530px', $("#netpayLayerTip").height()+'px'], //宽高
			content:$("#netpayLayerTip")
		})
	    //$("#netRechargeTitle").text('请在新打开的 ' + selectBankname + ' 页面完成充值');
	    var amount = $("#amount").val();
	    var url = basePath+"/member/account/netsaveConfirm";
	    url = url + "?rechargeType=6&amount=" + amount +"&bankCode="+selectBankcode;
	    $("#goRechargeBtn").attr("href", url);
	}
}


//4 转账充值
var zpaybankCheckFlag=false;
//4.1 验证付款银行卡号
function zpaybankCheck(){
	var th=$("#zpaybank");
	var v=$.trim(th.val());
	 _tips3.html('');
	 th.removeClass("Validform_error");
	if (v=="") {
    	th.addClass("Validform_error");
    	_tips3.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入付款银行卡号</span>');
        return false;
    }
	 $.ajax({
         type: "post",
         dataType: "json",
         url: basePath +"/member/auth/checkBankno",
         data: { bankNo:v,validOnly:"true"},
         success: function (data) {
             console.log(data); 
             if(!data.successed){
            	 th.addClass("Validform_error");
            	 _tips3.html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.message+'</span>');
            	 zpaybankCheckFlag=false;
             }else{
            	 _tips3.html('');
            	 th.removeClass("Validform_error");
            	 zpaybankCheckFlag=true;
             }
         }
     });
	return true;
}

//4.2 验证充值金额
function amountCheck3() {
	var valId="#amount",tipId="#formtip3";
	var flag=checkAmount(valId,tipId);
/*	if(flag) $("#DXamount").html(smalltoBIG(parseInt($("#amount").val())));*/
	return flag;
}
//4.3 使用绑定银行卡
function useBindbank(bankNo,reserveMobile){
	if(depositCheck){
		layerDeposit();
		return false;
	}
	$("#zpaybank").val(bankNo);
	$("#zpMobile").val(reserveMobile);
	zpaybankCheck();
	zpMobileCheck();
}
//4.4 银行预留手机号
var mobileReg = /^(13|14|15|16|18|17|19)[0-9]{9}$/;
function zpMobileCheck(){
	var th=$("#zpMobile");
	var v=$.trim(th.val());
	 _tips3.html('');
	 th.removeClass("Validform_error");
	if (v=="") {
    	th.addClass("Validform_error");
    	_tips3.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入银行预留手机号</span>');
        return false;
    }
	if (!mobileReg.test(v)) {
    	th.addClass("Validform_error");
    	_tips3.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入正确的银行预留手机号</span>');
        return false;
    }
    return true;
}
//4.5 提交转账充值表单
$("#zpaySubmitBtn").on("click",function(){
	if(depositCheck){
		layerDeposit();
		return false;
	}
	
	var submitFlag=(zpaybankCheckFlag||zpaybankCheck())&&zpMobileCheck()&&amountCheck3();
	if(!submitFlag){
		return false;
	}
	$("#zpaySubmitBtn").addClass("disabled").attr("disabled",true);
	_tips3.html('');
    $.ajax({
        type: "post",
        dataType: "json",
        url: basePath +"/member/account/tranferRecharge",
        data: {
            amount: $('#amount').val(),
            userMobile: $('#zpMobile').val(),
            zpaybank: $('#zpaybank').val()
        },
        success: function (data) {
        	$("#zpaySubmitBtn").removeClass("disabled").attr("disabled",false);
            if (data.successed) {
            	$("#zpaySubmitBtn").parent().hide();
            	$("#zpayRemark").text(data.matchCode);
        		$("#zpayFKFInfo").show();
            } else {
            	_tips3.html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.message+'</span>');
            }                            
        }
    });   
})

//4.6网银选择其他方式
function switchRecharge(){
	//关闭弹窗
	layer.closeAll();
	var amout = Number($("#amount").val());
	// 若充值金额大于等于30万元，则点击后选中转账充值方式； 否则，默认选中 “快捷支付”；
	if(amout>=300000){
		$(".mu-recharge .headmenu li a:eq(2)").click();
	}else{
		$(".mu-recharge .headmenu li a:eq(0)").click();
	}
}

$("#zpayCancelBtn").on("click",function(){
	$("#zpMobile").val("");
	$("#zpaybank").val("");
	$("#amount").val("");
	/*$("#DXamount").html("");*/
	$("#zpaySubmitBtn").parent().show();
	$("#zpayFKFInfo").hide();
})
 // 升级
$("#validChangechannelBtn").on('click',function(){
	layer.open({
		type: 2,
      	area: ['530px', '420px'], //宽高
      	title:false,
      	content: basePath+'/member/account/rechargeUp'
	})
});

/** 数字金额大写转换(可以处理整数,小数,负数) */    
function smalltoBIG(n){    
    var fraction = ['角', '分'];    
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
    var head = n < 0? '欠': '';    
    n = Math.abs(n);    
  
    var s = '';    
  
    for (var i = 0; i < fraction.length; i++)     
    {    
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
    }    
    s = s || '整';    
    n = Math.floor(n);    
  
    for (var i = 0; i < unit[0].length && n > 0; i++)     
    {    
        var p = '';    
        for (var j = 0; j < unit[1].length && n > 0; j++)     
        {    
            p = digit[n % 10] + unit[1][j] + p;    
            n = Math.floor(n / 10);    
        }    
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
    }    
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
}  
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 