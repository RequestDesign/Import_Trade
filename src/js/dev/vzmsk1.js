import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { initHeroSlider } from '../lib/swiper';
import { _slideDown, _slideToggle, _slideUp, removeClasses } from '../utils/utils';

const mm = gsap.matchMedia();
const mq = window.matchMedia('(max-width: 768px)');

const animations = {
    initHeroAnimation() {
        if (document.getElementById('hero-screen')) {
            const tl = gsap.timeline();

            tl.fromTo(
                '.header',
                {
                    translateY: '-110%'
                },
                {
                    translateY: 0
                },
                0.5
            );
            tl.clipLTR('#hero-head', {}, 0.7);
            tl.fadeIn('#hero-body', {
                onStart: initHeroSlider,
                onComplete: () => {
                    tl.kill();
                    document.querySelector('.header').removeAttribute('style');
                }
            });
        }
    },
    initAboutScreenAnimation() {
        if (document.getElementById('about-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#about-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .to('#about-screen-heading span', {
                    '--width': '100%',
                    duration: 0.6,
                    stagger: 0.6
                })
                .fadeIn('#about-screen-body', {}, 0.3)
                .fadeIn(document.querySelectorAll('.about__numbers')[0], {}, 0.6)
                .clipTTB('.numbers-about__item:not(:first-child)', { duration: 0.3, stagger: 0.3 }, 1.);
        }
    },
    initActivitiesScreenAnimation() {
        if (document.getElementById('activities-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#activities-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .clipLTR('.activities__heading', {})
                // .fadeIn('.activities__body', 1)
                // .fadeIn('.franchising-activities__image', 1.7)
                // .fadeIn('.franchising-activities__content', 2.5);
        }
    },
    initSaleScreenAnimation() {
        if (document.getElementById('sale-screen')) {
            const ROW_GAP = '4.5rem';
            const IMAGE_WIDTH = '113.5rem';
            const IMAGE_HEIGHT = '56rem';
            const HEADING_SIZE = '4.8rem';

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#sale-screen',
                    start: 'top 70%',
                    end: '+=500',
                    once: true
                }
            })
                .to('.sale__head', { '--opacity': 1 }, 0.5)
                .clipLTR('.sale ._cl', {}, 0.5)
                .to(
                    '.sale__image-wrap',
                    {
                        left: 0,
                        top: '100%',
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        translateY: ROW_GAP,
                        onStart: () => {
                            gsap.to('.sale__head', { duration: 0.5, '--opacity': 0 });
                        }
                    },
                    1.5
                )
                .to(
                    '.sale__heading',
                    {
                        color: '#da251e',
                        fontSize: HEADING_SIZE,
                        width: 'auto'
                    },
                    1.5
                )
                .to(
                    '.sale__heading-txt_left',
                    {
                        marginRight: '1rem',
                        onComplete: () => {
                            document.querySelector('.sale__badge').style.display = 'inline-flex';

                            gsap.timeline().fadeIn('.sale__badge');
                        }
                    },
                    1.5
                )
                .fadeIn('.sale__list-item', { duration: 0.3, }, 1.5)  //stagger: 0.6 
                .fadeIn('.sale__btn', {duration: 0.3,
                    onStart: () => {
                        gsap.to('.sale__content', {
                            '--width': '100%'
                        });
                    }
                }, 1.5);
        }
    },
    initClipAnimation() {
        if (document.querySelector('[data-clip-st]')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '[data-clip-st]',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('[data-clip-st]')
                .clipLTR('[data-clip-st]', {}, 0);
        }
    },
    initContactsScreenAnimation() {
        if (document.getElementById('contacts-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#contacts-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('.contacts-map__map')
                .clipLTR('.contacts-map__content', {}, 0);
        }
    },
    initFactsScreenAnimation() {
        if (document.getElementById('facts-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#facts-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .clipLTR('.facts__heading')
                .fadeIn('.facts__grid', {}, 0)
                .fadeIn('.facts__cell_has-link');
        }
    },
    initEconomyScreenAnimation() {
        if (document.getElementById('economy-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#economy-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('.economy__image-wrap')
                .clipLTR('.economy__heading', {}, 0)
                .clipLTR('.economy__list');
        }
    },
    initBrandsScreenAnimation() {
        if (document.getElementById('brands-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#brands-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
        
                
                .fadeIn('.brands__info')
                .fadeIn('.brands__group, .brands__carousel')
                // .clipLTR('.brands__heading, .brands__text-wrap', {}, 0)
                
                // .fadeIn('.brands__swiper-navigation, .brands__swiper')
                // .fadeIn('.brands__btn');
        }
    },
    initShopsScreenAnimation() {
        if (document.getElementById('shops-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#shops-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('.shops__body, .shops__images')
                // .fadeIn('.shops__swiper, .shops__controls')
                // .fadeIn('.shops__link');
        }
    },
    initFAQScreenAnimation() {
        if (document.getElementById('faq-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#faq-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .clipLTR('.faq__head')
                .fadeIn('.faq__body', {}, 0)
                // .fadeIn('.faq__tab-container')
                // .fadeIn('.faq__image-wrap');
        }
    },
    initShopHeroScreenAnimation() {
        if (document.getElementById('shop-hero-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#shop-hero-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('.shop-hero__container')
                .clipLTR('.shop-hero__heading, .shop-hero__text', {}, 0)
                .fadeIn('.shop-hero__bg-image');
        }
    },
    initWholesaleHeroAnimation() {
        if (document.getElementById('wholesale-hero-screen')) {
            const tl = gsap.timeline();

            tl.fromTo(
                '.header',
                {
                    translateY: '-110%'
                },
                {
                    translateY: 0
                },
                0.5
            );
            tl.clipLTR('.wholesale-hero__head', {}, 0.3);
            tl.fadeIn('.wholesale-hero__content', {}, 0.5);
            tl.fadeIn('.wholesale-hero__btn, .wholesale-hero__image-wrap', {
                onComplete: () => {
                    tl.kill();
                    document.querySelector('.header').removeAttribute('style');
                }
            });
        }
    },
    initConditionsScreenAnimation() {
        if (document.getElementById('conditions-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#conditions-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .clipLTR('.conditions__heading')
                // .fadeIn('.conditions__body', {}, 0.7)
                // .fadeIn('.conditions-accordion-tabs__body');
        }
    },
    initAboutShopsScreenAnimation() {
        if (document.getElementById('about-shops-screen')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#about-shops-screen',
                    start: 'top 40%',
                    end: '+=500',
                    once: true
                }
            })
                .fadeIn('.about-shops__container')
                // .fadeIn('.about-shops__image-wrap', {}, 0)
                // .fadeIn('.about-shops__text, .about-shops__btn', 1.2)
                .clipTTB('.about-shops__list-item', { duration: 0.3, stagger: 0.3 }, 0.6);
        }
    },

    initHeadingBodyAnimation() {
        if (document.querySelectorAll('[data-heading-body-st]').length) {
            document.querySelectorAll('[data-heading-body-st]').forEach((section) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 40%',
                        end: '+=500',
                       
                        once: true
                        
                    }
                })
                    .clipLTR(section.querySelector('[data-heading-st]'))
                    .fadeIn(section.querySelector('[data-body-st]'));
            });
        }
    },
    initBodyAnimation() {
        if (document.querySelectorAll('[data-section-st]').length) {
            document.querySelectorAll('[data-section-st]').forEach((section) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 40%',
                        end: '+=500',
                        once: true
                    }
                }).fadeIn(section);
            });
        }
    }
};

