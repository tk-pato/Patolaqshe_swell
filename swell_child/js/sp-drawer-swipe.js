/**
 * SP ドロワーメニュー スワイプで閉じる v5
 *
 * 修正内容:
 * - 実際にドラッグした時のみ transform を操作（タップは無視）
 *   → closeBtn タップ時に SWELL のアニメーションを妨害しなくなる
 * - closeDrawer() を btn.click() から data-spmenu 直接操作に変更
 *   → SWELL の toggleMenu() と同じ処理で確実に閉じる
 */
(function () {
  'use strict';

  var startX = 0, startY = 0;
  var isDragging = false;
  var isHorizontal = null;
  var didMove = false;
  var inner = null;

  function isDrawerOpen() {
    return document.documentElement.getAttribute('data-spmenu') === 'opened';
  }

  function getInner() {
    return document.querySelector('.p-spMenu__inner');
  }

  function isTouchInsideInner(clientX, clientY) {
    var el = getInner();
    if (!el) return false;
    var rect = el.getBoundingClientRect();
    return clientX >= rect.left && clientX <= rect.right &&
           clientY >= rect.top  && clientY <= rect.bottom;
  }

  function closeDrawer() {
    // SWELL の toggleMenu() と同じ処理
    document.documentElement.setAttribute('data-spmenu', 'closed');
  }

  function onTouchStart(e) {
    if (!isDrawerOpen()) return;
    var touch = e.touches[0];
    if (!isTouchInsideInner(touch.clientX, touch.clientY)) return;

    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = true;
    isHorizontal = null;
    didMove = false;
    inner = getInner();
  }

  function onTouchMove(e) {
    if (!isDragging || !inner) return;

    var deltaX = e.touches[0].clientX - startX;
    var deltaY = e.touches[0].clientY - startY;

    if (isHorizontal === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
      isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (!isHorizontal || deltaX >= 0) return;

    e.preventDefault();
    inner.style.transition = 'none';
    inner.style.transform = 'translateX(' + deltaX + 'px)';
    didMove = true;
  }

  function onTouchEnd(e) {
    if (!isDragging || !inner) return;
    isDragging = false;

    // 実際にドラッグしていない場合（タップ）は何もしない
    if (!didMove) {
      inner = null;
      isHorizontal = null;
      didMove = false;
      return;
    }

    var deltaX = e.changedTouches[0].clientX - startX;

    if (isHorizontal && deltaX < -80) {
      inner.style.transition = '';
      inner.style.transform = '';
      closeDrawer();
    } else {
      // スナップバック（モーダルと同じ cubic-bezier）
      inner.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      inner.style.transform = 'translateX(0)';
      setTimeout(function () {
        inner.style.transition = '';
        inner.style.transform = '';
      }, 300);
    }

    inner = null;
    isHorizontal = null;
    didMove = false;
  }

  document.addEventListener('touchstart',  onTouchStart, { passive: true });
  document.addEventListener('touchmove',   onTouchMove,  { passive: false });
  document.addEventListener('touchend',    onTouchEnd,   { passive: true });

})();
