/**
 * Created by lidy on 2017/11/4.
 */
$(function () {
	jQuery.Huifocusblur = function(obj) {
        $(obj).focus(function() {
            $(this).addClass("focus").removeClass("inputError");
        });
        $(obj).blur(function() {
            $(this).removeClass("focus");
        });
    };
    JPlaceHolder.init();
    $.Huifocusblur(".input-text,.textarea");
    //提交反馈
    var feedBack = false;
    var mobileReg = /^(13|14|15|18|17)[0-9]{9}$/;
    $("#submitFeedBack").click(function () {
        if (feedBack) {
            return false;
        }
        var msg = $("#feedMsg").val();
        if (msg == null || msg == "") {
            layerTips("请输入反馈内容！", "#feedMsg");
            return false;
        }
        if (msg.length > 160) {
            layerTips("反馈内容限160字符！", "#feedMsg");
            return false;
        }
        var feedPhone = $("#feedPhone").val();

        if (feedPhone == null || feedPhone == '' || !mobileReg.test(feedPhone)) {
            layerTips("请填写正确的手机号！", "#feedPhone");
            return false;
        }
        feedBack = true;
        $.post("/help/feedBack", {phone: feedPhone, msg: msg}, function (data) {
            var result = $.parseJSON(data)
            feedBack = false;
            if (result == null) {
                return;
            }
            if (result.code == "0") {
                layer.closeAll();
                layer.msg('感谢您的反馈！');
                return;
            } else {
                layerTips(result.msg, result.code == 1 ? "#feedPhone" : "#feedMsg");
                return;
            }
        })
    })
    function layerTips(msg, doc) {
        layer.tips(msg, doc, {tips: [2, '#FF8C2F']});
    }
    //app下载
	$("#appClick,.appClick").click(function(){
		$("#pop").show();
	})
	//关闭
	$("#popClose").click(function(){
		$("#pop").hide();
	})
	/*1.3 返回顶部*/
	if(!$("#top")[0]){ //添加返回顶部按钮
        $("#top").show();
    }
    var $backToTopEle=$("#top");
    $backToTopEle.hide();
    $backToTopEle.click(function(){
        $("html, body").animate({ scrollTop: 0 },200);
    });
    var $backToTopFun = function() {
         ($(document).scrollTop() >300)? $backToTopEle.show(): $backToTopEle.hide();
    };
    $(window).scroll(function () {
    	$backToTopFun();
	});
    $(window).bind("scroll", $backToTopFun);
    $backToTopFun();
    //newInvest dot
    var newInvest=getCookie('newInvest');
    (newInvest=='newInvest2018')?$("#nav_invest .dot-new").hide():$("#nav_invest .dot-new").show();
    $("#nav_invest").on("click",function(){
    	setCookie('newInvest', 'newInvest2018', 999);
    })
});

var common = {
    contactCustomer: function () {
            window.open("https://jq.qq.com/?_wv=1027&k=5beGtO3");
    },
    feedbackMessage: function () {
        layer.open({
            type: 1,
            area: ['330px', '260px'], //宽高
            title: false,
            shadeClose: true,
            skin: 'layui-layer-rim',
            closeBtn: false,
            shadeClose: true,
            content: $("#layeryijian")
        });
    },
    getFixDate:function(date){
    	var day=new Date(date);
    	var currentMonth=day.getMonth()+1;
		currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
		var currentDate=day.getDate();
		currentDate=currentDate<10?"0"+currentDate:currentDate;
		return day.getFullYear()+'-'+currentMonth+'-'+currentDate;
    }
}
/*1.4 让ie支持placeholder*/
var JPlaceHolder = {
    _check : function(){  //检测
        return 'placeholder' in document.createElement('input');
    },
    init : function(){   //初始化
        if(!this._check()){
            this.fix();
        }
    },
    fix : function(){    //修复
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder'),val=self.val();
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left'),paddingtop= self.css('padding-top');
            var holder = $('<div></div>').text(txt).css({position:'absolute', left:pos.left, top:"-4px", height:h, lienHeight:h, paddingLeft:paddingleft,paddingTop:paddingtop,color:'#b3b3b3'}).appendTo(self.parent());
            if(self.val()){
                holder.hide();
            }
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};



//设置cookie
function setCookie(cname, cvalue, exdays) {
    var path = arguments.length <= 3 || arguments[3] === undefined ? '/' : arguments[3];

    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    var path = '; path=' + path;
    document.cookie = cname + "=" + cvalue + "; " + expires + path;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}

var formatDate = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
};

