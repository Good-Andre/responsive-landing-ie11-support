$(function () {
  // menu burger

  $('.menu__burger').click(function () {
    $('.menu__burger,.header__menu-body').toggleClass('_active');
    if (!$('._overlay').hasClass('_overlay-show')) {
      $('._overlay').addClass('_overlay-show');
    } else {
      $('._overlay').removeClass('_overlay-show');
    }

    if ($('.menu__burger').hasClass('_active')) {

      $(document).bind('mousewheel DOMMouseScroll', function () {
        stopWheel();
      });
      $('.scroll-up').removeClass('scroll-up--show');
    } else {
      $(document).unbind('mousewheel DOMMouseScroll');
      if ($(document).scrollTop() > 700) {
        $('.scroll-up').addClass('scroll-up--show');
      }
    }
  });

  $('._overlay').on('click', function () {
    deleteActiveClass();
    if ($(document).scrollTop() > 700) {
      $('.scroll-up').addClass('scroll-up--show');
    }
  });

  // smooth scrolling (for ie-11 support)

  let $page = $('html, body');
  $('a[href*="#"]').click(function () {
    $page.animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      400
    );
    return false;
  });

  $(window).resize(function () {
    if ($(window).width() > 750) {
      deleteActiveClass();
    }
    // 750
    if ($(window).width() <= 750) {
      $('.header__menu-link').bind('click', scrollTopFixMenu);
    } else {
      $('.header__menu-link').bind('click', function (e) {
        $page.stop().animate(
          {
            scrollTop: $($.attr(this, 'href')).offset().top,
          },
          400
        );
        e.preventDefault();
      });
    }
  });

  // when appears menu FIXED

  function scrollTopFixMenu(e) {
    $page.stop().animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top - 64,
      },
      400
    );
    e.preventDefault();
  }

  $('.header__menu-link').on('click', deleteActiveClass);

  function deleteActiveClass() {
    $('.menu__burger,.header__menu-body').removeClass('_active');
    $('._overlay').removeClass('_overlay-show');
    $(document).unbind('mousewheel DOMMouseScroll');
  }

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

  // section about tabs

  $('.tab-trigger').click(function () {
    let id = $(this).attr('data-tab'), // 1
      content = $('.tab-content[data-tab="' + id + '"]');
    $('.tab-trigger._active-tab').removeClass('_active-tab');
    $(this).addClass('_active-tab');
    $('.tab-content._active-tab').removeClass('_active-tab');
    content.addClass('_active-tab');
  });

  // PAGE PROGRESS

  let win = $(window);
  let doc = $(document);

  win.scroll(function () {
    scrollProgress();
  });

  function scrollProgress() {
    let winScroll = doc.scrollTop() || doc.scrollTop();
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
  }

  // SLICK SLIDER

  $('.team__slider').slick({
    dots: true,
    customPaging: function (slider, i) {
      return `<div class="team-dots">
      <div class="team-dots__item">
      </div>
    </div>`;
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $('.testimonials__slider').slick({
    dots: true,
    customPaging: function (slider, i) {
      return `<div class="testimonials-dots">
      <div class="testimonials-dots__item">
      </div>
    </div>`;
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $('.overlay-map__button').click(function () {
    $('.overlay-map').addClass('_overlay-hide');
  });

  // Scroll Up button

  $(document).scroll(function () {
    if (!$('.menu__burger').hasClass('_active')) {
      if ($(document).scrollTop() > 700) {
        $('.scroll-up').addClass('scroll-up--show');
      } else if ($(document).scrollTop() < 700) {
        $('.scroll-up').removeClass('scroll-up--show');
      }
    }
  });

  $(window).resize();
});
