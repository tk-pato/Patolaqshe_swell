/**
 * Blog Modal JavaScript
 * ブログモーダルウィンドウ機能
 * 
 * @version 1.0.0
 * @date 2025-12-07
 */

(function() {
    'use strict';
    
    function initBlogModal() {
        // STEP1: モーダルをbody直下に移動
        const modals = document.querySelectorAll('.blog-modal');
        modals.forEach(function(modal) {
            document.body.appendChild(modal);
            console.log('[Blog Modal] モーダルをbody直下に移動:', modal.id);
        });
        
        // STEP2: トリガーボタンの登録
        const triggers = document.querySelectorAll('.blog-modal-trigger');
        
        if (!triggers.length) {
            console.warn('[Blog Modal] トリガーが見つかりません');
            return;
        }
        
        console.log('[Blog Modal] 初期化開始:', triggers.length, 'トリガー検出');
        
        // モーダルを開く
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal-id');
                console.log('[Blog Modal] トリガークリック:', modalId);
                
                const modalElement = document.getElementById(modalId);
                if (!modalElement) {
                    console.error('[Blog Modal] モーダルが見つかりません:', modalId);
                    console.log('[Blog Modal] 利用可能なモーダル:', Array.from(document.querySelectorAll('.blog-modal')).map(m => m.id));
                    return;
                }
                
                console.log('[Blog Modal] モーダル要素取得成功:', modalElement);
                modalElement.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');
                
                // アニメーション開始
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        modalElement.classList.add('js-modal_animating');
                    });
                });
                
                console.log('[Blog Modal] モーダル opened:', modalId);
            };
            
            console.log('[Blog Modal] トリガー', index + 1, '登録完了:', trigger.getAttribute('data-modal-id'));
        });
        
        // モーダルを閉じる
        const closeBtns = document.querySelectorAll('.blog-modal .js-modal_close');
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
                    
                    console.log('[Blog Modal] モーダル closed:', modal.id);
                } else {
                    console.warn('[Blog Modal] 閉じるボタンの親モーダルが見つかりません');
                }
            };
            
            console.log('[Blog Modal] 閉じるボタン', index + 1, '登録完了');
        });
        
        // 背景クリックで閉じる
        const modalsArray = Array.from(document.querySelectorAll('.blog-modal'));
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
                        
                        console.log('[Blog Modal] 背景クリックでモーダル closed');
                    }
                };
            }
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const openModal = document.querySelector('.blog-modal.js-modalitem_open');
                if (openModal) {
                    // アニメーション開始
                    openModal.classList.remove('js-modal_animating');
                    
                    // アニメーション完了後にクラスを削除
                    setTimeout(function() {
                        openModal.classList.remove('js-modalitem_open');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // アニメーション時間と同じ
                    
                    console.log('[Blog Modal] ESCキーでモーダル closed');
                }
            }
        });
        
        console.log('[Blog Modal] 初期化完了');
        console.log('[Blog Modal] デバッグ情報:');
        console.log('  - トリガー数:', triggers.length);
        console.log('  - 閉じるボタン数:', closeBtns.length);
        console.log('  - モーダル数:', document.querySelectorAll('.blog-modal').length);
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlogModal);
    } else {
        initBlogModal();
    }
    
})();
