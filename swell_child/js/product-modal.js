/**
 * Product Modal JavaScript
 * 商品モーダルウィンドウ機能
 *
 * @version 1.0.0
 * @date 2026-02-12
 */

(function() {
    'use strict';

    function initProductModal() {
        // STEP1: モーダルをbody直下に移動
        var modals = document.querySelectorAll('.product-modal');
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
            console.log('[Product Modal] モーダルをbody直下に移動:', modal.id);
        });

        // STEP2: トリガーボタンの登録
        var triggers = document.querySelectorAll('.product-modal-trigger');

        console.log('[Product Modal] 初期化開始:', triggers.length, 'トリガー検出');

        // モーダルを開く
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                var modalId = this.getAttribute('data-modal-id') || 'product-modal';
                console.log('[Product Modal] トリガークリック:', modalId);

                var modalElement = document.getElementById(modalId);
                if (!modalElement) {
                    console.error('[Product Modal] モーダルが見つかりません:', modalId);
                    return;
                }

                modalElement.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');

                // アニメーション開始
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        modalElement.classList.add('js-modal_animating');
                    });
                });

                console.log('[Product Modal] モーダル opened:', modalId);
            };

            console.log('[Product Modal] トリガー', index + 1, '登録完了');
        });

        // 閉じる関数
        function closeProductModal(modal) {
            modal.classList.remove('js-modal_animating');
            setTimeout(function() {
                modal.classList.remove('js-modalitem_open');
                document.body.classList.remove('js-modal_open');
            }, 700);
            console.log('[Product Modal] モーダル closed:', modal.id);
        }

        // モーダルを閉じる（閉じるボタン）
        var closeBtns = document.querySelectorAll('.product-modal .js-modal_close');
        closeBtns.forEach(function(btn, index) {
            btn.onclick = function(e) {
                e.preventDefault();
                var modal = this.closest('.js-modal_wrap');
                if (modal) {
                    closeProductModal(modal);
                }
            };
            console.log('[Product Modal] 閉じるボタン', index + 1, '登録完了');
        });

        // 背景クリックで閉じる
        var modalsArray = Array.from(document.querySelectorAll('.product-modal'));
        modalsArray.forEach(function(modal) {
            var bg = modal.querySelector('.js-modal_bg');
            if (bg) {
                bg.onclick = function(e) {
                    if (e.target === bg) {
                        e.preventDefault();
                        closeProductModal(modal);
                    }
                };
            }
        });

        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                var openModal = document.querySelector('.product-modal.js-modalitem_open');
                if (openModal) {
                    closeProductModal(openModal);
                }
            }
        });

        // お問い合わせボタン → WOWモーダル連携
        var contactBtn = document.querySelector('.product-contact-btn');
        if (contactBtn) {
            contactBtn.onclick = function(e) {
                e.preventDefault();
                // 商品モーダルを閉じる
                var openModal = document.querySelector('.product-modal.js-modalitem_open');
                if (openModal) {
                    closeProductModal(openModal);
                }
                // 少し遅延してお問い合わせモーダルを開く
                setTimeout(function() {
                    var wowModal = document.getElementById('wow-modal-id-1');
                    if (wowModal) {
                        wowModal.classList.add('mw-open');
                        console.log('[Product Modal] お問い合わせモーダル opened');
                    }
                }, 400);
            };
        }

        console.log('[Product Modal] 初期化完了');
    }

    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductModal);
    } else {
        initProductModal();
    }

})();
