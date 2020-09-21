/**
 * Created by lidy on 2018/7/12.
 */
var myScroll = null;
window.onload=function(){
    myScroll=new IScroll('#tableLayer',{
        mouseWheel: true,
        checkDOMChanges:true
    });
}
var $scrollTable=$('#processLayer').find(".table-info");
$(function(){
	showTableLayer(1);
})
$("#titleList li").on('click',function(){
    var $self=$(this);
    var index=$self.index();
    $self.addClass('active').siblings().removeClass('active');
    showTableLayer(index+1);
    setTimeout(function(){
        myScroll.scrollTo(0, 0);
        myScroll.refresh();
    },1);
})
function showTableLayer(index){
	$("#tableLayer").children('.scroll').empty().append($scrollTable.eq(index));
    $("#tableLayer").find('.table-info').show();
}