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
            $('input.icheck').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
            var isBank = $("#isBank").val()=='true'?true:false ;
            if(isBank){
            	layer.open({
            		type:2,
            		title:false,
            		closeBtn:false,
            		shadeClose: true,
            		area: ['530px', '660px'],
            		content:basePath+"/layer/bindCardLoan"
            	});
            }
        },
        validate: function () {
            // 商户登录验证
            this.$loanform.validate({
                // 验证规则
                rules: {
                    address: {
                        required: true
                    },
                    income: {
                        required: true
                    },
                    debt: {
                        required: true
                    },
                    credit: {
                        required: true
                    },
                    agreement:{
                        required: true
                    }
                },
                // 设置错误信息
                messages: {
                    address: {
                        required: "请填写详细地址"
                    },
                    income: {
                        required: "请选择年收入"
                    },
                    debt: {
                        required: "请选择负债情况"
                    },
                    credit: {
                        required: "请选择征信逾期情况"
                    },
                    agreement:{
                        required: "请先同意借款承诺信息"
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
                        url: basePath +"/loan/apply/one-submit",
                        data: $(form).serialize(),
                        success: function (data) {
                        	var result = $.parseJSON(data);
                        	if (result.success) {
           	                 	window.location.href=basePath+"/loan/apply/two";
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
}();
