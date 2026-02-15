// Patolaqshe マリアージュページ - 完全版JS
// (Nicescroll + 料金表クローンモーダル拡大)

// =====================================================
// 1. Nicescroll初期化（PC専用）
// =====================================================
(function() {
    // PCのみ動作（768px以上）
    if (window.innerWidth < 768) return;

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
            console.log('[Mariage] Nicescroll initialized');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNicescroll);
    } else {
        loadNicescroll();
    }
})();

// =====================================================
// 2. 料金表タップ拡大（SP専用 - クローンモーダル方式）
// =====================================================
(function() {
    function initTableZoom() {
        // SPのみ動作（768px以下）
        if (window.innerWidth > 767) return;

        var table = document.querySelector('.comparison-table');
        if (!table) return;

        // モーダル要素を生成（一度だけ）
        var overlay = document.querySelector('.table-zoom-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'table-zoom-overlay';
            // 閉じるボタンとコンテンツラッパーを配置
            overlay.innerHTML = '<div class="table-zoom-close">×</div><div class="table-zoom-wrapper"></div>';
            document.body.appendChild(overlay);
        }

        var wrapper = overlay.querySelector('.table-zoom-wrapper');
        var closeBtn = overlay.querySelector('.table-zoom-close');

        // テーブルをタップした時の処理
        table.addEventListener('click', function(e) {
            e.preventDefault(); // リンク等の誤動作防止
            e.stopPropagation();

            // ラッパーの中身をクリア
            wrapper.innerHTML = '';

            // テーブルをクローン（複製）してラッパーに追加
            var clone = table.cloneNode(true);
            wrapper.appendChild(clone);

            // モーダルを表示
            overlay.style.display = 'flex';
            
            // フェードインアニメーション（少し待ってからクラス付与）
            requestAnimationFrame(function() {
                overlay.classList.add('is-active');
            });

            // 背景スクロール固定
            document.body.style.overflow = 'hidden';
        });

        // モーダルを閉じる処理
        function closeModal() {
            overlay.classList.remove('is-active');
            
            // アニメーション完了後に非表示
            setTimeout(function() {
                overlay.style.display = 'none';
                wrapper.innerHTML = ''; // メモリ解放のため中身を消す
                document.body.style.overflow = ''; // スクロール固定解除
            }, 300);
        }

        // 閉じるボタンで閉じる
        closeBtn.addEventListener('click', closeModal);

        // 背景（オーバーレイ）タップで閉じる
        overlay.addEventListener('click', function(e) {
            // ラッパーやその中身をタップした時は閉じない
            if (e.target === overlay) {
                closeModal();
            }
        });

        console.log('[Mariage] 料金表タップ拡大(クローン方式) 初期化完了');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTableZoom);
    } else {
        initTableZoom();
    }
})();
