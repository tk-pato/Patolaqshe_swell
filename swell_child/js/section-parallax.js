(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  // Reduce Motion 環境では無効化
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm && rm.matches) return;

  // セクション情報のキャッシュ（速度・クランプ・ターゲット要素など）
  var items = [];
  var ticking = false;

  function collect() {
    items = [];
    var nodeList = document.querySelectorAll('.ptl-pageNavHero[data-parallax="bg"], .ptlIssues[data-parallax="bg"], .ptlNavHero[data-parallax="bg"]');
    if (!nodeList || !nodeList.length) return;

  for (var i = 0; i < nodeList.length; i++) {
      var sec = nodeList[i];
      // 速度: 0..1（1で追従なし）
      var speed = parseFloat(sec.getAttribute('data-parallax-speed') || '0.6');
      if (!isFinite(speed)) speed = 0.6;
      speed = Math.max(0, Math.min(1, speed));

      // クランプ率: 0..0.3（端が出ないように最大移動量を抑制）
      var clampRatio = parseFloat(sec.getAttribute('data-parallax-clamp') || '0.12');
      if (!isFinite(clampRatio)) clampRatio = 0.12;
      clampRatio = Math.max(0, Math.min(0.3, clampRatio));

  // 絶対最大移動量（px）で上書き可能（例: data-parallax-distance="120"）
      var maxDistancePx = parseFloat(sec.getAttribute('data-parallax-distance') || '');
      if (!isFinite(maxDistancePx)) maxDistancePx = null;

  // 最小拡大率を指定可能（例: data-parallax-scale="1.4"）
  var minScale = parseFloat(sec.getAttribute('data-parallax-scale') || '');
  if (!isFinite(minScale) || minScale <= 1) minScale = null;

      // ターゲット特定：data-parallax-target > video > img > picture > 背景コンテナ
      var attrTarget = sec.getAttribute('data-parallax-target');
      var target = null;
      if (attrTarget) {
        try { target = sec.querySelector(attrTarget); } catch (e) { /* noop */ }
      }
      var tVideo = target || sec.querySelector('.ptl-pageNavHero__video, .ptlIssues__video, .ptlNavHero__video');
      var tImg = (!tVideo && sec.querySelector('.ptl-pageNavHero__image img, .ptlIssues__image img, .ptlNavHero__image img')) || null;
      var tPic = (!tVideo && !tImg && sec.querySelector('.ptl-pageNavHero__image, .ptlIssues__image, .ptlNavHero__image')) || null;
      var tBg  = (!tVideo && !tImg && !tPic && sec.querySelector('.ptl-pageNavHero__bg, .ptlIssues__bg, .ptlNavHero__bg')) || null;
      target = tVideo || tImg || tPic || tBg;
      if (!target) continue;

      // 視覚的に動作していることを判別しやすいようにフラグ付け
      sec.setAttribute('data-parallax-active', '1');

  items.push({ sec: sec, target: target, speed: speed, clampRatio: clampRatio, maxDistancePx: maxDistancePx, minScale: minScale, isVideo: !!tVideo });

      // メディアのロード完了後に再収集＆適用（初期サイズ不確定対策）
  if (tVideo) {
        var onVideoReady = function () { applyParallax(); };
        tVideo.addEventListener('loadedmetadata', onVideoReady, { once: true });
        tVideo.addEventListener('loadeddata', onVideoReady, { once: true });
        tVideo.addEventListener('canplay', onVideoReady, { once: true });
      } else if (tImg && tImg.complete !== true) {
        tImg.addEventListener('load', function () { collect(); applyParallax(); }, { once: true });
      }
    }
  }

  function applyParallax() {
    if (!items.length) return;

    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var rect = it.sec.getBoundingClientRect();
      var secTop = scrollY + rect.top;
      var dy = scrollY - secTop; // セクション先頭からのスクロール量

      // 背景は前景より遅く動く: translate = -dy * (1 - speed)
      var move = -dy * (1 - it.speed);

  // 最大移動量をセクション高さの一定割合、もしくは絶対値指定で制限
  var max = (it.maxDistancePx && it.maxDistancePx > 0) ? it.maxDistancePx : (rect.height * it.clampRatio);
      if (move > max) move = max;
      if (move < -max) move = -max;

  // 端見え防止のための拡大率を算出
  // parallax移動量を完全にカバーするために、十分な拡大率を確保
  var needed = (2 * Math.abs(max)) / Math.max(1, rect.height);
  var scale = 1 + needed + 0.18; // 移動量カバー + 18%の安全マージン
      
      // 最小拡大率を1.35に設定（parallax効果に必要な最低限の拡大）
      if (scale < 1.35) scale = 1.35;
      
      // data-parallax-scale属性の指定値を最優先で適用
      if (it.minScale && it.minScale > scale) scale = it.minScale;
      
      // 過度な拡大を防ぐため上限を2.5に設定
      if (scale > 2.5) scale = 2.5;
      it.target.style.transform = 'translate3d(0,' + move.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
      it.target.style.willChange = 'transform';
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      applyParallax();
      ticking = false;
    });
  }

  function init() {
    collect();
    // 初回適用（ロード直後に一度動かしておく）
    applyParallax();
  }

  // 監視設定
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { collect(); onScroll(); });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); onScroll(); });
  } else {
    init(); onScroll();
  }

  // windowロード後（遅延リソースやフォント読み込み後）にも最終反映
  window.addEventListener('load', function () { collect(); applyParallax(); }, { once: true });
})();
