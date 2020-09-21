/**
 * Created by lidy on 2017/11/4.
 */
+function () {
    var Register = function () {//构造函数
        this.$companyForm = $("#companyForm");
        this.$personForm = $("#personForm")
        this.$getMobileCode = $("#getMobileCode");
        this.$getPersonVerifyCode = $("#getPersonVerifyCode");
        this.$getVerifyCode = $("#getVerifyCode");
        this.validatePersonForm = null;//验证方法
        this.validateCompanyForm = null;
    }
    Register.prototype = {
        init: function () {
            this.validate();//表单验证
            this.initEvent();//绑定事件
            this.initSp();
        },
        initSp:function(){
            var url = window.location.href;
        	 if (url.indexOf("?") != -1) {   
                 var str = url.substr(url.indexOf("?")+1);   
                 var strs = str.split("&");   
                 var param = "";
                 for(var i = 0; i < strs.length; i ++) {   
                	 var paramMap =strs[i].split("=");
                	 var key = paramMap[0];
                	 var value = paramMap[1];
                	 if(key!="code"){
                		 param += key+"="+value+"&" ;
                	 }
                 }   
                 if(param!=''&& param.lastIndexOf("&")==param.length-1){
                	 param= param.substring(0,param.length-1)
                 }
                 $("#userSpread").val(param);
              }   
        },
        initEvent: function () {
            var self = this;
            $('input').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
            //企业发送验证码
            this.$getVerifyCode.on('click', function () {
                if (self.validateCompanyForm.element($("#userMobile"))&&self.validateCompanyForm.element($("#captcha"))) {
                    var $countDown = $(this).data('CountDown');
                    if ($countDown) {
                        $countDown.defs.data.phone = $('#userMobile').val();
                    }
                    $(this).CountDown({
                        data: {
                        	phone: $('#userMobile').val(),
                        	captcha: $('#captcha').val()
                        },
                        isMsg: true,
                        isCallBack: 'msg',//回调信息字段
                        start: true,
                        isSeed: true,
                        isClick: false,
                        onSeedFail: function () {
                        	$('#captchaImg').click();
                        },
                        url: basePath + '/secure/register/verify-code',
                    });
                }
            });
            //个人发送验证码
            this.$getPersonVerifyCode.on('click', function () {
                if (self.validatePersonForm.element($("#personMobile"))&&self.validatePersonForm.element($("#personCaptcha"))) {
                    var $countDown = $(this).data('CountDown');
                    if ($countDown) {
                        $countDown.defs.data.phone = $('#personMobile').val();
                    }
                    $(this).CountDown({
                        data: {
                            phone: $('#personMobile').val(),
                            captcha: $('#personCaptcha').val()
                        },
                        isMsg: true,
                        isCallBack: 'msg',//回调信息字段
                        start: true,
                        isSeed: true,
                        isClick: false,
                        onSeedFail: function () {
                        	$('#personCaptchaImg').click();
                        },
                        url: basePath + '/secure/register/verify-code',
                    });
                }
            });
            $("#userTabBtn").on('click',function(){//切换验证码
            	$("#userMobileCodeGroup").find('img').click();
                $("#userMobileCodeGroup").show();
            })
            $("#personTabBtn").on('click',function(){
            	$("#personMobileCodeGroup").find('img').click();
            })
        },
        validate: function () {
            var self = this;
            //商户注册验证
            this.validateCompanyForm = this.$companyForm.validate({
                // 验证规则
                rules: {
                    companyName: {
                        required: true,
                        minlength: 2,
                        maxlength: 50
                    },
                    userMobile: {
                        required: true,
                        isMobile: true,
                        remote: {
                            type: "POST",
                            dataType: "json",
                            url: basePath + '/secure/register/check-account',
                            data: {
                            	account: function () {
                                    return $("#userMobile").val();
                                }
                            }
                        }
                    },
                    userPassword: {
                        required: true,
                        isPwd: true,
                        minlength: 6
                    },
                    verifyCode: {
                        required: true,
                        isNumber:true,
                        minlength: 6,
                        maxlength: 6
                    },
                    captcha:{
	                   	 required: true,
	                     minlength: 5,
	                     maxlength: 5
                   },
                   agreement:{
                   	required: true
                   }
                },
                // 设置错误信息
                messages: {
                    companyName: {
                        required: "请输入企业名称",
                        minlength: '请输入正确的企业名称',
                        maxlength: '请输入正确的企业名称'
                    },
                    userMobile: {
                        required: "请输入手机号",
                        isMobile: "请输入正确的手机号码",
                        remote:"手机号已被注册,请重新输入"
                    },
                    userPassword: {
                        required: '请输入登录密码',
                        isPwd: '6-20位字母、数字或字符中任意两种组合',
                        minlength: '请输入正确的密码',
                    },
                    verifyCode: {
                        required: "请输入手机验证码",
                        isNumber:"请输入正确的手机验证码",
                        minlength: "请输入6位手机验证码",
                        maxlength: "手机验证码错误"
                    },
                    captcha:{
                    	 required: "请输入图形验证码",
                         minlength: "请输入5位图形验证码",
                         maxlength: "图形验证码错误"	
                    },
                    agreement: {
                        required: '必须同意注册协议'
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                    self.errorHint(error, element);
                },
                //验证成功
                success: function (error, element) {
                    self.successHint(error, element);
                },
                submitHandler: function (form) { //验证通过提交表单
                    self.onSubmit(form);
                }
            });
            //个人注册验证
            this.validatePersonForm = this.$personForm.validate({
        		keyup:false,
                // 验证规则
                rules: {
                    personMobile: {
                        required: true,
                        isMobile: true,
                        remote: {
                            type: "POST",
                            dataType: "json",
                            url: basePath + '/secure/register/check-account',
                            data: {
                            	account: function () {
                                    return $("#personMobile").val();
                                }
                            }
                        }
                    },
//                    userLoginName: {
//                        required: true,
//                        isLoginName:true,
//                        remote: {
//                            type: "POST",
//                            dataType: "json",
//                            url: basePath + '/secure/register/check-account',
//                            data: {
//                            	account: function () {
//                                    return $("#userLoginName").val();
//                                }
//                            }
//                        }
//                    },                    
                    personPassword: {
                        required: true,
                        isPwd: true,
                        minlength: 6,
                        maxlength:20
                    },
                    personVerifyCode: {
                        required: true,
                        isNumber:true,
                        minlength: 6,
                        maxlength: 6
                    },
                    inviteCode: {
                        remote: {
                            type: "POST",
                            dataType: "json",
                            url: basePath + '/secure/register/check-code',
                            data: {
                                code: function () {
                                    return $("#inviteCode").val();
                                }
                            }
                        }
                    },
                    personCaptcha:{
                        required: true,
                        minlength: 5,
                        maxlength: 5
                    },
                    personAgreement:{
                    	required: true
                    }
                },
                // 设置错误信息
                messages: {
                    personMobile: {
                        required: "请输入手机号",
                        isMobile: "请输入正确的手机号码",
                        remote:"手机号已被注册,请重新输入"
                    },
//                    userLoginName: {
//                        required: "请输入用户名",
//                        isLoginName:"请输入6-18个字符字母开头的用户名",
//                        remote: "用户名已被注册,请重新输入"
//                    },                        
                    personPassword: {
                        required: '请输入登录密码',
                        isPwd: '6-20位字母、数字或字符中任意两种组合',
                        minlength: '6-20位字母、数字或字符中任意两种组合',
                        maxlength: '6-20位字母、数字或字符中任意两种组合'
                    },
                    personVerifyCode: {
                    	required: "请输入手机验证码",
                    	isNumber:"请输入正确的手机验证码",
                        minlength: "请输入6位手机验证码",
                        maxlength: "手机验证码错误"
                    },
                    inviteCode: {
                        remote: '邀请码不存在，请核对或暂不填写邀请码'
                    },
                    personAgreement: {
                        required: '必须同意注册协议'
                    },
                    personCaptcha:{
                    	 required: "请输入图形验证码",
                         isNumber: "请输入正确的图形验证码",
                         minlength: "请输入5位图形验证码",
                         maxlength: "图形验证码错误"
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                    self.errorHint(error, element);
                },
                //验证成功
                success: function (error, element) {
                    self.successHint(error, element);
                },
                submitHandler: function (form) { //验证通过提交表单
                    self.onSubmit(form);
                }
            });
        },
        errorHint: function (error, element) {
            var $element = $(element);
            var $parent = $element.parent();
            var $errorIcon = $.validator.setValidateIcon($parent);
            $errorIcon.addClass('icon-error').removeClass('icon-right');
            $parent.addClass('has-error has-feedback').removeClass('has-success');
            var $msg = $parent.parent().parent().next();
            if (!$msg.is('div.msg')) {//如果没有提示过错误信息元素新建一个div
                $msg = $parent.parent().parent().after('<div class="form-group text-danger msg" style="display: none"><div class="col-sm-12"><i class="icon-font icon-error"></i><span class="vertical-middle"></span></div></div>')
            }
            var $group = $parent.parent().parent().next()
            $group.find('span').text(error.text());
            $group.show();//显示错误信息
        },
        successHint: function (error, element) {
            var $element = $(element);
            var $parent = $element.parent();
            var $errorIcon = $.validator.setValidateIcon($parent);
            $errorIcon.addClass('icon-right').removeClass('icon-error');
            $parent.removeClass('has-error').addClass('has-success has-feedback');
            var $msg = $parent.parent().parent().next();
            if ($msg.is('div.msg')) {//隐藏错误信息
                $msg.hide();
            }
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
        }
    }
    new Register().init();
}();