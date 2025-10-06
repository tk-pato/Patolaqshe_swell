/**
 * BLOG セクション - 自動スクロール制御
 */
(function() {
  'use strict';
  
  const track = document.querySelector('.ptl-blog__track');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.ptl-blog__card'));
  const cardCount = cards.length;

  if (cardCount <= 4) {
    // 4枚以下：中央配置、静止
    track.classList.add('is-static');
    track.classList.remove('is-animated');
  } else {
    // 5枚以上：無限スクロール
    track.classList.add('is-animated');
    track.classList.remove('is-static');
    // カードを複製して無限ループ
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }
})();
