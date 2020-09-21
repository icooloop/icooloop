/**
 * Created by lidy on 2017/11/23.
 */
+function () {
    var UserCenter = function () {//构造函数
    }
    UserCenter.prototype = {
        init: function () {
            this.currentTime = new Date(now);
            this.initEvent();//绑定事件
        },
        initEvent: function () {
            var self = this;
            var eventList=[];
            var systemDate=new Date(now);
            var lastMonth=[];
            var length = repayData.data.length,
            i,j,temp;
	        for (i = length - 1; 0 < i; i--) {//月份排序
	            for (j = 0; j < i; j++) {
	            	//console.log(repayData.data[j].yearMonth);
	                if (new Date(repayData.data[j].yearMonth+'-01') > new Date(repayData.data[j + 1].yearMonth+'-01')) {
	                    temp = repayData.data[j];
	                    repayData.data[j] = repayData.data[j + 1];
	                    repayData.data[j + 1] = temp;
	                }
	            }
	        }         
			var repaying=0;
			var repayed=0;
			var repayTotal=0;
			for(var i in repayData.data){
				var data=repayData.data[i];
				if(curYearMonth==data.yearMonth){
					for(var x in data.repayList){
        				var item=data.repayList[x];
        				repayTotal+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				if(item.investStatus=="4"){
        					repayed+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				}else{
        					repaying+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
        				}
        			}
				}
			}	
			$("#monthRepayAmt").html(this.formatCurrency(repaying));
			$("#monthPayedAmt").html(this.formatCurrency(repayed));
            
            var timeDay=[];
            var hashArr=[];
            for(var i in repayData.data){
            	var data=repayData.data[i];
        		var yearMonth=new Date(data.yearMonth+'-01');
        		
            	for(var x in data.repayList){
            		var item=data.repayList[x];
            		//console.log(item)
            		var day=new Date(item.settleDate);
            		var currentMonth=day.getMonth()+1;
        			currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
        			var currentDate=day.getDate();
        			currentDate=currentDate<10?"0"+currentDate:currentDate;
        			var currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
        			timeDay.push({time:currentDay,investStatus:item.investStatus,investType:item.investType,amt:item.principal+item.allIncome});
        			if(!hashArr[currentDay]){
        				hashArr[currentDay]=true;
            			var investStatus=(item.investStatus!="4")?"待收":"已收";
            			var money=this.formatCurrency(item.principal+item.allIncome);
            			eventList.push({
                			title:money,
                            start: currentDay,
                            time:currentDay,
                            investType : item.investType,
                            description:'1笔'+investStatus+'，共'+money+'元'
                		})
            		}
            	}
            	for (var j = 0; j < eventList.length; j++) {
            		var repayAmount=0;
            		var payedAmount=0;
            		var repayTotal=0;
            		var payedTotal=0;
            		var ele = eventList[j];
            		for (var i = 0; i < timeDay.length; i++) {
    					if(timeDay[i].time==ele.time){
    						var item=timeDay[i];
    						if(item.investStatus=="4"){
    							payedAmount+=item.amt;
    							payedTotal++;
    						}else{
    							repayAmount+=item.amt;
    							repayTotal++;
    						}
    					}
    				}
            		if(payedAmount>0||repayAmount>0){
            			var title ="";
            			var str = '';
            			if(repayTotal>0){
            				title=this.formatMoney(repayAmount+payedAmount);
            				ele.type='repay';
            				str = '<p>'+repayTotal+'笔待收，共'+this.formatCurrency(repayAmount)+'元</p>';
            			}
            			if(payedTotal>0){
            				if(title==''){
            					title=this.formatMoney(repayAmount+payedAmount);
            				}
                            ele.type='pay';
            				str += '<p>'+payedTotal+'笔已收，共'+this.formatCurrency(payedAmount)+'元</p>';
            			}
            			ele.title=title;
						ele.description=str;
						if(ele.time==today){
							$("#todayRepayAmt").html(this.formatCurrency(repayAmount));
							$("#todayPayedAmt").html(this.formatCurrency(payedAmount));
							$("#todayPayedCount").html(payedTotal+repayTotal);
						}
						
            		}
				}
            }
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
                titleFormat:'YYYY年 MMMM月',
                header: {
                    left: 'today',
                    center: 'prev,title,next',
                    right: ''
                },
                //height: 360,
                eventClick: function (date, allDay, jsEvent, view) {
                },
                eventRender: function (event, element) {
                    $(element).popover({
                        content: event.description,
                        trigger: 'hover',
                        placement: 'right',
                        html:true,
                        container: 'body'
                    })
                },
                events:eventList
            })
        },
        formatCurrency:function(num,flag) {
            var argNum = arguments.length;
            flag = argNum >= 2 ? flag : true;
            if (num == null) {
                return flag?"0.00元":"0元";
            }
            if (num == "--") {
                return flag?"0.00元":"0元";
            }
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + ','
                        + num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num+(flag?( '.' + cents):''));
        },
		formatMoney:function(num){
        	if(parseInt(num)<100000){
        		return this.formatCurrency(num)+'元';
			}else{
        		return this.returnFloat(Math.floor(num/10000 * 100) / 100)+'万'
			}
		},
        returnFloat:function(value){
            var value=Math.round(parseFloat(value)*100)/100;
            var xsd=value.toString().split(".");
            if(xsd.length==1){
                value=value.toString()+".00";
                return value;
            }
            if(xsd.length>1){
                if(xsd[1].length<2){
                    value=value.toString()+"0";
                }
                return value;
            }
		}
    }
    new UserCenter().init();
}();

$(function(){
	initTotalEcharts();		
})
function getEchartsLegend(name){
	for(var i=0;i<totalDatas.length;i++){
		var legend='　'+name+'　　';
		if(name==totalDatas[i].name){
			if(name.length==3){
				legend+='　';
			}
			return legend+formatCurrency(totalDatas[i].value)+'元';
		}
	}
}
//根据日期查询数据	
function initTotalEcharts(){
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c}元 ({d}%)"
		},
		legend: {
			show : true,
			left : 400,
			orient: 'vertical',
			top : 'middle',
			itemWidth:15,
			itemGap :20,
			formatter: function (name) {
				return getEchartsLegend(name);
			},
			textStyle : {color : '#999',fontSize :16},
			data:[totalDatas[0].name,totalDatas[1].name,totalDatas[2].name,totalDatas[3].name]
		},
		color:['#e6c182','#384e8a','#a1adcc','#6aaaff'],
		series: [
			{
				name:'账户总资产',
				type:'pie',
				center : [ '150px', '50%' ],
				radius : [ '50%', '80%' ],
				minAngle : 0.1,
				label : {
					normal : {
						show : false,
						position: 'center'
					}
				},
				data:totalDatas
			}
		]
	}
	var myChart =echarts.init(document.getElementById('totalEchart'));
	myChart.setOption(option);
	myChart.on('legendselectchanged', function(obj) {
		myChart.dispatchAction({type:'legendSelect',name:obj.name});//点击始终选中
        if(obj.name == totalDatas[0].name){
        	window.location.href=basePath+"/spa/member/invest/autobid"
        }else if(obj.name == totalDatas[1].name){
        	window.location.href=basePath+"/spa/member/invest/holdlist"
        }
    });
}
