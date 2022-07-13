import { ELEMENT_NODE_TYPE ,
    SLIDER_ANIMATION_CLASS_NAME} from "./constants";
import DEFAULTS from './defaults';

class BaseSlider {
    constructor(el,options) {
        if(el.nodeType !== ELEMENT_NODE_TYPE) {
            throw new ERROR('实例化的时候请传入DOM元素');
        }

        this.options = {
            ...DEFAULTS,
            ...options
        }

        //获得el
        const sliderEl = el;
        const sliderContentEl = sliderEl.querySelector('.slider-content');
        const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');
        this.sliderEl=sliderEl;
        this.sliderContentEl=sliderContentEl;
        this.sliderItemEls=sliderItemEls;

        //索引值
        this.minIndex = 0;
        this.maxIndex = sliderItemEls.length-1;
        this.currIndex = this.getCorrectIndex(this.options.initialIndex);

        //item的宽度即每次移动距离
        this.itemWidth = sliderItemEls[0].offsetWidth;

        //初始化
        this.init();
    }

    //获得修正后的索引值
    getCorrectIndex(index){
        if(index<this.minIndex) return this.maxIndex;
        if(index>this.maxIndex) return this.minIndex;
        return index;
    }

    //初始化
    init(){
        //设置每个li的宽度
        this.setItemsWidth();

        //设置content的宽度
        this.setContentWidth();

        //切换到开始索引的位置
        this.move(this.getDistance());

        //开启动画
        if(this.options.animation) {
            this.openAnimation();
        }

        //自动切换
        if(this.options.autoplay) {
            this.autoplay();
        }
    }

    //设置每个li的宽度
    setItemsWidth(){
        for(const item of this.sliderItemEls) {
            item.style.width = `${this.itemWidth}px`;
        }
    }
    //设置content的宽度
    setContentWidth(){
        this.sliderContentEl.style.width = `${this.itemWidth * this.sliderItemEls.length}px`;
    }

    //切换到开始索引的位置
    getDistance(index = this.currIndex){
        return -this.itemWidth * index;
    }
    //不带动画的移动
    move(distance){


        this.sliderContentEl.style.transform = `translate3d(${distance}px,0px,0px)`;

    }
    //带动画的移动
    moveWithAnimation(distance){
        this.setAnimationSpeed();
        this.move(distance);
        this.sliderContentEl.addEventlistener('transitionend',()=>{
            this.closeAnimation();
        },false)
    }

    //开启动画
    openAnimation(){
        this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
    }
    //关闭动画
    closeAnimation(){
        this.setAnimationSpeed(0);
    }
    //设置动画速度
    setAnimationSpeed(speed = this.options.speed) {
        this.sliderContentEl.style.transitionDuration = `${speed}ms`;
    }

    //切换到index索引对应的幻灯片
    to(index){
        index = this.getCorrectIndex(index);
        if(this.currIndex === index) return;
        this.currIndex = index;
        const distance = this.getDistance();
        if(this.options.animation){
            this.moveWithAnimation(distance);
        } else {
            this.move(distance);
        }
    }
    //切换下一张
    next(){
        this.to(this.currIndex + 1);
    }
    //切换上一张
    prev(){
        this.to(this.currIndex - 1);
    }
    //自动切换
    autoplay(){
        const {autoplay} = this.options;
        if(autoplay <= 0) return;
        this.pause();
        this.autoplayTimer = setInterval(()=>{
            this.next();
        },autoplay)
    }
    //暂停自动切换
    pause(){
        clearInterval(this.autoplayTimer);
    }
}

export default BaseSlider;