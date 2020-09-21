
   var isTimeout = true;
+function () {
    var Login = function () {// 构造函数
        this.$companyForm = $("#companyForm");
        this.$eyepwd = $("#eyepwd");
    }
    Login.prototype = {
        init: function () {
        	
        	//用户名验证
        	jQuery.validator.addMethod("isLoginNameOrg",function(value,element,params){ 
        	    var checkLogin = /^\S{2,22}$/;
        	    var length = value.length;
        	    var mobile =/^(13|14|15|18|17|16|19)[0-9]{9}$/;
        	    return this.optional(element) || checkLogin.test(value)|| (length == 11 && mobile.test(value));
        	},"请输入正确的用户名/手机号码");
        	
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
                        isLoginNameOrg: true
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
                        isLoginNameOrg: "请输入正确的用户名/手机号码"
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
}();