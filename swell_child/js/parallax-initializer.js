/**
 * パララックス効果を強制的に初期化するためのJSファイル
 * section-parallax.jsを補完し、確実にパララックス効果が適用されるようにする
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
    
    // 強制的にパララックス効果を再適用する関数
    function forceInitParallax() {
        log('パララックス効果強制初期化を開始');
        
        // パララックス対象要素を確認
        var targets = document.querySelectorAll('[data-parallax="bg"]');
        log('パララックス対象要素数:', targets.length);
        
        if (targets.length === 0) {
            log('パララックス対象要素が見つかりません');
            return;
        }
        
        // 対象要素にclass追加で視覚的にマーク
        targets.forEach(function(target) {
            target.classList.add('ptl-has-parallax');
            log('パララックス要素にマーク適用:', target);
        });
        
        // イベントを連続で発火させて確実に初期化
        function fireEvents() {
            log('スクロールイベントを強制発火');
            window.dispatchEvent(new Event('scroll'));
            window.dispatchEvent(new Event('resize'));
        }
        
        // 初期化と定期的な再適用
        fireEvents();
        
        // 複数回の遅延実行で確実に適用（より多くの間隔で実行）
        setTimeout(fireEvents, 100);
        setTimeout(fireEvents, 300);
        setTimeout(fireEvents, 500);
        setTimeout(fireEvents, 800);
        setTimeout(fireEvents, 1200);
        setTimeout(fireEvents, 2000);
        
        // DOM変更監視で新しく追加された要素にも適用
        if ('MutationObserver' in window) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        setTimeout(fireEvents, 50);
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            log('DOM変更監視を開始しました');
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
