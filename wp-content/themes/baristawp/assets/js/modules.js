(function($) {
    "use strict";

    window.edgtf = {};
    edgtf.modules = {};

    edgtf.scroll = 0;
    edgtf.window = $(window);
    edgtf.document = $(document);
    edgtf.windowWidth = $(window).width();
    edgtf.windowHeight = $(window).height();
    edgtf.body = $('body');
    edgtf.html = $('html, body');
    edgtf.htmlEl = $('html');
    edgtf.menuDropdownHeightSet = false;
    edgtf.defaultHeaderStyle = '';
    edgtf.minVideoWidth = 1500;
    edgtf.videoWidthOriginal = 1280;
    edgtf.videoHeightOriginal = 720;
    edgtf.videoRatio = 1280/720;

    edgtf.edgtfOnDocumentReady = edgtfOnDocumentReady;
    edgtf.edgtfOnWindowLoad = edgtfOnWindowLoad;
    edgtf.edgtfOnWindowResize = edgtfOnWindowResize;
    edgtf.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtf.scroll = $(window).scrollTop();

        //set global variable for header style which we will use in various functions
        if(edgtf.body.hasClass('edgtf-dark-header')){ edgtf.defaultHeaderStyle = 'edgtf-dark-header';}
        if(edgtf.body.hasClass('edgtf-light-header')){ edgtf.defaultHeaderStyle = 'edgtf-light-header';}

    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
        edgtf.windowWidth = $(window).width();
        edgtf.windowHeight = $(window).height();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {
        edgtf.scroll = $(window).scrollTop();
    }



    //set boxed layout width variable for various calculations

    switch(true){
        case edgtf.body.hasClass('edgtf-grid-1300'):
            edgtf.boxedLayoutWidth = 1350;
            break;
        case edgtf.body.hasClass('edgtf-grid-1200'):
            edgtf.boxedLayoutWidth = 1250;
            break;
        case edgtf.body.hasClass('edgtf-grid-1000'):
            edgtf.boxedLayoutWidth = 1050;
            break;
        case edgtf.body.hasClass('edgtf-grid-800'):
            edgtf.boxedLayoutWidth = 850;
            break;
        default :
            edgtf.boxedLayoutWidth = 1150;
            break;
    }

})(jQuery);
(function ($) {
    "use strict";

    var common = {};
    edgtf.modules.common = common;

    common.edgtfIsTouchDevice = edgtfIsTouchDevice;
    common.edgtfDisableSmoothScrollForMac = edgtfDisableSmoothScrollForMac;
    common.edgtfFluidVideo = edgtfFluidVideo;
    common.edgtfPreloadBackgrounds = edgtfPreloadBackgrounds;
    common.edgtfPrettyPhoto = edgtfPrettyPhoto;
    common.edgtfCheckHeaderStyleOnScroll = edgtfCheckHeaderStyleOnScroll;
    common.edgtfInitParallax = edgtfInitParallax;
    //common.edgtfSmoothScroll = edgtfSmoothScroll;
    common.edgtfEnableScroll = edgtfEnableScroll;
    common.edgtfDisableScroll = edgtfDisableScroll;
    common.edgtfWheel = edgtfWheel;
    common.edgtfKeydown = edgtfKeydown;
    common.edgtfPreventDefaultValue = edgtfPreventDefaultValue;
    // common.edgtfOwlSlider = edgtfOwlSlider;
    common.edgtfSlickSlider = edgtfSlickSlider;
    common.edgtfInitSelfHostedVideoPlayer = edgtfInitSelfHostedVideoPlayer;
    common.edgtfSelfHostedVideoSize = edgtfSelfHostedVideoSize;
    common.edgtfInitBackToTop = edgtfInitBackToTop;
    common.edgtfBackButtonShowHide = edgtfBackButtonShowHide;
    common.edgtfSmoothTransition = edgtfSmoothTransition;

    common.edgtfOnDocumentReady = edgtfOnDocumentReady;
    common.edgtfOnWindowLoad = edgtfOnWindowLoad;
    common.edgtfOnWindowResize = edgtfOnWindowResize;
    common.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfIsTouchDevice();
        edgtfDisableSmoothScrollForMac();
        edgtfFluidVideo();
        edgtfPreloadBackgrounds();
        edgtfPrettyPhoto();
        edgtfInitAnchor().init();
        edgtfInitVideoBackground();
        edgtfInitVideoBackgroundSize();
        edgtfSetContentBottomMargin();
        //edgtfSmoothScroll();
        //edgtfOwlSlider();
        edgtfSlickSlider();
        edgtfInitSelfHostedVideoPlayer();
        edgtfSelfHostedVideoSize();
        edgtfInitBackToTop();
        edgtfBackButtonShowHide();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfCheckHeaderStyleOnScroll(); //called on load since all content needs to be loaded in order to calculate row's position right
        edgtfInitParallax();
        edgtfSmoothTransition();
        edgtfInitElementsAnimations();
        edgtfInitOverlapingAnimation();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
        edgtfInitVideoBackgroundSize();
        edgtfSelfHostedVideoSize();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }

    /*
     ** Disable shortcodes animation on appear for touch devices
     */
    function edgtfIsTouchDevice() {
        if (Modernizr.touch && !edgtf.body.hasClass('edgtf-no-animations-on-touch')) {
            edgtf.body.addClass('edgtf-no-animations-on-touch');
        }
    }

    /*
     ** Disable smooth scroll for mac if smooth scroll is enabled
     */
    function edgtfDisableSmoothScrollForMac() {
        var os = navigator.appVersion.toLowerCase();

        if (os.indexOf('mac') > -1 && edgtf.body.hasClass('edgtf-smooth-scroll')) {
            edgtf.body.removeClass('edgtf-smooth-scroll');
        }
    }

    function edgtfFluidVideo() {
        fluidvids.init({
            selector: ['iframe'],
            players: ['www.youtube.com', 'player.vimeo.com']
        });
    }

    /**
     * Init Owl Carousel
     */

    /*function edgtfOwlSlider() {

        var sliders = $('.edgtf-owl-slider');

        if (sliders.length) {
            sliders.each(function(){

                var slider = $(this);
                slider.owlCarousel({
                    singleItem: true,
                    transitionStyle: 'fadeUp',
                    navigation: true,
                    autoHeight: true,
                    pagination: false,
                    navigationText: [
                        '<span class="edgtf-prev-icon"><i class="fa fa-angle-left"></i></span>',
                        '<span class="edgtf-next-icon"><i class="fa fa-angle-right"></i></span>'
                    ]
                });

            });
        }

    }*/

    /**
     * Init Slick Carousel
     */
    function edgtfSlickSlider() {

        var sliders = $('.edgtf-slick-slider');

        if (sliders.length) {
            sliders.each(function () {
                var slider = $(this);
                slider.waitForImages(function () {
                    slider.slick({
                        infinite: true,
                        autoplay: true,
                        slidesToShow: 1,
                        arrows: true,
                        dots: false,
                        adaptiveHeight: true,
                        prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                        nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                        customPaging: function (slider, i) {
                            return '<span class="edgtf-slick-dot-inner"></span>';
                        }
                    });
                });
            });
        }

    }


    /*
     *	Preload background images for elements that have 'edgtf-preload-background' class
     */
    function edgtfPreloadBackgrounds() {

        $(".edgtf-preload-background").each(function () {
            var preloadBackground = $(this);
            if (preloadBackground.css("background-image") !== "" && preloadBackground.css("background-image") !== "none") {

                var bgUrl = preloadBackground.attr('style');

                bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
                bgUrl = bgUrl ? bgUrl[1] : "";

                if (bgUrl) {
                    var backImg = new Image();
                    backImg.src = bgUrl;
                    $(backImg).load(function () {
                        preloadBackground.removeClass('edgtf-preload-background');
                    });
                }
            } else {
                $(window).load(function () {
                    preloadBackground.removeClass('edgtf-preload-background');
                }); //make sure that edgtf-preload-background class is removed from elements with forced background none in css
            }
        });
    }

    function edgtfPrettyPhoto() {
        /*jshint multistr: true */
        var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';

        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            hook: 'data-rel',
            animation_speed: 'normal', /* fast/slow/normal */
            slideshow: false, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: true, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            horizontal_padding: 0,
            default_width: 960,
            default_height: 540,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            deeplinking: false,
            custom_markup: '',
            social_tools: false,
            markup: markupWhole
        });
    }

    /*
     *	Check header style on scroll, depending on row settings
     */
    function edgtfCheckHeaderStyleOnScroll() {

        if ($('[data-edgtf_header_style]').length > 0 && edgtf.body.hasClass('edgtf-header-style-on-scroll')) {

            var waypointSelectors = $('.wpb_row.edgtf-section');
            var changeStyle = function (element) {
                (element.data("edgtf_header_style") !== undefined) ? edgtf.body.removeClass('edgtf-dark-header edgtf-light-header').addClass(element.data("edgtf_header_style")) : edgtf.body.removeClass('edgtf-dark-header edgtf-light-header').addClass('' + edgtf.defaultHeaderStyle);
            };

            waypointSelectors.waypoint(function (direction) {
                if (direction === 'down') {
                    changeStyle($(this.element));
                }
            }, {offset: 0});

            waypointSelectors.waypoint(function (direction) {
                if (direction === 'up') {
                    changeStyle($(this.element));
                }
            }, {
                offset: function () {
                    return -$(this.element).outerHeight();
                }
            });
        }
    }

    /*
     *	Start animations on elements
     */
    function edgtfInitElementsAnimations() {

        var touchClass = $('.edgtf-no-animations-on-touch'),
            noAnimationsOnTouch = true,
            elements = $('.edgtf-grow-in, .edgtf-fade-in-down, .edgtf-element-from-fade, .edgtf-element-from-left, .edgtf-element-from-right, .edgtf-element-from-top, .edgtf-element-from-bottom, .edgtf-flip-in, .edgtf-x-rotate, .edgtf-z-rotate, .edgtf-y-translate, .edgtf-fade-in, .edgtf-fade-in-left-x-rotate'),
            clasess,
            animationClass,
            animationData;

        if (touchClass.length) {
            noAnimationsOnTouch = false;
        }

        if (elements.length > 0 && noAnimationsOnTouch) {
            elements.each(function () {
                $(this).appear(function () {
                    animationData = $(this).data('animation');
                    if (typeof animationData !== 'undefined' && animationData !== '') {
                        animationClass = animationData;
                        $(this).addClass(animationClass + '-on');
                    }
                }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
            });
        }

    }


    /*
     **	Sections with parallax background image
     */
    function edgtfInitParallax() {

        if ($('.edgtf-parallax-section-holder').length) {
            $('.edgtf-parallax-section-holder').each(function () {

                var parallaxElement = $(this);
                if (parallaxElement.hasClass('edgtf-full-screen-height-parallax')) {
                    parallaxElement.height(edgtf.windowHeight);
                    parallaxElement.find('.edgtf-parallax-content-outer').css('padding', 0);
                }
                var speed = parallaxElement.data('edgtf-parallax-speed') * 0.4;
                parallaxElement.parallax("50%", speed);
            });
        }
    }

    /*
     **	Anchor functionality
     */
    var edgtfInitAnchor = edgtf.modules.common.edgtfInitAnchor = function () {

        /**
         * Set active state on clicked anchor
         * @param anchor, clicked anchor
         */
        var setActiveState = function (anchor) {

            $('.edgtf-main-menu .edgtf-active-item, .edgtf-mobile-nav .edgtf-active-item, .edgtf-vertical-menu .edgtf-active-item, .edgtf-fullscreen-menu .edgtf-active-item').removeClass('edgtf-active-item');
            anchor.parent().addClass('edgtf-active-item');

            $('.edgtf-main-menu a, .edgtf-mobile-nav a, .edgtf-vertical-menu a, .edgtf-fullscreen-menu a').removeClass('current');
            anchor.addClass('current');
        };

        /**
         * Check anchor active state on scroll
         */
        var checkActiveStateOnScroll = function () {

            $('[data-edgtf-anchor]').waypoint(function (direction) {
                if (direction === 'down') {
                    setActiveState($("a[href='" + window.location.href.split('#')[0] + "#" + $(this.element).data("edgtf-anchor") + "']"));
                }
            }, {offset: '50%'});

            $('[data-edgtf-anchor]').waypoint(function (direction) {
                if (direction === 'up') {
                    setActiveState($("a[href='" + window.location.href.split('#')[0] + "#" + $(this.element).data("edgtf-anchor") + "']"));
                }
            }, {
                offset: function () {
                    return -($(this.element).outerHeight() - 150);
                }
            });

        };

        /**
         * Check anchor active state on load
         */
        var checkActiveStateOnLoad = function () {
            var hash = window.location.hash.split('#')[1];

            if (hash !== "" && $('[data-edgtf-anchor="' + hash + '"]').length > 0) {
                //triggers click which is handled in 'anchorClick' function
                var linkURL = window.location.href.split('#')[0] + "#" + hash;
                if ($("a[href='" + linkURL + "']").length) { //if there is a link on page with such href
                    $("a[href='" + linkURL + "']").trigger("click");
                } else { //than create a fake link and click it
                    var link = $('<a/>').attr({'href': linkURL, 'class': 'edgtf-anchor'}).appendTo('body');
                    link.trigger('click');
                }
            }
        };

        /**
         * Calculate header height to be substract from scroll amount
         * @param anchoredElementOffset, anchorded element offest
         */
        var headerHeihtToSubtract = function (anchoredElementOffset, anchoredElementPosition) {

            var headerHeight;
            if (edgtf.windowWidth > 1000) {

                if (edgtf.modules.header.behaviour === 'edgtf-sticky-header-on-scroll-down-up') {
                    (anchoredElementOffset > edgtf.modules.header.stickyAppearAmount) ? edgtf.modules.header.isStickyVisible = true : edgtf.modules.header.isStickyVisible = false;
                }

                if (edgtf.modules.header.behaviour === 'edgtf-sticky-header-on-scroll-up') {
                    (anchoredElementOffset > edgtf.scroll) ? edgtf.modules.header.isStickyVisible = false : '';
                }

                headerHeight = edgtf.modules.header.isStickyVisible ? edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight : edgtfPerPageVars.vars.edgtfHeaderTransparencyHeight;
            } else {
                if (anchoredElementPosition === 'down') {
                    headerHeight = anchoredElementOffset > edgtf.modules.header.stickyMobileAppearAmount ? 0 : edgtf.modules.header.stickyMobileAppearAmount;
                } else {
                    headerHeight = edgtfGlobalVars.vars.edgtfMobileHeaderHeight;
                }
            }
            return headerHeight;
        };

        /**
         * Handle anchor click
         */
        var anchorClick = function () {
            edgtf.document.on("click", ".edgtf-main-menu a, .edgtf-vertical-menu a, .edgtf-fullscreen-menu a, .edgtf-btn, .edgtf-anchor, .edgtf-mobile-nav a", function () {
                var scrollAmount;
                var anchor = $(this);
                var hash = anchor.prop("hash").split('#')[1];

                if (hash !== "" && $('[data-edgtf-anchor="' + hash + '"]').length > 0) {

                    var anchoredElementOffset = $('[data-edgtf-anchor="' + hash + '"]').offset().top;
                    var anchoredElementPosition = anchoredElementOffset > edgtf.scroll ? 'down' : 'up';
                    scrollAmount = $('[data-edgtf-anchor="' + hash + '"]').offset().top - headerHeihtToSubtract(anchoredElementOffset, anchoredElementPosition);

                    setActiveState(anchor);

                    edgtf.html.stop().animate({
                        scrollTop: Math.round(scrollAmount)
                    }, 2000, 'easeInOutCubic', function () {
                        //change hash tag in url
                        if (history.pushState) {
                            history.pushState(null, null, '#' + hash);
                        }
                    });
                    return false;
                }
            });
        };

        return {
            init: function () {
                if ($('[data-edgtf-anchor]').length) {
                    anchorClick();
                    checkActiveStateOnScroll();
                    $(window).load(function () {
                        checkActiveStateOnLoad();
                    });
                }
            }
        };

    };

    /*
     **	Video background initialization
     */
    function edgtfInitVideoBackground() {

        $('.edgtf-section .edgtf-video-wrap .edgtf-video').mediaelementplayer({
            enableKeyboard: false,
            iPadUseNativeControls: false,
            pauseOtherPlayers: false,
            // force iPhone's native controls
            iPhoneUseNativeControls: false,
            // force Android's native controls
            AndroidUseNativeControls: false
        });

        //mobile check
        if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
            edgtfInitVideoBackgroundSize();
            $('.edgtf-section .edgtf-mobile-video-image').show();
            $('.edgtf-section .edgtf-video-wrap').remove();
        }
    }

    /*
     **	Calculate video background size
     */
    function edgtfInitVideoBackgroundSize() {

        $('.edgtf-section .edgtf-video-wrap').each(function () {

            var element = $(this);
            var sectionWidth = element.closest('.edgtf-section').outerWidth();
            element.width(sectionWidth);

            var sectionHeight = element.closest('.edgtf-section').outerHeight();
            edgtf.minVideoWidth = edgtf.videoRatio * (sectionHeight + 20);
            element.height(sectionHeight);

            var scaleH = sectionWidth / edgtf.videoWidthOriginal;
            var scaleV = sectionHeight / edgtf.videoHeightOriginal;
            var scale = scaleV;
            if (scaleH > scaleV)
                scale = scaleH;
            if (scale * edgtf.videoWidthOriginal < edgtf.minVideoWidth) {
                scale = edgtf.minVideoWidth / edgtf.videoWidthOriginal;
            }

            element.find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * edgtf.videoWidthOriginal + 2));
            element.find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * edgtf.videoHeightOriginal + 2));
            element.scrollLeft((element.find('video').width() - sectionWidth) / 2);
            element.find('.mejs-overlay, .mejs-poster').scrollTop((element.find('video').height() - (sectionHeight)) / 2);
            element.scrollTop((element.find('video').height() - sectionHeight) / 2);
        });

    }

    /*
     **	Set content bottom margin because of the uncovering footer
     */
    function edgtfSetContentBottomMargin() {
        var uncoverFooter = $('body:not(.error404) .edgtf-footer-uncover');

        if (uncoverFooter.length && edgtf.windowWidth > 1024) {
            var footer = $('footer'),
                footerHeight = footer.find('.edgtf-footer-inner').outerHeight(),
                content = $('.edgtf-content');

            var uncoveringCalcs = function () {
                content.css('margin-bottom', footerHeight);
                footer.css('height', footerHeight);
            };

            //set
            uncoveringCalcs();
            content.css('background-color', edgtf.body.css('background-color'));

            $(window).resize(function () {
                //recalc
                footerHeight = footer.find('.edgtf-footer-inner').outerHeight();
                uncoveringCalcs();
            });
        }
    }

    function edgtfDisableScroll() {

        if (window.addEventListener) {
            window.addEventListener('wheel', edgtfWheel, {passive: false});
        }
        window.onmousewheel = document.onmousewheel = edgtfWheel;
        document.onkeydown = edgtfKeydown;

        if (edgtf.body.hasClass('edgtf-smooth-scroll')) {
            window.removeEventListener('mousewheel', smoothScrollListener, false);
            window.removeEventListener('wheel', smoothScrollListener, {passive: false});
        }
    }

    function edgtfEnableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('wheel', edgtfWheel, {passive: false});
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;

        if (edgtf.body.hasClass('edgtf-smooth-scroll')) {
            window.addEventListener('mousewheel', smoothScrollListener, false);
            window.addEventListener('wheel', smoothScrollListener, {passive: false});
        }
    }

    function edgtfWheel(e) {
        edgtfPreventDefaultValue(e);
    }

    function edgtfKeydown(e) {
        var keys = [37, 38, 39, 40];

        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                edgtfPreventDefaultValue(e);
                return;
            }
        }
    }

    function edgtfPreventDefaultValue(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function edgtfInitSelfHostedVideoPlayer() {

        var players = $('.edgtf-self-hosted-video');
        players.mediaelementplayer({
            audioWidth: '100%'
        });
    }

    function edgtfSelfHostedVideoSize() {

        $('.edgtf-self-hosted-video-holder .edgtf-video-wrap').each(function () {
            var thisVideo = $(this);

            var videoWidth = thisVideo.closest('.edgtf-self-hosted-video-holder').outerWidth();
            var videoHeight = videoWidth / edgtf.videoRatio;

            if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
                thisVideo.parent().width(videoWidth);
                thisVideo.parent().height(videoHeight);
            }

            thisVideo.width(videoWidth);
            thisVideo.height(videoHeight);

            thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
            thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
        });
    }

    function edgtfToTopButton(a) {

        var b = $("#edgtf-back-to-top");
        b.removeClass('off on');
        if (a === 'on') {
            b.addClass('on');
        } else {
            b.addClass('off');
        }
    }

    function edgtfBackButtonShowHide() {
        edgtf.window.scroll(function () {
            var b = $(this).scrollTop();
            var c = $(this).height();
            var d;
            if (b > 0) {
                d = b + c / 2;
            } else {
                d = 1;
            }
            if (d < 1e3) {
                edgtfToTopButton('off');
            } else {
                edgtfToTopButton('on');
            }
        });
    }

    function edgtfInitBackToTop() {
        var backToTopButton = $('#edgtf-back-to-top');
        backToTopButton.on('click', function (e) {
            e.preventDefault();
            edgtf.html.animate({scrollTop: 0}, edgtf.window.scrollTop() / 2, 'easeInOutCubic');
        });
    }

    function edgtfSmoothTransition() {
        var loader = $('body > .edgtf-smooth-transition-loader.edgtf-mimic-ajax');
        if (loader.length) {
            loader.fadeOut(1000, 'easeInOutQuint');
            $(window).bind("pageshow", function (event) {
                if (event.originalEvent.persisted) {
                    loader.fadeOut(1000, 'easeInOutQuint');
                }
            });

            $('a').click(function (e) {
                var a = $(this);
                if (
                    e.which === 1 && // check if the left mouse button has been pressed
                    a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
                    (typeof a.data('rel') === 'undefined') && //Not pretty photo link
                    (typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                    !a.hasClass('edgtf-like') && //Not like link
                    !a.parent().hasClass('edgtf-blog-load-more-button') && // not load more
                    (typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
                    (a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
                ) {
                    e.preventDefault();
                    loader.addClass('edgtf-hide-spinner');
                    loader.fadeIn(500, function () {
                        window.location = a.attr('href');
                    });
                }
            });
        }
    }

    /*
     *	Animations for overlapping content
     */
    function edgtfInitOverlapingAnimation() {

        var touchClass = $('.edgtf-no-animations-on-touch'),
            noAnimationsOnTouch = true,
            elements = $('.edgtf-overlapping-content-holder');

        if (touchClass.length) {
            noAnimationsOnTouch = false;
        }

        if (elements.length) {
            elements.each(function () {
                var element = $(this);
                if (noAnimationsOnTouch) {
                    element.appear(function () {
                        setTimeout(function () {
                            element.addClass('edgtf-animated');
                        }, 100);
                    }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
                } else {
                    element.addClass('edgtf-appeared');
                }
            });
        }

    }


})(jQuery);



(function ($) {
    'use strict';

    var ajax = {};

    edgtf.modules.ajax = ajax;

    var animation = {};
    ajax.animation = animation;

    ajax.edgtfFetchPage = edgtfFetchPage;
    ajax.edgtfInitAjax = edgtfInitAjax;
    ajax.edgtfHandleLinkClick = edgtfHandleLinkClick;
    ajax.edgtfInsertFetchedContent = edgtfInsertFetchedContent;
    ajax.edgtfInitBackBehavior = edgtfInitBackBehavior;
    ajax.edgtfSetActiveState = edgtfSetActiveState;
    ajax.edgtfReinitiateAll = edgtfReinitiateAll;
    ajax.edgtfHandleMeta = edgtfHandleMeta;

    ajax.edgtfOnDocumentReady = edgtfOnDocumentReady;
    ajax.edgtfOnWindowLoad = edgtfOnWindowLoad;
    ajax.edgtfOnWindowResize = edgtfOnWindowResize;
    ajax.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfInitAjax();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfHandleAjaxFader();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {
    }


    var loadedPageFlag = true; // Indicates whether the page is loaded
    var firstLoad = true; // Indicates whether this is the first loaded page, for back button functionality
    animation.type = null;
    animation.time = 500; // Duration of animation for the content to be changed
    animation.simultaneous = true; // False indicates that the new content should wait for the old content to disappear, true means that it appears at the same time as the old content disappears
    animation.loader = null;
    animation.loaderTime = 500;

    /**
     * Fetching the targeted page
     */
    function edgtfFetchPage(params, destinationSelector, targetSelector) {

        function setDefaultParam(key, value) {
            params[key] = typeof params[key] !== 'undefined' ? params[key] : value;
        }

        destinationSelector = typeof destinationSelector !== 'undefined' ? destinationSelector : '.edgtf-content';
        targetSelector = typeof targetSelector !== 'undefined' ? targetSelector : '.edgtf-content';

        // setting default ajax parameters
        params = typeof params !== 'undefined' ? params : {};

        setDefaultParam('url', window.location.href);
        setDefaultParam('type', 'POST');
        setDefaultParam('success', function (response) {
            var jResponse = $(response);

            var meta = jResponse.find('.edgtf-meta');
            if (meta.length) {
                edgtfHandleMeta(meta);
            }

            var new_content = jResponse.find(targetSelector);
            if (!new_content.length) {
                loadedPageFlag = true;
                return false;
            } else {
                edgtfInsertFetchedContent(params.url, new_content, destinationSelector);
            }
        });

        // setting data parameters
        setDefaultParam('ajaxReq', 'yes');
        //setDefaultParam('hasHeader', edgtf.body.find('header').length ? true : false);
        //setDefaultParam('hasFooter', edgtf.body.find('footer').length ? true : false);

        $.ajax({
            url: params.url,
            type: params.type,
            data: {
                ajaxReq: params.ajaxReq
                //hasHeader: params.hasHeader,
                //hasFooter: params.hasFooter
            },
            success: params.success
        });
    }

    function edgtfHandleAjaxFader() {
        if (animation.loader.length) {
            animation.loader.fadeOut(animation.loaderTime);
            $(window).on("pageshow", function (event) {
                if (event.originalEvent.persisted) {
                    animation.loader.fadeOut(animation.loaderTime);
                }
            });
        }
    }

    function edgtfInitAjax() {
        edgtf.body.removeClass('page-not-loaded'); // Might be necessary for ajax calls
        animation.loader = $('body > .edgtf-smooth-transition-loader.edgtf-ajax');
        if (animation.loader.length) {

            if (edgtf.body.hasClass('woocommerce') || edgtf.body.hasClass('woocommerce-page')) {
                return false;
            } else {
                edgtfInitBackBehavior();
                $(document).on('click', 'a[target!="_blank"]:not(.no-ajax):not(.no-link)', function (click) {
                    var link = $(this);

                    if (click.ctrlKey === 1) { // Check if CTRL key is held with the click
                        window.open(link.attr('href'), '_blank');
                        return false;
                    }

                    if (link.parents('.edgtf-ptf-load-more').length) {
                        return false;
                    } // Don't initiate ajax for portfolio load more link

                    if (link.parents('.edgtf-blog-load-more-button').length) {
                        return false;
                    } // Don't initiate ajax for blog load more link

                    if (link.parents('edgtf-post-info-comments').length) { // If it's a comment link, don't load any content, just scroll to the comments section
                        var hash = link.attr('href').split("#")[1];
                        $('html, body').scrollTop($("#" + hash).offset().top);
                        return false;
                    }

                    if (window.location.href.split('#')[0] === link.attr('href').split('#')[0]) {
                        return false;
                    } //  If the link leads to the same page, don't use ajax

                    if (link.closest('.edgtf-no-animation').length === 0) { // If no parents are set to no-animation...

                        if (document.location.href.indexOf("?s=") >= 0) { // Don't use ajax if currently on search page
                            return true;
                        }
                        if (link.attr('href').indexOf("wp-admin") >= 0) { // Don't use ajax for wp-admin
                            return true;
                        }
                        if (link.attr('href').indexOf("wp-content") >= 0) { // Don't use ajax for wp-content
                            return true;
                        }

                        if (jQuery.inArray(link.attr('href').split('#')[0], edgtfGlobalVars.vars.no_ajax_pages) !== -1) { // If the target page is a no-ajax page, don't use ajax
                            document.location.href = link.attr('href');
                            return false;
                        }

                        if ((link.attr('href') !== "http://#") && (link.attr('href') !== "#")) { // Don't use ajax if the link is empty
                            //disableHashChange = true;

                            var url = link.attr('href');
                            var start = url.indexOf(window.location.protocol + '//' + window.location.host); // Check if the link leads to the same domain
                            if (start === 0) {
                                if (!loadedPageFlag) {
                                    return false;
                                } //if page is not loaded don't load next one
                                click.preventDefault();
                                click.stopImmediatePropagation();
                                click.stopPropagation();
                                if (!link.is('.current')) {
                                    edgtfHandleLinkClick(link);
                                }
                            }

                        } else {
                            return false;
                        }
                    }
                });
            }
        }
    }

    function edgtfInitBackBehavior() {
        if (window.history.pushState) {
            /* the below code is to override back button to get the ajax content without reload*/
            $(window).on('popstate', function () {
                "use strict";

                var url = location.href;
                if (!firstLoad && loadedPageFlag) {
                    loadedPageFlag = false;
                    edgtfFetchPage({
                        url: url
                    });
                }
            });
        }
    }

    function edgtfHandleLinkClick(link) {
        loadedPageFlag = false;
        animation.loader.fadeIn(animation.loaderTime);
        edgtfFetchPage({
            url: link.attr('href')
        });
    }

    function edgtfSetActiveState(url) {
        var me = $("nav a[href='" + url + "'], .widget_nav_menu a[href='" + url + "']");

        $('.edgtf-main-menu a, .edgtf-mobile-nav a, .edgtf-mobile-nav h4, .edgtf-vertical-menu a, .popup_menu a, .widget_nav_menu a').removeClass('current').parent().removeClass('edgtf-active-item');
        //$('.main_menu a, .mobile_menu a, .mobile_menu h4, .vertical_menu a, .popup_menu a').parent().removeClass('active');
        $('.widget_nav_menu ul.menu > li').removeClass('current-menu-item');

        me.each(function () {
            var me = $(this);

            if (me.closest('.edgtf-menu-second').length === 0) {
                me.parent().addClass('edgtf-active-item');
            } else {
                me.closest('.edgtf-menu-second').parent().addClass('edgtf-active-item');
            }

            if (me.closest('.edgtf-mobile-nav').length > 0) {
                me.closest('.level0').addClass('edgtf-active-item');
                me.closest('.level1').addClass('edgtf-active-item');
                me.closest('.level2').addClass('edgtf-active-item');
            }

            if (me.closest('.widget_nav_menu').length > 0) {
                me.closest('.widget_nav_menu').find('.menu-item').addClass('current-menu-item');
            }

            me.addClass('current');
        });
    }

    /**
     * Reinitialize all functions
     *
     * @param modulesToExclude - array of modules to exclude from reinitialization
     */
    function edgtfReinitiateAll(modulesToExclude) {
        $(document).off(); // Remove all event handlers before reinitialization
        $(window).off();
        edgtf.body.off().find('*').off(); // Remove all event handlers before reinitialization

        edgtf.edgtfOnDocumentReady(); // Trigger all functions upon new page load
        edgtf.edgtfOnWindowLoad(); // Trigger all functions upon new page load
        $(window).resize(edgtf.edgtfOnWindowResize); // Reassign handles for resize and scroll events
        $(window).scroll(edgtf.edgtfOnWindowScroll); // Reassign handles for resize and scroll events

        var defaultModules = ['common', 'ajax', 'header', 'title', 'shortcodes', 'woocommerce', 'portfolio', 'blog', 'like'];
        var modules = [];

        if (typeof modulesToExclude !== 'undefined' && modulesToExclude.length) {
            defaultModules.forEach(function (key) {
                if (-1 === modulesToExclude.indexOf(key)) {
                    modules.push(key);
                }
            }, this);
        } else {
            modules = defaultModules;
        }

        for (var i = 0; i < modules.length; i++) {
            if (typeof edgtf.modules[modules[i]] !== 'undefined') {
                edgtf.modules[modules[i]].edgtfOnDocumentReady(); // Trigger all functions upon new page load
                edgtf.modules[modules[i]].edgtfOnWindowLoad(); // Trigger all functions upon new page load
                $(window).resize(edgtf.modules[modules[i]].edgtfOnWindowResize); // Reassign handles for resize and scroll events
                $(window).scroll(edgtf.modules[modules[i]].edgtfOnWindowScroll); // Reassign handles for resize and scroll events
            }
        }
    }

    function edgtfHandleMeta(meta_data) {
        // set up title, meta description and meta keywords
        var newTitle = meta_data.find(".edgtf-seo-title").text();
        var pageTransition = meta_data.find(".edgtf-page-transition").text();
        var newDescription = meta_data.find(".edgtf-seo-description").text();
        var newKeywords = meta_data.find(".edgtf-seo-keywords").text();
        if (typeof pageTransition !== 'undefined') {
            animation.type = pageTransition;
        }
        if ($('head meta[name="description"]').length) {
            $('head meta[name="description"]').attr('content', newDescription);
        } else if (typeof newDescription !== 'undefined') {
            $('<meta name="description" content="' + newDescription + '">').prependTo($('head'));
        }
        if ($('head meta[name="keywords"]').length) {
            $('head meta[name="keywords"]').attr('content', newKeywords);
        } else if (typeof newKeywords !== 'undefined') {
            $('<meta name="keywords" content="' + newKeywords + '">').prependTo($('head'));
        }
        document.title = newTitle;

        var newBodyClasses = meta_data.find(".edgtf-body-classes").text();
        var myArray = newBodyClasses.split(',');
        edgtf.body.removeClass();
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i] !== "edgtf-page-not-loaded") {
                edgtf.body.addClass(myArray[i]);
            }
        }

        if ($("#wp-admin-bar-edit").length > 0) {
            // set up edit link when wp toolbar is enabled
            var pageId = meta_data.find("#edgtf-page-id").text();
            var old_link = $('#wp-admin-bar-edit a').attr("href");
            var new_link = old_link.replace(/(post=).*?(&)/, '$1' + pageId + '$2');
            $('#wp-admin-bar-edit a').attr("href", new_link);
        }
    }

    function edgtfInsertFetchedContent(url, new_content, destinationSelector) {
        destinationSelector = typeof destinationSelector !== 'undefined' ? destinationSelector : '.edgtf-content';
        var destination = edgtf.body.find(destinationSelector);

        new_content.height(destination.height()).css({
            'position': 'absolute',
            'opacity': 0,
            'overflow': 'hidden'
        }).insertBefore(destination);

        new_content.waitForImages(function () {
            if (url.indexOf('#') !== -1) {
                $('<a class="edgtf-temp-anchor edgtf-anchor" href="' + url + '" style="display: none"></a>').appendTo('body');
            }
            edgtfReinitiateAll();

            if (animation.type === "fade") {
                destination.stop().fadeTo(animation.time, 0, function () {
                    destination.remove();
                    if (window.history.pushState) {
                        if (url !== window.location.href) {
                            window.history.pushState({path: url}, '', url);
                        }

                        //does Google Analytics code exists on page?
                        if (typeof _gaq !== 'undefined') {
                            //add new url to Google Analytics so it can be tracked
                            _gaq.push(['_trackPageview', url]);
                        }
                    } else {
                        document.location.href = window.location.protocol + '//' + window.location.host + '#' + url.split(window.location.protocol + '//' + window.location.host)[1];
                    }
                    edgtfSetActiveState(url);
                    edgtf.body.animate({scrollTop: 0}, animation.time, 'swing');
                });
                setTimeout(function () {
                    new_content.css('position', 'relative').height('').stop().fadeTo(animation.time, 1, function () {
                        loadedPageFlag = true;
                        firstLoad = false;
                        animation.loader.fadeOut(animation.loaderTime, function () {
                            var anch = $('.edgtf-temp-anchor');
                            if (anch.length) {
                                anch.trigger('click').remove();
                            }
                        });
                    });
                }, !animation.simultaneous * animation.time);
            }
        });
    }


})(jQuery);
(function ($) {
    "use strict";

    var header = {};
    edgtf.modules.header = header;

    header.isStickyVisible = false;
    header.stickyAppearAmount = 0;
    header.stickyMobileAppearAmount = 0;
    header.behaviour;
    header.edgtfSideArea = edgtfSideArea;
    header.edgtfSideAreaScroll = edgtfSideAreaScroll;
    header.edgtfFullscreenMenu = edgtfFullscreenMenu;
    header.edgtfInitMobileNavigation = edgtfInitMobileNavigation;
    header.edgtfMobileHeaderBehavior = edgtfMobileHeaderBehavior;
    header.edgtfSetDropDownMenuPosition = edgtfSetDropDownMenuPosition;
    header.edgtfDropDownMenu = edgtfDropDownMenu;
    header.edgtfSearch = edgtfSearch;

    header.edgtfOnDocumentReady = edgtfOnDocumentReady;
    header.edgtfOnWindowLoad = edgtfOnWindowLoad;
    header.edgtfOnWindowResize = edgtfOnWindowResize;
    header.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfHeaderBehaviour();
        edgtfSideArea();
        edgtfSideAreaScroll();
        edgtfFullscreenMenu();
        edgtfInitMobileNavigation();
        edgtfMobileHeaderBehavior();
        edgtfSetDropDownMenuPosition();
        edgtfSearch();
        edgtfVerticalMenu().init();
        edgtfShopDropDownMenu();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfSetDropDownMenuPosition();
        edgtfDropDownMenu();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
        edgtfDropDownMenu();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }


    /*
     **	Show/Hide sticky header on window scroll
     */
    function edgtfHeaderBehaviour() {

        var header = $('.edgtf-page-header');
        var stickyHeader = $('.edgtf-sticky-header');
        var fixedHeaderWrapper = $('.edgtf-fixed-wrapper');

        var headerMenuAreaOffset = $('.edgtf-page-header').find('.edgtf-fixed-wrapper').length ? $('.edgtf-page-header').find('.edgtf-fixed-wrapper').offset().top : null;

        var stickyAppearAmount;


        switch (true) {
            // sticky header that will be shown when user scrolls up
            case edgtf.body.hasClass('edgtf-sticky-header-on-scroll-up'):
                edgtf.modules.header.behaviour = 'edgtf-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = edgtfGlobalVars.vars.edgtfTopBarHeight + edgtfGlobalVars.vars.edgtfLogoAreaHeight + edgtfGlobalVars.vars.edgtfMenuAreaHeight + edgtfGlobalVars.vars.edgtfStickyHeaderHeight;

                var headerAppear = function () {
                    var docYScroll2 = $(document).scrollTop();

                    if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        edgtf.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.edgtf-main-menu .edgtf-menu-second').removeClass('edgtf-drop-down-start');
                    } else {
                        edgtf.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function () {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case edgtf.body.hasClass('edgtf-sticky-header-on-scroll-down-up'):
                edgtf.modules.header.behaviour = 'edgtf-sticky-header-on-scroll-down-up';

                if (edgtfPerPageVars.vars.edgtfStickyScrollAmount !== 0) {
                    edgtf.modules.header.stickyAppearAmount = edgtfPerPageVars.vars.edgtfStickyScrollAmount;
                } else {
                    edgtf.modules.header.stickyAppearAmount = edgtfGlobalVars.vars.edgtfStickyScrollAmount !== 0 ? edgtfGlobalVars.vars.edgtfStickyScrollAmount : edgtfGlobalVars.vars.edgtfTopBarHeight + edgtfGlobalVars.vars.edgtfLogoAreaHeight + edgtfGlobalVars.vars.edgtfMenuAreaHeight;
                }

                var headerAppear = function () {
                    if (edgtf.scroll < edgtf.modules.header.stickyAppearAmount) {
                        edgtf.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.edgtf-main-menu .edgtf-menu-second').removeClass('edgtf-drop-down-start');
                    } else {
                        edgtf.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function () {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case edgtf.body.hasClass('edgtf-fixed-on-scroll'):
                edgtf.modules.header.behaviour = 'edgtf-fixed-on-scroll';
                var headerFixed = function () {
                    if (edgtf.scroll < headerMenuAreaOffset) {
                        fixedHeaderWrapper.removeClass('fixed');
                        header.css('margin-bottom', 0);
                    } else {
                        fixedHeaderWrapper.addClass('fixed');
                        header.css('margin-bottom', fixedHeaderWrapper.height());
                    }
                };

                headerFixed();

                $(window).scroll(function () {
                    headerFixed();
                });

                break;
        }
    }

    /**
     * Show/hide side area
     */
    function edgtfSideArea() {

        var wrapper = $('.edgtf-wrapper'),
            sideMenu = $('.edgtf-side-menu'),
            sideMenuButtonOpen = $('a.edgtf-side-menu-button-opener'),
            cssClass,
            //Flags
            slideFromRight = false,
            slideWithContent = false,
            slideUncovered = false;

        if (edgtf.body.hasClass('edgtf-side-menu-slide-from-right')) {
            $('.edgtf-cover').remove();
            cssClass = 'edgtf-right-side-menu-opened';
            wrapper.prepend('<div class="edgtf-cover"/>');
            slideFromRight = true;

        } else if (edgtf.body.hasClass('edgtf-side-menu-slide-with-content')) {

            cssClass = 'edgtf-side-menu-open';
            slideWithContent = true;

        } else if (edgtf.body.hasClass('edgtf-side-area-uncovered-from-content')) {

            cssClass = 'edgtf-right-side-menu-opened';
            slideUncovered = true;

        }

        $('a.edgtf-side-menu-button-opener, a.edgtf-close-side-menu').on('click', function (e) {
            e.preventDefault();

            if (!sideMenuButtonOpen.hasClass('opened')) {

                sideMenuButtonOpen.addClass('opened');
                edgtf.body.addClass(cssClass);

                if (slideFromRight) {
                    $('.edgtf-wrapper .edgtf-cover').on('click', function () {
                        edgtf.body.removeClass('edgtf-right-side-menu-opened');
                        sideMenuButtonOpen.removeClass('opened');
                    });
                }

                if (slideUncovered) {
                    sideMenu.css({
                        'visibility': 'visible'
                    });
                }

                var currentScroll = $(window).scrollTop();
                $(window).scroll(function () {
                    if (Math.abs(edgtf.scroll - currentScroll) > 400) {
                        edgtf.body.removeClass(cssClass);
                        sideMenuButtonOpen.removeClass('opened');
                        if (slideUncovered) {
                            var hideSideMenu = setTimeout(function () {
                                sideMenu.css({'visibility': 'hidden'});
                                clearTimeout(hideSideMenu);
                            }, 400);
                        }
                    }
                });

            } else {

                sideMenuButtonOpen.removeClass('opened');
                edgtf.body.removeClass(cssClass);
                if (slideUncovered) {
                    var hideSideMenu = setTimeout(function () {
                        sideMenu.css({'visibility': 'hidden'});
                        clearTimeout(hideSideMenu);
                    }, 400);
                }

            }

            if (slideWithContent) {

                e.stopPropagation();
                wrapper.on('click', function () {
                    e.preventDefault();
                    sideMenuButtonOpen.removeClass('opened');
                    edgtf.body.removeClass('edgtf-side-menu-open');
                });

            }

        });

    }

    /*
    **  Smooth scroll functionality for Side Area
    */
    function edgtfSideAreaScroll() {

        var sideMenu = $('.edgtf-side-menu');

        if (sideMenu.length) {
            sideMenu.niceScroll({
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            });
        }
    }

    /**
     * Init Fullscreen Menu
     */
    function edgtfFullscreenMenu() {

        if ($('a.edgtf-fullscreen-menu-opener').length) {

            var popupMenuOpener = $('a.edgtf-fullscreen-menu-opener'),
                popupMenuHolderOuter = $(".edgtf-fullscreen-menu-holder-outer"),
                cssClass,
                //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
                //Widgets
                widgetAboveNav = $('.edgtf-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.edgtf-fullscreen-below-menu-widget-holder'),
                //Menu
                menuItems = $('.edgtf-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild = $('.edgtf-fullscreen-menu > ul li.edgtf-has-sub > a'),
                menuItemWithoutChild = $('.edgtf-fullscreen-menu ul li:not(.edgtf-has-sub) a');


            //set height of popup holder and initialize nicescroll
            popupMenuHolderOuter.height(edgtf.windowHeight).niceScroll({
                scrollspeed: 30,
                mousescrollstep: 20,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            }); //200 is top and bottom padding of holder

            //set height of popup holder on resize
            $(window).resize(function () {
                popupMenuHolderOuter.height(edgtf.windowHeight);
            });

            if (edgtf.body.hasClass('edgtf-fade-push-text-right')) {
                cssClass = 'edgtf-push-nav-right';
                fadeRight = true;
            } else if (edgtf.body.hasClass('edgtf-fade-push-text-top')) {
                cssClass = 'edgtf-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay': 0 + 'ms',
                        '-moz-animation-delay': 0 + 'ms',
                        'animation-delay': 0 + 'ms'
                    });
                }
                menuItems.each(function (i) {
                    $(this).css({
                        '-webkit-animation-delay': (i + 1) * 70 + 'ms',
                        '-moz-animation-delay': (i + 1) * 70 + 'ms',
                        'animation-delay': (i + 1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        '-moz-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        'animation-delay': (menuItems.length + 1) * 70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click', function (e) {
                e.preventDefault();

                if (!popupMenuOpener.hasClass('opened')) {
                    popupMenuOpener.addClass('opened');
                    edgtf.body.addClass('edgtf-fullscreen-menu-opened');
                    edgtf.body.removeClass('edgtf-fullscreen-fade-out').addClass('edgtf-fullscreen-fade-in');
                    edgtf.body.removeClass(cssClass);
                    if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                        edgtf.modules.common.edgtfDisableScroll();
                    }
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) {
                            popupMenuOpener.removeClass('opened');
                            edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                            edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                            edgtf.body.addClass(cssClass);
                            if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                            $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                                $('nav.popup_menu').getNiceScroll().resize();
                            });
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('opened');
                    edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                    edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                    edgtf.body.addClass(cssClass);
                    if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                        edgtf.modules.common.edgtfEnableScroll();
                    }
                    $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                        $('nav.popup_menu').getNiceScroll().resize();
                    });
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function (e) {
                e.preventDefault();

                if ($(this).parent().hasClass('edgtf-has-sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200, function () {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                        $(this).parent().removeClass('open_sub');
                    } else {
                        if ($(this).parent().siblings().hasClass('open_sub')) {
                            $(this).parent().siblings().each(function () {
                                var sibling = $(this);
                                if (sibling.hasClass('open_sub')) {
                                    var openedUl = sibling.find('> ul.sub_menu')
                                    openedUl.slideUp(200, function () {
                                        popupMenuHolderOuter.getNiceScroll().resize();
                                    });
                                    sibling.removeClass('open_sub');
                                }
                                if (sibling.find('.open_sub')) {
                                    var openedUlUl = sibling.find('.open_sub').find('> ul.sub_menu')
                                    openedUlUl.slideUp(200, function () {
                                        popupMenuHolderOuter.getNiceScroll().resize();
                                    });
                                    sibling.find('.open_sub').removeClass('open_sub');
                                }
                            });
                        }

                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200, function () {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                    }
                }
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click', function (e) {

                if (($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")) {

                    if (e.which === 1) {
                        popupMenuOpener.removeClass('opened');
                        edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                        edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                        edgtf.body.addClass(cssClass);
                        $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function () {
                            $('nav.popup_menu').getNiceScroll().resize();
                        });
                        edgtf.modules.common.edgtfEnableScroll();
                    }
                } else {
                    return false;
                }

            });

        }


    }

    function edgtfInitMobileNavigation() {
        var navigationOpener = $('.edgtf-mobile-header .edgtf-mobile-menu-opener');
        var navigationHolder = $('.edgtf-mobile-header .edgtf-mobile-nav');
        var dropdownOpener = $('.edgtf-mobile-nav .mobile_arrow, .edgtf-mobile-nav h4, .edgtf-mobile-nav a[href*="#"]');
        var animationSpeed = 200;

        //whole mobile menu opening / closing
        if (navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (navigationHolder.is(':visible')) {
                    navigationHolder.slideUp(animationSpeed);
                } else {
                    navigationHolder.slideDown(animationSpeed);
                }
            });
        }

        //dropdown opening / closing
        if (dropdownOpener.length) {
            dropdownOpener.each(function () {
                $(this).on('tap click', function (e) {
                    var dropdownToOpen = $(this).nextAll('ul').first();

                    if (dropdownToOpen.length) {
                        e.preventDefault();
                        e.stopPropagation();

                        var openerParent = $(this).parent('li');
                        if (dropdownToOpen.is(':visible')) {
                            dropdownToOpen.slideUp(animationSpeed);
                            openerParent.removeClass('edgtf-opened');
                        } else {
                            dropdownToOpen.slideDown(animationSpeed);
                            openerParent.addClass('edgtf-opened');
                        }
                    }

                });
            });
        }

        $('.edgtf-mobile-nav a, .edgtf-mobile-logo-wrapper a').on('click tap', function (e) {
            if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                navigationHolder.slideUp(animationSpeed);
            }
        });
    }

    function edgtfMobileHeaderBehavior() {
        if (edgtf.body.hasClass('edgtf-sticky-up-mobile-header')) {
            var stickyAppearAmount;
            var topBar = $('.edgtf-top-bar');
            var mobileHeader = $('.edgtf-mobile-header');
            var adminBar = $('#wpadminbar');
            var mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0;
            var topBarHeight = topBar.is(':visible') ? topBar.height() : 0;
            var adminBarHeight = adminBar.length ? adminBar.height() : 0;

            var docYScroll1 = $(document).scrollTop();
            edgtf.modules.header.stickyMobileAppearAmount = topBarHeight + mobileHeaderHeight + adminBarHeight;
            stickyAppearAmount = edgtf.modules.header.stickyMobileAppearAmount;

            $(window).scroll(function () {
                var docYScroll2 = $(document).scrollTop();

                if (docYScroll2 > stickyAppearAmount) {
                    mobileHeader.addClass('edgtf-animate-mobile-header');
                    mobileHeader.css('margin-bottom', mobileHeaderHeight);
                } else {
                    mobileHeader.removeClass('edgtf-animate-mobile-header');
                    mobileHeader.css('margin-bottom', 0);
                }

                if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                    mobileHeader.removeClass('mobile-header-appear');
                    if (adminBar.length) {
                        mobileHeader.find('.edgtf-mobile-header-inner').css('top', 0);
                    }
                } else {
                    mobileHeader.addClass('mobile-header-appear');

                }

                docYScroll1 = $(document).scrollTop();
            });
        }
    }

    /**
     * Set dropdown position
     */
    function edgtfSetDropDownMenuPosition() {

        var menuItems = $(".edgtf-drop-down > ul > li.edgtf-menu-narrow");
        menuItems.each(function (i) {

            var browserWidth = edgtf.windowWidth - 16; // 16 is width of scroll bar
            var menuItemPosition = $(this).offset().left;
            var dropdownMenuWidth = $(this).find('.edgtf-menu-second .edgtf-menu-inner ul').width();

            var menuItemFromLeft = 0;
            if (edgtf.body.hasClass('boxed')) {
                menuItemFromLeft = edgtf.boxedLayoutWidth - (menuItemPosition - (browserWidth - edgtf.boxedLayoutWidth) / 2);
            } else {
                menuItemFromLeft = browserWidth - menuItemPosition;
            }

            var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

            if ($(this).find('li.edgtf-sub').length > 0) {
                dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
            }

            if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
                $(this).find('.edgtf-menu-second').addClass('right');
                $(this).find('.edgtf-menu-second .edgtf-menu-inner ul').addClass('right');
            }
        });

    }


    function edgtfDropDownMenu() {

        var menu_items = $('.edgtf-drop-down > ul > li');

        menu_items.each(function (i) {
            if ($(menu_items[i]).find('.edgtf-menu-second').length > 0) {

                var dropDownSecondDiv = $(menu_items[i]).find('.edgtf-menu-second');

                if ($(menu_items[i]).hasClass('edgtf-menu-wide')) {

                    var dropdown = $(this).find('.edgtf-menu-inner > ul');
                    var dropdownPadding = parseInt(dropdown.css('padding-left').slice(0, -2)) + parseInt(dropdown.css('padding-right').slice(0, -2));
                    var dropdownWidth = dropdown.outerWidth();

                    if (!$(this).hasClass('edgtf-menu-left-position') && !$(this).hasClass('edgtf-menu-right-position')) {
                        dropDownSecondDiv.css('left', 0);
                    }

                    //set columns to be same height - start
                    var tallest = 0;
                    $(this).find('.edgtf-menu-second > .edgtf-menu-inner > ul > li').each(function () {
                        var thisHeight = $(this).height();
                        if (thisHeight > tallest) {
                            tallest = thisHeight;
                        }
                    });
                    $(this).find('.edgtf-menu-second > .edgtf-menu-inner > ul > li').css("height", ""); // delete old inline css - via resize
                    $(this).find('.edgtf-menu-second > .edgtf-menu-inner > ul > li').height(tallest);
                    //set columns to be same height - end

                    if (!$(this).hasClass('wide-background')) {
                        if (!$(this).hasClass('edgtf-menu-left-position') && !$(this).hasClass('edgtf-menu-right-position')) {
                            var left_position = (edgtf.windowWidth - 2 * (edgtf.windowWidth - dropdown.offset().left)) / 2 + (dropdownWidth + dropdownPadding) / 2;
                            dropDownSecondDiv.css('left', -left_position);
                        }
                    } else {
                        if (!$(this).hasClass('edgtf-menu-left-position') && !$(this).hasClass('edgtf-menu-right-position')) {
                            var left_position = dropdown.offset().left;

                            dropDownSecondDiv.css('left', -left_position);
                            dropDownSecondDiv.css('width', edgtf.windowWidth);

                        }
                    }
                }

                if (!edgtf.menuDropdownHeightSet) {
                    $(menu_items[i]).data('original_height', dropDownSecondDiv.height() + 'px');
                    dropDownSecondDiv.height(0);
                }

                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    $(menu_items[i]).on("touchstart mouseenter", function () {
                        dropDownSecondDiv.css({
                            'height': $(menu_items[i]).data('original_height'),
                            'overflow': 'visible',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                    }).on("mouseleave", function () {
                        dropDownSecondDiv.css({
                            'height': '0px',
                            'overflow': 'hidden',
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    });

                } else {
                    if (edgtf.body.hasClass('edgtf-dropdown-animate-height')) {

                        $(menu_items[i]).mouseenter(function () {
                            dropDownSecondDiv.css({
                                'visibility': 'visible',
                                'height': '0px',
                                'opacity': '0'
                            });
                            dropDownSecondDiv.stop().animate({
                                'height': $(menu_items[i]).data('original_height'),
                                opacity: 1
                            }, 300, function () {
                                dropDownSecondDiv.css('overflow', 'visible');
                            });
                        }).mouseleave(function () {
                            dropDownSecondDiv.stop().animate({
                                'height': '0px'
                            }, 0, function () {
                                dropDownSecondDiv.css({
                                    'overflow': 'hidden',
                                    'visibility': 'hidden'
                                });
                            });
                        });

                    } else {
                        var config = {
                            interval: 0,
                            over: function () {
                                setTimeout(function () {
                                    dropDownSecondDiv.addClass('edgtf-drop-down-start');
                                    dropDownSecondDiv.stop().css({'height': $(menu_items[i]).data('original_height')});
                                }, 150);
                            },
                            timeout: 150,
                            out: function () {
                                dropDownSecondDiv.stop().css({'height': '0px'});
                                dropDownSecondDiv.removeClass('edgtf-drop-down-start');
                            }
                        };
                        $(menu_items[i]).hoverIntent(config);
                    }
                }
            }
        });
        $('.edgtf-drop-down ul li.edgtf-menu-wide ul li a').on('click', function (e) {
            if (e.which === 1) {
                var $this = $(this);
                setTimeout(function () {
                    $this.mouseleave();
                }, 500);
            }
        });

        edgtf.menuDropdownHeightSet = true;
    }

    function edgtfShopDropDownMenu() {
        if (edgtf.body.hasClass('edgtf-dropdown-animate-height')) {
            var shoppingCart = $('.edgtf-shopping-cart-outer');

            shoppingCart.mouseenter(function () {
                var shopMenu = $(this).find(".edgtf-shopping-cart-dropdown"),
                    shopMenuHeight = shopMenu.height();

                shopMenu.css({
                    'visibility': 'visible',
                    'height': '0px',
                    'opacity': '0'
                });

                shopMenu.stop().animate({
                    'height': shopMenuHeight,
                    'opacity': '1'
                }, 600, 'easeInOutQuint');

            }).mouseleave(function () {

                var shopMenu = $(this).find(".edgtf-shopping-cart-dropdown");

                shopMenu.css({
                    'height': 'auto'
                });

                var shopMenuHeight = shopMenu.height();

                $(".edgtf-shopping-cart-dropdown").stop().animate({
                    'opacity': '0',
                    'height': shopMenuHeight
                }, 0, function () {
                    shopMenu.css({
                        'overflow': 'hidden',
                        'visibility': 'hidden'
                    });
                });
            });
        }
    }

    /**
     * Init Search Types
     */
    function edgtfSearch() {

        var searchOpener = $('a.edgtf-search-opener'),
            searchClose,
            touch = false;

        if ($('html').hasClass('touch')) {
            touch = true;
        }

        if (searchOpener.length > 0) {

            searchOpener.each(function () {
                var thisSearchOpener = $(this);

                //Check for type of search
                if (edgtf.body.hasClass('edgtf-fullscreen-search')) {

                    var fullscreenSearchFade = false,
                        fullscreenSearchFromCircle = false;

                    searchClose = $('.edgtf-fullscreen-search-close');

                    if (edgtf.body.hasClass('edgtf-search-fade')) {
                        fullscreenSearchFade = true;
                    } else if (edgtf.body.hasClass('edgtf-search-from-circle')) {
                        fullscreenSearchFromCircle = true;
                    }
                    edgtfFullscreenSearch(fullscreenSearchFade, fullscreenSearchFromCircle);

                } else if (edgtf.body.hasClass('edgtf-search-covers-header')) {

                    edgtfSearchCoversHeader();

                }

                //Check for hover color of search
                if (typeof thisSearchOpener.data('hover-color') !== 'undefined') {
                    var changeSearchColor = function (event) {
                        event.data.searchOpener.css('color', event.data.color);
                    };

                    var originalColor = thisSearchOpener.css('color');
                    var hoverColor = thisSearchOpener.data('hover-color');

                    thisSearchOpener.on('mouseenter', {
                        searchOpener: thisSearchOpener,
                        color: hoverColor
                    }, changeSearchColor);
                    thisSearchOpener.on('mouseleave', {
                        searchOpener: thisSearchOpener,
                        color: originalColor
                    }, changeSearchColor);
                }

            });
        }

        /**
         * Search covers header type of search
         */
        function edgtfSearchCoversHeader() {

            searchOpener.on('click', function (e) {
                e.preventDefault();
                var searchFormHeight,
                    searchFormHolder = $('.edgtf-search-cover .edgtf-form-holder-outer'),
                    searchFormHolderPosition = $('.edgtf-search-cover .edgtf-form-holder-outer'),
                    searchClose = searchFormHolder.find('.edgtf-search-close'),
                    searchForm,
                    searchFormLandmark; // there is one more div element if header is in grid

                if ($(this).closest('.edgtf-grid').length) {
                    searchForm = $(this).closest('.edgtf-grid').children().first();
                    searchFormLandmark = searchForm.parent();
                } else {
                    searchForm = $(this).closest('.edgtf-menu-area').children().first();
                    searchFormLandmark = searchForm;
                }

                if ($(this).closest('.edgtf-sticky-header').length > 0) {
                    searchForm = $(this).closest('.edgtf-sticky-header').children().first();
                    searchFormLandmark = searchForm.parent();
                    searchFormHolderPosition = $(this).closest('.edgtf-sticky-header').find('.edgtf-form-holder-outer');
                }
                if ($(this).closest('.edgtf-mobile-header').length > 0) {
                    searchForm = $(this).closest('.edgtf-mobile-header').children().children().first();
                }

                //Find search form position in header and height
                if (searchFormLandmark.parent().hasClass('edgtf-logo-area')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfLogoAreaHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-top-bar')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfTopBarHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-menu-area')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfMenuAreaHeight - edgtfGlobalVars.vars.edgtfTopBarHeight;
                } else if (searchFormLandmark.hasClass('edgtf-sticky-header')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfStickyHeaderHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-mobile-header')) {
                    searchFormHeight = $('.edgtf-mobile-header-inner').height();
                }


                searchFormHolder.height(searchFormHeight);
                searchForm.stop(true).fadeIn(400, 'easeInOutQuint');

                searchClose.css({
                    'left': searchOpener.offset().left - searchFormHolderPosition.offset().left,
                    'right': 'auto'
                });
                $('.edgtf-search-cover input[type="text"]').focus();
                $('.edgtf-search-close, .edgtf-content, footer').on('click', function (e) {
                    e.preventDefault();
                    searchForm.stop(true).fadeOut(250, 'easeInOutQuint');
                });
                searchForm.blur(function () {
                    searchForm.stop(true).fadeOut(250, 'easeInOutQuint');
                });
                //Close on escape
                $(document).keyup(function (e) {
                    if (e.keyCode === 27) { //KeyCode for ESC button is 27
                        searchForm.stop(true).fadeOut(250, 'easeInOutQuint');
                    }
                });
            });

        }

        /**
         * Fullscreen search (two types: fade and from circle)
         */
        function edgtfFullscreenSearch(fade, fromCircle) {

            var searchHolder = $('.edgtf-fullscreen-search-holder'),
                searchOverlay = $('.edgtf-fullscreen-search-overlay');

            searchOpener.on('click', function (e) {
                e.preventDefault();
                var samePosition = false;
                if ($(this).data('icon-close-same-position') === 'yes') {
                    var closeTop = $(this).offset().top;
                    var closeLeft = $(this).offset().left;
                    samePosition = true;
                }
                //Fullscreen search fade
                if (fade) {
                    if (searchHolder.hasClass('edgtf-animate')) {
                        edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                        edgtf.body.addClass('edgtf-search-fade-out');
                        edgtf.body.removeClass('edgtf-search-fade-in');
                        searchHolder.removeClass('edgtf-animate');
                        if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                            edgtf.modules.common.edgtfEnableScroll();
                        }
                    } else {
                        edgtf.body.addClass('edgtf-fullscreen-search-opened');
                        edgtf.body.removeClass('edgtf-search-fade-out');
                        edgtf.body.addClass('edgtf-search-fade-in');
                        searchHolder.addClass('edgtf-animate');
                        if (samePosition) {
                            searchClose.css({
                                'top': closeTop - edgtf.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                'left': closeLeft
                            });
                        }
                        if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                            edgtf.modules.common.edgtfDisableScroll();
                        }
                    }
                    searchClose.on('click', function (e) {
                        e.preventDefault();
                        edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                        searchHolder.removeClass('edgtf-animate');
                        edgtf.body.removeClass('edgtf-search-fade-in');
                        edgtf.body.addClass('edgtf-search-fade-out');
                        if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                            edgtf.modules.common.edgtfEnableScroll();
                        }
                    });
                    //Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { //KeyCode for ESC button is 27
                            edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                            searchHolder.removeClass('edgtf-animate');
                            edgtf.body.removeClass('edgtf-search-fade-in');
                            edgtf.body.addClass('edgtf-search-fade-out');
                            if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                        }
                    });
                }
                //Fullscreen search from circle
                if (fromCircle) {
                    if (searchOverlay.hasClass('edgtf-animate')) {
                        searchOverlay.removeClass('edgtf-animate');
                        searchHolder.css({
                            'opacity': 0,
                            'display': 'none'
                        });
                        searchClose.css({
                            'opacity': 0,
                            'visibility': 'hidden'
                        });
                        searchOpener.css({
                            'opacity': 1
                        });
                    } else {
                        searchOverlay.addClass('edgtf-animate');
                        searchHolder.css({
                            'display': 'block'
                        });
                        setTimeout(function () {
                            searchHolder.css('opacity', '1');
                            searchClose.css({
                                'opacity': 1,
                                'visibility': 'visible',
                                'top': closeTop - edgtf.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                'left': closeLeft
                            });
                            if (samePosition) {
                                searchClose.css({
                                    'top': closeTop - edgtf.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                    'left': closeLeft
                                });
                            }
                            searchOpener.css({
                                'opacity': 0
                            });
                        }, 200);
                        if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                            edgtf.modules.common.edgtfDisableScroll();
                        }
                    }
                    searchClose.on('click', function (e) {
                        e.preventDefault();
                        searchOverlay.removeClass('edgtf-animate');
                        searchHolder.css({
                            'opacity': 0,
                            'display': 'none'
                        });
                        searchClose.css({
                            'opacity': 0,
                            'visibility': 'hidden'
                        });
                        searchOpener.css({
                            'opacity': 1
                        });
                        if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                            edgtf.modules.common.edgtfEnableScroll();
                        }
                    });
                    //Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { //KeyCode for ESC button is 27
                            searchOverlay.removeClass('edgtf-animate');
                            searchHolder.css({
                                'opacity': 0,
                                'display': 'none'
                            });
                            searchClose.css({
                                'opacity': 0,
                                'visibility': 'hidden'
                            });
                            searchOpener.css({
                                'opacity': 1
                            });
                            if (!edgtf.body.hasClass('page-template-full_screen-php')) {
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                        }
                    });
                }
            });

            //Text input focus change
            $('.edgtf-fullscreen-search-holder .edgtf-search-field').focus(function () {
                $('.edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line').css("width", "100%");
            });

            $('.edgtf-fullscreen-search-holder .edgtf-search-field').blur(function () {
                $('.edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line').css("width", "0");
            });

        }

    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var edgtfVerticalMenu = function () {
        /**
         * Main vertical area object that used through out function
         * @type {jQuery object}
         */
        var verticalMenuObject = $('.edgtf-vertical-menu-area');

        /**
         * Resizes vertical area. Called whenever height of navigation area changes
         * It first check if vertical area is scrollable, and if it is resizes scrollable area
         */
        //var resizeVerticalArea = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.getNiceScroll().resize();
        //    }
        //};

        /**
         * Checks if vertical area is scrollable (if it has edgtf-with-scroll class)
         *
         * @returns {bool}
         */
        //var verticalAreaScrollable = function() {
        //    return verticalMenuObject.hasClass('.edgtf-with-scroll');
        //};

        /**
         * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
         */
        var initNavigation = function () {
            var verticalNavObject = verticalMenuObject.find('.edgtf-vertical-menu');
            var navigationType = typeof verticalNavObject.data('navigation-type') !== 'undefined' ? verticalNavObject.data('navigation-type') : '';

            switch (navigationType) {
                //case 'dropdown-toggle':
                //    dropdownHoverToggle();
                //    break;
                //case 'dropdown-toggle-click':
                //    dropdownClickToggle();
                //    break;
                //case 'float':
                //    dropdownFloat();
                //    break;
                //case 'slide-in':
                //    dropdownSlideIn();
                //    break;
                default:
                    dropdownFloat();
                    break;
            }

            /**
             * Initializes hover toggle navigation type. It has separate functionalities for touch and no-touch devices
             */
            //function dropdownHoverToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .edgtf-menu-second, > ul');
            //        var numberOfChildItems = elementToExpand.find(' > .inner > ul > li, > li').length;
            //
            //        var animSpeed = numberOfChildItems * 40;
            //        var animFunc = 'easeInOutSine';
            //        var that = this;
            //
            //        //touch devices functionality
            //        if(Modernizr.touch) {
            //            var dropdownOpener = $(this).find('> a');
            //
            //            dropdownOpener.on('click tap', function(e) {
            //                e.preventDefault();
            //                e.stopPropagation();
            //
            //                if(elementToExpand.is(':visible')) {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                } else {
            //                    $(that).addClass('open');
            //                    elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }
            //            });
            //        } else {
            //            $(this).hover(function() {
            //                $(that).addClass('open');
            //                elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                    resizeVerticalArea();
            //                });
            //            }, function() {
            //                setTimeout(function() {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }, 1000);
            //            });
            //        }
            //    });
            //}

            /**
             * Initializes click toggle navigation type. Works the same for touch and no-touch devices
             */
            //function dropdownClickToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .edgtf-menu-second, > ul');
            //        var menuItem = this;
            //        var dropdownOpener = $(this).find('> a');
            //        var slideUpSpeed = 'fast';
            //        var slideDownSpeed = 'slow';
            //
            //        dropdownOpener.on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            if(elementToExpand.is(':visible')) {
            //                $(menuItem).removeClass('open');
            //                elementToExpand.slideUp(slideUpSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            } else {
            //                if(!$(this).parents('li').hasClass('open')) {
            //                    menuItems.removeClass('open');
            //                    menuItems.find(' > .edgtf-menu-second, > ul').slideUp(slideUpSpeed);
            //                }
            //
            //                $(menuItem).addClass('open');
            //                elementToExpand.slideDown(slideDownSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            }
            //        });
            //    });
            //}

            /**
             * Initializes floating navigation type (it comes from the side as a dropdown)
             */
            function dropdownFloat() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
                var allDropdowns = menuItems.find(' > .edgtf-menu-second, > ul');

                menuItems.each(function () {
                    var elementToExpand = $(this).find(' > .edgtf-menu-second, > ul');
                    var menuItem = this;

                    if (Modernizr.touch) {
                        var dropdownOpener = $(this).find('> a');

                        dropdownOpener.on('click tap', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            if (elementToExpand.hasClass('edgtf-float-open')) {
                                elementToExpand.removeClass('edgtf-float-open');
                                $(menuItem).removeClass('open');
                            } else {
                                if (!$(this).parents('li').hasClass('open')) {
                                    menuItems.removeClass('open');
                                    allDropdowns.removeClass('edgtf-float-open');
                                }

                                elementToExpand.addClass('edgtf-float-open');
                                $(menuItem).addClass('open');
                            }
                        });
                    } else {
                        //must use hoverIntent because basic hover effect doesn't catch dropdown
                        //it doesn't start from menu item's edge
                        $(this).hoverIntent({
                            over: function () {
                                elementToExpand.addClass('edgtf-float-open');
                                $(menuItem).addClass('open');
                            },
                            out: function () {
                                elementToExpand.removeClass('edgtf-float-open');
                                $(menuItem).removeClass('open');
                            },
                            timeout: 300
                        });
                    }
                });
            }

            /**
             * Initializes slide in navigation type (dropdowns are coming on top of parent element and cover whole navigation area)
             */
            //function dropdownSlideIn() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //    var menuItemsLinks = menuItems.find('> a');
            //
            //    menuItemsLinks.each(function() {
            //        var elementToExpand = $(this).next('.edgtf-menu-second, ul');
            //        appendToExpandableElement(elementToExpand, this);
            //
            //        if($(this).parent('li').is('.current-menu-ancestor', '.current_page_parent', '.current-menu-parent ')) {
            //            elementToExpand.addClass('edgtf-vertical-slide-open');
            //        }
            //
            //        $(this).on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            menuItems.removeClass('open');
            //
            //            $(this).parent('li').addClass('open');
            //            elementToExpand.addClass('edgtf-vertical-slide-open');
            //        });
            //    });
            //
            //    var previousLevelItems = menuItems.find('li.edgtf-previous-level > a');
            //
            //    previousLevelItems.on('click tap', function(e) {
            //        e.preventDefault();
            //        e.stopPropagation();
            //
            //        menuItems.removeClass('open');
            //        $(this).parents('.edgtf-vertical-slide-open').first().removeClass('edgtf-vertical-slide-open');
            //    });
            //
            //    /**
            //     * Appends 'li' element as first element in dropdown, which will close current dropdown when clicked
            //     * @param {jQuery object} elementToExpand current dropdown to append element to
            //     * @param currentMenuItem
            //     */
            //    function appendToExpandableElement(elementToExpand, currentMenuItem) {
            //        var itemUrl = $(currentMenuItem).attr('href');
            //        var itemText = $(currentMenuItem).text();
            //
            //        var liItem = $('<li />', {class: 'edgtf-previous-level'});
            //
            //        $('<a />', {
            //            'href': itemUrl,
            //            'html': '<i class="edgtf-vertical-slide-arrow fa fa-angle-left"></i>' + itemText
            //        }).appendTo(liItem);
            //
            //        if(elementToExpand.hasClass('second')) {
            //            elementToExpand.find('> div > ul').prepend(liItem);
            //        } else {
            //            elementToExpand.prepend(liItem);
            //        }
            //    }
            //}
        };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        //var initVerticalAreaScroll = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.niceScroll({
        //            scrollspeed: 60,
        //            mousescrollstep: 40,
        //            cursorwidth: 0,
        //            cursorborder: 0,
        //            cursorborderradius: 0,
        //            cursorcolor: "transparent",
        //            autohidemode: false,
        //            horizrailenabled: false
        //        });
        //    }
        //};

        //var initHiddenVerticalArea = function() {
        //    var verticalLogo = $('.edgtf-vertical-area-bottom-logo');
        //    var verticalMenuOpener = verticalMenuObject.find('.edgtf-vertical-menu-hidden-button');
        //    var scrollPosition = 0;
        //
        //    verticalMenuOpener.on('click tap', function() {
        //        if(isVerticalAreaOpen()) {
        //            closeVerticalArea();
        //        } else {
        //            openVerticalArea();
        //        }
        //    });
        //
        //    //take click outside vertical left/right area and close it
        //    $j(verticalMenuObject).outclick({
        //        callback: function() {
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    $(window).scroll(function() {
        //        if(Math.abs($(window).scrollTop() - scrollPosition) > 400){
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    /**
        //     * Closes vertical menu area by removing 'active' class on that element
        //     */
        //    function closeVerticalArea() {
        //        verticalMenuObject.removeClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.removeClass('active');
        //        }
        //    }
        //
        //    /**
        //     * Opens vertical menu area by adding 'active' class on that element
        //     */
        //    function openVerticalArea() {
        //        verticalMenuObject.addClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.addClass('active');
        //        }
        //
        //        scrollPosition = $(window).scrollTop();
        //    }
        //
        //    function isVerticalAreaOpen() {
        //        return verticalMenuObject.hasClass('active');
        //    }
        //};

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function () {
                if (verticalMenuObject.length) {
                    initNavigation();
                    //initVerticalAreaScroll();
                    //
                    //if(edgtf.body.hasClass('edgtf-vertical-header-hidden')) {
                    //    initHiddenVerticalArea();
                    //}
                }
            }
        };
    };

})(jQuery);
(function($) {
    "use strict";

    var title = {};
    edgtf.modules.title = title;

    title.edgtfParallaxTitle = edgtfParallaxTitle;

    title.edgtfOnDocumentReady = edgtfOnDocumentReady;
    title.edgtfOnWindowLoad = edgtfOnWindowLoad;
    title.edgtfOnWindowResize = edgtfOnWindowResize;
    title.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfParallaxTitle();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {

    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }
    

    /*
     **	Title image with parallax effect
     */
    function edgtfParallaxTitle(){
        if($('.edgtf-title.edgtf-has-parallax-background').length > 0 && $('.touch').length === 0){

            var parallaxBackground = $('.edgtf-title.edgtf-has-parallax-background');
            var parallaxBackgroundWithZoomOut = $('.edgtf-title.edgtf-has-parallax-background.edgtf-zoom-out');

            var backgroundSizeWidth = parseInt(parallaxBackground.data('background-width').match(/\d+/));
            var titleHolderHeight = parallaxBackground.data('height');
            var titleRate = (titleHolderHeight / 10000) * 7;
            var titleYPos = -(edgtf.scroll * titleRate);

            //set position of background on doc ready
            parallaxBackground.css({'background-position': 'center '+ (titleYPos+edgtfGlobalVars.vars.edgtfAddForAdminBar) +'px' });
            parallaxBackgroundWithZoomOut.css({'background-size': backgroundSizeWidth-edgtf.scroll + 'px auto'});

            //set position of background on window scroll
            $(window).scroll(function() {
                titleYPos = -(edgtf.scroll * titleRate);
                parallaxBackground.css({'background-position': 'center ' + (titleYPos+edgtfGlobalVars.vars.edgtfAddForAdminBar) + 'px' });
                parallaxBackgroundWithZoomOut.css({'background-size': backgroundSizeWidth-edgtf.scroll + 'px auto'});
            });

        }
    }

})(jQuery);

