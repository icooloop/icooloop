/**
 * Created by lidy on 2017/12/12.
 */
+function () {
    var NewhardRegister = function () {// 构造函数
        this.$regModal = $("#regModal");
        this.$modalForm = $("#modalForm")
        this.$getModalVerifyCode = $("#getModalVerifyCode");
        this.validateModalForm = null;//验证方法
    }
    NewhardRegister.prototype = {
        init: function () {
            this.initEvent();
            this.validate();//表单验证
        },
        initEvent: function () {
            var self=this;
            $("#regBtn").on('click',function(){
                self.goToTop();
            })
            $("#productList").on('click','a',function(){
                self.goToTop();
            })
            //个人发送验证码
            this.$getModalVerifyCode.on('click', function () {
                if (self.validateModalForm.element($("#modalMobile"))&&self.validateModalForm.element($("#modalCaptcha"))) {
                    var $countDown = $(this).data('CountDown');
                    if ($countDown) {
                        $countDown.defs.data.phone = $('#modalMobile').val();
                    }
                    $(this).CountDown({
                        data: {
                            phone: $('#modalMobile').val(),
                            captcha: $('#modalCaptcha').val()
                        },
                        isMsg: true,
                        isCallBack: 'msg',//回调信息字段
                        start: true,
                        isSeed: true,
                        isClick: false,
                        onSeedFail: function () {
                            $('#modalCaptchaImg').click();
                        },
                        url: basePath + '/secure/register/verify-code',
                    });
                }
            });
        },
        validate: function () {
            var self = this;
            //个人注册验证
            this.validateModalForm = this.$modalForm.validate({
                keyup:false,
                // 验证规则
                rules: {
                    modalLoginName: {
                        required: true,
                        isLoginName:true,
                        remote: {
                            type: "POST",
                            dataType: "json",
                            url: basePath + '/secure/register/check-account',
                            data: {
                                account: function () {
                                    return $("#modalLoginName").val();
                                }
                            }
                        }
                    },
                    modalMobile: {
                        required: true,
                        isMobile: true,
                        remote: {
                            type: "POST",
                            dataType: "json",
                            url: basePath + '/secure/register/check-account',
                            data: {
                                account: function () {
                                    return $("#modalMobile").val();
                                }
                            }
                        }
                    },
                    modalPassword: {
                        required: true,
                        isPwd: true,
                        minlength: 6
                    },
                    modalVerifyCode: {
                        required: true,
                        isNumber:true,
                        minlength: 6,
                        maxlength: 6
                    },
                    modalCaptcha:{
                        required: true,
                        minlength: 5,
                        maxlength: 5
                    },
                    modalAgreement: {
                        required: true
                    },
                },
                // 设置错误信息
                messages: {
                    modalLoginName: {
                        required: "请输入用户名",
                        isLoginName:"请输入6-18个字符字母开头的用户名",
                        remote: "用户名已被注册,请重新输入"
                    },
                    modalMobile: {
                        required: "请输入手机号",
                        isMobile: "请输入正确的手机号码",
                        remote:"手机号已被注册,请重新输入"
                    },
                    modalPassword: {
                        required: '请输入登录密码',
                        isPwd: '6-20位字母、数字或字符中任意两种组合',
                        minlength: '请输入正确的密码',
                    },
                    modalVerifyCode: {
                        required: "请输入手机验证码",
                        isNumber:"请输入正确的手机验证码",
                        minlength: "请输入6位手机验证码",
                        maxlength: "手机验证码错误"
                    },
                    modalAgreement: {
                        required: '必须同意注册协议'
                    },
                    modalCaptcha:{
                        required: "请输入图形验证码",
                        isNumber: "请输入正确的图形验证码",
                        minlength: "请输入5位图形验证码",
                        maxlength: "图形验证码错误"
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
                submitHandler: function (form) { //验证通过提交表单
                    self.onSubmit(form);
                }
            });
        },
        onSubmit: function (form) {
            $("#submit").addClass("disabled").attr("disabled", true);
            $.ajax({
                type : "post",
                dataType : "json",
                url : basePath + '/secure/register/ajax',
                data : $(form).serialize(),
                success : function(data) {
                    var result = $.parseJSON(data);
                    if (result.success) {
                    	  window.location.href=basePath+"/member/secure/register/success";
                    } else {
                        layer.msg(result.msg);
                    }
                    $("#submit").addClass("disabled").attr("disabled", false);
                }
            });
        },
        goToTop:function(){
            document.documentElement.scrollTop=0;
            document.body.scrollTop=0;
        }
    }
    new NewhardRegister().init();
}();