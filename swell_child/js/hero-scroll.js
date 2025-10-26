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
    
    // INTROセクションの存在確認
    const introSection = document.getElementById('intro');
    
    if (!introSection) {
      console.warn('INTRO section (#intro) not found');
      return;
    }
    
    // 複数のセレクタでボタンを探す
    const selectors = [
      '.p-mainVisual__scroll',
      '.p-mainVisual a[href*="hotpepper"]',
      '.p-mainVisual button',
      '.p-mainVisual .c-plainBtn',
      'a[href*="hotpepper"][class*="scroll"]'
    ];
    
    let heroButton = null;
    for (let selector of selectors) {
      heroButton = document.querySelector(selector);
      if (heroButton) {
        console.log('Hero button found with selector:', selector);
        break;
      }
    }
    
    if (!heroButton) {
      console.warn('Hero scroll button not found');
      return;
    }
    
    // ホットペッパーリンクを完全に削除
    if (heroButton.tagName === 'A') {
      heroButton.href = '#intro';
    }
    
    // 全ての属性を削除
    heroButton.removeAttribute('data-onclick');
    heroButton.removeAttribute('onclick');
    heroButton.removeAttribute('target');
    heroButton.removeAttribute('rel');
    
    // クリックイベントを完全に上書き
    const newButton = heroButton.cloneNode(true);
    heroButton.parentNode.replaceChild(newButton, heroButton);
    
    // 新しいイベントを設定
    newButton.addEventListener('click', function(e) {
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
    }, true);
  }
  
  // ページ読み込み完了後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    initHeroScroll();
  }
  
  // 遅延読み込み対応
  setTimeout(initHeroScroll, 1000);
  
})();
