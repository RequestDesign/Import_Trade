import $ from "jquery";
import Swiper from 'swiper';



$(function () {

    initSwipers()
})


function initSwipers() {
    const collections = document.querySelectorAll('.collections__category-swiper.swiper')
    if (window.innerWidth < 768 && collections) {

        collections.forEach((c) => {
            new Swiper(c, {
                slidesPerView: 2.2,
            })
        })
    }

    const howOrder = document.querySelector('.how-order__c-swiper.swiper')
    if(howOrder){
        new Swiper(howOrder,{
            slidesPerView: 1.2,
            spaceBetween: 10,
            centeredSlides: true,
            breakpoints:{
                768:{
                    centeredSlides: false,
                    slidesPerView: 2,
                    simulateTouch: false
                }
            }
        })
    }

}