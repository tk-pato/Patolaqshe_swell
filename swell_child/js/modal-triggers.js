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
    const moreBtns = document.querySelectorAll('.ptlNews__moreBtn');
    if (!moreBtns.length) return;
    moreBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openModalById('news-modal-all');
      });
    });
  }

  /**
   * サイトナビのSALONバナーをクリックするとサロンセクションまでスクロール
   */
  function initSiteNavSalonScroll() {
    const navButtons = document.querySelectorAll('.ptlNavHero__btn');
    if (!navButtons.length) return;

    navButtons.forEach(function(btn) {
      const label = btn.querySelector('.ptlNavHero__label');
      if (label && label.textContent.trim() === 'SALON') {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const salonSection = document.getElementById('salon');
          if (salonSection) {
            salonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('[Modal Triggers] SALONセクションまでスクロールしました');
          } else {
            console.error('[Modal Triggers] SALONセクションが見つかりません');
          }
        });
        console.log('[Modal Triggers] SALONバナーにスクロールイベントを設定');
      }
    });
  }

  /**
   * サイトナビのCONTACTバナーにWOWモーダルトリガークラスを追加
   */
  function initSiteNavContactModal() {
    const navButtons = document.querySelectorAll('.ptlNavHero__btn');
    if (!navButtons.length) return;

    navButtons.forEach(function(btn) {
      const label = btn.querySelector('.ptlNavHero__label');
      if (label && label.textContent.trim() === 'CONTACT') {
        btn.classList.add('wow-modal-id-1');
        console.log('[Modal Triggers] CONTACTバナーにWOWモーダルトリガークラスを追加');
      }
    });
  }

  function init() {
    initSiteNavBlogModal();
    initNewsMoreTrigger();
    initSiteNavSalonScroll();
    initSiteNavContactModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
