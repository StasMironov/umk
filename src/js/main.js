import Slider from './class/Slider.js';
import { gsap, TimelineMax, Back, Power1 } from 'gsap';
import Scrollbar from 'smooth-scrollbar';
import 'jquery.maskedinput/src/jquery.maskedinput.js';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// document.addEventListener('DOMContentLoaded', () => {
//     if ($('#ds_filter_catalog').exists()) {
//         let ds = '';
//         ds = document.getElementById('ds_filter_catalog');
//         const values = JSON.parse(localStorage.getItem(ds.id));

//         console.log(values);

//         if (values) {
//             if (values.length > 0) {
//                 for (let i = 0; i < values.length; ++i) {
//                     const el = ds[values[i][1]];

//                     if (el.type === 'checkbox') {
//                         el.setAttribute('checked', 'checked');
//                     } else {
//                         el.value = values[i][1];
//                     }
//                 }
//             }
//         }
//     }
// });


$.fn.exists = function () {
    return $(this).length;
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const projectFunc = {
    pinImage(image) {
        if ($(image).exists()) {
            try {
                gsap.utils.toArray(image).forEach((section, i) => {

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: section.parentElement,
                            scrub: true,
                            invalidateOnRefresh: true,
                            start: `${-section.offsetHeight - 350} center`,
                            end: `${section.offsetHeight + 20} center`,
                        }
                    })
                        .fromTo(section, {
                            yPercent: -25
                        }, {
                            yPercent: 0,
                            ease: "none"
                        });
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    objAd(element, place) {
        if ($(element).exists()) {
            $(element).each(function (index) {
                let adObj = $(this).html();
                $(place).html(adObj);
                $(this).remove();
            });
        }
    },

    objReturn(element, place) {
        if ($(element).exists()) {
            var t = '';
            t = $(element).html();
            return $(element);
        }
    },
    createSlider() {
        if ($('.js-slider-partners').exists()) {
            try {
                const partnerSlider = new Slider('.js-slider-partners', 2.9, 0);
                partnerSlider.createSlider();
                partnerSlider.updateSlider('loop', true);
                partnerSlider.updateSlider('arrow');
                partnerSlider.updateSlider('pagination');

                $(window).resize(function () {
                    if ($(this).width() <= 1024 && $(this).width() >= 621) {
                        partnerSlider.updateSlider('view', 1.9);
                        partnerSlider.updateSlider('center', true);
                    } else if ($(this).width() <= 621 && $(this).width() >= 320) {
                        partnerSlider.updateSlider('view', 1.4);
                        partnerSlider.updateSlider('center', true);
                    } else {
                        partnerSlider.updateSlider('view', 2.9);
                        partnerSlider.updateSlider('center', true);
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        if ($('.product-related__items').exists()) {
            try {
                const relatedSlider = new Slider('.product-related__items', 4, 36);
                relatedSlider.createSlider();
                relatedSlider.updateSlider('arrow');
                relatedSlider.updateSlider('pagination', 'custom');

                $(window).resize(function () {
                    if ($(this).width() <= 1024 && $(this).width() >= 621) {
                        relatedSlider.updateSlider('view', 2);
                        relatedSlider.updateSlider('space', 30);
                    }
                    if ($(this).width() <= 620 && $(this).width() >= 320) {
                        relatedSlider.updateSlider('view', 1);
                    }
                }).resize();
            }
            catch (err) {
                console.log(err);
            }
        }

        if ($('.js-history-slider').exists()) {
            try {
                const objSlider = new Slider('.js-history-slider', 1, 0);
                objSlider.createSlider();
                objSlider.updateSlider('effect', 'fade');
                objSlider.updateSlider('arrow');
                objSlider.updateSlider('pagination');
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    hiddenTabs(index) {
        if ($('.auth-popup').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                tabsEl = Array.prototype.slice.call(tabsEl);
                tabsEl = tabsEl.reverse();
                btnTab = Array.prototype.slice.call(btnTab);
                // btnTab = btnTab.reverse();

                const hideForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                tabsEl.forEach((element, i) => {
                    if (i !== index) {
                        hideForm
                            .to(
                                btnTab[i],
                                0.3,
                                {
                                    //fontSize: '35px',
                                    color: '#AAAAAA',
                                    ease: Power1.inOut
                                }
                            )
                            .to(
                                element,
                                0.3,
                                {
                                    autoAlpha: 0,
                                    display: 'none',
                                    ease: Power1.inOut
                                },
                                '-=0.3'
                            );

                        hideForm.play();
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    showTabs(index) {
        if ($('.auth-popup').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                tabsEl = Array.prototype.slice.call(tabsEl);
                tabsEl = tabsEl.reverse();
                const mainBloc = document.querySelector('.auth__box');

                const showForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 },
                    onStart: () => {
                        setTimeout(
                            () => {
                                tabsEl[index].style.display = 'block';
                                mainBloc.style.maxHeight = 191 + tabsEl[index].scrollHeight + `px`;
                                tabsEl[index].style.display = 'none';
                            },
                            100
                        );
                    }
                });

                showForm
                    .to(
                        btnTab[index],
                        0.3,
                        {
                            //fontSize: '45px',
                            color: '#38393F',
                            ease: Power1.inOut
                        }
                    )
                    .to(tabsEl[index],
                        0.3,
                        {
                            autoAlpha: 1,
                            display: 'block',
                            ease: Power1.inOut
                        },
                        '+=0.1'
                    );
                showForm.play();
            } catch (err) {
                console.log(err);
            }
        }
    },

    hoverTab(element, state) {
        const hoverTab = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        const hoverTabLeave = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        hoverTab
            .to(
                element,
                {
                    color: '#38393F'
                }
            );

        hoverTabLeave
            .to(
                element,
                {
                    color: '#AAAAAA'
                }
            );

        if (state) {
            hoverTab.play();
            hoverTabLeave.reverse();
        } else {
            hoverTabLeave.play();
            hoverTab.reverse();
        }
    },

    setTabs() {
        if ($('.auth-popup__link').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                projectFunc.hiddenTabs(1);

                btnTab.forEach((element, i) => {
                    element.addEventListener('click', function () {
                        projectFunc.showTabs(i);
                        projectFunc.hiddenTabs(i);
                        $(element).addClass('active').siblings().removeClass('active');
                    });
                    element.addEventListener('mouseenter', function () {
                        projectFunc.hoverTab(element, true);
                    });
                    element.addEventListener('mouseleave', function () {
                        projectFunc.hoverTab(element, false);
                    });
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    serviceHover(element, state) {
        const article = $(element).find('.service__article');
        const link = $(element).find('.link');
        const ic = $(element).find('.link__ic');
        const serviceBg = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        const serviceBgLeave = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        serviceBg
            .to(
                element,
                {
                    backgroundColor: '#2C43A1',
                    color: 'white',
                    ease: Back.easeOut.config(1.7)
                }
            )
            .to(
                [link, article],
                {
                    color: 'white'
                },
                '-=0.5'
            )
            .set(
                ic,
                { className: '+=link__ic color' },
                '-=0.5'
            );

        serviceBgLeave
            .to(
                element,
                {
                    backgroundColor: 'white',
                    color: '#38393f',
                    ease: Back.easeOut.config(1.7)
                }
            )
            .to(
                [link],
                {
                    color: '#2c43a1'
                },
                '-=0.5'
            )
            .to(
                [article],
                {
                    color: '#38393f'
                },
                '-=0.5'
            )
            .set(
                ic,
                { className: '+=link__ic' },
                '-=0.5'
            );
        if (state) {
            serviceBg.play();
            serviceBgLeave.reverse();
        } else {
            serviceBgLeave.play();
            serviceBg.reverse();
        }
    },
    showOverlay: function (form, status) {
        if ($('.js-overlay').exists()) {
            try {
                const overlayEl = document.querySelector('.js-overlay');

                const showOvTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.3 },
                    onStart: projectFunc.lockedDOM,
                    onStartParams: [true],
                    onComplete: projectFunc.stateObject,
                    onCompleteParams: [form, 'start'],
                });

                const hideOvTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.3 },
                    onStart: projectFunc.stateObject,
                    onStartParams: [form, 'end'],
                    onComplete: projectFunc.lockedDOM,
                    onCompleteParams: [false]
                });

                showOvTl
                    .to(
                        overlayEl,
                        {
                            autoAlpha: 0.5,
                            ease: 'power2.out'
                        }
                    );

                hideOvTl
                    .to(
                        overlayEl,
                        {
                            autoAlpha: 0,
                            ease: 'power2.out'
                        },
                        '+=0.6'
                    );

                if (status) {
                    showOvTl.reverse();
                    showOvTl.play();
                } else {
                    hideOvTl.reverse();
                    hideOvTl.play();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    formShow(element, status) {
        if ($(element).exists()) {
            try {
                const showMainMenu = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: {
                        duration: 10
                    }
                });

                const hideMainMenu = new TimelineMax({
                    paused: true
                });

                const formShowTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: {
                        duration: 1.4
                    }
                });

                const formHideTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: {
                        duration: 1.1
                    },
                    onComplete: () => {
                        projectFunc.lockedDOM(false);
                        hideMainMenu.play();
                    }
                });

                formHideTl.to(element, { yPercent: -100, ease: 'power4.inOut' });
                formShowTl.set(element, { autoAlpha: 1 }).to(element, { yPercent: 0, ease: 'power4.inOut' }).add(showMainMenu.play(), '-=0.5');

                showMainMenu
                    .set(['.menu-popup__title', '.menu-popup__search'], { autoAlpha: 0, yPercent: -35 })
                    .set('.catalog-list--search .catalog-list__bloc', { autoAlpha: 0, xPercent: -35 })
                    .to('.menu-popup__title', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' })
                    .to('.menu-popup__search', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' }, '-=0.7')
                    .to('.catalog-list--search .catalog-list__bloc', { autoAlpha: 1, xPercent: 0, duration: 1, stagger: 0.25, ease: 'power4.inOut' }, '-=0.9');

                hideMainMenu
                    .set(['.menu-popup__title', '.menu-popup__search'], { autoAlpha: 0, yPercent: -35 })
                    .set('.catalog-list--search .catalog-list__bloc', { autoAlpha: 0, xPercent: -35 });

                if (status) {
                    formHideTl.reverse();
                    formShowTl.play();
                } else {
                    formShowTl.reverse();
                    formHideTl.play();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    popupShow: function (form, status) {
        if ($(form).exists()) {
            try {
                const element = form;

                const formShowTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                const formHideTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                const menuShowTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                const menuHideTl = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 1 }
                });

                menuShowTl
                    .to(
                        element,
                        {
                            autoAlpha: 1,
                            xPercent: -100,
                            ease: 'power2.out'
                        }
                    )

                menuHideTl
                    .to(
                        element,
                        {
                            autoAlpha: 0,
                            xPercent: 100,
                            ease: 'power2.out'
                        }
                    )

                formHideTl
                    .to(
                        element,
                        {
                            autoAlpha: 0,
                            yPercent: -100,
                            xPercent: -50,
                            ease: 'power2.out'
                        }
                    )

                formShowTl
                    .set(
                        element, {
                        yPercent: -100,
                        xPercent: -50,
                    }
                    )
                    .to(
                        element,
                        {
                            autoAlpha: 1,
                            yPercent: -50,
                            //xPercent: -50,
                            ease: 'power2.out'
                        }
                    )

                if (status) {
                    if (form === '.js-menu-mobile') {
                        menuHideTl.reverse()
                        menuShowTl.play();

                    } else {
                        formHideTl.reverse();
                        formShowTl.play();
                    }
                }
                else {
                    if (form === '.js-menu-mobile') {
                        menuShowTl.reverse();
                        menuHideTl.play();
                        $('.menu-btn').removeClass('open');
                    } else {
                        formShowTl.reverse();
                        formHideTl.play();
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    lockedDOM(status) {
        if (status) {
            $('html').css('overflow', 'hidden');
            projectFunc.scrollbarPage();
        } else {
            $('html').css('overflow', 'auto');
        }
    },
    stateObject: function (form, status) {
        if (status == 'start') {
            projectFunc.popupShow(form, true);
        }
        else {
            projectFunc.popupShow(form, false);
        }
    },
    initSearch(state) {
        const searchBloc = document.querySelector('.header-search');
        const inputSearch = searchBloc.querySelector('.header-search__field');

        const showSearch = new TimelineMax({
            reversed: true,
            paused: true,
            ease: Power1.inOut,
            onComplete: () => {
                $(inputSearch).focus();
            }
        });

        const hideSearch = new TimelineMax({
            reversed: true,
            paused: true,
            ease: Power1.inOut,
            onComplete: () => {
                $(inputSearch).val('');
            }
        });

        if (searchBloc.length > 0) {
            if ($(window).width() > 620) {
                showSearch
                    .to(searchBloc, 0.7, { width: '100%', ease: 'sine.inOut' });

                hideSearch
                    .to(searchBloc, 0.7, { width: '0%', ease: 'slow(0.1, 0.1, true)' });
            } else {
                showSearch
                    .to(searchBloc, 0.7, { width: 'calc(100vw - 40px)', ease: 'sine.inOut' });

                hideSearch
                    .to(searchBloc, 0.7, { width: '0vw', ease: 'slow(0.1, 0.1, true)' });
            }

        }

        if (state) {
            showSearch.play();
        } else {
            hideSearch.play();
            showSearch.stop();
        }
    },
    sendFilter() {
        if ($('#ds_filter_catalog').exists()) {
            try {
                let ds = '';
                ds = document.getElementById('ds_filter_catalog');

                ds.onchange = () => {
                    const json = JSON.stringify(Array.from(new FormData(ds)));
                    localStorage.setItem(ds.id, json);
                    // ds.submit(); // ???????????????? ??????????
                };
            } catch (err) {
                console.log(err);
            }
        }
    },
    clearFilter(form) {
        let ds = '';
        ds = document.getElementById(form);
        localStorage.removeItem(ds.id);
        ds.submit();
    },
    initCost() {
        if ($('.subject__item').exists()) {
            try {
                const productItem = document.querySelectorAll('.subject__item');

                productItem.forEach((element) => {
                    let num = 0;
                    let costInfo = element.querySelector('.js-cost').textContent;
                    let cost = element.dataset.cost;

                    $(element).find('.js-cost').text(costInfo);
                    costInfo = +costInfo.replace(/\s+/g, '');

                    $(element).find('.js-count-input').on('keyup change', function () {

                        num = $(this).val() * cost;

                        if (num < costInfo) {
                            num = costInfo;
                        }

                        num = num.toLocaleString();
                        $(element).find('.js-cost').text(num);
                    });
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    getScrollbarWidth() {
        let div, width = projectFunc.getScrollbarWidth.width;
        if (width === undefined) {
            div = document.createElement('div');
            div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
            div = div.firstChild;
            document.body.appendChild(div);
            width = projectFunc.getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        }
        return width;
    },
    scrollbarPage() {
        let locked = document.querySelector('html');
        locked.style.setProperty('--wScroll', projectFunc.getScrollbarWidth() + 'px');
    }
};

const showService = (element) => {
    if ($(element).exists()) {
        try {
            const serviceHover = (element, state) => {
                const serviceBg = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                const serviceBgLeave = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
                });

                serviceBg
                    .to(
                        element,
                        1,
                        {
                            backgroundColor: "#2C43A1",
                            color: 'white',
                            ease: Back.easeOut.config(1.7)
                        }
                    );

                serviceBgLeave
                    .to(
                        element,
                        1,
                        {
                            backgroundColor: "white",
                            color: '#38393F',
                            ease: Back.easeOut.config(1.7)
                        }
                    );

                if (state) {
                    serviceBg.play();
                    serviceBgLeave.reverse();
                }
                else {
                    serviceBgLeave.play();
                    serviceBg.reverse();
                }
            };

            gsap.utils.toArray(element).forEach(item => {
                item.addEventListener('mouseenter', function () {
                    serviceHover(this, true);
                });

                item.addEventListener('mouseleave', function () {
                    serviceHover(this, false);
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
};

function init() {
    projectFunc.scrollbarPage();
    projectFunc.setTabs();
    projectFunc.createSlider();
    projectFunc.sendFilter();
    projectFunc.initCost();
    // projectFunc.pinImage('.about__img img');
    // projectFunc.pinImage('.advantage__img img');
    // projectFunc.pinImage('.inset__left img');
    // projectFunc.pinImage('.history-slider__img img');
    // projectFunc.pinImage('.vacancy-detail__img img');
    showService('.lk-menu__item');
}

//===========Truncate text=============

function truncateText(bloc, qty) {
    if (bloc.length > 0) {
        let txtBloc = document.querySelectorAll(bloc);
        for (let i = 0; i < txtBloc.length; i++) {
            trc(txtBloc[i], qty);
        }
    }
}

function trc(txt, qty) {
    let text = txt.textContent;
    var sliced = text.slice(0, qty);
    if (sliced.length < text.length) {
        sliced += '...';
    }
    txt.textContent = sliced;
}

window.addEventListener('load', function () {
    init();

    if ($('#map').exists()) {
        ymaps.ready(inits);

        function inits() {
            // let MyBalloonContentLayout, myPlacemark;
            var MyBalloonContentLayout;
            // ???????????????? ??????????.
            var myMap = new ymaps.Map("map", {
                // ???????????????????? ???????????? ??????????.
                // ?????????????? ???? ??????????????????: ??????????????, ????????????????.
                center: [53.437095, 59.074866],
                zoom: 15.5,
                controls: []
            });

            // ???????????????? ???????????? ????????????
            var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                ' <div class="popover mark mark--mark1 top">' +
                ' <a class="close" href="#">?? </a>' +
                ' <div class="arrow"> </div>' +
                ' <div class="mark__inner popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=350]]' +
                ' </div>' +
                ' </div>', {
                /**
                * ???????????? ?????????????????? ???????????? ???? ???????????? ?????????????? ?? ?????????????????? ?????? ?? ???????????????????????? HTML-??????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                * @function
                * @name build
                */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                * ?????????????? ???????????????????? ???????????? ???? DOM.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                * @function
                * @name clear
                */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                * ?????????? ?????????? ???????????? ???????????????? ???????????????? ?????? ?????? ?????????????????? ???????????????? ???????????????????? ????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onSublayoutSizeChange
                */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                * ???????????????? ??????????, ?????????? ???????????????? ?????????????????? ???? ?????????? ????????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name applyElementOffset
                */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                * ?????????????????? ?????????? ?????? ?????????? ???? ??????????????, ?????????? ?????????????? "userclose" ???? ????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onCloseClick
                */
                onCloseClick: function (e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },

                /**
                * ???????????????????????? ?????? ???????????????????????????????????????? (balloonAutoPan).
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                * @function
                * @name getClientBounds
                * @returns {Number[][]} ???????????????????? ???????????? ???????????????? ?? ?????????????? ?????????????? ?????????? ?????????????? ???????????????????????? ?????????? ????????????????.
                */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]
                    ]));
                },
                /**
                * ?????????????????? ?????????????? ???????????????? (?? ???? ?? ?????????? ?????? ?????? ?????????? ???? ????????).
                * @function
                * @private
                * @name _isElement
                * @param {jQuery} [element] ??????????????.
                * @returns {Boolean} ???????? ??????????????.
                */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            });
            var MyBalloonLayout2 = ymaps.templateLayoutFactory.createClass(
                ' <div class="popover mark mark--mark2 top">' +
                ' <a class="close" href="#">?? </a>' +
                ' <div class="arrow"> </div>' +
                ' <div class="mark__inner popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=550]]' +
                ' </div>' +
                ' </div>', {
                /**
                * ???????????? ?????????????????? ???????????? ???? ???????????? ?????????????? ?? ?????????????????? ?????? ?? ???????????????????????? HTML-??????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                * @function
                * @name build
                */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                * ?????????????? ???????????????????? ???????????? ???? DOM.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                * @function
                * @name clear
                */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                * ?????????? ?????????? ???????????? ???????????????? ???????????????? ?????? ?????? ?????????????????? ???????????????? ???????????????????? ????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onSublayoutSizeChange
                */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                * ???????????????? ??????????, ?????????? ???????????????? ?????????????????? ???? ?????????? ????????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name applyElementOffset
                */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                * ?????????????????? ?????????? ?????? ?????????? ???? ??????????????, ?????????? ?????????????? "userclose" ???? ????????????.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onCloseClick
                */
                onCloseClick: function (e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },

                /**
                * ???????????????????????? ?????? ???????????????????????????????????????? (balloonAutoPan).
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                * @function
                * @name getClientBounds
                * @returns {Number[][]} ???????????????????? ???????????? ???????????????? ?? ?????????????? ?????????????? ?????????? ?????????????? ???????????????????????? ?????????? ????????????????.
                */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]
                    ]));
                },
                /**
                * ?????????????????? ?????????????? ???????????????? (?? ???? ?? ?????????? ?????? ?????? ?????????? ???? ????????).
                * @function
                * @private
                * @name _isElement
                * @param {jQuery} [element] ??????????????.
                * @returns {Boolean} ???????? ??????????????.
                */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

                // ???????????????? ???????????????????? ???????????? ?????????????????????? ????????????.
                MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    ' <div class="mark__header"><div class="column-md-6">$[properties.balloonHeader] </div></div>' +
                    ' <div class="column-md-6">$[properties.balloonContent] </div>'
                );
            // ???????????????????? ?????????? ???? ??????????

            //?????????????????? ?????? ?????????????????? ??????????
            myMap.behaviors.disable('scrollZoom');

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                myMap.behaviors.disable('drag');
            }

            if ($(window).width() >= 621) {
                var myPlacemark = new ymaps.Placemark(
                    // ???????????????????? ??????????
                    [53.436705, 59.075600], {
                    // ????????????????
                    // ?????????? ??????????
                    balloonHeader: ' <b>?????? "?????????????????? ?????????????????????????????????????????? ????????????????"</b>',
                    balloonContent: ' <div class="mark__box"><p>??????????: ???????????????????????? ??????????, 10??1, ????????????????????????</p><p>E-mail: <a href="mailto:uralmetalcompany.ru">uralmetalcompany.ru</a></p><p>???????????? ????????????: ????-???? 08:30???17.30; ???? 08:30???16:15; ????-???? - ????????????????</p</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // ???? ???????????????? ???????????? ?????? ???????????????? ????????????.
                    hideIconOnBalloonOpen: false,
                    // ?? ?????????????????????????? ?????????????? ??????????, ?????? ???????????????? ?????? ??????????????.
                    balloonOffset: [-250, -260],
                    preset: "islands#blueDotIcon"
                });

                // ???????????????? ??????????
                var myPlacemark2 = new ymaps.Placemark(
                    // ???????????????????? ??????????
                    [53.441818, 59.082698], {
                    // ????????????????
                    // ?????????? ??????????
                    balloonContent: ' <div class="mark__box">?????????????????? ?????? "?????????????????? ??????????????????????????????????????????</br>????????????????"</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout2,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // ???? ???????????????? ???????????? ?????? ???????????????? ????????????.
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [-240, -180],
                    preset: "islands#redDotIcon",
                });
            } else {
                var myPlacemark = new ymaps.Placemark(
                    // ???????????????????? ??????????
                    [53.436705, 59.075600], {
                    // ????????????????
                    // ?????????? ??????????
                    balloonHeader: ' <b>?????? "?????????????????? ??????????????-</br>???????????????????????????? ????????????????"</b>',
                    balloonContent: ' <div class="mark__box"><p>??????????: ???????????????????????? ??????????, 10??1,</br> ????????????????????????</p><p>E-mail: <a href="mailto:uralmetalcompany.ru">uralmetalcompany.ru</a></p><p>???????????? ????????????: ????-???? 08:30???17.30;</br> ???? 08:30???16:15; ????-???? - ????????????????</p</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // ???? ???????????????? ???????????? ?????? ???????????????? ????????????.
                    hideIconOnBalloonOpen: false,
                    // ?? ?????????????????????????? ?????????????? ??????????, ?????? ???????????????? ?????? ??????????????.
                    balloonOffset: [-133, -325],
                    preset: "islands#blueDotIcon"
                });

                // ???????????????? ??????????
                var myPlacemark2 = new ymaps.Placemark(
                    // ???????????????????? ??????????
                    [53.441818, 59.082698], {
                    // ????????????????
                    // ?????????? ??????????
                    balloonContent: ' <div class="mark__box">?????????????????? ?????? "??????????????????</br> ??????????????????????????????????????????</br>????????????????"</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout2,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // ???? ???????????????? ???????????? ?????? ???????????????? ????????????.
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [-160, -180],
                    preset: "islands#redDotIcon",
                });
            }

            myMap.geoObjects.add(myPlacemark);
            myMap.geoObjects.add(myPlacemark2);

            const myGeoObject = new ymaps.GeoObject({
                // ?????????????????? ?????????????????? ????????????????????.
                geometry: {
                    // ?????? ?????????????????? - "?????????????? ??????????".
                    type: "LineString",
                    // ?????????????????? ???????????????????? ???????????? ??????????????.
                    coordinates: [
                        [53.442172, 59.082912],
                        [53.436741, 59.077092],
                        [53.436611, 59.075810]
                    ]
                }
            }, {
                // ???????????? ?????????? ????????????????????.
                // ???????????????? ?????????????????????? ???????????????????????????? ??????????????.
                draggable: false,
                // ???????? ??????????.
                strokeColor: "#D81A27",
                // ???????????? ??????????.
                strokeWidth: 5,
                opacity: 0.5
            });

            var zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: "small"
                }
            });
            myMap.controls.add(zoomControl, {
                float: 'none',
                position: {
                    right: 20,
                    bottom: 290
                }
            });

            // ?????????????? ?????????????? ???????????????????? ?? ?????????????????????? ???????????? ???????????????????? ???? ??????????.
            var geolocationControl = new ymaps.control.GeolocationControl({
                options: { noPlacemark: true }
            });
            geolocationControl.events.add('locationchange', function (event) {
                var position = event.get('position'),
                    // ?????? ???????????????? ?????????? ?????????? ???????????? ???? ?????????? ?????????????? ??????.
                    locationPlacemark = new ymaps.Placemark(position);

                myMap.geoObjects.add(locationPlacemark);
                // ?????????????????? ?????????? ?????????? ?????????? ?? ?????????????? ???????????????????????????? ????????????????????????.
                myMap.panTo(position);
            });
            myMap.controls.add(geolocationControl, {
                float: 'none',
                position: {
                    right: 20,
                    bottom: 250
                }
            });

            myMap.geoObjects.add(myGeoObject);
            //myMap.geoObjects.add(mark);
            // myMap.geoObjects.add(mark2);
            myMap.behaviors.disable('scrollZoom');

            var position = myMap.getGlobalPixelCenter();
            myMap.setGlobalPixelCenter([position[0] + 100, position[1] - 120]);
        }
    }

    if ($('.js-phone').exists()) {
        try {
            $('.js-phone').mask("+7(999) 999-99-99");
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.service__article').exists()) {
        try {
            if ($(window).width() <= 370) {
                truncateText('.service__article', 17);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-ta-input').exists()) {
        try {
            $('.js-ta-input').on('input scroll', function (e) {
                if (this.scrollTop > 0) {
                    if ($('.js-form-label').exists()) {
                        $('.js-form-label').css('opacity', '0');
                    }
                } else {
                    if ($('.js-form-label').exists()) {
                        $('.js-form-label').css('opacity', '1');
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('#btnUp').exists()) {
        try {
            const btn = $('#btnUp');
            $(window).scroll(function () {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('showBtn');
                } else {
                    btn.removeClass('showBtn');
                }
            });

            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-count-input').exists()) {
        try {
            $('.js-count-input').keypress(function (event) {
                event = event || window.event;
                if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57))
                    return false;
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    // if ($('.advantage__img picture').exists()) {
    //     try {
    //         gsap.utils.toArray('.advantage__img img').forEach((section, i) => {

    //             gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: section.parentElement,
    //                     scrub: true,
    //                     invalidateOnRefresh: true,
    //                     start: `${-section.offsetHeight - 350} center`,
    //                     end: `${section.offsetHeight + 40} center`,
    //                 }
    //             })
    //                 .fromTo(section, {
    //                     yPercent: -25
    //                 }, {
    //                     yPercent: 0,
    //                     ease: "none"
    //                 });
    //         });
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    // if ($('.inset__pic picture').exists()) {
    //     gsap.utils.toArray('.inset__pic img').forEach((section, i) => {

    //         gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: section.parentElement,
    //                 scrub: true,
    //                 invalidateOnRefresh: true,
    //                 start: `${-section.offsetHeight - 350} center`,
    //                 end: `${section.offsetHeight + 40} center`,
    //             }
    //         })
    //             .fromTo(section, {
    //                 yPercent: -25
    //             }, {
    //                 yPercent: 0,
    //                 ease: "none"
    //             });
    //     });
    // }

    if ($('.js-dd-catalog').exists()) {
        try {
            $('.js-dd-catalog').on('click', function () {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open').addClass('close');
                    $(this).siblings('.dropdown-menu').fadeOut();
                } else {
                    $(this).removeClass('close').addClass('open');
                    $(this).siblings('.dropdown-menu').fadeIn();
                }
            });

            $(document).mouseup(function (e) {
                const container = $('.js-dd-catalog');

                if (container.has(e.target).length == 0) {
                    $('.js-dd-catalog').removeClass('open').addClass('close');
                    $('.js-dd-catalog').siblings('.dropdown-menu').fadeOut();
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-dropdown').exists()) {
        try {
            let accordions = document.getElementsByClassName("js-dropdown");

            for (let i = 0; i < accordions.length; i++) {
                accordions[i].onclick = function () {
                    $(this).toggleClass('open');

                    let content = $(this).find('.menu-mobile__sub')[0];

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.order-card').exists()) {
        try {
            let card = document.querySelectorAll('.order-card');
            let btn = document.querySelectorAll('.js-btn-oi');
            let acc = '';

            for (let i = 0; i < card.length; i++) {
                btn[i].addEventListener('click', function () {
                    this.classList.toggle('is-open');
                    acc = card[i].querySelector('.order-card__acc');
                    $(acc).slideToggle();

                    if (this.classList.contains('is-open')) {
                        $(this).find('.order-btn__txt').text('???????????????? ?????????????????? ????????????????????');
                    } else {
                        $(this).find('.order-btn__txt').text('???????????????????? ?????????????????? ????????????????????');
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function moveTo(source, target) {
        if (!source || !target) {
            return false;
        } else {
            var children = source.childNodes;
            while (children.length) {
                target.appendChild(children[0]);
            }
            source.parentNode.removeChild(source);
        }
    }

    if ($('.js-oi-include').exists()) {
        try {
            const card = document.querySelectorAll('.order-card');
            let include = '';
            let link = '';

            for (let i = 0; i < card.length; i++) {
                include = card[i].querySelector('.js-oi-include');
                link = card[i].querySelector('.js-oi-obj');

                if ($(window).width() <= 710) {
                    moveTo(link, include);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-footer-acc').exists()) {
        try {
            if ($(window).width() <= 720) {
                let accordions = document.getElementsByClassName("js-footer-acc");
                let btn = '';
                let list = '';

                for (let i = 0; i < accordions.length; i++) {
                    btn = accordions[i].querySelector('.footer__btn');

                    btn.onclick = function (event) {
                        accordions[i].classList.toggle('is-open');
                        list = $(accordions[i]).find('.footer__list');
                        event.preventDefault();
                        $(list).slideToggle();
                    };
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-list-phone').exists()) {
        try {
            let links = document.querySelectorAll('.js-list-phone li');
            const phone = document.querySelector('.js-label-phone');
            const phoneText = document.querySelector('.dropdown-label__txt');

            $(links).each((_, item) => {
                $(item).on('click', function () {
                    phone.setAttribute('href', `tel:${item.textContent}`);
                    phoneText.textContent = item.textContent;
                    $(this).addClass('active').siblings().removeClass('active');
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-filter-acc').exists()) {
        try {
            let accordions = document.getElementsByClassName("js-filter-acc");
            let select = '';

            for (let i = 0; i < accordions.length; i++) {
                accordions[i].onclick = function () {
                    select = $(accordions[i]).next(".js-filter-list");
                    $(this).parent().toggleClass('is-open');
                    $(select).slideToggle();
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.lk-cart__item').exists()) {
        try {
            const cartItem = document.querySelectorAll('.lk-cart__item');
            let btn = '';
            let panel = '';
            let content = '';
            let btnTxt = '';


            cartItem.forEach((item, _) => {
                btn = item.querySelectorAll('.js-btn-cartInfo');
                panel = item.querySelectorAll('.lk-cart__detail');

                // btnComment = item.querySelector('.js-btn-comment')[0];
                // btnTxt = item.querySelector('.js-btn-txt');

                btn.forEach((item, index) => {
                    panel.forEach((pEl, indexP) => {
                        item.addEventListener('click', function () {
                            if (index == indexP) {
                                this.classList.toggle('is-open');

                                if (this.classList.contains('btn--delivery') && this.classList.contains('is-open')) {
                                    $(this).find('.js-btn-txt').text('?????????????? ????????????????');
                                } else if (this.classList.contains('btn--delivery') && !this.classList.contains('is-open')) {
                                    $(this).find('.js-btn-txt').text('???????????????? ????????????????');
                                }

                                if (this.classList.contains('btn--comment') && this.classList.contains('is-open')) {
                                    $(this).find('.js-btn-txt').text('?????????????? ??????????????????????');
                                } else if (this.classList.contains('btn--comment') && !this.classList.contains('is-open')) {
                                    $(this).find('.js-btn-txt').text('???????????????? ??????????????????????');
                                }

                                content = panel[index];
                                if (content.style.maxHeight) {
                                    content.style.maxHeight = null;
                                } else {
                                    content.style.maxHeight = content.scrollHeight + "px";
                                }
                            }
                        });
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-portfolio').exists()) {
        try {
            const form = document.querySelector('.js-portfolio');
            const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);
            const data = {};

            for (let field of form) {
                const { name } = field;
                if (name) {
                    const { type, checked, value } = field;
                    data[name] = isCheckboxOrRadio(type) ? checked : value;
                }
            }

            if ($('.lk-profile__item').exists()) {
                let accordions = document.getElementsByClassName('lk-profile__item');
                let btn = '';
                let sub = '';
                let btnClose = '';
                let input = '';
                let subs = document.querySelectorAll('.lk-profile__sub');
                const btnSave = form.querySelector('.js-btn-save');
                let status = 0;

                for (let i = 0; i < accordions.length; i++) {
                    if (!accordions[i].classList.contains('disable')) {
                        btnClose = accordions[i].querySelector('.js-close-edit');

                        if ($('.js-btn-edit').exists()) {
                            btn = accordions[i].querySelector('.js-btn-edit');
                            btn.onclick = function () {
                                input = accordions[i].querySelector('.js-edit-input');
                                sub = accordions[i].querySelector('.js-sub-edit');
                                sub.classList.add('active');

                                setTimeout(function () {
                                    input.focus();
                                    input.setSelectionRange(input.value.length, input.value.length);
                                }, 100);

                                if (accordions[i].classList.contains('lk-profile__item--acc')) {
                                    accordions[i].classList.add('is-open');
                                    const sub = accordions[i].querySelector('.lk-profile__sub');
                                    let content = sub;

                                    $(content).slideToggle({
                                        complete: function (e) {
                                            $(accordions[i]).find('.lk-profile__row').slideToggle({ queue: false });
                                        }
                                    });
                                }
                            };
                        }

                        btnClose.onclick = function () {
                            input = accordions[i].querySelector('.js-edit-input');
                            sub = accordions[i].querySelector('.js-sub-edit');
                            sub.classList.remove('active');

                            if (accordions[i].classList.contains('lk-profile__item--acc')) {
                                const sub = accordions[i].querySelector('.lk-profile__sub');
                                let content = sub;
                                accordions[i].classList.toggle('is-open');

                                $(content).slideToggle({
                                    complete: function (e) {
                                        $(accordions[i]).find('.lk-profile__row').slideToggle({ queue: false });
                                    }
                                });
                            }

                            Object.keys(data).forEach((item) => {
                                if (input.name === item) {
                                    input.value = data[item];
                                    input.setAttribute('value', input.value);
                                }
                            });
                            subs.forEach((item, _) => {
                                if (item.classList.contains('active')) {
                                    status = 1;
                                }
                            });

                            if (status) {
                                btnSave.classList.add('show');
                                status = 0;
                            } else {
                                btnSave.classList.remove('show');
                            }
                        };
                    }

                    input = accordions[i].querySelector('.js-edit-input');

                    input.addEventListener('input', function () {
                        btnSave.classList.add('show');
                        this.setAttribute('value', this.value);
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-clear-filter').exists()) {
        try {
            const btnReset = document.querySelector('.js-clear-filter');
            btnReset.onclick = (event) => {
                event.preventDefault();
                projectFunc.clearFilter('ds_filter_catalog');
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-resume').exists()) {
        try {
            $('.js-btn-resume').on('click', () => {
                projectFunc.showOverlay('.js-modal-resume', true);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-overlay').exists()) {
        try {
            $('.js-overlay').on('click', () => {
                projectFunc.showOverlay('.js-modal-order', false);
                projectFunc.showOverlay('.js-modal-success', false);
                projectFunc.showOverlay('.js-modal-resume', false);
                projectFunc.showOverlay('.js-modal-delivery', false);
                projectFunc.showOverlay('.js-menu-mobile', false);
                $('header').removeClass('active');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-select').exists()) {
        try {
            $(window).resize(function () {
                $('.js-select').select2({
                    minimumResultsForSearch: Infinity,
                    width: 'element',
                });
            }).resize();
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-search').exists()) {
        try {
            $('.js-btn-search').on('click', () => {
                projectFunc.initSearch(true);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-close-search').exists()) {
        try {
            $('.js-close-search').on('click', function (event) {
                event.preventDefault();
                projectFunc.initSearch(false);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-example-basic-single').exists()) {
        try {
            $('.js-example-basic-single').select2();
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-open-auth').exists()) {
        try {
            if ($(window).width() <= 620) {
                const refs = document.querySelectorAll('.js-open-auth');

                refs.forEach((item, index) => {
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                        projectFunc.popupShow('.js-modal-reg', false);
                        projectFunc.popupShow('.js-modal-auth', true);
                    }, false);
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-open-reg').exists()) {
        try {
            if ($(window).width() <= 620) {
                const ref = document.querySelector('.js-open-reg');
                ref.addEventListener('click', function (event) {
                    event.preventDefault();
                    projectFunc.popupShow('.js-modal-reg', true);
                    projectFunc.popupShow('.js-modal-auth', false);
                }, false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-open-res').exists()) {
        try {
            if ($(window).width() <= 620) {
                const ref = document.querySelector('.js-open-res');
                ref.addEventListener('click', function (event) {
                    event.preventDefault();
                    projectFunc.popupShow('.js-modal-res', true);
                    projectFunc.popupShow('.js-modal-auth', false);
                    projectFunc.popupShow('.js-modal-reg', false);
                }, false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function overlayMenu(panels, overlays, status) {
        const panel = panels;
        const overlay = document.querySelector(overlays);

        const overlayShow = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 1 },
            onStart: stateMenuProps,
            onStartParams: [panel, overlay, status],
        });

        const overlayHide = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 1 },
            onStart: stateMenuProps,
            onStartParams: [panel, overlay, status],
        });

        overlayShow
            .to(
                overlay,
                {
                    autoAlpha: 0.5,
                    ease: 'power4.out'
                }
            );

        overlayHide
            .to(
                overlay,
                {
                    autoAlpha: 0,
                    ease: 'power2.out'
                }
            );

        if (status) {
            $('.menu-btn').addClass('open');
            projectFunc.lockedDOM(true);
            overlayHide.reverse();
            overlayShow.play();
        } else {
            $('.menu-btn').removeClass('open');
            projectFunc.lockedDOM(false);
            overlayShow.reverse();
            overlayHide.play();
        }
    }

    function stateMenu(panel, overlays, status) {
        const formShowTl = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.7 },
        });

        const formHideTl = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.7 },
        });

        formShowTl
            .set(
                panel, {
                xPercent: 100,
            }
            )
            .to(
                panel,
                {
                    autoAlpha: 1,
                    xPercent: -100,
                    ease: 'power2.out'
                },
            );

        formHideTl
            .to(
                panel,
                {
                    autoAlpha: 0,
                    xPercent: 100,
                    //xPercent: -50,
                    ease: 'power2.out',
                    duration: 1
                }
            );

        if (status) {
            formHideTl.reverse();
            formShowTl.play();

        } else {
            formShowTl.reverse();
            formHideTl.play();
        }
    }

    function stateMenuProps(panels, overlays, status) {
        if (status) {
            stateMenu(panels, overlays, true);
        } else {
            stateMenu(panels, overlays, false);
        }
    }

    if ($('.js-btn-filter').exists()) {
        try {
            $('.js-btn-filter').on('click', () => {
                overlayMenu('.js-menu-filter', '.js-ovl-mm', true);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-menu').exists()) {
        try {
            $('.js-btn-menu').on('click', () => {
                if ($('.menu-btn').hasClass('open')) {
                    overlayMenu('.js-menu-filter', '.js-ovl-mm', false);
                    overlayMenu('.js-menu-mobile', '.js-ovl-mm', false);
                    overlayMenu('.js-sidemenu-popup', '.js-ovl-mm', false);
                } else {
                    if ($(window).width() > 1024) {
                        $('.menu-btn').addClass('open');
                        const popup = document.querySelector('.js-menu-popup');
                        gsap.set(popup, { yPercent: -100 });

                        if (popup) {
                            projectFunc.formShow(popup, true);
                            projectFunc.lockedDOM(true);
                        }
                    } else {
                        overlayMenu('.js-menu-mobile', '.js-ovl-mm', true);
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-sidemenu').exists()) {
        try {
            $('.js-btn-sidemenu').on('click', () => {
                overlayMenu('.js-sidemenu-popup', '.js-ovl-mm', true);
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    if ($('.js-ovl-mm').exists()) {
        try {
            $('.js-ovl-mm').on('click', () => {
                overlayMenu('.js-menu-filter', '.js-ovl-mm', false);
                overlayMenu('.js-menu-mobile', '.js-ovl-mm', false);
                overlayMenu('.js-sidemenu-popup', '.js-ovl-mm', false);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-menu-close').exists()) {
        try {
            const popup = document.querySelector('.js-menu-popup');

            $('.js-menu-close').on('click', () => {
                if (popup) {
                    $('.menu-btn').removeClass('open');
                    projectFunc.formShow(popup, false);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-search-clear').exists()) {
        $('.js-search-clear').on('click', function () {
            if ($('.js-search-field').exists()) {
                try {
                    $('.js-search-field').val('');
                    $('.js-search-clear').css('visibility', 'hidden');
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }

    if ($('.js-search-field').exists()) {
        document.querySelector('.js-search-field').addEventListener('input', e => {
            let btn = e.target.nextElementSibling;
            btn.style.visibility = e.target.value.length ? 'visible' : 'hidden';
        });
    }

    if ($('.js-input').exists()) {
        try {
            $('.js-input').each((_, element) => {
                $(element).val('');
                $(element).focus(function () {
                    $(element).parent().addClass('on-focus');
                }).blur(function () {
                    if ($(element).val() === '') {
                        $(element).parent().removeClass('on-focus');
                    }
                });
                if ($(element).prop('disabled') === true) {
                    $(element).parent().addClass('disabled');
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-reset').exists()) {
        try {
            $('.js-btn-reset').on('click', () => {
                $('.form-group').each((_, element) => {
                    $(element).removeClass('on-focus');
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    // if ($('.service__bloc').exists()) {
    //     try {
    //         gsap.utils.toArray('.service__bloc').forEach((item) => {
    //             item.addEventListener('mouseenter', function () {
    //                 projectFunc.serviceHover(item, true);
    //             });

    //             item.addEventListener('mouseleave', function () {
    //                 projectFunc.serviceHover(item, false);
    //             });

    //             item.addEventListener('touchenter', function () {
    //                 projectFunc.serviceHover(item, true);
    //             });

    //             item.addEventListener('touchleave', function () {
    //                 projectFunc.serviceHover(item, false);
    //             });
    //         });
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    if ($('.header__inner').exists) {
        try {
            const $window = $(window);
            const $target = $('.header__inner');
            const $h = $target.offset().top;
            $window.on('scroll', function () {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > $h) {
                    $target.addClass('mf-scroll');
                    $('.header').addClass('mf-small-header');
                    // return;
                } else {
                    $target.removeClass('mf-scroll');
                    $('.header').removeClass('mf-small-header');
                }
                // return;
            });
        } catch (err) {
            console.log(err);
        }
    }


    if ($('.file').exists()) {
        try {
            let fileEl = document.querySelectorAll('.file');

            fileEl.forEach((element, _) => {
                let label = $(element).find('.file__label');
                let inputEl = $(element).find('.file__input');

                $(inputEl).change(function () {

                    if (typeof (this.files) != 'undefined') {
                        if (this.files.length == 0) {
                            label.removeClass('withFile').text(label.data('default'));
                        }
                        else {
                            let file = this.files[0];
                            let name = file.name;
                            label.addClass('withFile').text(name);
                        }
                    }
                    else {
                        let name = this.value.split("\\");
                        label.addClass('withFile').text(name[name.length - 1]);
                    }
                    return false;
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    // $('input[type="file"]').change(function () {
    //     let label = $('.file .file__label');
    //     if (typeof (this.files) != 'undefined') {
    //         if (this.files.length == 0) {
    //             label.removeClass('withFile').text(label.data('default'));
    //         }
    //         else {
    //             let file = this.files[0];
    //             let name = file.name;
    //             label.addClass('withFile').text(name);
    //         }
    //     }
    //     else {
    //         let name = this.value.split("\\");
    //         label.addClass('withFile').text(name[name.length - 1]);
    //     }
    //     return false;
    // });

    if ($('.js-open-modal').exists()) {
        try {
            $('.js-open-modal').on('click', (event) => {
                event.preventDefault();
                $('.js-modal').addClass('open');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-close-modal').exists()) {
        try {
            $('.js-close-modal').on('click', () => {
                projectFunc.showOverlay('.js-modal-success', false);
                projectFunc.showOverlay('.js-modal-resume', false);
                projectFunc.showOverlay('.js-modal-order', false);
                projectFunc.showOverlay('.js-modal-delivery', false);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-close-modal_auth').exists()) {
        try {
            $('.js-close-modal_auth').on('click', () => {
                projectFunc.popupShow('.js-modal-auth', false);
                projectFunc.popupShow('.js-modal-reg', false);
                projectFunc.popupShow('.js-modal-res', false);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.lk-documentation__row--contract').exists()) {
        try {
            const date = document.querySelector('.js-dogovor-date').dataset.date;
            const dogovorBloc = document.querySelector('.lk-documentation__row--contract');
            let title = dogovorBloc.querySelector('.lk-documentation__title');
            title.textContent = `?????????????? ???????????????????????? ???? ${date}`;
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-accordion-head').exists()) {
        try {
            const $head = '.js-accordion-head';

            $(document).off('click.toggle');
            $(document).on('click.toggle', $head, function (e) {
                e.preventDefault();

                const $this = $(this);
                const $item = $this.parents('.js-accordion-item:first');

                $item.toggleClass('active');
                $item.find('.js-accordion-body:first').slideToggle();
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-tab-btn').exists()) {
        try {
            $('.js-tab-btn').click(function (e) {
                e.preventDefault();
                $('.js-tab-btn').removeClass('active');
                $(this).addClass('active');
                $('.js-tab-body').removeClass('active');
                const tabID = $(this).attr('data-tab-btn');
                $('.js-tab-body[data-tab-body="' + tabID + '"]').addClass('active');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    // if ($('.js-btn-sidemenu').exists()) {
    //     $('.js-btn-sidemenu').click(function () {
    //         // $('.js-sidemenu-popup').addClass('open');
    //         // $('.menu-btn').addClass('open slide-menu-open');
    //         // projectFunc.lockedDOM(true);
    //     });
    // }

    if ($('.js-hide-filter').exists()) {
        try {
            $('.js-hide-filter').click(function () {
                $(this).toggleClass('open');
                $(this).next('.select').slideToggle();
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-success').exists()) {
        try {
            $('.js-btn-success').on('click', () => {
                event.preventDefault();
                projectFunc.showOverlay('.js-modal-success', true);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-delivery').exists()) {
        try {
            $('.js-btn-delivery').on('click', () => {
                event.preventDefault();
                projectFunc.showOverlay('.js-modal-delivery', true);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    const stateRadio = (radio, status) => {
        let radioEl = document.querySelectorAll(radio);
        if (radioEl) {
            if (status) {
                radioEl.forEach((item, index) => {
                    item.disabled = false;

                    if (index === 0) {
                        item.checked = true;
                    }
                });
            } else {
                radioEl.forEach((item, _) => {
                    item.disabled = true;
                    item.checked = false;
                });
            }
        }
    };

    if ($('.js-modal-delivery').exists()) {
        const panelBloc = document.querySelector('.modal-delivery__box');
        let btn = this.document.querySelectorAll('.modal-delivery__btn');

        if (panelBloc) {
            if (panelBloc.classList.contains('disable')) {
                // $('.js-select').prop("disabled", true);
            }
        }

        if (btn) {
            btn.forEach((item, i) => {
                item.addEventListener('click', function () {
                    this.classList.add('active');
                    btn.forEach((el, index) => {
                        if (index !== i) {
                            el.classList.remove('active');
                        }
                    });

                    if (this.classList.contains('js-delivery-way')) {
                        if (panelBloc.classList.contains('disable')) {
                            panelBloc.classList.remove('disable');
                            // $('.js-select').prop("disabled", false);
                            stateRadio('.lk-radio', true);
                        }
                    } else {
                        panelBloc.classList.add('disable');
                        // $('.js-select').prop("disabled", true);
                        stateRadio('.lk-radio', false);
                    }
                });
            });
        }
    }

    // .js-btn-delivery

    // if ($('.js-order-info').exists()) {
    //     $('.js-order-info').on('click', () => {
    //         projectFunc.showOverlay('.js-modal-order', true);
    //     });
    // }

    if ($('.order-card').exists()) {
        const card = document.querySelectorAll('.order-card');
        let orderInfo = '';
        let modal = '';

        card.forEach((item, _) => {
            orderInfo = item.querySelector('.js-order-info');

            orderInfo.addEventListener('click', function () {
                modal = item.querySelector('.modal');
                projectFunc.showOverlay(modal, true);
            });
        });
    }

    if ($('.js-tooltip').exists()) {
        if ($(window).width() < 1024) {
            try {
                $('.js-tooltip').on('click', function () {
                    if ($(this).hasClass('open')) {
                        $(this).removeClass('open').addClass('close');
                    } else {
                        $(this).removeClass('close').addClass('open');
                    }
                });

                $(document).mouseup(function (e) {
                    const container = $('.js-tooltip');

                    if (container.has(e.target).length == 0) {
                        $('.js-tooltip').removeClass('open').addClass('close');
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});
