/**
 * SP ドロワーメニュー スワイプで閉じる
 * 左方向スワイプ（右→左）で SWELL の SP メニューを閉じる
 * モーダルの addSwipeToClose と同じ UX を実現
 */
(function () {
  'use strict';

  var THRESHOLD = 80; // 閉じると判定するスワイプ距離(px)

  function init() {
    var inner = document.querySelector('.p-spMenu__inner');
    if (!inner) return;

    var startX = 0, startY = 0;
    var isDragging = false;
    var isHorizontal = null;

    inner.addEventListener('touchstart', function (e) {
      var html = document.documentElement;
      if (html.getAttribute('data-spmenu') !== 'opened') return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      isHorizontal = null;
    }, { passive: true });

    inner.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var deltaX = e.touches[0].clientX - startX;
      var deltaY = e.touches[0].clientY - startY;

      if (isHorizontal === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      }

      // 左方向スワイプのみ追従（deltaX < 0）
      if (!isHorizontal || deltaX >= 0) return;

      e.preventDefault();
      inner.style.transition = 'none';
      inner.style.transform = 'translateX(' + deltaX + 'px)';
    }, { passive: false });

    inner.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;

      var deltaX = e.changedTouches[0].clientX - startX;

      // リセット
      inner.style.transition = '';
      inner.style.transform = '';

      if (isHorizontal && deltaX < -THRESHOLD) {
        // 閉じる: SWELL の閉じるボタンをクリック
        var closeBtn = document.querySelector('.p-spMenu__closeBtn');
        if (closeBtn) closeBtn.click();
      }

      isHorizontal = null;
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
