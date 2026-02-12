/**
 * Salon Modal JavaScript
 * サロンモーダルウィンドウ機能（700ms統一版）
 * 
 * @version 4.0.0
 * @date 2025-12-09
 */

(function() {
    'use strict';
    
    function initSalonModal() {
        // STEP1: モーダルをbody直下に移動
        const modals = document.querySelectorAll('.p-salon');
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
        });
        
        // STEP2: トリガーボタンの登録
        const triggers = document.querySelectorAll('.js-modal_btn');
        
        if (!triggers.length) {
            return;
        }
        
        
        // モーダルを開く
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                
                const modalElement = document.getElementById(modalId);
                if (!modalElement) {
                    return;
                }
                
                
                // モーダルを開く（即座にアニメーション開始）
                modalElement.classList.add('js-modalitem_open');
                modalElement.classList.add('js-modal_animating');
                document.body.classList.add('js-modal_open');
                
            };
            
        });
        
        // モーダルを閉じる
        const closeBtns = document.querySelectorAll('.p-salon .js-modal_close');
        closeBtns.forEach(function(btn, index) {
            btn.onclick = function(e) {
                e.preventDefault();
                const modal = this.closest('.js-modal_wrap');
                if (modal) {
                    // アニメーション開始
                    modal.classList.remove('js-modal_animating');
                    modal.classList.add('js-modal_closing');
                    
                    // アニメーション完了後にクラスを削除（700ms）
                    setTimeout(function() {
                        modal.classList.remove('js-modalitem_open');
                        modal.classList.remove('js-modal_closing');
                        document.body.classList.remove('js-modal_open');
                    }, 700);
                    
                } else {
                }
            };
            
        });
        
        // 背景クリックで閉じる
        const backgrounds = document.querySelectorAll('.p-salon .js-modal_bg');
        backgrounds.forEach(function(bg) {
            bg.onclick = function(e) {
                if (e.target === this) {
                    const modal = this.closest('.js-modal_wrap');
                    if (modal) {
                        // アニメーション開始
                        modal.classList.remove('js-modal_animating');
                        modal.classList.add('js-modal_closing');
                        
                        // アニメーション完了後にクラスを削除（700ms）
                        setTimeout(function() {
                            modal.classList.remove('js-modalitem_open');
                            modal.classList.remove('js-modal_closing');
                            document.body.classList.remove('js-modal_open');
                        }, 700);
                        
                    }
                }
            };
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const openModal = document.querySelector('.p-salon.js-modalitem_open');
                if (openModal) {
                    // アニメーション開始
                    openModal.classList.remove('js-modal_animating');
                    openModal.classList.add('js-modal_closing');
                    
                    // アニメーション完了後にクラスを削除（700ms）
                    setTimeout(function() {
                        openModal.classList.remove('js-modalitem_open');
                        openModal.classList.remove('js-modal_closing');
                        document.body.classList.remove('js-modal_open');
                    }, 700);
                    
                }
            }
        });
        
    }
    
    // DOMContentLoadedで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSalonModal);
    } else {
        initSalonModal();
    }
})();
