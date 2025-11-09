/** -----------
* Common 
----------- **/
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(EasePack);
const hasHover = window.matchMedia("(hover: hover)").matches;
const hasHoverTop = window.matchMedia("(hover: hover)").matches;

$(window).on('load', function(){
  $('body').removeClass('js-fade');
});
$(function() {
  // 内部リンクのみを対象とする
  $('a:not([href^="#"]):not([target]):not([href^="http"]):not([href^="mailto:"]):not([href*="/news/"])').on('click', function(e){
    e.preventDefault();
    const url = $(this).attr('href');
    
    // URLが空でない、かつ同じドメイン内のリンクの場合のみ遷移アニメーションを実行
    if (url && url !== '') {
      try {
        const urlObj = new URL(url, window.location.origin);
        if (urlObj.origin === window.location.origin) {
          $('body').addClass('js-fade');
          setTimeout(function(){
            window.location = url;
          }, 300);
        } else {
          window.location = url;
        }
      } catch(e) {
        // 相対パスの場合はそのまま遷移アニメーションを実行
        $('body').addClass('js-fade');
        setTimeout(function(){
          window.location = url;
        }, 300);
      }
    }
    return false;
  });
});

//safari対策
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    document.body.classList.remove('js-fade');
    var lNavSp = document.querySelector('.l-nav_sp');
    if (lNavSp) {
      lNavSp.style.display = 'none';
      document.body.classList.remove('js-menu_open');
    }
  }
});

window.addEventListener('DOMContentLoaded', function() {
  // 共通の機能は常に実行
  sp_menu();
  pageSplitTtl();
  splitLinks();
  footimgTargets();
  salonModal_slider();
  salonModals();
  //last 
  imgParallax();
  //salon
  salon_img();
  salon_hover();
  //service
  service_border();
  servise_list();
  //top
  top_fv();
  top_service();
  top_circle();
  //top_about();
  top_service_hover();
  top_salonslide();
  top_header();
});

//sp_menu
function sp_menu () {
  jQuery(document).on('click', '.js-menu', function() {
    $('.l-nav_sp').fadeToggle();
    $('.l-nav_bg').fadeToggle();
    $('body').toggleClass('js-menu_open');
  });
  jQuery(document).on('click', '.l-nav_bg', function() {
    $('.l-nav_sp').fadeOut();
    $('.l-nav_bg').fadeOut();
    $('body').removeClass('js-menu_open');
  });
  jQuery(document).on('click', '.c_nav-list a', function() {
    $('.l-nav_sp').fadeOut();
    $('.l-nav_bg').fadeOut();
    $('body').removeClass('js-menu_open');
  });
}

//pageSplitTtl
function pageSplitTtl () {
  var splitElements = document.querySelectorAll('.js-split');
  splitElements.forEach(function(element) {
      var text = element.innerText;
      var splitText = text.split('').map(function(char) {
          return '<span class="js-split_move">' + char + '</span>';
      });
      element.innerHTML = splitText.join('');
      element.classList.add('js-done');
  });
  gsap.to(".js-split_move", {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: 0.5,
    ease: "power3.out",
    opacity:1,
  });
}

//splitLinks
function splitLinks () {
  //split
  let splitTarget = document.querySelectorAll('.js-splitlink');
  splitTarget.forEach((target) => {
    newText = '';
    spanText = target.innerHTML;
    spanText.split('').forEach((char) => {
        newText += '<span>' + char + '</span>';
    });
    newTextBefore = "<div class='before'>"+newText+"</div>";
    newTextAfter = "<div class='after'>"+newText+"</div>";
    newText = "<span class='text-wrap'>"+newTextBefore + newTextAfter+"</span>";
    target.innerHTML = newText;
  });
  if(hasHover) {
    //hover move
    splitTarget.forEach((target)=>{
      let beforeSpan = target.querySelector('.before').querySelectorAll('span');
      let afterSpan = target.querySelector('.after').querySelectorAll('span');
      target.addEventListener('mouseenter',()=>{
          gsap.to(beforeSpan,{y:'-100%',stagger:.03,ease: "power3.out"})
          gsap.to(afterSpan,{y:'0%',stagger:.03,ease: "power3.out"})
      })
      target.addEventListener('mouseleave',()=>{
          gsap.to(beforeSpan,{y:'0%',stagger:.03,ease:"power3.out"})
          gsap.to(afterSpan,{y:'100%',stagger:.03,ease: "power3.out"})
      })
    })
  }
}

//imgParallax
function imgParallax() {
  if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
    //parallax
    gsap.utils.toArray('.js-parallax').forEach(wrap => {
      const y = wrap.getAttribute('data-y') || -50;
      gsap.to(wrap, {
        y: y,
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          ease: "power1.out",
        }
      })
    });
  }
}


