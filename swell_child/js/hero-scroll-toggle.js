/**
 * Hero Scroll Button Toggle
 * 最上部でのみScrollボタンを表示、スクロールしたら非表示
 * クリック時にイントロセクションへスクロール
 */
(function() {
  'use strict';
  
  const scrollBtn = document.querySelector('.p-mainVisual__scroll');
  if (!scrollBtn) return;
  
  let ticking = false;
  
  function toggleScrollButton() {
    // スクロール位置が10px以下なら表示、それ以外は非表示
    if (window.scrollY <= 10) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
      scrollBtn.style.pointerEvents = 'none';
    }
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(toggleScrollButton);
      ticking = true;
    }
  }
  
  // Scrollボタンクリック時にイントロセクションへスクロール
  scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const introSection = document.getElementById('intro');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  // 初期状態を設定
  scrollBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  toggleScrollButton();
  
  // スクロールイベントを監視
  window.addEventListener('scroll', requestTick, { passive: true });
})();
