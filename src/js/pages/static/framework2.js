
/**
 * Created by lidy on 2018/6/20.
 */
+function () {
    var framework = function () {// 构造函数

    }
    framework.prototype = {
        init: function () {
            //年龄结构
            var ctx = setArea($('#personAgeCanvas'), 180, 180);//设置宽高倍数
            var ring = new Ring(77, 26, {title:'年龄结构',bgColor:'#fff'}, "butt");
            ring.drawRing(ctx, 1.5 * Math.PI,totalArr, 90, 90);
            //学历结构
            var ctx2 = setArea($('#personEducationCanvas'), 180, 180);//设置宽高倍数
            var ring2 = new Ring(77, 26, {title:'学历结构',bgColor:'#fff'}, "butt");
            ring2.drawRing(ctx2, 1.5 * Math.PI,totalArr2, 90, 90);
        },
    }
    new framework().init();
}();