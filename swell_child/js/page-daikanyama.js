// Patolaqshe 代官山店 - 完全版JS（nicescroll + お客様の声リンク化 + ブログモーダル700ms統一 + issues動画背景）

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
                console.log('[Daikanyama Blog Modal] トリガーまたはモーダルが見つかりません');
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

                console.log('[Daikanyama Blog Modal] モーダル opened (700ms animation)');
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

                    console.log('[Daikanyama Blog Modal] モーダル closed (700ms animation)');
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

                        console.log('[Daikanyama Blog Modal] 背景クリックでモーダル closed (700ms animation)');
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

                    console.log('[Daikanyama Blog Modal] ESCキーでモーダル closed (700ms animation)');
                }
            });

            console.log('[Daikanyama Blog Modal] 初期化完了（700ms統一）');
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlogModal);
    } else {
        initBlogModal();
    }

})();

// =====================================================
// 4-b. メニュー & 選ばれる理由：クリック動作修正
//      ブロックエディター内の間違ったリンクを正しいURLに上書きし、
//      ガラスボックス（テキスト部分）のクリックでも遷移/モーダル発火
// =====================================================
(function() {

    function initCardLinks() {

        // --- A. メインカード（バストアップ施術）→ Square予約（カテゴリ） ---
        var mainCard = document.querySelector('.menu-main-card');
        if (mainCard) {
            var bustUrl = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services?filter_category_id=P7XYCCQFXOPN7AK2M5ZGZ3GE';
            mainCard.style.cursor = 'pointer';
            var mainLinks = mainCard.querySelectorAll('a');
            mainLinks.forEach(function(link) {
                link.href = bustUrl;
                link.target = '_blank';
                link.rel = 'noopener';
            });
            mainCard.addEventListener('click', function(e) {
                if (e.target.closest('a')) return;
                window.open(bustUrl, '_blank');
            });
        }

        // --- B. サブカード（フェイシャル / ボディケア / バストケアグッズ）---
        var btmCards = document.querySelectorAll('.menu-btm-card');
        btmCards.forEach(function(card) {
            card.style.cursor = 'pointer';
            var text = card.textContent;
            var targetUrl = null;
            var isModal = false;
            var isExternal = false;

            if (text.indexOf('\u30d5\u30a7\u30a4\u30b7\u30e3\u30eb') !== -1) {
                targetUrl = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services?filter_category_id=QXNHRKSOU2746MPEWF5G2JY2';
                isExternal = true;
            } else if (text.indexOf('\u30dc\u30c7\u30a3') !== -1) {
                targetUrl = 'https://book.squareup.com/appointments/xgp5fm2xb93b2t/location/5PESR3FP3XMAS/services?filter_category_id=S3GR6D3LS47M2AQTQRYWOXPK';
                isExternal = true;
            } else {
                isModal = true;
            }

            // 既存リンクのhrefを修正
            var links = card.querySelectorAll('a');
            links.forEach(function(link) {
                if (targetUrl) {
                    link.href = targetUrl;
                    if (isExternal) { link.target = '_blank'; link.rel = 'noopener'; }
                } else {
                    link.href = 'javascript:void(0);';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        openProductModal();
                    });
                }
            });

            // カード全体のクリック
            card.addEventListener('click', function(e) {
                if (e.target.closest('a')) return;
                if (targetUrl) {
                    if (isExternal) { window.open(targetUrl, '_blank'); } else { window.location.href = targetUrl; }
                } else {
                    openProductModal();
                }
            });
        });

        // --- C. 選ばれる理由カード → /about/ ---
        var reasonCards = document.querySelectorAll('.reasons-card');
        reasonCards.forEach(function(card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                window.location.href = '/about/';
            });
        });
    }

    // プロダクトモーダルを開く共通関数
    function openProductModal() {
        var modal = document.getElementById('product-modal');
        if (!modal) return;
        modal.classList.add('js-modalitem_open');
        document.body.classList.add('js-modal_open');
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                modal.classList.add('js-modal_animating');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardLinks);
    } else {
        initCardLinks();
    }

})();

// =====================================================
// 4. Issues セクション：動画背景（__parallaxLayer を置換）
// =====================================================
(function() {

    function initIssuesVideo() {
        var section = document.querySelector('.issues-section');
        if (!section) return;
        if (section.querySelector('.issues-bg-video')) return;

        // 動画要素を作成
        var video = document.createElement('video');
        video.className = 'issues-bg-video';
        video.src = 'https://patolaqshe.com/wp-content/uploads/2026/01/corse-bg.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        // セクションの先頭に挿入（CSSで__parallaxLayerは非表示済み）
        section.insertBefore(video, section.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIssuesVideo);
    } else {
        initIssuesVideo();
    }

})();
