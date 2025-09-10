/**
 * パララックス効果のリファクタリング・強化版（デバッグ用コメント付き）
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  // Reduce Motion 環境では無効化
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm && rm.matches) {
    console.log('[PTL] Reduced Motion設定のため、パララックス効果をスキップします');
    return;
  }

  // セクション情報のキャッシュ（速度・クランプ・ターゲット要素など）
  var items = [];
  var ticking = false;
  var initialApplied = false;

  // 要素収集の関数
  function collect() {
    items = [];
    var nodeList = document.querySelectorAll('[data-parallax="bg"]');
    if (!nodeList || !nodeList.length) {
      console.log('[PTL] パララックス対象の要素が見つかりません');
      return;
    }
    console.log('[PTL] パララックス対象要素数: ' + nodeList.length);

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
        try { 
          target = sec.querySelector(attrTarget);
          if (target) console.log('[PTL] ターゲット指定によるパララックス対象: ', attrTarget);
        } catch (e) { /* noop */ }
      }
      
      var tVideo = target || sec.querySelector('video');
      var tImg = (!tVideo && sec.querySelector('img')) || null;
      var tPic = (!tVideo && !tImg && sec.querySelector('picture')) || null;
      var tBg  = (!tVideo && !tImg && !tPic && sec.querySelector('.ptl-pageNavHero__bg')) || null;
      
      target = tVideo || tImg || tPic || tBg;
      
      if (!target) {
        console.log('[PTL] ターゲット要素が見つからないセクションがあります: ', sec);
        continue;
      }

      // 視覚的に動作していることを判別しやすいようにフラグ付け
      sec.setAttribute('data-parallax-active', '1');

      items.push({ 
        sec: sec, 
        target: target, 
        speed: speed, 
        clampRatio: clampRatio, 
        maxDistancePx: maxDistancePx, 
        minScale: minScale, 
        isVideo: !!tVideo 
      });

      // 要素検出時デバッグログ
      console.log('[PTL] パララックス要素検出: ', {
        section: sec,
        target: target,
        speed: speed,
        clamp: clampRatio,
        maxDistance: maxDistancePx,
        minScale: minScale
      });

      // メディアのロード完了後に再収集＆適用（初期サイズ不確定対策）
      if (tVideo) {
        var onVideoReady = function () { 
          console.log('[PTL] ビデオがロード完了しました');
          applyParallax(); 
        };
        tVideo.addEventListener('loadedmetadata', onVideoReady, { once: true });
        tVideo.addEventListener('loadeddata', onVideoReady, { once: true });
        tVideo.addEventListener('canplay', onVideoReady, { once: true });
      } else if (tImg && tImg.complete !== true) {
        tImg.addEventListener('load', function () { 
          console.log('[PTL] 画像がロード完了しました');
          collect(); 
          applyParallax(); 
        }, { once: true });
      }
    }
  }

  // パララックス効果の適用
  function applyParallax(force) {
    if (!items.length) {
      console.log('[PTL] パララックスを適用する要素がありません');
      return;
    }

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
      
      // transform適用
      var transform = 'translate3d(0,' + move.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
      it.target.style.transform = transform;
      it.target.style.willChange = 'transform';
      
      if (force) {
        console.log('[PTL] パララックス強制適用:', {
          move: move.toFixed(2) + 'px',
          scale: scale.toFixed(3),
          target: it.target
        });
      }
    }
    
    ticking = false;
    initialApplied = true;
  }

  // スクロール時のイベントハンドラ
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      applyParallax();
      ticking = false;
    });
  }

  // 初期化とイベントリスナー設定
  function init() {
    collect();
    
    if (items.length > 0) {
      // スクロールイベントのリスナー
      window.addEventListener('scroll', onScroll, { passive: true });
      
      // リサイズ時の再設定
      window.addEventListener('resize', function() {
        collect();
        applyParallax();
      }, { passive: true });
      
      // 初回適用（ページロード時にすでにスクロール位置がある場合）
      applyParallax(true);
      
      // スクロールイベントを強制的に発火させて初期位置を設定
      setTimeout(function() {
        if (!initialApplied) {
          console.log('[PTL] パララックス初期位置を強制適用します');
          window.dispatchEvent(new Event('scroll'));
          applyParallax(true);
        }
      }, 100);
    }
  }

  // DOM読み込み後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
