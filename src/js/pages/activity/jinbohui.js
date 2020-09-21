/**
 * Created by lidy on 2018/1/18.
 */
var assessStatus = '0';
var statsuStr = "";
//if(assessStatus=='1'){
// Jalert("尊敬的用户：根据您最近风险测评的结果，您不符合我平台部分项目的出借条件，建议您选择与自己风险承受能力相匹配的项目，或重新进行风险测评，感谢您对亿钱贷的支持与信赖。");
//}
var question = [
    {
        title: '亿钱贷由深南金服公司运营，请问深南金服公司地址在哪里？',
        answer: ["A、福建省福州市", 'B、江苏省南通市', 'C、广东省深圳市', 'D、上海市'],
        right: 1
    },
    {
        title: '亿钱贷何时正式上线？',
        answer: ["A、2014年9月15日", 'B、2015年9月15日', 'C、2016年9月15日', 'D、2017年9月15日'],
        right: 3
    },
    {
        title: '亿钱贷隶属于上市公司三元达旗下互金平台，请问三元达在深市的证券代码是多少？',
        answer: ["A、002147", 'B、002417', 'C、002714', 'D、002174'],
        right: 1
    },
    {
        title: '亿钱贷由上市公司三元达控股子公司深南金服运营管理，请问三元达控股深南金服的比例是多少？',
        answer: ["A、51%", 'B、70%', 'C、80%', 'D、100%'],
        right: 3
    },
    {
        title: '2017年10月28日，亿钱贷召开战略发布会，会上周世平董事长与哪家企业签署重大战略合作协议？',
        answer: ["A、神州租车", 'B、神州数码', 'C、神州农服', 'D、神州信息'],
        right: 2
    },
    {
        title: '本届北京国际金融博览会是北京召开的第几届金博会？',
        answer: ["A、第11届", 'B、第12届', 'C、第13届', 'D、第14届'],
        right: 2
    },
    {
        title: '首届北京金博会召开于哪一年？',
        answer: ["A、2005年", 'B、2006年', 'C、2007年', 'D、2008年'],
        right: 0
    }
];
var gifts=[
    '<span>10元</span>红包',
    '<span>30元</span>红包',
    '<span>1%</span>奖励券',
    '<span>1.5%</span>奖励券',
    '<span>2%</span>奖励券'
];

