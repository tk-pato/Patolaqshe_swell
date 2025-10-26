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
    const heroButton = document.querySelector('.p-mainVisual__scroll');
    
    if (!heroButton) {
      return;
    }
    
    // INTROセクションの存在確認
    const introSection = document.getElementById('intro');
    
    if (!introSection) {
      console.warn('INTRO section (#intro) not found');
      return;
    }
    
    // data-onclick属性を削除（SWELL標準の動作を無効化）
    heroButton.removeAttribute('data-onclick');
    
    // 既存のリンクがある場合は削除
    if (heroButton.tagName === 'A') {
      heroButton.removeAttribute('href');
    }
    
    // ボタンクリック時の動作を設定
    heroButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // INTROセクションへスムーススクロール
      window.scrollTo({
        top: introSection.offsetTop,
        behavior: 'smooth'
      });
      
      // URLハッシュを更新
      setTimeout(function() {
        history.pushState(null, null, '#intro');
      }, 800);
      
      return false;
    }, true); // useCapture = true で最優先
  }
  
  // ページ読み込み完了後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    initHeroScroll();
  }
  
})();
