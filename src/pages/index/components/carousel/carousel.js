// 轮播图的js
// 防止设置全局变量所以每个小部分都是一个IIFE
(function() {
    //获得各个参数
    var carousel = document.getElementById('carousel');
    var leftBtn = document.getElementById('leftbtn');
    var rightBtn = document.getElementById('rightbtn');
    var circles = document.getElementById('circles');
    var banner = document.getElementById('banner');
    var circles_lis = circles.getElementsByTagName('li');

    //克隆最后一张图
    var clone_li = carousel.firstElementChild.cloneNode(true)
    carousel.appendChild(clone_li);

    //全局变量表示现在是哪张图
    var idx = 0;
    var lock = true

    //右按钮点击事件
    rightBtn.onclick = rightBtnHandler;
    //给函数取名以便调用
    function rightBtnHandler() {
        if(!lock) return;
        lock = false;

        idx ++;
        carousel.style.transform = 'translateX(-' + idx * 16.666 + '%)';
        carousel.style.transition = 'transform .5s ease 0s';
        //当图片到了最后一张要回去的时候
        if (idx > 4) {
            carousel.style.transform = 'translateX(-' + idx * 16.666 + '%)';
            setTimeout(function() {
                carousel.style.transition = 'none';
                idx = 0;
                carousel.style.transform = 'translateX(-' + idx * 16.666 + '%)';
            },500);
        }

        setTimeout(function() {
            lock = true;
        },500);

        setCircles();
    }

    //定时轮播事件
    var timer = setInterval(rightBtnHandler,2000);
    //鼠标在上面暂停
    banner.onmouseenter = function() {
        clearInterval(timer);
    }
    //鼠标离开继续
    banner.onmouseleave = function() {
        //设表先关
        clearInterval(timer);
        timer = setInterval(rightBtnHandler,2000);
    }
    
    //左按钮点击事件
    leftBtn.onclick = function() {
        if(!lock) return;
        lock = false;

        if (idx == 0) {
            carousel.style.transition = 'none';
            //将图片变成克隆的那张
            carousel.style.transform = 'translateX(-' + 5 * 16.666 + '%)';
            //使得圆点能接收到idx
            idx = 4;
            setTimeout(function() {
                //瞬间切换到倒数第一张图片
                carousel.style.transform = 'translateX(-' + idx * 16.666 + '%)';
                carousel.style.transition = 'transform .5s ease 0s';
            },0);
        } else {
            idx --;
            carousel.style.transform = 'translateX(-' + idx * 16.666 + '%)';
        }

        setTimeout(function() {
            lock = true;
        },500);

        setCircles();
    }

    //圆点变化形状事件
    function setCircles() {
        for (var i = 0; i < 5 ; i ++) {
            //01234%5的余数都是自己本身，当图片变化的时候可能值会是5，所以5%5得0又变成和第一张一样了
            if(i == idx % 5) {
                circles_lis[i].className = 'current';
            } else {
                circles_lis[i].className = '';
            }
        }
    }

    //圆点的事件监听
    circles.onclick = function(e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            var n = Number(e.target.getAttribute('data-n'));
            carousel.style.transform = 'translateX(-' + n * 16.666 + '%)';
            idx = n;
            setCircles();
        }
    }
})();