// 百度地图API功能
	var map = new BMap.Map("allmap");

	var top_right_navigation = new BMap.NavigationControl();
	map.addControl(top_right_navigation);  

	var point1 = new BMap.Point(114.063624,22.538873);
	map.centerAndZoom(point1, 20);


	var marker = new BMap.Marker(point1);  // 创建标注
	map.addOverlay(marker);               // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

	
	// 添加文字指示
	var opts = {
	  position : point1,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-140, -80)    //设置文本偏移量
	}
	var label = new BMap.Label("深圳市亿钱贷电子商务有限公司", opts);  // 创建文本标注对象
	label.setStyle({
		borderRadius : "10px",
		textAlign : "center",
		color : "white",
		fontSize : "16px",
		lineHeight : "18px",
		fontFamily:"微软雅黑",	
		padding: "12px 30px",
		background: "rgba(34,97,201,.8)",
		border:"rgba(34,97,201,.8)"
	});
	setTimeout(function(){
		map.addOverlay(label);   
	})