function zere_one_page_test() {
	var ss = 100;// 约定一个公约数, 加快算法速度,降低内存使用
	var list = new Array();
	// zere_one_page_create(红包限定金额,红包金额,数据库id)
	list.push(zere_one_page_create(30000 / ss, 300, '1111'));
	list.push(zere_one_page_create(20000 / ss, 258, '2222'));
	list.push(zere_one_page_create(20000 / ss, 160, '3333'));
	list.push(zere_one_page_create(10000 / ss, 50, '4444'));
	var pag = 40000 / ss;
	var result = zere_one_page_table(pag, list);
	console.log(result);

}

function zere_one_page_table(pag, list) {
	var n = list.length;
	// 初始化f[0][1~pag]=0;f[1-n][o]=0;这样才能根据初始化根据公式推算其他的值！

	var f = new Array(); // 先声明一维
	for (var i = 0; i < (n + 1); i++) { // 一维长度为5
		f[i] = new Array(i); // 在声明二维
		for (var j = 0; j < (pag + 1); j++) { // 二维长度为5
			f[i][j] = 0;
		}
	}

	// 01背包算法f[i][j]=MAX{f[i-1][j-w[i]]+p[i](j>=w[i],f[i-1][j])}
	// 算法核心部分：根据公式进行推算！！！！！
	for (var i = 1; i <= n; i++) {
		for (var j = 1; j <= pag; j++) {
			if (j >= list[i - 1].w) {
				f[i][j] = Math.max(f[i - 1][j - list[i - 1].w] + list[i - 1].p,
						f[i - 1][j]);
			} else {
				f[i][j] = f[i - 1][j];
			}
		}
	}
	// 输出最大值
//	console.log("the max value is: " + f[n][pag]);
	// 输出装的物品
//	console.log("list of selected items: ");

	var result = new Array();
	var x = pag;
	for (var i = n; i > 0; i--) {
		if (f[i][x] > f[i - 1][x]) {
//			console.log((i - 1) + "(id:" + list[i - 1].id + ",w:"
//					+ list[i - 1].w + ",p:" + list[i - 1].p + ")");
			x -= list[i - 1].w;
			result.push(list[i - 1]);
		}
	}
	return result;
}

function zere_one_page_create(w, p, id) {
	var object = new Object();
	object.w = w;
	object.p = p;
	object.id = id;
	object.get = function() {
		console.log(this.w + ", " + this.p + ", " + this.id);
	}
	return object;
}
function zere_one_page_total(list){
	var total=0;
	for (var i = 0; i < list.length; i++) {
		total+=list[i].p;
	}
	return total;
}