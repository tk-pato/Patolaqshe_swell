/**
 * Salon Modal JavaScript (Angelica方式)
 * サロンポップアップ機能
 * 
 * @version 2.0.0
 * @date 2025-12-04
 */

(function() {
    'use strict';
    
    function initSalonModal() {
        const triggers = document.querySelectorAll('.js-modal_btn');
        
        if (!triggers.length) return;
        
        // モーダルを開く
        triggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            });
        });
        
        // モーダルを閉じる（閉じるボタンと背景クリック）
        const closeBtns = document.querySelectorAll('.js-modal_close');
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = this.closest('.js-modal_wrap');
                if (modal) {
                    closeModal(modal.id);
                }
            });
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const openModal = document.querySelector('.js-modal_wrap.js-modalitem_open');
                if (openModal) {
                    closeModal(openModal.id);
                }
            }
        });
    }
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        document.body.classList.add('js-modal_open');
        modal.classList.add('js-modalitem_open');
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('js-modalitem_open');
        document.body.classList.remove('js-modal_open');
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSalonModal);
    } else {
        initSalonModal();
    }
    
})();
