
   var isTimeout = true;
+function () {
    var Login = function () {// 构造函数
        this.$companyForm = $("#companyForm");
        this.$eyepwd = $("#eyepwd");
    }
    Login.prototype = {
        init: function () {
            this.setUserName();
            this.validate();
            this.changePwdType();
            $('input.icheck').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
        },
        changePwdType:function() {
        	this.$eyepwd.on("click",function(){
            	var _this = $("#userPassword");
                var _type = _this.attr("type");
                var _change = (_type == "password") ? "text" : "password";
                _this.attr("type", _change);
            })
        },
        setUserName:function(){
            if(window.localStorage&&window.localStorage.userName){
                $("#saveUserName").prop('checked',window.localStorage.isSaveUserName);
                $("#userMobile").val(window.localStorage.userName);
            }
        },
        validate: function () {
            // 商户登录验证
            this.$companyForm.validate({
                // 验证规则
                rules: {
                    userMobile: {
                        required: true,
                        isLoginNameOrPhone: true
                    },
                    userPassword: {
                        required: true,
                        minlength: 6
                    },
                    captcha: {
                        required: true,
                        minlength: 5,
                        maxlength: 5
                    },
                    phoneCode: {
                        required: true,
                        minlength: 6
                    }
                },
                // 设置错误信息
                messages: {
                    userMobile: {
                        required: "请输入正确的用户名/手机号码",
                        isLoginNameOrPhone: "请输入正确的用户名/手机号码"
                    },
                    userPassword: {
                        required: '请输入登录密码',
                        minlength: '请输入正确的密码',
                    },
                    captcha: {
                        required: "请输入验证码",
                        minlength: "请输入5位验证码",
                        maxlength: "验证码错误"
                    },phoneCode:{
                    	 required: "请输入手机验证码",
                         minlength: "请输入6位验证码",
                         maxlength: "手机验证码错误"
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                	var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-error").show();
                    if($id=='captcha')$icontip.addClass("inputtip-code");
                },
                // 验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-right").show();
                    if($id=='captcha')$icontip.addClass("inputtip-code");
                },
                invalidHandler: function (form, validator) { // 错误提示
                    $.each(validator.errorList, function (key, value) {
                        $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+value.message+'</span>');
                        return false;
                    });
                },
                submitHandler: function (form) {
                    // 验证通过提交表单
                    var _input = $("#userPassword");
                    var pwd = $.trim(_input.val());
                    var modulus = $('#modulus').val();
                    var exponent = $('#exponent').val();
                    setMaxDigits(130);
                    var key = new RSAKeyPair(exponent, "", modulus);
                    var result = encryptedString(key, pwd);
                    $("#userName").val(encodeURIComponent($("#userMobile").val()));
                    if (result) {
                        _input.val(result);
                    }
                    if(window.localStorage){
                        if($("#saveUserName").is(":checked")){
                            window.localStorage.userName=$('#userMobile').val();
                            window.localStorage.isSaveUserName=true;
                        }else{
                            window.localStorage.userName='';
                            window.localStorage.isSaveUserName=false;
                        }
                    }
                    $(form)[0].submit();
                }
            });
        },
    }
    new Login().init();
}();

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
var submitFlag=true;
//3.1 发送短信验证
function sendPhoneCode(){
	if (!chkUserPhone&&!checkUserPhone()) {
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
          url: basePath + '/secure/loan/login/verify-codevoice',
          data: {phone: $("#userMobile").val(),
	            	csessionid:$("#csessionid").val(),
	            	sig:$("#sig").val(),
	            	token:$("#token").val(),
	            	scene:$("#scene").val(),
	            	userType:'5'
          		},
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
                      $("#infotip").html('验证码已发送到您的手机，15分钟内输入有效，请勿泄露');
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
                  	$("#infotip").html('验证码已发送到您的手机，15分钟内输入有效，请勿泄露');
                  }
              } else {
              	$("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+data.msg+'</span>');
              }
          }
      });
  }
}

//2.1 手机号
function checkUserPhone(){
	chkUserPhone=false;
	var icontip=$(".icontip[for='userMobile']");
	var p = $("#formtip1");
	var th=$("#userMobile");
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
        chkUserPhone=true;
        return true;
       /* $.ajax({
            type: "post",
            dataType: "html",
            url: basePath + '/secure/loan/login/check-account',
            async: false,
            data: {"account": v,userType:'5'},
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
        });*/
    } else {
    	th.addClass("Validform_error");
    	p.html('<span class="errortip"><i class="icon-font icon-error"></i>请填写正确的手机号</span>');
        icontip.attr("class","icontip icon-font icon-error").show();
        return false;
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
