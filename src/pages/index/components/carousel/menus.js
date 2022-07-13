(function () {
    var menusBox = document.getElementById('menus-box');
    var bannerNavUl = document.getElementById('banner-nav-ul');
    var bannerNav = document.getElementById('banner-nav');
    var menus = document.querySelectorAll('.menus-box .menu');
    var lis = document.querySelectorAll('#banner-nav-ul li');
    bannerNavUl.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            //清除menu中的current属性
            for (var i = 0; i < menus.length; i++) {
                menus[i].className = 'menu';
            }
            //清除li中的current
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = lis[i].getAttribute('data-t');
            }
            var t = e.target.getAttribute('data-t');
            var menuT = document.querySelector('.menus-box .menu[data-t=' + t + ']');
            var liT = document.querySelector('#banner-nav-ul .' + t + '');
            menuT.className = 'menu current';
            liT.className = t + ' current';
        }
    }
    bannerNav.onmouseleave = function () {
        //清除menu和li中的current属性
        for (var i = 0; i < menus.length; i++) {
            menus[i].className = 'menu';
            lis[i].className = lis[i].getAttribute('data-t');
        }
    }
})();