(function ($) {
    'use strict';

    var shortcodes = {};

    edgtf.modules.shortcodes = shortcodes;

    shortcodes.edgtfInitCounter = edgtfInitCounter;
    shortcodes.edgtfInitProgressBars = edgtfInitProgressBars;
    shortcodes.edgtfInitCountdown = edgtfInitCountdown;
    shortcodes.edgtfInitMessages = edgtfInitMessages;
    shortcodes.edgtfInitMessageHeight = edgtfInitMessageHeight;
    shortcodes.edgtfInitTestimonials = edgtfInitTestimonials;
    shortcodes.edgtfInitCarousels = edgtfInitCarousels;
    shortcodes.edgtfInitPieChart = edgtfInitPieChart;
    shortcodes.edgtfInitPieChartDoughnut = edgtfInitPieChartDoughnut;
    shortcodes.edgtfInitTabs = edgtfInitTabs;
    shortcodes.edgtfInitTabIcons = edgtfInitTabIcons;
    shortcodes.edgtfInitBlogListMasonry = edgtfInitBlogListMasonry;
    shortcodes.edgtfCustomFontResize = edgtfCustomFontResize;
    shortcodes.edgtfInitImageGallery = edgtfInitImageGallery;
    shortcodes.edgtfProjectPresentationSlider = edgtProjectPresentationSlider;
    shortcodes.edgtfInitAccordions = edgtfInitAccordions;
    shortcodes.edgtfShowGoogleMap = edgtfShowGoogleMap;
    shortcodes.edgtfInitPortfolioListMasonry = edgtfInitPortfolioListMasonry;
    shortcodes.edgtfInitPortfolioListPinterest = edgtfInitPortfolioListPinterest;
    shortcodes.edgtfInitPortfolio = edgtfInitPortfolio;
    shortcodes.edgtfInitPortfolioMasonryFilter = edgtfInitPortfolioMasonryFilter;
    shortcodes.edgtfInitPortfolioSlider = edgtfInitPortfolioSlider;
    shortcodes.edgtfInitPortfolioLoadMore = edgtfInitPortfolioLoadMore;
    shortcodes.edgtfCheckSliderForHeaderStyle = edgtfCheckSliderForHeaderStyle;
    shortcodes.edgtfInitShopListMasonry = edgtfInitShopListMasonry;
    shortcodes.edgtfItemShowcase = edgtfItemShowcase;
    shortcodes.edgtfAnimationsHolder = edgtfAnimationsHolder;
    shortcodes.edgtfInitImageGalleryMasonry = edgtfInitImageGalleryMasonry;
    shortcodes.edgtfReservationFormDatePicker = edgtfReservationFormDatePicker;

    shortcodes.edgtfOnDocumentReady = edgtfOnDocumentReady;
    shortcodes.edgtfOnWindowLoad = edgtfOnWindowLoad;
    shortcodes.edgtfOnWindowResize = edgtfOnWindowResize;
    shortcodes.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfInitCounter();
        edgtfInitProgressBars();
        edgtfInitCountdown();
        edgtfIcon().init();
        edgtfInitMessages();
        edgtfInitMessageHeight();
        edgtfInitTestimonials();
        edgtfInitCarousels();
        edgtfInitPieChart();
        edgtfInitPieChartDoughnut();
        edgtfInitTabs();
        edgtfInitElementsHolderResponsiveStyle();
        edgtfInitTabIcons();
        edgtfButton().init();
        edgtfInitBlogListMasonry();
        edgtfInitBlogSlider();
        edgtfCustomFontResize();
        edgtfInitImageGallery();
        edgtProjectPresentationSlider();
        edgtfInitAccordions();
        edgtfShowGoogleMap();
        edgtfInitPortfolioListMasonry();
        edgtfInitPortfolioListPinterest();
        edgtfInitPortfolio();
        edgtfInitPortfolioMasonryFilter();
        edgtfInitPortfolioSlider();
        edgtfInitPortfolioLoadMore();
        edgtfSlider().init();
        edgtfSocialIconWidget().init();
        edgtfInitIconList().init();
        edgtfInitShopListMasonry();
        edgtfInitMasonryGallery();
        edgtfItemShowcase();
        edgtfCustomFontTypeOut();
        edgtfInitImageGalleryMasonry();
        edgtfReservationFormDatePicker();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfAnimationsHolder();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
        edgtfInitBlogListMasonry();
        //edgtfInitBlogSlider();
        edgtfCustomFontResize();
        edgtfInitPortfolioListMasonry();
        edgtfInitPortfolioListPinterest();
        edgtfInitMessageHeight();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }


    /**
     * Counter Shortcode
     */
    function edgtfInitCounter() {

        var counters = $('.edgtf-counter');


        if (counters.length) {
            counters.each(function () {
                var counter = $(this);
                counter.appear(function () {
                    counter.parent().addClass('edgtf-counter-holder-show');

                    //Counter zero type
                    if (counter.hasClass('zero')) {
                        var max = parseFloat(counter.text());
                        counter.countTo({
                            from: 0,
                            to: max,
                            speed: 1500,
                            refreshInterval: 100
                        });
                    } else {
                        counter.absoluteCounter({
                            speed: 2000,
                            fadeInDelay: 1000
                        });
                    }

                }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
            });

            var counterTitle = $('.edgtf-counter-title');
            if (counterTitle.length) {
                counterTitle.each(function () {
                    var thisTitle = $(this);
                    if (typeof thisTitle.data('hover-color') !== 'undefined') {
                        var changeTitleColor = function (event) {
                            event.data.thisTitle.css('color', event.data.color);
                        };

                        var originalColor = thisTitle.css('color');
                        var hoverColor = thisTitle.data('hover-color');

                        thisTitle.on('mouseenter', {thisTitle: thisTitle, color: hoverColor}, changeTitleColor);
                        thisTitle.on('mouseleave', {thisTitle: thisTitle, color: originalColor}, changeTitleColor);
                    }
                });
            }
        }

    }

    /*
     **	Elements Holder responsive style
     */
    function edgtfInitElementsHolderResponsiveStyle() {

        var elementsHolder = $('.edgtf-elements-holder');

        if (elementsHolder.length) {
            elementsHolder.each(function () {
                var thisElementsHolder = $(this),
                    elementsHolderItem = thisElementsHolder.children('.edgtf-elements-holder-item'),
                    style = '',
                    responsiveStyle = '';

                elementsHolderItem.each(function () {
                    var thisItem = $(this),
                        itemClass = '',
                        largeLaptop = '',
                        smallLaptop = '',
                        ipadLandscape = '',
                        ipadPortrait = '',
                        mobileLandscape = '',
                        mobilePortrait = '';

                    if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                        itemClass = thisItem.data('item-class');
                    }
                    if (typeof thisItem.data('1280-1600') !== 'undefined' && thisItem.data('1280-1600') !== false) {
                        largeLaptop = thisItem.data('1280-1600');
                    }
                    if (typeof thisItem.data('1024-1280') !== 'undefined' && thisItem.data('1024-1280') !== false) {
                        smallLaptop = thisItem.data('1024-1280');
                    }
                    if (typeof thisItem.data('768-1024') !== 'undefined' && thisItem.data('768-1024') !== false) {
                        ipadLandscape = thisItem.data('768-1024');
                    }
                    if (typeof thisItem.data('600-768') !== 'undefined' && thisItem.data('600-768') !== false) {
                        ipadPortrait = thisItem.data('600-768');
                    }
                    if (typeof thisItem.data('480-600') !== 'undefined' && thisItem.data('480-600') !== false) {
                        mobileLandscape = thisItem.data('480-600');
                    }
                    if (typeof thisItem.data('480') !== 'undefined' && thisItem.data('480') !== false) {
                        mobilePortrait = thisItem.data('480');
                    }

                    if (largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

                        if (largeLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1280px) and (max-width: 1600px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + largeLaptop + " !important; } }";
                        }
                        if (smallLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1024px) and (max-width: 1280px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + smallLaptop + " !important; } }";
                        }
                        if (ipadLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 768px) and (max-width: 1024px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + ipadLandscape + " !important; } }";
                        }
                        if (ipadPortrait.length) {
                            responsiveStyle += "@media only screen and (min-width: 600px) and (max-width: 768px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + ipadPortrait + " !important; } }";
                        }
                        if (mobileLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 480px) and (max-width: 600px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + mobileLandscape + " !important; } }";
                        }
                        if (mobilePortrait.length) {
                            responsiveStyle += "@media only screen and (max-width: 480px) {.edgtf-elements-holder-item-content." + itemClass + " { padding: " + mobilePortrait + " !important; } }";
                        }
                    }
                });

                if (responsiveStyle.length) {
                    style = '<style type="text/css" data-type="barista_style_handle_shortcodes_custom_css">' + responsiveStyle + '</style>';
                }

                if (style.length) {
                    $('head').append(style);
                }
            });
        }
    }

    /*
    **	Horizontal progress bars shortcode
    */
    function edgtfInitProgressBars() {

        var progressBar = $('.edgtf-progress-bar');

        if (progressBar.length) {

            progressBar.each(function () {

                var thisBar = $(this);

                thisBar.appear(function () {
                    edgtfInitToCounterProgressBar(thisBar);
                    if (thisBar.find('.edgtf-floating.edgtf-floating-inside') !== 0) {
                        var floatingInsideMargin = thisBar.find('.edgtf-progress-content').height();
                        floatingInsideMargin += parseFloat(thisBar.find('.edgtf-progress-title-holder').css('padding-bottom'));
                        floatingInsideMargin += parseFloat(thisBar.find('.edgtf-progress-title-holder').css('margin-bottom'));
                        thisBar.find('.edgtf-floating-inside').css('margin-bottom', -(floatingInsideMargin) + 'px');
                    }
                    var percentage = thisBar.find('.edgtf-progress-content').data('percentage'),
                        progressContent = thisBar.find('.edgtf-progress-content'),
                        progressNumber = thisBar.find('.edgtf-progress-number');

                    progressContent.css('width', '0%');
                    progressContent.animate({'width': percentage + '%'}, 1500);
                    progressNumber.css('left', '0%');
                    progressNumber.animate({'left': percentage + '%'}, 1500);

                });
            });
        }
    }

    /*
    **	Counter for horizontal progress bars percent from zero to defined percent
    */
    function edgtfInitToCounterProgressBar(progressBar) {
        var percentage = parseFloat(progressBar.find('.edgtf-progress-content').data('percentage'));
        var percent = progressBar.find('.edgtf-progress-number .edgtf-percent');
        if (percent.length) {
            percent.each(function () {
                var thisPercent = $(this);
                thisPercent.parents('.edgtf-progress-number-wrapper').css('opacity', '1');
                thisPercent.countTo({
                    from: 0,
                    to: percentage,
                    speed: 1500,
                    refreshInterval: 50
                });
            });
        }
    }

    /*
    **	Function to close message shortcode
    */
    function edgtfInitMessages() {
        var message = $('.edgtf-message');
        if (message.length) {
            message.each(function () {
                var thisMessage = $(this);
                thisMessage.find('.edgtf-close').on('click', function (e) {
                    e.preventDefault();
                    $(this).parent().parent().fadeOut(500);
                });
            });
        }
    }

    /*
    **	Init message height
    */
    function edgtfInitMessageHeight() {
        var message = $('.edgtf-message.edgtf-with-icon');
        if (message.length) {
            message.each(function () {
                var thisMessage = $(this);
                var textHolderHeight = thisMessage.find('.edgtf-message-text-holder').height();
                var iconHolderHeight = thisMessage.find('.edgtf-message-icon-holder').height();

                if (textHolderHeight > iconHolderHeight) {
                    thisMessage.find('.edgtf-message-icon-holder').height(textHolderHeight);
                } else {
                    thisMessage.find('.edgtf-message-text-holder').height(iconHolderHeight);
                }
            });
        }
    }

    /**
     * Countdown Shortcode
     */
    function edgtfInitCountdown() {

        var countdowns = $('.edgtf-countdown'),
            year,
            month,
            day,
            hour,
            minute,
            timezone,
            monthLabel,
            dayLabel,
            hourLabel,
            minuteLabel,
            secondLabel;

        if (countdowns.length) {

            countdowns.each(function () {

                //Find countdown elements by id-s
                var countdownId = $(this).attr('id'),
                    countdown = $('#' + countdownId),
                    digitFontSize,
                    labelFontSize,
                    digitColor,
                    labelColor;

                //Get data for countdown
                year = countdown.data('year');
                month = countdown.data('month');
                day = countdown.data('day');
                hour = countdown.data('hour');
                minute = countdown.data('minute');
                timezone = countdown.data('timezone');
                monthLabel = countdown.data('month-label');
                dayLabel = countdown.data('day-label');
                hourLabel = countdown.data('hour-label');
                minuteLabel = countdown.data('minute-label');
                secondLabel = countdown.data('second-label');
                digitFontSize = countdown.data('digit-size');
                labelFontSize = countdown.data('label-size');
                digitColor = countdown.data('digit-color');
                labelColor = countdown.data('label-color');


                //Initialize countdown
                countdown.countdown({
                    until: new Date(year, month - 1, day, hour, minute, 44),
                    labels: ['Years', monthLabel, 'Weeks', dayLabel, hourLabel, minuteLabel, secondLabel],
                    format: 'ODHMS',
                    timezone: timezone,
                    padZeroes: true,
                    onTick: setCountdownStyle
                });

                function setCountdownStyle() {
                    countdown.find('.countdown-amount').css({
                        'font-size': digitFontSize + 'px'
                    });
                    countdown.find('.countdown-amount').css({
                        'color': digitColor
                    });
                    countdown.find('.countdown-period').css({
                        'font-size': labelFontSize + 'px'
                    });
                    countdown.find('.countdown-period').css({
                        'color': labelColor
                    });
                }

            });

        }

    }

    /**
     * Object that represents icon shortcode
     * @returns {{init: Function}} function that initializes icon's functionality
     */
    var edgtfIcon = edgtf.modules.shortcodes.edgtfIcon = function () {
        //get all icons on page
        var icons = $('.edgtf-icon-shortcode');

        /**
         * Function that triggers icon animation and icon animation delay
         */
        var iconAnimation = function (icon) {
            if (icon.hasClass('edgtf-icon-animation')) {
                icon.appear(function () {
                    icon.parent('.edgtf-icon-animation-holder').addClass('edgtf-icon-animation-show');
                }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
            }
        };

        /**
         * Function that triggers icon hover color functionality
         */
        var iconHoverColor = function (icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function (event) {
                    event.data.icon.css('color', event.data.color);
                };

                var iconElement = icon.find('.edgtf-icon-element');
                var hoverColor = icon.data('hover-color');
                var originalColor = iconElement.css('color');

                if (hoverColor !== '') {
                    icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
                    icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
                }
            }
        };

        /**
         * Function that triggers icon holder background color hover functionality
         */
        var iconHolderBackgroundHover = function (icon) {
            if (typeof icon.data('hover-background-color') !== 'undefined') {
                var changeIconBgColor = function (event) {
                    event.data.icon.css('background-color', event.data.color);
                };

                var hoverBackgroundColor = icon.data('hover-background-color');
                var originalBackgroundColor = icon.css('background-color');

                if (hoverBackgroundColor !== '') {
                    icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
                    icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
                }
            }
        };

        /**
         * Function that initializes icon holder border hover functionality
         */
        var iconHolderBorderHover = function (icon) {
            if (typeof icon.data('hover-border-color') !== 'undefined') {
                var changeIconBorder = function (event) {
                    event.data.icon.css('border-color', event.data.color);
                };

                var hoverBorderColor = icon.data('hover-border-color');
                var originalBorderColor = icon.css('border-color');

                if (hoverBorderColor !== '') {
                    icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
                    icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
                }
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        iconAnimation($(this));
                        iconHoverColor($(this));
                        iconHolderBackgroundHover($(this));
                        iconHolderBorderHover($(this));
                    });

                }
            }
        };
    };

    /**
     * Object that represents social icon widget
     * @returns {{init: Function}} function that initializes icon's functionality
     */
    var edgtfSocialIconWidget = edgtf.modules.shortcodes.edgtfSocialIconWidget = function () {
        //get all social icons on page
        var icons = $('.edgtf-social-icon-widget-holder');

        /**
         * Function that triggers icon hover color functionality
         */
        var socialIconHoverColor = function (icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function (event) {
                    event.data.icon.css('color', event.data.color);
                };

                var iconElement = icon;
                var hoverColor = icon.data('hover-color');
                var originalColor = iconElement.css('color');

                if (hoverColor !== '') {
                    icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
                    icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
                }
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        socialIconHoverColor($(this));
                    });

                }
            }
        };
    };

    /**
     * Init testimonials shortcode
     */
    function edgtfInitTestimonials() {

        var testimonial = $('.edgtf-testimonials');
        if (testimonial.length) {
            testimonial.each(function () {

                var thisTestimonial = $(this);

                thisTestimonial.waitForImages(function () {
                    thisTestimonial.css('visibility', 'visible');
                });

                var auto = true;
                var controlNav = true;
                var directionNav = true;
                var animationSpeed = 800;
                var responsive;
                var slidesToShow = 1;

                if (typeof thisTestimonial.data('animation-speed') !== 'undefined' && thisTestimonial.data('animation-speed') !== false) {
                    animationSpeed = thisTestimonial.data('animation-speed');
                }

                if (typeof thisTestimonial.data('dots-navigation') !== 'undefined') {
                    controlNav = thisTestimonial.data('dots-navigation');
                }
                if (typeof thisTestimonial.data('arrows-navigation') !== 'undefined') {
                    directionNav = thisTestimonial.data('arrows-navigation');
                }

                if (thisTestimonial.hasClass('edgtf-testimonials-type-carousel')) {
                    slidesToShow = 3;

                    responsive = [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: false
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                }

                thisTestimonial.slick({
                    infinite: true,
                    autoplay: auto,
                    slidesToShow: slidesToShow,
                    arrows: directionNav,
                    dots: controlNav,
                    dotsClass: 'edgtf-slick-dots',
                    adaptiveHeight: true,
                    speed: animationSpeed,
                    easing: 'easeOutCubic',
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    },
                    responsive: responsive,
                });
            });

        }

    }

    /**
     * Init Carousel shortcode
     */
    function edgtfInitCarousels() {

        var carouselHolders = $('.edgtf-carousel-holder'),
            carousel,
            numberOfItems,
            arrowsNavigation,
            dotsNavigation;

        if (carouselHolders.length) {
            carouselHolders.each(function () {
                carousel = $(this).children('.edgtf-carousel');
                numberOfItems = carousel.data('items');
                arrowsNavigation = (carousel.data('arrows-navigation') === 'yes') ? true : false;
                dotsNavigation = (carousel.data('dots-navigation') === 'yes') ? true : false;

                //Responsive breakpoints

                carousel.slick({
                    infinite: true,
                    autoplay: true,
                    slidesToShow: numberOfItems,
                    arrows: arrowsNavigation,
                    dots: dotsNavigation,
                    dotsClass: 'edgtf-slick-dots',
                    adaptiveHeight: true,
                    easing: 'easeOutCubic',
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    },
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });


            });
        }

    }

    /**
     * Init Pie Chart and Pie Chart With Icon shortcode
     */
    function edgtfInitPieChart() {

        var pieCharts = $('.edgtf-pie-chart-holder, .edgtf-pie-chart-with-icon-holder');

        if (pieCharts.length) {

            pieCharts.each(function () {

                var pieChart = $(this),
                    percentageHolder = pieChart.children('.edgtf-percentage, .edgtf-percentage-with-icon'),
                    barColor = '#c7a17a',
                    trackColor = '#f1efe9',
                    lineWidth = 5,
                    size = 180;

                if (typeof percentageHolder.data('bar-color') !== 'undefined' && percentageHolder.data('bar-color') !== '') {
                    barColor = percentageHolder.data('bar-color');
                }

                if (typeof percentageHolder.data('track-color') !== 'undefined' && percentageHolder.data('track-color') !== '') {
                    trackColor = percentageHolder.data('track-color');
                }

                percentageHolder.appear(function () {
                    initToCounterPieChart(pieChart);
                    percentageHolder.css('opacity', '1');

                    percentageHolder.easyPieChart({
                        barColor: barColor,
                        trackColor: trackColor,
                        scaleColor: false,
                        lineCap: 'butt',
                        lineWidth: lineWidth,
                        animate: 1500,
                        size: size
                    });
                }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});

            });

        }

    }

    /*
     **	Counter for pie chart number from zero to defined number
     */
    function initToCounterPieChart(pieChart) {

        pieChart.css('opacity', '1');
        var counter = pieChart.find('.edgtf-to-counter'),
            max = parseFloat(counter.text());
        counter.countTo({
            from: 0,
            to: max,
            speed: 1500,
            refreshInterval: 50
        });

    }

    /**
     * Init Pie Chart shortcode
     */
    function edgtfInitPieChartDoughnut() {

        var pieCharts = $('.edgtf-pie-chart-doughnut-holder, .edgtf-pie-chart-pie-holder');

        pieCharts.each(function () {

            var pieChart = $(this),
                canvas = pieChart.find('canvas'),
                chartID = canvas.attr('id'),
                chart = document.getElementById(chartID).getContext('2d'),
                data = [],
                jqChart = $(chart.canvas); //Convert canvas to JQuery object and get data parameters

            for (var i = 1; i <= 10; i++) {

                var chartItem,
                    value = jqChart.data('value-' + i),
                    color = jqChart.data('color-' + i);

                if (typeof value !== 'undefined' && typeof color !== 'undefined') {
                    chartItem = {
                        value: value,
                        color: color
                    };
                    data.push(chartItem);
                }

            }

            if (canvas.hasClass('edgtf-pie')) {
                new Chart(chart).Pie(data,
                    {segmentStrokeColor: 'transparent'}
                );
            } else {
                new Chart(chart).Doughnut(data,
                    {segmentStrokeColor: 'transparent'}
                );
            }

        });

    }

    /*
    **	Init tabs shortcode
    */
    function edgtfInitTabs() {

        var tabs = $('.edgtf-tabs');
        if (tabs.length) {
            tabs.each(function () {
                var thisTabs = $(this);

                thisTabs.children('.edgtf-tab-container').each(function (index) {
                    index = index + 1;
                    var that = $(this),
                        link = that.attr('id'),
                        navItem = that.parent().find('.edgtf-tabs-nav li:nth-child(' + index + ') a'),
                        navLink = navItem.attr('href');

                    link = '#' + link;

                    if (link.indexOf(navLink) > -1) {
                        navItem.attr('href', link);
                    }
                });

                if (thisTabs.hasClass('edgtf-horizontal-tab')) {
                    thisTabs.tabs();
                } else if (thisTabs.hasClass('edgtf-vertical-tab')) {
                    thisTabs.tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
                    thisTabs.find('.edgtf-tabs-nav > ul >li').removeClass('ui-corner-top').addClass('ui-corner-left');
                }
            });
        }
    }

    /*
    **	Generate icons in tabs navigation
    */
    function edgtfInitTabIcons() {

        var tabContent = $('.edgtf-tab-container');
        if (tabContent.length) {

            tabContent.each(function () {
                var thisTabContent = $(this);

                var id = thisTabContent.attr('id');
                var icon = '';
                if (typeof thisTabContent.data('icon-html') !== 'undefined' || thisTabContent.data('icon-html') !== 'false') {
                    icon = thisTabContent.data('icon-html');
                }

                var tabNav = thisTabContent.parents('.edgtf-tabs').find('.edgtf-tabs-nav > li > a[href="#' + id + '"]');

                if (typeof (tabNav) !== 'undefined') {
                    tabNav.children('.edgtf-icon-frame').append(icon);
                }
            });
        }
    }

    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var edgtfButton = edgtf.modules.shortcodes.edgtfButton = function () {
        //all buttons on the page
        var buttons = $('.edgtf-btn');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var buttonHoverColor = function (button) {
            if (typeof button.data('hover-color') !== 'undefined') {
                var changeButtonColor = function (event) {
                    event.data.button.css('color', event.data.color);
                };

                var originalColor = button.css('color');
                var hoverColor = button.data('hover-color');

                button.on('mouseenter', {button: button, color: hoverColor}, changeButtonColor);
                button.on('mouseleave', {button: button, color: originalColor}, changeButtonColor);
            }
        };


        /**
         * Initializes button hover background color
         * @param button current button
         */
        var buttonHoverBgColor = function (button, hoverEl) {
            if (typeof button.data('hover-bg-color') !== 'undefined') {
                var changeButtonBg = function (event) {
                    event.data.button.css('background-color', event.data.color);
                };

                var originalBgColor = button.css('background-color');
                var hoverBgColor = button.data('hover-bg-color');

                if (hoverEl) {
                    button.find('.edgtf-btn-hover').css('background-color', hoverBgColor);
                } else {
                    button.on('mouseenter', {button: button, color: hoverBgColor}, changeButtonBg);
                    button.on('mouseleave', {button: button, color: originalBgColor}, changeButtonBg);
                }
            }
        };

        /**
         * Initializes button border color
         * @param button
         */
        var buttonHoverBorderColor = function (button) {
            if (typeof button.data('hover-border-color') !== 'undefined') {
                var changeBorderColor = function (event) {
                    event.data.button.css('border-color', event.data.color);
                };

                var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
                var hoverBorderColor = button.data('hover-border-color');
                button.on('mouseenter', {button: button, color: hoverBorderColor}, changeBorderColor);
                button.on('mouseleave', {button: button, color: originalBorderColor}, changeBorderColor);
            }
        };

        return {
            init: function () {
                if (buttons.length) {
                    buttons.each(function () {
                        var thisBtn = $(this);
                        buttonHoverColor(thisBtn);
                        if (thisBtn.hasClass('edgtf-btn-animated')) {
                            buttonHoverBgColor(thisBtn, true);
                        } else {
                            buttonHoverBgColor(thisBtn, false);
                            // border color transition exists only for non animated buttons
                            buttonHoverBorderColor(thisBtn);
                        }
                    });
                }
            }
        };
    };

    /*
    **	Init blog list masonry type
    */
    function edgtfInitBlogListMasonry() {
        var blogList = $('.edgtf-blog-list-holder.edgtf-masonry .edgtf-blog-list');
        if (blogList.length) {
            blogList.each(function () {
                var thisBlogList = $(this);
                blogList.waitForImages(function () {
                    thisBlogList.isotope({
                        layoutMode: 'packery',
                        itemSelector: '.edgtf-blog-list-masonry-item',
                        packery: {
                            columnWidth: '.edgtf-blog-list-masonry-grid-sizer',
                            gutter: '.edgtf-blog-list-masonry-grid-gutter'
                        }
                    });
                    thisBlogList.addClass('edgtf-appeared');
                });
            });

        }
    }

    /**
     * Initializes portfolio slider
     */

    function edgtfInitBlogSlider() {
        var blogSlider = $('.edgtf-blog-slider');
        if (blogSlider.length) {
            blogSlider.each(function () {
                var thisBlogSlider = $(this);
                var navigation = true;
                var responsive;
                var slides = 1;

                if (typeof thisBlogSlider.data('type') !== 'undefined' && thisBlogSlider.data('type') !== false && thisBlogSlider.data('type') === 'carousel') {

                    responsive = [
                        {
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                    slides = 3;
                }

                thisBlogSlider.on('init', function (slick) {
                    thisBlogSlider.css('opacity', 1);
                });
                thisBlogSlider.waitForImages(function () {
                    thisBlogSlider.slick({
                        infinite: true,
                        autoplay: false,
                        slidesToShow: slides,
                        arrows: navigation,
                        dots: true,
                        dotsClass: 'edgtf-slick-dots',
                        adaptiveHeight: true,
                        easing: 'easeOutCubic',
                        prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                        nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                        customPaging: function (slider, i) {
                            return '<span class="edgtf-slick-dot-inner"></span>';
                        },
                        responsive: responsive
                    });
                });

            });
        }
    }

    /*
    **	Custom Font resizing
    */
    function edgtfCustomFontResize() {
        var customFont = $('.edgtf-custom-font-holder');
        if (customFont.length) {
            customFont.each(function () {
                var thisCustomFont = $(this);
                var fontSize;
                var lineHeight;
                var coef1 = 1;
                var coef2 = 1;

                if (edgtf.windowWidth < 1200) {
                    coef1 = 0.8;
                }

                if (edgtf.windowWidth < 1024) {
                    coef1 = 0.7;
                }

                if (edgtf.windowWidth < 768) {
                    coef1 = 0.6;
                    coef2 = 0.7;
                }

                if (edgtf.windowWidth < 600) {
                    coef1 = 0.5;
                    coef2 = 0.6;
                }

                if (edgtf.windowWidth < 480) {
                    coef1 = 0.4;
                    coef2 = 0.5;
                }

                if (typeof thisCustomFont.data('font-size') !== 'undefined' && thisCustomFont.data('font-size') !== false) {
                    fontSize = parseInt(thisCustomFont.data('font-size'));

                    if (fontSize > 70) {
                        fontSize = Math.round(fontSize * coef1);
                    } else if (fontSize > 35) {
                        fontSize = Math.round(fontSize * coef2);
                    }

                    thisCustomFont.css('font-size', fontSize + 'px');
                }

                if (typeof thisCustomFont.data('line-height') !== 'undefined' && thisCustomFont.data('line-height') !== false) {
                    lineHeight = parseInt(thisCustomFont.data('line-height'));

                    if (lineHeight > 70 && edgtf.windowWidth < 1200) {
                        lineHeight = '1.2em';
                    } else if (lineHeight > 35 && edgtf.windowWidth < 768) {
                        lineHeight = '1.2em';
                    } else {
                        lineHeight += 'px';
                    }

                    thisCustomFont.css('line-height', lineHeight);
                }
            });
        }
    }

    /*
     **	Show Google Map
     */
    function edgtfShowGoogleMap() {

        if ($('.edgtf-google-map').length) {
            $('.edgtf-google-map').each(function () {

                var element = $(this);

                var customMapStyle;
                if (typeof element.data('custom-map-style') !== 'undefined') {
                    customMapStyle = element.data('custom-map-style');
                }

                var colorOverlay;
                if (typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
                    colorOverlay = element.data('color-overlay');
                }

                var saturation;
                if (typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
                    saturation = element.data('saturation');
                }

                var lightness;
                if (typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
                    lightness = element.data('lightness');
                }

                var zoom;
                if (typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
                    zoom = element.data('zoom');
                }

                var pin;
                if (typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
                    pin = element.data('pin');
                }

                var mapHeight;
                if (typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
                    mapHeight = element.data('height');
                }

                var uniqueId;
                if (typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
                    uniqueId = element.data('unique-id');
                }

                var scrollWheel;
                if (typeof element.data('scroll-wheel') !== 'undefined') {
                    scrollWheel = element.data('scroll-wheel');
                }
                var addresses;
                if (typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
                    addresses = element.data('addresses');
                }

                var map = "map_" + uniqueId;
                var geocoder = "geocoder_" + uniqueId;
                var holderId = "edgtf-map-" + uniqueId;

                edgtfInitializeGoogleMap(customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin, map, geocoder, addresses);
            });
        }

    }

    /*
     **	Init Google Map
     */
    function edgtfInitializeGoogleMap(customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin, map, geocoder, data) {

        if (typeof google !== 'object') {
            return;
        }

        var mapStyles = [
            {
                stylers: [
                    {hue: color},
                    {saturation: saturation},
                    {lightness: lightness},
                    {gamma: 1}
                ]
            }
        ];

        var googleMapStyleId;

        if (customMapStyle) {
            googleMapStyleId = 'edgtf-style';
        } else {
            googleMapStyleId = google.maps.MapTypeId.ROADMAP;
        }

        var qoogleMapType = new google.maps.StyledMapType(mapStyles,
            {name: "Edge Google Map"});

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);

        if (!isNaN(height)) {
            height = height + 'px';
        }

        var myOptions = {

            zoom: zoom,
            scrollwheel: wheel,
            center: latlng,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: false,
            scaleControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'edgtf-style'],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeId: googleMapStyleId
        };

        map = new google.maps.Map(document.getElementById(holderId), myOptions);
        map.mapTypes.set('edgtf-style', qoogleMapType);

        var index;

        for (index = 0; index < data.length; ++index) {
            edgtfInitializeGoogleAddress(data[index], pin, map, geocoder);
        }

        var holderElement = document.getElementById(holderId);
        holderElement.style.height = height;
    }

    /*
     **	Init Google Map Addresses
     */
    function edgtfInitializeGoogleAddress(data, pin, map, geocoder) {
        if (data === '')
            return;
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<p>' + data + '</p>' +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        geocoder.geocode({'address': data}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: pin,
                    title: data['store_title']
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                google.maps.event.addDomListener(window, 'resize', function () {
                    map.setCenter(results[0].geometry.location);
                });

            }
        });
    }

    function edgtfInitAccordions() {
        var accordion = $('.edgtf-accordion-holder');
        if (accordion.length) {
            accordion.each(function () {

                var thisAccordion = $(this);

                if (thisAccordion.hasClass('edgtf-accordion')) {

                    thisAccordion.accordion({
                        animate: "swing",
                        collapsible: true,
                        active: 0,
                        icons: "",
                        heightStyle: "content"
                    });
                }

                if (thisAccordion.hasClass('edgtf-toggle')) {

                    var toggleAccordion = $(this);
                    var toggleAccordionTitle = toggleAccordion.find('.edgtf-title-holder');
                    var toggleAccordionContent = toggleAccordionTitle.next();

                    toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
                    toggleAccordionTitle.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom");
                    toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

                    toggleAccordionTitle.each(function () {
                        var thisTitle = $(this);
                        thisTitle.on('mouseenter mouseleave', function () {
                            thisTitle.toggleClass("ui-state-hover");
                        });

                        thisTitle.on('click', function () {
                            thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
                            thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
                        });
                    });
                }
            });
        }
    }

    function edgtfInitImageGallery() {

        var galleries = $('.edgtf-image-gallery');

        if (galleries.length) {
            galleries.each(function () {
                var gallery = $(this).children('.edgtf-image-gallery-slider'),
                    animation = (gallery.data('animation') === 'fade'),
                    navigation = (gallery.data('navigation') === 'yes'),
                    pagination = (gallery.data('pagination') === 'yes'),
                    autoPlay = false,
                    autoPlaySpeed = 1;
                if (gallery.data('autoplay') !== '') {
                    autoPlay = true;
                    autoPlaySpeed = gallery.data('autoplay') * 1000;
                }

                gallery.slick({
                    autoplay: autoPlay,
                    autoPlaySpeed: autoPlaySpeed * 1000,
                    arrows: navigation,
                    adaptiveHeight: true,
                    fade: animation,
                    dotsClass: 'edgtf-slick-dots',
                    dots: pagination,
                    speed: 600,
                    easing: 'easeOutCubic',
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    }
                });
            });
        }

        var carousels = $('.edgtf-image-gallery-carousel-wrapper');

        if (carousels.length) {
            carousels.each(function () {
                var carousel = $(this).children('.edgtf-image-gallery-carousel'),
                    navigation = (carousel.data('navigation') === 'yes'),
                    pagination = (carousel.data('pagination') === 'yes'),
                    autoPlay = false,
                    slidesToShow = 1,
                    centerMode = true,
                    variableWidth = true,
                    autoPlaySpeed = 1;
                if (carousel.data('autoplay') !== '') {
                    autoPlay = true;
                    autoPlaySpeed = carousel.data('autoplay') * 1000;
                }

                var responsive = [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]

                carousel.slick({
                    autoplay: autoPlay,
                    autoPlaySpeed: autoPlaySpeed * 1000,
                    arrows: navigation,
                    dots: pagination,
                    dotsClass: 'edgtf-slick-dots',
                    speed: 600,
                    easing: 'easeOutCubic',
                    slidesToShow: slidesToShow,
                    variableWidth: variableWidth,
                    centerMode: centerMode,
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    responsive: responsive,
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    }
                });
            });
        }

    }

    /**
     * Init Image Masonry Gallery
     */
    function edgtfInitImageGalleryMasonry() {
        var masonryGallery = $('.edgtf-image-gallery-masonry');

        if (masonryGallery.length) {
            masonryGallery.each(function () {
                var thisGallery = $(this);
                thisGallery.waitForImages(function () {
                    var size = thisGallery.find('.edgtf-image-masonry-grid-sizer').width();
                    edgtfImageResizeMasonry(size, thisGallery);
                    edgtfInitImageMasonry(thisGallery);

                });
                $(window).resize(function () {
                    var size = thisGallery.find('.edgtf-image-masonry-grid-sizer').width();
                    edgtfImageResizeMasonry(size, thisGallery);
                    edgtfInitImageMasonry(thisGallery);
                });
            });
        }
    }

    function edgtfInitImageMasonry(container) {
        container.animate({opacity: 1});
        container.isotope({
            itemSelector: '.edgtf-gallery-image',
            masonry: {
                columnWidth: '.edgtf-image-masonry-grid-sizer'
            }
        });
    }


    function edgtfImageResizeMasonry(size, container) {

        var defaultMasonryItem = container.find('.edgtf-size-square');
        var largeWidthMasonryItem = container.find('.edgtf-size-landscape');
        var largeHeightMasonryItem = container.find('.edgtf-size-portrait');
        var largeWidthHeightMasonryItem = container.find('.edgtf-size-big-square');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', Math.round(2 * size));

        if (edgtf.windowWidth > 768) {
            largeWidthHeightMasonryItem.css('height', Math.round(2 * size));
            largeWidthMasonryItem.css('height', size);
        } else {
            largeWidthHeightMasonryItem.css('height', size);
            largeWidthMasonryItem.css('height', Math.round(size / 2));
        }
    }

    /**
     * Initializes project presentation slider
     */

    function edgtProjectPresentationSlider() {

        var sliders = $('.edgtf-pp-gallery');

        if (sliders.length) {
            sliders.each(function () {
                var slider = $(this).children('.edgtf-pp-gallery-slider'),
                    animation = (slider.data('animation') === 'fade'),
                    navigation = false,
                    pagination = (slider.data('pagination') === 'yes'),
                    autoPlay = false,
                    autoplaySpeed = 1;
                if (slider.data('autoplay') !== 'disable') {
                    autoPlay = true;
                    autoplaySpeed = slider.data('autoplay') * 1000;
                }

                slider.on('afterChange', function (slick) {
                    $('.edgtf-project-presentation .slick-slider .slick-track').css('height', '100%');
                });

                slider.slick({
                    autoplay: autoPlay,
                    autoplaySpeed: autoplaySpeed,
                    arrows: navigation,
                    adaptiveHeight: true,
                    fade: true,
                    dots: pagination,
                    easing: 'easeOutCubic',
                    dotsClass: 'edgtf-slick-dots',
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    }
                });

            });
        }
    }

    /**
     * Initializes portfolio list
     */
    function edgtfInitPortfolio() {
        var portList = $('.edgtf-portfolio-list-holder-outer.edgtf-ptf-standard:not(.edgtf-portfolio-slider-holder), .edgtf-portfolio-list-holder-outer.edgtf-ptf-gallery:not(.edgtf-portfolio-slider-holder), .edgtf-portfolio-list-holder-outer.edgtf-ptf-gallery-with-space:not(.edgtf-portfolio-slider-holder)');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this);
                edgtfInitPortMixItUp(thisPortList);
                if (thisPortList.hasClass('edgtf-follow')) {
                    thisPortList.find('article').each(function () {
                        $(this).hoverdir({
                            hoverElem: 'div.edgtf-item-text-overlay',
                            speed: 330,
                            hoverDelay: 35,
                            easing: 'ease'
                        });
                    });
                }
            });
        }
    }

    /**
     * Initializes mixItUp function for specific container
     */
    function edgtfInitPortMixItUp(container) {
        var filterClass = '';
        if (container.hasClass('edgtf-ptf-has-filter')) {
            filterClass = container.find('.edgtf-portfolio-filter-holder-inner ul li').data('class');
            filterClass = '.' + filterClass;
        }

        var holderInner = container.find('.edgtf-portfolio-list-holder');
        holderInner.mixItUp({
            callbacks: {
                onMixLoad: function () {
                    holderInner.find('article').css('visibility', 'visible');
                    edgtf.modules.common.edgtfInitParallax();
                },
                onMixStart: function () {
                    holderInner.find('article').css('visibility', 'visible');
                },
                onMixBusy: function () {
                    holderInner.find('article').css('visibility', 'visible');
                }
            },
            selectors: {
                filter: filterClass
            },
            animation: {
                effects: 'fade',
                duration: 600
            }

        });

    }

    /*
   **	Init portfolio list masonry type
   */
    function edgtfInitPortfolioListMasonry() {
        var portList = $('.edgtf-portfolio-list-holder-outer.edgtf-ptf-masonry,.edgtf-portfolio-list-holder-outer.edgtf-ptf-masonry-with-space');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this).children('.edgtf-portfolio-list-holder');
                var size = thisPortList.find('.edgtf-portfolio-list-masonry-grid-sizer').width();
                edgtfResizeMasonry(size, thisPortList);

                edgtfInitMasonry(thisPortList);
                $(window).resize(function () {
                    edgtfResizeMasonry(size, thisPortList);
                    edgtfInitMasonry(thisPortList);
                });
            });
        }
    }

    function edgtfInitMasonry(container) {
        container.waitForImages(function () {
            container.isotope({
                layoutMode: 'packery',
                itemSelector: '.edgtf-portfolio-item',
                packery: {
                    columnWidth: '.edgtf-portfolio-list-masonry-grid-sizer'
                }
            });
            container.addClass('edgtf-appeared');
            $(window).load(function () {
                ptfListAppear(container)
            });
        });
    }

    function edgtfResizeMasonry(size, container) {

        var defaultMasonryItem = container.find('.edgtf-default-masonry-item');
        var largeWidthMasonryItem = container.find('.edgtf-large-width-masonry-item');
        var largeHeightMasonryItem = container.find('.edgtf-large-height-masonry-item');
        var largeWidthHeightMasonryItem = container.find('.edgtf-large-width-height-masonry-item');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', Math.round(2 * size));

        if (edgtf.windowWidth > 600) {
            largeWidthHeightMasonryItem.css('height', Math.round(2 * size));
            largeWidthMasonryItem.css('height', size);
        } else {
            largeWidthHeightMasonryItem.css('height', size);
            largeWidthMasonryItem.css('height', Math.round(size / 2));

        }
    }

    /**
     * Initializes portfolio pinterest
     */
    function edgtfInitPortfolioListPinterest() {

        var portList = $('.edgtf-portfolio-list-holder-outer.edgtf-ptf-pinterest,.edgtf-portfolio-list-holder-outer.edgtf-ptf-pinterest-with-space');
        if (portList.length) {
            portList.each(function () {
                var thisPortList = $(this).children('.edgtf-portfolio-list-holder');
                edgtfInitPinterest(thisPortList);
                $(window).resize(function () {
                    edgtfInitPinterest(thisPortList);
                });
            });

        }
    }

    function edgtfInitPinterest(container) {
        container.waitForImages(function () {
            container.isotope({
                itemSelector: '.edgtf-portfolio-item',
                masonry: {
                    columnWidth: '.edgtf-portfolio-list-masonry-grid-sizer',
                    gutter: '.edgtf-portfolio-list-masonry-grid-gutter'
                }
            });
        });
        container.addClass('edgtf-appeared');
        $(window).load(function () {
            ptfListAppear(container)
        });
    }

    /*
    * Appear FX
    */
    function ptfListAppear(container) {
        if (container.parent().hasClass('edgtf-appear-fade-scale')) {
            var articles = container.find('article'),
                animateCycle = 1 + Math.floor(Math.random() * 6),
                animateCycleCounter = 0;

            if (articles.length) {
                articles.each(function () {
                    var article = $(this);

                    setTimeout(function () {
                        article.appear(function () {
                            animateCycleCounter++;

                            if (animateCycleCounter === animateCycle) {
                                animateCycleCounter = 0;
                            }

                            setTimeout(function () {
                                if (!article.hasClass('edgtf-appeared')) {
                                    article.addClass('edgtf-appeared');
                                }
                            }, animateCycleCounter * 280);
                        }, {accX: 0, accY: 0});
                    }, 30);
                });
            }
        }
    }

    /**
     * Initializes portfolio masonry filter
     */
    function edgtfInitPortfolioMasonryFilter() {

        var filterHolder = $('.edgtf-portfolio-filter-holder.edgtf-masonry-filter');

        if (filterHolder.length) {
            filterHolder.each(function () {

                var thisFilterHolder = $(this);

                var portfolioIsotopeAnimation = null;

                var filter = thisFilterHolder.find('ul li').data('class');

                thisFilterHolder.find('.filter:first').addClass('current');

                thisFilterHolder.find('.filter').on('click', function () {

                    var currentFilter = $(this);
                    clearTimeout(portfolioIsotopeAnimation);

                    $('.isotope, .isotope .isotope-item').css('transition-duration', '0.8s');

                    portfolioIsotopeAnimation = setTimeout(function () {
                        $('.isotope, .isotope .isotope-item').css('transition-duration', '0s');
                    }, 700);

                    var selector = $(this).attr('data-filter');
                    thisFilterHolder.siblings('.edgtf-portfolio-list-holder-outer').find('.edgtf-portfolio-list-holder').isotope({filter: selector});

                    thisFilterHolder.find('.filter').removeClass('current');
                    currentFilter.addClass('current');

                    return false;

                });

            });
        }
    }

    /**
     * Initializes portfolio slider
     */

    function edgtfInitPortfolioSlider() {
        var portSlider = $('.edgtf-portfolio-list-holder-outer.edgtf-portfolio-slider-holder');
        if (portSlider.length) {
            portSlider.each(function () {
                var thisPortSlider = $(this);
                var sliderWrapper = thisPortSlider.children('.edgtf-portfolio-list-holder');
                var numberOfItems = thisPortSlider.data('items');
                var navigation = false;

                //Responsive breakpoints
                var responsive = [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ];

                sliderWrapper.on('init', function (slick) {
                    var slides = sliderWrapper.find('.slick-slide');

                    var dragStart, clickable = false;

                    var handleDragStart = function (event) {
                        event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
                        event = event.type === 'touchstart' ? event.touches[0] : event;
                        dragStart = {
                            x: event.clientX,
                            y: event.clientY
                        };
                    };

                    var handleDragStop = function (event) {
                        event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
                        event = event.type === 'touchend' ? event.changedTouches[0] : event;
                        var dragEnd = {
                            x: event.clientX,
                            y: event.clientY
                        };
                        if (Math.abs(dragEnd.x - dragStart.x) < 10) {
                            clickable = true;
                        }
                    };

                    var handleClick = function (event) {
                        if (clickable) {
                            clickable = false;
                        } else {
                            event.preventDefault();
                            event.stopImmediatePropagation();
                        }
                    };

                    slides.find('a')
                        .on('dragstart', function (event) {
                            event.stopImmediatePropagation();
                            event.preventDefault();
                        })
                        .on('click', handleClick)
                        .on('mousedown touchstart', handleDragStart)
                        .on('mouseup touchend', handleDragStop);
                });

                sliderWrapper.slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: navigation,
                    dots: false,
                    dotsClass: 'edgtf-slick-dots',
                    speed: 600,
                    easing: 'easeOutCubic',
                    slidesToShow: numberOfItems,
                    prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_carrot-left"></span></span>',
                    nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="arrow_carrot-right"></span></span>',
                    responsive: responsive,
                    customPaging: function (slider, i) {
                        return '<span class="edgtf-slick-dot-inner"></span>';
                    }
                });
            });
        }
    }

    /**
     * Initializes portfolio load more function
     */
    function edgtfInitPortfolioLoadMore() {
        var portList = $('.edgtf-portfolio-list-holder-outer.edgtf-ptf-load-more');
        if (portList.length) {
            portList.each(function () {

                var thisPortList = $(this);
                var thisPortListInner = thisPortList.find('.edgtf-portfolio-list-holder');
                var nextPage;
                var maxNumPages;
                var loadMoreButton = thisPortList.find('.edgtf-ptf-list-load-more a');
                var loadMoreSpinner = thisPortList.find('.edgtf-3d-cube-holder');

                if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
                    maxNumPages = thisPortList.data('max-num-pages');
                }

                loadMoreButton.on('click', function (e) {
                    var loadMoreDatta = edgtfGetPortfolioAjaxData(thisPortList);
                    nextPage = loadMoreDatta.nextPage;
                    e.preventDefault();
                    e.stopPropagation();
                    loadMoreButton.hide();
                    loadMoreSpinner.fadeIn(500);
                    if (nextPage <= maxNumPages) {
                        var ajaxData = edgtfSetPortfolioAjaxData(loadMoreDatta);
                        $.ajax({
                            type: 'POST',
                            data: ajaxData,
                            url: edgtCoreAjaxUrl,
                            success: function (data) {
                                nextPage++;
                                thisPortList.data('next-page', nextPage);
                                var response = $.parseJSON(data);
                                var responseHtml = edgtfConvertHTML(response.html); //convert response html into jQuery collection that Mixitup can work with
                                setTimeout(function () {
                                    if (thisPortList.hasClass('edgtf-ptf-masonry') || thisPortList.hasClass('edgtf-ptf-masonry-with-space') || thisPortList.hasClass('edgtf-ptf-pinterest') || thisPortList.hasClass('edgtf-ptf-pinterest-with-space')) {
                                        thisPortList.waitForImages(function () {
                                            thisPortListInner.isotope().append(responseHtml).isotope('appended', responseHtml).isotope('reloadItems');
                                            ptfListAppear(thisPortListInner);
                                            loadMoreSpinner.fadeOut(100, function () {
                                                loadMoreButton.show()
                                            });
                                        });
                                    } else {
                                        thisPortList.waitForImages(function () {
                                            thisPortListInner.mixItUp('append', responseHtml);
                                            loadMoreSpinner.fadeOut(100, function () {
                                                loadMoreButton.show()
                                            });
                                        });
                                    }
                                    if (nextPage > maxNumPages) {
                                        loadMoreButton.hide();
                                        loadMoreButton.closest('.edgtf-ptf-list-paging').hide();
                                        loadMoreSpinner.fadeOut(0);
                                    }
                                    if (thisPortList.hasClass('edgtf-follow')) {
                                        thisPortList.find('article').each(function () {
                                            $(this).hoverdir({
                                                hoverElem: 'div.edgtf-item-text-overlay'
                                            });
                                        });
                                    }
                                }, 400);
                            }
                        });
                    }
                });

            });
        }
    }

    function edgtfConvertHTML(html) {
        var newHtml = $.trim(html),
            $html = $(newHtml),
            $empty = $();

        $html.each(function (index, value) {
            if (value.nodeType === 1) {
                $empty = $empty.add(this);
            }
        });

        return $empty;
    }

    /**
     * Initializes portfolio load more data params
     * @param portfolio list container with defined data params
     * return array
     */
    function edgtfGetPortfolioAjaxData(container) {
        var returnValue = {};

        returnValue.type = '';
        returnValue.columns = '';
        returnValue.gridSize = '';
        returnValue.orderBy = '';
        returnValue.order = '';
        returnValue.number = '';
        returnValue.imageSize = '';
        returnValue.filter = '';
        returnValue.filterOrderBy = '';
        returnValue.category = '';
        returnValue.selectedProjectes = '';
        returnValue.showLoadMore = '';
        returnValue.titleTag = '';
        returnValue.nextPage = '';
        returnValue.maxNumPages = '';

        if (typeof container.data('type') !== 'undefined' && container.data('type') !== false) {
            returnValue.type = container.data('type');
        }
        if (typeof container.data('grid-size') !== 'undefined' && container.data('grid-size') !== false) {
            returnValue.gridSize = container.data('grid-size');
        }
        if (typeof container.data('columns') !== 'undefined' && container.data('columns') !== false) {
            returnValue.columns = container.data('columns');
        }
        if (typeof container.data('order-by') !== 'undefined' && container.data('order-by') !== false) {
            returnValue.orderBy = container.data('order-by');
        }
        if (typeof container.data('order') !== 'undefined' && container.data('order') !== false) {
            returnValue.order = container.data('order');
        }
        if (typeof container.data('number') !== 'undefined' && container.data('number') !== false) {
            returnValue.number = container.data('number');
        }
        if (typeof container.data('image-size') !== 'undefined' && container.data('image-size') !== false) {
            returnValue.imageSize = container.data('image-size');
        }
        if (typeof container.data('filter') !== 'undefined' && container.data('filter') !== false) {
            returnValue.filter = container.data('filter');
        }
        if (typeof container.data('filter-order-by') !== 'undefined' && container.data('filter-order-by') !== false) {
            returnValue.filterOrderBy = container.data('filter-order-by');
        }
        if (typeof container.data('category') !== 'undefined' && container.data('category') !== false) {
            returnValue.category = container.data('category');
        }
        if (typeof container.data('selected-projects') !== 'undefined' && container.data('selected-projects') !== false) {
            returnValue.selectedProjectes = container.data('selected-projects');
        }
        if (typeof container.data('show-load-more') !== 'undefined' && container.data('show-load-more') !== false) {
            returnValue.showLoadMore = container.data('show-load-more');
        }
        if (typeof container.data('title-tag') !== 'undefined' && container.data('title-tag') !== false) {
            returnValue.titleTag = container.data('title-tag');
        }
        if (typeof container.data('next-page') !== 'undefined' && container.data('next-page') !== false) {
            returnValue.nextPage = container.data('next-page');
        }
        if (typeof container.data('max-num-pages') !== 'undefined' && container.data('max-num-pages') !== false) {
            returnValue.maxNumPages = container.data('max-num-pages');
        }
        return returnValue;
    }

    /**
     * Sets portfolio load more data params for ajax function
     * @param portfolio list container with defined data params
     * return array
     */
    function edgtfSetPortfolioAjaxData(container) {
        var returnValue = {
            action: 'edgt_core_portfolio_ajax_load_more',
            type: container.type,
            columns: container.columns,
            gridSize: container.gridSize,
            orderBy: container.orderBy,
            order: container.order,
            number: container.number,
            imageSize: container.imageSize,
            filter: container.filter,
            filterOrderBy: container.filterOrderBy,
            category: container.category,
            selectedProjectes: container.selectedProjectes,
            showLoadMore: container.showLoadMore,
            titleTag: container.titleTag,
            nextPage: container.nextPage
        };
        return returnValue;
    }

    /**
     * Slider object that initializes whole slider functionality
     * @type {Function}
     */
    var edgtfSlider = edgtf.modules.shortcodes.edgtfSlider = function () {

        //all sliders on the page
        var sliders = $('.edgtf-slider .carousel');
        //image regex used to extract img source
        var imageRegex = /url\(["']?([^'")]+)['"]?\)/;

        /*** Functionality for translating image in slide - START ***/

        var matrixArray = {
            zoom_center: '1.2, 0, 0, 1.2, 0, 0',
            zoom_top_left: '1.2, 0, 0, 1.2, -150, -150',
            zoom_top_right: '1.2, 0, 0, 1.2, 150, -150',
            zoom_bottom_left: '1.2, 0, 0, 1.2, -150, 150',
            zoom_bottom_right: '1.2, 0, 0, 1.2, 150, 150'
        };

        // regular expression for parsing out the matrix components from the matrix string
        var matrixRE = /\([0-9epx\.\, \t\-]+/gi;

        // parses a matrix string of the form "matrix(n1,n2,n3,n4,n5,n6)" and
        // returns an array with the matrix components
        var parseMatrix = function (val) {
            return val.match(matrixRE)[0].substr(1).split(",").map(function (s) {
                return parseFloat(s);
            });
        };

        // transform css property names with vendor prefixes;
        // the plugin will check for values in the order the names are listed here and return as soon as there
        // is a value; so listing the W3 std name for the transform results in that being used if its available
        var transformPropNames = [
            "transform",
            "-webkit-transform"
        ];

        var getTransformMatrix = function (el) {
            // iterate through the css3 identifiers till we hit one that yields a value
            var matrix = null;
            transformPropNames.some(function (prop) {
                matrix = el.css(prop);
                return (matrix !== null && matrix !== "");
            });

            // if "none" then we supplant it with an identity matrix so that our parsing code below doesn't break
            matrix = (!matrix || matrix === "none") ?
                "matrix(1,0,0,1,0,0)" : matrix;
            return parseMatrix(matrix);
        };

        // set the given matrix transform on the element; note that we apply the css transforms in reverse order of how its given
        // in "transformPropName" to ensure that the std compliant prop name shows up last
        var setTransformMatrix = function (el, matrix) {
            var m = "matrix(" + matrix.join(",") + ")";
            for (var i = transformPropNames.length - 1; i >= 0; --i) {
                el.css(transformPropNames[i], m + ' rotate(0.01deg)');
            }
        };

        // interpolates a value between a range given a percent
        var interpolate = function (from, to, percent) {
            return from + ((to - from) * (percent / 100));
        };

        $.fn.transformAnimate = function (opt) {
            // extend the options passed in by caller
            var options = {
                transform: "matrix(1,0,0,1,0,0)"
            };
            $.extend(options, opt);

            // initialize our custom property on the element to track animation progress
            this.css("percentAnim", 0);

            // supplant "options.step" if it exists with our own routine
            var sourceTransform = getTransformMatrix(this);
            var targetTransform = parseMatrix(options.transform);
            options.step = function (percentAnim, fx) {
                // compute the interpolated transform matrix for the current animation progress
                var $this = $(this);
                var matrix = sourceTransform.map(function (c, i) {
                    return interpolate(c, targetTransform[i],
                        percentAnim);
                });

                // apply the new matrix
                setTransformMatrix($this, matrix);

                // invoke caller's version of "step" if one was supplied;
                if (opt.step) {
                    opt.step.apply(this, [matrix, fx]);
                }
            };

            // animate!
            return this.stop().animate({percentAnim: 100}, options);
        };

        /*** Functionality for translating image in slide - END ***/


        /**
         * Calculate heights for slider holder and slide item, depending on window width, but only if slider is set to be responsive
         * @param slider, current slider
         * @param defaultHeight, default height of slider, set in shortcode
         * @param responsive_breakpoint_set, breakpoints set for slider responsiveness
         * @param reset, boolean for reseting heights
         */
        var setSliderHeight = function (slider, defaultHeight, responsive_breakpoint_set, reset) {
            var sliderHeight = defaultHeight;
            if (!reset) {
                if (edgtf.windowWidth > responsive_breakpoint_set[0]) {
                    sliderHeight = defaultHeight;
                } else if (edgtf.windowWidth > responsive_breakpoint_set[1]) {
                    sliderHeight = defaultHeight * 0.75;
                } else if (edgtf.windowWidth > responsive_breakpoint_set[2]) {
                    sliderHeight = defaultHeight * 0.6;
                } else if (edgtf.windowWidth > responsive_breakpoint_set[3]) {
                    sliderHeight = defaultHeight * 0.55;
                } else if (edgtf.windowWidth <= responsive_breakpoint_set[3]) {
                    sliderHeight = defaultHeight * 0.45;
                }
            }

            slider.css({'height': (sliderHeight) + 'px'});
            slider.find('.edgtf-slider-preloader').css({'height': (sliderHeight) + 'px'});
            slider.find('.edgtf-slider-preloader .edgtf-ajax-loader').css({'display': 'block'});
            slider.find('.item').css({'height': (sliderHeight) + 'px'});
            if (edgtfPerPageVars.vars.edgtfStickyScrollAmount === 0) {
                edgtf.modules.header.stickyAppearAmount = sliderHeight; //set sticky header appear amount if slider there is no amount entered on page itself
            }
        };

        /**
         * Calculate heights for slider holder and slide item, depending on window size, but only if slider is set to be full height
         * @param slider, current slider
         */
        var setSliderFullHeight = function (slider) {
            var mobileHeaderHeight = edgtf.windowWidth < 1025 ? edgtfGlobalVars.vars.edgtfMobileHeaderHeight + $('.edgtf-top-bar').height() : 0;
            slider.css({'height': (edgtf.windowHeight - mobileHeaderHeight) + 'px'});
            slider.find('.edgtf-slider-preloader').css({'height': (edgtf.windowHeight - mobileHeaderHeight) + 'px'});
            slider.find('.edgt-slider-preloader .edgtf-ajax-loader').css({'display': 'block'});
            slider.find('.item').css({'height': (edgtf.windowHeight - mobileHeaderHeight) + 'px'});
            if (edgtfPerPageVars.vars.edgtfStickyScrollAmount === 0) {
                edgtf.modules.header.stickyAppearAmount = edgtf.windowHeight; //set sticky header appear amount if slider there is no amount entered on page itself
            }
        };

        var setElementsResponsiveness = function (slider) {
            // Basic text styles responsiveness
            slider
                .find('.edgtf-slide-element-text-small, .edgtf-slide-element-text-normal, .edgtf-slide-element-text-large, .edgtf-slide-element-text-extra-large')
                .each(function () {
                    var element = $(this);
                    if (typeof element.data('default-font-size') === 'undefined') {
                        element.data('default-font-size', parseInt(element.css('font-size'), 10));
                    }
                    if (typeof element.data('default-line-height') === 'undefined') {
                        element.data('default-line-height', parseInt(element.css('line-height'), 10));
                    }
                    if (typeof element.data('default-letter-spacing') === 'undefined') {
                        element.data('default-letter-spacing', parseInt(element.css('letter-spacing'), 10));
                    }
                });
            // Advanced text styles responsiveness
            slider.find('.edgtf-slide-element-responsive-text').each(function () {
                if (typeof $(this).data('default-font-size') === 'undefined') {
                    $(this).data('default-font-size', parseInt($(this).css('font-size'), 10));
                }
                if (typeof $(this).data('default-line-height') === 'undefined') {
                    $(this).data('default-line-height', parseInt($(this).css('line-height'), 10));
                }
                if (typeof $(this).data('default-letter-spacing') === 'undefined') {
                    $(this).data('default-letter-spacing', parseInt($(this).css('letter-spacing'), 10));
                }
            });
            // Button responsiveness
            slider.find('.edgtf-slide-element-responsive-button').each(function () {
                if (typeof $(this).data('default-font-size') === 'undefined') {
                    $(this).data('default-font-size', parseInt($(this).find('a').css('font-size'), 10));
                }
                if (typeof $(this).data('default-line-height') === 'undefined') {
                    $(this).data('default-line-height', parseInt($(this).find('a').css('line-height'), 10));
                }
                if (typeof $(this).data('default-letter-spacing') === 'undefined') {
                    $(this).data('default-letter-spacing', parseInt($(this).find('a').css('letter-spacing'), 10));
                }
                if (typeof $(this).data('default-ver-padding') === 'undefined') {
                    $(this).data('default-ver-padding', parseInt($(this).find('a').css('padding-top'), 10));
                }
                if (typeof $(this).data('default-hor-padding') === 'undefined') {
                    $(this).data('default-hor-padding', parseInt($(this).find('a').css('padding-left'), 10));
                }
            });
            // Margins for non-custom layouts
            slider.find('.edgtf-slide-element').each(function () {
                var element = $(this);
                if (typeof element.data('default-margin-top') === 'undefined') {
                    element.data('default-margin-top', parseInt(element.css('margin-top'), 10));
                }
                if (typeof element.data('default-margin-bottom') === 'undefined') {
                    element.data('default-margin-bottom', parseInt(element.css('margin-bottom'), 10));
                }
                if (typeof element.data('default-margin-left') === 'undefined') {
                    element.data('default-margin-left', parseInt(element.css('margin-left'), 10));
                }
                if (typeof element.data('default-margin-right') === 'undefined') {
                    element.data('default-margin-right', parseInt(element.css('margin-right'), 10));
                }
            });
            adjustElementsSizes(slider);
        };

        var adjustElementsSizes = function (slider) {
            var boundaries = {
                // These values must match those in map.php (for slider), slider.php and edgt.layout.inc
                mobile: 600,
                tabletp: 800,
                tabletl: 1024,
                laptop: 1440
            };
            slider.find('.edgtf-slider-elements-container').each(function () {
                var container = $(this);
                var target = container.filter('.edgtf-custom-elements').add(container.not('.edgtf-custom-elements').find('.edgtf-slider-elements-holder-frame')).not('.edgtf-grid');
                if (target.length) {
                    if (boundaries.mobile >= edgtf.windowWidth && container.attr('data-width-mobile').length) {
                        target.css('width', container.data('width-mobile') + '%');
                    } else if (boundaries.tabletp >= edgtf.windowWidth && container.attr('data-width-tablet-p').length) {
                        target.css('width', container.data('width-tablet-p') + '%');
                    } else if (boundaries.tabletl >= edgtf.windowWidth && container.attr('data-width-tablet-l').length) {
                        target.css('width', container.data('width-tablet-l') + '%');
                    } else if (boundaries.laptop >= edgtf.windowWidth && container.attr('data-width-laptop').length) {
                        target.css('width', container.data('width-laptop') + '%');
                    } else if (container.attr('data-width-desktop').length) {
                        target.css('width', container.data('width-desktop') + '%');
                    }
                }
            });
            slider.find('.item').each(function () {
                var slide = $(this);
                var def_w = slide.find('.edgtf-slider-elements-holder-frame').data('default-width');
                var elements = slide.find('.edgtf-slide-element');

                // Adjusting margins for all elements
                elements.each(function () {
                    var element = $(this);
                    var def_m_top = element.data('default-margin-top'),
                        def_m_bot = element.data('default-margin-bottom'),
                        def_m_l = element.data('default-margin-left'),
                        def_m_r = element.data('default-margin-right');
                    var scale_data = (typeof element.data('resp-scale') !== 'undefined') ? element.data('resp-scale') : undefined;
                    var factor;

                    if (boundaries.mobile >= edgtf.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.mobile);
                    } else if (boundaries.tabletp >= edgtf.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.tabletp);
                    } else if (boundaries.tabletl >= edgtf.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.tabletl);
                    } else if (boundaries.laptop >= edgtf.windowWidth) {
                        factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.laptop);
                    } else {
                        factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.desktop);
                    }

                    element.css({
                        'margin-top': Math.round(factor * def_m_top) + 'px',
                        'margin-bottom': Math.round(factor * def_m_bot) + 'px',
                        'margin-left': Math.round(factor * def_m_l) + 'px',
                        'margin-right': Math.round(factor * def_m_r) + 'px'
                    });
                });

                // Adjusting responsiveness
                elements
                    .filter('.edgtf-slide-element-responsive-text, .edgtf-slide-element-responsive-button, .edgtf-slide-element-responsive-image')
                    .add(elements.find('a.edgtf-slide-element-responsive-text, span.edgtf-slide-element-responsive-text'))
                    .each(function () {
                        var element = $(this);
                        var scale_data = (typeof element.data('resp-scale') !== 'undefined') ? element.data('resp-scale') : undefined,
                            left_data = (typeof element.data('resp-left') !== 'undefined') ? element.data('resp-left') : undefined,
                            top_data = (typeof element.data('resp-top') !== 'undefined') ? element.data('resp-top') : undefined;
                        var factor, new_left, new_top;

                        if (boundaries.mobile >= edgtf.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.mobile);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.mobile !== '' ? left_data.mobile + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.mobile !== '' ? top_data.mobile + '%' : element.data('top') + '%');
                        } else if (boundaries.tabletp >= edgtf.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.tabletp);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.tabletp !== '' ? left_data.tabletp + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.tabletp !== '' ? top_data.tabletp + '%' : element.data('top') + '%');
                        } else if (boundaries.tabletl >= edgtf.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.tabletl);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.tabletl !== '' ? left_data.tabletl + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.tabletl !== '' ? top_data.tabletl + '%' : element.data('top') + '%');
                        } else if (boundaries.laptop >= edgtf.windowWidth) {
                            factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.laptop);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.laptop !== '' ? left_data.laptop + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.laptop !== '' ? top_data.laptop + '%' : element.data('top') + '%');
                        } else {
                            factor = (typeof scale_data === 'undefined') ? edgtf.windowWidth / def_w : parseFloat(scale_data.desktop);
                            new_left = (typeof left_data === 'undefined') ? (typeof element.data('left') !== 'undefined' ? element.data('left') + '%' : '') : (left_data.desktop !== '' ? left_data.desktop + '%' : element.data('left') + '%');
                            new_top = (typeof top_data === 'undefined') ? (typeof element.data('top') !== 'undefined' ? element.data('top') + '%' : '') : (top_data.desktop !== '' ? top_data.desktop + '%' : element.data('top') + '%');
                        }

                        if (!factor) {
                            element.hide();
                        } else {
                            element.show();
                            var def_font_size,
                                def_line_h,
                                def_let_spac,
                                def_ver_pad,
                                def_hor_pad;

                            if (element.is('.edgtf-slide-element-responsive-button')) {
                                def_font_size = element.data('default-font-size');
                                def_line_h = element.data('default-line-height');
                                def_let_spac = element.data('default-letter-spacing');
                                def_ver_pad = element.data('default-ver-padding');
                                def_hor_pad = element.data('default-hor-padding');

                                element.css({
                                    'left': new_left,
                                    'top': new_top
                                })
                                    .find('.edgtf-btn').css({
                                    'font-size': Math.round(factor * def_font_size) + 'px',
                                    'line-height': Math.round(factor * def_line_h) + 'px',
                                    'letter-spacing': Math.round(factor * def_let_spac) + 'px',
                                    'padding-left': Math.round(factor * def_hor_pad) + 'px',
                                    'padding-right': Math.round(factor * def_hor_pad) + 'px',
                                    'padding-top': Math.round(factor * def_ver_pad) + 'px',
                                    'padding-bottom': Math.round(factor * def_ver_pad) + 'px'
                                });
                            } else if (element.is('.edgtf-slide-element-responsive-image')) {
                                if (factor !== edgtf.windowWidth / def_w) { // if custom factor has been set for this screen width
                                    var up_w = element.data('upload-width'),
                                        up_h = element.data('upload-height');

                                    element.filter('.custom-image').css({
                                        'left': new_left,
                                        'top': new_top
                                    })
                                        .add(element.not('.custom-image').find('img'))
                                        .css({
                                            'width': Math.round(factor * up_w) + 'px',
                                            'height': Math.round(factor * up_h) + 'px'
                                        });
                                } else {
                                    var w = element.data('width');

                                    element.filter('.custom-image').css({
                                        'left': new_left,
                                        'top': new_top
                                    })
                                        .add(element.not('.custom-image').find('img'))
                                        .css({
                                            'width': w + '%',
                                            'height': ''
                                        });
                                }
                            } else {
                                def_font_size = element.data('default-font-size');
                                def_line_h = element.data('default-line-height');
                                def_let_spac = element.data('default-letter-spacing');

                                element.css({
                                    'left': new_left,
                                    'top': new_top,
                                    'font-size': Math.round(factor * def_font_size) + 'px',
                                    'line-height': Math.round(factor * def_line_h) + 'px',
                                    'letter-spacing': Math.round(factor * def_let_spac) + 'px'
                                });
                            }
                        }
                    });
            });
            var nav = slider.find('.carousel-indicators');
            slider.find('.edgtf-slide-element-section-link').css('bottom', nav.length ? parseInt(nav.css('bottom'), 10) + nav.outerHeight() + 10 + 'px' : '20px');
        };

        var checkButtonsAlignment = function (slider) {
            slider.find('.item').each(function () {
                var inline_buttons = $(this).find('.edgtf-slide-element-button-inline');
                inline_buttons.css('display', 'inline-block').wrapAll('<div class="edgtf-slide-elements-buttons-wrapper" style="text-align: ' + inline_buttons.eq(0).css('text-align') + ';"/>');
            });
        };

        /**
         * Set heights for slider and elemnts depending on slider settings (full height, responsive height od set height)
         * @param slider, current slider
         */
        var setHeights = function (slider) {

            var responsiveBreakpointSet = [1600, 1200, 900, 650, 500, 320];

            setElementsResponsiveness(slider);

            if (slider.hasClass('edgtf-full-screen')) {

                setSliderFullHeight(slider);

                $(window).resize(function () {
                    setSliderFullHeight(slider);
                    adjustElementsSizes(slider);
                });

            } else if (slider.hasClass('edgtf-responsive-height')) {

                var defaultHeight = slider.data('height');
                setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);

                $(window).resize(function () {
                    setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
                    adjustElementsSizes(slider);
                });

            } else {
                var defaultHeight = slider.data('height');

                slider.find('.edgtf-slider-preloader').css({'height': (slider.height()) + 'px'});
                slider.find('.edgtf-slider-preloader .edgtf-ajax-loader').css({'display': 'block'});

                edgtf.windowWidth < 1025 ? setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false) : setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);

                $(window).resize(function () {
                    if (edgtf.windowWidth < 1025) {
                        setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
                    } else {
                        setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);
                    }
                    adjustElementsSizes(slider);
                });
            }
        };

        /**
         * Set prev/next numbers on navigation arrows
         * @param slider, current slider
         * @param currentItem, current slide item index
         * @param totalItemCount, total number of slide items
         */
        var setPrevNextNumbers = function (slider, currentItem, totalItemCount) {
            if (currentItem === 1) {
                slider.find('.left.carousel-control .prev').html(totalItemCount);
                slider.find('.right.carousel-control .next').html(currentItem + 1);
            } else if (currentItem === totalItemCount) {
                slider.find('.left.carousel-control .prev').html(currentItem - 1);
                slider.find('.right.carousel-control .next').html(1);
            } else {
                slider.find('.left.carousel-control .prev').html(currentItem - 1);
                slider.find('.right.carousel-control .next').html(currentItem + 1);
            }
        };

        /**
         * Set video background size
         * @param slider, current slider
         */
        var initVideoBackgroundSize = function (slider) {
            var min_w = 1500; // minimum video width allowed
            var video_width_original = 1920;  // original video dimensions
            var video_height_original = 1080;
            var vid_ratio = 1920 / 1080;

            slider.find('.item .edgtf-video .edgtf-video-wrap').each(function () {

                var slideWidth = edgtf.windowWidth;
                var slideHeight = $(this).closest('.carousel').height();

                $(this).width(slideWidth);

                min_w = vid_ratio * (slideHeight + 20);
                $(this).height(slideHeight);

                var scale_h = slideWidth / video_width_original;
                var scale_v = (slideHeight - edgtfGlobalVars.vars.edgtfMenuAreaHeight) / video_height_original;
                var scale = scale_v;
                if (scale_h > scale_v)
                    scale = scale_h;
                if (scale * video_width_original < min_w) {
                    scale = min_w / video_width_original;
                }

                $(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original + 2));
                $(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original + 2));
                $(this).scrollLeft(($(this).find('video').width() - slideWidth) / 2);
                $(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - slideHeight) / 2);
                $(this).scrollTop(($(this).find('video').height() - slideHeight) / 2);
            });
        };

        /**
         * Init video background
         * @param slider, current slider
         */
        var initVideoBackground = function (slider) {
            $('.item .edgtf-video-wrap .edgtf-video-element').mediaelementplayer({
                enableKeyboard: false,
                iPadUseNativeControls: false,
                pauseOtherPlayers: false,
                // force iPhone's native controls
                iPhoneUseNativeControls: false,
                // force Android's native controls
                AndroidUseNativeControls: false
            });

            initVideoBackgroundSize(slider);
            $(window).resize(function () {
                initVideoBackgroundSize(slider);
            });

            //mobile check
            if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
                $('.edgtf-slider .edgtf-mobile-video-image').show();
                $('.edgtf-slider .edgtf-video-wrap').remove();
            }
        };

        var initPeek = function (slider) {
            if (slider.hasClass('edgtf-slide-peek')) {

                var navArrowHover = function (arrow, entered) {
                    var dir = arrow.is('.left') ? 'left' : 'right';
                    var targ_peeker = peekers.filter('.' + dir);
                    if (entered) {
                        arrow.addClass('hovered');
                        var targ_item = (items.index(items.filter('.active')) + (dir === 'left' ? -1 : 1) + items.length) % items.length;
                        targ_peeker.find('.edgtf-slider-peeker-inner').css({
                            'background-image': items.eq(targ_item).find('.edgtf-image, .edgtf-mobile-video-image').css('background-image'),
                            'width': itemWidth + 'px'
                        });
                        targ_peeker.addClass('shown');
                    } else {
                        arrow.removeClass('hovered');
                        peekers.removeClass('shown');
                    }
                };

                var navBulletHover = function (bullet, entered) {
                    if (entered) {
                        bullet.addClass('hovered');

                        var targ_item = bullet.data('slide-to');
                        var cur_item = items.index(items.filter('.active'));
                        if (cur_item !== targ_item) {
                            var dir = (targ_item < cur_item) ? 'left' : 'right';
                            var targ_peeker = peekers.filter('.' + dir);
                            targ_peeker.find('.edgtf-slider-peeker-inner').css({
                                'background-image': items.eq(targ_item).find('.edgtf-image, .edgtf-mobile-video-image').css('background-image'),
                                'width': itemWidth + 'px'
                            });
                            targ_peeker.addClass('shown');
                        }
                    } else {
                        bullet.removeClass('hovered');
                        peekers.removeClass('shown');
                    }
                };

                var handleResize = function () {
                    itemWidth = items.filter('.active').width();
                    itemWidth += (itemWidth % 2) ? 1 : 0; // To make it even
                    items.children('.edgtf-image, .edgtf-video').css({
                        'position': 'absolute',
                        'width': itemWidth + 'px',
                        'height': '110%',
                        'left': '50%',
                        'transform': 'translateX(-50%)'
                    });
                };

                var items = slider.find('.item');
                var itemWidth;
                handleResize();
                $(window).resize(handleResize);

                slider.find('.carousel-inner').append('<div class="edgtf-slider-peeker left"><div class="edgtf-slider-peeker-inner"></div></div><div class="edgtf-slider-peeker right"><div class="edgtf-slider-peeker-inner"></div></div>');
                var peekers = slider.find('.edgtf-slider-peeker');
                var nav_arrows = slider.find('.carousel-control');
                var nav_bullets = slider.find('.carousel-indicators > li');

                nav_arrows.on('mouseenter', function () {
                    navArrowHover($(this), true);
                });
                nav_arrows.on('mouseleave', function () {
                    navArrowHover($(this), false);
                });

                nav_bullets.on('mouseenter', function () {
                    navBulletHover($(this), true);
                });
                nav_bullets.on('mouseleave', function () {
                    navBulletHover($(this), false);
                });

                slider.on('slide.bs.carousel', function () {
                    setTimeout(function () {
                        peekers.addClass('edgtf-slide-peek-in-progress').removeClass('shown');
                    }, 500);
                });

                slider.on('slid.bs.carousel', function () {
                    nav_arrows.filter('.hovered').each(function () {
                        navArrowHover($(this), true);
                    });
                    setTimeout(function () {
                        nav_bullets.filter('.hovered').each(function () {
                            navBulletHover($(this), true);
                        });
                    }, 200);
                    peekers.removeClass('edgtf-slide-peek-in-progress');
                });
            }
        };

        var updateNavigationThumbs = function (slider) {
            if (slider.hasClass('edgtf-slider-thumbs')) {
                var src, prev_image, next_image;
                var all_items_count = slider.find('.item').length;
                var curr_item = slider.find('.item').index($('.item.active')[0]) + 1;
                setPrevNextNumbers(slider, curr_item, all_items_count);

                // prev thumb
                if (slider.find('.item.active').prev('.item').length) {
                    if (slider.find('.item.active').prev('div').find('.edgtf-image').length) {
                        src = imageRegex.exec(slider.find('.active').prev('div').find('.edgtf-image').attr('style'));
                        prev_image = new Image();
                        prev_image.src = src[1];
                        //prev_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        prev_image = slider.find('.active').prev('div').find('> .edgtf-video').clone();
                        prev_image.find('.edgtf-video-overlay, .mejs-offscreen').remove();
                        prev_image.find('.edgtf-video-wrap').width(150).height(84);
                        prev_image.find('.mejs-container').width(150).height(84);
                        prev_image.find('video').width(150).height(84);
                    }
                    slider.find('.left.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.left.carousel-control .img').append(prev_image).find('div.thumb-image, > img, div.edgtf-video').fadeIn(300).addClass('old');

                } else {
                    if (slider.find('.carousel-inner .item:last-child .edgtf-image').length) {
                        src = imageRegex.exec(slider.find('.carousel-inner .item:last-child .edgtf-image').attr('style'));
                        prev_image = new Image();
                        prev_image.src = src[1];
                        //prev_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        prev_image = slider.find('.carousel-inner .item:last-child > .edgtf-video').clone();
                        prev_image.find('.edgtf-video-overlay, .mejs-offscreen').remove();
                        prev_image.find('.edgtf-video-wrap').width(150).height(84);
                        prev_image.find('.mejs-container').width(150).height(84);
                        prev_image.find('video').width(150).height(84);
                    }
                    slider.find('.left.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.left.carousel-control .img').append(prev_image).find('div.thumb-image, > img, div.edgtf-video').fadeIn(300).addClass('old');
                }

                // next thumb
                if (slider.find('.active').next('div.item').length) {
                    if (slider.find('.active').next('div').find('.edgtf-image').length) {
                        src = imageRegex.exec(slider.find('.active').next('div').find('.edgtf-image').attr('style'));
                        next_image = new Image();
                        next_image.src = src[1];
                        //next_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        next_image = slider.find('.active').next('div').find('> .edgtf-video').clone();
                        next_image.find('.edgtf-video-overlay, .mejs-offscreen').remove();
                        next_image.find('.edgtf-video-wrap').width(150).height(84);
                        next_image.find('.mejs-container').width(150).height(84);
                        next_image.find('video').width(150).height(84);
                    }

                    slider.find('.right.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.right.carousel-control .img').append(next_image).find('div.thumb-image, > img, div.edgtf-video').fadeIn(300).addClass('old');

                } else {
                    if (slider.find('.carousel-inner .item:first-child .edgtf-image').length) {
                        src = imageRegex.exec(slider.find('.carousel-inner .item:first-child .edgtf-image').attr('style'));
                        next_image = new Image();
                        next_image.src = src[1];
                        //next_image = '<div class="thumb-image" style="background-image: url('+src[1]+')"></div>';
                    } else {
                        next_image = slider.find('.carousel-inner .item:first-child > .edgtf-video').clone();
                        next_image.find('.edgtf-video-overlay, .mejs-offscreen').remove();
                        next_image.find('.edgtf-video-wrap').width(150).height(84);
                        next_image.find('.mejs-container').width(150).height(84);
                        next_image.find('video').width(150).height(84);
                    }
                    slider.find('.right.carousel-control .img .old').fadeOut(300, function () {
                        $(this).remove();
                    });
                    slider.find('.right.carousel-control .img').append(next_image).find('div.thumb-image, > img, div.edgtf-video').fadeIn(300).addClass('old');
                }
            }
        };

        /**
         * initiate slider
         * @param slider, current slider
         * @param currentItem, current slide item index
         * @param totalItemCount, total number of slide items
         * @param slideAnimationTimeout, timeout for slide change
         */
        var initiateSlider = function (slider, totalItemCount, slideAnimationTimeout) {

            //set active class on first item
            slider.find('.carousel-inner .item:first-child').addClass('active');
            //check for header style
            edgtfCheckSliderForHeaderStyle($('.carousel .active'), slider.hasClass('edgtf-header-effect'));
            // setting numbers on carousel controls
            if (slider.hasClass('edgtf-slider-numbers')) {
                setPrevNextNumbers(slider, 1, totalItemCount);
            }
            // set video background if there is video slide
            if (slider.find('.item video').length) {
                //initVideoBackgroundSize(slider);
                initVideoBackground(slider);
            }

            // update thumbs
            updateNavigationThumbs(slider);

            // initiate peek
            initPeek(slider);

            // enable link hover color for slide elements with links
            slider.find('.edgtf-slide-element-wrapper-link')
                .mouseenter(function () {
                    $(this).removeClass('inheriting');
                })
                .mouseleave(function () {
                    $(this).addClass('inheriting');
                })
            ;

            //init slider
            if (slider.hasClass('edgtf-auto-start')) {
                slider.carousel({
                    interval: slideAnimationTimeout,
                    pause: false
                });

                //pause slider when hover slider button
                slider.find('.slide_buttons_holder .qbutton')
                    .mouseenter(function () {
                        slider.carousel('pause');
                    })
                    .mouseleave(function () {
                        slider.carousel('cycle');
                    });
            } else {
                slider.carousel({
                    interval: 0,
                    pause: false
                });
            }

            $(window).scroll(function () {
                if (slider.hasClass('edgtf-full-screen') && edgtf.scroll > edgtf.windowHeight && edgtf.windowWidth > 1024) {
                    slider.carousel('pause');
                } else if (!slider.hasClass('edgtf-full-screen') && edgtf.scroll > slider.height() && edgtf.windowWidth > 1024) {
                    slider.carousel('pause');
                } else {
                    slider.carousel('cycle');
                }
            });


            //initiate image animation
            if ($('.carousel-inner .item:first-child').hasClass('edgtf-animate-image') && edgtf.windowWidth > 1024) {
                slider.find('.carousel-inner .item.edgtf-animate-image:first-child .edgtf-image').transformAnimate({
                    transform: "matrix(" + matrixArray[$('.carousel-inner .item:first-child').data('edgtf_animate_image')] + ")",
                    duration: 30000
                });
            }
        };

        return {
            init: function () {
                if (sliders.length) {
                    sliders.each(function () {
                        var $this = $(this);
                        var slideAnimationTimeout = $this.data('slide_animation_timeout');
                        var totalItemCount = $this.find('.item').length;

                        checkButtonsAlignment($this);

                        setHeights($this);

                        /*** wait until first video or image is loaded and than initiate slider - start ***/
                        if (edgtf.htmlEl.hasClass('touch')) {
                            if ($this.find('.item:first-child .edgtf-mobile-video-image').length > 0) {
                                var src = imageRegex.exec($this.find('.item:first-child .edgtf-mobile-video-image').attr('style'));
                            } else {
                                var src = imageRegex.exec($this.find('.item:first-child .edgtf-image').attr('style'));
                            }
                            if (src) {
                                var backImg = new Image();
                                backImg.src = src[1];
                                $(backImg).load(function () {
                                    $('.edgtf-slider-preloader').fadeOut(500);
                                    initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                });
                            }
                        } else {
                            if ($this.find('.item:first-child video').length > 0) {
                                $this.find('.item:first-child video').eq(0).one('loadeddata', function () {
                                    $('.edgtf-slider-preloader').fadeOut(500);
                                    initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                });
                            } else {
                                var src = imageRegex.exec($this.find('.item:first-child .edgtf-image').attr('style'));
                                if (src) {
                                    var backImg = new Image();
                                    backImg.src = src[1];
                                    $(backImg).load(function () {
                                        $('.edgtf-slider-preloader').fadeOut(500);
                                        initiateSlider($this, totalItemCount, slideAnimationTimeout);
                                    });
                                }
                            }
                        }
                        /*** wait until first video or image is loaded and than initiate slider - end ***/

                        /* before slide transition - start */
                        $this.on('slide.bs.carousel', function () {
                            $this.addClass('edgtf-in-progress');
                            $this.find('.active .edgtf-slider-elements-holder-frame, .active .edgtf-slide-element-section-link').fadeTo(250, 0);
                        });
                        /* before slide transition - end */

                        /* after slide transition - start */
                        $this.on('slid.bs.carousel', function () {
                            $this.removeClass('edgtf-in-progress');
                            $this.find('.active .edgtf-slider-elements-holder-frame, .active .edgtf-slide-element-section-link').fadeTo(0, 1);

                            // setting numbers on carousel controls
                            if ($this.hasClass('edgtf-slider-numbers')) {
                                var currentItem = $('.item').index($('.item.active')[0]) + 1;
                                setPrevNextNumbers($this, currentItem, totalItemCount);
                            }

                            // initiate image animation on active slide and reset all others
                            $('.item.edgtf-animate-image .edgtf-image').stop().css({
                                'transform': '',
                                '-webkit-transform': ''
                            });
                            if ($('.item.active').hasClass('edgtf-animate-image') && edgtf.windowWidth > 1025) {
                                $('.item.edgtf-animate-image.active .edgtf-image').transformAnimate({
                                    transform: "matrix(" + matrixArray[$('.item.edgtf-animate-image.active').data('edgtf_animate_image')] + ")",
                                    duration: 30000
                                });
                            }

                            // setting thumbnails on navigation controls
                            if ($this.hasClass('edgtf-slider-thumbs')) {
                                updateNavigationThumbs($this);
                            }
                        });
                        /* after slide transition - end */

                        /* swipe functionality - start */
                        $this.swipe({
                            swipeLeft: function () {
                                $this.carousel('next');
                            },
                            swipeRight: function () {
                                $this.carousel('prev');
                            },
                            threshold: 20
                        });
                        /* swipe functionality - end */

                    });

                    //adding parallax functionality on slider
                    if ($('.no-touch .carousel').length) {
                        var skrollr_slider = skrollr.init({
                            smoothScrolling: false,
                            forceHeight: false
                        });
                        skrollr_slider.refresh();
                    }

                    $(window).scroll(function () {
                        //set control class for slider in order to change header style
                        if ($('.edgtf-slider .carousel').height() < edgtf.scroll) {
                            $('.edgtf-slider .carousel').addClass('edgtf-disable-slider-header-style-changing');
                        } else {
                            $('.edgtf-slider .carousel').removeClass('edgtf-disable-slider-header-style-changing');
                            edgtfCheckSliderForHeaderStyle($('.edgtf-slider .carousel .active'), $('.edgtf-slider .carousel').hasClass('edgtf-header-effect'));
                        }

                        //hide slider when it is out of viewport
                        if ($('.edgtf-slider .carousel').hasClass('edgtf-full-screen') && edgtf.scroll > edgtf.windowHeight && edgtf.windowWidth > 1025) {
                            $('.edgtf-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
                        } else if (!$('.edgtf-slider .carousel').hasClass('edgtf-full-screen') && edgtf.scroll > $('.edgtf-slider .carousel').height() && edgtf.windowWidth > 1025) {
                            $('.edgtf-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
                        } else {
                            $('.edgtf-slider .carousel').find('.carousel-inner, .carousel-indicators').show();
                        }
                    });
                }
            }
        };
    };

    /**
     * Check if slide effect on header style changing
     * @param slide, current slide
     * @param headerEffect, flag if slide
     */

    function edgtfCheckSliderForHeaderStyle(slide, headerEffect) {

        if ($('.edgtf-slider .carousel').not('.edgtf-disable-slider-header-style-changing').length > 0) {

            var slideHeaderStyle = "";
            if (slide.hasClass('light')) {
                slideHeaderStyle = 'edgtf-light-header';
            }
            if (slide.hasClass('dark')) {
                slideHeaderStyle = 'edgtf-dark-header';
            }

            if (slideHeaderStyle !== "") {
                if (headerEffect) {
                    edgtf.body.removeClass('edgtf-dark-header edgtf-light-header').addClass(slideHeaderStyle);
                }
            } else {
                if (headerEffect) {
                    edgtf.body.removeClass('edgtf-dark-header edgtf-light-header').addClass(edgtf.defaultHeaderStyle);
                }

            }
        }
    }

    /**
     * List object that initializes list with animation
     * @type {Function}
     */
    var edgtfInitIconList = edgtf.modules.shortcodes.edgtfInitIconList = function () {
        var iconList = $('.edgtf-animate-list');

        /**
         * Initializes icon list animation
         * @param list current list shortcode
         */
        var iconListInit = function (list) {
            setTimeout(function () {
                list.appear(function () {
                    list.addClass('edgtf-appeared');
                }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
            }, 30);
        };

        return {
            init: function () {
                if (iconList.length) {
                    iconList.each(function () {
                        iconListInit($(this));
                    });
                }
            }
        };
    };

    /**
     * Masonry gallery, init masonry and resize pictures in grid
     */
    function edgtfInitMasonryGallery() {


        resizeMasonryGallery($('.edgtf-masonry-gallery-grid-sizer').width());

        if ($('.edgtf-masonry-gallery-holder').length) {
            $('.edgtf-masonry-gallery-holder').each(function () {
                var holder = $(this);
                holder.waitForImages(function () {
                    holder.animate({opacity: 1});
                    holder.isotope({
                        itemSelector: '.edgtf-masonry-gallery-item',
                        masonry: {
                            columnWidth: '.edgtf-masonry-gallery-grid-sizer'
                        }
                    });
                });
            });
            $(window).resize(function () {
                resizeMasonryGallery($('.edgtf-masonry-gallery-grid-sizer').width());
                $('.edgtf-masonry-gallery-holder').isotope('reloadItems');
            });
        }
    }

    function resizeMasonryGallery(size) {

        var rectangle_portrait = $('.edgtf-masonry-gallery-holder .edgtf-mg-rectangle-portrait');
        var rectangle_landscape = $('.edgtf-masonry-gallery-holder .edgtf-mg-rectangle-landscape');
        var square_big = $('.edgtf-masonry-gallery-holder .edgtf-mg-square-big');
        var square_small = $('.edgtf-masonry-gallery-holder .edgtf-mg-square-small');

        rectangle_portrait.css('height', 2 * size);
        if (window.innerWidth < 600) {
            rectangle_landscape.css('height', size / 2);
        } else {
            rectangle_landscape.css('height', size);
        }
        square_big.css('height', 2 * size);
        if (window.innerWidth < 600) {
            square_big.css('height', square_big.width());
        }
        square_small.css('height', size);
    }

    /*
     **  Init shop list masonry type
     */
    function edgtfInitShopListMasonry() {
        var shopList = $('.edgtf-shop-masonry');
        if (shopList.length) {
            shopList.each(function () {
                var thisShopList = $(this).children('.edgtf-shop-list-masonry');
                var size = thisShopList.find('.edgtf-shop-list-masonry-grid-sizer').width();
                edgtfResizeShopMasonry(size, thisShopList);

                edgtfInitMasonryLayout(thisShopList);
                $(window).resize(function () {
                    size = thisShopList.find('.edgtf-shop-list-masonry-grid-sizer').width();
                    edgtfResizeShopMasonry(size, thisShopList);
                    edgtfInitMasonryLayout(thisShopList);
                });
            });
        }
    }

    function edgtfInitMasonryLayout(container) {
        container.animate({opacity: 1});
        container.isotope({
            layoutMode: 'packery',
            itemSelector: '.edgtf-shop-product',
            packery: {
                columnWidth: '.edgtf-shop-list-masonry-grid-sizer'
            }
        });
    }

    function edgtfResizeShopMasonry(size, container) {

        var defaultMasonryItem = container.find('.edgtf-default-masonry-item');
        var largeWidthMasonryItem = container.find('.edgtf-large-width-masonry-item');
        var largeHeightMasonryItem = container.find('.edgtf-large-height-masonry-item');
        var largeWidthHeightMasonryItem = container.find('.edgtf-large-width-height-masonry-item');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', Math.round(2 * size));

        var breakpoint = edgtf.body.hasClass('page-template-full-width') ? 480 : 600;

        if (edgtf.windowWidth > breakpoint) {
            largeWidthHeightMasonryItem.css('height', Math.round(2 * size));
            largeWidthMasonryItem.css('height', size);
        } else {
            largeWidthHeightMasonryItem.css('height', size);
            largeWidthMasonryItem.css('height', Math.round(size / 2));

        }
    }

    /**
     * Initializes shop masonry filter
     */
    function edgtfInitShopMasonryFilter() {

        var filterHolder = $('.edgtf-shop-filter-holder.edgtf-masonry-filter');

        if (filterHolder.length) {
            filterHolder.each(function () {

                var thisFilterHolder = $(this);

                var shopIsotopeAnimation = null;

                thisFilterHolder.find('.filter:first').addClass('current');

                thisFilterHolder.find('li').on('click', function () {

                    var currentFilter = $(this);
                    clearTimeout(shopIsotopeAnimation);

                    $('.isotope, .isotope .isotope-item').css('transition-duration', '0.8s');

                    shopIsotopeAnimation = setTimeout(function () {
                        $('.isotope, .isotope .isotope-item').css('transition-duration', '0s');
                    }, 700);

                    var selector = $(this).attr('data-filter');
                    thisFilterHolder.parent().find('.edgtf-shop-list-masonry').isotope({filter: selector});

                    thisFilterHolder.find('.filter').removeClass('current');
                    currentFilter.addClass('current');

                    return false;

                });

            });
        }
    }

    /**
     * Check if slide effect on header style changing
     */
    function edgtfItemShowcase() {
        var itemShowcase = $('.edgtf-item-showcase');
        if (itemShowcase.length) {
            itemShowcase.each(function () {
                var thisItemShowcase = $(this),
                    leftItems = thisItemShowcase.find('.edgtf-item-left'),
                    rightItems = thisItemShowcase.find('.edgtf-item-right'),
                    itemImage = thisItemShowcase.find('.edgtf-item-image');

                //logic
                leftItems.wrapAll("<div class='edgtf-item-showcase-holder edgtf-holder-left' />");
                rightItems.wrapAll("<div class='edgtf-item-showcase-holder edgtf-holder-right' />");
                thisItemShowcase.animate({opacity: 1}, 200);
                setTimeout(function () {
                    thisItemShowcase.appear(function () {
                        itemImage.addClass('edgtf-appeared');
                        thisItemShowcase.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                            function (e) {
                                if (edgtf.windowWidth > 1200) {
                                    itemAppear('.edgtf-holder-left .edgtf-item');
                                    itemAppear('.edgtf-holder-right .edgtf-item');
                                } else {
                                    itemAppear('.edgtf-item');
                                }
                            });
                    }, {accX: 0, accY: 0});
                }, 100);

                //appear animation trigger
                function itemAppear(itemCSSClass) {
                    thisItemShowcase.find(itemCSSClass).each(function (i) {
                        var thisListItem = $(this);
                        setTimeout(function () {
                            thisListItem.appear(function () {
                                $(this).addClass('edgtf-appeared');
                            }, {accX: 0, accY: 0});
                        }, i * 150);
                    });
                }
            });

        }
    }

    /*
     * Type out functionality for Custom Font
     */
    function edgtfCustomFontTypeOut() {

        var edgtfTyped = $('.edgtf-typed');

        if (edgtfTyped.length) {
            edgtfTyped.each(function () {

                //vars
                var thisTyped = $(this),
                    typedWrap = thisTyped.parent('.edgtf-typed-wrap'),
                    customFontHolder = typedWrap.parent('.edgtf-custom-font-holder'),
                    originalText = customFontHolder.find('.edgtf-custom-font-original'),
                    str,
                    string_1 = thisTyped.find('.edgtf-typed-1').text(),
                    string_2 = thisTyped.find('.edgtf-typed-2').text(),
                    string_3 = thisTyped.find('.edgtf-typed-3').text();

                //show only the strings that are entered in
                if (!string_2.trim() || !string_3.trim()) {
                    str = [string_1];
                }
                if (!string_3.trim() && string_2.length) {
                    str = [string_1, string_2];
                }
                if (string_1.length && string_2.length && string_3.length) {
                    str = [string_1, string_2, string_3];
                }

                //ampersand
                if (originalText.text().indexOf('&') !== -1) {
                    originalText.html(originalText.text().replace('&', '<span class="edgtf-amp">&</span>'));
                }

                //typeout
                setTimeout(function () {
                    customFontHolder.appear(function () {
                        thisTyped.typed({
                            strings: str,
                            typeSpeed: 90,
                            backDelay: 700,
                            loop: true,
                            contentType: 'text',
                            loopCount: false,
                            cursorChar: "_",
                        });
                    }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
                }, 100);

            });
        }
    }

    /*
    * Animations Holder
    */
    function edgtfAnimationsHolder() {
        var animationsHolderElements = $('.edgtf-animations-holder');

        if (animationsHolderElements.length) {
            animationsHolderElements.appear(function () {
                var animationsHolderElement = $(this);

                animationsHolderElement.addClass('edgtf-appeared');

            }, {accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount});
        }
    }

    /*
    *  Reservation Form 
    */
    function edgtfReservationFormDatePicker() {

        var datepicker = $('.edgtf-ot-date');

        if (datepicker.length) {
            datepicker.each(function () {
                $(this).datepicker({
                    prevText: '<span class="arrow_carrot-left"></span>',
                    nextText: '<span class="arrow_carrot-right"></span>'
                });
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var woocommerce = {};
    edgtf.modules.woocommerce = woocommerce;

    woocommerce.edgtfInitQuantityButtons = edgtfInitQuantityButtons;
    woocommerce.edgtfInitSelect2 = edgtfInitSelect2;

    woocommerce.edgtfOnDocumentReady = edgtfOnDocumentReady;
    woocommerce.edgtfOnWindowLoad = edgtfOnWindowLoad;
    woocommerce.edgtfOnWindowResize = edgtfOnWindowResize;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfInitQuantityButtons();
        edgtfInitSelect2();
        edgtfAddedToCartButton();
        edgtfInitSingleProductLightbox();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {

    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }
    

    function edgtfInitQuantityButtons() {

        $(document).on( 'click', '.edgtf-quantity-minus, .edgtf-quantity-plus', function(e) {
            e.stopPropagation();

            var button = $(this),
                inputField = button.parents('.edgtf-quantity-buttons').find('.edgtf-quantity-input'),
                step = parseFloat(inputField.data('step')),
                max = parseFloat(inputField.data('max')),
                minus = false,
                inputValue = parseFloat(inputField.val()),
                newInputValue;

            if (button.hasClass('edgtf-quantity-minus')) {
                minus = true;
            }

            if (minus) {
                newInputValue = inputValue - step;
                if (newInputValue >= 1) {
                    inputField.val(newInputValue);
                } else {
                    inputField.val(1);
                }
            } else {
                newInputValue = inputValue + step;
                if ( max === undefined ) {
                    inputField.val(newInputValue);
                } else {
                    if ( newInputValue >= max ) {
                        inputField.val(max);
                    } else {
                        inputField.val(newInputValue);
                    }
                }
            }

            inputField.trigger( 'change' );

        });

    }

    function edgtfInitSelect2() {

        if ($('.woocommerce-ordering .orderby').length ||  $('#calc_shipping_country').length ) {

            $('.woocommerce-ordering .orderby').select2({
                minimumResultsForSearch: Infinity
            });

            $('#calc_shipping_country, .dropdown_product_cat, .dropdown_layered_nav_color').select2();

        }

    }


    function edgtfAddedToCartButton(){
        $('body').on("added_to_cart", function( data ) {

            var btn = $('a.added_to_cart:not(.edgtf-btn)');
            btn.addClass('edgtf-btn').html("<span class='edgtf-icon-font-elegant icon_check'></span><span class='edgtf-btn-text'>"+btn.html()+"</span>");
        });
    }

    /*
     ** Init Product Single Pretty Photo attributes
     */
        function edgtfInitSingleProductLightbox() {

            var item = $('.edgtf-woocommerce-single-page .edgtf-single-product-images .images .woocommerce-product-gallery__image a');
            
            if(item.length) {
                item.each(function() {
                    var thisItem = $(this);
                    
                    thisItem.attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');
            
                    if (typeof edgtf.modules.common.edgtfPrettyPhoto === "function") {
                        edgtf.modules.common.edgtfPrettyPhoto();
                    }
                });
            }
        }


})(jQuery);
(function($) {
    'use strict';

    var portfolio = {};
    edgtf.modules.portfolio = portfolio;

    portfolio.edgtfOnDocumentReady = edgtfOnDocumentReady;
    portfolio.edgtfOnWindowLoad = edgtfOnWindowLoad;
    portfolio.edgtfOnWindowResize = edgtfOnWindowResize;
    portfolio.edgtfOnWindowScroll = edgtfOnWindowScroll;
    portfolio.edgtfPortfolioSingleMasonry = edgtfPortfolioSingleMasonry;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfPortfolioSingleMasonry();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfPortfolioSingleFollow().init();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {

    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {

    }



    var edgtfPortfolioSingleFollow = function() {

        var info = $('.edgtf-follow-portfolio-info .small-images.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder, ' +
            '.edgtf-follow-portfolio-info .small-slider.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder');

        if (info.length) {
            var infoHolder = info.parent(),
                infoHolderOffset = infoHolder.offset().top,
                infoHolderHeight = infoHolder.height(),
                mediaHolder = $('.edgtf-portfolio-media'),
                mediaHolderHeight = mediaHolder.height(),
                header = $('.header-appear, .edgtf-fixed-wrapper'),
                headerHeight = (header.length) ? header.height() : 0;
        }

        var infoHolderPosition = function() {

            if(info.length) {

                if (mediaHolderHeight > infoHolderHeight) {
                    if(edgtf.scroll > infoHolderOffset) {
                        var marginTop = edgtf.scroll - infoHolderOffset + edgtfGlobalVars.vars.edgtfAddForAdminBar + headerHeight + 20; //20 px is for styling, spacing between header and info holder
                        // if scroll is initially positioned below mediaHolderHeight
                        if(marginTop + infoHolderHeight > mediaHolderHeight){
                            marginTop = mediaHolderHeight - infoHolderHeight;
                        }
                        info.animate({
                            marginTop: marginTop
                        });
                    }
                }

            }
        };

        var recalculateInfoHolderPosition = function() {

            if (info.length) {
                if(mediaHolderHeight > infoHolderHeight) {
                    if(edgtf.scroll > infoHolderOffset) {

                        if(edgtf.scroll + headerHeight + edgtfGlobalVars.vars.edgtfAddForAdminBar + infoHolderHeight + 100 < infoHolderOffset + mediaHolderHeight) {    //70 to prevent mispositioning

                            //Calculate header height if header appears
                            if ($('.header-appear, .edgtf-fixed-wrapper').length) {
                                headerHeight = $('.header-appear, .edgtf-fixed-wrapper').height();
                            }
                            info.stop().animate({
                                marginTop: (edgtf.scroll - infoHolderOffset + edgtfGlobalVars.vars.edgtfAddForAdminBar + headerHeight + 20) //20 px is for styling, spacing between header and info holder
                            });
                            //Reset header height
                            headerHeight = 0;
                        }
                        else{
                            info.stop().animate({
                                marginTop: mediaHolderHeight - infoHolderHeight
                            });
                        }
                    } else {
                        info.stop().animate({
                            marginTop: 0
                        });
                    }
                }
            }
        };

        return {

            init : function() {

                infoHolderPosition();
                $(window).scroll(function(){
                    recalculateInfoHolderPosition();
                });

            }

        };

    };

    /**
     * Init Portfolio Single Masonry
     */
    function edgtfPortfolioSingleMasonry(){
        var gallery = $('.edgtf-portfolio-single-holder.small-masonry .edgtf-portfolio-media, .edgtf-portfolio-single-holder.big-masonry .edgtf-portfolio-media');

        if(gallery.length) {
            gallery.each(function () {
                var thisGallery = $(this);
                thisGallery.waitForImages(function () {
                    var size = thisGallery.find('.edgtf-single-masonry-grid-sizer').width();
                    edgtfPortfolioSingleResizeMasonry(size,thisGallery);
                    edgtfInitSingleMasonry(thisGallery);

                });
                $(window).resize(function(){
                    var size = thisGallery.find('.edgtf-single-masonry-grid-sizer').width();
                    edgtfPortfolioSingleResizeMasonry(size,thisGallery);
                    edgtfInitSingleMasonry(thisGallery);
                });
            });
        }
    }

    function edgtfInitSingleMasonry(container){
        container.animate({opacity: 1});
        container.isotope({
            layoutMode: 'packery',
            itemSelector: '.edgtf-portfolio-single-media',
            packery: {
                columnWidth: '.edgtf-single-masonry-grid-sizer'
            }
        });
    }


    function edgtfPortfolioSingleResizeMasonry(size,container){

        var defaultMasonryItem = container.find('.edgtf-default-masonry-item');
        var largeWidthMasonryItem = container.find('.edgtf-large-width-masonry-item');
        var largeHeightMasonryItem = container.find('.edgtf-large-height-masonry-item');
        var largeWidthHeightMasonryItem = container.find('.edgtf-large-width-height-masonry-item');

        defaultMasonryItem.css('height', size);
        largeHeightMasonryItem.css('height', Math.round(2*size));

        if(edgtf.windowWidth > 600){
            largeWidthHeightMasonryItem.css('height', Math.round(2*size));
            largeWidthMasonryItem.css('height', size);
        }else{
            largeWidthHeightMasonryItem.css('height', size);
            largeWidthMasonryItem.css('height', Math.round(size));
            largeHeightMasonryItem.css('height', Math.round(size));
        }
    }

})(jQuery);