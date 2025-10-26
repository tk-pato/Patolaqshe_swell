/**
 * BLOG セクション - 自動スクロール制御（スムーズな無限ループ）
 */
(function() {
  'use strict';

  const init = () => {
    const track = document.querySelector('.ptlBlog__track');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.ptlBlog__item'));
    const itemCount = items.length;

    if (itemCount >= 5) {
      // 元のアイテムセットを5回複製（合計6セット = 元 + 複製5）
      // より長いトラックでスクロール安定化
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < 5; i++) {
        items.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('data-clone-index', i + 1);
          fragment.appendChild(clone);
        });
      }
      
      track.appendChild(fragment);
      track.classList.add('is-animated');
      
      // アニメーション終了時に位置をリセット（シームレスなループ）
      track.addEventListener('animationiteration', () => {
        track.style.transform = 'translateZ(0) translateX(0)';
      });

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
