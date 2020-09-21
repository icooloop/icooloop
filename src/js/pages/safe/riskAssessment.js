/**
 * Created by lidy on 2017/12/11.
 */
function checkAnswer(){
	var radios1=$("#qlist li");
	var radios2=radios1.find('input:checked');
	if(radios1.length>radios2.length){
		layer.msg('请您先选择完所有题目再确认提交');
		return false;
	}else{
		return true;
	}
};

$(function(){
	var assType = $("#assType").val();
	if(assType=='1' || assType=='2' || assType=='3' || assType=='4'){
		var isValid = $("#isValid").val();
		if(isValid!='0'){
			opendiv();	
		}
	}
    $('input').iCheck({ //checkbox增强
        checkboxClass: 'icheckbox',
        radioClass: 'iradio'
    });
	$("#submitBtn").click(function(){
		if(checkAnswer()){
			//答案Id
			var ansArray = new Array();
			$('input:radio:checked').each(function(){
				ansArray.push(this.value);
			});
			var myparam = ansArray.join(",");
		   	$.ajax({
				cache: false,
		       	type: "POST",
		       	url:basePath+'/member/auth/save-assess',
		       	data:{"ansArray":myparam,"isSkipAssess":0},
		       	async: false,
		       	success: function(data) {
					var dateresult = eval("("+data+")");
					 console.log(dateresult)
		        	 if (dateresult.status!=undefined && dateresult.status=="YES") {
//		        		 $('input:radio').attr('checked',false);
//		        		 $('input:radio').parent("div").removeClass("iradio checked").addClass("iradio");
		        		 window.location.href=basePath +"/member/secure/riskass/success";
//		        		 if(dateresult.msg=="1"){
//		        			 opendiv();
//		        			 $("#assessType").text("保守型");
//		    	    	 	 $("#spandiv").html("您的风险承受能力较低，您关注资产的安全性远超于资产的收益性，低风险、高流动性的项目比较适合您。");
//		        		 }else if(dateresult.msg=="2"){
//		        			 opendiv();
//		        			 $("#assessType").text("稳健型");
//		     	    	 	 $("#spandiv").html("您的风险承受能力适中，出借目的主要为资产的稳步增值，风险较小、收益稳健类的项目比较适合您。");
//		        		 }else if(dateresult.msg=="3"){
//		        			 opendiv();
//		        			 $("#assessType").text("积极型");
//		    	    	 	 $("#spandiv").html("您的风险承受能力较高，您主要关注资产的收益性和增值空间，风险较高、收益较高类的项目更适合您。");
//		        		 }
		        	}else{
		        		 Jmsg(dateresult.msg);
		        	}
		       	}
		   	}); 
		};
	});
});

function opendiv(){
	 layer.open({
         type:1,
         title:false,
         area:['560px','auto'],
         content:$("#riskModal")
     });
}
