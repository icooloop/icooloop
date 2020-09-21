/**
 * Created by lidy on 2017/12/21.
 */
/**
 *
 * @param {type} radius 圆环半径
 * @param {type} lineWidth 圆环宽度
 * @param {type} strokeStyle 默认背景
 * @param {type} fillStyleArray 数组，圆环色块颜色
 * @param {type} capType 类型：round是圆角，square正方形顶帽，butt是正常
 * @param {type} percentArray ，数字，每个占据的百分比
 * @param {type} startAngle 开始的角度
 *  @param {type} criclex，cricley 圆心坐标，一般是canvas的一半，例如：canvas给的宽度是250，高度是250，那么criclex是125
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }

}

var Circle = function () {
    function Circle(radius, lineWidth, opt, capType) {
        _classCallCheck(this, Circle);

        this.radius = radius; // 圆环半径
        this.lineWidth = lineWidth; // 圆环边的宽度
        this.bgStyle = opt.bgColor; //圆环的背景颜色
        this.lineCap = capType;
        this.title = opt.title;
    }

    _createClass(Circle, [{
        key: 'draw',
        value: function draw(ctx, criclex, cricley, opt) {
            ctx.beginPath();
            ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.bgStyle;
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.font = 'bold 20px 微软雅黑';
            ctx.fillText(this.title, criclex - 40, criclex * 2 + 40);
        }
    }]);

    return Circle;
}();

var Ring = function () {
    function Ring(radius, lineWidth, opt, capType) {
        _classCallCheck(this, Ring);

        this.circle = new Circle(radius, lineWidth, opt, capType);
    }

    _createClass(Ring, [{
        key: 'drawRing',
        value: function drawRing(ctx, startAngle, list, criclex, cricley) {
            var _this = this;

            startAngle = startAngle || 1.5 * Math.PI;
            var list = list || [];
            this.circle.draw(ctx, criclex, cricley); // 调用Circle的draw方法画圈圈
            var radius = criclex - 20; //半径
            var ox = radius + 20,
                oy = radius + 20; //圆心
            var width = 8,
                height = 8; //图例宽和高
            var posX = ox * 2 + 30,
                posY = 30; //
            var textX = posX + width + 8,
                textY = posY + 10;
            // angle
            list.forEach(function (item, index) {
                ctx.beginPath();
                var anglePerSec = 2 * Math.PI / (100 / item.val); // 蓝色的弧度
                ctx.arc(criclex, cricley, _this.circle.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致
                startAngle = startAngle + anglePerSec;
                ctx.strokeStyle = list[index].color;
                ctx.lineCap = _this.circle.lineCap;
                ctx.stroke();
                ctx.closePath();
                ctx.fillStyle = item.color;
                ctx.fillRect(posX, posY + 30 * index, width, height);
                ctx.moveTo(posX, posY + 30 * index);
                ctx.font = 'normal 16px 微软雅黑';
                ctx.fillStyle = "#666"; //填充颜色
                ctx.textAlign = "left";
                var percent = item.text + "：" + item.val + "%";
                ctx.fillText(percent, textX, textY + 30 * index);
            });
            //小圆圈覆盖
            // ctx.beginPath();
            // ctx.arc(criclex, cricley, this.circle.radius, startAngle, startAngle, false); //这里的圆心坐标要和cirle的保持一致
            // ctx.strokeStyle = this.circle.fillStyle[0];
            // ctx.lineCap = this.circle.lineCap;
            // ctx.stroke();
            // ctx.closePath();
        }
    }]);

    return Ring;
}();

var setArea = function(element, w, h) {
    var ctx = element[0].getContext('2d');
    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    element.css({
        width: w + 200,
        height: h + 200
    }).prop({
        width: (w  + 200)* ratio,
        height: (h  + 200)* ratio
    });
    console.log(ratio);
    ctx.scale(ratio, ratio);
    return ctx;
}
