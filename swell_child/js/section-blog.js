/**
 * BLOG セクション - 自動スクロール制御
 */
(function() {
  'use strict';
  
  const track = document.querySelector('.ptl-blog__track');
  if (!track) return;
  
  const cards = Array.from(track.querySelectorAll('.ptl-blog__card'));
  const cardCount = cards.length;
  
  // 5記事以上の場合のみアニメーション有効
  if (cardCount >= 5) {
    track.classList.add('is-animated');
    
    // 無限ループのためカードを複製
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  } else {
    // 4記事以下は中央固定表示
    track.classList.add('is-static');
  }
})();
