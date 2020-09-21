/**
 * Created by lidy on 2017/11/28.
 */
+function () {
    var UserRecommend = function () {//构造函数
        this.$companyForm = $("#companyForm");
        this.$personForm = $("#personForm")
        this.$getMobileCode = $("#getMobileCode");
        this.$getPersonVerifyCode = $("#getPersonVerifyCode");
        this.$getVerifyCode = $("#getVerifyCode");
        this.validatePersonForm = null;//验证方法
        this.validateCompanyForm = null;
    }
    UserRecommend.prototype = {
        init: function () {
            this.initEvent();//绑定事件
        },
        initEvent: function () {
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
        
            //奖励详情
            $("#investDetailLink").on('click',function(){
                layer.open({
                    type: 1,
                    area: ['812px','90%'], //宽高
                    title:false,
                    shadeClose: true,
                    content: $("#layerDetail")
                });
            })
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
            })
            //复制链接
            var clipboard = new Clipboard('#copyLinkBtn');
            clipboard.on('success', function(e) {
               layer.msg('复制成功~')
            });
        }
    }
    new UserRecommend().init();
}();

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
(function () {
    initUserData();
    initPage(0);
})();

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

function initAwardData() {
	 if(new Date( $('#recommenddate').val()).getTime()>=new Date('2018-08-01 00:00:00').getTime()){
     	$("#planAmt_th").html("好友待收本金")
     }else{
     	$("#planAmt_th").html("被推荐人")
     }
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
					html.push('<td>',currentDay,'</td>');
					if(o.new){
						html.push('<td>',formatCurrency(o.planAmt),'</td>');
					}else{
						html.push('<td>',o.invester,'</td>');
					}
					
					html.push('<td>',formatCurrency(o.awardMoney),'</td></tr>')
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
function showRule(){
	layer.open({
	  type: 1,
	  title:'推荐奖励规则',
	  area: ['520px', 'auto'], //宽高
	  content: $("#actRule")
	});
}
