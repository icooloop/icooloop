/**
 * Created by Lidy on 2017/11/9.
 */
+function () {
    var ProductList = function () {//构造函数
        this.$productTableList = $("#productTableList");
        this.$productListGroup = this.$productTableList.children('.group');
        this.$recommendProductList = $("#recommendProductList");
        this.$monthChoose = $('#monthChoose');
        this.$titleList=$('#titleList');
    }
    ProductList.prototype = {
        init: function () {

            this.setProgress();
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
            this.$monthChoose.on('click', 'a', function () { //选择标月份
                $(this).parent().find('a').removeClass('active');
                $(this).addClass("active");
                var val = $(this).data("val");
                var type = $(this).parent().data('type');
                params[type]=val;
                $('#pageNo').val("1");
                initData()
                initPage();
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
        },
        setListLevel: function () {
            var $productListGroup = this.$productTableList.children('.group');
            var length = $productListGroup.length;
            $productListGroup.each(function (index) {//设置列表 zindex属性改变阴影效果层级
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
            this.$recommendProductList.find('li').each(function (index, item) {
                var $progressBar = $(this).find('.progress-bar');
                $progressBar.css({
                    width: parseInt($progressBar.data('progress')) + '%'
                })
            })
        }
    }
    var productList = new ProductList();
    productList.init();
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
            url: basePath + '/transfer/list',
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
                            case "5":
                                iconClass='wq';
                                iconStr="商";
                                break;
                            default:
                                iconClass='sn';
                                iconStr='农';
                                break;
                        }
                        var icon='<span class="label label-'+iconClass+'">'+iconStr+'</span>';
                        	 var lbdIcon = '&nbsp;<span class="label label-'+lbdClass+'"></span>'
                            html.push('<div class="group complete"><ul class="clearfix">');
                            html.push('<li class="name">',icon, o.loanTitle, lbdIcon,text, '</li>');
                            html.push('<li class="type">',o.prdTypeName, '</li>');
                            html.push('<li class="rate"><span class="text-info rate">', o.loanRate, '</span><span class="text-info decimal">', str, '%</span>', '</li>');
                            html.push('<li class="term">', (o.remainDaysStr||'0'), '</li>');
                            html.push('<li class="money">', o.repayMode, '</li>');
                            html.push('<li class="surplus">', formatCurrency(o.transferPrice)||'0.00', '</li>');
                            if (o.applyStatus== "2") {
                                html.push('<li class="status"', ' loan_url="', basePath, '/transfer/detail/', o.transferApplyId, '"><a href="javascript:;;"class="btn btn-second">我要受让</a></li>');
                            } else  {
                                html.push('<li class="status repay" loan_url="', basePath, '/transfer/detail/', o.transferApplyId, '"  >已转让</li>');
                            } 
                            html.push('</ul></div>');
                    });

                } else {
                    html.push('<div style="padding-top: 10px;">暂无记录</div>')
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

    function openUrl(obj) {
        window.location.href = $(obj).attr("loan_url");
    }

    (function () {
        initData();
        initPage();
    })();
}();