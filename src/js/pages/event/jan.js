var submit = false;
function openLayer(ruleId){
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
					$("#resultDesc1").html('恭喜您领取成功');
					$("#resultDesc2").html('<p>您今日已经领取了<em>'+(parseInt(5-klqzs))+'</em>张</p><p>还可以领取<em>'+(klqzs)+'</em>张</p>');
					$("#getbonus").show().addClass('getbonus');
					if((klqzs)==0){
						$("#actBtn").html('<a href="'+basePath+'/spa/product/index" class="btn btn-act">我要出借</a>');
						submit = true;
						return;
					}
				} else {
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