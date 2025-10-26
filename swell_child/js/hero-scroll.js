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
    
    // ヒーロー内の全てのリンクとボタンを取得
    const heroSection = document.querySelector('.p-mainVisual');
    if (!heroSection) {
      console.warn('Hero section not found');
      return;
    }
    
    // ホットペッパーへのリンクを全て取得
    const hotpepperLinks = heroSection.querySelectorAll('a[href*="hotpepper"]');
    
    if (hotpepperLinks.length === 0) {
      console.warn('No hotpepper links found in hero section');
      return;
    }
    
    console.log('Found', hotpepperLinks.length, 'hotpepper link(s) in hero');
    
    // 全てのホットペッパーリンクを#introスクロールに変更
    hotpepperLinks.forEach(function(link) {
      // 元のリンクを削除
      link.href = '#intro';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.removeAttribute('data-onclick');
      link.removeAttribute('onclick');
      
      // 新しいクリックイベントを設定
      link.addEventListener('click', function(e) {
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
      
      console.log('Hero scroll link converted to #intro');
    });
  }
  
  // ページ読み込み完了後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll);
  } else {
    initHeroScroll();
  }
  
  // 遅延読み込み対応
  setTimeout(initHeroScroll, 1000);
  setTimeout(initHeroScroll, 2000);
  
})();
