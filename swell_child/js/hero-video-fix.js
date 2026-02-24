/**
 * ヒーロー動画フォールバック
 * SWELLの data-src-pc / data-src-sp が変換されない場合に
 * 確実に video source を設定する
 */
(function () {
  function fixHeroVideo() {
    var video = document.querySelector('.p-mainVisual__video');
    if (!video) return;

    var source = video.querySelector('source');
    if (!source) return;

    // 既にsrcが設定済みならスキップ
    if (source.getAttribute('src')) return;

    var isMobile = window.innerWidth < 960;
    var url = isMobile
      ? source.getAttribute('data-src-sp')
      : source.getAttribute('data-src-pc');

    if (url) {
      source.setAttribute('src', url);
      source.setAttribute('type', 'video/mp4');
      video.load();
      video.play().catch(function () {});
    }
  }

  // DOMContentLoaded時
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixHeroVideo);
  } else {
    fixHeroVideo();
  }

  // bfcache復帰時（ブラウザの戻るボタン）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      fixHeroVideo();
    }
  });

  // SWELLのJS実行後にも再チェック（500ms後）
  window.addEventListener('load', function () {
    setTimeout(fixHeroVideo, 500);
  });
})();
