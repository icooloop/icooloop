/**
 * Created by lidy on 2018/5/2.
 */
+function () {
    var BondTransferDetail = function () {//构造函数

    }
    BondTransferDetail.prototype = {
        init: function () {
            this.initEvent();//绑定事件
        },
        initEvent: function () {
            var self = this;
            $('#agreementBtn').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox',
                radioClass: 'iradio'
            });
            $("#agreementBtn").on('ifChanged',function(){
                if($(this).is(':checked')){
                    $("#confirmBtn").removeClass('disabled').attr('disabled',false);
                }else{
                    $("#confirmBtn").addClass('disabled').attr('disabled',true);
                }
            })
            $("#confirmBtn").on('click',function(){
                if($("#agreementBtn").is(":checked")){
                	  layer.confirm('您确定要申请转让该笔债权吗？',{btn:['确认','取消'],closeBtn:false,title:false},function(){
                		  $.ajax({
                              url: basePath + '/member/transfer/applyConfirm',
                              type: 'post',
                              dataType: 'json',
                              data: {'discountScale': 0,'debtId':$('#debtId').val()},//折价比例discountScale还没有设置----------------------------------------------
                              cache: false,
                              async: false,
                              success: function (data) {
                              	var result = eval("("+data+")");
      							if (result.success!=undefined&&!result.success) {
      								layer.msg(result.msg); 
      							}else{
      								layer.msg(result.msg,{},function(){
      									location.href=basePath+'/spa/member/invest/holdlist';
      								})
      							}
                              }
                      	});
                	  });
                }
            })
        }
    }
    new BondTransferDetail().init();
}();