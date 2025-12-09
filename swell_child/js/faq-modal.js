/**
 * FAQ Modal JavaScript
 * FAQモーダルウィンドウ機能（700ms統一）
 * 
 * @version 1.0.0
 * @date 2025-12-09
 */

(function() {
    'use strict';
    
    function initFaqModal() {
        // STEP1: モーダルをbody直下に移動
        const modals = document.querySelectorAll('.faq-modal');
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
            console.log('[FAQ Modal] モーダルをbody直下に移動:', modal.id);
        });
        
        // STEP2: トリガーボタンの登録
        const triggers = document.querySelectorAll('.faq-modal-trigger');
        
        if (!triggers.length) {
            console.warn('[FAQ Modal] トリガーが見つかりません');
            return;
        }
        
        console.log('[FAQ Modal] 初期化開始:', triggers.length, 'トリガー検出');
        
        // モーダルを開く
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                const modalId = 'faq-modal';
                console.log('[FAQ Modal] トリガークリック:', modalId);
                
                const modalElement = document.getElementById(modalId);
                if (!modalElement) {
                    console.error('[FAQ Modal] モーダルが見つかりません:', modalId);
                    return;
                }
                
                console.log('[FAQ Modal] モーダル要素取得成功:', modalElement);
                
                // 1. まず表示
                modalElement.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');
                
                // 2. 次のフレームでアニメーション開始（700ms）
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        modalElement.classList.add('js-modal_animating');
                    });
                });
                
                console.log('[FAQ Modal] モーダル opened (700ms animation)');
            };
            
            console.log('[FAQ Modal] トリガー', index + 1, '登録完了:', trigger.getAttribute('data-modal-id'));
        });
        
        // モーダルを閉じる
        const closeBtns = document.querySelectorAll('.faq-modal .js-modal_close');
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
                    
                    console.log('[FAQ Modal] モーダル closed (700ms animation)');
                } else {
                    console.warn('[FAQ Modal] 閉じるボタンの親モーダルが見つかりません');
                }
            };
        });
        
        // 背景クリックで閉じる
        const bgs = document.querySelectorAll('.faq-modal .js-modal_bg');
        bgs.forEach(function(bg) {
            bg.onclick = function(e) {
                if (e.target === bg) {
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
                        
                        console.log('[FAQ Modal] 背景クリックでモーダル closed (700ms animation)');
                    }
                }
            };
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.faq-modal.js-modalitem_open');
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
                    
                    console.log('[FAQ Modal] ESCキーでモーダル closed (700ms animation)');
                }
            }
        });
        
        console.log('[FAQ Modal] 初期化完了（700ms統一）');
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFaqModal);
    } else {
        initFaqModal();
    }
    
})();
