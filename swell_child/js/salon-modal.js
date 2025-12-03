/**
 * Salon Modal JavaScript
 * サロンポップアップ機能
 * 
 * @version 1.0.0
 * @date 2025-12-03
 */

(function() {
    'use strict';
    
    function initSalonModal() {
        const triggers = document.querySelectorAll('.salon-modal-trigger');
        
        if (!triggers.length) return;
        
        triggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal-id');
                openModal(modalId);
            });
        });
        
        const closeBtns = document.querySelectorAll('.salon-modal-close');
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const modal = this.closest('.salon-modal');
                if (modal) {
                    closeModal(modal.id);
                }
            });
        });
        
        const modals = document.querySelectorAll('.salon-modal');
        modals.forEach(function(modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.salon-modal.is-active');
                if (openModal) {
                    closeModal(openModal.id);
                }
            }
        });
    }
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('is-active');
        document.body.classList.add('salon-modal-open');
        
        setTimeout(function() {
            modal.classList.add('is-visible');
        }, 10);
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('is-visible');
        
        setTimeout(function() {
            modal.classList.remove('is-active');
            document.body.classList.remove('salon-modal-open');
        }, 300);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSalonModal);
    } else {
        initSalonModal();
    }
    
})();