// footimgTargets
function footimgTargets() {
  let footimgTargets = document.querySelectorAll('.js-footimg');

  if (hasHover) {
    footimgTargets.forEach((footTarget) => {
      let footimg = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0,
          stagger: 0,
        },
      });
      footimg.to(footTarget.querySelector(".js-footimg_bg"), {
        backgroundColor: "#fff",
        scale: 1,
        opacity: 1,
      }, "start");

      footimg.to(footTarget.querySelector(".js-footimg_wrap"), {
        opacity: 0,
        scale: 1.5,
      }, "start");

      footimg.to(footTarget.querySelector(".c-img"), {
        clipPath: "inset(5%)",
      }, "start");

      footimg.to(footTarget.querySelector(".c-img img"), {
        scale: 1.2,
      }, "start");

      footTarget.addEventListener('mouseenter', () => {
        footimg.play();
      });

      footTarget.addEventListener('mouseleave', () => {
        footimg.reverse();
      });
    });
  }
}

// salon_hover
function salon_hover() {
  let salon_hovers = document.querySelectorAll('.js-salon_hover');
  if (hasHover) {
    salon_hovers.forEach((salonTarget) => {
      let salonimage = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0,
          stagger: 0,
          scale: 1,
        },
      });
      salonimage.to(salonTarget.querySelector(".c-salon_img"), {
        clipPath: "inset(5%)",
      }, "start");

      salonimage.to(salonTarget.querySelector(".c-salon_img img"), {
        scale: 1.2,
      }, "start");

      salonTarget.addEventListener('mouseenter', () => {
        salonimage.play();
      });

      salonTarget.addEventListener('mouseleave', () => {
        salonimage.reverse();
      });
    });
  }
}


//salonModal_slider
function salonModal_slider() {
  const sliders = document.querySelectorAll(".js-modal_slider");

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll(".swiper-slide");

    if (slides.length <= 1) {
      // 1枚しかない場合
      return;
    } else {
      // 2枚以上ある場合
      const salonModal = new Swiper(slider, {
        loop: true,
        effect: 'fade',
        watchOverflow: true,
        pagination: {
          el: slider.querySelector(".js-salon-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: slider.querySelector(".js-salon-button-next"),
          prevEl: slider.querySelector(".js-salon-button-prev"),
        },
      });
    }
  });
}

//salonModals
function salonModals () {
  const modalBtns = document.querySelectorAll(".js-modal_btn");
  modalBtns.forEach(function (btn) {
    btn.onclick = function () {
      var modal = btn.getAttribute('data-modal');
      var modalElement = document.getElementById(modal);
      modalElement.closest('.js-modal_wrap').classList.add("js-modalitem_open");
      document.body.classList.add("js-modal_open");
    };
  });
  const closeBtns = document.querySelectorAll(".js-modal_close");

  closeBtns.forEach(function (btn) {
    btn.onclick = function () {
      var modal = btn.closest('.js-modal_wrap');
      modal.classList.remove("js-modalitem_open");
      document.body.classList.remove("js-modal_open");
    };
  });

  window.onclick = function (event) {
    if (event.target.className === "js-modal_item") {
      event.target.closest('.js-modal_wrap').classList.remove("js-modalitem_open");
      document.body.classList.remove("js-modal_open");
    }
  };
};


/** -----------
* salon
----------- **/
function salon_img () {
  gsap.utils.toArray('.js-fadeinimg').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        end: 'bottom top',
        toggleActions: 'play none none none',
        once: true, // 一度だけ実行する
      },
    });
  });
  
  // スクロールトリガーでのクラスの付与
  ScrollTrigger.batch('.js-fadeinimg', {
    onEnter: batch => {
      batch.forEach(element => {
        element.classList.add('js-show');
      });
    },
    once: true, // 一度だけ実行する
  });
};

/** -----------
* service
----------- **/
function service_border () {
  gsap.utils.toArray('.js-border').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        end: 'bottom top',
        toggleActions: 'play none none none',
        once: true, // 一度だけ実行する
      },
    });
  });
  // スクロールトリガーでのクラスの付与
  ScrollTrigger.batch('.js-border', {
    onEnter: batch => {
      batch.forEach(element => {
        element.classList.add('js-show');
      });
    },
    once: true, // 一度だけ実行する
  });
};

function servise_list () {
  gsap.utils.toArray('.js-servive_item').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom top',
        toggleActions: 'play none none none',
        once: true, // 一度だけ実行する
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
      },
    });
  });
  // スクロールトリガーでのクラスの付与
  ScrollTrigger.batch('.js-servive_item', {
    onEnter: batch => {
      batch.forEach(element => {
        element.classList.add('js-active');
      });
    },
    once: true, // 一度だけ実行する
  });
};


