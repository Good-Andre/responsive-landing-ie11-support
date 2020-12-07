$(function () {
  let header = document.querySelector('.header');
  let win = $(window);
  let doc = $(document);
  let $page = $('html, body');

  // Menu burger

  $('.menu-header__burger').on('click', function () {
    $('.menu-header__burger,.menu-header__body').toggleClass('_active');
    if (!$('._overlay').hasClass('_overlay-show')) {
      $('._overlay').addClass('_overlay-show');
    } else {
      $('._overlay').removeClass('_overlay-show');
    }
    if ($('.menu-header__burger').hasClass('_active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  // Disable/Enable Scroll for Fix Menu

  function disableScroll() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.paddingRight = paddingOffset;
    header.style.paddingRight = paddingOffset;
    let pagePosition = win.scrollTop();
    document.body.classList.add('_disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
    header.style.top = win.scrollTop();
    document.body.classList.add('has-disable');
    console.log(win.scrollTop());
  }

  function enableScroll() {
    let pagePosition = parseInt($('body').attr('data-position'), 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('_disable-scroll');
    document.body.style.paddingRight = '0px';
    header.style.paddingRight = '0px';
    $page.scrollTop(pagePosition);
    document.body.removeAttribute('data-position');
    console.log(win.scrollTop());
  }

  function deleteActiveClass() {
    $('.menu-header__burger,.menu-header__body').removeClass('_active');
    $('._overlay').removeClass('_overlay-show');
  }

  $('._overlay').on('click', function () {
    deleteActiveClass();
    enableScroll();
  });

  // Smooth scrolling (for ie-11 support)

  $('a[href*="#"]').on('click', function () {
      $page.animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top,
        },
        400
      );
      return false;
  });

  // when menu FIXED --------------

  function scrollTopFixMenu(e) {
    $page.stop().animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top - 64,
      },
      400
    );
    e.preventDefault();
  }

  function scrollTopDefault(e) {
    $page.stop().animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      400
    );
    e.preventDefault();
  }

  win.on('load', function () {
    if (win.outerWidth() <= 768) {
      $('.menu-header__link').on('click', scrollTopFixMenu);
    } else {
      $('.menu-header__link').on('click', scrollTopDefault);
    }
  });

 // click Menu links event

  $('.menu-header__link').on('click', function () {
    deleteActiveClass();
    enableScroll();
  });

  // section "ABOUT" tabs
  $('.about__icon-item').on('click', function () {
    let id = $(this).attr('data-tab'),
      content = $('.bottom-about[data-tab="' + id + '"]');
    $('.about__icon-item._active-tab').removeClass('_active-tab');
    $(this).addClass('_active-tab');
    $('.bottom-about._active-tab').removeClass('_active-tab');
    content.addClass('_active-tab');
    content.addClass('_fade');
  });

  // section "SERVICES" tabs

  $('.left-services__buttons-item').on('click', function () {
    let id = $(this).attr('data-tab'),
      contentLeft = $('.item-description[data-tab="' + id + '"]'),
      contentRight = $('.right-services[data-tab="' + id + '"]');
    $('.left-services__buttons-item._active-tab').removeClass('_active-tab');
    $(this).addClass('_active-tab');
    $('.item-description._active-tab').removeClass('_active-tab');
    contentLeft.addClass('_active-tab');
    contentLeft.addClass('_fade');
    $('.right-services._active-tab').removeClass('_active-tab');
    contentRight.addClass('_active-tab');
  });

  // Resize events

  win.on('resize', function () {

    if (win.outerWidth() > 768) {
      $('.menu-header__burger,.menu-header__body').removeClass('_active');
      $('._overlay').removeClass('_overlay-show');
    }

    if (win.outerWidth() > 768) {
      if ($('body').hasClass('has-disable')) {
        enableScroll();
        $('body').removeClass('has-disable');
      }
    }

    if (win.outerWidth() <= 768) {
      $('.menu-header__link').on('click', scrollTopFixMenu);

    } else {
      $('.menu-header__link').on('click', scrollTopDefault);
      $('.portfolio__slider').slick('unslick');
    }

  });

  // Circle Progress Bar -----------------

  let sizeBarFlag;

  win.on('resize', function () {
    if (win.outerWidth() <= 480 && sizeBarFlag == false) {
      $('.item-progress__round').circleProgress({
        size: 70,
        emptyFill: '#00676A',
        thickness: 3,
        animation: false
      });
      sizeBarFlag = true;
    }

    if (win.outerWidth() > 480 && sizeBarFlag == true) {
      $('.item-progress__round').circleProgress({
        size: 124,
        emptyFill: 'rgba(0, 0, 0, 0.1)',
        thickness: 4,
        animation: false
      });
      sizeBarFlag = false;
    }
  });

  function Circlle(el) {
    $(el)
      .circleProgress({
        fill: { color: '#1EB596' },
        reverse: true,
        startAngle: 29.86,
        animation: { duration: 1400, easing: "circleProgressEasing" }
      })
      .on('circle-animation-progress', function (event, progress, stepValue) {
        $(this)
          .find('.item-progress__round-val')
          .text(String(stepValue.toFixed(2)).substr(2));
        $(this).find('.item-progress__round-percent').text('%');
      });
  }

  // запуск при scrollTop position ПЕРЕДЕЛАТЬ
  function runCircleProgress() {
    Circlle('.item-progress__round');
  }

  runCircleProgress();

  if (win.outerWidth() <= 480) {
    $('.item-progress__round').circleProgress({ size: 70,
      emptyFill: '#00676A',
      thickness: 3,
     });
    sizeBarFlag = true;
  }

  if (win.outerWidth() > 480) {
    sizeBarFlag = false;
  }

  // Event on Services buttons --------------------

  $('.left-services__buttons-item').each(function(){
    $(this).on('click', runCircleProgress);
  });

  // PAGE PROGRESS -----------------------

  win.on('scroll', function () {
    scrollProgress();
  });

  function scrollProgress() {
    let winScroll = doc.scrollTop() || doc.scrollTop();
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector('.progress__bar').style.width = scrolled + '%';
  }

  // SLICK SLIDER

  $('.team__slider').slick({
    dots: true,
    customPaging: function () {
      return (
        '<div class="team-dots">' +
        '<div class="team-dots__item">' +
        '</div>' +
        '</div>'
      );
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $('.testimonials__slider').slick({
    dots: true,
    customPaging: function () {
      return (
        '<div class="testimonials-dots">' +
        '<div class="testimonials-dots__item">' +
        '</div>' +
        '</div>'
      );
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $('.blog__slider').slick({
    dots: true,
    customPaging: function () {
      return (
        '<div class="blog-dots">' +
        '<div class="blog-dots__item">' +
        '</div>' +
        '</div>'
      );
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $('.overlay-map__button').on('click', function () {
    $('.overlay-map').addClass('_overlay-hide');
  });

  // Scroll Up button

  if ($(document).scrollTop() > 700) {
    $('._scroll-up').addClass('_scroll-up--show');
  }

  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 700) {
      $('._scroll-up').addClass('_scroll-up--show');
    } else if ($(document).scrollTop() < 700) {
      $('._scroll-up').removeClass('_scroll-up--show');
    }
  });

  // Portfolio filter

  let filter = $('[data-filter]');
  filter.on('click', function (event) {
    event.preventDefault();
    let cat = $(this).data('filter');

    if (cat == 'all') {
      $('[data-cat]').removeClass('hide-work');
    } else {
      $('[data-cat]').each(function () {
        let workCat = $(this).data('cat');

        if (workCat != cat) {
          $(this).addClass('hide-work');
        } else {
          $(this).removeClass('hide-work');
        }
      });
    }
  });

  // Team slider button

  $('.slide-inner__toggle-button').on('click', function () {
    $('.slide-inner__right-block').toggleClass('button-toggle');

    if ($('.slide-inner__right-block').hasClass('button-toggle')) {
      $('.slide-inner__toggle-button').text('Hide info ▲');
      let position = $('#team').offset().top + 240;
      $page.animate(
        {
          scrollTop: position,
        },
        400
      );
    } else {
      $('.slide-inner__toggle-button').text('Show info ▼');

      let position = $('#team').offset().top - 64;
      $page.animate(
        {
          scrollTop: position,
        },
        400
      );
    }
  });

  scrollProgress();
});
