$(function () {

  $('.menu__burger').click(function () {
    $('.menu__burger,.header__menu-body').toggleClass('_active');
    if (!$('.wrapper').hasClass('_overlay')) {
      $('.wrapper').addClass('_overlay');
    } else {
      $('.wrapper').removeClass('_overlay');
    }
    if ($('.menu__burger').hasClass('_active')){
      $(document).bind('mousewheel DOMMouseScroll', function () {
        stopWheel();
      });
    } else {
      $(document).unbind('mousewheel DOMMouseScroll');
    }
  });

  $(window).resize(function () {
    if ($(window).width() > 750) {
      $('.menu__burger,.header__menu-body').removeClass('_active');
      $('.wrapper').removeClass('_overlay');
      $(document).unbind('mousewheel DOMMouseScroll');
    }
  });

  $(window).resize();

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
  
});
