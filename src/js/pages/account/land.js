/**
 * Created by lidy on 2017/11/4.
 */
+function () {
    var Register = function () {//构造函数
        this.$personForm = $("#personForm")
        this.$getPersonVerifyCode = $("#getPersonVerifyCode");
        this.$changePwdType = $("#changePwdType");
        this.validatePersonForm = null;//验证方法
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
            $(".arctic_scroll").arctic_scroll();
            //个人发送验证码
            this.$getPersonVerifyCode.on('click', function () {
            	if(regStart=='0'){
            		window.location.href='/spa/static/reg_notice';
            		return;
            	}
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
                        	if(this.errorMsg=="图形验证码不正确")$('.icontip[for="personCaptcha"]').attr("class","icontip icon-font icon-error inputtip-code").show();
                            $('#personCaptchaImg').click();
                        },
                        url: basePath + '/secure/register/verify-code'
                    });
                }
            });
            this.$changePwdType.on('click', function () {
                var _this = $("#personPassword");
                var _type = _this.attr("type");
                var _change = (_type == "password") ? "text" : "password";
                _this.attr("type", _change);
            });
        },
        validate: function () {
            var self = this;
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
                    var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-error").show();
                    if($id=='personCaptcha'||$id=='personVerifyCode')$icontip.addClass("inputtip-code");
                    if(error.text()){
                        $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+error.text()+'</span>');
                    }else{
                        $("#formtip1").html('');
                    }
                },
                //验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-right").show();
                    if($id=='personCaptcha'||$id=='personVerifyCode')$icontip.addClass("inputtip-code");
                },
                invalidHandler: function (form, validator) { // 错误提示
                    setTimeout(function(){
                       if(validator.errorList.length>0){
                            $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+validator.errorList[0].message+'</span>');
                       }
                    },10);
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
                        if(result.msg=="手机验证码不正确")$('.icontip[for="personVerifyCode"]').attr("class","icontip icon-font icon-error inputtip-code").show();
                        layer.msg(result.msg);
                    }
                    $("#submit").removeClass("disabled").attr("disabled", false);
                }
            });
        }
    }
    new Register().init();
}();