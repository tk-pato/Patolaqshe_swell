/**
 * ヒーロー動画フォールバック v6
 *
 * 重要: SWELL の set_mv.min.js が src設定・load()・play() を行う。
 * Safari ではこれが失敗することがある。
 * 本スクリプトは SWELL の処理を邪魔せず、
 * 「再生されていなければ play() だけ呼ぶ」最小限の補完に徹する。
 * video.load() は絶対に呼ばない（SWELL の処理をリセットするため）。
 */
(function () {
  'use strict';

  function safariPlay(video) {
    if (!video) return;
    // Safari 向け: JS プロパティで muted を確認・設定
    video.muted = true;
    if (!video.paused) return; // すでに再生中なら何もしない
    video.play().catch(function () {});
  }

  function init() {
    var video = document.querySelector('.p-mainVisual__video');
    if (!video) return;

    // Safari 向け: muted を JS プロパティでも設定（属性だけでは効かない場合がある）
    video.muted = true;

    // SWELL の play() 完了後に念のため確認（500ms・1500ms・3000ms）
    // ※ load() は呼ばない
    [500, 1500, 3000].forEach(function (delay) {
      setTimeout(function () { safariPlay(video); }, delay);
    });
  }

  // bfcache（ブラウザの戻るボタン）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var video = document.querySelector('.p-mainVisual__video');
      if (video) { video.muted = true; video.play().catch(function () {}); }
    }
  });

  // visibilitychange（バックグラウンドタブ → 前面に戻った）
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      var video = document.querySelector('.p-mainVisual__video');
      if (video && video.paused) safariPlay(video);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
