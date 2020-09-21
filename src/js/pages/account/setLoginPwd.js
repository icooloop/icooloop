/**
 * Created by lidy on 2017/11/7.
 */
var isSubmit =false;
+function () {
    var ForgetPwd = function () {//构造函数
        this.$setLoginPwdForm = $("#setLoginPwdForm");
        this.validateForm = null;//验证方法
    }
   
    ForgetPwd.prototype = {
        init: function () {
            this.validate();//表单验证
        },
        validate: function () {
            //找回密码手机验证
            this.validateForm = this.$setLoginPwdForm.validate({
                // 验证规则
                rules: {
                    loginPwd: {
                        required: true,
                        minlength: 6,
                        maxlength: 20,
                        isPwd:true
                    },
                    reLoginPwd: {
                        required: true,
                        minlength: 6,
                        maxlength: 20,
                        equalTo: '#loginPwd',
                        isPwd:true
                    }
                },
                // 设置错误信息
                messages: {
                    loginPwd: {
                        required: '请输入登录密码',
                        minlength: '6-20位字母、数字或字符中任意两种组合',
                        maxlength: '6-20位字母、数字或字符中任意两种组合',
                        isPwd:'6-20位字母、数字或字符中任意两种组合'
                    },
                    reLoginPwd: {
                        required: '请输入登录密码',
                        minlength: '6-20位字母、数字或字符中任意两种组合',
                        maxlength: '6-20位字母、数字或字符中任意两种组合',
                        equalTo: '两次输入的密码必须一致',
                        isPwd:'6-20位字母、数字或字符中任意两种组合'
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
                	isSubmit = true;
                	 $.ajax({
                   		type : "post",
                   		url : basePath+ '/secure/findPwd/submitPwd',
                   		data : $(form).serialize(),
                   		success : function(data) {
                   				if (data.success) {
                   					window.location.href=basePath+"/secure/findPwd/success";
                   				}else {
                   					if(data.code=="0"){
                   						layer.alert(data.msg, {
                   						    btn: ['重新设置'] //按钮
                   						}, function(){
                   						    window.location.href=basePath+"/secure/findPwd";
                   						});
                   						isSubmit=false;
                   					}else{
                   						$("#errorMsg").html(data.msg).parent().css('visibility', 'visible');
                   						isSubmit=false;
                   					}
                   					
                   				}
                   				
                   			}
                 	  });
                }
            });
        },
    }
    new ForgetPwd().init();
}();