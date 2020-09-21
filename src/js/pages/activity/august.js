/**
 * Created by lidy on 2018/7/30.
 */

$("#award").click(function(){
	 
	$.post(basePath+"/event/august/award",function(data){
		if(data.success){
			layer.alert("奖励券已发放到您的账户"); 
			$("#award").css("btn-go disabled");
			return;
		}else{
			if(data.msg=='请先登录！'){
				layerLogin();
			}else{
				layer.alert(data.msg);
			}
		}
	})
})