/**
 * Hero Scroll Button - SP専用スムーススクロール
 * SPで【ヒーローセクション内】の全ホットペッパーリンクを#introスムーススクロールに変更
 * フローティングメニューは除外
 * PC(768px以上)には影響なし
 * 
 * @package SWELL_CHILD
 * @since 1.0.2
 * @updated 2025-10-26
 */

(function() {
  'use strict';
  
  function initHeroScroll() {
    // SP判定(767px以下)
    if (window.innerWidth > 767) {
      return;
    }
    
    const intro = document.getElementById('intro');
    if (!intro) {
      console.log('[hero-scroll] #intro not found');
      return;
    }
    
    // ヒーローセクション（メインビジュアル）を特定
    const heroSelectors = [
      '#main_visual',
      '.p-mainVisual',
      '.swl-mainvisual',
      'header + .l-mainContent > .p-mainVisual',
      '.l-mainContent > div:first-child'
    ];
    
    let heroSection = null;
    for (let selector of heroSelectors) {
      heroSection = document.querySelector(selector);
      if (heroSection) {
        console.log('[hero-scroll] Hero section found:', selector);
        break;
      }
    }
    
    if (!heroSection) {
      console.log('[hero-scroll] Hero section not found, fallback to body');
      heroSection = document.body;
    }
    
    // ヒーローセクション内の全ホットペッパーリンクを取得（フローティングメニュー除外）
    const links = heroSection.querySelectorAll('a[href*="hotpepper"]:not(.ptl-float-menu a)');
    console.log('[hero-scroll] Found links:', links.length);
    
    if (links.length === 0) return;
    
    links.forEach(function(link, index) {
      // 非表示要素を除外
      if (link.offsetParent === null) {
        console.log('[hero-scroll] Link', index, 'is hidden, skipped');
        return;
      }
      
      console.log('[hero-scroll] Processing link', index, ':', link.href);
      
      // 既存イベント削除用にクローン＆置換
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // href を #intro に変更
      newLink.href = '#intro';
      newLink.removeAttribute('target');
      newLink.removeAttribute('rel');
      newLink.removeAttribute('data-onclick');
      
      // click イベント設定
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        console.log('[hero-scroll] Scrolling to #intro');
        
        window.scrollTo({
          top: intro.offsetTop,
          behavior: 'smooth'
        });
        
        setTimeout(function() {
          history.pushState(null, null, '#intro');
        }, 800);
        
        return false;
      }, true);
      
      console.log('[hero-scroll] Link', index, 'converted to #intro');
    });
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
