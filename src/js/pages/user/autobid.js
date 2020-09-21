/**
 * Created by lib on 2018/9/11.
 */
var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var initFlat = [false,false,false,false];
//分页
function initPage(type,table) {
    $("#laypage"+type).pagination({
        totalCount: totalCount,
        pageSize: pageSize,
        clickEvent: function (page_index, _this) {
            $("#pageNo"+type).val(page_index + 1);
            getTableListDate(currentType,$currentTable)
        }
    });
}
$(function () {
	$("#bondTypeList li a").eq(1).click();
//	getTableListDate(1,$('#tableList').find('div.js-control-div').eq(0));
})

function getTableListDate(type,table){
    var myUrl="";
    if(type==1){
    	myUrl=basePath + '/member/plan/investing';
    }else if(type==2){
    	myUrl=basePath + '/member/plan/repaying';
    }else if(type==3){
    	myUrl=basePath + '/member/plan/repayed';
    }
    
	$.ajax({
        url: myUrl,
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo'+type).val(), 'pageSize': pageSize,'type':type},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);

//			$(".txtInvestAmt").html(formatCurrency(result.invest));
//			$(".txtIncomeAmt").html(formatCurrency(result.income));

            var html = [];
            if (result.pageList.totalCount > 0) {
            	if(type==1){
            		$("#bondTypeList li a").eq(0).append('<span class="dot"></span>');
            	}
                $.each(result.pageList.result, function (i, o) {
					var rateStr= o.prdRate;
//					var rateStr= formatCurrency(o.prdRate);
					var awardRate=o.awardRate;
					if(o.awardRate && o.awardRate>0){
//						rateStr=rateStr+"+"+formatCurrency(o.awardRate);
						rateStr=rateStr+"%+"+o.awardRate;
					}
                	
                	if(type==1){//申请中
	                    html.push('<tr>');
	                    html.push('<td>', formartDate(o.investTime, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td>', o.prdNo, '</td>');
	                    html.push('<td>', formatCurrency(o.investAmount), '</td>');
	                    html.push('<td>', rateStr,'%', '</td>'); 
	                    html.push('<td>', o.prdPeriodStr, '</td>');
	                    html.push('<td><a class="text-primary" href="/member/plan/autobidDetail/', o.investId, '">查看详情</a></td>');
	                    html.push('</tr>');
                	}else if(type==2){//委托中
                		var ifexit=o.investStatus==6?'<span class="label-exit ml-5">退出中</span>':'';
	                    html.push('<tr>');
	                    html.push('<td>', o.prdNo, ifexit, '</td>');
	                    html.push('<td>', formatCurrency(o.investAmount), '</td>');
	                    html.push('<td>', rateStr,'%', '</td>'); 
						var expectIncome = o.expectIncome;//预期收益
//						if(o.ticketAmt && o.ticketAmt>0){
//							expectIncome = expectIncome +o.ticketAmt; 
//						}	                    
//						if(o.awardIncome && o.awardIncome>0){
//							expectIncome = expectIncome +o.awardIncome; 
//						}	                    
	                    html.push('<td>', formatCurrency(expectIncome), '</td>'); 
	                    html.push('<td>', formartDate(o.settleDate, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td><a class="text-primary" href="/member/plan/autobidDetail/', o.investId, '">查看详情</a></td>');
	                    html.push('</tr>');
                	}else if(type==3){//已到期
	                    html.push('<tr>');
	                    html.push('<td>', o.prdNo, '</td>');
	                    html.push('<td>', formatCurrency(o.investAmount), '</td>');
	                    html.push('<td>', rateStr,'%', '</td>'); 
					    var redeemIncome = o.expectIncome;
						html.push('<td>',formatCurrency(redeemIncome),'</td>');
	                    html.push('<td>', formartDate(o.settleDate, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td><a class="text-primary" href="/member/plan/autobidDetail/', o.investId, '">查看详情</a></td>');
	                    html.push('</tr>');
                	}
                });
            } else {
                html.push('<tr><td colspan="7"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
            }
            table.find("tbody").html(html.join(''));
            totalCount = result.pageList.totalCount;
            if (totalCount > pageSize) {
            	if(!initFlat[type]){
            		initPage(type);
            		initFlat[type]=true;
            	}
                $('#laypage'+type).show();
            }else{
            	$('#laypage'+type).hide();
            }
            if(!initFlat[type]){
            	initFlat[type]=true;
            }

        }
    });
}
var currentType=1;
var $currentTable=$('#tableList').find('div.js-control-div').eq(0);
//tab的点击切换
$("#bondTypeList li a").on('click', function () {
    var $self = $(this).parent();
    $self.addClass("on").siblings().removeClass("on");
    currentType= Number($self.attr("data-type"));
    $('#tableList').find('div.js-control-div').hide();
    $currentTable=$('#tableList').find('div.js-control-div').eq($self.index());
	$currentTable.show();
    if(!initFlat[currentType]){
    	getTableListDate(currentType,$currentTable);
    }
})
