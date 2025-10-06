(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  // Reduce Motion 環境では無効化
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm && rm.matches) return;

  // 🔴 固定背景モードではパララックス無効化
  // data-parallax="bg" 属性がない要素は処理しない
  var hasBgParallax = document.querySelector('.ptl-infohub[data-parallax="bg"]');
  if (!hasBgParallax) return;

  // セクション情報のキャッシュ（速度・クランプ・ターゲット要素など）
  var items = [];
  var ticking = false;

  function collect() {
    items = [];
    var nodeList = document.querySelectorAll('.ptl-infohub[data-parallax="bg"]');
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
      var tVideo = target || sec.querySelector('.ptl-infohub__video');
      var tImg = (!tVideo && sec.querySelector('.ptl-infohub__image img')) || null;
      var tPic = (!tVideo && !tImg && sec.querySelector('.ptl-infohub__image')) || null;
      var tBg  = (!tVideo && !tImg && !tPic && sec.querySelector('.ptl-infohub__bg')) || null;
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

      // 端見え防止のための拡大率を、必要最小限で自動算出
      // 上下両端で最大移動量をカバーできるよう、2*max / 高さ をベースにマージンを足す
      var needed = (2 * Math.abs(max)) / Math.max(1, rect.height);
      var scale = 1 + Math.min(1.5, needed) + 0.04; // 上限+150%（+4%マージン）
      if (it.minScale && scale < it.minScale) scale = it.minScale;
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
