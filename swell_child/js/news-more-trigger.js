/**
 * News Section MORE Button Modal Trigger
 * ニュースセクションのMOREボタンをクリックするとニュースモーダルを開く
 * 
 * @version 1.0.0
 * @date 2025-12-11
 */

(function() {
    'use strict';
    
    function initNewsMoreTrigger() {
        // ニュースセクションのMOREボタンを取得
        const moreBtn = document.querySelector('.ptlNews__moreBtn');
        
        if (!moreBtn) {
            console.warn('[News MORE Trigger] MOREボタンが見つかりません');
            return;
        }
        
        console.log('[News MORE Trigger] MOREボタンを発見:', moreBtn);
        
        // クリックイベントを追加
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[News MORE Trigger] MOREボタンがクリックされました');
            
            // ニュースモーダルを開く
            const modalId = 'news-modal-all';
            const modalElement = document.getElementById(modalId);
            
            if (!modalElement) {
                console.error('[News MORE Trigger] モーダルが見つかりません:', modalId);
                return;
            }
            
            console.log('[News MORE Trigger] モーダルを開きます:', modalId);
            modalElement.classList.add('js-modalitem_open');
            document.body.classList.add('js-modal_open');
            
            // アニメーション開始
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    modalElement.classList.add('js-modal_animating');
                });
            });
            
            console.log('[News MORE Trigger] モーダルを開きました');
        });
        
        console.log('[News MORE Trigger] MOREボタンにクリックイベントを設定しました');
        console.log('[News MORE Trigger] 初期化完了');
    }
    
    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsMoreTrigger);
    } else {
        initNewsMoreTrigger();
    }
    
})();
