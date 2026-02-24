/**
 * PTL Unified Parallax Controller
 * section-parallax.js + section-infohub.js を統合
 * [data-parallax="bg"] 属性を持つ全セクションに対応
 *
 * @version 1.0.0
 * @date 2026-02-24
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm && rm.matches) return;

  var items = [];
  var ticking = false;

  function collect() {
    items = [];
    var nodeList = document.querySelectorAll('[data-parallax="bg"]');
    if (!nodeList || !nodeList.length) return;

    for (var i = 0; i < nodeList.length; i++) {
      var sec = nodeList[i];

      var speed = parseFloat(sec.getAttribute('data-parallax-speed') || '0.6');
      if (!isFinite(speed)) speed = 0.6;
      speed = Math.max(0, Math.min(1, speed));

      var clampRatio = parseFloat(sec.getAttribute('data-parallax-clamp') || '0.18');
      if (!isFinite(clampRatio)) clampRatio = 0.18;
      clampRatio = Math.max(0, Math.min(0.3, clampRatio));

      var maxDistancePx = parseFloat(sec.getAttribute('data-parallax-distance') || '');
      if (!isFinite(maxDistancePx)) maxDistancePx = null;

      var minScale = parseFloat(sec.getAttribute('data-parallax-scale') || '');
      if (!isFinite(minScale) || minScale <= 1) minScale = null;

      // ターゲット特定：data-parallax-target > video > img > picture > bgコンテナ
      var attrTarget = sec.getAttribute('data-parallax-target');
      var target = null;
      if (attrTarget) {
        try { target = sec.querySelector(attrTarget); } catch (e) {}
      }
      if (!target) {
        // video autoplay
        target = sec.querySelector('video[autoplay]');
      }
      if (!target) {
        // picture内img
        var img = sec.querySelector('picture img');
        if (img) target = img;
      }
      if (!target) {
        // pictureコンテナ
        target = sec.querySelector('picture');
      }
      if (!target) {
        // __bg クラスを持つ直下要素
        var children = sec.children;
        for (var j = 0; j < children.length; j++) {
          if (children[j].className && children[j].className.indexOf('__bg') !== -1) {
            target = children[j];
            break;
          }
        }
      }
      if (!target) continue;

      var isVideo = target.tagName === 'VIDEO';
      sec.setAttribute('data-parallax-active', '1');

      items.push({
        sec: sec, target: target, speed: speed,
        clampRatio: clampRatio, maxDistancePx: maxDistancePx,
        minScale: minScale, isVideo: isVideo
      });

      if (isVideo) {
        var onReady = function () { applyParallax(); };
        target.addEventListener('loadedmetadata', onReady, { once: true });
        target.addEventListener('loadeddata', onReady, { once: true });
        target.addEventListener('canplay', onReady, { once: true });
      } else if (target.tagName === 'IMG' && target.complete !== true) {
        target.addEventListener('load', function () { collect(); applyParallax(); }, { once: true });
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
      var dy = scrollY - secTop;

      var move = -dy * (1 - it.speed);

      var max = (it.maxDistancePx && it.maxDistancePx > 0) ? it.maxDistancePx : (rect.height * it.clampRatio);
      if (move > max) move = max;
      if (move < -max) move = -max;

      var needed = (2 * Math.abs(max)) / Math.max(1, rect.height);
      var scale = 1 + Math.min(1.5, needed) + 0.04;
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
    applyParallax();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { collect(); onScroll(); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); onScroll(); });
  } else {
    init(); onScroll();
  }

  window.addEventListener('load', function () { collect(); applyParallax(); }, { once: true });
})();
