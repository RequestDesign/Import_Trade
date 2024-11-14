import Swiper from 'swiper';
import 'swiper/css';
import { removeClasses, remToPx } from '../utils/utils';
import {
    Navigation,
    Autoplay,
    Pagination,
    EffectFade,
    Thumbs,
    EffectCreative,
    Controller
} from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

export function initHeroSlider() {
    function addThumbsClasses(swiper) {
        const thumbs = document.querySelectorAll('.carousel-brands-hero__item');

        if (thumbs.length) {
            removeClasses(thumbs, '_is-active');
            thumbs[swiper.realIndex].classList.add('_is-active');
        }
    }

    if (document.querySelector('.hero_mainpage .hero__swiper')) {
        new Swiper('.hero_mainpage .hero__swiper', {
            modules: [Autoplay, EffectCreative, Pagination],
            speed: 800,
            loop: true,
            direction: 'horizontal',
           
            allowTouchMove: false,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                reverseDirection: true, 
            },
            // effect: 'creative',
            // creativeEffect: {
            //     prev: {
            //         translate: [0, 0, 0]
            //     },
            //     next: {
            //         translate: [0, '-100%', 0]
            //     }
            // },
            pagination: {
                el: '.hero_mainpage .hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            on: {
                realIndexChange: (swiper) => {
                    addThumbsClasses(swiper);
                }
            }
        });
    }
}

function setActiveClasses(idx, items) {
    const currentItem = items[idx];

    if (items.length && currentItem) {
        removeClasses(items, '_is-active');
        currentItem.classList.add('_is-active');
    }
}

function removeWrapperStylingOnDesk(swiper) {
    if (!mm.matches) {
        setTimeout(() => {
            swiper.autoplay && swiper.autoplay.pause();
            swiper.wrapperEl.removeAttribute('style');
            swiper.slides.forEach((slide) => slide.removeAttribute('style'));
        }, 1000);
    } else if (swiper.autoplay) {
        swiper.autoplay.resume();
    }
}

function initStaticSlider(prev, next, slides, items) {
    let i = 0;

    function addActiveClass() {
        removeClasses(slides, '_is-active');
        slides[i].classList.add('_is-active');

        if (items.length) {
            setActiveClasses(i, items);
        }
    }

    if (slides.length) {
        addActiveClass();

        if (next) {
            next.addEventListener('click', function () {
                i = i < slides.length - 1 ? ++i : 0;

                addActiveClass();
            });
        }
        if (prev) {
            prev.addEventListener('click', function () {
                i = i ? --i : slides.length - 1;

                addActiveClass();
            });
        }
    }
}

function initSlidersOnResize() {
    if (document.querySelector('.hero_franchising .hero__swiper')) {
        new Swiper('.hero_franchising .hero__swiper', {
            modules: [Autoplay, EffectCreative, Pagination],
            speed: 800,
            loop: true,
            effect: 'creative',
            creativeEffect: {
                prev: {
                    translate: [0, 0, 0]
                },
                next: {
                    translate: [0, '-100%', 0]
                }
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.hero_franchising .hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                768: { enabled: false }
            },
            on: {
                afterInit: (swiper) => {
                    !mm.matches && removeWrapperStylingOnDesk(swiper);
                },
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.steps__swiper')) {
        new Swiper('.steps__swiper', {
            modules: [Autoplay],
            speed: 800,
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: remToPx(1.6),
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            breakpoints: {
                768: { enabled: false }
            },
            on: {
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.advantages__swiper')) {
        new Swiper('.advantages__swiper', {
            modules: [Autoplay],
            speed: 800,
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: remToPx(1.6),
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

            breakpoints: {
                768: { enabled: false }
            },
            on: {
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.brands__swiper')) {
        const nextEl = document.querySelector('.brands__swiper-navigation .i-btn_arr-next');
        const prevEl = document.querySelector('.brands__swiper-navigation .i-btn_arr-prev');

        if (!mm.matches) {
            initStaticSlider(
                prevEl,
                nextEl,
                document.querySelectorAll('.brands__swiper-slide'),
                document.querySelectorAll('.brands__group')
            );
        } else {
            new Swiper('.brands__swiper', {
                modules: [Pagination],
                speed: 800,
                loop: true,
                pagination: {
                    el: '.brands__carousel-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: { 768: { enabled: false } },
                on: {
                    afterInit: (swiper) => {
                        setActiveClasses(swiper.realIndex, document.querySelectorAll('.brands__group'));
                    },
                    slideChange: (swiper) => {
                        setActiveClasses(swiper.realIndex, document.querySelectorAll('.brands__group'));
                    },
                    resize: (swiper) => {
                        removeWrapperStylingOnDesk(swiper);
                    }
                }
            });
        }
    }
    if (document.querySelector('.brands-carousel__swiper')) {
        new Swiper('.brands-carousel__swiper', {
            modules: [Autoplay],
            slidesPerView: 'auto',
            spaceBetween: remToPx(6),
            speed: 3000,
            allowTouchMove: false,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            breakpoints: { 768: { enabled: false } },
            on: {
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.shops-hero__swiper')) {
        const thumbs = new Swiper('.shops-hero__thumbs-swiper', {
            speed: 800,
            loop: true,
            slidesPerView: 2,
            spaceBetween: remToPx(3.2)
        });
        new Swiper('.shops-hero__swiper', {
            modules: [EffectFade, Navigation, Thumbs, Pagination],
            speed: 800,
            loop: true,
            spaceBetween: remToPx(10),
            navigation: {
                prevEl: '.shops-hero__swiper-navigation .i-btn_arr-prev',
                nextEl: '.shops-hero__swiper-navigation .i-btn_arr-next'
            },
            pagination: {
                el: '.shops-hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            thumbs: {
                swiper: thumbs
            },
            effect: mm.matches ? 'slide' : 'fade',
            breakpoints: {
                768: {
                    spaceBetween: 0,
                    allowTouchMove: false
                }
            }
        });
    }
}

function initSliders() {
    if (document.querySelector('.shops__swiper')) {
        new Swiper('.shops__swiper', {
            modules: [EffectFade, Navigation, Pagination],
            speed: 800,
            loop: true,
            effect: 'fade',
            allowTouchMove: false,
            navigation: {
                prevEl: '.shops__swiper-navigation .i-btn_arr-prev',
                nextEl: '.shops__swiper-navigation .i-btn_arr-next'
            },
            pagination: {
                el: '.shops__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            on: {
                init: (swiper) => {
                    setActiveClasses(swiper.realIndex, document.querySelectorAll('.shops__image-wrap'));
                },
                realIndexChange: (swiper) => {
                    setActiveClasses(swiper.realIndex, document.querySelectorAll('.shops__image-wrap'));
                }
            }
        });
    }
    if (document.querySelectorAll('.not-found__swiper').length) {
        document.querySelectorAll('.not-found__swiper').forEach((slider) => {
            new Swiper(slider, {
                modules: [Autoplay],
                slidesPerView: 'auto',
                spaceBetween: mm.matches ? remToPx(1.6) : remToPx(3.2),
                speed: 10000,
                direction: 'vertical',
                allowTouchMove: false,
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: slider.classList.contains('not-found__swiper_reversed') ? true : false
                }
            });
        });
    }
}

mm.addEventListener('change', initSlidersOnResize);

window.addEventListener('load', function () {
    initSlidersOnResize();
    initSliders();
});
