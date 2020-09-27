$(function () {
  let header = document.querySelector('.header');
  let win = $(window);
  let doc = $(document);

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

  function disableScroll() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.paddingRight = paddingOffset;
    header.style.paddingRight = paddingOffset;
    let pagePosition = $(window).scrollTop();
    document.body.classList.add('_disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
    header.style.top = $(window).scrollTop();
    document.body.classList.add('has-disable');
  }

  function enableScroll() {
    let pagePosition = parseInt($('body').attr('data-position'), 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('_disable-scroll');
    document.body.style.paddingRight = '0px';
    header.style.paddingRight = '0px';
    $("html, body").scrollTop( pagePosition );
    document.body.removeAttribute('data-position');
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

  let $page = $('html, body');
  $('a[href*="#"]').on('click', function () {
    $page.animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      400
    );
    return false;
  });

  // Resize event

  win.on('resize', function () {
    if (win.width() > 750) {
      if (!$('body').hasClass('has-disable')) {
        deleteActiveClass();
      }
    }

    if (win.width() > 767) {
      if ($('body').hasClass('has-disable')) {
        enableScroll();
        $('body').removeClass('has-disable');
      }
    }

    if (win.width() <= 750) {
      $('.menu-header__link').on('click', scrollTopFixMenu);
    } else {
      $('.menu-header__link').on('click', function (e) {
        $page.stop().animate(
          {
            scrollTop: $($.attr(this, 'href')).offset().top,
          },
          400
        );
        e.preventDefault();
      });
    }

    // Circle Progress Bar

    // if (win.width() <= 463) {
    //   $('.item-progress__round').circleProgress({ size: 70 });
    // } else {
    //   $('.item-progress__round').circleProgress({ size: 124 });
    // }
  });

  // when menu FIXED

  function scrollTopFixMenu(e) {
    $page.stop().animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top - 64,
      },
      400
    );
    e.preventDefault();
  }

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
    $('.right-services._active-tab').removeClass('_active-tab');
    contentRight.addClass('_active-tab');
  });

  // Circle progress bar

  // function Circlle(el) {
  //   $(el)
  //     .circleProgress({
  //       fill: { color: '#1EB596' },
  //       reverse: true,
  //       startAngle: 29.86,
  //     })
  //     .on('circle-animation-progress', function (event, progress, stepValue) {
  //       $(this)
  //         .find('.item-progress__round-val')
  //         .text(String(stepValue.toFixed(2)).substr(2));
  //       $(this).find('.item-progress__round-percent').text('%');
  //     });
  // }

  // Circlle('.item-progress__round');

  // let leftServicesButton = document.querySelectorAll(
  //   '.left-services__buttons-item'
  // );

  // for (let i = 0; i < leftServicesButton.length; i++) {
  //   let item = leftServicesButton[i];

  //   item.addEventListener('click', function () {
  //     Circlle('.item-progress__round');
  //   });
  // }

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

  $('.slider-team__toggle-button').on('click', function () {
    $('.slider-team__right-block').toggleClass('button-toggle');

    if ($('.slider-team__right-block').hasClass('button-toggle')) {
      $('.slider-team__toggle-button').text('Hide info ▲');
      let dn = $('#team').offset().top + 240;
      $('html, body').animate(
        {
          scrollTop: dn,
        },
        400
      );
    } else {
      $('.slider-team__toggle-button').text('Show info ▼');

      let dn = $('#team').offset().top - 64;
      $('html, body').animate(
        {
          scrollTop: dn,
        },
        400
      );
    }
  });

  scrollProgress();
});
