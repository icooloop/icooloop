/**
 * Created by Lidy on 2017/11/9.
 */
+function () {
    var ProductList = function () {//构造函数
        this.$productTableList = $("#productTableList");
        this.$productListGroup = this.$productTableList.children('.group');
        this.$titleList=$('#titleList');
        this.$productTableList2 = $("#productTableList2");
        this.$productList2Group2 = this.$productTableList2.children('.group');
        this.$titleList2=$('#titleList2');
    }
    ProductList.prototype = {
        init: function () {
            this.setProgress();
            this.setProgress2();
            this.initEvent();
        },
        initEvent: function () {
            var self=this;
            this.$productTableList.on('click', '.group', function () {
                var url = $(this).find('li.status').attr('loan_url');
                if (url) {
                    window.open(url, '_blank');
                }
            })
            this.$titleList.on('click','a',function(){
                self.$titleList.find('a').removeClass('active');
                $(this).addClass("active");
                var type = $(this).data('type');
                var $arrow=$(this).find('.icon-order-down');
                self.$titleList.find('.icon-font').not($arrow).removeClass('active');
                if($arrow.hasClass('active')){
                    $arrow.removeClass('active');
                    $(this).find('.icon-order-up').addClass('active');
                    params['orderSc']='ASC';
                }else{
                    $arrow.addClass('active');
                    $(this).find('.icon-order-up').removeClass('active');
                    params['orderSc']='DESC';
                }
                params['orderColumn']=type;
                $('#pageNo').val("1");
                initData()
                initPage();
            })
            this.$productTableList2.on('click', '.group', function () {
                var url = $(this).find('li.status').attr('loan_url');
                if (url) {
                    window.open(url, '_blank');
                }
            })
            this.$titleList2.on('click','a',function(){
                self.$titleList2.find('a').removeClass('active');
                $(this).addClass("active");
                var type = $(this).data('type');
                var $arrow=$(this).find('.icon-order-down');
                self.$titleList2.find('.icon-font').not($arrow).removeClass('active');
                if($arrow.hasClass('active')){
                    $arrow.removeClass('active');
                    $(this).find('.icon-order-up').addClass('active');
                    params2['orderSc']='ASC';
                }else{
                    $arrow.addClass('active');
                    $(this).find('.icon-order-up').removeClass('active');
                    params2['orderSc']='DESC';
                }
                params2['orderColumn']=type;
                $('#pageNo2').val("1");
                initData2()
                initPage2();
            })
        },
        setListLevel: function () {
            var $productListGroup = this.$productTableList.children('.group');
            var length = $productListGroup.length;
            $productListGroup.each(function (index) {//设置列表 zindex属性改变阴影效果层级
                $(this).css('zIndex', length - index);
            })
        },
        setListLevel2: function () {
            var $productList2Group2 = this.$productTableList2.children('.group');
            var length = $productList2Group2.length;
            $productList2Group2.each(function (index) {//设置列表 zindex属性改变阴影效果层级
                $(this).css('zIndex', length - index);
            })
        },
        setProgress: function () { //设置进度效果
            $("#productTableList").find('.group').each(function (index, item) {
                var $progressBar = $(this).find('.progress-bar');
                $progressBar.css({
                    width: $progressBar.data('progress') + '%'
                })
            })
        },
        setProgress2: function () { //设置进度效果
            $("#productTableList2").find('.group').each(function (index, item) {
                var $progressBar = $(this).find('.progress-bar');
                $progressBar.css({
                    width: $progressBar.data('progress') + '%'
                })
            })
        }
    }
    var productList = new ProductList();
    productList.init();
//散标
    var params = {
        pageNo: $('#pageNo').val(),
        pageSize: $.trim($('#pageSize').val())
    }
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

    //待放款
    function initData() {
        params.pageNo = $('#pageNo').val();
        var _table = $('#productTableList');
        _table.empty();
        $.ajax({
            url: basePath + '/product/vip/product',
            type: 'post',
            dataType: 'json',
            data: params,
            cache: false,
            async: false,
            success: function (data) {
                var result = $.parseJSON(data);
                var html = [];
                if (result.count > 0) {
                    $.each(result.data, function (i, o) {
                        var str = '';
                        var awardRate = o.awardRate;
                        if (awardRate > 0) {
                            str += '%+' + awardRate;
                        }
                        if((o.loanStatus == "2"||o.loanStatus == "5") && o.awardType != '2' && o.awardRate>0){
                            str+='<i class="jiaxi-icon">奖励</i>'
                        }
                        var minAmtStr = formatCurrency(o.minAmt) + "";
                        minAmtStr = minAmtStr.substring(0, minAmtStr.indexOf("."));
                        var remainAmountStr = formatCurrency(o.remainAmount) + '';
                        remainAmountStr = remainAmountStr.substring(0, remainAmountStr.indexOf("."));
                        var text = "";
                        if (awardRate > 0) {
                            text = "<i></i>"
                        }
                        if (o.awardType == '2') {
                            text = '<i class="new-hard-icon"></i>'
                        }
                        var iconClass='';
                        var iconStr='';
                        var lbdClass = '';
                        var lbdClassStr = '';
                        switch (o.prdType){
                            case "1":
                                iconClass='sn';
                                iconStr='农';
                                break;
                            case "0":
                                iconClass="qn";
                                iconStr='企';
                                break;
                            case "4":
                                iconClass="cb";
                                iconStr="车";
                                break;
                            case "3":
                                iconClass='lb';
                                iconStr="保";
                                lbdClass ='bxcb'
                                lbdClassStr = '保险承保';
                                break;
                            case "2":
                                iconClass='wh';
                                iconStr="微";
                                break;
                            case "5":
                                iconClass='wq';
                                iconStr="商";
                                break;
                            default:
                                iconClass='sn';
                                iconStr='农';
                                break;
                        }
                        var icon='<span class="u-label label-'+iconClass+'">'+iconStr+'</span>';
                        if (o.loanStatus == "2") {
                            var lbdIcon =(lbdClass=='bxcb')?'&nbsp;<span class="u-label label-'+lbdClass+'">'+lbdClassStr+'</span>':'';
                            html.push('<div class="group"><ul class="clearfix">');
                            html.push('<li class="name">',icon, o.loanTitle.length>18?o.loanTitle.substring(0,18)+"....":o.loanTitle, lbdIcon,text, '</li>');
                            html.push('<li class="rate"><span class="text-info rate">', o.platRate, '</span><span class="text-info decimal">', str, '%</span>', '</li>');
                            html.push('<li class="term">', (o.loanPeriodStr), '</li>');
                            html.push('<li class="money">', o.repayModeStr, '</li>');
                            html.push('<li class="process">	<div class="u-progress"><div class="sr-only" style="width:'+ o.percent+'%"></div></div><span class="text-default">', o.percent, '%</span></li>');
                            html.push('<li class="surplus">', remainAmountStr, '</li>');
                            html.push('<li class="status"', ' loan_url="', basePath, '/product/detail/', o.loanId, '"><a href="javascript:;;"class="btn btn-invest">立即出借</a></li>');
                            html.push('</ul></div>');
                        } else {
                        	var lbdIcon =(lbdClass=='bxcb')?'&nbsp;<span class="u-label label-'+lbdClass+'">'+lbdClassStr+'</span>':'';
                            html.push('<div class="group complete"><ul class="clearfix">');
                            html.push('<li class="name">',icon, o.loanTitle, lbdIcon,text, '</li>');
                            html.push('<li class="rate"><span class="text-info rate">', o.platRate, '</span><span class="text-info decimal">', str, '%</span>', '</li>');
                            html.push('<li class="term">', (o.loanPeriodStr), '</li>');
                            html.push('<li class="money">', o.repayModeStr, '</li>');
                            html.push('<li class="process"> <div class="u-progress"><div class="sr-only" style="width:'+ o.percent+'%"></div></div><span class="text-default">', o.percent, '%</span></li>');
                            if (o.loanStatus == "5") {
                                html.push('<li class="surplus">已满标</li>');
                                html.push('<li style="cursor:pointer;" class="status" loan_url="', basePath, '/product/detail/', o.loanId, '" >放款中</li>');
                            } else if (o.loanStatus == "6") {
                                html.push('<li class="surplus">还款中</li>');
                                html.push('<li style="cursor:pointer;" class="status repay" loan_url="', basePath, '/product/detail/', o.loanId, '"  >还款中</li>');
                            } else if (o.loanStatus == "13") {
                            	html.push('<li class="surplus">'+remainAmountStr+'</li>');
                            	html.push('<li style="cursor:pointer;" class="status repay" loan_url="', basePath, '/product/detail/', o.loanId, '"  >'+formatDate(o.releaseTime,'HH:mm')+'开启</li>');                                
                            } else if (o.loanStatus == "7" || o.loanStatus == "8" || o.loanStatus == "9") {
                                html.push('<li class="surplus">已结清</li>');
                                html.push('<li style="cursor:pointer;" class="status text-success" loan_url="', basePath, '/product/detail/', o.loanId, '"  >已还清</li>');
                            }
                            html.push('</ul></div>');
                        }

                    });

                } else {
                    html.push('<div class="text-c pt-30 pb-10"><img class="record" src="/public/images/user/record.png"></div>');
                }
                _table.append(html.join(''));
                totalCount = result.count;
                if (totalCount > pageSize) {
                    fn = initData;
                    $('#laypage').show();
                } else {
                    $('#laypage').hide();
                }
                productList.setProgress();
                productList.setListLevel();
            }
        });
    }
//债权
    var params2 = {
        pageNo: $('#pageNo2').val(),
        pageSize: $.trim($('#pageSize2').val())
    }
    var totalCount2 = 0;
    var pageSize2 = $.trim($('#pageSize2').val());
    var fn2 = null;

    //分页
    function initPage2() {
        $("#laypage2").pagination({
            totalCount: totalCount2,
            pageSize: pageSize2,
            clickEvent: function (page_index, _this) {
                $("#pageNo2").val(page_index + 1);
                fn2();
            }
        });
    }

    //待放款
    function initData2() {
        params2.pageNo = $('#pageNo2').val();
        var _table = $('#productTableList2');
        _table.empty();
        $.ajax({
            url: basePath + '/product/vip/debt',
            type: 'post',
            dataType: 'json',
            data: params2,
            cache: false,
            async: false,
            success: function (data) {
                var result = $.parseJSON(data);
                var html = [];
                if (result.count > 0) {
                    $.each(result.data, function (i, o) {
                        var str = '';
                        var awardRate = o.awardRate;
                        if (awardRate > 0) {
                            str += '%+' + awardRate;
                        }
                        if(o.awardType != '2' && o.awardRate>0){
                            str+='<i class="jiaxi-icon">奖励</i>'
                        }
                        var minAmtStr = formatCurrency(o.minAmt) + "";
                        minAmtStr = minAmtStr.substring(0, minAmtStr.indexOf("."));
                        var remainAmountStr = formatCurrency(o.remainAmount) + '';
                        remainAmountStr = remainAmountStr.substring(0, remainAmountStr.indexOf("."));
                        var text = "";
                        if (awardRate > 0) {
                            text = "<i></i>"
                        }
                        if (o.awardType == '2') {
                            text = '<i class="new-hard-icon"></i>'
                        }
                        var iconClass='';
                        var iconStr='';
                        var lbdClass = '';
                        var lbdClassStr = '';
                        switch (o.prdType){
                            case "1":
                                iconClass='sn';
                                iconStr='农';
                                break;
                            case "0":
                                iconClass="qn";
                                iconStr='企';
                                break;
                            case "4":
                                iconClass="cb";
                                iconStr="车";
                                break;
                            case "3":
                                iconClass='lb';
                                iconStr="保";
                                lbdClass ='bxcb'
                                lbdClassStr = '保险承保';
                                break;
                            case "2":
                                iconClass='wh';
                                iconStr="微";
                                break;
                            default:
                                iconClass='sn';
                                iconStr='农';
                                break;
                        }
                        var icon='<span class="u-label label-'+iconClass+'">'+iconStr+'</span>';
                            var lbdIcon =(lbdClass=='bxcb')?'<span class="u-label label-'+lbdClass+'">'+lbdClassStr+'</span>':'';
                            html.push('<div class="group complete"><ul class="clearfix">');
                            html.push('<li class="name">',icon, o.loanTitle, lbdIcon,text, '</li>');
                            html.push('<li class="type">',o.prdTypeName, '</li>');
                            html.push('<li class="rate"><span class="text-info rate">', o.loanRate, '</span><span class="text-info decimal">', str, '%</span>', '</li>');
                            html.push('<li class="term">', (o.remainDaysStr||'0'), '</li>');
                            html.push('<li class="money">', o.repayMode, '</li>');
                            html.push('<li class="surplus">', formatCurrency(o.transferPrice)||'0.00', '</li>');
                            if (o.applyStatus== "2") {
                                html.push('<li class="status"', ' loan_url="', basePath, '/transfer/detail/', o.transferApplyId, '"><a href="javascript:;;"class="btn btn-invest">我要受让</a></li>');
                            } else  {
                                html.push('<li class="status repay" loan_url="', basePath, '/transfer/detail/', o.transferApplyId, '"  >已转让</li>');
                            } 
                            html.push('</ul></div>');
                    });

                } else {
                	html.push('<div class="text-c pt-30 pb-10"><img class="record" src="/public/images/user/record.png"></div>');
                }
                _table.append(html.join(''));
                totalCount2 = result.count;
                if (totalCount2 > pageSize2) {
                    fn2 = initData2;
                    $('#laypage2').show();
                } else {
                    $('#laypage2').hide();
                }
                productList.setProgress2();
                productList.setListLevel2();
            }
        });
    }
    (function () {
        initData();
        initPage();
        initData2();
        initPage2();
    })();
}();