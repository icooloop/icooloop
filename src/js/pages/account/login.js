/**
 * Created by Lidy on 2017/11/1.
 */
+function () {
    var Login = function () {// 构造函数
        this.$companyForm = $("#companyForm");
        this.$personForm = $("#personForm");
    }
    Login.prototype = {
        init: function () {
            this.setUserName();
            this.validate();
            $('input').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
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
                        required: "请输入的用户名/手机号码",
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
                    var $parent = $element.parent();
                    var $errorIcon = $.validator
                        .setValidateIcon($parent);
                    $errorIcon.addClass('icon-error').removeClass(
                        'icon-right');
                    $parent.addClass('has-error has-feedback')
                        .removeClass('has-success');
                },
                // 验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator
                        .setValidateIcon($parent);
                    $errorIcon.addClass('icon-right').removeClass(
                        'icon-error');
                    $parent.removeClass('has-error').addClass(
                        'has-success has-feedback');
                },
                invalidHandler: function (form, validator) { // 错误提示
                    $.each(validator.errorList, function (key, value) {
                        $("#errorMsg").text(value.message).parent()
                            .css('visibility', 'visible');
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
            //个人用户登录验证
            this.$personForm
                .validate({
                    // 验证规则
                    rules: {
                        personMobile: {
                            required: true,
                            isLoginNameOrPhone: true
                        },
                        personPassword: {
                            required: true,
                            minlength: 6
                        },
                        personCaptcha: {
                            required: true,
                            minlength: 5,
                            maxlength: 5
                        }
                    },
                    // 设置错误信息
                    messages: {
                        personMobile: {
                            required: "请输入手机号",
                            isLoginNameOrPhone: "请输入正确的手机号码/用户名"
                        },
                        personPassword: {
                            required: '请输入登录密码',
                            minlength: '请输入正确的密码',
                        },
                        personCaptcha: {
                            required: "请输入验证码",
                            minlength: "请输入5位验证码",
                            maxlength: "验证码错误"
                        }
                    },
                    // 错误信息显示
                    errorPlacement: function (error, element) {
                        var $element = $(element);
                        var $parent = $element.parent();
                        var $errorIcon = $.validator
                            .setValidateIcon($parent);
                        $errorIcon.addClass('icon-error').removeClass(
                            'icon-right');
                        $parent.addClass('has-error has-feedback')
                            .removeClass('has-success');
                    },
                    // 验证成功
                    success: function (error, element) {
                        var $element = $(element);
                        var $parent = $element.parent();
                        var $errorIcon = $.validator
                            .setValidateIcon($parent);
                        $errorIcon.addClass('icon-right').removeClass(
                            'icon-error');
                        $parent.removeClass('has-error').addClass(
                            'has-success has-feedback');
                    },
                    invalidHandler: function (form, validator) { // 错误提示
                        $.each(validator.errorList, function (key, value) {
                            $("#personErrorMsg").text(value.message).parent()
                                .css('visibility', 'visible');
                            return false;
                        });
                    },
                    submitHandler: function (form) {
                        // 验证通过提交表单
                        var _input = $("#personPassword");
                        var pwd = $.trim(_input.val());
                        var modulus = $('#modulus2').val();
                        var exponent = $('#exponent2').val();

                        setMaxDigits(130);
                        var key = new RSAKeyPair(exponent, "", modulus);
                        var result = encryptedString(key, pwd);
//                        var userName = encryptedString(key, $("#userMobile").val());
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