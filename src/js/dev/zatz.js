import $ from "jquery";
import Swiper from 'swiper';
import { Grid } from "swiper/modules";



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
    if (howOrder) {
        new Swiper(howOrder, {
            slidesPerView: 1.2,
            spaceBetween: 10,
            centeredSlides: true,
            breakpoints: {
                768: {
                    centeredSlides: false,
                    slidesPerView: 2,
                    simulateTouch: false
                }
            }
        })
    }
    const nonameShitenSlider = document.querySelector('.adv-3-blocks__c-swiper.swiper')
    if (nonameShitenSlider) {
        new Swiper(nonameShitenSlider, {
            spaceBetween: 15,
            centeredSlides: true,
            slidesPerView: 1.2,
            breakpoints: {
                768: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    centeredSlides: false

                }
            }
        })
    }
    const startStags = document.querySelector(".start-stages")
    if (startStags) {
        new Swiper(startStags.querySelector('.swiper'), {
            modules: [Grid],

            slidesPerView: 1.2,
            slidesPerGroup: 1,
            grid: {
                rows: 1
            },
            spaceBetween: 10,
            centeredSlides: true,
            breakpoints: {
                768: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    centeredSlides: false,
                    grid: {
                        fill: 'row',
                        rows: 2
                    },
                }
            }
        })
    }

    const openStages = document.querySelector('.open-stages')
    if (window.innerWidth < 768 && openStages) {
        new Swiper(openStages.querySelector('.swiper'), {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 15
        })

    }

}