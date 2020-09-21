function openLayer(){
	$("#resultDesc").html('');
	$("#resultBtn").html('');
	$("#getbonus").removeClass("getsuccess");
	if(status==1){
		$("#resultDesc").html('活动期间邀请1人注册且出借<em>1000</em>元<br>可获得最高<em>100</em>元的翻倍奖励');
		$("#resultBtn").html('<a href="'+basePath+'/member/recom/list" class="btn-act" target="_blank">邀请好友</a>');
		$("#getbonus").show();
	}else if(status==2){
		$("#resultDesc").html('活动期间邀请1人注册且出借<em>1000</em>元<br>可获得最高<em>100</em>元的翻倍奖励<br><br>您已成功邀请好友注册<br>但TA尚未出借满<em>1000</em>元<br>赶紧通知TA去出借吧');
		$("#resultBtn").html('<a href="'+basePath+'/member/recom/list" class="btn-act" target="_blank">邀请好友</a>');
		$("#getbonus").show();
	}else if(status==3){
		$("#resultDesc").html('只能翻倍<em>1</em>次哦<br>最高可翻倍<em>100</em>元<br>返现奖励满<em>100</em>元后翻倍更划算哦');
		$("#resultBtn").html('<a href="'+basePath+'/spa/product/index" class="btn-act" target="_blank">继续出借</a><br><a href="javascript:;" class="btn-act act2 mt-20" onclick="getBonusSuccess()">继续翻倍</a>');
		$("#getbonus").show();
	}else if(status==4){
		getBonusSuccess();
	}
	
}
/*翻倍成功*/ 
function getBonusSuccess(){
	$("#gainBonus").addClass("disabled").attr("disabled",true);
	$.ajax({
		url : basePath + '/event/2019/febAward',
		type : "POST",
		success : function(data) {
			$("#gainBonus").removeClass("disabled").attr("disabled",false);
			if (data.success) {
				var successAmount = data.msg
				$("#getbonus").addClass("getsuccess");
				$("#resultDesc").html('恭喜您<br>获得<em class="num">'+formatCurrency(successAmount)+'</em>元<br>翻倍奖励');
				$("#extraBonus").html('+'+formatCurrency(successAmount)+'<em>（奖励翻倍）</em>');
				$("#result").html('<button type="button" class="btn-act disabled">奖励已翻倍</button>');
				$("#resultBtn").html('<a href="javascript:;" class="btn-act" onclick="closelayer()">确定</a>');
				$("#getbonus").show();
			} else {
				layer.msg(data.msg);
			}
		}
	})
	
}

function closelayer(){
	$("#getbonus").hide();
}