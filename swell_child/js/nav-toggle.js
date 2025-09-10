// SPナビゲーションの開閉処理
document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const hamburger = document.getElementById('ptlNavHamburger');
    const menuText = document.getElementById('ptlNavMenuText');
    const navMenu = document.getElementById('ptlNavMenu');

    // 要素が存在しない場合は処理しない
    if (!hamburger || !menuText || !navMenu) {
        console.error('[PTL-NAV] ナビゲーション要素が見つかりません');
        return;
    }

    // デバッグログ
    console.log('[PTL-NAV] ナビゲーションコントロール初期化');

    // 画面サイズに応じた初期表示制御
    function handleScreenSize() {
        if (window.innerWidth <= 767) {
            // SP表示時
            hamburger.style.display = 'flex';
            menuText.style.display = 'inline-block';
            navMenu.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('is-active');
            console.log('[PTL-NAV] SP表示モード適用');
        } else {
            // PC表示時はハンバーガーUI非表示・メニュー常時表示
            hamburger.style.display = 'none';
            menuText.style.display = 'none';
            navMenu.classList.add('is-open');
            console.log('[PTL-NAV] PC表示モード適用');
        }
    }

    // メニューの開閉トグル処理
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-open');
        hamburger.classList.toggle('is-active');
        console.log('[PTL-NAV] メニュー状態変更:', !isExpanded ? '開' : '閉');
    }

    // 初期化とイベントリスナー設定
    handleScreenSize();
    hamburger.addEventListener('click', toggleMenu);
    menuText.addEventListener('click', toggleMenu);
    window.addEventListener('resize', handleScreenSize);
    console.log('[PTL-NAV] イベントリスナー設定完了');
});
