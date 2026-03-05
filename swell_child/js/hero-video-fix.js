/**
 * ヒーロー動画フォールバック
 * SWELLの data-src-pc / data-src-sp が変換されない場合、
 * または src が設定済みでも再生されていない場合に対応する
 */
(function () {
  function fixHeroVideo() {
    var video = document.querySelector('.p-mainVisual__video');
    if (!video) return;

    var source = video.querySelector('source');
    if (!source) return;

    var currentSrc = source.getAttribute('src');

    // src未設定 → data-src-pc / data-src-sp から設定
    if (!currentSrc) {
      var isMobile = window.innerWidth < 960;
      var url = isMobile
        ? source.getAttribute('data-src-sp')
        : source.getAttribute('data-src-pc');

      if (url) {
        source.setAttribute('src', url);
        source.setAttribute('type', 'video/mp4');
        video.load();
      }
    }

    // src設定済みでも停止している場合は再生を試みる
    if (video.paused) {
      video.play().catch(function () {});
    }
  }

  // DOMContentLoaded 時
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixHeroVideo);
  } else {
    fixHeroVideo();
  }

  // load 後（SWELLのJS実行後）に再チェック × 3回
  window.addEventListener('load', function () {
    fixHeroVideo();
    setTimeout(fixHeroVideo, 500);
    setTimeout(fixHeroVideo, 1500);
  });

  // bfcache復帰時（ブラウザの戻るボタン）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      fixHeroVideo();
    }
  });

  // visibilitychange: タブが前面に来たとき
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      fixHeroVideo();
    }
  });
})();
