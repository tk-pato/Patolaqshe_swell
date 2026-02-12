/**
 * News Modal JavaScript
 * ニュースモーダルウィンドウ機能
 * 
 * @version 1.0.0
 * @date 2025-12-11
 */

(function() {
    'use strict';
    
    function initNewsModal() {
        // STEP1: モーダルをbody直下に移動
        const modals = document.querySelectorAll('.news-modal');
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
        });
        
        // STEP2: トリガーボタンの登録
        const triggers = document.querySelectorAll('.news-modal-trigger');
        
        
        // モーダルを開く
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal-id');
                
                const modalElement = document.getElementById(modalId);
                if (!modalElement) {
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
                
            };
            
        });
        
        // モーダルを閉じる
        const closeBtns = document.querySelectorAll('.news-modal .js-modal_close');
        closeBtns.forEach(function(btn, index) {
            btn.onclick = function(e) {
                e.preventDefault();
                const modal = this.closest('.js-modal_wrap');
                if (modal) {
                    // アニメーション開始
                    modal.classList.remove('js-modal_animating');
                    
                    // アニメーション完了後にクラスを削除
                    setTimeout(function() {
                        modal.classList.remove('js-modalitem_open');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // アニメーション時間と同じ
                    
                } else {
                }
            };
            
        });
        
        // 背景クリックで閉じる
        const modalsArray = Array.from(document.querySelectorAll('.news-modal'));
        modalsArray.forEach(function(modal) {
            const bg = modal.querySelector('.js-modal_bg');
            if (bg) {
                bg.onclick = function(e) {
                    if (e.target === bg) {
                        e.preventDefault();
                        modal.classList.remove('js-modal_animating');
                        
                        setTimeout(function() {
                            modal.classList.remove('js-modalitem_open');
                            document.body.classList.remove('js-modal_open');
                        }, 700);
                        
                    }
                };
            }
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const openModal = document.querySelector('.news-modal.js-modalitem_open');
                if (openModal) {
                    // アニメーション開始
                    openModal.classList.remove('js-modal_animating');
                    
                    // アニメーション完了後にクラスを削除
                    setTimeout(function() {
                        openModal.classList.remove('js-modalitem_open');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // アニメーション時間と同じ
                    
                }
            }
        });
        
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsModal);
    } else {
        initNewsModal();
    }
    
})();

