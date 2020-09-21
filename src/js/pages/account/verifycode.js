/**
 * 已登录的调用
 */
function getLoginedVerifyCode(node,codeType) {
	var mobile = '';
	var data = {"codeType":codeType}
	var url = basePath+ '/verifyCode/default';
	
	startPostCode(node,codeType,mobile,url,data);
}

/** 公共实现 */
function startPostCode(node,codeType,mobile,posturl,postdata) {
	var disAttr = $(node).addClass("disabled").attr("disabled");
	if(disAttr){// 被禁用,返回
		return;
	}
	disableNode(node);//禁用
	
	

	if(mobile!=''){
		var today = getISODate(new Date());
		// 获取该手机号的当天的发送次数
		var sendTimes = getCookie(mobile + today);
		if (sendTimes >= 3) {
			layer.msg('今天该手机号码已超过接收验证码上限');
			return;
		}
	}

	$.ajax({
		type : "post",
		url : posturl,
		data : postdata,
		success : function(data) {
				if (data.success == 0) {
					$("#errorMsg").html(data.msg).parent().css('visibility','visible');// 显示错误信息
				} else if (data.success == 1) {
					 layer.msg('发送成功！');
					// 设置cookies
					 if(mobile!=''){
						 var sendTimes = getCookie(mobile+ today);
						 if (sendTimes == null|| sendTimes == "") {
							 setCookie(mobile + today, 1);
						 } else {
							 setCookie(mobile + today,parseInt(sendTimes) + 1);
						 }
					 }
						setCookie('clickTime', new Date().getTime());
				} else if (data.success == -2) {
					$("#errorMsg").html(data.msg).parent().css('visibility','visible');// 显示错误信息
				} else {
					$("#errorMsg").html(data.msg).parent().css('visibility','visible');// 显示错误信息
				}
				setTimeout(function() {
					$("#errorMsg").html('').parent().css('visibility','hidden');
				}, 3000);
				disableButtonByClock(node,60);	
			}
				
		});
}

function disableButtonByClock(node,seconds) {
	var isInputTag = $(node).is('input');
	
	if(isInputTag){
		$(node).val(seconds + "s后重发");
	}else{
		$(node).html(seconds + "s后重发");
	}
    var time = parseInt(seconds); //将传入的参数转为整型数字
    if (time === 0) {
    	enableNode(node);//启用
    	if(isInputTag){
    		$(node).val("获取验证码");
    	}else{
    		$(node).html("获取验证码");
    	}        
    } else {
        setTimeout( function(){
        	disableButtonByClock(node, (time - 1));
        }, 1000); //1秒以后 再次调用本身这个方法
    }
}

function disableNode(node){
	$(node).addClass("disabled").attr("disabled", true);
}
function enableNode(node){
	$(node).removeClass("disabled").attr("disabled", false);
}

//写入cookies（时间为1天）
function setCookie(name, value) {
	var Days = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}

// 读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
//获取时间
function getISODate(d) {
	var s = function(a, b) {
		return (1e15 + a + "").slice(-b)
	};

	if (typeof d === 'undefined') {
		d = new Date();
	}
	;
	return d.getFullYear() + s(d.getMonth() + 1, 2) + s(d.getDate(), 2);
}