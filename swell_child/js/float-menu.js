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
    
    // SP誤タップ防止: ヒーロー直下まではメニューをパッシブ化
    const SP_MAX = 767;
    const isSP = () => window.matchMedia && window.matchMedia(`(max-width: ${SP_MAX}px)`).matches;
    
    // ヒーローの下端（今回はNEWS開始位置）より上ならパッシブにする
    const updatePassiveState = () => {
      if (!isSP()) {
        menu.classList.remove('is-passive');
        return;
      }
      const news = document.querySelector('#news');
      const y = window.scrollY;
      // NEWSのy位置が取れない場合は閾値で代替
      const threshold = 320; // ヒーロー高が未特定のため安全側の閾値
      if (news) {
        const newsTop = news.getBoundingClientRect().top + window.scrollY;
        // NEWSセクション到達前はパッシブ（タップ透過）
        if (y + 40 < newsTop) {
          menu.classList.add('is-passive');
        } else {
          menu.classList.remove('is-passive');
        }
      } else {
        // NEWSが無いページでは少しスクロールするまでパッシブ
        if (y < threshold) menu.classList.add('is-passive');
        else menu.classList.remove('is-passive');
      }
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
          updatePassiveState();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // 初回チェック（遅延実行）
    setTimeout(() => {
      updateMenuVisibility();
      updatePassiveState();
    }, 100);

    // リサイズ時もSP/PC切替に追随
    window.addEventListener('resize', () => {
      updatePassiveState();
    }, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
