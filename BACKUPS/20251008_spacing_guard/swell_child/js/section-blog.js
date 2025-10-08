/**
 * BLOG セクション - 自動スクロール制御
 */
(function() {
  'use strict';

  const init = () => {
    const track = document.querySelector('.ptl-blog__track');
    if (!track) return;

    // .ptl-blog__item をクローン対象に変更
    const items = Array.from(track.querySelectorAll('.ptl-blog__item'));
    const itemCount = items.length;
    const container = track.closest('.ptl-blog__container');
    const containerWidth = container && container.offsetWidth ? container.offsetWidth : window.innerWidth;

    if (itemCount >= 5) {
      track.classList.add('is-animated');
      const baseWidth = track.scrollWidth;
      let trackWidth = baseWidth;
      let cloneCount = 0;
      const maxClones = 20; // 無限ループ防止

      // 2倍の幅になるまでクローン
      while (trackWidth < baseWidth * 2 && cloneCount < maxClones) {
        items.forEach(item => {
          track.appendChild(item.cloneNode(true));
        });
        trackWidth = track.scrollWidth;
        cloneCount++;
      }
    } else {
      track.classList.add('is-static');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
