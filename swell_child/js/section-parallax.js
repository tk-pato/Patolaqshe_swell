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
    var nodeList = document.querySelectorAll('.ptlNavHero[data-parallax="bg"], .ptlIssues[data-parallax="bg"], .ptl-pageNavHero[data-parallax="bg"]');
    console.log('[Parallax] Found sections:', nodeList.length);
    if (!nodeList || !nodeList.length) return;

  for (var i = 0; i < nodeList.length; i++) {
      var sec = nodeList[i];
      // 速度: 0..1（1で追従なし）0.3 = 背景が30%の速度で動く（視差効果最強）
      var speed = parseFloat(sec.getAttribute('data-parallax-speed') || '0.3');
      if (!isFinite(speed)) speed = 0.3;
      speed = Math.max(0, Math.min(1, speed));

      // クランプ率: 0..0.3（端が出ないように最大移動量を抑制）0.25 = セクション高さの25%まで移動
      var clampRatio = parseFloat(sec.getAttribute('data-parallax-clamp') || '0.25');
      if (!isFinite(clampRatio)) clampRatio = 0.25;
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
      var tVideo = target || sec.querySelector('.ptlNavHero__video, .ptlIssues__video, .ptl-pageNavHero__video');
      var tImg = (!tVideo && sec.querySelector('.ptlNavHero__image img, .ptlIssues__image img, .ptl-pageNavHero__image img')) || null;
      var tPic = (!tVideo && !tImg && sec.querySelector('.ptlNavHero__image, .ptlIssues__image, .ptl-pageNavHero__image')) || null;
      var tBg  = (!tVideo && !tImg && !tPic && sec.querySelector('.ptlNavHero__bg, .ptlIssues__bg, .ptl-pageNavHero__bg')) || null;
      target = tVideo || tImg || tPic || tBg;
      console.log('[Parallax] Section', i, 'target:', target ? target.tagName + '.' + target.className : 'NOT FOUND');
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
  var scale = 1 + needed + 0.30; // 移動量カバー + 30%の安全マージン（最大拡大）
      
      // 最小拡大率を1.5に設定（parallax効果を劇的に）
      if (scale < 1.5) scale = 1.5;
      
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
    console.log('[Parallax] Initializing...');
    collect();
    console.log('[Parallax] Collected', items.length, 'parallax items');
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