var out = [];
var currentTime = 60;
var nowQues = 0;
var totalQues = 5;
var answerRight = 0;
$(function () {
    $(".r-level").removeClass("R2");//移除之前的评级
    $(".r-level").removeClass("R3");//移除之前的评级
    $(".level-desc").text("");
    $("#spandiv").html("尊敬的用户:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:black'>您还未进行过风险评估</span>，为保障您的合法权益，准确了解您的风险偏好，请于出借前务必进行自我风险评估。");
    $(".r-level").removeClass("R1").addClass("R4");//移除之前的评级，重新评级,R3为服务器返回的评级
    $("#t_1").text("知识竞赛赢大奖");

    // 开始答题
    $("#answerBtn").click(function () {
        nowQues = 0
        out = [];
        var num = 5;
        var clonequestion = [];
        $.extend(clonequestion, question);
        while (out.length < num) {
            var temp = (Math.random() * clonequestion.length) >> 0;
            out.push(clonequestion.splice(temp, 1)[0]);
        }
        var html = "";
        for (var i = 0; i < out.length; i++) {
            html += '<dd><p class="ques">' + out[i].title + '</p>'
            for (var x = 0; x < out[i].answer.length; x++) {
                html += '<p class="aws">' + out[i].answer[x] + '</p>';
            }
            html += '</dd>';
        }
        $("#questions").html(html);
        //$(".qa-area").show();
        $(".questions dd").hide();//
        $(".questions dd").first().show();
        $(".total").text(5);
        $(".n").text(nowQues);
        $(".aws").removeClass("on");
        $("#startBoxer").hide();
        $("#answerListBoxer").show();
    });
    //$("#answerBtn").click();
    // 勾选答题
    $("#questions").on('click', '.aws', function () {
        var _this = $(this);
        $(this).addClass("on").siblings(".aws").removeClass('on');
        $(this).attr("userflag", "1").siblings(".aws").attr("userflag", "0");
        nowQues = $(this).parent().index();
        var title = $(this).parent().find('.ques');
        if ($(this).index() - 1 === out[nowQues].right) {
            answerRight++;
        }
        // 答至最后一题
        if (nowQues == (totalQues - 1)) {
            $(".n").text(nowQues + 1);
            $(".bar").css("width", '100%');

            $("#completeBoxer").find('.act-1').hide();
            $("#completeBoxer").find('.act-2').hide();
            //$(".sle").text("确定提交").addClass("over");
            if (answerRight === 0) {
                $("#completeBoxer").find('.act-1').show();
            } else {
                var $boxer = $("#completeBoxer").find('.act-2');
                $boxer.find('h3').text(answerRight + '题');
                var giftTxex = gifts[answerRight-1];
                $boxer.find('.coupon').html(giftTxex);
                $boxer.show();
            }
            $("#completeBoxer").show();
            $("#answerListBoxer").hide();
            return;
        }
        setTimeout(function () {
            _this.parent("dd").hide(300).next().show();
            $(".bar").css("width", ((nowQues + 1) / totalQues * 100) + '%');
            if (!(_this.hasClass('.on'))) {
                $(".n").text(nowQues + 1);
            }
        }, 300);
    })
    $("#reAnswerBtn").on('click', function () {
        answerRight = 0;
        $("#startBoxer").show();
        $("#answerListBoxer").hide();
        $('#completeBoxer').hide();
    })
      $("#userPassword").on('blur',function(){
    	 var password =$(this).val();
	    password=  password.replace(/\s+/g, "");
    	$(this).val(password);
    })
    $("#getBtn").on('click', function () {
        var mobile = $("#mobile").val();
        if ((/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        	getGift();
        } else {
            layer.msg('请输入正确的领奖手机号码')
        }

    })
    $("#countDownTxt").on('click', function () {
        if (currentTime === 0) {
            sendRegCode();
        }
    })
})
function sendRegCode() {
	var mobile = $("#mobile").val();
    $.ajax({
        url: basePath + '/secure/register/verify-code',
        type: 'post',
        dataType: 'json',
        data: {"phone": mobile},
        cache: false
    }).done(function (data) {
        if (data.success) {
            currentTime = 60;
            countDown();
        } else {
            layer.msg(data.msg);
        }
    });
}

function countDown() {
    // 倒计时
    var Tid = setInterval(function () {
        if (currentTime > 0) {
            currentTime--;
            $('#countDownTxt').text("重新获取(" + currentTime + ")").addClass('am-text-muted').removeClass('am-text-primary');
        } else {
            clearInterval(Tid);
            $('#countDownTxt').text("点击重新获取").addClass('am-text-primary').removeClass('am-text-muted');
        }
    }, 1000)
}


function showRegister(){
    $(".act").hide();
    var mobile = $("#mobile").val();
    $("#mobileTxt").text(mobile);
    $(".act-5").show();
    sendRegCode();//发送验证码
    $('#registerForm').validate({
        onkeyup: false,
        onfocusin: false,
        // 验证规则
        rules: {
            userPassword: {
                required: true,
                isPwd: true,
                minlength: 6
            },
            phoneCode: {
                required: true,
                isNumber: true,
                minlength: 6,
                maxlength: 6
            },
            agreeCheckbox: {
                required: true
            }
        },
        // 设置错误信息
        messages: {
            userPassword: {
                required: '请输入登录密码',
                isPwd: '6-20位字母、数字或字符中任意两种组合',
                minlength: '请输入正确的密码',
            },
            phoneCode: {
                required: "请输入手机验证码",
                isNumber: "请输入正确的手机验证码",
                minlength: "请输入6位手机验证码",
                maxlength: "手机验证码错误"
            },
            agreeCheckbox: {
                required: '必须同意注册协议'
            }
        },
        // 错误信息显示
        errorPlacement: function (error, element) {
            //this.errorHint(error, element);
        },
        // 验证成功
        success: function (error, element) {
            //this.successHint(error, element);
        },
        invalidHandler: function (form, validator) { // 错误提示
            $.each(validator.errorList, function (key, value) {
                layer.msg(value.message)
                return false;
            });
        },
        submitHandler: function (form) {
        	doRegister();
        }
    });
}

//领取成功倒计时
function countDownReload() {
	currentTime = 5;
    // 倒计时
    var Tid2 = setInterval(function() {
        if (currentTime > 0) {
            currentTime--;
            $(".act-3").find(".info").text("感谢您参与活动，"+currentTime+"秒后将自动返回...");
            $(".act-4").find(".info").text("感谢您参与活动，"+currentTime+"秒后将自动返回...");
        } else {
            clearInterval(Tid2);
            window.location.reload();
        }
    }, 1000)
}

function getGift(){
	var mobile = $("#mobile").val();
	$("#getBtn").button('loading');
    $.ajax({
        cache: false,
        type: "POST",
        url: basePath +'/event/jinbohui/submit',
        data: {"loginName": mobile, "count": answerRight},
        success: function (data) {
            $("#getBtn").button('reset');
            if (data.success) {//成功
            	//显示成功div
                $(".act").hide();
                $(".act-3").show();
                var giftTxex = gifts[answerRight-1];
                $("#giftResult").html(giftTxex);
                countDownReload();
            } else {
                if (data.code == '1') {
                    //注册
                	showRegister();
                } else {
                    //领取失败
                    layer.msg(data.msg);
                }
            }
        },
        error: function () {
        	$("#getBtn").button('reset');
            layer.msg('系统繁忙,请稍后再试')
        }
    });	
}

function doRegister(){
	var phoneCode = $("#phoneCode").val();
	var userPassword = $("#userPassword").val();
	var mobile = $("#mobile").val();
	$("#regSubmit").button('loading');
    $.ajax({
        cache: false,
        type: "POST",
        url: basePath + '/secure/register/ajax',
        data: {"phoneCode": phoneCode, "userPassword": userPassword,"userPhone":mobile,"userSpread":"sp=jinbohui"},
        success: function (data) {
        	$("#regSubmit").button('reset');
        	var result = $.parseJSON(data);
            if (result.success) {
            	//注册成功
            	getGift();//调用领取奖励
            } else {
            	layer.msg(result.msg);//失败
            }
        },
        error: function () {
        	$("#regSubmit").button('reset');
            layer.msg('系统繁忙,请稍后再试')
        }
    });
}
