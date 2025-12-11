/**
 * Site Navigation Blog Modal Trigger
 * サイトナビのBLOGバナーをクリックするとブログモーダルを開く
 * 
 * @version 1.0.0
 * @date 2025-12-11
 */

(function() {
    'use strict';
    
    function initSiteNavBlogModal() {
        // サイトナビのBLOGバナーを取得（data-slug属性がない場合は href で判定）
        const navButtons = document.querySelectorAll('.ptlNavHero__btn');
        
        if (!navButtons.length) {
            console.warn('[SiteNav Blog Modal] サイトナビボタンが見つかりません');
            return;
        }
        
        navButtons.forEach(function(btn) {
            const label = btn.querySelector('.ptlNavHero__label');
            if (label && label.textContent.trim() === 'BLOG') {
                console.log('[SiteNav Blog Modal] BLOGバナーを発見:', btn);
                
                // クリックイベントを追加
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('[SiteNav Blog Modal] BLOGバナーがクリックされました');
                    
                    // ブログモーダルを開く
                    const modalId = 'blog-modal-all';
                    const modalElement = document.getElementById(modalId);
                    
                    if (!modalElement) {
                        console.error('[SiteNav Blog Modal] モーダルが見つかりません:', modalId);
                        return;
                    }
                    
                    console.log('[SiteNav Blog Modal] モーダルを開きます:', modalId);
                    modalElement.classList.add('js-modalitem_open');
                    document.body.classList.add('js-modal_open');
                    
                    // アニメーション開始
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            modalElement.classList.add('js-modal_animating');
                        });
                    });
                    
                    console.log('[SiteNav Blog Modal] モーダルを開きました');
                });
                
                console.log('[SiteNav Blog Modal] BLOGバナーにクリックイベントを設定しました');
            }
        });
        
        console.log('[SiteNav Blog Modal] 初期化完了');
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSiteNavBlogModal);
    } else {
        initSiteNavBlogModal();
    }
    
})();