/** -----------
* TOP 
----------- **/
// top_circle
function top_circle() {
  // 既存のアニメーションを停止
  const circles = document.querySelectorAll('.c-circle img');
  const mainCircle = document.querySelector('.c-circle');
  const circleP01 = document.querySelector(".c-circle.p-01");
  const circleP02 = document.querySelector(".c-circle.p-02");

  if (!mainCircle) return;

  circles.forEach(function(circle) {
    setTimeout(function() {
      circle.style.opacity = 1;
    }, 3000);
  });

  const mainRotation = gsap.to(mainCircle, {
    rotate: 360,
    repeat: -1,
    duration: 5,
    ease: "none",
  });

  if (circleP01) {
    const tl01 = gsap.to(circleP01, {
      rotate: 360,
      repeat: -1,
      duration: 10,
      ease: "none",
    });

    circleP01.addEventListener("mouseenter", () => tl01.timeScale(2));
    circleP01.addEventListener("mouseleave", () => tl01.timeScale(1));
  }

  if (circleP02) {
    const tl02 = gsap.to(circleP02, {
      rotate: 360,
      repeat: -1,
      duration: 10,
      ease: "none",
    });

    circleP02.addEventListener("mouseenter", () => tl02.timeScale(2));
    circleP02.addEventListener("mouseleave", () => tl02.timeScale(1));
  }
}


//FV bg
function top_fv() {
  const fvBg = document.querySelector('.js-fv_bg');
  const fvHeight = document.querySelector('.js-fv_height');
  
  if (!fvBg || !fvHeight) return;

  gsap.to(fvBg, {
    scrollTrigger: {
      trigger: fvHeight,
      start: 'top 0',
      end: 'bottom',
      scrub: 0,
      duration: 0,
    },
    ease: "power1.out",
    scale: '1.1',
  });
}

function top_service () {
  $(function() {
    $('.l-service_inner').matchHeight();
  });
};

//service img
function top_service_hover () {
  let imghoverTargets = document.querySelectorAll('.js-imghover');
  if(hasHoverTop) {
    imghoverTargets.forEach((imghoverTarget) => {
      let imghover = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.5,
          ease: "power3.out",
        }
      });
      imghover.addLabel("start").to(imghoverTarget.querySelector(".js-imghover_item"), {
        scale:1.1,
      }, "start");
      imghoverTarget.addEventListener('mouseenter', () => {
        imghover.play();
      });
      imghoverTarget.addEventListener('mouseleave', () => {
        imghover.reverse();
      });
    });
  }
};

//top_salonslide
function top_salonslide() {
  let salonslide = null;
  const salonslideElement = document.querySelector(".js-salonslide");
  
  if (!salonslideElement) return;

  // アニメーションの設定をより効率的に
  const slideAnimation = {
    targets: null,
    scale: [1.2, 1.1], // スケールの範囲を少し縮小
    duration: 10000,    // 時間を短縮
    easing: 'easeOutQuad'
  };

  salonslide = new Swiper(salonslideElement, {
    loop: true,
    allowTouchMove: false,
    effect: 'fade',
    autoplay: {
      delay: 9000,
      disableOnInteraction: false,
    },
    speed: 2000,
    pagination: {
      el: ".js-salon-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".js-salon-button-next",
      prevEl: ".js-salon-button-prev",
    },
    on: {
      init: function () {
        // 最初のスライドの画像にアニメーションを適用
        const firstSlide = this.slides[0];
        const imageElement = firstSlide.querySelector('.c-img');
        anime({
          targets: imageElement,
          scale: [1.4, 1.1],
          duration: 12000,
          easing: 'easeOutQuad',
        });
      },
      transitionStart: function () {
        const currentSlide = this.slides[this.activeIndex];
        const imageElement = currentSlide.querySelector('.c-img');
        anime({
          targets: imageElement,
          scale: [1.4, 1.1],
          duration: 12000,
          easing: 'easeOutQuad',
        });
      },
    },
  });
}

// Swiper初期化
top_salonslide();



// function top_salonslide () {
//   const salonslide = new Swiper(".js-salonslide", {
//     loop: true,
//     effect: 'fade',
//     autoplay: {
//       delay: 9000,
//       disableOnInteraction: false,
//     },
//     speed: 2000,
//     pagination: {
//       el: ".js-salon-pagination",
//       type: "fraction",
//     },
//     navigation: {
//       nextEl: ".js-salon-button-next",
//       prevEl: ".js-salon-button-prev",
//     },
//   });
// };

//top_header
function top_header () {
  var mainWrapElement = document.querySelector('.l-main_wrap');
  var headerElement = document.querySelector('.l-header');
  headerElement.classList.add('js-head_color'); 
  window.addEventListener('scroll', function() {
    if (mainWrapElement && headerElement) {
        var rect = mainWrapElement.getBoundingClientRect();
        if (rect.top <= 0) {
            headerElement.classList.remove('js-head_color');
        } else {
            headerElement.classList.add('js-head_color'); 
        }
    }
  });
};
