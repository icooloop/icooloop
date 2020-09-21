/**
 * Created by lib on 2018/11/07.
 */
var currentLoanPeriodUnit = 0,currentLoanPeriod = 0;
var baseIncome = 0,awardIncome = 0,redIncome = 0,awardDesc='',redDesc='';//项目收益，加息奖励，红包/加息券收益
+function () {
    var autoPay = function () {// 构造函数
        this.$monthList=$("#monthList");
        this.$monthBtn=this.$monthList.find('a');
        self.totalCount=0;
        this.pageSize=4;
        this.totalDue=0;
        this.assessStatus=$("#assessStatus").val();
        this.cacheInvestPrdid='';//缓存的id,用来控制刷新委托记录,分页
        this.cacheAssetsPrdid='';//缓存的id,用来控制刷新散标明细,分页
    }
    autoPay.prototype = {
        init: function () {
            this.initEvent();
            this.initPage();
            this.validate();//表单验证
           
        },
        initPage:function(){
        	if(!$("#ifVip").val()=='true'){
        		var $countDownTxt = $('#countDownTxt');
        	    var time = 4;
        	    var Tid=0;
        	    function countDown() {
        	        if (time > 0) {
        	            $countDownTxt.text(time--);
        	        } else {
        	        	 clearInterval(Tid);
        	        	 window.location.href =basePath+'/index';
        	        }
        	    }
        	    Tid=setInterval(function(){countDown()}, 1000);
        	}
        },
        initEvent: function () {
            var self=this;
            $('.icheck').iCheck({ //checkbox增强
                checkboxClass: 'icheckbox'
            });
            $("#detailDesc").slide({titCell:".tabs li",mainCell:".maincontent",trigger:"click"});
            //最大出借
            $("#maxInvestBtn").on('click',function(){
            	var avl = parseInt( $("#availableAmt").val());
            	var remain =parseInt( $("#currentRemainAmount").val());
            	var max = parseInt($("#currentMaxAmount").val());
            	var _vals =avl;
            	if(_vals>remain)
            		_vals = remain;
            	if(_vals>max)
            		_vals = max;
            	$("#money").val(_vals);
            })
            //
            $("#submitSubscriptionBtn").on('click',function(){
            	if($(this).attr("disabled") || $(this).hasClass("disabled")){
            		return false;
            	}
            	if(!$("#quitType").is(':checked')){
                    $("#submitSubscriptionBtn").removeClass('disabled');
                    layer.msg('未勾选授权债权，你将持有相应债权到期，请确认勾选');
                    return false;
                }
            	 if(!$("#agreement").is(':checked')){
                     $("#submitSubscriptionBtn").removeClass('disabled');
                     layer.msg('请先阅读并同意 《委托出借协议》 《风险及禁止性行为提示书》');
                     return false;
                 }
            	self.joinPlanSubmit();
            })
           
            //详情
            $("#assetsRecordTable").on("click",'.detail-link',function(){
            	var loanId=$(this).attr("data-id");
                layer.open({
                    area:['1220px','550px'],
                    type:2,
                    title:false,
                    content: basePath+"/product/detail/"+loanId+"?autopay=1"
                })
            })
            self.initAssetsRecord();
            self.initInvetsRecord();
           
        },
        getTotalDueByUserId: function(){
        	var self=this;
        	var userId = $("#userId").val();
        	if(userId!=""){
        		var url = basePath+"/product/getTotalDueByUserId";
        		$.ajax({
        			url:url,
        			type:'post',
        			dataType:'json',
        			data:{userId:userId},
        			cache:false,
        			success:function(data){
        				var result = eval("("+data+")");
        				if(result.success != undefined && result.success){
        					self.totalDue=(result.data)[0].totalDue;
        				}
        			}
        		});
        	}
        },  
        initAssetsPage:function(){
            var self=this;
            $("#laypage-assets").pagination({
                totalCount : self.totalCount,
                pageSize : self.pageSize,
                clickEvent : function(page_index, _this) {
                    $("#pageNoAsset").val(page_index + 1);
                    self.initAssetsRecord(true);
                }
            });
        },
        initInvestPage:function(){
            var self=this;
            $("#laypage-invest").pagination({
                totalCount : self.totalCount,
                pageSize : self.pageSize,
                clickEvent : function(page_index, _this) {
                    $("#pageNoInvest").val(page_index + 1);
                    self.initInvetsRecord(true);
                }
            });
        },        
        validate: function () {
            var self = this;
            //判断是否有月份
            var zdktje =  Number( $("#currentRemainAmount").val()) <= Number($("#currentMinAmount").val()) ? 
                			Number( $("#currentRemainAmount").val()) : Number( $("#currentMinAmount").val());
            
            //验证
            $('#investForm').validate({
                // 验证规则
                rules: {
                	assessStatus: {
                    	required: true,
                    	min:1
                    },
                	money: {
                        required: true,
                        number:true,
                        min: zdktje,
                        max: Number($("#availableAmt").val())
                    }
                },
                // 设置错误信息
                messages: {
                	assessStatus: {
                    	required: "assessStatusMsg",
                    	min:"assessStatusMsg"
                    },
                	money: {
                        required: "请输入委托出借金额",
                        number: '请输入正确的金额',
                        min: '最低委托出借金额为'+zdktje+'元',
                        max: '账户余额不足'
                    }
                },
                // 错误信息显示
                invalidHandler: function (form, validator) { // 错误提示
                    $.each(validator.errorList, function (key, value) {
                    	if(value.message == 'assessStatusMsg'){//风险评测错误信息
                    		layer.open({
                    			type: 1,
                    			shade: 0.8,
                    			title: false,
                    			closeBtn:false,
                    			area:['600px','auto'],
                    			content: $('#userRiskDiv')
                    		});
                    		return false;
                    	}else{
                    		layer.msg(value.message);
                    		return false;
                    	}
                    	
                    });
                },
                errorPlacement: function (error, element) {

                },
                //验证成功
                success: function (error, element) {

                },              
                submitHandler: function (form) { //验证通过提交表单           	
                	 var depositCheck =($("#isDepositary").val()=="0"); //是否开通存管
                     if(depositCheck){
                         layerDeposit();
                         return false;
                     }
                	//ajax校验
                	var money=Number($('#money').val());
                	var userAssessLimit=Number($('#userAssessLimit').val());
                	if(self.totalDue==-1){
                		self.getTotalDueByUserId();
                	}
                	if((self.totalDue+money)>userAssessLimit*10000){
           			 $("#totalDueStr").text(formatCurrency(self.totalDue)+"");
        			 layer.open({
        				    type: 1,
        				    shade: 0.8,
        				    title: false,
        				    area:['480px'],
        				    content: $('#riskModel')
        				});
        			 	return false;
                	}
                	var currentPrdId=$('#currentPrdId').val();
            		$.ajax({
            			cache : true,
            			type : "POST",
            			url : basePath + '/plan/hplan-check',
            			data : {"prdId" : currentPrdId,
            					"amount":money
            			},
            			success : function(data) {
            				var result = data;
            				if (result.successed) {
            					self.showConfirm(currentPrdId,money,result);
            				} else {
            					layer.alert(result.message);
            				}
            			}
            		});                    	
                	return false;
                }
            });
        },
        
        showConfirm:function(currentPrdId,money,result){
        	var self=this;
        	var currMonth = Number($(".target-month").eq(0).html());
        	currentLoanPeriod=currMonth;
        	if(isNaN(currMonth)){currMonth=0;}
        	var currDays = currMonth*30;

        	//红包解析
        	var awards =  $.parseJSON(result.errorCode);
        	var html= ' <select id="selectVoucher" name="" class="selectpicker discount-select" multiple>';
        	
        	var awardArr = [];//  awards.vouchers红包 ,   awards.ticket奖励券
        	if(awards.ticket){awardArr=awardArr.concat(awards.ticket)};
        	if(awards.vouchers){awardArr=awardArr.concat(awards.vouchers)}; 
        	
            var subAmt=money; //剩余金额=出借金额
            var limitAmt=0;//红包限制金额
            var redAmt=0;//已选中红包金额
            var maxRate = 0;//奖励券使用标记
            var ticketAmt=0;//奖励券收益
            var ticketId;
            
        	if(awardArr && awardArr.length){
        		//循环红包
				var olist = new Array();
				$.each(awardArr,function(i,o){
					if(o.limitAmount<=subAmt && o.limitPeriods<=currDays){
	        			if(o.awardType == '2'){
	                		// zere_one_page_create(红包限定金额,红包金额,数据库id)
	    					olist.push(zere_one_page_create(o.limitAmount, o.awardAmount, o.id));
	        			}
	        			if(o.awardType == '3' && maxRate<o.awardAmount){
	        				maxRate = o.awardAmount; 
	        				ticketId = o.id;
	        				ticketAmt=calculateIncome(subAmt, o.awardAmount);//奖励券收益      
	        			}
        			}
        		});
				var redResult = zere_one_page_table(subAmt, olist);
				var redAmtTotal=zere_one_page_total(redResult);//红包收益
				console.log(redAmtTotal,ticketAmt,ticketId);
				//循环红包
				$.each(awardArr,function(i,o){
					if(o.awardType != '2' ){
						return true;//continue –用return true;
					}
					var selectedHtml = "";
					var disableHtml = " ";
					if(money<o.limitAmount || o.limitPeriods>currDays){
						disableHtml=" disabled='disabled' " ;
					}else{
						$.each(redResult,function(ii,oo){
							if(o.id==oo.id && redAmtTotal>ticketAmt){//红包收益大于奖励券收益选择红包
								maxRate = 0;
								selectedHtml = "selected";
								limitAmt = limitAmt+ o.limitAmount;
								redAmt = redAmt+o.awardAmount;
							}
		        		});
					}
					html+="<option "+disableHtml+selectedHtml+" data-limitamount='"+o.limitAmount +"' data-awardamount='"+o.awardAmount+"' data-adddays='"+o.addDays+"' data-awardtype='"+o.awardType+"' value='"+o.awardDtlId+"'>"+o.limitRemarkStr+"</option>";
				});  
        		//循环加息券
				$.each(awardArr,function(i,o){
					if(o.awardType != '3' ){
						return true;//continue –用return true;
					}
					var selectedHtml = "";
					var disableHtml = " ";
					if(money<o.limitAmount || o.limitPeriods>currDays){
						disableHtml=" disabled='disabled' "
					}else{
						//未选择红包,才选择加息劵
						if(ticketId == o.id && o.limitAmount<=money && redAmtTotal<=ticketAmt){//红包收益小于奖励券收益选择奖励券
							selectedHtml = "selected";
							maxRate = o.awardAmount;
						}
					}
					html+="<option "+disableHtml+selectedHtml+" data-limitamount='"+o.limitAmount +"' data-awardamount='"+o.awardAmount+"' data-adddays='"+o.addDays+"' data-awardtype='"+o.awardType+"' value='"+o.awardDtlId+"'>"+o.limitRemarkStr+"</option>";
				});
				html+="</select>";
	        	$("#voucherDiv").html(html);
	        	
                $('#selectVoucher').selectpicker({ //红包奖励券select初始化
                    iconBase: 'icon-font',
                    tickIcon: 'icon-right',
                    noneSelectedText: awardArr.length+'个可用红包'
                });
                
                //绑定change事件
                $('#selectVoucher').on('changed.bs.select',function(event,data,currentSelected){
                	self.vouchsOnChange(event,data,currentSelected);
                });
                
             
                $("#voucherTicketTr").show();
                $('#selectVoucher').selectpicker('refresh');
        	}else{
        		$("#voucherTicketTr").hide();
        		$("#voucherDiv").html('');
        	}
           
        	//打开确认框
            layer.open({
                area:['560px','auto'],
                type:1,
                title:'委托出借确认',
                content:$("#subscriptionLayer")
            });
            
            // 触发事件
            self.vouchsOnChange(null,null,null);
        },
        
        // 红包提示总计文字
        vouchsOnChange:function(obj,data,lastSelected){
        	var currentSelected=[];//当前可选择的红包列表
        	var self = this;
        	var money = Number($("#money").val());
        	var subAmt= money; //剩余金额=出借金额
        	var limitAmt=0;//红包限制金额
        	var redAmt=0;//已选中红包金额
        	var maxRate = 0;//奖励券使用标记
        	var rateCount= 0;//奖励券使用的个数
        	
        	
        	var $currentOpt= data==null?null:$("#selectVoucher").find('option').eq(data);// 新选中的option
        	// 循环之前选中的
        	var hasSelctArray = $("#selectVoucher option:selected");
        	$(hasSelctArray).each(function (index,element){
        		var _limitAmt = Number($(this).attr("data-limitamount"));
        		var _awardtype = $(this).attr("data-awardtype");
        		var _awardamount = Number($(this).attr("data-awardamount"));
        		
        		currentSelected.push($(this).val());
				if(_awardtype=='3'){//奖励劵
	            	if(limitAmt<=money){ rateCount = rateCount + 1; }
	            	if($currentOpt != $(this)){ maxRate=_awardamount; }
				}else{//红包
        			subAmt =subAmt- _limitAmt;
        			limitAmt=limitAmt+ _limitAmt;
        			redAmt = redAmt+_awardamount;
				}
        	});
        	// 判断新选中的.
        	if($currentOpt != null){
        		var removeFlag = subAmt<0 || rateCount>1; // 判断是否超出投资金额,或者多个加息劵
        		var removeFlag2 = redAmt>0 && rateCount>0;// 判断是否同时选择红包,和加息券
        		if(removeFlag || removeFlag2){
        			var errotTips = subAmt<0 ? '所选红包总额不能大于出借金额' :'奖励券只能使用一个哟';
        			if(removeFlag2){
        				errotTips = '红包和奖励劵只能使用一个';
        			}
        			layer.msg(errotTips,{},5000);
        			
        			
        			if($currentOpt.attr("data-awardtype")=='2'){//红包
        				redAmt = redAmt - Number($currentOpt.attr("data-awardamount"));
        				limitAmt=limitAmt- Number($currentOpt.attr("data-limitamount"));
        			}else{//加息券
        				maxRate=0;rateCount=0;
        			}
        			
        			for(var i in currentSelected){// 移除当前的
        				if(currentSelected[i]===$currentOpt.val()){currentSelected.splice(i,1);break;}
        			}  
        		}
        	}
    		var selectStr = "";
    		if(redAmt>0){
    			selectStr = 	"满"+limitAmt+'返'+redAmt;
    			redIncome=redAmt; 
    			redDesc=" + 红包收益"+formatCurrency(redIncome);
    			if(maxRate){ selectStr+="," }
    		}
    		if(maxRate){ 
    			selectStr+="奖励"+maxRate+"%";
    			redIncome=calculateIncome(money, maxRate) ;
    			redDesc=" + 奖励券收益"+formatCurrency(redIncome);
    		}
    		if(selectStr==''){
    			selectStr="未选择优惠券";
    			redDesc="";
    			redIncome=0;
    		}
    		if(data!=null){ $("#selectVoucher").selectpicker('val',currentSelected);}
            baseIncome=calculateIncome(money,platRate);//基本利息
        	if(awardRate>0){
        		awardIncome=calculateIncome(money,awardRate);//奖励利息
        		awardDesc=' + 出借奖励 '+formatCurrency(awardIncome);
        	}
    		$("#voucherDiv").find('.filter-option').html(selectStr);
    		$("#investAmtTd").html(formatCurrency(money));
         	$("#interestAmtTd").html(formatCurrency(baseIncome+awardIncome+redIncome));//计算收益
            $("#interestAmtDetail").html(' 项目收益 '+formatCurrency(baseIncome)+awardDesc+redDesc);
    	},
        // 加入委托
        joinPlanSubmit:function(){
        	var couponIds =  new Array();
        	
        	$("#selectVoucher option:selected").each(function (index,element){
        		couponIds.push($(this).val());
        	});
        	var quitType = $("#quitType").val();
        	var money=Number($('#money').val());
        	var currentPrdId=$('#currentPrdId').val();
        	$("#submitSubscriptionBtn").button('loading');//loading
    		$.ajax({
    			cache : true,
    			type : "POST",
    			url : basePath + '/plan/hplan-join',
    			data : {"prdId" : currentPrdId,
    					"amount":money,
    					"quitType":quitType,
    					"couponIdStr" : couponIds.join(',')
    			},
    			success : function(data) {
    				var result = data;
    				if (result.successed) {
    					window.location.href = basePath + '/plan/join-success';
    				} else {
    					layer.alert(result.message);
    				}
    			},
    			complete:function(){
    				$("#submitSubscriptionBtn").button('reset');
    			}
    		});    
        },
        // 委托记录明细
        initInvetsRecord:function(page){
            var self = this;
            var currentPrdId = $("#currentPrdId").val();
            var _prdChanged = self.cacheInvestPrdid != currentPrdId;
            if(!page && !_prdChanged){
            	return false;
            }
            self.cacheInvestPrdid = currentPrdId;         

            var url = basePath+"/plan/plan-record?prdId="+currentPrdId;
            var _table=$('#investRecordTable');
            _table.empty();
            $.ajax({
                url:url,
                type:'post',
                dataType:'json',
                data:{pageNo:$('#pageNoInvest').val(),'pageSize':self.pageSize},
                cache:false,
                success:function(data){
                    var result = $.parseJSON(data);
                    var html=[];
                    if(result.count > 0){
                        $.each(result.data,function(i,o){
                            html.push('<tr><td>',o.userLoginNameStr,'</td>');
                            var investAmtStr = formatCurrency(o.investAmount) + '';
                            investAmtStr = investAmtStr.substring(0, investAmtStr.indexOf("."));
                            html.push('<td>',investAmtStr,'</td>');
                            html.push('<td>',formartDate(o.investTime,"yyyy-MM-dd hh:mm:ss"),'</td>');
                            html.push('</tr>');
                        });
                    }else{
                        html.push('<tr><td colspan="3"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>')
                    }
                    _table.append(html.join(''));
                    self.totalCount = result.count;
                    if(_prdChanged){//初始化分页，后续只修改列表值
                        self.initInvestPage();
                    }
                    if(self.totalCount>self.pageSize){
                        $('#laypage-invest').show();
                    }else{
                        $('#laypage-invest').hide();
                    }
                }
            });
        },
        // 散标资产明细
        initAssetsRecord:function(page){
        	var loginFlag = $("#loginFlag").val();
        	if(loginFlag=='0'){
        		return
        	}
        	var self = this;
            var currentPrdId = $("#currentPrdId").val();
            var _prdChanged = self.cacheAssetsPrdid != currentPrdId;
            if(!page && !_prdChanged){
            	return false;
            }
            self.cacheAssetsPrdid = currentPrdId;
            
        	var url = basePath+"/product/list";
        	var _table=$('#assetsRecordTable');
        	_table.empty();
        	$.ajax({
        		url:url,
        		type:'post',
        		dataType:'json',
        		data:{pageNo:$('#pageNoAsset').val(),'pageSize':self.pageSize,"autobidQuery":"1"},
        		cache:false,
        		success:function(data){
        			var result = $.parseJSON(data);
        			var html=[];
        			if(result.count > 0){
        				$.each(result.data,function(i,o){
        					html.push('<tr><td>',o.loanTitle,'</td>');
        					var loanAmtStr = formatCurrency(o.loanAmt) + '';
        					loanAmtStr = loanAmtStr.substring(0, loanAmtStr.indexOf("."));
        					html.push('<td>',loanAmtStr,'</td>');
        					html.push('<td>',o.loanPeriodStr,'</td>');
        					/*html.push('<td>','<span class="text-info">AAA</span>','</td>');*/
        					html.push('<td>','<a href="javascript:;;" data-id="'+o.loanId+'" class="btn btn-primary detail-link">查看详情</a>','</td>');
        					html.push('</tr>');
        				});
        			}else{
        				html.push('<tr><td colspan="5"><img style="margin:15px 0" class="record" src="/public/images/user/record.png"></td></tr>')
        			}
        			_table.append(html.join(''));
        			self.totalCount = result.count;
        			if(_prdChanged){//初始化分页，后续只修改列表值
        				self.initAssetsPage();
        			}
        			if(self.totalCount>self.pageSize){
        				$('#laypage-assets').show();
        			}else{
        				$('#laypage-assets').hide();
        			}
        		}
        	});
        },
        onSubmit: function (form) {

        }
    }
    new autoPay().init();
}();


function needRisk(){
	window.location.href=basePath+"/product/needrisk";
}

//根据投资金额和利率计算收益
function calculateIncome(amount, rate) {
	var yln = rate / 100 / 12;
    var income  = Math.floor(yln * amount * currentLoanPeriod * 100) / 100;
    return income;
}

