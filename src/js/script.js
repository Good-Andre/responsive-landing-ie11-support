$(function () {
  // menu burger

  $('.menu__burger').on('click', function () {
    $('.menu__burger,.header__menu-body').toggleClass('_active');
    if (!$('._overlay').hasClass('_overlay-show')) {
      $('._overlay').addClass('_overlay-show');
    } else {
      $('._overlay').removeClass('_overlay-show');
    }
    if ($('.menu__burger').hasClass('_active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  function disableScroll(e){
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    let header = document.querySelector('.header');
    document.body.style.paddingRight = paddingOffset;
    header.style.paddingRight = paddingOffset;
    let pagePosition = window.scrollY;
    document.body.classList.add('_disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
    header.style.top = window.scrollY;
    document.body.classList.add('has-disable');
  }
  
  function enableScroll(e){
    let pagePosition = parseInt(document.body.dataset.position, 10);
    let header = document.querySelector('.header');
    document.body.style.top = 'auto';
    document.body.classList.remove('_disable-scroll');
    document.body.style.paddingRight = '0px';
    header.style.paddingRight = '0px';
    window.scroll({top: pagePosition, left: 0});
    document.body.removeAttribute('data-position');
  }

  function deleteActiveClass() {
    $('.menu__burger,.header__menu-body').removeClass('_active');
    $('._overlay').removeClass('_overlay-show');
  }

  $('._overlay').on('click', function () {
    deleteActiveClass();
    enableScroll();
  });

  // smooth scrolling (for ie-11 support)

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

  $(window).on('resize', function () {
    if ($(window).width() > 750) {
      deleteActiveClass();
      if ($('body').hasClass('has-disable')) {
        enableScroll();
        $('body').removeClass('has-disable');
      }
    }

    if ($(window).width() <= 750) {
      $('.header__menu-link').on('click', scrollTopFixMenu);
    } else {
      $('.header__menu-link').on('click', function (e) {
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

  $('.header__menu-link').on('click', function(){
    deleteActiveClass();
      enableScroll();
  });

  // section about tabs

  $('.tab-trigger').on('click', function () {
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

  win.on('scroll', function () {
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
    customPaging: function () {
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
    customPaging: function () {
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

  $('.blog__slider').slick({
    dots: true,
    customPaging: function () {
      return `<div class="blog-dots">
      <div class="blog-dots__item">
      </div>
    </div>`;
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
    $('.scroll-up').addClass('scroll-up--show');
  }

  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 700) {
      $('.scroll-up').addClass('scroll-up--show');
    } else if ($(document).scrollTop() < 700) {
      $('.scroll-up').removeClass('scroll-up--show');
    }
  });

  // portfolio filter

  let filter = $('[data-filter]');
  filter.on('click', function (event) {
    event.preventDefault();
    let cat = $(this).data('filter');
    if (cat == 'all') {
      $('[data-cat]').removeClass('_hide');
    } else {
      $('[data-cat]').each(function () {
        let workCat = $(this).data('cat');
        if (workCat != cat) {
          $(this).addClass('_hide');
        } else {
          $(this).removeClass('_hide');
        }
      });
    }
  });

  scrollProgress();
});