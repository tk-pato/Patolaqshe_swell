/**
 * Hero Scroll Button - SP専用スムーススクロール
 * SPヒーローのスクロールボタンを#introスムーススクロールに変更
 * PC(768px以上)には影響なし
 * 
 * @package SWELL_CHILD
 * @since 1.0.2
 * @updated 2025-10-26
 */

(function() {
  'use strict';
  
  function initHeroScroll() {
    console.log('[HERO] Init called, width:', window.innerWidth);
    
    // SP判定(767px以下)
    if (window.innerWidth > 767) {
      console.log('[HERO] PC detected, skip');
      return;
    }
    
    const intro = document.getElementById('intro');
    if (!intro) {
      console.log('[HERO] #intro not found');
      return;
    }
    console.log('[HERO] #intro found');
    
    // ヒーローのスクロールボタンを特定（全パターン網羅）
    const scrollBtn = document.querySelector('.p-mainVisual__scrollBtn a') ||
                      document.querySelector('.p-mainVisual .c-scrollDown') ||
                      document.querySelector('.swl-mainvisual__scrollBtn a') ||
                      document.querySelector('.p-mainVisual a[href*="#"]') ||
                      document.querySelector('[class*="mainVisual"] [class*="scroll"]') ||
                      document.querySelector('.p-mainVisual__footer a');
    
    if (!scrollBtn) {
      console.log('[HERO] Scroll button not found');
      // 全aタグを確認
      const allLinks = document.querySelectorAll('.p-mainVisual a, [class*="mainVisual"] a');
      console.log('[HERO] All hero links:', allLinks.length);
      allLinks.forEach((link, i) => {
        console.log('[HERO] Link', i, ':', link.className, link.href);
      });
      return;
    }
    console.log('[HERO] Scroll button found:', scrollBtn.className, scrollBtn.href);
    
    // 既存イベント削除用にクローン＆置換
    const newBtn = scrollBtn.cloneNode(true);
    scrollBtn.parentNode.replaceChild(newBtn, scrollBtn);
    
    // href を #intro に変更
    newBtn.href = '#intro';
    newBtn.removeAttribute('target');
    newBtn.removeAttribute('rel');
    
    // click イベント設定
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      window.scrollTo({
        top: intro.offsetTop,
        behavior: 'smooth'
      });
      
      setTimeout(function() {
        history.pushState(null, null, '#intro');
      }, 800);
      
      return false;
    }, true);
  }
  
  // 複数のタイミングで実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    initHeroScroll();
  }
  
  setTimeout(initHeroScroll, 500);
  setTimeout(initHeroScroll, 1500);
  window.addEventListener('load', initHeroScroll);
  
})();
