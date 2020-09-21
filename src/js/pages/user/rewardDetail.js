/**
 * Created by lidy on 2017/11/28.
 */
var extractCount = 0;
+function () {
    var UserRewardDetail = function () {//构造函数
        this.totalCount = 101;
        this.pageSize = 10;
        this.firstInit=true;
    }
    UserRewardDetail.prototype = {
        init: function () {
            $("#rewardDetailBtn").on('click', function () {
                layer.open({
                    type:1,
                	content:$("#detailModal"),
                    title:false,
                    area: ['460px', 'auto'],
                })
            })
            this.initRewardRecord();
            
        },
        initRewardRecord:function(){
        	var self=this;
        	var _table=$("#detailModal").find("tbody");
       	 	_table.empty();
       	 	$.ajax({
               url: basePath + '/member/recom/extractRecord',
               type: 'post',
               dataType: 'json',
               data: {pageNo:  $("#extractPageNo").val(), 'pageSize': 8},
               cache: false,
               async: false,
               success: function (data) {
                   var result = $.parseJSON(data);
                   var html = [];
                   if (result.count > 0) {
                       $.each(result.data, function (i, o) {
                   	   var day = new Date(o.awardDate);
                          var currentMonth = day.getMonth() + 1;
                          currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
                          var currentDate = day.getDate();
                          currentDate = currentDate < 10 ? "0" + currentDate : currentDate;
                          var currentDay = day.getFullYear() + '-' + currentMonth + '-' + currentDate;
                           html.push('<tr> <td>' + currentDay + '</td>');
                           html.push('<td>+' + formatCurrency(o.awardMoney) + '</td></tr>')
                       });
                   } else {
                       html.push('<tr><td colspan="2"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
                   }
                   _table.append(html.join(''));
                   extractCount = result.count;
                   if (extractCount > 8) {
                       $('#extractLaypage').show();
                   } else {
                       $('#extractLaypage').hide();
                   }
                   if(self.firstInit){
                	   self.firstInit=false;
                	   self.initPage(extractCount);
                   }
                  
               }
           });
        },
        initPage: function (extractCount) {
        	var slef=this;
            $("#extractLaypage").pagination({
                totalCount: extractCount,
                pageSize:8,
                seriesShowCount :3,
                clickEvent: function (page_index, _this) {
                    $("#extractPageNo").val(page_index + 1);
                    slef.initRewardRecord()
                }
            });
        }
    }
    new UserRewardDetail().init();
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
        url: basePath + '/member/recom/awardRecord',
        type: 'post',
        dataType: 'json',
        data: {pageNo: $('#pageNo').val(), 'pageSize': pageSize, 'status': '1'},
        cache: false,
        async: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var html = [];
            if (result.count > 0) {
                $.each(result.data, function (i, o) {
                    var day = new Date(o.awardDate);
                    var currentMonth = day.getMonth() + 1;
                    currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
                    var currentDate = day.getDate();
                    currentDate = currentDate < 10 ? "0" + currentDate : currentDate;
                    var currentDay = day.getFullYear() + '-' + currentMonth + '-' + currentDate;
                    html.push('<tr> <td>' + currentDay + '</td>');
                    html.push('<td>', (formatCurrency(o.repayInterest) ), '</td>')
                    html.push('<td>+' + formatCurrency(o.awardMoney) + '</td></tr>')
                });
            } else {
                html.push('<tr><td colspan="3"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>');
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
//提取奖金
function extract() {
    $.ajax({
        url: basePath + '/member/recom/extract',
        type: 'post',
        dataType: 'json',
        cache: false,
        success: function (data) {
            var result = $.parseJSON(data);
            if (result.success != undefined && result.success) {
                layer.msg(result.msg);
                setTimeout(function () {
                    window.location.reload();
                }, 2500)

            } else {
                layer.msg(result.msg);
            }
        }
    });
}