(function () {
    var backToTop = document.getElementById('backToTop');

    backToTop.onclick = function () {
        var timer;
        //设表先关
        clearInterval(timer);
        timer = setInterval(function () {
            document.documentElement.scrollTop -= 100;
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer);
            }
        }, 20);
    }

    //监听页面的滚动
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || window.scrollY;
        if (scrollTop == 0) {
            backToTop.style.display = 'none';
        }
        else {
            backToTop.style.display = 'block';
        }
    }
})()