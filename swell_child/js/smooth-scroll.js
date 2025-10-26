/**
 * Patolaqshe Smooth Scroll Implementation
 * Using Lenis for smooth scrolling
 */

(function () {
  'use strict';

  // Lenis が読み込まれるまで待機
  let lenisReady = false;
  let maxRetries = 50;
  let retryCount = 0;

  function initLenis() {
    if (typeof Lenis === 'undefined') {
      if (retryCount < maxRetries) {
        retryCount++;
        console.log('Lenis not loaded yet, retrying... (' + retryCount + '/' + maxRetries + ')');
        setTimeout(initLenis, 100);
      } else {
        console.error('Lenis failed to load after ' + maxRetries + ' retries');
      }
      return;
    }

    lenisReady = true;

    // Reduce Motion チェック
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rm && rm.matches) {
      console.log('Reduced motion detected, using native scroll');
      return;
    }

    // Lenis 初期化
    const lenis = new Lenis({
      duration: 1.2,
      easing: function (t) {
        // easeOutExpo
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      smoothTouch: false, // SP ではネイティブスクロール
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    // Lenis アニメーション ループ
    let currentScroll = 0;
    let targetScroll = 0;
    let isRunning = false;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    console.log('✅ Patolaqshe スムーススクロール初期化完了（Lenis）');

    /**
     * プログラマティックなスクロール（window.scrollTo等）の追従
     * ※ スクロール中は同期を停止（引き戻し防止）
     */
    let lastNativeScroll = currentScroll;
    function checkNativeScroll() {
      // スクロール中は同期しない（重要）
      if (isRunning) return;

      const nativeScroll = window.pageYOffset || 0;

      // 外部からのscrollTo等を検知（閾値を大きく）
      if (Math.abs(nativeScroll - lastNativeScroll) > 50) {
        currentScroll = nativeScroll;
        targetScroll = nativeScroll;
        lastNativeScroll = nativeScroll;
      }
    }

    // Lenis インスタンスの expose
    window.lenisInstance = lenis;

    // アンカーリンク対応
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a[href^="#"]');
      if (!target || !target.hash) return;

      const id = target.hash.slice(1);
      const element = document.getElementById(id);

      if (!element) return;

      e.preventDefault();
      isRunning = true;

      // オフセット（ヘッダーの高さなど）
      const offset = -100;
      const targetY = element.getBoundingClientRect().top + window.scrollY + offset;

      lenis.scrollTo(targetY, {
        duration: 1.2,
        onComplete: function () {
          isRunning = false;
          lastNativeScroll = window.pageYOffset || 0;
        }
      });
    });

    // 外部スクロール検知（アンカーリンク等）
    // 頻度を下げてCPU負荷を軽減
    setInterval(checkNativeScroll, 300);
  }

  // DOM 完全ロード時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    initLenis();
  }

  // 遅延ロード対策
  window.addEventListener('load', initLenis);
})();