const utils = {
    setGsapDefaults() {
        gsap.defaults({
            duration: 1
        });
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerEffect({
            name: 'fadeIn',
            effect: (targets, config, pst) => {
                return gsap.fromTo(
                    targets,
                    { opacity: 0, visibility: 'hidden' },
                    { opacity: 1, visibility: 'visible', ...config },
                    pst ? { position: pst } : null
                );
            },
            extendTimeline: true
        });
        gsap.registerEffect({
            name: 'clipTTB',
            effect: (targets, config, pst) => {
                return gsap.fromTo(
                    targets,
                    { 'clip-path': 'polygon(0 0, 100% 0%, 100% 0, 0 0)' },
                    { 'clip-path': 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)', ...config },
                    pst ? { position: pst } : null
                );
            },
            extendTimeline: true
        });
        gsap.registerEffect({
            name: 'clipLTR',
            effect: (targets, config, pst) => {
                return gsap.fromTo(
                    targets,
                    { 'clip-path': 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
                    { 'clip-path': 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)', ...config },
                    pst ? { position: pst } : null
                );
            },
            extendTimeline: true
        });
    },
    setSaleImgWidth() {
        const image = document.querySelector('.sale__image-wrap');

        if (image) {
            setTimeout(() => {
                const GAP = 20;

                const containerWidth = document.querySelector('.sale__head').getBoundingClientRect().width;
                const fwWidth = document
                    .querySelector('.sale__heading-txt_left')
                    .getBoundingClientRect().width;
                const swWidth = document
                    .querySelector('.sale__heading-txt_right')
                    .getBoundingClientRect().width;
                const width = containerWidth - (fwWidth + swWidth);

                image.style.width = width - GAP * 2 + 'px';
                image.style.left = fwWidth + GAP + 'px';
            }, 500);
        }
    },
    // initAccordionTabs() {
    //     const tabs = document.querySelectorAll('[data-accordion-tabs]');

    //     if (tabs.length) {
    //         tabs.forEach((block) => {
    //             const titles = Array.from(block.querySelectorAll('[data-accordion-tabs-item]'));
    //             const content = block.querySelectorAll('[data-accordion-tabs-content]');
    //             const body = block.querySelector('[data-accordion-tabs-body]');

    //             function removeActiveClasses() {
    //                 removeClasses(titles, '_is-active');
    //                 removeClasses(content, '_is-active');
    //             }

    //             function setActiveClasses(idx) {
    //                 if (content[idx]) {
    //                     const isActive = titles[idx].classList.contains('_is-active');

    //                     removeActiveClasses();

    //                     if (mq.matches && block.dataset.accordionTabs !== 'tabs') {
    //                         content.forEach((el, index) => {
    //                             if (index !== idx) {
    //                                 _slideUp(el);
    //                             }
    //                         });

    //                         if (!isActive) {
    //                             titles[idx].classList.add('_is-active');
    //                             _slideDown(content[idx]);
    //                         } else {
    //                             titles[idx].classList.remove('_is-active');
    //                             _slideUp(content[idx]);
    //                         }
    //                     } else {
    //                         content[idx].classList.add('_is-active');
    //                         titles[idx].classList.add('_is-active');
    //                     }
    //                 }
    //             }

    //             function clickHandler(e) {
    //                 const target = e.target.closest('[data-accordion-tabs-item]');

    //                 if (target) {
    //                     setActiveClasses(titles.indexOf(target));
    //                 }
    //             }

    //             if (!mq.matches || block.dataset.accordionTabs === 'tabs') {
    //                 content[0].classList.add('_is-active');
    //             } else {
    //                 removeActiveClasses();
    //             }

    //             titles[0].classList.add('_is-active');

    //             for (let i = 0; i < titles.length; i++) {
    //                 const title = titles[i];
    //                 const contentItem = content[i];
    //                 const parent = title.parentElement;

    //                 if (mq.matches && block.dataset.accordionTabs !== 'tabs') {
    //                     parent.append(contentItem);
    //                     if (i !== 0) _slideUp(contentItem);
    //                 } else if (body) {
    //                     body.append(contentItem);
    //                     contentItem.removeAttribute('hidden');
    //                 }
    //             }

    //             block.addEventListener('click', clickHandler);
    //         });
    //     }
    // }
    initAccordionTabs() {
        const tabs = document.querySelectorAll('[data-accordion-tabs]');
    
        if (tabs.length) {
            tabs.forEach((block) => {
                const titles = Array.from(block.querySelectorAll('[data-accordion-tabs-item]'));
                const content = block.querySelectorAll('[data-accordion-tabs-content]');
                const body = block.querySelector('[data-accordion-tabs-body]');
    
                let activeTabIndex = 0; // Индекс текущего активного таба
                let autoChangeInterval; // Интервал автоматической смены табов
    
                function removeActiveClasses() {
                    removeClasses(titles, '_is-active');
                    removeClasses(content, '_is-active');
                }
    
                function setActiveClasses(idx) {
                    if (content[idx]) {
                        const isActive = titles[idx].classList.contains('_is-active');
    
                        removeActiveClasses();
    
                        if (mq.matches && block.dataset.accordionTabs !== 'tabs') {
                            content.forEach((el, index) => {
                                if (index !== idx) {
                                    _slideUp(el);
                                }
                            });
    
                            if (!isActive) {
                                titles[idx].classList.add('_is-active');
                                _slideDown(content[idx]);
                            } else {
                                titles[idx].classList.remove('_is-active');
                                _slideUp(content[idx]);
                            }
                        } else {
                            content[idx].classList.add('_is-active');
                            titles[idx].classList.add('_is-active');
                        }
    
                        activeTabIndex = idx; // Обновляем индекс текущего активного таба
                    }
                }
    
                function clickHandler(e) {
                    const target = e.target.closest('[data-accordion-tabs-item]');
    
                    if (target) {
                        setActiveClasses(titles.indexOf(target));
                    }
                }
    
                function autoChangeTab() {
                    activeTabIndex = (activeTabIndex + 1) % titles.length; // Увеличиваем индекс активного таба на 1, обеспечивая циклическую смену
                    setActiveClasses(activeTabIndex);
                }
    
                if (!mq.matches || block.dataset.accordionTabs === 'tabs') {
                    content[0].classList.add('_is-active');
                } else {
                    removeActiveClasses();
                }
    
                titles[0].classList.add('_is-active');
    
                for (let i = 0; i < titles.length; i++) {
                    const title = titles[i];
                    const contentItem = content[i];
                    const parent = title.parentElement;
    
                    if (mq.matches && block.dataset.accordionTabs !== 'tabs') {
                        parent.append(contentItem);
                        if (i !== 0) _slideUp(contentItem);
                    } else if (body) {
                        body.append(contentItem);
                        contentItem.removeAttribute('hidden');
                    }
                }
    
                block.addEventListener('click', clickHandler);
    
                // Проверяем, является ли устройство десктопным, и если да, то запускаем автоматическую смену табов
                if (!window.matchMedia("(max-width: 767px)").matches) {
                    autoChangeInterval = setInterval(autoChangeTab, 10000);
                }
    
                // Останавливаем автоматическую смену табов при изменении размера экрана
                window.addEventListener('resize', () => {
                    if (!window.matchMedia("(max-width: 767px)").matches) {
                        autoChangeInterval = setInterval(autoChangeTab, 10000);
                    } else {
                        clearInterval(autoChangeInterval);
                    }
                });
            });
        }
    }
    
    
    
};

utils.setGsapDefaults();

window.addEventListener('load', function () {
    document.body.style.opacity = 1;

    utils.initAccordionTabs();

    setTimeout(() => {
        document.documentElement.classList.add('_page-loaded');
    }, 1000);

    if (mq.matches) {
        initHeroSlider();
    }

    mq.addEventListener('change', function () {
        utils.initAccordionTabs();
    });
    mm.add('(min-width: 768px)', () => {
        animations.initHeroAnimation();
        animations.initAboutScreenAnimation();
        animations.initActivitiesScreenAnimation();
        animations.initSaleScreenAnimation();
        animations.initClipAnimation();
        animations.initContactsScreenAnimation();
        animations.initFactsScreenAnimation();
        animations.initEconomyScreenAnimation();
        animations.initBrandsScreenAnimation();
        animations.initShopsScreenAnimation();
        animations.initFAQScreenAnimation();
        animations.initShopHeroScreenAnimation();
        animations.initWholesaleHeroAnimation();
        animations.initConditionsScreenAnimation();
        animations.initAboutShopsScreenAnimation();

        animations.initHeadingBodyAnimation();
        animations.initBodyAnimation();

        utils.setSaleImgWidth();
    });
});
