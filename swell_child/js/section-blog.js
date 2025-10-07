/**
 * BLOG セクション - 自動スクロール制御
 */
(function() {
  'use strict';

  const init = () => {
    const track = document.querySelector('.ptl-blog__track');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.ptl-blog__item'));
    const itemCount = items.length;
    const container = track.closest('.ptl-blog__container');
    const containerWidth = container && container.offsetWidth ? container.offsetWidth : window.innerWidth;

    if (itemCount >= 5) {
      track.classList.add('is-animated');
      const baseWidth = track.scrollWidth;
      let trackWidth = baseWidth;

      while (trackWidth < baseWidth * 2 || trackWidth < containerWidth + baseWidth) {
        items.forEach(item => {
          track.appendChild(item.cloneNode(true));
        });
        trackWidth = track.scrollWidth;
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
