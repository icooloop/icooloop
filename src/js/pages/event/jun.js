var isEnd=true;
var isLogin=false;
$.extend({
    luckGame: function(options) {
    	var defaults = {
    	        'gameLen': '8',
    	        'game_pagesize':10,//生成多少圈同样的东西
    	        'zj_arr':{
    	        	is_win:1,
    	        	number:1,
    	        	bonusAmount:0,
    	        	bonusName:'xx',
    	        	bonusResult:"xx",
    	        	bonusRemark:""
    	        }
    	    };
         var settings = $.extend(defaults, options);
         w_config={
         	'w':$(window).width(),
         	'h':$(window).height()
         }
         var gameArr=[];
         var gameLen=settings.gameLen;
         var game_list_h='';
         var game_init=[];
         var game_list_item_h=0;

          //每次进来随机3个数字，来启动当前的选择的状态
          for (var i = 0; i < 3; i++) {
          	game_init.push(Math.floor(Math.random() * gameLen));
          }
          
    	  createGame();
          $(window).resize(function(){
         	 createGame();
         }) 
          
          function createGame(){
	          	getHeight();
	          	setLi();
	          	pushLi(gameArr);
	          	start();
          }

          function getHeight(){
          	w_config={
          		'w':$(window).width(),
          		'h':$(window).height()
          	}
          	 game_list_item_h=220;
          }

          //设置奖品
          function setLi(){
          	for (var j = 1; j <= settings.game_pagesize; j++) {
          		for (var i = 1; i <= gameLen; i++) {
          			gameArr.push({'type':j,'index':i,'src':basePath+'/public/images/event/jun/p'+i+'.png'});
          		}
          	}
          }
          //写入，初始化奖品的滚动
          function pushLi(arr){
          	console.log(game_list_item_h);
          	var html_str='';
          	for (var i = 0; i < arr.length; i++) {
          		html_str+='<li style="height:'+game_list_item_h+'px" data-index="'+arr[i]['index']+'" data-type="'+arr[i]['type']+'"><img src="'+arr[i]['src']+'"></li>';
          	}
          	$(".game-goods-ul").each(function(e){
          		$(this).empty().append(html_str);
          		game_list_h=$(this).height();
          		console.log('game_list_item_h',game_init);
          		y=game_list_item_h*game_init[e];
          		$(this).css({
          			'transition-duration': '0ms',
          			'transform':'translate(0px, -'+y+'px) translateZ(0px)'
          		})
          	});
          }
          
          function start(){
          	$(".game-btn").click(function(){
          		if(!isLogin){
          			layerLogin();
          			return false;
          		}
          		if(!ieTip()){
          			return false;
          		}
          		if(isEnd){
          			isEnd=false;
          		$.ajax({
          		         url: basePath + '/event/act201810/draw',
          		         type: "POST",
          		         success: function (data) {
          		        	data={success:true,code:1,jsonData:{awardPic:5,bonusName:'元现金',awardAmt:100,signCount:3}};
          		        	if (!data.success) {
         		                 if (data.code == "-1") {
         		                     layerLogin();
         		                     return;
         		                 }
         		                 layer.msg(data.msg);
         		             } else {
         		             	 settings.zj_arr.is_win = data.code;
         		             	 var json = data.jsonData;
         		             	 if(data.code==1){
	   	      		            	var awardAmt = json.awardAmt;//如果是实物，则显示实物名称
	   	      		            	var awardPic = parseInt(json.awardPic);//中奖号 0-红包 1-现金 2-话费 3-京东卡 4-加息券 5-手机
	   	      		            	var bonusName =  json.bonusName;
	   	      		            	settings.zj_arr.number = awardPic;
	   	      		            	if(awardPic==2||awardPic==3||awardPic==5){
	   	      		            		settings.zj_arr.bonusName= awardAmt;
	   	      		            	}else{
	   	      		            		settings.zj_arr.bonusName= awardAmt+bonusName;
	   	      		            	}
	   	      		            	if(awardPic==0){
	   	      		            	 	settings.zj_arr.bonusResult='<div class="gainbonus"><em>'+awardAmt+'</em>元</div>';
	   	      		            	}else if(awardPic==1){
	   	      		            	 	settings.zj_arr.bonusResult='<div class="gaincash"><em>'+awardAmt+'</em>元</div>';
	   	      		            	}else if(awardPic==4){
	   	      		            	 	settings.zj_arr.bonusResult='<div class="gainjiaxi"><em>'+awardAmt+'</em>%</div>';
	   	      		            	}else{
	   	      		            	 	settings.zj_arr.bonusResult='<div class="bonusimg"><img alt="" src="/public/images/event/jun/p'+(awardPic+1)+'.png"></div>';
	   	      		            	}
	   	      		            	if(awardPic==1||awardPic==0){
	   	      		            		settings.zj_arr.bonusRemark='现金已发放至您账户';
	   	      		            	}else if(awardPic==2||awardPic==3||awardPic==5){
	   	      		            		settings.zj_arr.bonusRemark='活动结束后7个工作日内发放';
	   	      		            	}
         		             	 }
         		             	  changeBonusStep(json.signCount);
         		            	 gameover();
         		             }
          		        }
          		     })
            	}
          	})
          }
          function gameover(){
        	  $("#bonusRemark").html('');
        	  if(settings.zj_arr.is_win==0){//没有抽奖机会
        			isEnd=true;
        			$("#bonusClose").show();
        			$("#bonusDesc").removeClass("getbonus").html('您暂无抽奖机会哦');
        			$("#bonusResult").html('<div class="disbonus">单笔出借每满2,000元可获得一次机会，<br>例：单笔出借满20,000元，可获得10次机会</div>');
        			$("#bonusBtn").html('<a href="'+basePath+'/spa/product/index" class="btn-bonus" target="_blank" onclick="layer.closeAll()">我要出借</a>');
        			bonusTip(settings.zj_arr.is_win);
        		}else if(settings.zj_arr.is_win==1){//如果中奖
        			$(".game-content").addClass('gaming');
        			$(".game-goods-ul").each(function(e){
        				setTimeout(function(){
        					y=(settings.zj_arr.number+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
        					$(".game-goods-ul").eq(e).css({
        						'transition-duration': '4000ms',
        						'transform':'translate(0px, -'+y+'px) translateZ(0px)'
        					})
        				}, e*300);
        				//判断最后面是否完毕
        				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
        					y=settings.zj_arr.number*game_list_item_h;
        				    $(".game-goods-ul").css({
        				    	'transition-duration': '0ms',
        				    	'transform':'translate(0px, -'+y+'px) translateZ(0px)'
        				    })
        				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
        				})
        			})
        			setTimeout(function(){
        				isEnd=true;
        				end();
            			$("#bonusClose").hide();
        				$("#bonusDesc").addClass("getbonus").html('恭喜您获得'+settings.zj_arr.bonusName);
            			$("#bonusResult").html(settings.zj_arr.bonusResult);
            			$("#bonusRemark").html(settings.zj_arr.bonusRemark);
            			$("#bonusBtn").html('<a href="javascript:layer.closeAll();" class="btn-bonus">继续抽奖</a>');
            			bonusTip(settings.zj_arr.is_win);
        			},4200);
        		}else{
        			$(".game-content").addClass('gaming');
        			numrand=randNum2();
        			console.log(numrand);
        			//不中奖的时候
        			$(".game-goods-ul").each(function(e){
        				y2=(numrand[0])*game_list_item_h;
        				y3=(numrand[1])*game_list_item_h;
        				y4=(numrand[2])*game_list_item_h;
        				setTimeout(function(){
        					y=(numrand[e]+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
        					$(".game-goods-ul").eq(e).css({
        						'transition-duration': '4000ms',
        						'transform':'translate(0px, -'+y+'px) translateZ(0px)'
        					})
        				}, e*300);
        				//判断最后面是否完毕
        				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
        				    $(".game-goods-ul").eq(2).css({
        				    	'transition-duration': '00ms',
        				    	'transform':'translate(0px, -'+y4+'px) translateZ(0px)'
        				    })
        				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
        				})
        				$("#game2").find(".game-goods-ul").on("webkitTransitionEnd", function() {
        				    $(".game-goods-ul").eq(1).css({
        				    	'transition-duration': '00ms',
        				    	'transform':'translate(0px, -'+y3+'px) translateZ(0px)'
        				    })
        				    $("#game2").find(".game-goods-ul").unbind("webkitTransitionEnd");
        				})
        				$("#game1").find(".game-goods-ul").on("webkitTransitionEnd", function() {
        				    $(".game-goods-ul").eq(0).css({
        				    	'transition-duration': '00ms',
        				    	'transform':'translate(0px, -'+y2+'px) translateZ(0px)'
        				    })
        				    $("#game1").find(".game-goods-ul").unbind("webkitTransitionEnd");
        				})
        			})
        			setTimeout(function(){
        				isEnd=true;
        				end();
        				$("#bonusClose").show();
        				$("#bonusDesc").removeClass("getbonus").html('未抽到奖品，再接再厉');
            			$("#bonusResult").html('<div class="nobonus"><img alt="" src="/public/images/event/jun/dog.png"></div>');
            			$("#bonusBtn").html('<a href="javascript:layer.closeAll();" class="btn-bonus">继续抽奖</a>');
            			bonusTip(settings.zj_arr.is_win);
        			},4200);
        		}
          }
          function end(){//抽奖结束后
        	  $(".game-content").removeClass('gaming');
        	  if(settings.zj_arr.is_win>0){
        		  $.ajax({
                      url: basePath + '/event/act201810/count',
                      type: "POST",
                      data: {},
                      success: function (data) {
                    	  if (!data.success) {
      		                 if (data.code == "-1") {
      		                     layerLogin();
      		                     return;
      		                 }
      		                 layer.msg(data.msg);
      		             } else {
      		            	var json = data.jsonData;
      		            	var awardCount = json.awardCount;
      		            	var signCount = json.signCount;
      		            	var totalCount=parseInt(signCount);
      			 			$("#totalCount").html(totalCount);
      			 			var surplusCount=parseInt(awardCount);
      			 			$("#surplusCount").html(surplusCount);
      		             }
                      }
        		  	})
        		  	luckLog(); 
		 	  }
          }
          function randNum2(){
          	a=Math.floor(Math.random() * gameLen);
          	b=Math.floor(Math.random() * gameLen);
          	c=Math.floor(Math.random() * gameLen);
          	arr=[];
          	if(a==b){
          		return randNum2();
          	}else{
          		return arr=[a,b,c];
          	}
          }
    }
})
$(function(){
	$.luckGame();
	var signCount=parseInt($("#totalCount").html())
	changeBonusStep(signCount);
})

