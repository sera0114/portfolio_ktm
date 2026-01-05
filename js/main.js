// 포폴용 a 링크 막기
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a'); // 가장 가까운 a 태그 찾기
    if (!link) return;

    e.preventDefault(); // 이동 막기
  });
});

$(function () {
  $('header .menu_btn').click(function () {
    $(this).toggleClass('on');
    $('body').toggleClass('hidden');
    $('header .logo, header .util_wrap, header .menu_area').toggleClass('on');

    if ($(this).hasClass('on')) {
      $('.book_badge').animate({
        'opacity': 0
      }, function () {
        $('.book_badge').addClass('on');
      })
    } else {
      $('.book_badge').removeClass('on');
      $('.book_badge').animate({
        'opacity': 1
      });
    }
  });

  //===========================================================================
  //사이드메뉴 애니메이션 on 클래스 추가
    const $gnbLinks  = $('header .gnb a');
    const $aniItems  = $('header .menu_area .ani_area > div');
    const $defaultItem = $aniItems.eq(0); // 첫 번째 div (ani_new)

    function showItemByIndex(idx) {
      $aniItems.stop(true, true).fadeOut().removeClass('on');
      $aniItems.eq(idx).stop(true, true).fadeIn().addClass('on');
    }

    // 기본 div(첫 번째) 보여주기
    function showDefaultItem() {
      $aniItems.stop(true, true).fadeOut().removeClass('on');
      $defaultItem.stop(true, true).fadeIn().addClass('on');
    }

    // 초기 상태
    showDefaultItem();

    // 메뉴 hover / focus
    $gnbLinks.on('mouseenter focus', function () {
      const idx = $(this).parent('li').index();
      showItemByIndex(idx);
    });

    // 메뉴에서 벗어나면 기본으로
    $gnbLinks.on('mouseleave blur', function () {
      showDefaultItem();
    });

  function followBtn() {
    $('.main_video').mousemove(function (e) {
      if ($(window).width() > 1024) {
        $('.main_video .play_btn').addClass('fixed');
        w = $('.main_video .play_btn').outerWidth() / 2;
        h = $('.main_video .play_btn').outerHeight() / 2;

        gsap.to('.main_video .play_btn', {
          x: e.clientX - w,
          y: e.clientY - h,
        })
      }
    })
  }


  //===========================================================================
  function fixedBtn() {
    $('.main_video').mouseleave(function () {
      if ($(window).width() > 1024) {
        $('.main_video .play_btn').removeClass('fixed');

        gsap.to('.main_video .play_btn', {
          x: 0,
          y: 0,
        })
      } else {
        $('.main_video').mouseleave(function () {
          $('.main_video .play_btn').removeClass('fixed');
          gsap.to('.main_video .play_btn', {
            x: '50%',
            y: 'calc(50% - 16vw)',
            xPercent: 50,
          })
        });
      }
    });
  }

  followBtn();
  fixedBtn();

  $(window).resize(function () {
    followBtn()
    fixedBtn();
  });

  $('.main_video .down_btn').click(function () {
    let sc_intro = $('.sc_intro').offset().top;
    $('html, body').animate({
      scrollTop: sc_intro
    }, 500)
  })

  $('section .img_wrap').each(function (index, item) {
    let triggerEl = $(this).parents('section');
    let yVal = $(this).data('y') ? $(this).data('y') : 0;

    gsap.to(
      item, {
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1,
        },
        yPercent: yVal,
      })
  });

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function() {
      gsap.from(
        $('.sc_event .img_area'), {
          scrollTrigger: {
            trigger: $('.sc_event'),
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: $('.sc_event .img_area').data('pc_y'),
        }
      )
    }, 
    
    "(max-width: 1023px)": function() {
      gsap.from(
        $('.sc_event .img_area'), {
          scrollTrigger: {
            trigger: $('.sc_event'),
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: $('.sc_event .img_area').data('mobile_y'),
        }
      )
    }, 
  })

  $('.sc_variety .variety_list a').on('mouseenter focus', function () {
    let idx = $(this).parents('li').index();

    $('.sc_variety .variety_list a').removeClass('on');
    $('.sc_variety .img_wrap .inner, .sc_variety .sub_txt p').removeClass('on');
    $('.sc_variety .img_wrap .inner').eq(idx).addClass('on')
    $('.sc_variety .sub_txt p').eq(idx).addClass('on')
  })

  $('.sc_brand .content img').each(function (index, item) {

    gsap.from(item, {
      scrollTrigger: {
        trigger: $('.sc_brand'),
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
      scale: .5,
    })
  });

  $('.motion_rotate').each(function (index, item) {
    let triggerEl = $(this).parents('section') ? $(this).parents('section') : $(this).parent('footer');
    let rVal = $(this).data('rotation') ? $(this).data('rotation') : 30;

    gsap.to(item, {
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1,
      },
      rotation: rVal,
    })
  });

  $('.motion_sprite').each(function (index, item) {
    let triggerEl = $(this).parents('section');
    let idx = $(this).index();
    let yVal = -idx * $(this).data('y');
    let opc = 0.6 / idx;

    gsap.to(item, {
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        end: '50% top',
        scrub: 1,
      },
      yPercent: yVal,
      opacity: opc,
    })
  });

  $('.sc_brand .brand_list h3 > a').on('mouseenter focus', function () {
    let idx = $(this).parents('li').index();

    if (!$(this).hasClass('on')) {
      $(this).parents('li').siblings().find('a').removeClass('on');
      $(this).addClass('on');
      $('.sc_brand .content > img').eq(idx).siblings('img').removeClass('on').addClass('off');
      $('.sc_brand .content > img').eq(idx).removeClass('off').addClass('on');
    }
  });

})