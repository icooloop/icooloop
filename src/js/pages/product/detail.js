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
 * 确认出借
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
var currentLoanPeriodUnit = 0, currentLoanPeriod = 0, currentRate = 0, voteInvestAmt = 0,extraRate=0;
var baseIncome = 0,awardIncome = 0,redIncome = 0,baseDesc='',awardDesc='',redDesc='';//项目收益，加息奖励，红包/加息券收益
var awardType="";
var productDetailObj;
+function () {
	getTotalDueByUserId();
    var productDetail = function () {//构造函数
        this.$productDetailBar = $("#productDetailBar");
        this.$subscriptionBtn = $("#subscriptionBtn");
        this.$subscriptionMoney = $("#subscriptionMoney");
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
	currentLoanPeriodUnit =unit;
	currentLoanPeriod =loanPeriod;
	currentRate = $.trim($("#currentRate").val());
	initIcheckEvent();
	initClick();
	if($("input[name='ticketArr']").length>0){
		$("input[name='ticketArr']").each(function (){
			var ticketInpuVal=$(this).val();
			ticketInpuVal=ticketInpuVal.split("-");
			var ticketJson={awardDtlId:ticketInpuVal[0],awardAmount:ticketInpuVal[1],limitAmount:ticketInpuVal[2],addDays:ticketInpuVal[3],limitPeriodsStr:ticketInpuVal[4]}
			ticketArr.push(ticketJson);
		});
	}
	if($("input[name='vouchersArr']").length>0){
		$("input[name='vouchersArr']").each(function (){
			var vouchersInpuVal=$(this).val();
			vouchersInpuVal=vouchersInpuVal.split("-");
			var vouchersJson={awardDtlId:vouchersInpuVal[0],awardAmount:vouchersInpuVal[1],limitAmount:vouchersInpuVal[2],addDays:vouchersInpuVal[3],limitPeriodsStr:vouchersInpuVal[4]}
			vouchersArr.push(vouchersJson);
		});
	}
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
    	var investAmt=$("#subscriptionTxt").val();//出借金额
    	baseIncome=calculateIncome(investAmt,platRate);//基本利息
    	baseDesc='项目收益 '+formatCurrency(baseIncome)
     	if(awardRate>0){
     		awardIncome=calculateIncome(investAmt,awardRate);//奖励利息
     		awardDesc=' + 出借奖励 '+formatCurrency(awardIncome);
     	}
    	var investAmtStr =formatCurrency(investAmt)+"";
    	investAmtStr=investAmtStr.substring(0,investAmtStr.indexOf("."));
    	$("#investAmtTd").html(investAmtStr);
    	var _thisVal = $.trim(investAmt);
    	var _this=$("#subscriptionTxt");
    	if(investAmt==""){
    		showErrorTip('请输入出借金额');
    		return false;
    	}
    	var investAmt = Number(_thisVal);
    	if (investAmt <= 0) {
    		showErrorTip('出借金额必须大于0');
    		return false;
    	}
    	if(isLimitInvert){
    		layer.open({
			  title:'提示',
			  content: '依照监管部门要求，亿钱贷平台对出借人总数进行控制，暂不开放新增出借人。<a href="'+basePath+'/loanControl/controlIntroduce" class="text-primary underline" target="_parent">点击查看详情</a>'
			});
    		return false;
    	}
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
    	if(remainInvestAmt<=minAmt){//如果是最后一笔，则必须得满标，
    		if(investAmt!=remainInvestAmt){
    			showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
    			return false;
    		}
    		if(investAmt===remainInvestAmt){
    			hideErrorTip();
    		}
    	}
    	if(minAmt<remainInvestAmt&&remainInvestAmt<=maxAmt){//如果剩余可投金额在最大限投和最小限投之间
    		if(investAmt<minAmt){//如果出借金额小于最低出借金额
        		showErrorTip('最低出借'+minAmt+"元");
        		return false;
        	}
    		if(investAmt>maxAmt){//如果出借金额大于最大出借金额
    			if(investAmt>remainInvestAmt){
    				showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
    				//自动更改出借金额为剩余可出借金额
    				$("#subscriptionTxt").val(remainInvestAmt);
    	    		return false;
    			}
        		showErrorTip('最大单笔出借金额为'+maxAmt+"元");
        		return false;
        	}
    		if(investAmt>remainInvestAmt){//如果出借金额大于剩余可投金额
        		showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
        		//自动更改出借金额为剩余可出借金额
    			$("#subscriptionTxt").val(remainInvestAmt);
        		return false;
        	}
    		if(investAmt<minAmt){
    			showErrorTip('最低出借'+minAmt+"元");
        		return false;
    		}
    	}
    	if(remainInvestAmt>maxAmt){//如果出借金额大于最大出借金额
    		if(investAmt>maxAmt){//如果出借金额大于最大出借金额
        		showErrorTip('最大单笔出借金额为'+maxAmt+"元");
        		return false;
        	}
    		if(investAmt<minAmt){//如果出借金额大于最大出借金额
        		showErrorTip('最低出借'+minAmt+"元");
        		return false;
        	}
    	}
    	
    	if(investAmt>availableAmt){
			return showErrorTip("可用余额不足，请充值");
		}
    	
    	var awardInterest=0;
    	var baseInterest=calculateIncome(investAmt,platRate);//基本利息
    	if(awardRate>0){
    		awardInterest=calculateIncome(investAmt,awardRate);//奖励利息
    	}
    	/*$("#interestInputAmt").val(baseInterest+awardInterest);
    	$("#interestAmtTd").html(formatCurrency(baseInterest+awardInterest));
    	*/
    	//getIncoming(investAmt);
    	if(layerIndex!=null){
    		layer.close(index); 
    	}
    	finalInvestTotal=investAmt;
    	var subscriptionMoney =formatCurrency(investAmt)+"";
		subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
        var textStr='实付<span id="subscriptionMoney">'+subscriptionMoney+'</span>元'
		$("#submitSubscriptionBtn").html(textStr);
        $("#amtBtn").html('“实付'+(subscriptionMoney)+'元”');
        if(ticketList.data.length||voucherList.data.length){
            var limintInterestList=[];
            var optionHtml='<select id="selectVoucher" name="" class="selectpicker discount-select" multiple>';
            var subAmt=investAmt; //剩余金额=出借金额
            var limitAmt=0;
            var redAmt=0;
            var maxRate = 0;
            var maxTikect =null;
            var ticketAmt=0;//奖励券收益
            var currDays=(currentLoanPeriodUnit == 0)?loanPeriod:loanPeriod*30;
            var ticketId=null;
            
			var olist = new Array();
    		$.each(voucherList.data,function(i,o){
				// zere_one_page_create(红包限定金额,红包金额,数据库id)
    			if(o.limitPeriods<=currDays && o.limitAmount<=investAmt){
    				olist.push(zere_one_page_create(o.limitAmount, o.awardAmount, o.awardDtlId));
    			}
    		});
    		var pag = investAmt;
			var redResult = zere_one_page_table(pag, olist);
			var redAmtTotal=zere_one_page_total(redResult);//红包收益
			for(var i in ticketList.data){//添加可用奖励券
            	var item =ticketList.data[i];
            	if(item.limitPeriods<=currDays && item.limitAmount<=investAmt && maxRate<item.awardAmount){
            		maxRate=item.awardAmount;
            		ticketId = item.awardDtlId;
            		ticketAmt=calculateIncome(subAmt, item.awardAmount);//奖励券收益            			
            	}
            }
			console.log(redAmtTotal,ticketAmt,ticketId);
			
			$.each(voucherList.data,function(i,o){//添加可用红包
            	if(o.limitAmount<=investAmt){//红包可用
            		var selected = "";
            		limintInterestList.push(o);//
            		$.each(redResult,function(ii,oo){
						if(o.awardDtlId==oo.id && redAmtTotal >ticketAmt){//红包收益大于奖励券收益选择红包
							maxRate=0;
							selected = "selected";
							redAmt = redAmt+o.awardAmount;
							limitAmt = limitAmt+ o.limitAmount;
							couponIdsStr.push(o.awardDtlId);
						}
	        		});
            		optionHtml+='<option '+selected+' data-limitAmount="'+o.limitAmount+'" data-awardAmount="'+o.awardAmount+'" data-addDays="'+o.addDays+'" data-awardType="'+o.awardType+'" value="'+o.awardDtlId+'">'+o.limitRemarkStr+'</option>'
            	}else{
            		optionHtml+='<option disabled data-limitAmount="'+o.limitAmount+'" data-awardAmount="'+o.awardAmount+'" data-addDays="'+o.addDays+'" data-awardType="'+o.awardType+'" value="'+o.awardDtlId+'">'+o.limitRemarkStr+'</option>'
            	}
			});
            for(var i in ticketList.data){//添加可用奖励券
            	var item =ticketList.data[i];
            	if(item.limitAmount<=investAmt){
            		var selected = "";
            		if(ticketId == item.awardDtlId && redAmtTotal<=ticketAmt){//红包收益小于奖励券收益选择奖励券
                		maxRate = item.awardAmount;
            			selected = "selected";
            			ticketStr=ticketId;
            			awardAmountInvest=item.awardAmount;
            		}
            		limintInterestList.push(item);
            		optionHtml+='<option '+selected+' data-limitAmount="'+item.limitAmount+'" data-awardAmount="'+item.awardAmount+'" data-addDays="'+item.addDays+'" data-awardType="'+item.awardType+'" value="'+item.awardDtlId+'">'+item.limitRemarkStr+'</option>'
            	}else{
            		optionHtml+='<option disabled data-limitAmount="'+item.limitAmount+'" data-awardAmount="'+item.awardAmount+'" data-addDays="'+item.addDays+'" data-awardType="'+item.awardType+'" value="'+item.awardDtlId+'">'+item.limitRemarkStr+'</option>'
            	}
            }
            
            optionHtml+='</select>';
            $("#voucherDiv").html(optionHtml);
           if(limintInterestList.length>0){
        	   $("#voucherTicketTr").show();
           }else{
        	   $("#voucherTicketTr").hide(); 
           }
           var selectStr = "";
           
           if(limitAmt>0||redAmt>0){
        	   selectStr = 	"满"+limitAmt+'返'+redAmt;
       		   redIncome=redAmt;
        	   redDesc=" + 红包收益 "+formatCurrency(redIncome);
        	   if(maxRate){
        		   selectStr+=","
        	   }
           }
           if(maxRate){
        	   selectStr+="奖励"+maxRate+"%";
       		   redIncome=calculateIncome(investAmt, maxRate);
        	   redDesc=" + 奖励券收益 "+formatCurrency(redIncome);
           }
           if(selectStr==''){
	       		redDesc="";
	       		redIncome=0;
	       	}
            $('#selectVoucher').selectpicker({ //红包奖励券select初始化
                iconBase: 'icon-font',
                tickIcon: 'icon-right',
                noneSelectedText:limintInterestList.length+'个可用优惠券' 
            });
        	$("#investAmtTd").html(formatCurrency(investAmt));
        	
            $('#selectVoucher').on('changed.bs.select',function(event,data,currentSelected){
            	voucherSelectOnchang(event,data,currentSelected);
            });
            $("#selectVoucherTd").find('.filter-option').text(selectStr);
            
        	var baseInterest=calculateIncome(investAmt,platRate);//基本利息
        	var awardInterest=0;
        	if(maxRate){
        		awardInterest=calculateIncome(investAmt,maxRate);//奖励利息
        	}
        	/*$("#interestInputAmt").val(baseInterest+awardInterest);
        	$("#interestAmtTd").html(formatCurrency(baseInterest+awardInterest));
        	*/
        }else{
        	$("#voucherTicketTr").hide();
        }
        getIncoming(investAmt);
		 finalAddDays-1;
		 isRecharge=false;
		 awardAmountRed=0;//红包总额
		// awardAmountInvest=0; //奖励券
		 if((totalDue+investAmt)>userAssessLimit*10000){
			 $("#totalDueStr").text(formatCurrency(totalDue)+"");
			 layer.open({
				 	type: 1,
				    shade: 0.8,
				    title: false,
				    closeBtn:false,
				    area:['480px','auto'],
				    content: $('#riskModel')
				});
			 return false;
		 }
		 if(isAssetstRisk){
			 $("#allowType").text(riskStr);
			 layer.open({
				 	type: 1,
				    shade: 0.8,
				    title: false,
				    closeBtn:false,
				    area:['480px','auto'],
				    content: $('#assetsRiskModel')
				});
			 return false;
		 }
		 layer.open({
	         type: 1,
	         area: ['480px', 'auto'], //宽高
	         title: "出借确认",
	         content: $("#subscriptionLayer")
	     });
    });
    //确认出借按钮
	 
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
				layer.msg('请勾选项目借款协议')
				return ;
			}
        	//如果余额不足点击后去充值
        	if(isRecharge){
        		//data:{loanId:loanId,investAmount:finalInvestTotal,ticket:ticketStr,couponIdsStr:couponIdsStr.join(','),goRechageAmt:goRechageAmt},
        		var _html = '';
        		_html = _html + "<input type='hidden' name='loanId' value='"+loanId+"'>";
        		_html = _html + "<input type='hidden' name='investAmount' value='"+finalInvestTotal+"'>";
        		_html = _html + "<input type='hidden' name='ticket' value='"+ticketStr+"'>";
        		_html = _html + "<input type='hidden' name='couponIdsStr' value='"+couponIdsStr.join(',')+"'>";
        		_html = _html + "<input type='hidden' name='goRechageAmt' value='"+goRechageAmt+"'>";
        		$("#submit_form").html(_html);
        		$("#submit_form").submit();
        		return;
        	}
        	//判断是否可以出借
        	var investAmt=parseInt($("#subscriptionTxt").val());
        	var error=validationInvestAmt(investAmt,finalAddDays);
        	if(error!=undefined){
        		 layer.msg(error);
        		 return;
        	}
        	var load_index= layer.load(2,{skin:''});
        	var url = basePath+"/product/invest/confirm";
        	$("#submitSubscriptionBtn").button('loading');//loading
        	$.ajax({
        		url:url,
        		type:'post',
        		dataType:'json',
        		data:{loanId:loanId,investAmount:finalInvestTotal,ticket:ticketStr,couponIdsStr:couponIdsStr.join(',')},
        		cache:false,
        		success:function(data){
        			layer.close(load_index);
        			var result = eval("("+data+")");
        			if(result.success != undefined && result.success){
        				window.location.href = basePath + '/product/invest/success';
        			}else {
        				setTimeout(function(){
        					$("#submitSubscriptionBtn").button('reset');//恢复按钮
        				},3000)
        				
        				layer.msg(result.msg)
        			}
        		}
        	});
        	
}
//根据出借金额和利率计算收益
function calculateIncome(amount,rate){
	var income = 0;
	if (currentLoanPeriodUnit == 0) {
		income = rate / 100 / 360 * amount * currentLoanPeriod;
	}else if(currentLoanPeriodUnit == 1){
		//月利率
		var yln = rate / 100 / 12;
		if (repayMode == 0) {
			// 等额本息计算方式：应收利息、已还本金之和、代收本金、应还本金、应还利息、待收本金
			var yslxh = 0,totalYhbj = 0,dsbj = 0,yhbj = 0,interest_cur = 0,zhdhbj = amount;
			// 月还本息
			var yhbx = ((Math.pow(1 + yln, currentLoanPeriod) * yln * parseInt(amount)) / (Math.pow(1 + yln, currentLoanPeriod) - 1));
			for (var i = 1; i <= currentLoanPeriod; i++) {
				interest_cur = (amount- totalYhbj) * yln;
				yhbj = yhbx- interest_cur;
				totalYhbj = totalYhbj+yhbj;
				dsbj = amount- totalYhbj;
				if (i == (currentLoanPeriod - 1)) {
					zhdhbj = dsbj;
				}
				if (i == currentLoanPeriod) {
					yhbj = zhdhbj;
					interest_cur = yhbx- yhbj;
					totalYhbj = totalYhbj+ yhbj;
					dsbj = 0;
				}
				income = income+interest_cur;
			}
		} else if (repayMode == 1) {
			//等额本金计算方式：月利率、应收本息、应收本金、应收利息、已收本金、应收本金总额
			var new_ysbx = 0,new_ysbj = 0,new_yslx = 0,new_sybj = 0,ysbjTotle = 0;
			new_ysbj = amount/currentLoanPeriod;
			for (var i = 1; i <= currentLoanPeriod; i++) {
				new_yslx = (amount - ysbjTotle) * yln;
				ysbjTotle = ysbjTotle + new_ysbj;
				new_ysbx = new_yslx + new_ysbj;
				new_sybj = amount - new_ysbj * i;
				income = income+ new_yslx;
			}
		}else{
			income = yln * amount * currentLoanPeriod;
		}
	}else if(currentLoanPeriodUnit == 2){
		income = rate / 100  * amount * currentLoanPeriod;
	}
	income=Math.floor(income * 100) / 100;
	return income;
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

/**
 * 最大出借
 * @returns
 */
function maxInvest(){
//	if(availableAmt<=0){
//		showErrorTip('账户可用余额不足，<a   target="_blank" href="'+basePath+'/spa/member/account/recharge">去充值</a>');
//		return false;
//	}
	if(remainInvestAmt<=minAmt){//如果是最后一笔，则必须得满标，
		$("#subscriptionTxt").val(parseInt(remainInvestAmt));
		 hideErrorTip();
		 return ;
	}
	var minLimitAmt=minAmt;
	if(remainInvestAmt>=maxAmt){
		minLimitAmt=maxAmt;
	}else {
		minLimitAmt=remainInvestAmt;
	}
	if(minLimitAmt>=availableAmt){
		$("#subscriptionTxt").val(parseInt(availableAmt));		
		hideErrorTip();
	}else {
		$("#subscriptionTxt").val(parseInt(minLimitAmt));		
		hideErrorTip();
	}
	/*if(minAmt<remainInvestAmt&&remainInvestAmt<=maxAmt){//发果剩余可投在最大和最小之间
		if(availableAmt>remainInvestAmt){
			$("#subscriptionTxt").val(parseInt(remainInvestAmt));
		}else {
			if(availableAmt<minAmt){
				$("#subscriptionTxt").val(parseInt(minAmt));		
			}else {
				$("#subscriptionTxt").val(parseInt(availableAmt));		
			}
		}
		hideErrorTip();
		return ;
	}
	if(remainInvestAmt>maxAmt){//如果出借金额大于最大出借金额
		if(availableAmt>maxAmt){
			$("#subscriptionTxt").val(parseInt(maxAmt));
		}else {
			$("#subscriptionTxt").val(parseInt(availableAmt));
		}
		hideErrorTip();
		return ;
	}*/
}

function showErrorTip(msg){
	$("#subscriptionDiv").addClass('has-error has-feedback').removeClass('has-success');
	$("#errorMsg").html(msg).parent().css('visibility',	'visible');// 显示错误信息
	$("#errorMsg").html(msg).parent().show();
}

function hideErrorTip(){
	$("#subscriptionDiv").removeClass('has-error').addClass('has-success has-feedback');
	$("#errorMsg").html('').parent().css('visibility', 'hidden');// 隐藏错误信息
	$("#errorMsg").html('').parent().hide();
}

function hideErr(_this){
	hideErrorTip();
}
/**
 * 验证输入框输入是否正确
 * @param _this
 */
function checkInpValid(_this){
	if(checkError(_this)){
		hideErrorTip();
		return true;
	}else {
		return false;
	}
}

function checkError(_this){
	var _thisVal = $.trim($(_this).val());
	if(_thisVal==""){
		return false;
	}
	var investAmt = Number(_thisVal);
//	if(availableAmt<=0){
//		showErrorTip('账户可用余额不足，<a   target="_blank" href="'+basePath+'/spa/member/account/recharge">去充值</a>');
//		return false;
//	}
	if(investAmt==""){
		showErrorTip('请输入出借金额');
		return false;
	}
	var investAmt = Number(_thisVal);
	if (investAmt <= 0) {
		showErrorTip('出借金额必须大于0');
		return false;
	}
	if(remainInvestAmt<=minAmt){//如果是最后一笔，则必须得满标，
		if(investAmt!=remainInvestAmt){
			showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
			return false;
		}
		if(investAmt===remainInvestAmt){
			hideErrorTip();
		}
	}
	if(minAmt<remainInvestAmt&&remainInvestAmt<=maxAmt){//如果剩余可投金额在最大限投和最小限投之间
		if(investAmt<minAmt){//如果出借金额小于最低出借金额
    		showErrorTip('最低出借'+minAmt+"元");
    		return false;
    	}
		if(investAmt>maxAmt){//如果出借金额大于最大出借金额
			if(investAmt>remainInvestAmt){
				showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
				//自动更改出借金额为剩余可出借金额
				$("#subscriptionTxt").val(remainInvestAmt);
	    		return false;
			}
    		showErrorTip('最大单笔出借金额为'+maxAmt+"元");
    		return false;
    	}
		if(investAmt>remainInvestAmt){//如果出借金额大于剩余可投金额
    		showErrorTip('该项目可出借金额仅剩'+remainInvestAmt+"元");
    		//自动更改出借金额为剩余可出借金额
			$("#subscriptionTxt").val(remainInvestAmt);
    		return false;
    	}
		if(investAmt<minAmt){
			showErrorTip('最低出借'+minAmt+"元");
    		return false;
		}
	}
	if(remainInvestAmt>maxAmt){//如果出借金额大于最大出借金额
		if(investAmt>maxAmt){//如果出借金额大于最大出借金额
    		showErrorTip('最大单笔出借金额为'+maxAmt+"元");
    		return false;
    	}
		if(investAmt<minAmt){//如果出借金额大于最大出借金额
    		showErrorTip('最低出借'+minAmt+"元");
    		return false;
    	}
	}
	return true;
}
function disableBidbtn(){
	$("#btnJoin").unbind("click").addClass("btn-gray");
	$("#btnJoin").attr("disabled", true);
}
function enableBidbtn(){
	$("#btnJoin").bind("click",function(){doBid();}).removeClass("btn-gray");
	$("#btnJoin").removeAttr("disabled");
}
/**
 * select选择事件 
 * @param obj
 * @returns
 */
var limitAmount=0;
var awardAmountRed=0;//红包总额
var awardAmountInvest=0; //奖励券
function voucherSelectOnchang(obj,data,lastSelected){
	var $currentOpt=$("#selectVoucher").find('option').eq(data);
	var awardType =$currentOpt.data('awardtype');
	var selected=$("#selectVoucher").val();
	var $allSelectedOpt=$("#selectVoucher").find('option:selected');
	var currentSelected=[];
	var $currentSelectedOpt=[];
	var adddays=-1;//奖励天数
	limitAmount=0;
	awardAmountRed=0;//红包总额
	awardAmountInvest=0; //奖励券
	finalAddDays=-1;
	couponIdsStr=[];
	if($currentOpt.data('awardtype')===2||!lastSelected){//取消选中都可以累计,只能使用一张奖励券，累加红包奖励券
		for(var i=0;i<$allSelectedOpt.length;i++){
			var $item=$allSelectedOpt.eq(i);
			currentSelected.push($item.val());
			$currentSelectedOpt.push($item);
		}
	}else{//如果当前是奖励并且是选中
		for(var i=0;i<$allSelectedOpt.length;i++){
			var $item=$allSelectedOpt.eq(i);
			if($item.data('awardtype')===2){
				currentSelected.push($item.val());
				$currentSelectedOpt.push($item);
			}
		}
		$currentSelectedOpt.push($currentOpt);
		currentSelected.push($currentOpt.val());
	}
	for(var i in $currentSelectedOpt){
		var item=$currentSelectedOpt[i];
		if(item.data('awardtype')===2){
			limitAmount+=item.data('limitamount');
			awardAmountRed+=item.data('awardamount');
		}
		if(item.data('awardtype')===3){
			awardAmountInvest=item.data('awardamount');
			adddays=item.data('adddays');
			finalAddDays=adddays;
		}
	}

	var selectStr='';
	var flag=false;
	if(limitAmount>parseInt($('#subscriptionTxt').val())){//红包不能大于当前出借金额
		for(var i in currentSelected){
			if(currentSelected[i]===$currentOpt.val()){
				currentSelected.splice(i,1);
				$currentSelectedOpt.splice(i,1);
				layer.msg('所选红包总额不能大于出借金额',{},5000);
				flag=true;
				limitAmount-=$currentOpt.data('limitamount');
				awardAmountRed-=$currentOpt.data('awardamount');
				break;
			}
		}
	}
	if(awardAmountRed && awardAmountInvest){
		for(var i in currentSelected){
			if(currentSelected[i]===$currentOpt.val()){
				currentSelected.splice(i,1);
				$currentSelectedOpt.splice(i,1);
				layer.msg('红包和奖励劵只能使用一个',{},5000);
				flag=true;
				if($currentOpt.data('awardtype')===2){
					limitAmount-=$currentOpt.data('limitamount');
					awardAmountRed-=$currentOpt.data('awardamount');
				}else{
					awardAmountInvest=0;
				}
				break;
			}
		}
	}
	var investAmt=parseInt($("#subscriptionTxt").val());
	if(awardAmountRed){
		selectStr+="满"+limitAmount+'返'+awardAmountRed;
		redIncome=awardAmountRed;
		redDesc=" + 红包收益 "+formatCurrency(redIncome);
		if(awardAmountInvest){
			selectStr+=',';
		}
	}
	if(awardAmountInvest){
		selectStr+='奖励'+awardAmountInvest+'%';
		redIncome=calculateIncome(investAmt, awardAmountInvest) ;
		redDesc=" + 奖励券收益 "+formatCurrency(redIncome); 
	}
	for(var i in $currentSelectedOpt){
		var $item=$currentSelectedOpt[i];
		if($item.data('awardtype')===2){
			couponIdsStr.push($item.val());
		}else{
			ticketStr=$item.val();
			
		}
	}
	if(selectStr==''){
		redDesc="";
		redIncome=0;
	}
	if(awardAmountInvest==0){
		ticketStr="";
	}
	$("#selectVoucher").selectpicker('val',currentSelected);
	if(selectStr!=""){
		$("#selectVoucherTd").find('.filter-option').text(selectStr);
	}	
	
	if(!flag){
		var error=validationInvestAmt(investAmt,adddays);
		if(error!=undefined){
			var subscriptionMoney =formatCurrency(investAmt)+"";
			subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
			layer.msg(error,{time:5000});
		}
	}
	$("#investAmtTd").html(formatCurrency(investAmt));
}


function validationInvestAmt(investAmt,adddays){
	if(isLastInvest||investAmt===maxAmt||investAmt===remainInvestAmt){//如果是最后一笔，或等于最大出借额，或等 于剩余可投金额
			if(availableAmt>=investAmt||((availableAmt)>=investAmt)){//在账户余额足够的情况下
					isRecharge=false;
					var awardInterest=0;
					var baseInterest=calculateIncome(investAmt,platRate);//基本利息
					if(awardRate>0){
						awardInterest=calculateIncome(investAmt,awardRate);//奖励利息
					}
					var ticketInterest=0;
					if(awardAmountInvest>0){//如果使用奖励券
						ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
					}
					var interestTotalText=baseInterest+awardInterest+ticketInterest;
					//$("#interestAmtTd").text(formatCurrency(interestTotalText));
					getIncoming(investAmt);
					$("#submitSubscriptionBtn").html("确认出借");
			}else {
				var awardInterest=0;
				var baseInterest=calculateIncome(investAmt,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investAmt,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){//如果使用奖励券
					ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investAmt);
				var rechargeAmt=investAmt-availableAmt;
				var interestTotalText=investAmt;
				isRecharge=true;
				$("#submitSubscriptionBtn").text('充值并出借');
				$("#amtBtn").html('“充值并出借”');
				goRechageAmt = rechargeAmt;
				goInvestAmt = investAmt;
				return ('账户可用余额不足，需充值'+rechargeAmt+'元<br/>充值成功后将自动完成出借');
			}
			finalInvestTotal=investAmt;
			return;
	} 


	if(minAmt<remainInvestAmt&&remainInvestAmt<=maxAmt){//如果剩余可投金额在最大限投和最小限投之间
		if(awardAmountRed===0){//发果没有使用红包
			finalInvestTotal=investAmt;
			if(investAmt>availableAmt){
				calculateInterstAmtTd(investAmt,adddays);
				var rechargeAmt=investAmt-availableAmt;
				isRecharge=true;
				$("#submitSubscriptionBtn").text('充值并出借');
				$("#amtBtn").html('“充值并出借”');
				var toAmt = formatCurrency(investAmt);
				$("#investAmtTd").text(toAmt.substring(0,toAmt.indexOf(".")));
				goRechageAmt = rechargeAmt;
				goInvestAmt = investAmt;
				return ('账户可用余额不足，需充值'+rechargeAmt+'元<br/>充值成功后将自动完成出借');
			}else {
				isRecharge=false;
				var awardInterest=0;
				var baseInterest=calculateIncome(investAmt,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investAmt,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){//如果使用奖励券
					ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investAmt);
				var investAmtStr =formatCurrency(investAmt)+"";
				investAmtStr=investAmtStr.substring(0,investAmtStr.indexOf("."));
				$("#investAmtTd").text(investAmtStr);
				$("#submitSubscriptionBtn").html("确认出借");
				return;
			}
			
		}else {//使用了红包
			if(availableAmt>(investAmt)){//如果账户余额>出借金额+红包 实际出借金额 出借金额+红包     如果同时使用奖励券 ，则奖励收益用（出借金额+红包）计算
				//选择出借券计算利息
				var investTotal=investAmt;
				if((investAmt)>remainInvestAmt){
					investTotal=remainInvestAmt;
				}
				$("#submitSubscriptionBtn").html("确认出借");
				finalInvestTotal=investTotal;
				var awardInterest=0;
				var baseInterest=calculateIncome(investTotal,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){//如果使用奖励券
					ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				var investAmtStr =formatCurrency(investTotal)+"";
				investAmtStr=investAmtStr.substring(0,investAmtStr.indexOf("."));
				$("#investAmtTd").text(investAmtStr);
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investTotal);
				return ;
			}
			if(investAmt<=(availableAmt)){//账户余额<出借金额 <= 账户余额+红包金额 实际出借金额   账户余额+红包金额  	  如果同时使用奖励券 ，则奖励收益用（账户余额+红包金额）计算
				var investTotal=(availableAmt);
				if(investAmt<availableAmt){
					investTotal=investAmt;
				}else {
					if((availableAmt)>remainInvestAmt){//账户余额+红包金额大于剩余可投则取剩余可投金额
						//选择出借券计算利息
						investTotal=remainInvestAmt;
					}
				}
				finalInvestTotal=investTotal;
				//选择出借券计算利息
				var awardInterest=0;
				var baseInterest=calculateIncome(investTotal,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){
					ticketInterest=calculateIncome(investTotal,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				var investAmtStr =formatCurrency(investTotal)+"";
				investAmtStr=investAmtStr.substring(0,investAmtStr.indexOf("."));
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investTotal);
				$("#investAmtTd").text(investAmtStr);
				$("#submitSubscriptionBtn").html("确认出借");
				return;
			}
			
			if(investAmt>(availableAmt)){//出借金额 > 账户余额+红包金额  实际出借金额 不能出借
				var investTotal=investAmt;
				var rechargeAmt=investAmt;
				if(awardAmountRed>0){
					investTotal=investTotal;
					finalInvestTotal=investTotal;
					rechargeAmt=investTotal-availableAmt;
					if((investAmt)>=remainInvestAmt){
						investTotal=remainInvestAmt;
						finalInvestTotal=investTotal;
						rechargeAmt=investTotal-availableAmt;
					}
				}
				calculateInterstAmtTd(investTotal,adddays);
				isRecharge=true;
				$("#submitSubscriptionBtn").text('充值并出借');
				$("#amtBtn").html('“充值并出借”');
				var toAmt = formatCurrency(investTotal);
				$("#investAmtTd").text(toAmt.substring(0,toAmt.indexOf(".")));
				goRechageAmt = rechargeAmt;
				goInvestAmt = investAmt;
				return ('账户可用余额不足，需充值'+rechargeAmt+'元<br/>充值成功后将自动完成出借');
			}else{
				isRecharge=false;
			}
		}
	}

if(remainInvestAmt>maxAmt){//如果出借金额大于最大出借金额
		if(awardAmountRed===0){//发果没有使用红包
			if(investAmt>availableAmt){
				var investTotal=investAmt;
				if((investAmt)>maxAmt){
					investTotal=maxAmt;
				}
				finalInvestTotal=investTotal;
				calculateInterstAmtTd(investTotal,adddays);
				var rechargeAmt=investTotal-availableAmt;
				isRecharge=true;
				$("#submitSubscriptionBtn").text('充值并出借');
				$("#amtBtn").html('“充值并出借”');
				var toAmt = formatCurrency(investTotal);
				$("#investAmtTd").text(toAmt.substring(0,toAmt.indexOf(".")));
				goRechageAmt = rechargeAmt;
				goInvestAmt = investAmt;
				return ('账户可用余额不足，需充值'+rechargeAmt+'元<br/>充值成功后将自动完成出借');
			}else {
				isRecharge=false;
				if((investAmt)>maxAmt){//如果账户余额>出借金额+红包 实际出借金额 出借金额+红包     如果同时使用奖励券 ，则奖励收益用（出借金额+红包）计算
					var investTotal=investAmt;
					if((investAmt)>maxAmt){
						investTotal=maxAmt;
					}
					finalInvestTotal=investTotal;
					var awardInterest=0;
					var baseInterest=calculateIncome(investTotal,platRate);//基本利息
					if(awardRate>0){
						awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
					}
					var ticketInterest=0;
					if(awardAmountInvest>0){//如果使用奖励券
						ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
					}
					var interestTotalText=baseInterest+awardInterest+ticketInterest;
					var subscriptionMoney =formatCurrency(investTotal)+"";
					subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
					$("#investAmtTd").text(subscriptionMoney);
					//$("#interestAmtTd").text(formatCurrency(interestTotalText));
					getIncoming(investTotal);
					$("#submitSubscriptionBtn").html("确认出借");
					return;
				}
				if((investAmt)>=minAmt){//如果出借金额大于最低出借金额
					var investTotal=investAmt;
					if((investAmt)>availableAmt){
						investTotal=availableAmt;
					}
					finalInvestTotal=investTotal;
					var awardInterest=0;
					var baseInterest=calculateIncome(investTotal,platRate);//基本利息
					if(awardRate>0){
						awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
					}
					var ticketInterest=0;
					if(awardAmountInvest>0){//如果使用奖励券
						ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
					}
					var interestTotalText=baseInterest+awardInterest+ticketInterest;
					var subscriptionMoney =formatCurrency(investTotal)+"";
					subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
					$("#investAmtTd").text(subscriptionMoney);
					//$("#interestAmtTd").text(formatCurrency(interestTotalText));
					getIncoming(investTotal);
					$("#submitSubscriptionBtn").html("确认出借");
					return;
				}
				if(investAmt<=(availableAmt)){//账户余额<出借金额 <= 账户余额+红包金额 实际出借金额   账户余额+红包金额  	  如果同时使用奖励券 ，则奖励收益用（账户余额+红包金额）计算
					var investTotal=(availableAmt);
					if(investAmt<availableAmt){
						investTotal=investAmt;
					}else {
						if((availableAmt)>maxAmt){//账户余额+红包金额大于剩余可投则取剩余可投金额
							investTotal=maxAmt;
						}
					}
					finalInvestTotal=investTotal;
					var awardInterest=0;
					var baseInterest=calculateIncome(investTotal,platRate);//基本利息
					if(awardRate>0){
						awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
					}
					var ticketInterest=0;
					if(awardAmountInvest>0){//如果使用奖励券
						ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
					}
					var interestTotalText=baseInterest+awardInterest+ticketInterest;
					var subscriptionMoney =formatCurrency(investTotal)+"";
					subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
					$("#investAmtTd").text(subscriptionMoney);
					//$("#interestAmtTd").text(formatCurrency(interestTotalText));
					getIncoming(investTotal);
					$("#submitSubscriptionBtn").html("确认出借");
					return;
				}
			}
		}else {//如果使用了红包
			if(availableAmt>(investAmt)){//如果账户余额>出借金额+红包 实际出借金额 出借金额+红包     如果同时使用奖励券 ，则奖励收益用（出借金额+红包）计算
				var investTotal=investAmt;
				var subscriptionMoney =formatCurrency(investAmt)+"";
				if((investAmt)>maxAmt){
					investTotal=maxAmt;
					subscriptionMoney =formatCurrency(investTotal)+"";
				}
				subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
				$("#submitSubscriptionBtn").html("确认出借");
				finalInvestTotal=investTotal;
				var awardInterest=0;
				var baseInterest=calculateIncome(investTotal,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){//如果使用奖励券
					ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				var subscriptionMoney =formatCurrency(investTotal)+"";
				subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
				$("#investAmtTd").text(subscriptionMoney);
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investTotal);
				return;
			}
			if(investAmt<=(availableAmt)){//账户余额<出借金额 <= 账户余额+红包金额 实际出借金额   账户余额+红包金额  	  如果同时使用奖励券 ，则奖励收益用（账户余额+红包金额）计算
				var investTotal=(availableAmt);
				if((availableAmt)>maxAmt){//账户余额+红包金额大于剩余可投则取剩余可投金额
					investTotal=maxAmt;
				}
				if(investAmt<availableAmt){
					investTotal=investAmt;
				}else {
					if((availableAmt)>maxAmt){//账户余额+红包金额大于剩余可投则取剩余可投金额
						//选择出借券计算利息
						investTotal=maxAmt;
					}
				}
				finalInvestTotal=investTotal;
				var awardInterest=0;
				var baseInterest=calculateIncome(investTotal,platRate);//基本利息
				if(awardRate>0){
					awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
				}
				var ticketInterest=0;
				if(awardAmountInvest>0){//如果使用奖励券
					ticketInterest=calculateIncome(investAmt,awardAmountInvest);// 奖励券利息
				}
				var interestTotalText=baseInterest+awardInterest+ticketInterest;
				var subscriptionMoney =formatCurrency(investTotal)+"";
				subscriptionMoney=subscriptionMoney.substring(0,subscriptionMoney.indexOf("."));
				$("#investAmtTd").text(subscriptionMoney);
				//$("#interestAmtTd").text(formatCurrency(interestTotalText));
				getIncoming(investTotal);
				$("#submitSubscriptionBtn").html("确认出借");
				return;
			}
			if(investAmt>(availableAmt)){//出借金额 > 账户余额+红包金额  实际出借金额 不能出借
				var investTotal=investAmt;
				var rechargeAmt=investAmt-availableAmt;
				if(awardAmountRed>0){
					investTotal=investTotal;
					finalInvestTotal=investTotal;
					rechargeAmt=investTotal-availableAmt;
				}
				var rechargeAmt=investTotal-availableAmt;
				isRecharge=true;
				$("#submitSubscriptionBtn").text('充值并出借');
				$("#amtBtn").html('“充值并出借”');
				var toAmt = formatCurrency(investTotal);
				calculateInterstAmtTd((investTotal),adddays);
				finalInvestTotal=investAmt;
				$("#investAmtTd").text(toAmt.substring(0,toAmt.indexOf(".")));
				goRechageAmt = rechargeAmt;
				return ('账户可用余额不足，需充值'+rechargeAmt+'元<br/>充值成功后将自动完成出借');
			}else{
				isRecharge=false;
			}
		}
	}

}
//根据出借金额和利率计算收益
function calculateIncomeTicket(amount,rate,day){
	if(day===-1){
		return 0;
	}
	var addPeriod=currentLoanPeriod;
	if(day>0){
		addPeriod=day;
	}else{
		if(currentLoanPeriodUnit=='1'){
			addPeriod = currentLoanPeriod*30
		}else if(currentLoanPeriodUnit=='2'){
			addPeriod = currentLoanPeriod*360
		}
	}
	
	var income = rate / 100 / 360 * amount * addPeriod;
	income=Math.floor(income * 100) / 100;
	return income;
}

function calculateInterstAmtTd(investTotal,adddays){
	var awardInterest=0;
	var baseInterest=calculateIncome(investTotal,platRate);//基本利息
	if(awardRate>0){
		awardInterest=calculateIncome(investTotal,awardRate);//奖励利息
	}
	var ticketInterest=0;
	if(awardAmountInvest>0){
		ticketInterest=calculateIncome(investTotal,awardAmountInvest);// 奖励券利息
	}
	var interestTotalText=baseInterest+awardInterest+ticketInterest;
	//$("#interestAmtTd").text(formatCurrency(interestTotalText));
	getIncoming(investTotal);
}


//材料画廊
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

function needRisk(){
	window.location.href=basePath+"/product/needrisk?loanId="+loanId+"&amt="+$("#subscriptionTxt").val();
}

function getIncoming(amt){
	$("#interestInputAmt").val(baseIncome+awardIncome);
	$("#interestAmtTd").html(formatCurrency(baseIncome+awardIncome+redIncome));//计算收益
	$("#interestAmtDetail").html(baseDesc+awardDesc+redDesc);
}
