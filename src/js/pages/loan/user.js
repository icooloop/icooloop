+function () {
    var LoanUser = function () {//构造函数
    }
    LoanUser.prototype = {
        init: function () {
            this.currentTime = new Date();
            this.initEvent();//绑定事件
        },
        initEvent: function () {
        	this.initCalendar();
        },
        initCalendar:function(){
        	 var self = this;
             var  eventList=[];
             var systemDate=new Date();
             var lastMonth=[];
             var length = repayData.data.length,
             i,j,temp;
 	         for (i = length - 1; 0 < i; i--) {//月份排序
 	            for (j = 0; j < i; j++) {
 	                if (new Date(repayData.data[j].yearMonth+'-01') > new Date(repayData.data[j + 1].yearMonth+'-01')) {
 	                    temp = repayData.data[j];
 	                    repayData.data[j] = repayData.data[j + 1];
 	                    repayData.data[j + 1] = temp;
 	                }
 	            }
 	          }         
 	        
             for(var i in repayData.data){
             	var data=repayData.data[i];
         		var yearMonth=new Date(data.yearMonth+'-01');
         		var isRepay=false;
         		lastMonth=new Date(yearMonth.getFullYear(),yearMonth.getMonth()+1,1);//下一个月
         		if(systemDate.getTime()<=lastMonth.getTime()){
         			isRepay=true;
         			var repayTotal=0;
         			var repaying=0;
         			var repayed=0;
         			var repayHtml='';
         			for(var x in data.repayList){
         				var item=data.repayList[x];
         				repayTotal+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
         				if(item.investStatus==="1"){
         					repaying+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
         				}
         				if(item.investStatus==="4"){
         					repayed+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
         				}
         			}
         			repayHtml+='<div class="month"><h3><i class="icon-font icon-calendar"></i><span>'+yearMonth.getFullYear()+'年'+(yearMonth.getMonth()+1)+'月</span>';
         			repayHtml+='</h3></div><ul><li>回款总额：<span>'+this.formatCurrency(repayTotal)+'元</span></li><li>待收回款：<span>'+this.formatCurrency(repaying)+'元</span></li><li>已收回款：<span>'+this.formatCurrency(repayed)+'元</span></li></ul>';
         			var lastRepayData=repayData.data[parseInt(i)+1];
         			if(lastRepayData){
         				var yearMonth=new Date(lastRepayData.yearMonth);
         				repayTotal=0;
             			repaying=0;
             			repayed=0;
             			for(var x in lastRepayData.repayList){
             				var item=lastRepayData.repayList[x];
             				repayTotal+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
             				if(item.investStatus==="1"){
             					repaying+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
             				}
             				if(item.investStatus==="4"){
             					repayed+=item.principal+item.repayIncome+item.awardIncome+item.ticketIncome;
             				}
             			}
             			repayHtml+='<div class="month last"><h3><i class="icon-font icon-calendar"></i><span>'+yearMonth.getFullYear()+'年'+(yearMonth.getMonth()+1)+'月</span>';
             			repayHtml+='</h3></div><ul><li>回款总额：<span>'+this.formatCurrency(repayTotal)+'元</span></li><li>待收回款：<span>'+this.formatCurrency(repaying)+'元</span></li><li>已收回款：<span>'+this.formatCurrency(repayed)+'元</span></li></ul>';
         			}
         			$("#monthRepayList").html(repayHtml);
         			break;
         		}
             }
             if(!isRepay){//没有代收提示
             	$("#monthRepayList").html('<div class="pic"><img src="'+basePath+'/public/images/user/record.png"></div>');
             }
             var timeDay=[];
             for(var i in repayData.data){
             	var data=repayData.data[i];
         		var yearMonth=new Date(data.yearMonth+'-01');
         		
             	for(var x in data.repayList){
             		var item=data.repayList[x];
             		var day=new Date(item.settleDate);
             		var currentMonth=day.getMonth()+1;
         			currentMonth=currentMonth<10?"0"+currentMonth:currentMonth;
         			var currentDate=day.getDate();
         			currentDate=currentDate<10?"0"+currentDate:currentDate;
         			var currentDay=day.getFullYear()+'-'+currentMonth+'-'+currentDate;
         			timeDay.push({time:currentDay,investStatus:item.investStatus,amt:item.principal+item.allIncome});
             		if(eventList.length&&eventList[eventList.length-1].start===currentDay){//判断是否重复一天的日期
             			var currentItem=eventList[eventList.length-1];
             		}else{
             			var investStatus=item.investStatus==1?"待收":"已收";
             			var money=this.formatCurrency(item.principal+item.allIncome);
             			eventList.push({
                 			title: this.formatMoney(item.principal+item.allIncome),
                             start: currentDay,
                             time:currentDay,
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
     						if(item.investStatus==1){
     							repayAmount+=item.amt;
     							repayTotal++;
     						}else{
     							payedAmount+=item.amt;
     							payedTotal++;
     						}
     					}
     				}
             		if(payedAmount>0||repayAmount>0){
             			var title ="";
             			var str = '';
             			if(repayTotal>0){
             				title=this.formatMoney(repayAmount);
             				ele.type='repay';
             				str = '<p>'+repayTotal+'笔待收，共'+this.formatCurrency(repayAmount)+'元</p>';
             			}
             			if(payedTotal>0){
             				if(title==''){
             					title=this.formatMoney(payedAmount);
             				}
                             ele.type='pay';
             				str += '<p>'+payedTotal+'笔已收，共'+this.formatCurrency(payedAmount)+'元</p>';
             			}
             			ele.title=title;
             			ele.description=str;
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
                 	if(event.type==='pay'){
                         $(element).addClass('pay');
 					}
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
		formatMoney(num){
        	if(parseInt(num)<100000){
        		return this.formatCurrency(num)+'元';
			}else{
        		return this.returnFloat(Math.floor(num/10000 * 100) / 100)+'万'
			}
		},
        returnFloat(value){
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
    new LoanUser().init();
}();
