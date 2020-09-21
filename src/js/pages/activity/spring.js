/**
 * Created by lidy on 2018/1/26.
 */
(function () {
    function snow(top, left, height, bottom, src) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        div.appendChild(img);
        img.className = "roll";
        img.height = height;
        img.src = src;
        div.style.top = top + "px";
        if (Math.random() > .5) {
            div.style.left = left + "px";
        } else {
            div.style.right = left + "px";
        }
        div.style.height = bottom + "px";
        div.className = "div";
        document.getElementById("snowzone").appendChild(div);
        setTimeout(function () {
            document.getElementById("snowzone").removeChild(div);
            // console.log(window.innerHeight);
        }, 10000);
    }

    setInterval(function () {
        var top = Math.random() * 3 * 500;
        var left = Math.random() * 3 * 100;
        var height = Math.floor(Math.random() * 3 + 2) * 10;
        var bottom = Math.floor(Math.random() * 3 + 1) * 100;
        var src = "/public/images/activity/spring/f" + Math.floor(Math.random() * 3 + 1) + "@4x.png"; //两张图片分别为"s1.png"、"s2.png"
        snow(top, left, height, bottom, src);
    }, 500);
})();
