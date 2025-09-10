/**
 * パララックス効果を強制的に初期化するためのJSファイル（最適化・修正版）
 * section-parallax.jsを補完し、確実にパララックス効果が適用されるようにする
 * ヘッダーとの干渉を解消
 */
(function(){
    // デバッグモード
    var DEBUG = true;
    var logPrefix = '[PTL-INIT] ';
    
    function log() {
        if (!DEBUG) return;
        var args = Array.prototype.slice.call(arguments);
        console.log.apply(console, [logPrefix].concat(args));
    }
    
    // スクロール位置を記録（リフレッシュ時に復元するため）
    var lastScrollY = 0;
    
    // 強制的にパララックス効果を再適用する関数
    function forceInitParallax() {
        log('パララックス効果強制初期化を開始');
        
        // スクロール位置を記録
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        
        // パララックス対象要素を確認
        var targets = document.querySelectorAll('[data-parallax="bg"]');
        log('パララックス対象要素数:', targets.length);
        
        if (targets.length === 0) {
            log('パララックス対象要素が見つかりません');
            return;
        }
        
        // 対象要素にclass追加で視覚的にマーク
        targets.forEach(function(target) {
            // 既存クラスを追加した上で、data属性を確実に設定
            target.classList.add('ptl-has-parallax');
            
            // DOM要素を最適化するために一時的に処理
            var targetElement = target.querySelector(target.getAttribute('data-parallax-target')) || 
                               target.querySelector('video') || 
                               target.querySelector('img') || 
                               target.querySelector('picture') || 
                               target;
            
            // ターゲット要素のスタイルを一時的に保存
            var originalTransform = targetElement.style.transform;
            
            // 強制的に初期値を設定して見た目をリセット
            if (!originalTransform || originalTransform === 'none') {
                targetElement.style.transform = 'translateY(0) scale(1)';
                setTimeout(function() {
                    // 少し遅れて元に戻す（強制的に再計算させるため）
                    targetElement.style.transform = '';
                }, 50);
            }
            
            log('パララックス要素にマーク適用:', target);
        });
        
        // イベントを連続で発火させて確実に初期化
        function fireEvents() {
            log('スクロールイベントを強制発火');
            // ブラウザの再描画を強制
            document.body.style.opacity = '0.99999';
            setTimeout(function() {
                document.body.style.opacity = '1';
            }, 0);
            
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
            
            // スクロール位置を強制的に更新（パララックス計算のため）
            if (lastScrollY > 0) {
                window.scrollTo(0, lastScrollY);
            }
        }
        
        // 初期化と定期的な再適用
        fireEvents();
        
        // より高頻度でイベントを発火
        for (var i = 1; i <= 10; i++) {
            setTimeout(fireEvents, i * 200);
        }
        
        // ページ完全読み込み後も確実に実行
        setTimeout(fireEvents, 1500);
        setTimeout(fireEvents, 3000);
        
        // スクロールハンドラの最適化（過度な発火を防止）
        var optimizedScroll = (function() {
            var scrollTimeout;
            return function() {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(function() {
                    fireEvents();
                    scrollTimeout = null;
                }, 100);
            };
        })();
        
        // スクロールイベントのハンドラを追加
        window.addEventListener('scroll', optimizedScroll, { passive: true });
        
        // DOM変更監視でより確実に
        if ('MutationObserver' in window) {
            var observer = new MutationObserver(function(mutations) {
                var shouldUpdate = false;
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length || 
                        (mutation.type === 'attributes' && 
                         mutation.target.hasAttribute('data-parallax'))) {
                        shouldUpdate = true;
                    }
                });
                
                if (shouldUpdate) {
                    setTimeout(fireEvents, 50);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['data-parallax', 'data-parallax-target', 'data-parallax-speed']
            });
            log('拡張DOM変更監視を開始しました');
        }
        
        log('パララックス初期化完了');
    }
    
    // イベントリスナー登録（複数ポイントで登録して確実に実行）
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceInitParallax);
    } else {
        // すでにDOMContentLoadedが発火済みの場合は即実行
        forceInitParallax();
    }
    
    // 完全なページ読み込み後にも再適用
    window.addEventListener('load', function() {
        setTimeout(forceInitParallax, 100);
    });
    
    // さらに、確実にするためにタイマー実行も追加
    setTimeout(forceInitParallax, 500);
    setTimeout(forceInitParallax, 1500);
})();
