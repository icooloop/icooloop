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
	$("#bondTypeList li a").eq(0).click();
	$('#start').on('click', function(e) {
        laydate.render({
            elem: '#start',
            show: true,
            max:  $("#end").val(),
            done: function(value) {
               // query();
            }
        })
    });
    $('#end').on('click', function(e) {
        laydate.render({
            elem: '#end',
            show: true,
            min: $("#start").val(),
            done: function(value) {
                //query();
            }
        })
    });
})

function getTableListDate(type,table){
    var myUrl="";
    if(type==1){
    	myUrl=basePath + '/member/loan/mediacy/list?status=0';
    }else if(type==2){
    	myUrl=basePath + '/member/loan/mediacy/list?status=1';
    }
    ajaxFun(myUrl,type,table);
}
var nochargeResultData;
var serviceAmt=0;
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
            	nochargeResultData=result.data;
                $.each(result.data, function (i, o) {
                	if(type==1){//未缴纳
	                    html.push('<tr>');
	                    html.push('<td>','<input type="checkbox" name="item" value="'+i+'">', '</td>');
	                    html.push('<td>', o.loanTitle, '</td>');
	                    html.push('<td>', o.userName, '</td>');
	                    html.push('<td>', formatCurrency(o.loanAmt), '</td>'); 
	                    html.push('<td>', o.periodStr, '</td>');
	                    html.push('<td>', formartDate(o.cashTime, 'yyyy-MM-dd'), '</td>'); 
	                    html.push('<td>', formatCurrency(o.mediacyFeeAmount), '</td>');
	                    html.push('<td>', '<a class="btn btn-theme2" href="javascript:;" onclick="charge(\''+i+'\')">缴纳</a>', '</td>');
	                    html.push('</tr>');
                	}else if(type==2){//已缴纳
                		html.push('<tr>');
 	                    html.push('<td>', o.loanTitle, '</td>');
 	                    html.push('<td>', o.loanName, '</td>');
 	                    html.push('<td>', formatCurrency(o.loanAmt), '</td>'); 
 	                    html.push('<td>', o.loanPeriodStr, '</td>');
 	                    html.push('<td>', formartDate(o.loanTime, 'yyyy-MM-dd'), '</td>'); 
 	                    html.push('<td>', formatCurrency(o.payAmt), '</td>');
 	                    html.push('<td>',  formartDate(o.payTime, 'yyyy-MM-dd'), '</td>');
 	                    html.push('</tr>');
                	}
                });
            } else {
                html.push('<tr><td colspan="7"><img style="margin:15px 0" class="record" src="'+basePath+'/public/images/user/record.png"></td></tr>');
            }
           
            table.find("tbody").html(html.join(''));
            initCheckbox();
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
function chargeConfirmLayer(){
	
	layer.open({
		  type: 1,
		  area: ['420px', 'auto'], //宽高
		  title:false,
		  closeBtn:false,
		  content:$("#serviceChargeLayer")
		});
}
function charge(ids){
	if(ids==''){
		layer.msg("请先选择要缴纳的项目");
		return false;
	}
    if(ids.indexOf(',')<0){
    	$("#serviceInfo").html('<em>项目名称</em>'+nochargeResultData[ids].loanTitle);
    }else{
    	$("#serviceInfo").html('<em>服务费笔数</em>'+$("input[name='item']:checkbox:checked").length);
    }
	$("#serviceAmt").html(formatCurrency(serviceAmt));
	$("#seletedIds").val(ids);
	chargeConfirmLayer();
}
//批量缴纳
function batchCharge(){
		var ids=getSelectedItems();
		console.log(ids);
		charge(ids);
}
//全部缴纳
function allCharge(){
	$("#allItem").prop("checked", true);
	$("input[name='item']:checkbox").prop("checked", true);
	batchCharge();
}
function initCheckbox(){
	$("#allItem").on('click',function(){
		if (this.checked){  
        	$("input[name='item']:checkbox").prop("checked", true);  
	    } else {   
        	$("input[name='item']:checkbox").prop("checked", false);  
	    } 
	})
	$("input[name='item']:checkbox").on('click',function(){
		$("#allItem").prop("checked", $("input[name='item']:checkbox").length==$("input[name='item']:checkbox:checked").length);
	})
}
//获取选中
function getSelectedItems(){
	var ids='';
	serviceAmt=0;
	$("input[name='item']:checkbox:checked").each(function(i){
		ids+=$(this).val()+',';
		serviceAmt+=parseFloat(nochargeResultData[$(this).val()].payAmt);
	});
	return ids.substring(0,ids.length-1);
}
function query(){
	 $('#pageNo'+currentType).val(1);
	 queryData={pageNo:$('#pageNo'+currentType).val(),'pageSize':pageSize,startDate:$("#start").val(),endDate:$("#end").val(),keyword:$("#keyword").val()}
	 getTableListDate(currentType,$currentTable);
	 initPage();
}
function chargeService(){
	var ids=$("#seletedIds").val();
	//TODO ajax
	layer.msg("服务费缴纳成功"+ids);
}