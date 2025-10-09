/**
 * BLOG セクション - 自動スクロール制御（スムーズな無限ループ）
 */
(function() {
  'use strict';

  const init = () => {
    const track = document.querySelector('.ptl-blog__track');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.ptl-blog__item'));
    const itemCount = items.length;

    if (itemCount >= 5) {
      // 元のアイテムセットを3回複製（合計4セット = 元 + 複製3）
      // これにより十分な長さを確保し、シームレスなループを実現
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < 3; i++) {
        items.forEach(item => {
          fragment.appendChild(item.cloneNode(true));
        });
      }
      
      track.appendChild(fragment);
      track.classList.add('is-animated');

    } else {
      // 5件未満は静的表示
      track.classList.add('is-static');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
