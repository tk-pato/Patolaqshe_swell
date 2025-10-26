/**
 * Patolaqshe Smooth Scroll - Pure JS Implementation
 * アンカーリンククリック時のスムーズスクロール
 * 既存JS・パララックスに影響なし
 */
(function() {
  'use strict';

  // Reduce Motion対応
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rm && rm.matches) return;

  // アンカーリンククリック時のスムーズスクロール
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link || !link.hash) return;

    var targetId = link.hash.slice(1);
    if (!targetId) return;

    var target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    // スムーズスクロール実行
    var targetY = target.getBoundingClientRect().top + window.pageYOffset - 100;
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    // URL更新（スクロール完了後）
    setTimeout(function() {
      history.pushState(null, null, '#' + targetId);
    }, 600);
  }, false);
})();
