/**
 * フローティングメニュー - ジェル風アニメーション制御
 * ヘッダー表示タイミングと連動
 */
(function() {
  'use strict';

  const init = () => {
    const menu = document.querySelector('.ptl-float-menu');
    if (!menu) return;

    // シンプルなスクロール判定（200px以上で表示）
    const isHeaderVisible = () => {
      return window.scrollY > 200;
    };
    
    // メニュー表示制御関数
    const updateMenuVisibility = () => {
      if (isHeaderVisible()) {
        menu.classList.add('is-visible');
      } else {
        menu.classList.remove('is-visible');
      }
    };

    // スクロールイベント（throttle処理）
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateMenuVisibility();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // 初回チェック（遅延実行）
    setTimeout(() => {
      updateMenuVisibility();
    }, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
