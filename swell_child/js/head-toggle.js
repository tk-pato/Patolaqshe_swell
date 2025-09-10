
/*! PTL Header toggle v2 | 1-file drop-in | hide at top, fade-in after scroll */
(() => {
  'use strict';

  // --- 1) CSS を動的注入（既存CSSに依存しません） ---
  const css = `
[data-ptl-header]{
  opacity:0; visibility:hidden; transform:translateY(-12px);
  pointer-events:none; transition:opacity .24s ease, transform .24s ease, visibility 0s linear .24s;
}
[data-ptl-header].ptl-show{
  opacity:1; visibility:visible; transform:translateY(0);
  pointer-events:auto; transition:opacity .24s ease, transform .24s ease, visibility 0s;
}
@media (prefers-reduced-motion: reduce){
  [data-ptl-header]{ transition:none; transform:none; }
}`;
  const addStyle = () => {
    if (!document.head.querySelector('style[data-ptl-header-style]')) {
      const s = document.createElement('style');
      s.setAttribute('data-ptl-header-style','');
      s.textContent = css;
      document.head.appendChild(s);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addStyle, {once:true});
  else addStyle();

  // --- 2) ヘッダー要素自動検出（構造変更不要） ---
  const candidates = [
    '[data-header]', 'header[role="banner"]', '#masthead', '.l-header', 'header.site-header', 'header'
  ];
  let header = null;
  for (const sel of candidates) {
    const el = document.querySelector(sel);
    if (el && (el.offsetHeight || el.getBoundingClientRect().height)) { header = el; break; }
  }
  if (!header) { console.warn('[PTL] header not found'); return; }
  header.setAttribute('data-ptl-header','1');

  // 動きを減らす環境でも機能は維持（アニメのみ無効）
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    header.style.transition = 'none';
  }

  // --- 3) 表示/非表示制御（IntersectionObserverで安定動作） ---
  const show = () => header.classList.add('ptl-show');
  const hide = () => header.classList.remove('ptl-show');

  // ページ最上部の監視用セントリネル
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden','true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
  document.documentElement.prepend(sentinel);

  const initApply = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (y <= 10) hide(); else show();
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === sentinel) {
          if (e.isIntersecting && e.intersectionRatio > 0) hide();
          else show();
        }
      }
    }, { rootMargin: '0px', threshold: [0, 0.01] });
    io.observe(sentinel);
    // 初期適用
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApply, {once:true});
    else initApply();
    window.addEventListener('load', initApply, {once:true});
  } else {
    // フォールバック：スクロール監視
    const fallback = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y <= 10) hide(); else show();
    };
    document.addEventListener('DOMContentLoaded', fallback, {once:true});
    window.addEventListener('load', fallback, {once:true});
    window.addEventListener('scroll', fallback, {passive:true});
    window.addEventListener('resize', fallback);
  }
})();