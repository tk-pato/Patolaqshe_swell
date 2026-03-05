/**
 * ヒーロー動画フォールバック v3
 *
 * 問題: SWELLは <source data-src-pc="..."> を JS で src に変換してから
 *       video.load() を呼ぶ。autoplay属性があってもブラウザが再生しない
 *       ケースがある（タブ非アクティブ、ページ読み込みタイミング等）。
 *
 * 解決: MutationObserver で source[src] が設定された瞬間に play() を呼ぶ。
 *       SWELLのJS と競合しない（上書きではなく「確認後に再生」）。
 */
(function () {
  'use strict';

  function tryPlay(video) {
    if (!video || !video.paused) return;
    // src が設定されているか確認
    var source = video.querySelector('source');
    var hasSrc = (source && source.getAttribute('src')) || video.getAttribute('src');
    if (!hasSrc) return;

    video.play().catch(function () {});
  }

  function init() {
    var video = document.querySelector('.p-mainVisual__video');
    if (!video) return;

    var source = video.querySelector('source');
    if (!source) return;

    // すでに src がある場合はすぐ試行
    if (source.getAttribute('src')) {
      tryPlay(video);
      return;
    }

    // MutationObserver: SWELL が src を設定するのを待つ
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'src') {
          observer.disconnect();
          // SWELL の video.load() が終わるのを少し待ってから play()
          setTimeout(function () { tryPlay(video); }, 100);
          return;
        }
      }
    });
    observer.observe(source, { attributes: true, attributeFilter: ['src'] });

    // フォールバック: 2秒後に SWELL が変換済みなら再生試行
    setTimeout(function () {
      observer.disconnect();
      tryPlay(video);
    }, 2000);
  }

  // bfcache（ブラウザ戻るボタン）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var video = document.querySelector('.p-mainVisual__video');
      if (video) video.play().catch(function () {});
    }
  });

  // visibilitychange（バックグラウンドタブ→フォアグラウンド）
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      var video = document.querySelector('.p-mainVisual__video');
      tryPlay(video);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
