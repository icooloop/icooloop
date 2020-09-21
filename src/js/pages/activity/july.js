/**
 * Created by lidy on 2018/6/28.
 */
+function () {
    var SignActive = function () {//构造函数
        this.currentDay = moment($("#current").val()).toDate().getDate();
    }
    SignActive.prototype = {
        init: function () {
            this.currentTime = new Date();
            this.initEvent();//绑定事件
        },
        initEvent: function () {
            var self = this;
            var eventList = [signList[signList.length - 1]];
            eventList[0].start = eventList.date;
            eventList[0].title = "";
            //日期控件
            $('#calendarList').fullCalendar({
                buttonText: {
                    today: '返回今天',
                    month: '月视图',
                    week: '周视图',
                    day: '日视图'
                },
                allDayText: "全天",
                firstDay: 1,
                monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                dayNamesShort: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                showNonCurrentDates: false,
                titleFormat: 'YYYY年 MMMM月',
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                //height: 360,
                dayRender: function (date, cell) {
                    if (date.month() === 6&&date.toDate().getDate()>5&&date.toDate().getDate()<=self.currentDay) {

                        var day = date.format('YYYY-MM-DD');
                        var flag = false;
                        for (var i in signList) {
                            var item = signList[i];

                            if (item.date === day) {
                                var icon = "";
                                flag = true;
                                switch (item.status) {
                                    case 0:
                                        icon = 'sign.png';
                                        break;
                                    case 1:
                                        icon = 'no_sign.png';
                                        break;
                                    case 2:
                                        icon = 'red.png';
                                        break;
                                    case 3:
                                        icon = 'thanks.png';
                                        break;
                                    default:
                                        icon = "sign.png";
                                        break;
                                }
                                cell.html('<img src="/public/images/activity/july/' + icon + '" />');
                                if (item.status === 2) {
                                    cell.append('<p class="text">' + item.msg + '</p>')
                                }
                            }
                        }
                        if (!flag) {

                            cell.html('<img src="/public/images/activity/july/no_sign.png" />');
                        }
                    }
                },
                eventClick: function (date, allDay, jsEvent, view) {//签到
                    if ($("#sign").val()) {
                        layerLogin();
                        return;
                    }

                    $.ajax({
                        url: basePath + '/event/july/sign',
                        type: "POST",
                        success: function (data) {
                            if (!data.success) {
                                if (data.code == "-1") {
                                    layerLogin();
                                    return;
                                }
                                layer.msg(data.msg);
                            } else {
                                var json = data.jsonData;
                                var $cell = $('.fc-day.fc-today');
                                if (json.awardAmt == '' || json.awardAmt == null) {
                                    $cell.html('<img src="/public/images/activity/july/thanks.png" />');
                                    $cell.append('<p class="text">' + json.awardAmt + '</p>')
                                    layer.msg('今天签到没有中奖...</br>您已连续签到' + json.signCount + '天，要继续加油哟~')
                                } else {
                                    $cell.html('<img src="/public/images/activity/july/red.png" />');
                                    $cell.append('<p class="text">' + json.awardAmt + '</p>')
                                    layer.msg('今天签到获得' + json.awardAmt + '！</br>您已连续签到' + json.signCount + '天，要继续加油哟~')
                                }

                            }

                        }
                    })


                },
                eventRender: function (event, element) {

                },
                events: eventList
            })
            //竞猜球队
            $('#gameList').on('click', '.canCuess', function () {
                var $self = $(this);
                if (!$self.hasClass('disabled')) {
                    layer.confirm('竞猜' + $self.text() + '吗?', {
                        btn: ['确认', '再想想'],
                        title: false
                    }, function () {
                        $.ajax({
                            url: basePath + '/event/july/worldCup',
                            type: "POST",
                            data: {
                                matchId: $self.data('number'),
                                country: $self.data('team')
                            },
                            success: function (data) {
                                if (!data.success) {
                                    if (data.code == "-1") {
                                        layerLogin();
                                        return;
                                    }
                                    layer.msg(data.msg);
                                } else {
                                    layer.msg('竞猜成功~');
                                    $self.parent().html($self.data('name'));
                                }

                            }
                        })
                    })
                }
            })
        }
    }
    new SignActive().init();
}();