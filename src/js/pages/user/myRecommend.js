/**
 * Created by lidy on 2017/11/28.
 */
+function () {
    var UserMyRecommend = function () {//构造函数
        this.totalCount = 101;
        this.pageSize = 10;
    }
    UserMyRecommend.prototype = {
        init: function () {
            this.initPage();//分页
        },
        initPage: function () {
            $("#laypage").pagination({
                totalCount: this.totalCount,
                pageSize: this.pageSize,
                clickEvent: function (page_index, _this) {
                    $("#pageNo").val(page_index + 1);
                }
            });
        }
    }
    new UserMyRecommend().init();
}();




var totalCount = 0;
var pageSize = $.trim($('#pageSize').val());
var fn = null;
//分页
function initPage() {
    $("#laypage").pagination({
        totalCount: totalCount,
        pageSize: pageSize,
        clickEvent: function (page_index, _this) {
            $("#pageNo").val(page_index + 1);
            fn();
        }
    });
}
(function () {
    initData();
    initPage();
})();

//待放款
function initData() {
    var _table = $('#tableContent');
    _table.empty();
    $.ajax({
    	url: basePath + '/member/recom/recommendRecord',
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo').val(), 'pageSize': pageSize},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var html = [];
            if (result.count > 0) {
                $.each(result.data, function (i, o) {
                    var day=new Date(o.createTime);
            		var currentMonth=day.getMonth()+1;
        			currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
        			var currentDate=day.getDate();
        			currentDate=currentDate<10?"0"+currentDate:currentDate;
        			var currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
        			var investStatusStr=o.investStatus==="1"?"已出借":"未出借";
                    html.push('<tr><td>',o.phone,'</td>');
                    html.push('<td>',o.realName,'</td>');
                    html.push('<td>',(investStatusStr),'</td>');
                    html.push('<td>',currentDay,'</td></tr>')
                });
            } else {
                html.push('<tr><td colspan="4"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
            }
            _table.append(html.join(''));
            totalCount = result.count;
            if (totalCount > pageSize) {
                fn = initData;
                $('#laypage').show();
            } else {
                $('#laypage').hide();
            }
        }
    });
}