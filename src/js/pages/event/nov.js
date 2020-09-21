var submit = false;
function getBonus(obj) {
	var _this=$(obj);
	if (submit) {
		return false;
	}
	layer.confirm('<span class="text-danger">领取后，参与活动的散标债权将在持有期内无法转让，确认是否领取。</span>', function(index){
		$.ajax({
			url : basePath + '/event/nov/award',
			type : "POST",
			data: {
	             "ruleId": _this.data("rule") 
	        },
			success : function(data) {
				submit = false;
				if (data.success) {
					layer.closeAll();
					_this.parent().html('<a href="'+basePath+'/spa/product/index" class="btn btn-go" target="_blank">去出借</a>');
					$("#"+_this.data("id")).html('<em>0.00</em>元');
					$("#emAmt").html(_this.data("award"))
					layer.open({
						type : 1,
						shadeClose : true,
						title : false,
						closeBtn : false,
						area : [ '340px', 'auto' ], // 宽高
						content : $("#getbonus")
					});
				} else {
					if (data.code == "-1") {
						layerLogin();
						return;
					}
					layer.msg(data.msg);
				}
			}
		})
	});  
}