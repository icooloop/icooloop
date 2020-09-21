function changeTab(tabnum){
	$(".recommendContent").hide();
	$("#recommendContent"+tabnum).show();
	$("#recommendTabs li").eq(tabnum-1).addClass("on").siblings().removeClass("on");
	(tabnum==1)?$("#moreDetail").show():$("#moreDetail").hide();
}

var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var fn = null;
//分页
function initPage(type) {
	if(type == '0'){
		 $("#laypage").pagination({
		        totalCount: totalCount,
		        pageSize: pageSize,
		        clickEvent: function (page_index, _this) {
		            $("#pageNo").val(page_index + 1);
		            fn();
		        }
		    });
	}else{
		 $("#laypage2").pagination({
		        totalCount: totalCount,
		        pageSize: pageSize,
		        clickEvent: function (page_index, _this) {
		            $("#pageNo").val(page_index + 1);
		            fn();
		        }
		    });
	}
   
}
var recomCode;
(function () {
	recomCode=$("#recomCode").val();
    initAwardData();
    initPage(1);
    var thismonth= $('#recommenddate').val();
	laydate.render({elem: '#recommenddate',type:'month',max:thismonth,
		done: function(value, date, endDate){
			$('#recommenddate').val(value)
			totalCount = 0;
        	$("#pageNo").val(1);
			initAwardData();
			initPage(1);
		  }
	});
	$(".mu-recommend-details .hd li").on('click',function(){
    	totalCount = 0;
    	$("#pageNo").val(1);
    	var type = $(this).attr("type");
    	if(type=='0'){
    		initUserData();
    	}else{
    		initAwardData();
    	}
    	initPage(type);
    	$(this).addClass("on").siblings().removeClass("on");
    	$(".mu-recommend-details .bd section:eq("+type+")").show().siblings().hide();
    });
    //复制链接
    var clipboard = new Clipboard('#copyLinkBtn');
    clipboard.on('success', function(e) {
       layer.msg('复制成功~')
    });
})();
//我的邀请好友
function initUserData() {
    var _table = $('#userData');
    _table.empty();
    $.ajax({
    	url: basePath + '/member/recom/recommendRecord',
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo').val(), 'pageSize': $("#pageSize").val()},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var html = [];
            if (result.count > 0) {
                $.each(result.data, function (i, o) {
                	
                    var day=new Date(o.createTime);
            		var currentMonth=day.getMonth()+1;
        			currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
        			var currentDate=day.getDate();
        			currentDate=currentDate<10?"0"+currentDate:currentDate;
        			var currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
        			var realName = o.realName;
        			if(!realName){
        				realName = '未实名';
        			}
                    html.push('<tr><td>',i+1,'</td>');
                    html.push('<td>',o.phone,'</td>');
                    html.push('<td>',realName,'</td>');
                    html.push('<td>',currentDay,'</td></tr>')
                });
            } else {
                html.push('<tr><td colspan="4"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
            }
            _table.append(html.join(''));
            totalCount = result.count;
            if (totalCount > pageSize) {
                fn = initUserData;
                $('#laypage').show();
            } else {
                $('#laypage').hide();
            }
        }
    });
}
//我的推荐奖励
function initAwardData() {
	var _table = $('#awardData');
	_table.empty();
	$.ajax({
		url: basePath + '/member/recom/awardRecord',
		type: 'post',
		dataType: 'json',
		data: {pageNo: $('#pageNo').val(), 'pageSize': $("#pageSize").val(),queryDate:$('#recommenddate').val()},
		cache: false,
		async: false,
		success: function (data) {
			var result = $.parseJSON(data);
			var html = [];
			if (result.count > 0) {
				var amt =  result.totalAmt;
	    		$("#monthTotal").html(amt);
				$.each(result.data, function (i, o) {
					console.log(o);
					var day=new Date(o.awardDate);
					var currentMonth=day.getMonth()+1;
					currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
					var currentDate=day.getDate();
					currentDate=currentDate<10?"0"+currentDate:currentDate;
					var currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
					var realName = o.invester;
					if(!realName){
						realName = '未实名';
					}
					
					html.push('<tr><td>',i+1,'</td>');
					html.push('<td>',formatCurrency(o.awardMoney),'</td>')
						html.push('<td>',currentDay,'</td>');
					if(o.new){
						if(o.awardType=='2'){
							html.push('<td>好友累计出借',formatCurrency(o.planAmt),'元</td>');
						}else if(o.awardType=='3'){
							html.push('<td>推荐奖励</td>');
						}else{
							html.push('<td>好友待收本金之和的',o.awardRate,'%</td>');
						}
					}else{
						
					}
				
					html.push('</tr>')
				});
			} else {
				html.push('<tr><td colspan="4"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
			}
			_table.append(html.join(''));
			totalCount = result.count;
			if (totalCount > pageSize) {
				fn = initAwardData;
				$('#laypage2').show();
			} else {
				$('#laypage2').hide();
			}
		}
	});
}

function shareWeixin(){
	layer.open({
	  type: 1,
	  title:false,
	  closeBtn:false,
	  shadeClose:true,
	  area: ['300px', '300px'], //宽高
	  content:$("#shareWeixin")
	});
}
function shareQQ(){
	var p = {
		url:'https://www.yiqiandai.com/secure/land?code='+$("#recomCode").val(),
		showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
		desc:'送您888元新手专享红包',/*默认分享理由(可选)*/
		summary:'亿钱贷喊你领红包啦~ 现在新手注册即送888元现金红包，还有更多惊喜等你，快快上车！',/*分享摘要(可选)*/
		title:'送您888元新手专享红包',/*分享标题(可选)*/
		pics:'', /*分享图片的路径(可选)*/
		style:'203',
		width:98,
		height:22
	};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var url = ["http://connect.qq.com/widget/shareqq/index.html?",s.join('&')].join('');
	window.open(url);
}
function shareQZone(){
	var p = {
		url:'https://www.yiqiandai.com/secure/land?code='+$("#recomCode").val(),
		showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
		desc:'送您888元新手专享红包',/*默认分享理由(可选)*/
		summary:'亿钱贷喊你领红包啦~ 现在新手注册即送888元现金红包，还有更多惊喜等你，快快上车！',/*分享摘要(可选)*/
		title:'送您888元新手专享红包',/*分享标题(可选)*/
		site:'https://www.yiqiandai.com/secure/land?code='+$("#recomCode").val(),/*分享来源 如：腾讯网(可选)*/
		pics:'http://www.yiqiandai.com/images/logo01.jpg', /*分享图片的路径(可选)*/
		style:'203',
		width:98,
		height:22
	};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var url = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",s.join('&')].join('');
	window.open(url);
}