jQuery(document).ready(function($) {
    // ========================================
    // 1. アンカーリンクのスムーズスクロール
    // ========================================
    $('a[href^="#"]').on('click', function(e) {
        // hrefを取得
        var target = $(this).attr('href');
        
        // #のみ、または空の場合はhtmlタグをターゲットに
        var $target = (target === '#' || target === '') ? $('html') : $(target);
        
        // ターゲットが存在する場合のみスクロール
        if ($target.length) {
            e.preventDefault();
            
            // ターゲット位置を計算（ヘッダー分150pxオフセット）
            var targetOffset = $target.offset().top - 150;
            
            // スムーズにスクロール（400ms、swingイージング）
            $('html, body').animate({
                scrollTop: targetOffset
            }, 400, 'swing');
            
            return false;
        }
    });
    
    // ========================================
    // 2. niceScroll実装（PC専用）
    // ========================================
    
    // デバイス判定
    var userAgent = window.navigator.userAgent.toLowerCase();
    var isTablet = (
        (userAgent.indexOf('windows') !== -1 && userAgent.indexOf('touch') !== -1 && userAgent.indexOf('tablet pc') === -1) ||
        userAgent.indexOf('ipad') !== -1 ||
        (userAgent.indexOf('android') !== -1 && userAgent.indexOf('mobile') === -1) ||
        (userAgent.indexOf('firefox') !== -1 && userAgent.indexOf('tablet') !== -1) ||
        userAgent.indexOf('kindle') !== -1 ||
        userAgent.indexOf('silk') !== -1 ||
        userAgent.indexOf('playbook') !== -1
    );
    
    var isMobile = (
        (userAgent.indexOf('windows') !== -1 && userAgent.indexOf('phone') !== -1) ||
        userAgent.indexOf('iphone') !== -1 ||
        userAgent.indexOf('ipod') !== -1 ||
        (userAgent.indexOf('android') !== -1 && userAgent.indexOf('mobile') !== -1) ||
        (userAgent.indexOf('firefox') !== -1 && userAgent.indexOf('mobile') !== -1) ||
        userAgent.indexOf('blackberry') !== -1
    );
    
    // モバイル・タブレット以外（= PC）でniceScrollを適用
    if (!isMobile && !isTablet) {
        // niceScrollがロードされているか確認
        if (typeof $.fn.niceScroll !== 'undefined') {
            $('body').niceScroll({
                mousescrollstep: 60,           // マウスホイール1回のスクロール量
                background: '#ffcc00',         // スクロールバー背景色
                cursoropacitymax: 0,           // カーソル不透明度（0=非表示）
                cursorwidth: '8px',            // カーソル幅
                cursorborder: 'none',          // カーソル枠線
                cursorborderradius: '0px',     // カーソー角丸
                autohidemode: false,           // 自動非表示オフ
                horizrailenabled: false        // 横スクロールバー無効
            });
        }
    }
});
