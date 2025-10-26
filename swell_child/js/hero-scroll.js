/**
 * Hero Scroll Button - SP専用スムーススクロール
 * PC表示には影響なし
 * 
 * @package SWELL_CHILD
 * @since 1.0.0
 */

(function() {
  'use strict';
  
  console.log('=== HERO SCROLL JS LOADED ===');
  
  // ウィンドウ幅が767px以下の場合のみ実行(SP)
  function initHeroScroll() {
    console.log('Window width:', window.innerWidth);
    
    // SP判定(767px以下)
    if (window.innerWidth > 767) {
      console.log('PC mode - skip hero scroll modification');
      return; // PCの場合は何もしない
    }
    
    console.log('SP mode - modifying hero scroll button');
    
    // INTROセクションの存在確認
    const introSection = document.getElementById('intro');
    
    if (!introSection) {
      console.error('INTRO section (#intro) not found');
      return;
    }
    
    console.log('INTRO section found:', introSection);
    
    // ヒーロー内の全てのリンクとボタンを取得
    const heroSection = document.querySelector('.p-mainVisual');
    if (!heroSection) {
      console.error('Hero section (.p-mainVisual) not found');
      return;
    }
    
    console.log('Hero section found:', heroSection);
    
    // ホットペッパーへのリンクを全て取得
    const hotpepperLinks = heroSection.querySelectorAll('a[href*="hotpepper"]');
    
    console.log('Hotpepper links found:', hotpepperLinks.length);
    
    if (hotpepperLinks.length === 0) {
      console.warn('No hotpepper links found - trying all links');
      // 全てのリンクを取得して確認
      const allLinks = heroSection.querySelectorAll('a');
      console.log('All links in hero:', allLinks.length);
      allLinks.forEach(function(link, index) {
        console.log('Link', index, ':', link.href, link.className);
      });
      return;
    }
    
    // 全てのホットペッパーリンクを#introスクロールに変更
    hotpepperLinks.forEach(function(link, index) {
      console.log('Processing link', index, ':', link.href);
      
      // 元のリンクを削除
      const originalHref = link.href;
      link.href = '#intro';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.removeAttribute('data-onclick');
      link.removeAttribute('onclick');
      
      // 新しいクリックイベントを設定
      link.addEventListener('click', function(e) {
        console.log('Hero button clicked!');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // INTROセクションへスムーススクロール
        console.log('Scrolling to INTRO at:', introSection.offsetTop);
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
      
      console.log('✓ Converted:', originalHref, '→ #intro');
    });
    
    console.log('=== HERO SCROLL MODIFICATION COMPLETE ===');
  }
  
  // ページ読み込み完了後に実行
  if (document.readyState === 'loading') {
    console.log('Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    console.log('DOM already loaded, executing now');
    initHeroScroll();
  }
  
  // 遅延読み込み対応
  setTimeout(function() {
    console.log('Retry after 1s...');
    initHeroScroll();
  }, 1000);
  
  setTimeout(function() {
    console.log('Retry after 2s...');
    initHeroScroll();
  }, 2000);
  
})();
