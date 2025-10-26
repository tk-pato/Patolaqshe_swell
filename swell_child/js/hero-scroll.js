/**
 * Hero Scroll Button - SP専用スムーススクロール（修正版）
 * PC表示には影響なし
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
    if (!intro) return;
    
    // SWELL標準のメインビジュアルボタン（全可能性をカバー）
    const selectors = [
      '#main_visual a',
      '.p-mainVisual a',
      '.swl-mainvisual a',
      'div[id*="main"]div[id*="visual"] a',
      'header ~ main a[href*="hotpepper"]',
      'a[href*="beauty.hotpepper"]',
      'body > a[href*="hotpepper"]',
      'a.c-btn[href*="hotpepper"]',
      'button[onclick*="hotpepper"]'
    ];
    
    let targetLink = null;
    
    for (let selector of selectors) {
      targetLink = document.querySelector(selector);
      if (targetLink && targetLink.href && targetLink.href.indexOf('hotpepper') > -1) {
        break;
      }
    }
    
    if (!targetLink) {
      return;
    }
    
    // クローン＆置換で既存イベントを完全削除
    const newLink = targetLink.cloneNode(true);
    targetLink.parentNode.replaceChild(newLink, targetLink);
    
    // 新しいclick ハンドラを設定
    newLink.onclick = null;
    newLink.href = '#intro';
    newLink.removeAttribute('target');
    newLink.removeAttribute('rel');
    newLink.removeAttribute('data-onclick');
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
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
