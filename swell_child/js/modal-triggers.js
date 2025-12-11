/**
 * Combined modal triggers
 * - サイトナビBLOGのトリガー
 * - ニュースMOREボタンのトリガー
 *
 * @version 1.0.0
 * @date 2025-12-11
 */

(function() {
  'use strict';

  function openModalById(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.error('[modal-triggers] モーダルが見つかりません:', modalId);
      return;
    }
    modalElement.classList.add('js-modalitem_open');
    document.body.classList.add('js-modal_open');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        modalElement.classList.add('js-modal_animating');
      });
    });
  }

  function initSiteNavBlogModal() {
    const navButtons = document.querySelectorAll('.ptlNavHero__btn');
    if (!navButtons.length) return;

    navButtons.forEach(function(btn) {
      const label = btn.querySelector('.ptlNavHero__label');
      if (label && label.textContent.trim() === 'BLOG') {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openModalById('blog-modal-all');
        });
      }
    });
  }

  function initNewsMoreTrigger() {
    const moreBtn = document.querySelector('.ptlNews__moreBtn');
    if (!moreBtn) return;
    moreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModalById('news-modal-all');
    });
  }

  function init() {
    initSiteNavBlogModal();
    initNewsMoreTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
