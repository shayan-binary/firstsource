$(document).ready(function() {
    setActiveMenu();
    setActiveTab();
    setCareerActiveTab();
    setActiveSideMenu();
    initSlick();
    initSmoothScroll();
});

function setActiveMenu() {
    var $m = $('.navbar li.nav-item');
    $m.removeClass('active');
    var link = '';
    if (/\/careers\//.test(window.location.pathname)) {
        link = 'career';
    } else if (/\/about-us\//.test(window.location.pathname)) {
        link = 'about-us';
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
    $(document).bind('scroll', function(e) {
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