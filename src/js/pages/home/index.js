/**
 * Created by lidy on 2018/4/3.
 */
$(function(){
	  $(".productList").children('li').click(function (event) {//项目列表点击
		  if($(this).hasClass("empty")){
			  return;
		  }
	    	if(event.target.tagName!=="A"){
	    		var url = $(this).find('.product-link').data('href');
	            window.open(basePath+url, '_blank');
	    	}
	    })
	$("#closeBottomTips").on('click',function(){
		$('#bottomTips').fadeOut();
	})
})