$(document).ready(function() {
    setActiveMenu();
    setActiveTab();
    setCareerActiveTab();
    setActiveSideMenu();
    initSlick();
    initSmoothScroll();
    initAnoutUsCheck();
    initCareerMenu();
    initSidebarMenu();
    $('#iran-job-carousel').carousel({
        interval: 2000
    })
    $('#career-sadaf-carousel')
    .on('slide.bs.carousel', function () {
        var $ul = $('#career-sadaf-carousel .carousel-indicators'),
        $li = $ul.find('li.active'),
        index = parseInt($li.attr('data-slide-to'));

        $ul.find('li').removeClass('big');


        $ul.find('li:eq('+(index-1)+')').addClass('big');
        $ul.find('li:eq('+(index)+')').addClass('big');
        $ul.find('li:eq('+(index+2)+')').addClass('big');
        $ul.find('li:eq('+(index+3)+')').addClass('big');
    })
    .on('slid.bs.carousel', function () {
        handleCarouselPoints();
    });
    $('#career-sadaf-carousel .carousel-indicators li').on('click', function(){
       setTimeout(function(){handleCarouselPoints();},100);
   });
});


function handleCarouselPoints(){
    var $ul = $('#career-sadaf-carousel .carousel-indicators'),
    $li = $ul.find('li.active'),
    index = parseInt($li.attr('data-slide-to'));

    $ul.find('li').removeClass('big');


    $ul.find('li:eq('+(index-2)+')').addClass('big');
    $ul.find('li:eq('+(index-1)+')').addClass('big');
    $ul.find('li:eq('+(index+1)+')').addClass('big');
    $ul.find('li:eq('+(index+2)+')').addClass('big');

}
function setActiveMenu() {
    var $m = $('.navbar li.nav-item');
    $m.removeClass('active');
    var link = '';
    if (/\/careers\//.test(window.location.pathname)) {
        link = 'career';
    } else if (/\/about-us\//.test(window.location.pathname)) {
        link = 'about-us';
    } else if (/\/events\//.test(window.location.pathname)) {
        link = 'events';
    } else if (/\//.test(window.location.pathname)) {
        link = 'home';
    }

    if (link !== '') {
        $m.find('a.nav-link#' + link).parent('.nav-item').addClass('active');
    }
};

function initSlick() {
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
        // infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

function setCareerActiveTab() {
        var hash = window.location.hash;
        hash && $('ul.nav a[href="' + hash + '"]').tab('show');

        $('.careers-details a').on('click', function (e) {
            $(this).tab('show');
            var scrollmem = $('body').scrollTop();
            window.location.hash = this.hash;
            $('html,body').scrollTop(scrollmem);
        });
};

function setActiveTab() {
    $('#team-members-tab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    })
    $('ul.nav-pills a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
};

function setActiveSideMenu() {
    var $m = $('.sidemenu-list li');
    $m.removeClass('active');
    $m.find('a[href$="' + window.location.hash + '"]').parent('li').addClass('active');
};

function initSmoothScroll() {
    $('body').bind('scroll', function(e) {
        $('.section').each(function() {
            var id = $(this).attr('id').replace(/^#!?/, '');
            if (window.location.hash.includes(id)) return;
            if (
                $(this).offset().top < window.pageYOffset + 50
                && $(this).offset().top + $(this).height() > window.pageYOffset
            ) {
                // prevent page jump on url hash change
                if (history.pushState) {
                    history.pushState(null, null, `#${id}`);
                } else {
                    location.hash = `#${id}`;
                }
                setActiveSideMenu();
            }
        });
    });

    $('.sidemenu-list li a').click(function(e) {
        e.stopPropagation();
        var sectionTo = $(this).attr('id').replace('-link', '');
        $('html, body').animate({
            scrollTop: $('#' + sectionTo).offset().top - 25
        }, 500);
    });
};

function initAnoutUsCheck(){

    $('#amazing-products-link').on('click', function(){
        setTimeout(function(){
            $(window).scrollTop(0);
        }, 300);
    });

    if (window.location.hash === '#amazing-products') {
        setTimeout(function(){
            $(window).scrollTop(0);
        }, 300);
    }
}

function initCareerMenu(){
    $('[data-menu="careers"]').on('click', function(){
        $(this).toggleClass('active');
    });
}
function initSidebarMenu(){
    $('[data-close="sidebar"]').on('click', function(){
        $('#sidebar-menu').removeClass('active');
        $('body').removeClass('menu-open');
    });
    $('[data-toggle="sidebar"]').on('click', function(){
        $('#sidebar-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });
}