function changeBonusStep(signCount){
	if(signCount>=200){
		 $("#bonus1,#bonus2,#bonus3,#bonus4").removeClass("disabled");
		 $("#bonusStep").attr("class","step step5").html("<h6>恭喜您已抽满<em>200</em>次</h6>").show();
	 }else if(signCount>=100){
		 $("#bonus1,#bonus2,#bonus3").removeClass("disabled");
		 $("#bonusStep").attr("class","step step4").show();
		 $("#bonusNum1").html(200-signCount);
		 $("#bonusNum2").html(500);
	 }else if(signCount>=40){
		 $("#bonus1,#bonus2").removeClass("disabled");
		 $("#bonusStep").attr("class","step step3").show();
		 $("#bonusNum1").html(100-signCount);
		 $("#bonusNum2").html(200);
	 }else if(signCount>=10){
		 $("#bonus1").removeClass("disabled");
		 $("#bonusStep").attr("class","step step2").show();
		 $("#bonusNum1").html(40-signCount);
		 $("#bonusNum2").html(100);
	 }else{
		 $("#bonusStep").attr("class","step step1").show();
		 $("#bonusNum1").html(10-signCount);
 		 $("#bonusNum2").html(30);
	 }
}
var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var fn = null;
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
function luckLog(){
	var _table=$('#recordlist');
	_table.empty();
	$.ajax({
		url:basePath + '/event/act201810/log',
		type:'post',
		dataType:'json',
		data:{pageNo:$('#pageNo').val(),'pageSize':pageSize},
		cache:false,
		async:false,
		success:function(data){
			var result = $.parseJSON(data);
			var html=[];
			if(result.count > 0){
				$("#recordTable").show();
				$.each(result.data,function(i,o){
					html.push('<tr>');
					html.push('<td>',o.remark,'</td>');
					html.push('<td>',formartDate(o.updateTime,'yyyy-MM-dd hh:mm:ss'),'</td>');
					html.push('</tr>');
				});
			}else{
				$("#norecord").show();
			}
			_table.html(html.join(''));
			totalCount = result.count;
			if(totalCount>pageSize){
				fn = luckLog;
				$('#laypage').show();
			}else{
				$('#laypage').hide();
			}
		}
	});
}
function bonusTip(is_win){
	var ht=(is_win==2)?'416px':'auto';
	layer.open({
	  type: 1,
	  closeBtn:false,
	  shadeClose:true,
	  area: ['542px',ht], //宽高
	  title:false,
	  content: $("#bonusTip"),
	  success: function(layero, index){
		  $(".md-bonustip").parent().parent().css('background','none');
	  }
	});
}
function ieTip(){
	var DEFAULT_VERSION = 9.0;  
    var ua = navigator.userAgent.toLowerCase();  
    var isIE = ua.indexOf("msie")>-1;  
    var safariVersion;  
    if(isIE){  
    safariVersion =  ua.match(/msie ([\d.]+)/)[1];  
    }  
    if(safariVersion <= DEFAULT_VERSION ){  
      layer.alert('系统检测到您正在使用ie9以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
      return false;
    }; 
    return true;
}