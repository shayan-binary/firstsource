$(function() {
    setActiveMenu();
});

function setActiveMenu() {
    var $m = $('#nav-content li.nav-item');
    $m.removeClass('active');
    $m.find('a.nav-link[href$="' + window.location.href.toLowerCase().replace(/\/$/, '') + '"]').parent('.nav-item').addClass('active');
}
