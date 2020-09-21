//1.1 美化单复选框
$('input.icheck').iCheck({
	checkboxClass:'icheckbox',
	radioClass:'iradio' 
}); //icheck

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
var firstSlider=true;
var chkUserLoginName = false;
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
function checkUserLoginName(){
	chkUserLoginName=false;
	var icontip=$(".icontip[for='userLoginName']");
	var p = $("#formtip1");
	var th=$("#userLoginName");
	var v=$.trim(th.val());
    p.html('');
	icontip.hide();
	th.removeClass("Validform_error").removeClass("Validform_right");
    $.ajax({
        type: "post",
        dataType: "html",
        url: basePath + '/secure/register/check-login-name',
        async: false,
        data: {"account": v,userType:5},
        success: function (data) {
        	var result=$.parseJSON(data);
            if (result.success) {
            	$("#userPhone2").val(v);
                p.html('');
            	th.addClass("Validform_right");
            	icontip.attr("class","icontip icon-font icon-right").show();
            	chkUserLoginName=true;
                return true;
            } else {
            	th.addClass("Validform_error");
                p.html('<span class="errortip"><i class="icon-font icon-error"></i>'+result.msg+'</span>');
                icontip.attr("class","icontip icon-font icon-error").show();
                return false;
            }
        }
    });
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
//2.4 滑动验证
function checkSlidercode(){
	var _input = $("#slidercode");
	var _val = $.trim(_input.val());
	var _tip=$("#formtip1");
	_tip.html('');
	if(_val!='true'){
		  _tip.html('<span class="errortip"><i class="icon-font icon-error"></i>请先成功完成滑块验证</span>');
		  return false;
	}
	return true;
}
//2.5 短信验证码
function checkPhoneCode() {
	$("#codehelp").hide();
	chkPhoneCode=false;
	var icontip=$(".icontip[for='phoneCode']");
    var th = $("input[name='phoneCode']");
    var p = $("#formtip1");
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
        chkPhoneCode=true;
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
function registerSubmit(){
	var checkForm=((chkUserLoginName||checkUserLoginName())&&(chkUserPhone||checkUserPhone())&&(chkUserPassword||checkUserPassword())&&(checkSlidercode())&&(chkPhoneCode||checkPhoneCode()));
	if(checkForm){
		if(!$("#agreement").is(":checked")){
			$("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>必须同意注册协议</span>');
			return false;
		}
		$("#submit").addClass("disabled").attr("disabled",true); 
		 $.ajax({
	         type : "post",
	         dataType : "json",
	         url : basePath + '/secure/loan/register/ajax-submit',
	         data : $("#myform").serialize(),
	         success : function(data) {
	        	 $("#submit").removeClass("disabled").attr("disabled",false); 
	             var result = $.parseJSON(data);
	             if (result.success) {
	                 window.location.href=basePath+"/secure/loan/reg/success";
	             } else {
	            	 $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+result.msg+'</span>');
	                 //layer.msg();
	             }
	         }
	     });
	}
}
var submitFlag=true;
//3.1 发送短信验证
function sendPhoneCode(){
	if (!chkUserPhone) {
		checkUserPhone();
        return false;
    }
	if(!firstSlider){
		firstSlider=true;
		$("#slidercode").val('false');
		nc.reload(); 
	}
    if (chkUserPhone&&checkSlidercode()) {
    	var icontip=$(".icontip[for='phoneCode']");
        var th = $("input[name='phoneCode']");
        var p = $("#formtip1");
        var v = $.trim(th.val());
    	icontip.hide();
    	th.removeClass("Validform_error").removeClass("Validform_right");
    	//次数校验...
        $.ajax({
            type: "post",
            url: basePath + '/secure/loan/register/verify-codevoice',
            data: {phone: $("#userPhone").val(),
	            	csessionid:$("#csessionid").val(),
	            	sig:$("#sig").val(),
	            	token:$("#token").val(),
	            	scene:$("#scene").val()},
            success: function (data) {
            	console.log(data);
                if (data.success) {
                    var sendTimes = data.sendTime;
                	submitFlag=true;
                	firstSlider=false;
                	$("#submit").removeClass("disabled").attr("disabled",false);
                    if (sendTimes >= 6 && sendTimes < 10) {
                        $("#formtip1").html('');
                    	codehelpFlag=true;
                        disableButtonByClock(60);
                        $("#infotip").html('验证码已发送到您的手机，10分钟内输入有效，请勿泄露');
                    }else if(sendTimes >= 10){
                    	codehelpFlag=false;
                    	submitFlag=false;
                    	$("#codebtn").html('重新获取');
            	        $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>验证码错误，本日手机号码验证次数已达上限</span>');
            	        $("#voicediv").html('您可查看<a class="c-link" href="'+basePath+'/help/question?faqType=a3acf878fda746ba8bc0b29b6a784d4b" target="_blank">帮助中心</a>，或拨打客服热线400-090-9968');
            	        $("#infotip").html('');
            	        $("#submit").addClass("disabled").attr("disabled",true); 
                    }else{
                        $("#formtip1").html('');
                    	codehelpFlag=false;
                    	disableButtonByClock(60);
                    	$("#infotip").html('验证码已发送到您的手机，10分钟内输入有效，请勿泄露');
                    }
                } else {
                	$("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.msg+'</span>');
                }
            }
        });
    }
}
function disableButtonByClock(seconds) {
	$("#codebtn").html("还剩"+seconds+"秒");
    var time = parseInt(seconds);                   //将传入的参数转为整型数字
    if (time === 0) {
        $("#codebtn").html('<a  class="c-link" onclick="sendPhoneCode()" href="javascript:;">重新获取</a>');
    } else {
        setTimeout("disableButtonByClock(" + (time - 1) + ")", 1000);
    }
}

$(".icontip.icon-error").on("click",function(){
	var _this=$(this);
	var _input=$("#"+_this.attr("for"));
	_input.val("");
})