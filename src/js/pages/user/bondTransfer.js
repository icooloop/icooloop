/**
 * Created by lidy on 2018/4/27.
 */
var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
//分页
function initPage(type,table) {
    $("#laypage").pagination({
        totalCount: totalCount,
        pageSize: pageSize,
        clickEvent: function (page_index, _this) {
            $("#pageNo").val(page_index + 1);
            getTableListDate(currentType,$currentTable,false)
        }
    });
}
$(function () {
    getTableListDate('1',$('#tableList').find('table').eq(0),true);
})

function getTableListDate(type,table,isInit){
    var myUrl="";
    if(type==1){
    	myUrl=basePath + '/member/transfer/hold-list';
    }else if(type==2){
    	myUrl=basePath + '/member/transfer/transfer-list';
    }else if(type==3){
    	myUrl=basePath + '/member/transfer/transfered-list';
    }else if(type==4){
    	myUrl=basePath + '/member/transfer/transferee-list';
    }
	
	$.ajax({
        url: myUrl,
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo').val(), 'pageSize': pageSize,'type':type},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var html = [];
            if (result.count > 0) {
                $.each(result.data, function (i, o) {
                	if(type==1){//可转让
	                    html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.buyPrice), '</td>');
	                    html.push('<td>', formatCurrency(o.planIncome), '</td>'); 
	                    html.push('<td>', formartDate(o.interestDate, 'yyyy-MM-dd'), '</td>');
	                    html.push('<td>', formartDate(o.endTime, 'yyyy-MM-dd'), '</td>');
	                    if(o.debtStatus==1){
							html.push('<td>','还款中','</td>');
						}else if(o.debtStatus==2){
							html.push('<td>','转让中','</td>');
						}else if(o.debtStatus==3){ 
							html.push('<td>','已转让','</td>');
						}else if(o.debtStatus==4){ 
							html.push('<td>','已结清','</td>');
						}
						 
	                    html.push('<td><div class="line2"><a class="text-primary" href="/member/transfer/detail/', o.debtId, '">查看详情</a>');
	                    if(o.isTransferApplyStatus==true){
	                    	html.push('<br><a class="btn btn-second" href="javascript:;;" data-id="', o.debtId, '">转让</a></td>');
	                    }else if(o.isTransferApplyStatus==false){
	                    	html.push('<br><a class="btn btn-disabled" title="',o.isNotTransferApplyStr,'" href="javascript:;;" data-id="', o.debtId, '">转让</a></div></td>');
	                    }
	                    html.push('</tr>');
                	}else if(type==2){//转让中
                		html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.transferPrice), '</td>');
	                    html.push('<td>', formatCurrency(o.transferFee), '</td>'); 
	                    html.push('<td>', formartDate(o.createTime, 'yyyy-MM-dd'), '</td>');
	                    if(o.applyStatus==1){
							html.push('<td>','转让审核中','</td>');
						}else if(o.applyStatus==2){
							html.push('<td>','转让中','</td>');
						}else if(o.applyStatus==3){ 
							html.push('<td>','已转让','</td>');
						}else if(o.applyStatus==4){ 
							html.push('<td>','已撤销','</td>');
						}
						 
	                    html.push('<td><div class="line2"><a class="text-primary" href="/member/transfer/detail/', o.debtId, '">查看详情</a>');
	                    html.push('<br><a class="btn btn-cancel" href="javascript:;;" data-id="', o.transferApplyId, '">撤销</a></div></td>'); 
	                    html.push('</tr>');
                		
                	}else if(type==3){//已转让
                		html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.transferPrice), '</td>');
	                    html.push('<td>', formatCurrency(o.transferFee), '</td>'); 
	                    html.push('<td>', formartDate(o.dealTime, 'yyyy-MM-dd'), '</td>');
	                    if(o.applyStatus==1){
							html.push('<td>','转让审核中','</td>');
						}else if(o.applyStatus==2){
							html.push('<td>','转让中','</td>');
						}else if(o.applyStatus==3){ 
							html.push('<td>','已转让','</td>');
						}else if(o.applyStatus==4){ 
							html.push('<td>','已撤销','</td>');
						}
						 
	                    html.push('<td><a class="text-primary" href="/member/transfer/detail/', o.debtId, '">查看详情</a>');
	                    html.push('</tr>');
                	}else if(type==4){//已受让
                		html.push('<tr>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', formatCurrency(o.transferPrice), '</td>');
	                    html.push('<td>', o.remainPeriodDay, '天</td>');//剩余期限
	                    html.push('<td>', formartDate(o.dealTime, 'yyyy-MM-dd'), '</td>');
	                    if(o.debtStatus==1){
							html.push('<td>','还款中','</td>');
						}else if(o.debtStatus==2){
							html.push('<td>','转让中','</td>');
						}else if(o.debtStatus==3){ 
							html.push('<td>','已转让','</td>');
						}else if(o.debtStatus==4){ 
							html.push('<td>','已结清','</td>');
						} 
	                    html.push('<td><a class="text-primary" href="/member/transfer/detail/', o.debtId, '">查看详情</a>');
	                    html.push('</tr>');
                	}
                });
            } else {
                html.push('<tr><td colspan="8"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
            }
            table.find("tbody").html(html.join(''));
            totalCount = result.count;
            if (totalCount > pageSize) {
            	if(isInit){
            		initPage();
            	}
                $('#laypage').show();
            } else {
                $('#laypage').hide();
            }

        }
    });
}
var currentType=1;
var $currentTable=$('#tableList').find('table').eq(0);
//tab的点击切换
$("#bondTypeList li").on('click', function () {
    var $self = $(this);
    $self.addClass("on").siblings().removeClass("on");
    currentType= $self.attr("data-type");
    $('#tableList').find('table').hide();
    $currentTable=$('#tableList').find('table').eq($self.index());
    $currentTable.show();
    $('#laypage').hide();
    $('#pageNo').val(1);
    getTableListDate(currentType,$currentTable,true)
})

//债权转让确认框
$("#tableList").on('click','.btn-second',function(){
	var debtId = $(this).attr("data-id"); 
    location.href=basePath+'/spa/member/transfer/apply/'+debtId;
})

//债权转让撤回框
$("#tableList").on('click','.btn-cancel',function(){
	var transferApplyId = $(this).attr("data-id"); 
    layer.confirm('您确定要撤销该笔债权转让吗？',{btn:['确认','取消'],closeBtn:false,title:false},function(){
    	$.ajax({
            url: basePath+'/member/transfer/cancel',
            type: 'post',
            dataType: 'json',
            data: {'transferApplyId': transferApplyId},
            cache: false,
            async: false,
            success: function (data) {
            	var result = eval("("+data+")");
				if (result.success!=undefined&&!result.success) {
					layer.msg(result.msg); 
				}else{
					layer.msg(result.msg,function(){
						location.href=basePath+'/member/transfer/index';
					})
				}
            }
    	}); 
    })
})
