/**
 * フローティングメニュー - 表示制御
 */
(function() {
  'use strict';

  const init = () => {
    const menu = document.querySelector('.ptl-float-menu');
    if (!menu) return;

    // 少しスクロールしたらフェードイン
    let isVisible = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      
      if (scrollY > 200 && !isVisible) {
        menu.classList.add('is-visible');
        isVisible = true;
      } else if (scrollY <= 200 && isVisible) {
        menu.classList.remove('is-visible');
        isVisible = false;
      }
    };

    // スクロールイベント（throttle処理）
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 初回チェック
    handleScroll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
