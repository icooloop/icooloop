/**
 * Created by Lidy on 2018/8/20.
 */
+function () {
    var LoanApply = function () {// 构造函数
        this.$loanform = $("#loanform");
    }
    LoanApply.prototype = {
        init: function () {
            this.validate();
        },
        validate: function () {
            // 商户登录验证
            this.$loanform.validate({
                // 验证规则
                rules: {
                    amount: {
                        required: true,
                        digits:true,
                        min:5000,
                        max:200000
                    },
                    term: {
                        required: true
                    }
                },
                // 设置错误信息
                messages: {
                    amount: {
                        required: "请填写借款金额",
                        digits:"借款金额只能输入整数",
                        min:"借款金额最小额度为5000",
                        max:"借款金额最大额度为200000"
                    },
                    term: {
                        required: "请选择借款期限"
                    }
                },
                // 错误信息显示
                errorPlacement: function (error, element) {
                	var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-error").show();
                    if($id=='captcha')$icontip.addClass("inputtip-code");
                },
                // 验证成功
                success: function (error, element) {
                    var $element = $(element);
                    var $id=$element.attr('id');
                    var $icontip=$('.icontip[for="'+$id+'"]');
                    $icontip.attr("class","icontip icon-font icon-right").show();
                },
                invalidHandler: function (form, validator) { // 错误提示
                    $.each(validator.errorList, function (key, value) {
                        $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+value.message+'</span>');
                        return false;
                    });
                },
                submitHandler: function (form) {
                    $("#formtip1").html('');
                    $.ajax({
                        type: "post",
                        url: basePath +"/loan/apply/two-submit",
                        async:false,
                        data: $(form).serialize(),
                        success: function (data) {
                        	var result = $.parseJSON(data);
                        	if (result.success) {
                        		window.location.href=basePath+"/loan/apply/success";
	           	             } else {
	           	            	 $("#formtip1").html('<span class="errortip"><i class="icon-font icon-error"></i>'+result.msg+'</span>');
	           	             }
                        }
                    });
                }
            });
        },
    }
    new LoanApply().init(); 
    initLoanPeron();
}();
function changeTerm(){
	var _val=$("#loanPeriod").val();
	if(_val=="3"){
		$("#rate").val('15%');
	}else if(_val=="6"){
		$("#rate").val('16%');
	}else if(_val=="12"){
		$("#rate").val('17%');
	}
}
function initLoanPeron(){
	var loanPeriodHi = $("#loanPeriodHi").val();
	if(loanPeriodHi==''|| loanPeriodHi==undefined){
		 $("#loanPeriod").find("option[value='6']").attr("selected",true);
		 return ;
	}
	if(loanPeriodHi=='3'){
		 $("#loanPeriod").find("option[value='3']").attr("selected",true);
	}else if(loanPeriodHi=='6'){
		 $("#loanPeriod").find("option[value='6']").attr("selected",true);
	}else if(loanPeriodHi=='12'){
		 $("#loanPeriod").find("option[value='12']").attr("selected",true);
	}
}
