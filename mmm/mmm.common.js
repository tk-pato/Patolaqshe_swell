jQuery(function ($) {
  let topBtn = $('#gototop');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  $('.f_follow .open_modal').click(function () {
    $('.line_modal').fadeIn();
    return false;
  });
	
// Retina
	if (window.devicePixelRatio > 1.24) {
		$('img.retina').each(function() {
			$(this).attr('src',
			$(this).attr('src').replace(/(\.)(png|jpg|gif)/gi,'@2x$1$2'));
		});
	}
	
$(function(){
	$('.modal').modaal();
	});

  $('.popup-modal .close').click(function () {
    $('.popup-modal').fadeOut();
    $('body').removeClass('show-modal');
    return false;
  });



  if ($('.top_main').length > 0) {
    $('#header').addClass('home');
    $(document).ready(function () {
      if ($(window).scrollTop() > 0) {
        location.href = location.href;
      }
    });
  }

  $('.h_menu').click(function () {
    if ($('body').hasClass('open')) {
      $('body').removeClass('open');
      $('#toggle_menu').fadeOut();
    }
    else {
      $('body').addClass('open');
      $('#toggle_menu').fadeIn();
    }
  });
  $('#toggle_menu a').click(function () {
    $('body').removeClass('open');
    $('#toggle_menu').fadeOut();
  });

  $('.voice_case .more').click(function () {
    $('.voice_case').addClass('open');
    return false;
  });

  $('.column_news .more').click(function () {
    $('.column_news').addClass('open');
    return false;
  });

  if ($('.column_slide').length > 0) {
    $('.column_slide ul').slick({
      autoplay: false,
      infinite: true,
      fade: true,
      cssEase: 'linear',
      dots: true,
      arrows: true,
      pauseOnHover: false,
    });
  }

  if ($('.about_voice').length > 0) {
    $('.about_voice ul').slick({
      autoplay: false,
      infinite: true,
      fade: true,
      cssEase: 'linear',
      dots: false,
      arrows: true,
      pauseOnHover: false,
    });
  }


  if ($('.salon_lead .slide').length > 0) {
    $('.salon_lead .slide ul').slick({
      infinite: true,
      slidesToShow: 1,
      variableWidth: true,
      centerMode: true,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false,
    });
  }


  $('a[href^="#"]').click(function () {
    const speed = 500;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });

  let run = true;
  if (!run) {
    $('.evt').css('visibility', 'visible');
  }
  else {
    setMotion = function (name) {
      let setElm = $(name), delayHeight = 150;
      setElm.each(function () {
        let setThis = $(this);
        if (setThis.hasClass('done')) return;
        let elmTop = setThis.offset().top,
          elmHeight = setThis.height(),
          scrTop = $(window).scrollTop(),
          winHeight = window.innerHeight ? window.innerHeight : $(window).height();
        let dh = delayHeight;
        if (setThis.data('dh') != undefined) {
          dh = setThis.data('dh');
          if (isNaN(dh) && dh.indexOf('/') > -1) {
            dh = winHeight / Number(dh.substring(1));
          }
        }
        if (scrTop > elmTop - winHeight + dh && scrTop < elmTop + elmHeight) {
          setThis.addClass('done');
          let delay = setThis.data('delay');
          if (!delay) delay = 0;
          delay = delay * 1000;
          if (delay > 0) {
            setTimeout(function (obj) {
              $(obj).css('visibility', 'visible');
              $(obj).addClass($(obj).data('anim') + ' animated');
            }, setThis.data('delay') * 1000, setThis);
          }
          else {
            setThis.css('visibility', 'visible');
            setThis.addClass(setThis.data('anim') + ' animated');
          }
        }
      });
    }
    function doMotion() {
      setMotion('.evt');
    }
    $(document).ready(doMotion);
    $(window).on('scroll resize', doMotion);
  }




});

function switchImage() {
  $('.u_switch_img').each(function () {
    if (!$(this).attr('src')) return;
    let src = $(this).attr('src');
    let index = src.lastIndexOf('.');
    let path = src.substring(0, index);
    let ext = src.substring(index);
    if (path.substring(index - 3) == '_sp') {
      path = path.substring(0, index - 3);
    }
    if (isPc()) {
      path = path + ext;
    }
    else {
      path = path + "_sp" + ext;
    }
    if (src != path) {
      $(this).attr("src", path);
    }
  });
}

function isPc() {
  return $('.u_visible_sp').css('display') == 'none';
}

$(document).ready(function () {
  $('body').prepend('<div class="u_visible_sp"></div>');
});

$(document).ready(switchImage);
$(window).resize(switchImage);