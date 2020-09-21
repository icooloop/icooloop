/**
 * Created by lidy on 2017/11/4.
 */
jQuery.extend(jQuery.validator.messages, {
    required: "此项必须填写",
    remote: "请修正此栏位",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入正确的数字",
    digits: "只可输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: jQuery.validator.format("最多 {0} 个字"),
    minlength: jQuery.validator.format("最少 {0} 个字"),
    rangelength: jQuery.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),
    range: jQuery.validator.format("请输入 {0} 至 {1} 之间的数值"),
    max: jQuery.validator.format("请输入不大于 {0} 的数值"),
    min: jQuery.validator.format("请输入不小于 {0} 的数值")
});
// 自定义验证
// 手机号码验证
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//用户名验证
jQuery.validator.addMethod("isLoginName",function(value,element,params){
    var checkLogin = /^[a-z]([\w]{5,17})$/;
    return this.optional(element)||(checkLogin.test(value)); 
    },"请输入6-18个字符字母开头的用户名");

//用户名验证
jQuery.validator.addMethod("isLoginNameOrPhone",function(value,element,params){ 
    var checkLogin = /^\S{2,18}$/;
    var length = value.length;
    var mobile =/^(13|14|15|18|17|16|19)[0-9]{9}$/;
    return this.optional(element) || checkLogin.test(value)|| (length == 11 && mobile.test(value));
},"请输入正确的用户名/手机号码");


//密码验证
jQuery.validator.addMethod("isPwd",function(value,element,params){ 
    var checkPwd = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    return this.optional(element)||(checkPwd.test(value)); 
},"请设置6-20位字母+数字的密码");
//正整数
jQuery.validator.addMethod("isNumber",function(value,element,params){ 
	var check = /^[0-9]\d*$/;
	return this.optional(element)||(check.test(value)); 
},"请设置6位数字交易密码");
//交易密码密码验证
jQuery.validator.addMethod("isTraPwd",function(value,element,params){
    if(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/.test(value)){
        return false
    }
    if(value.length<8||value.length>16){
        return false
    }
    var level=1;
    if(/[-\+]?\d+/.test(value)){
        level ++;
    }
    if(/[-\+]?[A-Za-z]+/.test(value)){
        level ++;
    }
    if(/[-\+]?[-_]+/.test(value)){
        level ++;
    }
    return this.optional(element)||level>2;
},"8-16位数字、下划线、英文字母至少2种组合");

jQuery.validator.addMethod("isNumAbc",function(value,element,params){ 
	var checkPwd = /^[A-Za-z0-9]+$/;
	return this.optional(element)||(checkPwd.test(value)); 
},"格式不正确");
jQuery.validator.addMethod("isNum",function(value,element,params){
    var checkPwd = /^[0-9]+$/;
    return this.optional(element)||(checkPwd.test(value));
},"格式不正确");
jQuery.validator.addMethod("noEmpty",function(value,element,params){ 
	var checkPwd = /^[^\s]+$/;
	return this.optional(element)||(checkPwd.test(value)); 
},"格式不正确");
jQuery.validator.addMethod("isZhName",function(value,element,params){ 
	var checkPwd = /^[\u4E00-\u9FA5]{2,7}(?:·[\u4E00-\u9FA5]{2,7})*$/;
	return this.optional(element)||(checkPwd.test(value)); 
},"格式不正确");
//身份证验证
jQuery.validator.addMethod("isID", function (idNo, element) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };

    if (!idNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idNo)) {
        return false;
    }

    if (!city[idNo.substr(0, 2)]) {
        return false;
    }

    //18位身份证需要验证最后一位校验位
    if (idNo.length == 18) {
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
        var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
        var sum = 0, idx;
        for (var i = 0; i < idNo.length - 1; i++) {
            // 对前17位数字与权值乘积求和
            sum += parseInt(idNo.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）
        idx = sum % 11;
        // 检验第18为是否与校验码相等
        return arrValid[idx] == idNo.substr(17, 1).toUpperCase();
    }
    return true;
}, "请正确填写您的身份证号码");
//成功错误交互设置图标方法
jQuery.validator.setValidateIcon = function (element) {
    var $errorIcon = element.children('.form-control-feedback');
    if (!$errorIcon.length) {//如果没有错误的图标元素添加一个
        $errorIcon = element.append('<span class="icon-font form-control-feedback"></span>').children('.form-control-feedback');
    }
    return $errorIcon
}
jQuery.validator.setValidateMsg = function (element) {
    var $errorIcon = element.children('.form-control-feedback');
    if (!$errorIcon.length) {//如果没有错误的图标元素添加一个
        $errorIcon = element.append('<span class="icon-font form-control-feedback"></span>').children('.form-control-feedback');
    }
    return $errorIcon
}