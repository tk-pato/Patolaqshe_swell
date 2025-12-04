/**
 * Salon Modal JavaScript (Angelica完全準拠版)
 * サロンポップアップ機能
 * 
 * @version 3.0.0
 * @date 2025-12-04
 */

(function() {
    'use strict';
    
    function initSalonModal() {
        const triggers = document.querySelectorAll('.js-modal_btn');
        
        if (!triggers.length) {
            console.warn('[Salon Modal] トリガーが見つかりません');
            return;
        }
        
        console.log('[Salon Modal] 初期化開始:', triggers.length, 'トリガー検出');
        
        // モーダルを開く（Angelica方式: onclickを使用）
        triggers.forEach(function(trigger, index) {
            trigger.onclick = function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                console.log('[Salon Modal] トリガークリック:', modalId);
                
                const modalElement = document.getElementById(modalId);
                if (!modalElement) {
                    console.error('[Salon Modal] モーダルが見つかりません:', modalId);
                    return;
                }
                
                // Angelica準拠: closest('.js-modal_wrap')を使用
                const modalWrap = modalElement.closest('.js-modal_wrap') || modalElement;
                modalWrap.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');
                
                console.log('[Salon Modal] モーダル opened:', modalId);
            };
            
            console.log('[Salon Modal] トリガー', index + 1, '登録完了:', trigger.getAttribute('data-modal'));
        });
        
        // モーダルを閉じる（Angelica方式: onclickを使用）
        const closeBtns = document.querySelectorAll('.js-modal_close');
        closeBtns.forEach(function(btn, index) {
            btn.onclick = function(e) {
                e.preventDefault();
                const modal = this.closest('.js-modal_wrap');
                if (modal) {
                    modal.classList.remove('js-modalitem_open');
                    document.body.classList.remove('js-modal_open');
                    console.log('[Salon Modal] モーダル closed:', modal.id);
                } else {
                    console.warn('[Salon Modal] 閉じるボタンの親モーダルが見つかりません');
                }
            };
            
            console.log('[Salon Modal] 閉じるボタン', index + 1, '登録完了');
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const openModal = document.querySelector('.js-modal_wrap.js-modalitem_open');
                if (openModal) {
                    openModal.classList.remove('js-modalitem_open');
                    document.body.classList.remove('js-modal_open');
                    console.log('[Salon Modal] ESCキーでモーダル closed');
                }
            }
        });
        
        console.log('[Salon Modal] 初期化完了');
        console.log('[Salon Modal] デバッグ情報:');
        console.log('  - トリガー数:', triggers.length);
        console.log('  - 閉じるボタン数:', closeBtns.length);
        console.log('  - モーダル数:', document.querySelectorAll('.js-modal_wrap').length);
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSalonModal);
    } else {
        initSalonModal();
    }
    
})();
