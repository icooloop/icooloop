/**
 * Created by lidy on 2017/11/11.
 */
var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var fn = null;
var ticketStr="";
var couponIdsStr=[];
var finalInvestTotal=0;
var finalAddDays=-1;
var isFirstPage=true;

/**
 * @returns
 */
var isRecharge=false;
// 需要充值的金额
var goRechageAmt = 0;
var goInvestAmt = 0;
//分页
function initPage(){
	$("#laypage").pagination({
		totalCount : totalCount,
		pageSize : pageSize,
		clickEvent : function(page_index, _this) {
			$("#pageNo").val(page_index + 1);
			fn();
		}
	});
}
var productDetailObj;
+function () {
	getTotalDueByUserId();
    var productDetail = function () {//构造函数
        this.$productDetailBar = $("#productDetailBar");
        this.$subscriptionBtn = $("#subscriptionBtn");
        this.$subscriptionTxt = $("#subscriptionTxt");
        this.submitSubscriptionBtn = $("#submitSubscriptionBtn");
    }
    productDetail.prototype = {
        init: function () {
            this.setProgress();
        },
        setProgress: function () { //设置进度效果
            var $progressBar = this.$productDetailBar.find('.progress-bar');
            $progressBar.css({
                width: $progressBar.data('progress') + '%'
            })
        }
    }
    new productDetail().init();
    initInvetsRecord();
	productDetailObj= new productDetail();
	initIcheckEvent();
	initClick();
}();

function getTotalDueByUserId(){
	if(userId!=""){
		var url = basePath+"/product/getTotalDueByUserId";
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:{userId:userId},
			cache:false,
			success:function(data){
				var result = eval("("+data+")");
				if(result.success != undefined && result.success){
					totalDue=(result.data)[0].totalDue;
				}
			}
		});
	}
}

/**
 * 初始化icheck事件 
 * @returns
 */
function  initIcheckEvent(){
	
    $('#agreement').iCheck({ //checkbox增强
    	checkboxClass: 'icheckbox'
    });
    
}
/**
 * 弹出确认出借
 * @returns
 */
var layerIndex=null;
function initClick(){
	//点击出借弹出确认出借灯箱
	 $("#subscriptionBtn").on('click', function () {
		 var depositCheck =($("#isDepositary").val()=="0"); //是否开通存管
	     if(depositCheck){
	         layerDeposit();
	         return false;
	     }
		 ticketStr="";
		 couponIdsStr=[];
    	var investAmt=$("#subscriptionTxt").val();//受让金额
    	var _thisVal = $.trim(investAmt);
    	var _this=$("#subscriptionTxt");
    	var investAmt = Number(_thisVal);
    	 if(!assessStatus){
			 layer.open({
				    type: 1,
				    shade: 0.8,
				    title: false,
				    closeBtn:false,
				    area:['600px','auto'],
				    content: $('#userRiskDiv')
				});
			return ;
		 }
    	if(investAmt>availableAmt){
			return showErrorTip("可用余额不足，请充值");
		}
    	if(layerIndex!=null){
    		layer.close(index); 
    	}
		 if((totalDue+investAmt)>userAssessLimit*10000){
			 $("#totalDueStr").text(formatCurrency(totalDue)+"");
			 layer.open({
				    type: 1,
				    shade: 0.8,
				    title: false,
				    area:['480px'],
				    content: $('#riskModel')
				});
			 return false;
		 }
		 layer.open({
	         type: 1,
	         area: ['480px', 'auto'], //宽高
	         title: "受让确认",
	         shadeClose: true,
	         content: $("#subscriptionLayer")
	     });
    });
	 
    $("#submitSubscriptionBtn").on('click', confirmInvest);
   	$("#agreement").on('ifChanged',function(){
   		if($(this).is(':checked')){
   			$("#submitSubscriptionBtn").removeClass('disabled');
		}else{
            $("#submitSubscriptionBtn").addClass('disabled');
		}
	})
}

function confirmInvest(){
			//同意协议
			if(!$("#agreement").is(':checked')){
				layer.msg('请勾选债权转让协议')
				return ;
			}
        	//如果余额不足点击后去充值
        	//判断是否可以出借
        	var investAmt=parseInt($("#subscriptionTxt").val());
        	var load_index= layer.load(2,{skin:''});
        	var url = basePath+"/transfer/trade/confirm";
        	$("#submitSubscriptionBtn").button('loading');//loading
        	$.ajax({
        		url:url,
        		type:'post',
        		dataType:'json',
        		data:{transferApplyId:transferApplyId},
        		cache:false,
        		success:function(data){
        			layer.close(load_index);
        			var result = eval("("+data+")");
        			if(result.success != undefined && result.success){
        				window.location.href = basePath + '/transfer/trade/success';
        			}else {
        				setTimeout(function(){
        					$("#submitSubscriptionBtn").button('reset');//恢复按钮
        				},3000)
        				
        				layer.msg(result.msg)
        			}
        		}
        	});
        	
}

/**
 *显示出借记录
 **/
function initInvetsRecord () { 
	var url = basePath+"/product/invest/record/"+loanId;
	var _table=$('#investRecordTable');
	_table.empty();
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{pageNo:$('#pageNo').val(),'pageSize':pageSize},
		cache:false,
		async:false,
		success:function(data){
			var result = $.parseJSON(data);
			var html=[];
			if(result.count > 0){
				$.each(result.data,function(i,o){
					html.push('<tr><td>',o.starUserName,'</td>');
					var investAmtStr = formatCurrency(o.investAmt) + '';
					investAmtStr = investAmtStr.substring(0, investAmtStr.indexOf("."));
					html.push('<td>',investAmtStr,'</td>');	
					html.push('<td>',formartDate(o.investTime,"yyyy-MM-dd hh:mm:ss"),'</td>');	
					html.push('</tr>');
				});
				
			}else{
				html.push('<tr><td colspan="3"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>')
			}
			_table.append(html.join(''));
			totalCount = result.count;
			if(isFirstPage){//初始化分页，后续只修改列表值
				isFirstPage=false;
                initPage();
			}
			if(totalCount>pageSize){
				fn=initInvetsRecord;
				$('#laypage').show();
			}else{
				$('#laypage').hide();
			}
		}
	});
}




function hideErr(_this){
	hideErrorTip();
}

function disableBidbtn(){
	$("#btnJoin").unbind("click").addClass("btn-gray");
	$("#btnJoin").attr("disabled", true);
}
function enableBidbtn(){
	$("#btnJoin").bind("click",function(){doBid();}).removeClass("btn-gray");
	$("#btnJoin").removeAttr("disabled");
}
//材料画廊
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

function needRisk(){
	window.location.href=basePath+"/member/auth/risk-ass";
}

function showErrorTip(msg){
	$("#subscriptionDiv").addClass('has-error has-feedback').removeClass('has-success');
	$("#errorMsg").html(msg).parent().css('visibility',	'visible');// 显示错误信息
	$("#errorMsg").html(msg).parent().show();
}


