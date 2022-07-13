//import './slider.css';
import './btn.css';
import './circles.css';
import Slider from './module';

import render from './slider.art';
import { getData } from 'api/getData';
const layoutEl = document.getElementById('slider-layout');
getData('https://www.imooc.com/api/mall-PC/index/slider?icode=J6DDC8E3E7A8BF54C')
    .then(response => {
        layoutEl.innerHTML = render({
            items: response
        });

        const slider = new Slider(document.querySelector('.slider'), {
            initialIndex: 0,
            animation: true,
            speed: 300,
            autoplay: 1500
        });

        const leftBtn = document.getElementById('leftbtn');
        const rightBtn = document.getElementById('rightbtn');
        var lock = true;
        leftBtn.addEventListener('click', () => {
            slider.prev();
        }, false);
        rightBtn.addEventListener('click', () => {
            // if(!lock) return;
            // lock = false;

            slider.next();

            // setTimeout(function(){
            //     lock = true;
            // },1500)
        }, false);

        const bannerEl = document.getElementById('banner');
        bannerEl.addEventListener('mouseenter', () => {
            slider.pause();
        }, false)
        bannerEl.addEventListener('mouseleave', () => {
            slider.autoplay();
        }, false)
    })
    .catch(err => { console.log(err) });
