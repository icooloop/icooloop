var submit = false;
var disabledFlag=false;
function openLayer(ruleId,obj){
	if(isLogin){
		if (submit) {
			return false;
		}
		if(typeof ruleId == "undefined" || ruleId == null || ruleId == ""){
			return layer.msg("活动未开始或已结束");
		}
		if($(".btn-act").hasClass("disabled")){
			return false;
		}
		var klqzs = parseInt($("#klqzs").html());
		var _this=$(obj);
		_this.attr("disabled",true).addClass("disabled");
		$.ajax({
			url : basePath + '/event/dec/award',
			type : "POST",
			data:{
				"ruleId":ruleId
			},
			success : function(data) {
				submit = false;
				if (data.success) {
					klqzs--;
					$("#klqzs").html(klqzs);
					var pig=$("#bonuslist .rate").eq(_this.data("index"));
					pig.addClass("pig");
					$("#goldtip").html('<div class="win_state"><img src="'+basePath+'/public/images/event/mar/flower4.png" height="100" alt="" /></div>');
					setTimeout(function(){
						_this.attr("disabled",false).removeClass("disabled");
						pig.removeClass("pig");
						$("#goldtip").html('');
						$("#resultDesc1").html('恭喜您领取成功');
						$("#resultDesc2").html('<p>您今日已经领取了<em>'+(parseInt(5-klqzs))+'</em>张</p><p>还可以领取<em>'+(klqzs)+'</em>张</p>');
						$("#getbonus").addClass('getbonus').show();
					},1400);
					if((klqzs)==0){
						$("#actBtn").html('<a href="'+basePath+'/spa/product/index" class="btn btn-act">我要出借</a>');
						submit = true;
						return;
					}
				} else {
					_this.attr("disabled",false).removeClass("disabled");
					if (data.code == '-3') {
						return layer.open({
							content : data.msg,
							title : false,
							closeBtn : false,
							btn : [ '去出借','取消' ],
							yes : function(index, layero) {
								window.location.href = basePath + '/spa/product/index';
							},btn2:function(index,layero){
								layer.closeAll();
							}
						});
					}
					layer.msg(data.msg);
				}
			}
		})
	}else{
		layerLogin();
	}
}
function colseLayer(){
	$("#getbonus").removeClass('getbonus').hide();
}

function bonusTest(){
	setTimeout(function(){
		$("#bonuslist .rate").eq(0).addClass("pig");
		$("#goldtip").html('<div class="win_state"><img src="/public/images/event/mar/flower4.png" height="100" alt="" /></div>');
		setTimeout(function(){
			$("#goldtip").html('');
			$("#bonuslist .rate").eq(0).removeClass("pig");
			$("#resultDesc1").html('恭喜您领取成功');
			$("#resultDesc2").html('<p>您今日已经领取了<em>4</em>张</p><p>还可以领取<em>1</em>张</p>');
			$("#getbonus").addClass('getbonus').show();
		},1400);
	},3000);
}