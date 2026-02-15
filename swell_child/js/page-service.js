// Patolaqshe 各所サービスページ - JS（動画背景 + nicescroll + Swiper）
// =====================================================
// 動画背景挿入（PC・SP共通・iOS対応）
// =====================================================
(function() {
  if (document.getElementById('bg-video-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'bg-video-wrapper';
  wrapper.className = 'fixed-video-background';

  const video = document.createElement('video');
  video.id = 'bg-video';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  const source = document.createElement('source');
  source.src = 'https://patolaqshe.com/wp-content/uploads/2026/01/corse-bg.mp4';
  source.type = 'video/mp4';

  video.appendChild(source);
  wrapper.appendChild(video);

  video.addEventListener('loadedmetadata', function() {
    video.play().catch(function(error) {
      console.log('Video autoplay prevented:', error);
    });
  });

  if (document.body) {
    document.body.insertBefore(wrapper, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.insertBefore(wrapper, document.body.firstChild);
    });
  }
})();

// =====================================================
// Nicescroll初期化（PC専用）
// =====================================================
(function() {

    if (window.innerWidth < 768) {
        return;
    }

    function loadJQuery(callback) {
        if (typeof jQuery !== 'undefined') {
            callback();
            return;
        }

        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    function loadNicescroll() {
        loadJQuery(function() {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js';
            script.onload = function() {
                initNicescroll();
            };
            document.head.appendChild(script);
        });
    }

    function initNicescroll() {
        jQuery(document).ready(function($) {
            $("html").niceScroll({
                cursorcolor: "transparent",
                cursorwidth: "0px",
                cursorborder: "none",
                scrollspeed: 100,
                mousescrollstep: 50,
                smoothscroll: true,
                hwacceleration: true,
                autohidemode: false,
                background: "transparent",
                railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
                zindex: 999,
                horizrailenabled: false,
                preservenativescrolling: false,
                cursordragontouch: false,
                enablemousewheel: true,
                enablekeyboard: true,
                bouncescroll: false,
                spacebarenabled: true,
                railoffset: false,
                enabletranslate3d: true,
                enablescrollonselection: true
            });

            console.log('Nicescroll initialized');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNicescroll);
    } else {
        loadNicescroll();
    }

})();

// =====================================================
// Swiper初期化（SP版のみ / 自動再生対応）
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    const initProcess = () => {
        if (window.innerWidth < 768) {
            initSwiper();
        } else {
            // PC版ではSwiper関連のクラスを除去（表示崩れ防止）
            const postList = document.querySelector('.p-postList, .c-postList');
            if (postList) postList.classList.remove('swiper');
        }
    };

    initProcess();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initProcess, 250);
    });
});

// 遅延読み込み画像を強制的に即時読み込みする
function forceLoadImages(container) {
    var imgs = container.querySelectorAll('img[data-src], img.lazyload');
    imgs.forEach(function(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
        }
        img.classList.remove('lazyload');
        img.classList.add('lazyloaded');
    });
}

function initSwiper() {
    // ターゲット取得
    const postList = document.querySelector('.p-postList, .c-postList, .wp-block-post-template');
    if (!postList || postList.classList.contains('swiper-initialized')) return;

    // 0. Swiper初期化前に全画像を強制読み込み（クローン元を確実にする）
    forceLoadImages(postList);

    // 1. Swiperコンテナの準備
    postList.classList.add('swiper');

    // 2. ラッパー（swiper-wrapper）が未作成の場合のみ作成
    let wrapper = postList.querySelector('.swiper-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'swiper-wrapper';

        const items = postList.querySelectorAll('.p-postList__item, .c-postList__item, .wp-block-post');
        items.forEach(item => {
            item.classList.add('swiper-slide');
            wrapper.appendChild(item);
        });
        postList.appendChild(wrapper);
    }

    // 3. ページネーションの準備
    if (!postList.querySelector('.swiper-pagination')) {
        const pagination = document.createElement('div');
        pagination.className = 'swiper-pagination';
        postList.appendChild(pagination);
    }

    // 4. Swiper初期化（クローン画像も修正するコールバック付き）
    new Swiper(postList, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 40,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: postList.querySelector('.swiper-pagination'),
            clickable: true,
        },
        on: {
            init: function() {
                // Swiper がクローンを作った直後にクローン画像を修正
                forceLoadImages(postList);
            },
            loopFix: function() {
                // ループ補正時にもクローン画像を再修正
                forceLoadImages(postList);
            }
        }
    });
}

