/**
 * Created by lidy on 2018/6/25.
 */
$(function(){
    var activity = function () {//构造函数
        this.exchangeList = $("#exchangeList");
        this.startBtn = $("#startBtn");
        this.registerBtn = $("#registerBtn");
        this.loginBtn = $("#loginBtn");
        this.getCodeBtn = $("#getCodeBtn");
        this.time = 60;
    };
    activity.prototype = {
        init: function () {
            this.initEvent();//绑定事件xxx
        },
        initEvent: function () {

            $(function () {
                $('.hdddClose').click(function(){   //点击“X"关闭按钮，弹出框，遮罩层消失
                    clockBox();
                });
            });


            function clockBox(){
                $('.hddd_reg').css('display',"none");  //遮罩层消失
                $('.hdddInner_reg').fadeOut(200);//白色内容弹框消失
            }

            function SendRegSMS() {
                var mobile = $("#mobileTxt").val();
                if(!mobile || !self.checkMobile(mobile)){
                    layer.msg('请输入正确的手机号码！');
                    return false;
                }

                $.ajax({
                    url: '/api/active/red',
                    data: {
                        mobile: mobile,
                    },
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success != true) {
                            layer.msg(data.message);
                        } else {
                            self.getCodeCountDown();
                        }
                    },
                    error: function () {
                        layer.msg('发送短信异常,请稍后重试！');
                    }
                });
                return false;
            }

            var self = this;
            //兑换红包按钮
            this.startBtn.on('click', function () {
                var mobile = $("#mobileTxt").val();
                var exchangeCode = $("#exchangeCodeTxt").val();
                if (exchangeCode === null || $.trim(exchangeCode).length <1){
                    layer.msg('请输入正确的红包兑换码！');
                    return;
                }
                if (mobile && self.checkMobile(mobile)) {
                    $.ajax({
                        url: '/api/active/red',
                        data: {
                            mobile: mobile,
                            cashCode: exchangeCode
                        },
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {
                                $("#amount").val(data.data.amount);
                                if (data.data === 300) {//已注册
                                    self.exchangeList.children().hide();
                                    self.exchangeList.find('.login-pwd').show();
                                    $('#loginMobileTxt').text(mobile);
                                    $('#showAmount').text(data.data.amount);
                                } else if (data.data === 200){//未注册
                                    $("#noRegisterMobileTxt").val(mobile);
                                    self.exchangeList.children().hide();
                                    self.exchangeList.find('.no-register').show();
                                }else {
                                    layer.msg(data.data.message);
                                }
                            }else {
                                layer.msg(data.message);
                            }
                        }
                    })
                } else {
                    layer.msg('请输入正确的手机号码！');
                }
            });
            //发送注册短信
            this.getCodeBtn.on('click', function () {
                if (self.time === 60) {
                    SendRegSMS();
                }
            });
            //同意注册协议
            $("#agreeCheckbox").on('change', function () {
                //self.registerBtn.prop('disabled', $(this).is(":checked") ? false : true)
            });
            //注册账号
            this.registerBtn.on('click', function () {
                var SMSCodeTxt = $("#SMSCodeTxt").val();
                var registerPwdTxt = $("#registerPwdTxt").val();

                if (registerPwdTxt === null || $.trim(registerPwdTxt).length < 8 || $.trim(registerPwdTxt).length > 20) {
                    layer.msg('请输入正确的登录密码(8-20位数字、字母组合)');
                    return false;
                }

                if (SMSCodeTxt === null || $.trim(SMSCodeTxt).length !==6 ){
                    layer.msg('请输入正确的短信验证码');
                    return false;
                }
                if(!$('#agreeCheckbox').is(":checked")){
                    layer.msg('必须同意注册协议');
                    return false
                }
                if (SMSCodeTxt.length === 6 && registerPwdTxt.length >= 8) {
                    $.ajax({
                        url: '/api/active/red',
                        data: {
                            mobile: $("#mobileTxt").val(),
                            loginPwd: registerPwdTxt,
                            code: SMSCodeTxt,
                            cashCode: $("#cashCode").val()
                        },
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {//注册成功返回获取的红包金额
                                self.exchangeList.children().hide();
                                self.exchangeList.find('.success').show();
                                $('#tipAmount').text(data.data.amount);
                                $('#tipShow').text(data.data.amount);
                                if ($.trim(data.data.backUrl).length>0){
                                    $("#showChildrenCoupon").attr("href",data.data.backUrl);
                                }

                            } else {
                                layer.msg(data.message);
                            }
                        }
                    })
                } else {
                    layer.msg('请输入正确的登录密码和验证码！');
                }
            });
            //输入账号登录密码
            this.loginBtn.on('click',function(){
                var loginPwdTxt=$("#loginPwdTxt").val();
                if(loginPwdTxt.length>6){
                    $.ajax({
                        url: '/api/active/red',
                        data: {
                            mobile: $("#mobileTxt").val(),
                            loginPwd: loginPwdTxt,
                            cashCode: $("#cashCode").val()
                        },
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) { //登录成功返回获取的红包金额
                                self.exchangeList.children().hide();
                                self.exchangeList.find('.success').show();
                                $('#tipAmount').text(data.data.amount);
                                $('#tipShow').text(data.data.amount);
                                if ($.trim(data.data.backUrl).length>0){
                                    $("#showChildrenCoupon").attr("href",data.data.backUrl);
                                }
                            } else {
                                layer.msg(data.message);
                            }
                        }
                    })
                }else {
                    layer.msg('请输入正确的登录密码！')
                }
            });
        },
        checkMobile: function (mobile) {
            return /^(13|14|15|18|17|16|19)[0-9]{9}$/.test(mobile)
        },
        getCodeCountDown: function () {
            var self = this;
            var Tid = setInterval(function () {
                if (self.time > 0) {
                    self.time--;
                    self.countDown(self.time);
                } else {
                    clearInterval(Tid);
                    self.time = 60;
                }
            }, 1000)
        },
        countDown: function (time) {
            var text = time > 0 ? time + '秒后重新发送' : '获取验证码';
            this.getCodeBtn.text(text);
        }
    };
    new activity().init();

});
