/**
 * Hero Scroll Button - SP専用スムーススクロール
 * PC表示には影響なし
 * 
 * @package SWELL_CHILD
 * @since 1.0.0
 */

(function() {
  'use strict';
  
  // ウィンドウ幅が767px以下の場合のみ実行(SP)
  function initHeroScroll() {
    // SP判定(767px以下)
    if (window.innerWidth > 767) {
      return; // PCの場合は何もしない
    }
    
    // ヒーロー内のボタンを取得
    // SWELLのヒーローボタンは `.p-mainVisual__btn` クラス
    const heroButton = document.querySelector('.p-mainVisual__btn');
    
    if (!heroButton) {
      return; // ボタンが見つからない場合は終了
    }
    
    // INTROセクションの存在確認
    const introSection = document.getElementById('intro');
    
    if (!introSection) {
      console.warn('INTRO section (#intro) not found');
      return;
    }
    
    // ボタンクリック時の動作を上書き
    heroButton.addEventListener('click', function(e) {
      // デフォルトのリンク動作をキャンセル
      e.preventDefault();
      
      // INTROセクションへスムーススクロール
      introSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // スクロール後、URLハッシュを更新(戻るボタン対応)
      setTimeout(function() {
        history.pushState(null, null, '#intro');
      }, 800);
    });
  }
  
  // ページ読み込み完了後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    initHeroScroll();
  }
  
  // リサイズ時に再判定(PC↔SP切替対応)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // ページリロードで再初期化
      location.reload();
    }, 500);
  });
  
})();
