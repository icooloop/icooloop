function applyLoan() {
	if (!isLogin) {
		layer.open({
			type:2,
			title:false,
			closeBtn:true,
			shadeClose: true,
			area: ['440px', '380px'],
			content:basePath+"/layer/loginLoan?url="
		});
		return false;
	}
	window.location.href=basePath+"/loan/apply/one";
}
