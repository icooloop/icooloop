/**
 * Created by Lidy on 2018/8/20.
 */
    var isTimeout = true;
+function () {
    var Login = function () {// 构造函数
        this.$companyForm = $("#companyForm");
    }
    Login.prototype = {
        init: function () {
            this.setUserName();
            this.validate();
            this.changeMenu();
            $('input.icheck').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
        },
        changeMenu:function(){
        	$("#loginform .hd li").each(function(i){
        		var _this=$(this);
        		_this.on('click',function(){
        			_this.addClass("on").siblings().removeClass("on");
        			$("#loginform .bd section").eq(i).show().siblings().hide();
            	});
        	});
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

    scan();
}();

//二维码失效
function invalidQrcode(){
	$("#qrcodeInvalid").show();
	$("#scanBefore").show();
	$("#scanAfter").hide();
}
//二维码刷新
function refreshQrcode(){
	$("#qrcodeImg").attr("src", basePath + '/secure/login/qrcode?'+Math.random());
	$("#qrcodeInvalid").hide();
	scan();
}
//二维码扫描成功
function scanSuccess(){
	$("#scanBefore").hide();
	$("#scanAfter").show();
}


function scan(){
	if(!isTimeout){
		return;
	}
	isTimeout = false;
    $.ajax({
        url: basePath +"/secure/login/scan",
        data: {},
        dataType: "JSON",
        timeout: 35000,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	console.log(textStatus)
        	isTimeout = true;
            if (textStatus == "timeout") { // 请求超时
            	scan(); // 递归调用
                // 其他错误，如网络错误等
                } else { //其他错误每1.5s执行一次扫描
                	setTimeout(scan(),1.5*1000)
                }
            },
        success: function (data, textStatus) {
        	console.log(data)
        	if(data.code == '1'){//扫码登录成功
                window.location.href = basePath +'/spa/member/account/index';
                return;
            }if(data.code == '0'){//已经扫码,继续扫描直至确认登录
            	isTimeout = true;
            	scanSuccess();
            }if(data.code == '-1'){
            	invalidQrcode();
            	isTimeout = true;
           	 	return;
            }else{//登录失败
            	isTimeout = true;
            	setTimeout(scan(),1.5*1000)
            }
        }
    });
	
}