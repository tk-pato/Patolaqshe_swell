/**
 * PTL Unified Modal Controller
 * 5つのモーダルJS（blog, faq, news, salon, product）を統合
 *
 * @version 1.0.0
 * @date 2026-02-24
 */
(function() {
    'use strict';

    var TRANSITION_MS = 700;
    var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

    var MODAL_CONFIGS = [
        {
            modalClass: 'blog-modal',
            triggerClass: 'blog-modal-trigger',
            triggerIdAttr: 'data-modal-id',
            useClosingClass: false,
            immediateOpen: false
        },
        {
            modalClass: 'faq-modal',
            triggerClass: 'faq-modal-trigger',
            defaultId: 'faq-modal',
            useClosingClass: true,
            immediateOpen: false
        },
        {
            modalClass: 'news-modal',
            triggerClass: 'news-modal-trigger',
            triggerIdAttr: 'data-modal-id',
            useClosingClass: false,
            immediateOpen: false
        },
        {
            modalClass: 'p-salon',
            triggerClass: 'js-modal_btn',
            triggerIdAttr: 'data-modal',
            useClosingClass: true,
            immediateOpen: true
        },
        {
            modalClass: 'product-modal',
            triggerClass: 'product-modal-trigger',
            triggerIdAttr: 'data-modal-id',
            defaultId: 'product-modal',
            useClosingClass: false,
            immediateOpen: false
        },
        {
            modalClass: 'privacy-modal',
            triggerClass: 'privacy-modal-trigger',
            defaultId: 'privacy-modal',
            useClosingClass: true,
            immediateOpen: false
        }
    ];

    var lastTrigger = null;

    // fromKeyboard: true = ESCキー操作、false = マウス/タッチ操作
    function closeModal(modal, useClosing, fromKeyboard) {
        modal.classList.remove('js-modal_animating');
        if (useClosing) {
            modal.classList.add('js-modal_closing');
        }
        setTimeout(function() {
            modal.classList.remove('js-modalitem_open');
            if (useClosing) {
                modal.classList.remove('js-modal_closing');
            }
            document.body.classList.remove('js-modal_open');
            // キーボード操作で閉じた場合のみフォーカスを戻す
            // （マウス/タッチの場合は :focus-visible による茶色枠が出るため戻さない）
            if (fromKeyboard && lastTrigger && lastTrigger.focus) {
                lastTrigger.focus();
            }
            lastTrigger = null;
        }, TRANSITION_MS);
    }

    function trapFocus(modal, e) {
        if (e.key !== 'Tab') return;
        var focusable = modal.querySelectorAll(FOCUSABLE);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    function initModal(config) {
        var modals = document.querySelectorAll('.' + config.modalClass);
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
        });

        var triggers = document.querySelectorAll('.' + config.triggerClass);
        if (!triggers.length) return;

        triggers.forEach(function(trigger) {
            trigger.onclick = function(e) {
                e.preventDefault();
                var modalId = (config.triggerIdAttr ? this.getAttribute(config.triggerIdAttr) : null) || config.defaultId;
                if (!modalId) return;

                var modalEl = document.getElementById(modalId);
                if (!modalEl) return;

                lastTrigger = this;
                modalEl.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');

                if (config.immediateOpen) {
                    modalEl.classList.add('js-modal_animating');
                } else {
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            modalEl.classList.add('js-modal_animating');
                        });
                    });
                }

                // フォーカスをモーダル内の最初の要素に移動
                setTimeout(function() {
                    var first = modalEl.querySelector(FOCUSABLE);
                    if (first) first.focus();
                }, 100);
            };
        });

        document.querySelectorAll('.' + config.modalClass + ' .js-modal_close').forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                var modal = this.closest('.js-modal_wrap');
                if (modal) closeModal(modal, config.useClosingClass, false);
            };
        });

        document.querySelectorAll('.' + config.modalClass + ' .js-modal_bg').forEach(function(bg) {
            bg.onclick = function(e) {
                if (e.target === this) {
                    e.preventDefault();
                    var modal = this.closest('.js-modal_wrap');
                    if (modal) closeModal(modal, config.useClosingClass, false);
                }
            };
        });
    }

    // SP スワイプで閉じる（左→右スワイプ）
    function addSwipeToClose(modal, useClosing) {
        var cont = modal.querySelector('.js-modal_cont');
        if (!cont) return;

        var startX = 0, startY = 0;
        var isDragging = false;
        var isHorizontal = null;

        cont.addEventListener('touchstart', function(e) {
            if (!modal.classList.contains('js-modalitem_open')) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontal = null;
        }, { passive: true });

        cont.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            var deltaX = e.touches[0].clientX - startX;
            var deltaY = e.touches[0].clientY - startY;

            if (isHorizontal === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
                isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
            }
            if (!isHorizontal || deltaX <= 0) return;

            e.preventDefault();
            cont.style.transition = 'none';
            cont.style.transform = 'translateX(' + deltaX + 'px)';
        }, { passive: false });

        cont.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            var deltaX = e.changedTouches[0].clientX - startX;

            if (isHorizontal && deltaX > 80) {
                cont.style.transition = '';
                cont.style.transform = '';
                closeModal(modal, useClosing, false);
            } else {
                cont.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                cont.style.transform = 'translateX(0)';
                setTimeout(function() {
                    cont.style.transition = '';
                    cont.style.transform = '';
                }, 300);
            }
            isHorizontal = null;
        }, { passive: true });
    }

    function initAll() {
        MODAL_CONFIGS.forEach(function(cfg) {
            initModal(cfg);
            document.querySelectorAll('.' + cfg.modalClass).forEach(function(modal) {
                addSwipeToClose(modal, cfg.useClosingClass);
            });
        });

        // ESC キー + フォーカストラップ（1つだけ登録）
        document.addEventListener('keydown', function(e) {
            for (var i = 0; i < MODAL_CONFIGS.length; i++) {
                var cfg = MODAL_CONFIGS[i];
                var openModal = document.querySelector('.' + cfg.modalClass + '.js-modalitem_open');
                if (openModal) {
                    if (e.key === 'Escape' || e.keyCode === 27) {
                        closeModal(openModal, cfg.useClosingClass, true);
                    } else {
                        trapFocus(openModal, e);
                    }
                    return;
                }
            }
        });

        // Product modal: お問い合わせ → WOWモーダル連携
        var contactBtn = document.querySelector('.product-contact-btn');
        if (contactBtn) {
            contactBtn.onclick = function(e) {
                e.preventDefault();
                var openModal = document.querySelector('.product-modal.js-modalitem_open');
                if (openModal) closeModal(openModal, false, false);
                setTimeout(function() {
                    var wowModal = document.getElementById('wow-modal-id-1');
                    if (wowModal) wowModal.classList.add('mw-open');
                }, 400);
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
