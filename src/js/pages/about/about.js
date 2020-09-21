var aboutmenusH;
$(function(){
	aboutmenusH=$("#aboutmenus").height();
	$("#aboutMenu2 .arctic_scroll").attr("data-offset","-"+aboutmenusH);
    $(".arctic_scroll").arctic_scroll();
	$(window).scroll(function () {
		pageScroll();
	});
	$(window).resize(function() {
		$(".pinned").css('width','100%');
	});
	$(".pinned").pin();
})
function pageScroll() {
    var top = $(document).scrollTop();
    var menu = $("#aboutMenu2");
    var items = $("#content").find(".itemarea");
    var currentId="";
    items.each(function(){
       m=$(this);
       var itemTop=m.offset().top;
       if(top>itemTop-aboutmenusH-60){
           currentId="#"+m.attr("id");
       }
   });
   var currentLink=menu.find(".on");
   if(currentId&&currentLink.attr("href")!=currentId){
      currentLink.removeClass("on");
      menu.find("[href="+currentId+"]").parent("li").addClass("on");
   }
}
