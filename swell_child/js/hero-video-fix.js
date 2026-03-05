/**
 * ヒーロー動画フォールバック v5 - Safari macOS 対応
 *
 * Safari は load() 直後の play() を無視することがある。
 * canplay イベント後に play() を呼ぶことで確実に再生する。
 * また Safari は JS プロパティでの muted 設定も必要。
 */
(function () {
  'use strict';

  var videoEl = null;
  var playAttempted = false;

  function doPlay(video) {
    if (playAttempted) return;
    if (!video || !video.paused) return;
    playAttempted = true;
    video.muted = true;
    video.play().catch(function () {
      playAttempted = false;
      // autoplay blocked → 最初のインタラクションで再試行
      addInteractionFallback(video);
    });
  }

  function addInteractionFallback(video) {
    var events = ['click', 'touchstart', 'scroll', 'keydown'];
    function onInteraction() {
      events.forEach(function (ev) {
        document.removeEventListener(ev, onInteraction, true);
      });
      video.muted = true;
      video.play().catch(function () {});
    }
    events.forEach(function (ev) {
      document.addEventListener(ev, onInteraction, { once: true, capture: true, passive: true });
    });
  }

  function setupVideo(video) {
    if (!video) return;
    videoEl = video;

    // Safari 向け設定
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    // canplay: データが再生可能になったら play()
    video.addEventListener('canplay', function onCanPlay() {
      video.removeEventListener('canplay', onCanPlay);
      doPlay(video);
    }, { once: true });

    // canplaythrough でも試みる（canplay が来ない場合の保険）
    video.addEventListener('canplaythrough', function onCanPlayThrough() {
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      doPlay(video);
    }, { once: true });

    // フォールバック: 2秒後にまだ停止していたら強制 play()
    setTimeout(function () {
      if (video.paused) doPlay(video);
    }, 2000);
  }

  function init() {
    var video = document.querySelector('.p-mainVisual__video');
    if (!video) return;

    var source = video.querySelector('source');
    if (!source) return;

    setupVideo(video);

    if (!source.getAttribute('src')) {
      // SWELL がまだ src を設定していない → MutationObserver で待機
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].attributeName === 'src') {
            observer.disconnect();
            // src が設定されたので load() を確実に呼ぶ
            video.load();
            return; // canplay イベントで play() が呼ばれる
          }
        }
      });
      observer.observe(source, { attributes: true, attributeFilter: ['src'] });
    } else {
      // すでに src 設定済み → load() 呼び直し（canplay を再発火）
      video.load();
    }
  }

  // bfcache（戻るボタン）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      playAttempted = false;
      var video = document.querySelector('.p-mainVisual__video');
      if (video) { video.muted = true; video.play().catch(function(){}); }
    }
  });

  // visibilitychange（タブ切り替え）
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && videoEl && videoEl.paused) {
      playAttempted = false;
      doPlay(videoEl);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
