//1.1 美化单复选框
$('input.icheck').iCheck({
	checkboxClass:'icheckbox',
	radioClass:'iradio' 
}); //icheck

//1.2 显示邀请码
function changeInvite() {
	var _hidden=$("#invitediv").is(":hidden");
	if(_hidden){
		$("#invitediv").slideDown(200);
		$("#inviteDesc").html('<i class="icon-font icon-xiasanjiao"></i>我有邀请人（选填）');
	}else{
		$("#invitediv").slideUp(200);
		$("#inviteDesc").html('<i class="icon-font icon-yousanjiao"></i>我有邀请人（选填）');
	}
}
//1.3 显示隐藏密码
function changePwdType() {
    var _this = $("#userPassword");
    var _type = _this.attr("type");
    var _change = (_type == "password") ? "text" : "password";
    _this.attr("type", _change);
}

var isNullReg = /^[\s]{0,}$/;
var mobileReg = /^(13|14|15|16|18|17|19)[0-9]{9}$/;
var verifyCodeReg = /^[A-Za-z0-9]{6}$/;
var chkUserPhone=false;
var chkUserPassword=false;
var chkPhoneCode=false;
var chkInviteCode=true;
var chkForm1=false;
var submitFlag=true;
var ifSendPhoneCode=false;
var codeType=1;
//2.1 手机号
function checkUserPhone(){
	chkUserPhone=false;
	var icontip=$(".icontip[for='userPhone']");
	var p = $("#formtip1");
	var th=$("#userPhone");
	var v=$.trim(th.val());
    p.html('');
	icontip.hide();
	th.removeClass("Validform_error").removeClass("Validform_right");
	if (v.length == 11) {
        if (!mobileReg.test(v)) {
        	th.addClass("Validform_error");
            p.html('<span class="errortip"><i class="icon-font icon-error"></i>请填写正确的手机号</span>');
            icontip.attr("class","icontip icon-font icon-error").show();
            return false;
        }
        $.ajax({
            type: "post",
            dataType: "html",
            url: basePath + '/secure/register/check-account',
            async: false,
            data: {"account": v},
            success: function (data) {
            	var result=$.parseJSON(data);
                if (result.success) {
                	$("#userPhone2").val(v);
                    p.html('');
                	th.addClass("Validform_right");
                	icontip.attr("class","icontip icon-font icon-right").show();
                	chkUserPhone=true;
                    return true;
                } else {
                	th.addClass("Validform_error");
                    p.html('<span class="errortip"><i class="icon-font icon-error"></i>'+result.msg+'</span>');
                    icontip.attr("class","icontip icon-font icon-error").show();
                    return false;
                }
            }
        });
    } else {
    	th.addClass("Validform_error");
    	p.html('<span class="errortip"><i class="icon-font icon-error"></i>请填写正确的手机号</span>');
        icontip.attr("class","icontip icon-font icon-error").show();
        return false;
    }
}
//2.2 密码
function checkUserPassword() {
	chkUserPassword=false;
	var icontip=$(".icontip[for='userPassword']");
    var th = $("input[name='userPassword']");
    var p = $("#formtip1");
    var v = $.trim(th.val());
    p.html('');
	icontip.hide();
	th.removeClass("Validform_error").removeClass("Validform_right");
    var pwdReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    if (isNullReg.test(v)) {
    	th.addClass("Validform_error");
        p.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入登录密码</span>');
        icontip.attr("class","icontip icon-font icon-error").show();
        return false;
    } else if (v.length < 6 || v.length > 20||!pwdReg.test(v)) {
    	th.addClass("Validform_error");
        p.html('<span class="errortip"><i class="icon-font icon-error"></i>6-20位字母、数字或字符中任意两种组合</span>');
        icontip.attr("class","icontip icon-font icon-error").show();
        return false;
    }
    chkUserPassword=true;
    th.addClass("Validform_right");
	icontip.attr("class","icontip icon-font icon-right").show();
    p.html('');
    return true;
}
//2.3邀请码
function checkInviteCode() {
    chkInviteCode = false;
    var icontip=$(".icontip[for='inviteCode']");
    var th = $("input[name='inviteCode']");
    var p = $("#formtip1");
    var v = $.trim(th.val());
    p.html('');
    icontip.hide();
	th.removeClass("Validform_error").removeClass("Validform_right");
    if (v == null || v == "") {
    	chkInviteCode = true;
        return true;
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: basePath + '/secure/register/check-code',
            data: {"code": v},
            success: function (data) {
                if (!data.success) {
                	th.addClass("Validform_error");
                    p.html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.msg+'</span>');
                    icontip.attr("class","icontip icon-font icon-error").show();
                } else {
                	chkInviteCode = true;
                }
            }
        });
    }
}
function showSlidercode(){
	layer.open({
	  type: 1,
	  title:false,
	  closeBtn:false,
	  area: ['420px', 'auto'], //宽高
	  content:$("#slidercodeLayer")
	});
}
//2.4 滑动验证
function checkSlidercode(){
	var _input = $("#slidercode");
	var _val = $.trim(_input.val());
	var _tip=$("#formtip2");
	_tip.html('');
	if(_val!='true'){
		  _tip.html('<span class="errortip"><i class="icon-font icon-error"></i>请先成功完成滑块验证</span>');
		  return false;
	}
	layer.closeAll();
	(codeType==1)?sendPhoneCode():sendVoiceCode();
	return true;
}
//2.5 短信验证码
function checkPhoneCode() {
	$("#codehelp").hide();
	chkPhoneCode=false;
	var icontip=$(".icontip[for='phoneCode']");
    var th = $("input[name='phoneCode']");
    var p = $("#formtip2");
    var v = $.trim(th.val());
    if(submitFlag){
    	p.html('');
    	icontip.hide();
    	th.removeClass("Validform_error").removeClass("Validform_right");
        var codeReg = /^[0-9]{6}$/;
        if (isNullReg.test(v)) {
        	th.addClass("Validform_error");
            p.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入手机验证码</span>');
            icontip.attr("class","icontip inputtip-code icon-font icon-error").show();
            return false;
        } else if (!codeReg.test(v)) {
        	th.addClass("Validform_error");
            p.html('<span class="errortip"><i class="icon-font icon-error"></i>请输入6位手机验证码</span>');
            icontip.attr("class","icontip inputtip-code icon-font icon-error").show();
            return false;
        }
        chkUserPassword=true;
        th.addClass("Validform_right");
    	icontip.attr("class","icontip inputtip-code icon-font icon-right").show();
        p.html('');
    }
    return true;
}
var codehelpFlag=false;
function phoneCodeFocus(){
	if(codehelpFlag){
	    $("#codehelp").html('手机验证有问题？<br>查看帮助中心或联系客服').show();
	}
}
//2.7 注册第一步
function registerNext(){
	if(regStart=='0'){
		window.location.href='/spa/static/reg_notice';
		return;
	}
	var checkForm1=(chkUserPhone||checkUserPhone())&&(chkUserPassword||checkUserPassword())&&(chkInviteCode||checkInviteCode());
	if(checkForm1){
		if(!$("#agreement").is(":checked")){
			$("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>必须同意注册协议</span>');
			return false;
		}
		$("#formtip1").html('');
		chkForm1=true;
		$("#registerform1").hide();
		$("#registerform2").show();
		
		$("#userPhone2").val($("#userPhone").val());
		$("#userPassword2").val($("#userPassword").val());
		$("#inviteCode2").val($("#inviteCode").val());
		$("#userPhone3").val($("#userPhone").val());
		//清空短信码框
		$("#phoneCode").val("");
		$(".icontip[for='phoneCode']").hide();
	    $("input[name='phoneCode']").removeClass("Validform_error").removeClass("Validform_right");
		if(!ifSendPhoneCode) sendPhoneCode();
	}
}
//2.8 返回上一步
function registerBack(){
	$("#registerform1").show();
	$("#registerform2").hide();
}
//2.9 立即验证
function registerSubmit(){
	if(chkForm1&&(chkPhoneCode||checkPhoneCode())){
		 $("#submit2").addClass("disabled").attr("disabled",true); 
		 $.ajax({
	         type : "post",
	         dataType : "json",
	         url : basePath + '/secure/register/ajax-submit',
	         data : $("#myform2").serialize(),
	         success : function(data) {
	        	 $("#submit2").removeClass("disabled").attr("disabled",false); 
	             var result = $.parseJSON(data);
	             if (result.success) {
	                 window.location.href=basePath+"/member/secure/register/success";
	             } else {
	            	 $("#formtip2").html('<span class="errortip"><i class="icon-font icon-error"></i>'+result.msg+'</span>');
	                 //layer.msg();
	             }
	             $("#submit").addClass("disabled").attr("disabled", false);
	         }
	     });
	}
}
var voicetype=false;
var submitFlag=true;

// 0-无需验证码校验
var boolCaptchaCheck = $("#captchaCheck").val()=="0"?false:true;

//3.1 发送短信验证
function sendPhoneCode(){
	var slidercode=$("#slidercode").val();
	if(slidercode!='true'&&boolCaptchaCheck){
		codeType=1;
		showSlidercode();
		return false;
	}
	if (!chkUserPhone) {
		checkUserPhone();
        return false;
    }
    if (chkUserPhone) {
    	var icontip=$(".icontip[for='phoneCode']");
        var th = $("input[name='phoneCode']");
        var p = $("#formtip2");
        var v = $.trim(th.val());
    	icontip.hide();
    	th.removeClass("Validform_error").removeClass("Validform_right");
    	//次数校验...
        $.ajax({
            type: "post",
            url: basePath + '/secure/register/verify-codevoice',
            data: {phone: $("#userPhone2").val(),
            	csessionid:$("#csessionid").val(),
            	sig:$("#sig").val(),
            	token:$("#token").val(),
            	scene:$("#scene").val()},
            success: function (data) {
                if (data.success) {
                    var sendTimes = data.sendTime;
                	submitFlag=true;
                	$("#submit2").removeClass("disabled").attr("disabled",false);
                    if (sendTimes >= 6 && sendTimes < 10) {
                        $("#formtip2").html('');
                    	codehelpFlag=true;
                        disableButtonByClock(60);
                        $("#infotip").html('验证码已发送到您的手机，10分钟内输入有效，请勿泄露');
                        $("#slidercode").val('false');
                        nc.reload();
                    }else if(sendTimes >= 10){
                    	codehelpFlag=false;
                    	submitFlag=false;
                    	$("#codebtn").html('重新获取');
            	        $("#formtip2").html('<span class="errortip"><i class="icon-font icon-error"></i>验证码错误，本日手机号码验证次数已达上限</span>');
            	        $("#voicediv").html('您可查看<a class="c-link" href="'+basePath+'/help/question?faqType=a3acf878fda746ba8bc0b29b6a784d4b" target="_blank">帮助中心</a>，或拨打客服热线400-090-9968');
            	        $("#infotip").html('');
            	        $("#submit2").addClass("disabled").attr("disabled",true); 
                    }else{
                        $("#formtip2").html('');
                    	codehelpFlag=false;
                    	disableButtonByClock(60);
                    	$("#infotip").html('验证码已发送到您的手机，10分钟内输入有效，请勿泄露');
                    	$("#slidercode").val('false');
                    	nc.reload();
                    }
                } else {
                	$("#formtip2").html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.msg+'</span>');
                }
            }
        });
    }
}
//3.2 发送语音验证
function sendVoiceCode(){
	var slidercode=$("#slidercode").val();
	if(slidercode!='true'&&boolCaptchaCheck){
		codeType=2;
		showSlidercode();
		return false;
	}
	$.ajax({
        type: "post",
        url: basePath + '/secure/register/verify-codevoice',
        data: {phone: $("#userPhone2").val(),type:'1',
        	csessionid:$("#csessionid").val(),
        	sig:$("#sig").val(),
        	token:$("#token").val(),
        	scene:$("#scene").val()},
        success: function (data) {
            if (data.success) {
                var sendTimes=data.sendTime;
                $("#submit2").removeClass("disabled").attr("disabled",false);
            	submitFlag=true;
                if (sendTimes >= 6 && sendTimes < 10) {
                    $("#formtip2").html('');
                	codehelpFlag=true;
                	disableButtonByClockVoice(60);
                	$("#infotip").html('验证码已经发送，请留意接听来电 ');
                	$("#slidercode").val('false');
                    nc.reload();
                }else if(sendTimes >= 10){
                	codehelpFlag=false;
                	submitFlag=false;
                	$("#codebtn").html('重新获取');
        	        $("#formtip2").html('<span class="errortip"><i class="icon-font icon-error"></i>验证码错误，本日手机号码验证次数已达上限</span>');
        	        $("#voicediv").html('您可查看<a class="c-link" href="'+basePath+'/help/question?faqType=a3acf878fda746ba8bc0b29b6a784d4b" target="_blank">帮助中心</a>，或拨打客服热线400-090-9968');
        	        $("#infotip").html('');
        	        $("#submit2").addClass("disabled").attr("disabled",true); 
                }else{
                    $("#formtip2").html('');
                	codehelpFlag=false;
                	disableButtonByClockVoice(60);
                	$("#infotip").html('验证码已经发送，请留意接听来电 ');
                	$("#slidercode").val('false');
                    nc.reload();
                }
            } else {
            	 $("#formtip2").html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.msg+'</span>');
            }
            
        }
    });
}
var firstFlag = false;
function disableButtonByClock(seconds) {
	if(!voicetype){
		ifSendPhoneCode=true;
		$("#codebtn").html("还剩"+seconds+"秒");
	    var time = parseInt(seconds);                   //将传入的参数转为整型数字
	    if (time === 0) {
			ifSendPhoneCode=false;
			firstFlag=true;
	        $("#codebtn").html('<a  class="c-link" onclick="sendPhoneCode()" href="javascript:;">重新获取</a>');
	        $("#voicediv").html('收不到短信？请使用<a  class="c-link" onclick="sendVoiceCode()" href="javascript:;">语音验证码</a>');
	    } else {
	        setTimeout("disableButtonByClock(" + (time - 1) + ")", 1000);  //1秒以后 再次调用本身这个方法
	        !firstFlag?$("#voicediv").html(''):$("#voicediv").html('收不到短信？请使用语音验证码');
	    }
	}
}
//3.2.1 禁用发送语音验证码按钮
function disableButtonByClockVoice(seconds) {
	voicetype=true;
	ifSendPhoneCode=true;
	$("#codebtn").html("还剩"+seconds+"秒");
    $("#voicediv").html('收不到短信？请使用语音验证码');
    var time = parseInt(seconds);
    if (time == 0) {     //如果时间为0，则启用该控件
    	voicetype=false;
		ifSendPhoneCode=false;
        $("#codebtn").html('<a  class="c-link" onclick="sendPhoneCode()" href="javascript:;">获取验证码</a>');
        $("#voicediv").html('收不到短信？请使用<a  class="c-link" onclick="sendVoiceCode()" href="javascript:;">语音验证码</a>');
    } else {
        setTimeout("disableButtonByClockVoice(" + (time - 1) + ")", 1000);  //1秒以后 再次调用本身这个方法
    }
}
$(".icontip.icon-error").on("click",function(){
	var _this=$(this);
	var _input=$("#"+_this.attr("for"));
	_input.val("");
})
