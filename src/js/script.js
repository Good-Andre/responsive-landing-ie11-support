$(function () {

  $('.menu__burger').click(function () {
    $('.menu__burger,.header__menu-body').toggleClass('_active');
    if (!$('.wrapper').hasClass('_overlay')) {
      $('.wrapper').addClass('_overlay');
    } else {
      $('.wrapper').removeClass('_overlay');
    }
    if ($('.menu__burger').hasClass('_active')) {
      $(document).bind('mousewheel DOMMouseScroll', function () {
        stopWheel();
      });
    } else {
      $(document).unbind('mousewheel DOMMouseScroll');
    }
  });

  $(window).resize(function () {
    if ($(window).width() > 750) {
      deleteActiveClass();
    }
    if ($(window).width() <= 750) {
      $('.header__menu-link').bind("click", scrollTopFixMenu);
    } else {
      $('.header__menu-link').bind("click", function (e) {
        $('html, body').stop().animate({
          scrollTop: $($(this).attr('href')).offset().top
        }, 400);
        e.preventDefault();
      });
    }
  });

  function scrollTopFixMenu(e) {
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 64
    }, 400);
    e.preventDefault();
  };

  $('.header__menu-link').on("click", deleteActiveClass);

  function deleteActiveClass() {
    $('.menu__burger,.header__menu-body').removeClass('_active');
    $('.wrapper').removeClass('_overlay');
    $(document).unbind('mousewheel DOMMouseScroll');
  };

  function stopWheel(e) {
    if (!e) {
      /* IE7, IE8, Chrome, Safari */
      e = window.event;
    }
    if (e.preventDefault) {
      /* Chrome, Safari, Firefox */
      e.preventDefault();
    }
    e.returnValue = false; /* IE7, IE8 */
  }

  // about section tabs
  $('.tab-trigger').click(function () {
    var id = $(this).attr('data-tab'), // 1
      content = $('.tab-content[data-tab="' + id + '"]');
    $('.tab-trigger._active-tab').removeClass('_active-tab');
    $(this).addClass('_active-tab');
    $('.tab-content._active-tab').removeClass('_active-tab');
    content.addClass('_active-tab');
  });

// smooth scrolling for ie11
var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});
  $(window).resize();
});
