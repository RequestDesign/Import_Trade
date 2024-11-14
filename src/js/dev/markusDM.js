import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { removeClasses, remToPx } from '../utils/utils';
import { Navigation, Autoplay, Pagination, EffectFade, Thumbs, EffectCreative, Grid  } from 'swiper/modules';
import $ from "jquery";

if (document.querySelector('.show-d')) {
    const detailedGalleryThumbs = new Swiper('.show-d__right-swiper', {
        modules: [Thumbs, Navigation, EffectFade],
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
     
        freeMode: true,
        watchSlidesProgress: true,
        speed: 1200,
        slideToClickedSlide: true,
        breakpoints: {
            0: {
                spaceBetween: remToPx(1.6)
            },
            768: {
                spaceBetween: remToPx(2.8)
            }
        }
    });

    new Swiper('.show-d__swiper', {
        modules: [Thumbs, Navigation, EffectFade, Pagination],
        speed: 1200,
        effect: 'fade',
        navigation: {
            prevEl: '.show-d__right-navigation-prev',
            nextEl: '.show-d__right-navigation-next'
        },
        pagination: {
            el: '.show-d__carousel-pagination ',
            type: 'bullets',
            clickable: true
        },
    fadeEffect: {
      crossFade: true
    },
        grabCursor: true,
        thumbs: {
            swiper: detailedGalleryThumbs
        },
        slidesPerView: 1,
        breakpoints: {
            0: {
                spaceBetween: remToPx(3.2)
            },
            768: {
                spaceBetween: remToPx(1.6)
            }
        }
    });
}


new Swiper('.brand-d__swiper', {
    modules: [Thumbs, Navigation, Grid, Pagination],
    speed: 1200,
    slidesPerView: 1,
    grid: {
        rows: 1,
        fill: 'row',
    },
    pagination: {
        el: '.brand-d__carousel-pagination',
        type: 'bullets',
        clickable: true
    },

    breakpoints: {
        0: {
           
        },
        768: {
            spaceBetween: remToPx(3.2),
            slidesPerView: 3,
            grid: {
                rows: 2,
                fill: 'row',
            },
        }
    }
});


$(document).ready(function() {
    $('.primary-scroll').on('click', function(event) {
        event.preventDefault();
        var target = $(this).data('target');
        var $target = $(target);

        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 1000);
        }
    });
});


$('.header__select').on('click', '.header__select-head', function () {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).next().fadeOut();
    } else {
        $('.header__select-head').removeClass('open');
        $('.header__select-list').fadeOut();
        $(this).addClass('open');
        $(this).next().fadeIn();
    }
});

$('.header__select').on('click', '.header__select-item', function () {
    $('.header__select-head').removeClass('open');
    $(this).parent().fadeOut();
    $(this).parent().prev().text($(this).text());
    $(this).parent().prev().prev().val($(this).text());
});

$(document).click(function (e) {
    if (!$(e.target).closest('.header__select').length) {
        $('.header__select-head').removeClass('open');
        $('.header__select-list').fadeOut();
    }
});


