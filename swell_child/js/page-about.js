// Patolaqshe 銀座店 - 完全版JS（nicescroll + お客様の声リンク化 + ブログモーダル700ms統一）

// =====================================================
// 1. Nicescroll初期化（PC専用）
// =====================================================
(function() {
    
    if (window.innerWidth < 768) {
        return;
    }
    
    function loadJQuery(callback) {
        if (typeof jQuery !== 'undefined') {
            callback();
            return;
        }
        
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }
    
    function loadNicescroll() {
        loadJQuery(function() {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js';
            script.onload = function() {
                initNicescroll();
            };
            document.head.appendChild(script);
        });
    }
    
    function initNicescroll() {
        jQuery(document).ready(function($) {
            $("html").niceScroll({
                cursorcolor: "transparent",
                cursorwidth: "0px",
                cursorborder: "none",
                scrollspeed: 100,
                mousescrollstep: 50,
                smoothscroll: true,
                hwacceleration: true,
                autohidemode: false,
                background: "transparent",
                railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
                zindex: 999,
                horizrailenabled: false,
                preservenativescrolling: false,
                cursordragontouch: false,
                enablemousewheel: true,
                enablekeyboard: true,
                bouncescroll: false,
                spacebarenabled: true,
                railoffset: false,
                enabletranslate3d: true,
                enablescrollonselection: true
            });
            
            console.log('Nicescroll initialized');
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNicescroll);
    } else {
        loadNicescroll();
    }
    
})();

// =====================================================
// 2. お客様の声カード：リンク化
// =====================================================
(function() {
    
    function initVoiceCardLinks() {
        const feedbackCards = document.querySelectorAll('.voice-section .feedback-card');
        
        feedbackCards.forEach(function(card) {
            const link = document.createElement('a');
            link.href = 'https://patolaqshe.com/voice/';
            link.className = 'voice-card-link';
            
            const parent = card.parentNode;
            parent.insertBefore(link, card);
            link.appendChild(card);
        });
        
        console.log('Voice card links initialized');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVoiceCardLinks);
    } else {
        initVoiceCardLinks();
    }
    
})();

// =====================================================
// 3. ブログモーダル制御（代官山専用・700ms統一版）
// =====================================================
(function() {
    
    function initBlogModal() {
        // グローバルのblog-modal.jsより後に実行されるようにsetTimeoutで遅延
        setTimeout(function() {
            const trigger = document.querySelector('.blog-modal-trigger');
            const modal = document.querySelector('.blog-modal');
            
            if (!trigger || !modal) {
                console.log('[Ginza Blog Modal] トリガーまたはモーダルが見つかりません');
                return;
            }
            
            // グローバルのイベントを上書き
            trigger.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 1. まず表示（display: block）
                modal.classList.add('js-modalitem_open');
                document.body.classList.add('js-modal_open');
                
                // 2. 次のフレームでアニメーション開始（700ms）
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        modal.classList.add('js-modal_animating');
                    });
                });
                
                console.log('[Ginza Blog Modal] モーダル opened (700ms animation)');
            };
            
            // 閉じるボタン
            const closeBtns = modal.querySelectorAll('.js-modal_close');
            closeBtns.forEach(function(btn) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    // アニメーション開始（アニメーションクラス削除）
                    modal.classList.remove('js-modal_animating');
                    modal.classList.add('js-modal_closing');
                    
                    // アニメーション完了後にクラスを削除（700ms）
                    setTimeout(function() {
                        modal.classList.remove('js-modalitem_open');
                        modal.classList.remove('js-modal_closing');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // グランドと統一
                    
                    console.log('[Ginza Blog Modal] モーダル closed (700ms animation)');
                };
            });
            
            // 背景クリック
            const bg = modal.querySelector('.js-modal_bg');
            if (bg) {
                bg.onclick = function(e) {
                    if (e.target === bg) {
                        e.preventDefault();
                        // アニメーション開始（アニメーションクラス削除）
                        modal.classList.remove('js-modal_animating');
                        modal.classList.add('js-modal_closing');
                        
                        // アニメーション完了後にクラスを削除（700ms）
                        setTimeout(function() {
                            modal.classList.remove('js-modalitem_open');
                            modal.classList.remove('js-modal_closing');
                            document.body.classList.remove('js-modal_open');
                        }, 700); // グランドと統一
                        
                        console.log('[Ginza Blog Modal] 背景クリックでモーダル closed (700ms animation)');
                    }
                };
            }
            
            // ESCキー
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('js-modalitem_open')) {
                    // アニメーション開始（アニメーションクラス削除）
                    modal.classList.remove('js-modal_animating');
                    modal.classList.add('js-modal_closing');
                    
                    // アニメーション完了後にクラスを削除（700ms）
                    setTimeout(function() {
                        modal.classList.remove('js-modalitem_open');
                        modal.classList.remove('js-modal_closing');
                        document.body.classList.remove('js-modal_open');
                    }, 700); // グランドと統一
                    
                    console.log('[Ginza Blog Modal] ESCキーでモーダル closed (700ms animation)');
                }
            });
            
            console.log('[Ginza Blog Modal] 初期化完了（700ms統一）');
        }, 100);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlogModal);
    } else {
        initBlogModal();
    }
    
})();
