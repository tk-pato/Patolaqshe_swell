/**
 * Hero Scroll Button - SP専用スムーススクロール
 * SP表示時のみホットペッパーリンクを#introスクロールに変更
 */

(function(){
  'use strict';
  
  function init() {
    // SP判定(767px以下)
    if (window.innerWidth > 767) return;
    
    const intro = document.getElementById('intro');
    if (!intro) return;
    
    // ヒーロー内の全リンク取得
    const hero = document.querySelector('.p-mainVisual');
    if (!hero) return;
    
    const links = hero.querySelectorAll('a');
    
    links.forEach(function(link) {
      // ホットペッパーリンクの場合
      if (link.href && link.href.indexOf('hotpepper') > -1) {
        link.href = '#intro';
        link.target = '';
        link.rel = '';
        
        link.onclick = function(e) {
          e.preventDefault();
          // Get the absolute position of the intro element from the top of the document
          var introBoundingRect = intro.getBoundingClientRect();
          var currentScrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          var introAbsoluteTop = introBoundingRect.top + currentScrollPosition;
          
          window.scrollTo({
            top: introAbsoluteTop,
            behavior: 'smooth'
          });
          return false;
        };
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  window.addEventListener('load', init);
})();
