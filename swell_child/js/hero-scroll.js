/**
 * Hero Scroll Button - SP専用スムーススクロール
 * SPで全ホットペッパーリンクを#introスムーススクロールに変更
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
    if (!intro) return;
    
    // 全ホットペッパーリンクを取得
    const links = document.querySelectorAll('a[href*="hotpepper"]');
    if (links.length === 0) return;
    
    links.forEach(function(link) {
      // 非表示要素を除外
      if (link.offsetParent === null) return;
      
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
        
        window.scrollTo({
          top: intro.offsetTop,
          behavior: 'smooth'
        });
        
        setTimeout(function() {
          history.pushState(null, null, '#intro');
        }, 800);
        
        return false;
      }, true);
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
