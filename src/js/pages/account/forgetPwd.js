/**
 * Created by Lidy on 2017/11/7.
 */
var isSubmit = false;
//0-无需验证码校验
+function () {
    var ForgetPwd = function () {//构造函数
        this.$forgetPwdForm = $("#forgetPwdForm");
        this.$getMobileCode = $("#getMobileCode");
        this.validateForm = null;//验证方法
    }
    ForgetPwd.prototype = {
        init: function () {
            this.validate();//表单验证
            this.initEvent();//绑定事件
            this.initSlider();
        },
        initSlider: function(){
        	var self = this;
        	var nc = new noCaptcha();
        	var nc_appkey = 'FFFF0N00000000005F1A';  // 应用标识,不可更改
        	var nc_scene = 'nc_register';  //场景,不可更改
        	var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        	$("#slidercode").val('false');
        	var nc_option = {
        		renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
        		appkey: nc_appkey,
        	    scene: nc_scene,
        		token: nc_token,
        	   
        		callback: function (data) {// 校验成功回调
        			$("#slidercode").val('true');
        			setTimeout(function(){
        				self.checkSlidercode();
        			},200);
        			document.getElementById('csessionid').value = data.csessionid;
        			document.getElementById('sig').value = data.sig;
        			document.getElementById('token').value = nc_token;
        	        document.getElementById('scene').value = nc_scene;
        		}
        	};
        	nc.init(nc_option);
        },
        checkSlidercode: function(){
        	var _input = $("#slidercode");
        	var _val = $.trim(_input.val());
        	if(_val!='true'){
        		  layer.msg('请先成功完成滑块验证');
        		  return false;
        	}
        	layer.closeAll();
        	this.sendPhoneCode();
        	return true;
        },
        initEvent: function () {
            var self = this;
            //发送验证码
            this.$getMobileCode.on('click', function () {
            	if (self.validateForm.element($("#userMobile"))) {
            		var slidercode=$("#slidercode").val();
                	if(slidercode!='true'){
                		self.showSlidercode();
                		return false;
                	}
            		self.sendPhoneCode();
            	}
            });
        },
        sendPhoneCode: function(){
        	this.$getMobileCode.CountDown({
                data: {
                	mobile: $('#userMobile').val(),
                	csessionid:$("#csessionid").val(),
                	sig:$("#sig").val(),
                	token:$("#token").val(),
                	scene:$("#scene").val()
                },
                isMsg: true,
                isCallBack: 'msg',//回调信息字段
                start: true,
                isSeed: true,
                isClick: false,
                successProp:true,
                url: basePath+ '/secure/findPwd/verifyCode'
            });
        },
        showSlidercode: function(){
        	layer.open({
        	  type: 1,
        	  title:false,
        	  closeBtn:false,
        	  area: ['420px', 'auto'], //宽高
        	  content:$("#slidercodeLayer")
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
                  		url : basePath+ '/secure/findPwd/checkVerify',
                  		data : $(form).serialize(),
                  		success : function(data) {
                  				if (data.success) {
                  					 $(form)[0].submit();
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
    new ForgetPwd().init();
}();