var formatBJDate = function(time, format){
	var date=(time instanceof Date)?time.getTime():time;
	var GMT=8;
    var d = new Date();
    d.setTime(date + (GMT * 60) * 60 * 1000); 
    var  o = {
            'yyyy':d.getUTCFullYear(),
            'MM':d.getUTCMonth() + 1,
            'mm':d.getUTCMinutes(),
            'dd':d.getUTCDate(),
            'HH':d.getUTCHours(),
            'ss':d.getUTCSeconds()
        };
    if (/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getUTCFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
        }
    }
    return format;
};

function formatCurrency(num,flag) {
    var argNum = arguments.length;
    flag = argNum >= 2 ? flag : true;
    if (num == null) {
        return flag?"0.00元":"0元";
    }
    if (num == "--") {
        return flag?"0.00元":"0元";
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ','
                + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num+(flag?( '.' + cents):''));
}

/**
 * 格式化日期
 *
 * @param {}
 *            date
 * @param {}
 *            mart
 * @return {}
 */
function formartDate(date, mart) {
    if (date == "--") {
        return date;
    } else {
        return dateStr(new Date(date), mart);
    }
}

/**
 * 日期转换成字符串
 *
 * @param {}
 *            x
 * @param {}
 *            y
 * @return {}
 */
function dateStr(x, y) {
    var z = {
        M : x.getMonth() + 1,
        d : x.getDate(),
        h : x.getHours(),
        m : x.getMinutes(),
        s : x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
                        .slice(-2)
            });
    return y.replace(/(y+)/g, function(v) {
                return x.getFullYear().toString().slice(-v.length)
            });
}

function layerLogin(){
	layer.open({
		type:2,
		title:false,
		closeBtn:true,
		shadeClose: true,
		area: ['440px', '445px'],
		content:basePath+"/layer/login?url="
	});
}
function layerIdentify(){
	layer.open({
		type:2,
		title:false,
		closeBtn:true,
		shadeClose: true,
		area: ['530px', '580px'],
		content:basePath+"/layer/identify"
	});
}
function layerDeposit(){
	$(function(){
		layer.open({
			type:2,
			title:false,
			closeBtn:false,
			shadeClose: true,
			area: ['610px', '450px'],
			content:basePath+"/layer/deposit"
		});
	})
}
//模拟下拉框
$(".u-select").each(function(){
    var _select=$(this);
    var _selecthide=_select.find("input.selecthide");
    var _xzcontent=_select.find(".xzcontent");
    var _menu=_select.find(".dropdown-menu");
    var _list=_menu.find("li");
    var _liston=_list.eq(0);
    var swidth=_select.data('width');
    var sheight=_select.data('height');
    if(!isNaN(swidth)){
    	_select.width(parseInt(swidth)-30);
    	_menu.css('min-width',swidth+'px');
    }
    if(!isNaN(sheight)){
    	_select.css({'line-height':sheight+'px','height':sheight+'px'});
    }
    $.each(_list,function(i){
    	var _val=_list.eq(i);
    	if(_val.hasClass("selected")){
    		_liston=_val;
    	}
    });
    _selecthide.val(_liston.attr("val")).change();
    _xzcontent.text(_liston.text());
    _select.on("click",function(){
        var _menuhidden=_menu.is(":hidden");
        _menuhidden?_menu.css("display","block"):_menu.css("display","none");
        _list.on("click",function(){
            var _click=$(this);
            _selecthide.val(_click.attr("val")).change();
            //_click.addClass("on").siblings().removeClass("on");
            _xzcontent.text(_click.text());
        })
    })
    $(document).click(function(){
        _menu.css("display","none");
    });
    _select.click(function(event){
        event.stopPropagation();
    });
})
$.fn.arctic_scroll = function (options) {
    var defaults = {elem: $(this),speed: 500},
    allOptions = $.extend(defaults, options);
    allOptions.elem.click(function (event) {
        event.preventDefault();
        var $this = $(this),
            $htmlBody = $('html, body'),
            offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
            position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
            toMove;
        if (offset) {
            toMove = parseInt(offset);
            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
        } else if (position) {
            toMove = parseInt(position);
            $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
        } else {
            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
        }
    });
};