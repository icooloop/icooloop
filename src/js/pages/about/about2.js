$(function(){
	$(window).resize(function() {
		$(".pinned").pin();
	});
	setTimeout(function(){
		$(".pinned").pin();
	},100);
})
function toUrl(){
	var url = document.location.toString();
　　var arrUrl = url.split("#");
	if(arrUrl.length>1 && $("#sideMenu li").hasClass(arrUrl[1])){
		showContent(arrUrl[1]);
	}else{
		$("#content .itemhide").eq(0).show();
		$("#sideMenu li").eq(0).addClass('on');
	}
}
function showContent(url){
	$("#sideMenu ."+url).addClass("on").siblings().removeClass("on");
	$("#content .itemhide").hide();
	$("#content .itemhide."+url).show();
	if(url=='info_contact'){
		baidumap();
	}
	window.scrollTo(0,0); 
}
$("#sideMenu li,#aboutMenu .submenu li,.linklist a").on('click',function(){
	setTimeout(function(){
		toUrl();
	},100);
})