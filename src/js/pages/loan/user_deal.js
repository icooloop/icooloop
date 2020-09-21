var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var fn = null;
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
//
var queryData={};
function initData(){
	queryData.pageNo=$('#pageNo').val();
	queryData.pageSize=pageSize;
	var _table=$('#tableList tbody');
	_table.empty();
	$.ajax({
		url:basePath+'/member/deal/tradeList',
		type:'post',
		dataType:'json',
		data:queryData,
		cache:false,
		async:false,
		success:function(data){
			var result = $.parseJSON(data);
			var html=[];
			if(result.count > 0){
				$.each(result.data,function(i,o){
					var str= formatCurrency(o.platRate);
					var awardRate=o.awardRate;
					if(awardRate>0&&o.showAward){
						str=str+"+"+formatCurrency(o.awardRate);
					}
					html.push('<tr>');
					html.push('<td>',formatDate(o.createTime,"yyyy-MM-dd HH:mm"),'</td>');
					html.push('<td>',(o.subjectName),'</td>');
					html.push('<td>',formatCurrency(o.occurAmt),'</td>');
					html.push('<td>',formatCurrency(o.afterAmt),'</td>');
					html.push('<td>',o.remark,'</td>');
					html.push('</tr>');
					
				});
			}else{
                $("#pageLayer").hide();
				html.push('<tr><td colspan="5"><img style="margin:15px 0" class="record" src="'+basePath+'/public/images/user/record.png?v=9113ae7"></td></tr>')
			}
			_table.append(html.join(''));
			totalCount = result.count;
			if(totalCount>pageSize){
				fn=initData;
				$('#pageLayer').show();
			}else{
				$('#pageLayer').hide();
			}
			
		}
	});
}

function query(){
	$('#pageNo').val(1);
	 queryData={pageNo:$('#pageNo').val(),'pageSize':pageSize,startDate:$("#start").val(),endDate:$("#end").val(),subjectType:$("#subjectType").val()}
	 initData();
	 initPage();
}
function intQueryDate(){
	var queryTime = $("#queryTime").val();
// 	console.log(queryTime);
	var str= queryTime.split('-');
	type=str[0];
	day=str[1];
	var now = new Date();
	var startDate = now.DateAdd(type,-day);
	$("#start").val(formatsDate(startDate));
	$("#end").val(formatsDate(now));
}	
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
} 
function formatsDate(date){   
    var str = "yyyy-MM-dd"; 
    str=str.replace(/yyyy|YYYY/,date.getFullYear()); 
    var month=date.getMonth()+1;		    
    str=str.replace(/MM/,month>9?month.toString():'0' + month); 		  
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());  
    return str;   
}   
$(function() {
	intQueryDate();
	query();
    $("#nav_member").addClass("on");
    $('#start').on('click', function(e) {
        laydate.render({
            elem: '#start',
            show: true,
            max:  $("#end").val(),
            done: function(value) {
            }
        })
    });
    $('#end').on('click', function(e) {
        laydate.render({
            elem: '#end',
            show: true,
            min: $("#start").val(),
            max:Date.parse(new Date()),
            done: function(value) {
            }
        })
    });
    $('#queryTime').click(function(e) {
    	intQueryDate();
    });
    $('#subjectType').change(function(e) {
    	//query();
    });
    $('#submitBtn').click(function(e){
    	query();
    });
})

function formateDecimal(data){
	if(data){
		return data
	}
	return data.substr(0, data.indexOf(".")) + "<em>" + data.substr(cash.indexOf("."), data.length) + "</em>";
}
