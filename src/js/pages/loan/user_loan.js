/**
 * Created by lib on 2018/9/11.
 */
var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var initFlat = [false,false,false];
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
	$("#bondTypeList li a").eq(0).click();
})

function getTableListDate(type,table){
    var myUrl="";
    if(type==1){
    	myUrl=basePath + '/member/loan/raise-list';
    }else if(type==2){
    	myUrl=basePath + '/member/loan/repay-list';
    }else if(type==3){
    	myUrl=basePath + '/member/loan/settle-list';
    }
    ajaxFun(myUrl,type,table);
}

function ajaxFun(myUrl,type,table){
	$.ajax({
        url: myUrl,
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo'+type).val(), 'pageSize': pageSize,'type':type},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var html = [];
            if (result.count > 0) {
                $.each(result.data, function (i, o) {
                	if(type==1){//募集中
	                    html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.loanAmt), '</td>');
	                    html.push('<td>', o.orgRate,'%', '</td>'); 
	                    html.push('<td>', o.loanPeriodStr, '</td>');
	                    html.push('<td>', o.platRate,'%', '</td>'); 
	                    html.push('<td>', formartDate(o.releaseTime, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td>', o.loanStatusStr, '</td>');
	                    html.push('</tr>');
                	}else if(type==2){//还款中
	                    html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.loanAmt), '</td>');
	                    html.push('<td>', o.orgRate,'%', '</td>'); 
	                    html.push('<td>', o.loanPeriodStr, '</td>');
	                    html.push('<td>', formartDate(o.periodEndTime, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td>', formatCurrency(o.planPayAmt), '</td>');
	                    html.push('<td><div class="line2"><a class="text-primary" href="'+basePath+'/member/loan/detail/', o.loanId, '">查看详情</a>');
	                    var desc= o.loanTitle+'第 '+o.planPeriod+' 期本金'+formatCurrency(o.planPayPrincipal)+',利息'+formatCurrency(o.planPayInterest);
	                   // html.push('<br><a class="btn btn-theme" href="javascript:repayConfirmLayer(\''+desc+'\',\''+o.loanId+'\');">还款</a></div></td>');
	                    html.push('</tr>');
                	}else if(type==3){//已结清
	                    html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.loanAmt), '</td>');
	                    html.push('<td>', o.orgRate,'%', '</td>'); 
	                    html.push('<td>', o.loanPeriodStr, '</td>');
	                    html.push('<td>', formartDate(o.periodEndTime, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td><div class="line2"><a class="text-primary" href="'+basePath+'/member/loan/detail/', o.loanId, '">查看详情</a></td>');
	                    html.push('</tr>');
                	}
                });
            } else {
                html.push('<tr><td colspan="7"><img style="margin:15px 0" class="record" src="'+basePath+'/public/images/user/record.png"></td></tr>');
            }
            table.find("tbody").html(html.join(''));
            totalCount = result.count;
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
var $currentTable=$('#tableList').find('section').eq(0);
//tab的点击切换
$("#bondTypeList li a").on('click', function () {
    var $self = $(this).parent();
    $self.addClass("on").siblings().removeClass("on");
    currentType= Number($self.attr("data-type"));
    $('#tableList').find('section').hide();
    $currentTable=$('#tableList').find('section').eq($self.index());
    $currentTable.show();
    
    if(!initFlat[currentType]){
    	getTableListDate(currentType,$currentTable);
    }
})

function loanConfirmLayer(desc){
	$("#loanConfirmDesc").html(desc);
	layer.open({
		  type: 1,
		  area: ['420px', 'auto'], //宽高
		  title:false,
		  closeBtn:false,
		  content:$("#loanConfirmLayer")
		});
}
//确认借款
function confirmLoan(){
	if(!$("#agreement").is(":checked")){
		layer.msg('请先阅读并同意《借款人告知书》');
		return false;
	}
	//TODO
	layer.closeAll();
}
function repayConfirmLayer(desc,loanId){
	repayLoanId=loanId;
	$("#repayConfirmDesc").html(desc);
	layer.open({
		  type: 1,
		  area: ['420px', 'auto'], //宽高
		  title:false,
		  closeBtn:false,
		  content:$("#repayConfirmLayer")
		});
}
var repayLoanId=null;
//确认还款
function confirmRepay(){
	$.ajax({
        url: basePath + '/member/loan/confirmRepay',
        type: 'post',
        dataType: 'json',
        data: {loanId:repayLoanId,repayWay:"1"},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            layer.msg(result.msg);
            layer.closeAll();
            myUrl=basePath + '/member/loan/repay-list';
            ajaxFun(myUrl,2,$currentTable);
            /*if(!result.success){
            	
            }
            if(1==2){//余额不足 //TODO
        		window.location=basePath+'loan/user_recharge';
        	}else{
        		//TODO
        		layer.closeAll();
        		layer.msg("还款成功");
        	}*/
        }
        
    });
	
}