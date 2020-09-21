/**
 * Created by lidy on 2017/11/27.
 */
+function () {
    var InvestmentCard = function () {//构造函数
    	
    }
    InvestmentCard.prototype = {
        init: function () {
            this.initEvent();//绑定事件
            this.getList({
            	status:1,
//            	awardType:2
            },'#noUsedRedTable');//获取数据
            this.getList({
            	status:2,
//            	awardType:2
            },'#usedRedTable');//获取数据
            this.getList({
            	status:3,
//            	awardType:2
            },'#overdueRedTable');//获取数据
        },
        initEvent: function () {
        	$("#bondTypeList li").on('click', function () {
        	    var $self = $(this);
        	    $self.addClass("on").siblings().removeClass("on");
        	    $("#"+$self.attr("data-type")).show().siblings().hide();
        	})
        },
        getList:function(param,dom){
    		var self=this;
        	var params=$.extend({
    			pageNo:1,
    			pageSize:5
    		},param)
        	 $.ajax({
        	        url: basePath + '/member/invest/getCouponTicketList',
        	        type: 'post',
        	        dataType: 'json',
        	        cache: false,
        	        data:params,
        	        success: function (data) {
        	            var result = $.parseJSON(data);
        	            var html='';
        	            if(result.count ==0){
        	            	html = '<tr><td colspan="4" class="text-c"><img style="margin:15px 0" class="record" src="'+basePath+'/public/images/user/record.png"></td></tr>';
        	            	$(dom).find("tbody").html(html);
        	            	return;
        	            }
        	            var jxbj = false;
    	            	for(var i in result.data){
    	            		var item=result.data[i];
    	            		console.log(item)
    	            		var awardTime=item.awardTimeYMDStr;
    	            		var deadTime=item.deadTimeYMDStr;
    	            		var status=params.status===1?"no-used":"used";
    	            		var awardType=item.awardType==3?"invest-icon":'icon-red';
    	            		var num=item.awardType==3?'+'+item.awardAmount+'%':'￥'+parseInt(item.awardAmount);
    	            		html+='<tr><td><i class="'+awardType+' '+status+'">'+num+'</i><span class="name-text vertical-middle">'+item.actName+'</span></td>';
                            html+='<td class="text-c">'+awardTime+'至 '+deadTime+'</td><td><div class="line2">'+item.limitRemark+'<br/>'+item.limitPeriodRemarkStr+'</div></td></tr>';
                            if(item.awardType==3&&(params.status===1 || params.status===2)){
                            	if(jxbj){continue;}jxbj = true;
                            }
    	            	}
    	            	$(dom).find("tbody").html(html);
    	            	if(jxbj){$(dom).siblings(".investmenttip").show();}
    	            	if(result.count>5){
        	            	$(dom).parent().find(".page").html('<div class="pagination"><input name="pageNo" type="hidden" id="pageNo" value="'+params.pageNo+'" /><input name="pageSize" type="hidden" id="pageSize" value="'+params.pageSize+'" /><div id="laypage'+params.status+params.awardType+'" class="pagination" ></div></div>')
        	                $("#laypage"+params.status+params.awardType).pagination({
        	                	currentPage :params.pageNo-1,
        	                	totalCount: result.count,
        	                    pageSize: params.pageSize,
        	                    clickEvent: function (page_index, _this) {
        	                        params.pageNo=page_index+1;
        	                        self.getList(params,dom);
        	                    }
        	                });
    	            	}else{
    	            		
    	            	}

        	        }
        	    });
        }
    }
    new InvestmentCard().init();
}();
function showRule(){
	layer.open({
	  type: 1,
	  title:'优惠券使用规则',
	  area: ['500px', 'auto'], //宽高
	  content: $("#investmentRule")
	});
}