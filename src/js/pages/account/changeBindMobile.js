/**
 * Created by lidy on 2018/7/23.
 */
var isSubmit = false;
+function () {
    var ChangeBindMobile = function () {//构造函数
        this.$forgetPwdForm = $("#changeBindMobileForm");
        this.$getMobileCode = $("#getMobileCode");
        this.validateForm = null;//验证方法
    }
    ChangeBindMobile.prototype = {
        init: function () {
            this.validate();//表单验证
            this.initEvent();//绑定事件
        },
        initEvent: function () {
            var self = this;
            //发送验证码
            this.$getMobileCode.on('click', function () {
            	$(this).CountDown({
                    data: {
                    	codeType:"xgsj_code"
                    },
                    isMsg: true,
                    isCallBack: 'msg',//回调信息字段
                    start: true,
                    isSeed: true,
                    isClick: false,
                    successProp:true,
                    url: basePath+ '/verifyCode/default'
                });
            });
        },

        validate: function () {
            //找回密码手机验证
            this.validateForm = this.$forgetPwdForm.validate({
                // 验证规则
                rules: {
                    userMobile: {
                        required: true,
                        isMobile: true
                    },
                    code: {
                        required: true,
                        minlength: 6,
                        maxlength: 6
                    }
                },
                // 设置错误信息
                messages: {
                    userMobile: {
                        required: "请输入手机号",
                        isMobile: "请输入正确的手机号码"
                    },
                    code: {
                        required: "请输入验证码",
                        isNumber: "请输入正确的验证码",
                        minlength: "请输入6位验证码",
                        maxlength: "验证码错误"
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator.setValidateIcon($parent);
                    $errorIcon.addClass('icon-error').removeClass('icon-right');
                    $parent.addClass('has-error has-feedback').removeClass('has-success');
                    $("#errorMsg").html(error).parent().css('visibility', 'visible');//显示错误信息
                },
                //验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $parent = $element.parent();
                    var $errorIcon = $.validator.setValidateIcon($parent);
                    $errorIcon.addClass('icon-right').removeClass('icon-error');
                    $parent.removeClass('has-error').addClass('has-success has-feedback');
                    $("#errorMsg").html('').parent().css('visibility', 'hidden');//隐藏错误信息
                },
                invalidHandler: function (form, validator) { //错误提示
                    var $errorMsg = $("#errorMsg");
                    $errorMsg.hide();
                    setTimeout(function () {
                        $.each(validator.errorList, function (key, value) {
                            $errorMsg.text(value.message).parent().css('visibility', 'visible');
                            return false;
                        });
                        $errorMsg.show();
                    }, 100)
                },
                submitHandler: function (form) { //验证通过提交表单
                    if(isSubmit){
                        return;
                    }
                    isSubmit= true;
                    $.ajax({
                        type : "post",
                        url : basePath+ '/member/secure/phone/check ',
                        data : $(form).serialize(),
                        success : function(data) {
                            if (data.success) {
                                window.location.href=basePath+'/member/secure/phone/next';
                            }else {
                                isSubmit= false;
                                $("#errorMsg").html(data.msg).parent().css('visibility', 'visible');
                            }

                        }
                    });
                }
            });
        },
    }
    new ChangeBindMobile().init();
}();